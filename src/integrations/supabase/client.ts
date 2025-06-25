
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sdeyqojklszwarfrputz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkZXlxb2prbHN6d2FyZnJwdXR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODMyOTQsImV4cCI6MjA2NjA1OTI5NH0.YYRvAUAJF0Ow95sZ1OM21fDXz8FHtpUAMrmqlsbZf8o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})
