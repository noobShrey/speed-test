// File: lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// ==========================================
// 🔴 HIGHLIGHT: DATABASE CONNECTION SETUP
// ==========================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xokoyzziccfwjucoszme.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhva295enppY2Nmd2p1Y29zem1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4Mzk1NDMsImV4cCI6MjA5NjQxNTU0M30.DKi66Jj7hP7Q9FJYGWbfeLIpW6NqyDGxR8X5v0m4bPc';

export const supabase = createClient(supabaseUrl, supabaseKey);
// ==========================================