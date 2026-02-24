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
      .select('*, user_id')
      .eq('id', invoiceId)
      .single();

    if (invoiceError || !invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Get user's Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, email, name')
      .eq('id', invoice.user_id)
      .single();

    if (userError || !user || !user.stripe_customer_id) {
      return res.status(404).json({ error: 'User or customer not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(invoice.amount * 100), // Convert to cents
      currency: 'usd',
      customer: user.stripe_customer_id,
      metadata: {
        invoice_id: invoiceId,
        user_id: invoice.user_id,
        stripe_invoice_id: invoice.stripe_invoice_id,
      },
      description: invoice.description,
      receipt_email: user.email,
    });

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Create payment intent error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create payment intent' });
  }
}
