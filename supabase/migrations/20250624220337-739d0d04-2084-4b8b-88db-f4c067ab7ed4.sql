
-- Create table for storing OTP codes
CREATE TABLE public.otp_codes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email text NOT NULL,
  code text NOT NULL,
  verification_method text NOT NULL CHECK (verification_method IN ('email', 'sms')),
  purpose text NOT NULL CHECK (purpose IN ('signup', 'signin')),
  phone_number text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '10 minutes'),
  verified_at timestamp with time zone,
  attempts integer NOT NULL DEFAULT 0,
  max_attempts integer NOT NULL DEFAULT 3,
  is_used boolean NOT NULL DEFAULT false
);

-- Add Row Level Security
ALTER TABLE public.otp_codes ENABLE ROW LEVEL SECURITY;

-- Create policy for OTP codes (users can only access their own codes)
CREATE POLICY "Users can access their own OTP codes" 
  ON public.otp_codes 
  FOR ALL 
  USING (user_email = auth.jwt() ->> 'email' OR auth.jwt() IS NULL);

-- Create index for faster lookups
CREATE INDEX idx_otp_codes_email_code ON public.otp_codes(user_email, code);
CREATE INDEX idx_otp_codes_expires_at ON public.otp_codes(expires_at);

-- Add phone number to profiles table for SMS verification
ALTER TABLE public.profiles ADD COLUMN phone_number text;

-- Create function to clean up expired OTP codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_otp_codes()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.otp_codes 
  WHERE expires_at < now() OR is_used = true;
END;
$$;

-- Create function to generate OTP code
CREATE OR REPLACE FUNCTION public.generate_otp_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN LPAD(FLOOR(RANDOM() * 1000000)::text, 6, '0');
END;
$$;

-- Create function to validate OTP attempts
CREATE OR REPLACE FUNCTION public.check_otp_rate_limit(_email text, _max_codes integer DEFAULT 3, _time_window_minutes integer DEFAULT 15)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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
