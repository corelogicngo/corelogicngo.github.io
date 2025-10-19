import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      schools: {
        Row: {
          id: string;
          name: string;
          email: string;
          password_hash: string;
          phone: string | null;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['schools']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['schools']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          event_date: string;
          venue: string;
          registration_start: string | null;
          registration_end: string | null;
          image_url: string | null;
          video_url: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      registrations: {
        Row: {
          id: string;
          event_id: string | null;
          school_id: string | null;
          full_name: string;
          email: string;
          phone: string | null;
          organization: string | null;
          role: string;
          interest: string;
          student1_name: string | null;
          student1_email: string | null;
          student2_name: string | null;
          student2_email: string | null;
          notes: string | null;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['registrations']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['registrations']['Insert']>;
      };
      winners: {
        Row: {
          id: string;
          event_id: string;
          school_id: string;
          position: number;
          student_names: string;
          video_url: string | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['winners']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['winners']['Insert']>;
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          role: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['admin_users']['Insert']>;
      };
    };
  };
};
