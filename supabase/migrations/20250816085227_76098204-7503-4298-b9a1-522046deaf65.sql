-- Fix security issue: Restrict user_sessions access to authenticated users and admins only

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Allow session management for all users" ON public.user_sessions;

-- Create secure policies for user_sessions
CREATE POLICY "Users can manage their own sessions" 
ON public.user_sessions 
FOR ALL 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow admins to view all sessions
CREATE POLICY "Admins can view all sessions" 
ON public.user_sessions 
FOR SELECT 
USING (is_admin());

-- Allow admins to manage all sessions  
CREATE POLICY "Admins can manage all sessions" 
ON public.user_sessions 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());

-- Allow system to insert anonymous sessions (for tracking before login)
-- but restrict to INSERT only, no SELECT access
CREATE POLICY "System can insert anonymous sessions" 
ON public.user_sessions 
FOR INSERT 
WITH CHECK (user_id IS NULL);