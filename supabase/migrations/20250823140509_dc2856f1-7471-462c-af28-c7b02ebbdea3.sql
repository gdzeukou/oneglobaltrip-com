-- Fix security vulnerability: Restrict form_submission_rate_limit access to system functions only

-- Drop the insecure public access policy
DROP POLICY IF EXISTS "Public access to rate limiting" ON public.form_submission_rate_limit;

-- Create secure policy for service role access (for backend rate limiting)
CREATE POLICY "Service role can manage rate limiting data"
ON public.form_submission_rate_limit
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create secure policy for authenticated system functions
CREATE POLICY "System functions can manage rate limiting"
ON public.form_submission_rate_limit
FOR ALL
TO authenticated
USING (current_setting('role', true) = 'service_role' OR auth.jwt() ->> 'role' = 'service_role')
WITH CHECK (current_setting('role', true) = 'service_role' OR auth.jwt() ->> 'role' = 'service_role');

-- Create admin access policy for management purposes
CREATE POLICY "Admins can view and manage rate limiting data"
ON public.form_submission_rate_limit
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create a security definer function for safe rate limit checking
CREATE OR REPLACE FUNCTION public.check_form_submission_rate_limit(
  _ip_address TEXT,
  _email TEXT,
  _max_submissions INTEGER DEFAULT 3,
  _time_window_minutes INTEGER DEFAULT 60
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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
    INSERT INTO public.form_submission_rate_limit (ip_address, email, submission_count, first_submission_at, last_submission_at)
    VALUES (_ip_address, _email, 1, now(), now())
    ON CONFLICT (ip_address, email) DO UPDATE SET
      submission_count = 1,
      first_submission_at = now(),
      last_submission_at = now();
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