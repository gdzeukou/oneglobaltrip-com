
-- Fix all database functions to eliminate "function search path mutable" warnings
-- by explicitly setting search_path to public

CREATE OR REPLACE FUNCTION public.cleanup_expired_otp_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() OR is_used = true;
END;
$$;

CREATE OR REPLACE FUNCTION public.generate_otp_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::text, 6, '0');
END;
$$;

CREATE OR REPLACE FUNCTION public.check_otp_rate_limit(_email text, _max_codes integer DEFAULT 3, _time_window_minutes integer DEFAULT 15)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _current_count INTEGER;
BEGIN
  -- Count active OTP codes in the time window
  SELECT COUNT(*)
  INTO _current_count
  FROM public.otp_codes
  WHERE user_email = _email 
    AND created_at > (now() - (_time_window_minutes || ' minutes')::INTERVAL)
    AND is_used = false;

  -- Return true if under limit, false if over limit
  RETURN _current_count < _max_codes;
END;
$$;

CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(_ip_address text, _email text, _max_submissions integer DEFAULT 3, _time_window_minutes integer DEFAULT 60)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

CREATE OR REPLACE FUNCTION public.validate_email_format()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format: %', NEW.email;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  -- For now, return false until admin system is implemented
  -- This can be updated later to check user roles
  SELECT false;
$$;
