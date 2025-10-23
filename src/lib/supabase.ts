import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdjjnzawwotojarmnepr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkampuemF3d290b2phcm1uZXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4OTA2MDAsImV4cCI6MjA3NDQ2NjYwMH0.Ba4T_kaZiV94aMG1JloXlvQMxXlnLfMM5A9McBGZQ8o';

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
