-- Fix security vulnerability: Restrict user_activity access to authorized users only

-- Drop existing potentially insecure policies for user_activity
DROP POLICY IF EXISTS "Allow anonymous and authenticated activity insertion" ON public.user_activity;
DROP POLICY IF EXISTS "Users can view own activity or admin can view all" ON public.user_activity;

-- Create secure INSERT policy - only allow authenticated users to insert their own activity
CREATE POLICY "Authenticated users can insert their own activity"
ON public.user_activity
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create secure INSERT policy for anonymous activity tracking (system only)
CREATE POLICY "System can insert anonymous activity"
ON public.user_activity
FOR INSERT
TO authenticated
WITH CHECK (user_id IS NULL AND auth.uid() IS NOT NULL);

-- Create secure SELECT policy - users can only view their own activity
CREATE POLICY "Users can view their own activity"
ON public.user_activity
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create admin SELECT policy - admins can view all activity data
CREATE POLICY "Admins can view all activity"
ON public.user_activity
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin management policy - admins can manage all activity data
CREATE POLICY "Admins can manage all activity"
ON public.user_activity
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));