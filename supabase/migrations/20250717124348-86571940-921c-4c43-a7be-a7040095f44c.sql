-- Fix database function security by adding SET search_path to public for all vulnerable functions

-- Fix generate_application_reference function
CREATE OR REPLACE FUNCTION public.generate_application_reference(p_country_code text, p_application_date date DEFAULT CURRENT_DATE)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  formatted_date TEXT;
  next_app_number INTEGER;
  reference TEXT;
BEGIN
  -- Format date as DDMMYYYY
  formatted_date := TO_CHAR(p_application_date, 'DDMMYYYY');
  
  -- Get next application number for this country and date
  SELECT COALESCE(MAX(application_number), 0) + 1
  INTO next_app_number
  FROM visa_applications
  WHERE country_code = p_country_code
    AND DATE(created_at) = p_application_date;
  
  -- Generate reference: OGT/COUNTRY/DDMMYYYY/NNNN/01
  reference := 'OGT/' || UPPER(p_country_code) || '/' || formatted_date || '/' || 
               LPAD(next_app_number::TEXT, 4, '0') || '/01';
  
  RETURN reference;
END;
$$;

-- Fix generate_otp_code function
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

-- Fix generate_traveler_reference function
CREATE OR REPLACE FUNCTION public.generate_traveler_reference(p_base_reference text, p_traveler_number integer)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  -- Replace the last part (traveler number) with the new number
  RETURN REGEXP_REPLACE(p_base_reference, '/\d+$', '/' || LPAD(p_traveler_number::TEXT, 2, '0'));
END;
$$;

-- Fix set_application_reference function
CREATE OR REPLACE FUNCTION public.set_application_reference()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.application_reference_new IS NULL AND NEW.country_code IS NOT NULL THEN
    NEW.application_reference_new := public.generate_application_reference(NEW.country_code);
    NEW.application_number := REGEXP_REPLACE(
      SPLIT_PART(NEW.application_reference_new, '/', 4), 
      '\D', '', 'g'
    )::INTEGER;
  END IF;
  RETURN NEW;
END;
$$;

-- Fix set_booking_reference function
CREATE OR REPLACE FUNCTION public.set_booking_reference()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
    NEW.booking_reference := public.generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$;

-- Fix update_membership_expiry function
CREATE OR REPLACE FUNCTION public.update_membership_expiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this is a passport club order, update the user's membership
  IF NEW.plan_type = 'passport_club' AND NEW.payment_status = 'completed' THEN
    UPDATE public.profiles 
    SET membership_expiry = CURRENT_DATE + INTERVAL '365 days'
    WHERE id = NEW.user_id;
    
    -- Insert webhook event for automation
    INSERT INTO public.membership_webhooks (user_id, event_type, webhook_data)
    VALUES (NEW.user_id, 'membership_created', jsonb_build_object(
      'order_id', NEW.id,
      'plan_type', NEW.plan_type,
      'expiry_date', CURRENT_DATE + INTERVAL '365 days'
    ));
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
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