import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add them to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  name: string;
  stripe_customer_id?: string;
  subscription_status?: 'active' | 'canceled' | 'past_due' | null;
  role: 'customer' | 'admin';
  created_at: string;
}

export interface Invoice {
  id: string;
  user_id: string;
  stripe_invoice_id: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  description: string;
  created_at: string;
  paid_at?: string;
}
