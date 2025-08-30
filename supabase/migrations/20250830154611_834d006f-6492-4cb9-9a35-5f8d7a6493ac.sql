-- Fix critical security vulnerability: Remove public access to appointments table
-- The current policy allows unrestricted public access to sensitive appointment data

-- Drop the insecure policy that allows all access
DROP POLICY IF EXISTS "Allow all access to appointments" ON public.appointments;

-- Create secure policies that restrict access to authorized users only

-- Policy 1: Only authenticated admin users can view appointments
CREATE POLICY "Authenticated admins can view appointments"
ON public.appointments
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy 2: Only authenticated admin users can create appointments
CREATE POLICY "Authenticated admins can create appointments"
ON public.appointments
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy 3: Only authenticated admin users can update appointments
CREATE POLICY "Authenticated admins can update appointments"
ON public.appointments
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Policy 4: Only authenticated admin users can delete appointments
CREATE POLICY "Authenticated admins can delete appointments"
ON public.appointments
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));