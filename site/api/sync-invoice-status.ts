import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { invoiceId } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ error: 'Invoice ID required' });
    }

    // Get invoice from database
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // If already paid, return success
    if (invoice.status === 'paid') {
      return res.status(200).json({ 
        status: 'paid',
        message: 'Invoice is already marked as paid' 
      });
    }

    // Check Stripe invoice status
    try {
      const stripeInvoice = await stripe.invoices.retrieve(invoice.stripe_invoice_id);
      
      // Update database based on Stripe status
      let newStatus = invoice.status;
      if (stripeInvoice.status === 'paid') {
        newStatus = 'paid';
      } else if (stripeInvoice.status === 'open' || stripeInvoice.status === 'draft') {
        newStatus = 'pending';
      } else if (stripeInvoice.status === 'void' || stripeInvoice.status === 'uncollectible') {
        newStatus = 'failed';
      }

      // Update if status changed
      if (newStatus !== invoice.status) {
        const updateData: any = { status: newStatus };
        if (newStatus === 'paid') {
          updateData.paid_at = new Date().toISOString();
        }

        const { error: updateError } = await supabase
          .from('invoices')
          .update(updateData)
          .eq('id', invoiceId);

        if (updateError) {
          throw updateError;
        }

        return res.status(200).json({
          status: newStatus,
          message: `Invoice status synced from Stripe: ${newStatus}`,
          wasUpdated: true,
        });
      }

      return res.status(200).json({
        status: newStatus,
        message: 'Invoice status is already in sync',
        wasUpdated: false,
      });
    } catch (stripeError: any) {
      // If Stripe invoice doesn't exist or can't be retrieved, try checking payment intents
      console.error('Error retrieving Stripe invoice:', stripeError.message);
      
      // Search for payment intents with this invoice_id in metadata
      const paymentIntents = await stripe.paymentIntents.search({
        query: `metadata['invoice_id']:'${invoiceId}'`,
        limit: 1,
      });

      if (paymentIntents.data.length > 0) {
        const paymentIntent = paymentIntents.data[0];
        
        if (paymentIntent.status === 'succeeded') {
          const { error: updateError } = await supabase
            .from('invoices')
            .update({
              status: 'paid',
              paid_at: new Date().toISOString(),
            })
            .eq('id', invoiceId);

          if (updateError) throw updateError;

          return res.status(200).json({
            status: 'paid',
            message: 'Invoice status synced from PaymentIntent: paid',
            wasUpdated: true,
          });
        }
      }

      return res.status(200).json({
        status: invoice.status,
        message: 'Could not verify payment status in Stripe',
        wasUpdated: false,
      });
    }
  } catch (error: any) {
    console.error('Sync invoice status error:', error);
    return res.status(500).json({ error: error.message || 'Failed to sync invoice status' });
  }
}
