-- Fix foreign key constraint issues and user_activity table
-- Make user_id nullable to handle cases where user might not exist
ALTER TABLE user_activity 
ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies to allow access for both authenticated and anonymous users
DROP POLICY IF EXISTS "Users can view own activity" ON user_activity;
DROP POLICY IF EXISTS "Anyone can create activity" ON user_activity;
DROP POLICY IF EXISTS "Admin can view all activity" ON user_activity;

-- Create new permissive policies for user_activity
CREATE POLICY "Allow anonymous and authenticated activity insertion" 
ON user_activity 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view own activity or admin can view all" 
ON user_activity 
FOR SELECT 
USING (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR is_admin()
);

-- Fix user_sessions table constraints as well
ALTER TABLE user_sessions 
ALTER COLUMN user_id DROP NOT NULL;

-- Update user_sessions policies
DROP POLICY IF EXISTS "Users can view own sessions" ON user_sessions;
DROP POLICY IF EXISTS "Anyone can create sessions" ON user_sessions;
DROP POLICY IF EXISTS "Anyone can update sessions" ON user_sessions;
DROP POLICY IF EXISTS "Admin can view all sessions" ON user_sessions;

-- Create new permissive policies for user_sessions
CREATE POLICY "Allow session management for all users" 
ON user_sessions 
FOR ALL 
USING (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR is_admin()
)
WITH CHECK (
  auth.uid() = user_id 
  OR user_id IS NULL 
  OR is_admin()
);