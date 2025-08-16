-- Fix security issue: Restrict automation_rules access to admin users only

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Allow all access to automation_rules" ON public.automation_rules;

-- Create secure admin-only policies for automation_rules
CREATE POLICY "Admins can view automation rules" 
ON public.automation_rules 
FOR SELECT 
USING (is_admin());

-- Allow admins to create automation rules
CREATE POLICY "Admins can create automation rules" 
ON public.automation_rules 
FOR INSERT 
WITH CHECK (is_admin());

-- Allow admins to update automation rules
CREATE POLICY "Admins can update automation rules" 
ON public.automation_rules 
FOR UPDATE 
USING (is_admin())
WITH CHECK (is_admin());

-- Allow admins to delete automation rules
CREATE POLICY "Admins can delete automation rules" 
ON public.automation_rules 
FOR DELETE 
USING (is_admin());