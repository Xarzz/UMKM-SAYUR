import { createClient } from '@supabase/supabase-js';

// Pastikan dipanggil langsung agar Turbopack me-replace string-nya
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
