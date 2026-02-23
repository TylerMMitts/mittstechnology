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

// You'll need to create a Product and Price in Stripe dashboard first
// Then add the price ID to your environment variables
const MONTHLY_MAINTENANCE_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing user ID' });
    }

    if (!MONTHLY_MAINTENANCE_PRICE_ID) {
      throw new Error('Stripe price ID not configured');
    }

    // Get user's Stripe customer ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (userError || !user) throw new Error('User not found');
    if (!user.stripe_customer_id) throw new Error('User has no Stripe customer ID');

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripe_customer_id,
      items: [{ price: MONTHLY_MAINTENANCE_PRICE_ID }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Update user subscription status
    const { error: updateError } = await supabase
      .from('users')
      .update({ subscription_status: 'active' })
      .eq('id', userId);

    if (updateError) throw updateError;

    return res.status(200).json({
      success: true,
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (error: any) {
    console.error('Create subscription error:', error);
    return res.status(500).json({ error: error.message || 'Failed to create subscription' });
  }
}
