import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Crop {
  id: string;
  name: string;
  description: string;
  season: string;
  soil_type: string[];
  water_requirement: string;
  temperature_range: string;
  growing_duration: string;
  image_url: string;
  created_at: string;
}

export interface Fertilizer {
  id: string;
  name: string;
  type: string;
  composition: string;
  suitable_for: string[];
  application_method: string;
  dosage: string;
  created_at: string;
}

export interface Pesticide {
  id: string;
  name: string;
  type: string;
  target_pest: string;
  suitable_for: string[];
  application_method: string;
  safety_period: string;
  created_at: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  created_at: string;
}

export interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author_name: string;
  created_at: string;
}
