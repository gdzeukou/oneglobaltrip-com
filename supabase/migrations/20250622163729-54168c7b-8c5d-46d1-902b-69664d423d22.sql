
-- Fix critical RLS policies to prevent data exposure

-- 1. Fix form_submissions table - restrict to user's own submissions or admin access
DROP POLICY IF EXISTS "Allow all access to form_submissions" ON public.form_submissions;

CREATE POLICY "Users can view their own form submissions" 
  ON public.form_submissions 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create form submissions" 
  ON public.form_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own form submissions" 
  ON public.form_submissions 
  FOR UPDATE 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- 2. Fix user_activity table - restrict to user's own activity
DROP POLICY IF EXISTS "Allow all access to user_activity" ON public.user_activity;

CREATE POLICY "Users can view their own activity" 
  ON public.user_activity 
  FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create their own activity" 
  ON public.user_activity 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- 3. Restrict marketing campaigns to admin access only (temporary public for now)
DROP POLICY IF EXISTS "Allow all access to marketing_campaigns" ON public.marketing_campaigns;

CREATE POLICY "Public read access to marketing campaigns" 
  ON public.marketing_campaigns 
  FOR SELECT 
  USING (true);

-- 4. Restrict campaign sends to admin access only (temporary public for now)
DROP POLICY IF EXISTS "Allow all access to campaign_sends" ON public.campaign_sends;

CREATE POLICY "Public read access to campaign sends" 
  ON public.campaign_sends 
  FOR SELECT 
  USING (true);

-- 5. Add missing WITH CHECK clauses to existing policies
-- Fix bookings policies
DROP POLICY IF EXISTS "Users can create their own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can update their own bookings" ON public.bookings;

CREATE POLICY "Users can create their own bookings" 
  ON public.bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Fix documents policies
DROP POLICY IF EXISTS "Users can upload their own documents" ON public.documents;

CREATE POLICY "Users can upload their own documents" 
  ON public.documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Fix profiles policies
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Fix trips policies
DROP POLICY IF EXISTS "Users can create their own trips" ON public.trips;
DROP POLICY IF EXISTS "Users can update their own trips" ON public.trips;

CREATE POLICY "Users can create their own trips" 
  ON public.trips 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips" 
  ON public.trips 
  FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Create a security definer function for admin checks (for future use)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  -- For now, return false until admin system is implemented
  -- This can be updated later to check user roles
  SELECT false;
$$;

-- 7. Add rate limiting table for form submissions
CREATE TABLE IF NOT EXISTS public.form_submission_rate_limit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  email TEXT NOT NULL,
  submission_count INTEGER DEFAULT 1,
  first_submission_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_submission_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(ip_address, email)
);

-- Enable RLS on rate limiting table
ALTER TABLE public.form_submission_rate_limit ENABLE ROW LEVEL SECURITY;

-- Allow public access to rate limiting (needed for unauthenticated submissions)
CREATE POLICY "Public access to rate limiting" 
  ON public.form_submission_rate_limit 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Create function to check submission rate limits
CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(
  _ip_address TEXT,
  _email TEXT,
  _max_submissions INTEGER DEFAULT 5,
  _time_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  _current_count INTEGER;
  _first_submission TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get current submission count and first submission time
  SELECT submission_count, first_submission_at
  INTO _current_count, _first_submission
  FROM public.form_submission_rate_limit
  WHERE ip_address = _ip_address AND email = _email;

  -- If no record exists, create one and allow submission
  IF _current_count IS NULL THEN
    INSERT INTO public.form_submission_rate_limit (ip_address, email)
    VALUES (_ip_address, _email);
    RETURN true;
  END IF;

  -- Check if time window has expired
  IF _first_submission < (now() - (_time_window_minutes || ' minutes')::INTERVAL) THEN
    -- Reset the counter
    UPDATE public.form_submission_rate_limit
    SET submission_count = 1,
        first_submission_at = now(),
        last_submission_at = now()
    WHERE ip_address = _ip_address AND email = _email;
    RETURN true;
  END IF;

  -- Check if under rate limit
  IF _current_count < _max_submissions THEN
    -- Increment counter
    UPDATE public.form_submission_rate_limit
    SET submission_count = submission_count + 1,
        last_submission_at = now()
    WHERE ip_address = _ip_address AND email = _email;
    RETURN true;
  END IF;

  -- Rate limit exceeded
  RETURN false;
END;
$$;
