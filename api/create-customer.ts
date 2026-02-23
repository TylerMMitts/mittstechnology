import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '' // Note: Need service role key for admin operations
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, email, name } = req.body;

    if (!userId || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        supabase_user_id: userId,
      },
    });

    // Update user in Supabase with Stripe customer ID
    const { error } = await supabase
      .from('users')
      .update({ stripe_customer_id: customer.id })
      .eq('id', userId);

    if (error) throw error;

    return res.status(200).json({
      success: true,
      customerId: customer.id,
    });
  } catch (error: any) {
    console.error('Create customer error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create customer' });
  }
}
