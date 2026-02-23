import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, amount, description } = req.body;

    if (!userId || !amount || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Get user's Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    if (userError || !user) throw new Error('User not found');
    if (!user.stripe_customer_id) throw new Error('User has no Stripe customer ID');

    // Create invoice in Stripe
    const invoice = await stripe.invoices.create({
      customer: user.stripe_customer_id,
      collection_method: 'send_invoice',
      days_until_due: 30,
      description,
    });

    // Add invoice item
    await stripe.invoiceItems.create({
      customer: user.stripe_customer_id,
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'usd',
      description,
      invoice: invoice.id,
    });

    // Finalize and send the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Save invoice to database
    const { error: dbError } = await supabase.from('invoices').insert({
      user_id: userId,
      stripe_invoice_id: finalizedInvoice.id,
      amount,
      status: 'pending',
      description,
    });

    if (dbError) throw dbError;

    return res.status(200).json({
      success: true,
      invoiceId: finalizedInvoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
    });
  } catch (error: any) {
    console.error('Create invoice error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create invoice' });
  }
}
