-- Fix security issue: Restrict access to leads tables to admin users only

-- Drop existing public SELECT policies for long_visas_leads
DROP POLICY IF EXISTS "Public can view visa leads" ON public.long_visas_leads;

-- Drop existing public SELECT policies for short_visas_leads  
DROP POLICY IF EXISTS "Public can view visa leads" ON public.short_visas_leads;

-- Create admin-only SELECT policies for long_visas_leads
CREATE POLICY "Admin can view long visa leads" 
ON public.long_visas_leads 
FOR SELECT 
USING (is_admin());

-- Create admin-only SELECT policies for short_visas_leads
CREATE POLICY "Admin can view short visa leads" 
ON public.short_visas_leads 
FOR SELECT 
USING (is_admin());

-- Keep existing INSERT policies to allow public lead submissions
-- (These are already correct - "Public can insert visa leads")