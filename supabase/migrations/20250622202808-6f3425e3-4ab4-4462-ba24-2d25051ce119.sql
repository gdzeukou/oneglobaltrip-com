
-- Fix missing 'name' column in visa tables
ALTER TABLE public.short_visas_leads ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT '';
ALTER TABLE public.long_visas_leads ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT '';

-- Remove overly permissive policies and create proper RLS policies
DROP POLICY IF EXISTS "Allow all access to short_visas_leads" ON public.short_visas_leads;
DROP POLICY IF EXISTS "Allow all access to long_visas_leads" ON public.long_visas_leads;

-- Create proper RLS policies for visa leads tables
CREATE POLICY "Public can insert visa leads" ON public.short_visas_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view visa leads" ON public.short_visas_leads
  FOR SELECT USING (true);

CREATE POLICY "Public can insert visa leads" ON public.long_visas_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view visa leads" ON public.long_visas_leads
  FOR SELECT USING (true);

-- Improve RLS policies for form_submissions
DROP POLICY IF EXISTS "Users can view their own form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can create form submissions" ON public.form_submissions;
DROP POLICY IF EXISTS "Users can update their own form submissions" ON public.form_submissions;

CREATE POLICY "Public can create form submissions" ON public.form_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view their own submissions or public access" ON public.form_submissions
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL OR 
    public.is_admin()
  );

-- Improve user_activity policies
DROP POLICY IF EXISTS "Users can view their own activity" ON public.user_activity;
DROP POLICY IF EXISTS "Users can create their own activity" ON public.user_activity;

CREATE POLICY "Public can create activity" ON public.user_activity
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view activity" ON public.user_activity
  FOR SELECT USING (
    auth.uid() = user_id OR 
    user_id IS NULL OR 
    public.is_admin()
  );

-- Restrict marketing campaigns and campaign sends to admin only
DROP POLICY IF EXISTS "Public read access to marketing campaigns" ON public.marketing_campaigns;
DROP POLICY IF EXISTS "Public read access to campaign sends" ON public.campaign_sends;

CREATE POLICY "Admin access to marketing campaigns" ON public.marketing_campaigns
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE POLICY "Admin access to campaign sends" ON public.campaign_sends
  FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_short_visas_leads_email ON public.short_visas_leads(email);
CREATE INDEX IF NOT EXISTS idx_short_visas_leads_created_at ON public.short_visas_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_long_visas_leads_email ON public.long_visas_leads(email);
CREATE INDEX IF NOT EXISTS idx_long_visas_leads_created_at ON public.long_visas_leads(created_at);

-- Improve rate limiting function
CREATE OR REPLACE FUNCTION public.check_submission_rate_limit(
  _ip_address TEXT,
  _email TEXT,
  _max_submissions INTEGER DEFAULT 3,
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

-- Add email validation trigger function
CREATE OR REPLACE FUNCTION public.validate_email_format()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format: %', NEW.email;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add email validation triggers to visa tables
DROP TRIGGER IF EXISTS validate_email_short_visas ON public.short_visas_leads;
DROP TRIGGER IF EXISTS validate_email_long_visas ON public.long_visas_leads;

CREATE TRIGGER validate_email_short_visas
  BEFORE INSERT OR UPDATE ON public.short_visas_leads
  FOR EACH ROW EXECUTE FUNCTION public.validate_email_format();

CREATE TRIGGER validate_email_long_visas
  BEFORE INSERT OR UPDATE ON public.long_visas_leads
  FOR EACH ROW EXECUTE FUNCTION public.validate_email_format();
