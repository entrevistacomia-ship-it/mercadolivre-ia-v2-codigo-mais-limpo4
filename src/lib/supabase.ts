import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  user_type: 'buyer' | 'seller';
  user_level: string;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  created_at: string;
};

export type Agent = {
  id: string;
  seller_id: string;
  category_id: string | null;
  name: string;
  description: string;
  price: number;
  is_featured: boolean;
  is_free: boolean;
  n8n_url: string | null;
  images: string[];
  videos: string[];
  created_at: string;
  updated_at: string;
};

export type Purchase = {
  id: string;
  buyer_id: string;
  agent_id: string;
  price_paid: number;
  purchased_at: string;
  license_type: 'lifetime' | 'temporary';
  license_expires_at: string | null;
};

export type Review = {
  id: string;
  agent_id: string;
  user_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
};

export type Favorite = {
  id: string;
  user_id: string;
  agent_id: string;
  created_at: string;
};

export type CartItem = {
  id: string;
  user_id: string;
  agent_id: string;
  created_at: string;
};
