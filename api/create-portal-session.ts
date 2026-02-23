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
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing user ID' });
    }

    // Get user's Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (userError || !user) throw new Error('User not found');
    if (!user.stripe_customer_id) throw new Error('User has no Stripe customer ID');

    // Create Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${req.headers.origin}/dashboard`,
    });

    return res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Create portal session error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create portal session' });
  }
}
