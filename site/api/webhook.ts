import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log(`✅ Webhook signature verified for event: ${event.type}`);
    } else {
      // For development/testing without webhook secret
      console.warn('⚠️ WARNING: No webhook secret configured - skipping signature verification');
      event = JSON.parse(buf.toString());
    }
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  console.log(`📥 Received webhook event: ${event.type} (ID: ${event.id})`);

  try {
    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;

      case 'invoice.paid':
        const paidInvoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaid(paidInvoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handleInvoiceFailed(failedInvoice);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    console.log(`✅ Webhook processed successfully: ${event.type}`);
    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('❌ Webhook handler error:', error);
    console.error('Error stack:', error.stack);
    return res.status(500).json({ error: error.message });
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment intent succeeded:', paymentIntent.id);
  console.log('Payment intent metadata:', JSON.stringify(paymentIntent.metadata));

  // Get invoice ID from metadata
  const invoiceId = paymentIntent.metadata.invoice_id;
  
  if (!invoiceId) {
    console.log('No invoice_id in metadata, skipping database update');
    console.log('Available metadata keys:', Object.keys(paymentIntent.metadata));
    return;
  }

  console.log(`Updating invoice ${invoiceId} to paid status...`);

  // Update invoice status in database
  const { data, error } = await supabase
    .from('invoices')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
    })
    .eq('id', invoiceId)
    .select();

  if (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }

  if (data && data.length > 0) {
    console.log(`✅ Successfully updated invoice ${invoiceId} to paid`);
  } else {
    console.warn(`⚠️ No invoice found with id: ${invoiceId}`);
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('Invoice paid:', invoice.id);
  console.log('Invoice status in Stripe:', invoice.status);

  // Update invoice status in database
  const { data, error } = await supabase
    .from('invoices')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
    })
    .eq('stripe_invoice_id', invoice.id)
    .select();

  if (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }

  if (data && data.length > 0) {
    console.log(`✅ Successfully updated invoice with stripe_invoice_id ${invoice.id} to paid`);
  } else {
    console.warn(`⚠️ No invoice found with stripe_invoice_id: ${invoice.id}`);
  }
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  console.log('Invoice payment failed:', invoice.id);

  // Update invoice status in database
  const { error } = await supabase
    .from('invoices')
    .update({ status: 'failed' })
    .eq('stripe_invoice_id', invoice.id);

  if (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
}

async function handleSubscriptionUpdate(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);

  // Get customer ID and update user subscription status
  const customerId = typeof subscription.customer === 'string' 
    ? subscription.customer 
    : subscription.customer.id;

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: subscription.status as any,
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription deleted:', subscription.id);

  const customerId = typeof subscription.customer === 'string' 
    ? subscription.customer 
    : subscription.customer.id;

  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'canceled',
    })
    .eq('stripe_customer_id', customerId);

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
}
