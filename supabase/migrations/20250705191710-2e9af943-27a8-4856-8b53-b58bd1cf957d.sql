-- Enhanced visa applications table with new reference system
ALTER TABLE public.visa_applications 
ADD COLUMN IF NOT EXISTS application_reference_new TEXT,
ADD COLUMN IF NOT EXISTS country_code TEXT,
ADD COLUMN IF NOT EXISTS application_number INTEGER,
ADD COLUMN IF NOT EXISTS total_travelers INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS auto_saved_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS progress_step INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS progress_data JSONB DEFAULT '{}';

-- Create application travelers table for multi-traveler support
CREATE TABLE IF NOT EXISTS public.application_travelers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  application_id UUID NOT NULL,
  traveler_number INTEGER NOT NULL,
  traveler_reference TEXT NOT NULL,
  personal_info JSONB DEFAULT '{}',
  passport_info JSONB DEFAULT '{}',
  contact_info JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT application_travelers_application_id_fkey 
    FOREIGN KEY (application_id) REFERENCES visa_applications(id) ON DELETE CASCADE,
  CONSTRAINT unique_traveler_per_application 
    UNIQUE (application_id, traveler_number)
);

-- Enhanced bookings table for integrated trip management
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS booking_category TEXT DEFAULT 'other',
ADD COLUMN IF NOT EXISTS confirmation_code TEXT,
ADD COLUMN IF NOT EXISTS supplier_reference TEXT,
ADD COLUMN IF NOT EXISTS cancellation_policy JSONB,
ADD COLUMN IF NOT EXISTS special_requirements TEXT;

-- Create user preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  notification_settings JSONB DEFAULT '{"email": true, "sms": false, "push": true}',
  privacy_settings JSONB DEFAULT '{"profile_visibility": "private"}',
  travel_preferences JSONB DEFAULT '{}',
  emergency_contacts JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT user_preferences_user_id_key UNIQUE (user_id)
);

-- Enable RLS on new tables
ALTER TABLE public.application_travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS policies for application_travelers
CREATE POLICY "Users can manage travelers for their applications" 
ON public.application_travelers 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM visa_applications 
    WHERE visa_applications.id = application_travelers.application_id 
    AND visa_applications.user_id = auth.uid()
  )
);

-- RLS policies for user_preferences
CREATE POLICY "Users can manage their own preferences" 
ON public.user_preferences 
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Function to generate application reference
CREATE OR REPLACE FUNCTION public.generate_application_reference(
  p_country_code TEXT,
  p_application_date DATE DEFAULT CURRENT_DATE
) RETURNS TEXT AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate traveler reference
CREATE OR REPLACE FUNCTION public.generate_traveler_reference(
  p_base_reference TEXT,
  p_traveler_number INTEGER
) RETURNS TEXT AS $$
BEGIN
  -- Replace the last part (traveler number) with the new number
  RETURN REGEXP_REPLACE(p_base_reference, '/\d+$', '/' || LPAD(p_traveler_number::TEXT, 2, '0'));
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate application reference
CREATE OR REPLACE FUNCTION public.set_application_reference()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_set_application_reference
  BEFORE INSERT ON public.visa_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_application_reference();

-- Update timestamps trigger for new tables
CREATE OR REPLACE TRIGGER update_application_travelers_updated_at
  BEFORE UPDATE ON public.application_travelers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();