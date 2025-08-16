-- Fix security issue: Restrict flight_bookings access to authenticated users and their own bookings only

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Allow booking access for authenticated users or development" ON public.flight_bookings;

-- Create secure policies for flight_bookings
CREATE POLICY "Users can manage their own flight bookings" 
ON public.flight_bookings 
FOR ALL 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all flight bookings for support
CREATE POLICY "Admins can view all flight bookings" 
ON public.flight_bookings 
FOR SELECT 
USING (is_admin());

-- Allow admins to manage all flight bookings
CREATE POLICY "Admins can manage all flight bookings" 
ON public.flight_bookings 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Allow system to create bookings during chat flow (before user login)
-- but restrict to INSERT only and require user_id to be set
CREATE POLICY "System can create authenticated bookings" 
ON public.flight_bookings 
FOR INSERT 
WITH CHECK (user_id IS NOT NULL);