
-- Drop and recreate all tables with proper structure
DROP TABLE IF EXISTS public.visa_applications CASCADE;
DROP TABLE IF EXISTS public.form_submissions CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.user_activity CASCADE;

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  nationality TEXT,
  passport_number TEXT,
  passport_expiry DATE,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create visa_applications table
CREATE TABLE public.visa_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  application_reference TEXT UNIQUE DEFAULT ('VA-' || EXTRACT(YEAR FROM now()) || '-' || LPAD(FLOOR(RANDOM() * 100000)::text, 5, '0')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  nationality TEXT NOT NULL,
  visa_type TEXT NOT NULL,
  travel_purpose TEXT DEFAULT 'tourism',
  departure_date DATE,
  return_date DATE,
  status TEXT DEFAULT 'draft',
  application_data JSONB DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create form_submissions table (enhanced)
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  form_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  nationality TEXT,
  destination TEXT,
  travel_date TEXT,
  return_date TEXT,
  departure_date TEXT,
  travel_purpose TEXT DEFAULT 'tourism',
  visa_type TEXT,
  travelers TEXT,
  budget TEXT,
  duration TEXT,
  travel_needs TEXT[],
  selected_packages TEXT[],
  special_requests TEXT,
  other_needs TEXT,
  lead_status TEXT DEFAULT 'new',
  lead_tags TEXT[] DEFAULT '{}',
  sales_value NUMERIC DEFAULT 0,
  appointment_booked BOOLEAN DEFAULT false,
  contacted_at TIMESTAMP WITH TIME ZONE,
  last_follow_up TIMESTAMP WITH TIME ZONE,
  internal_notes TEXT,
  referral_source TEXT,
  referrer TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create user_activity table
CREATE TABLE public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,
  email TEXT NOT NULL,
  page_visited TEXT NOT NULL,
  action_type TEXT,
  action_data JSONB,
  referrer_source TEXT,
  ip_address TEXT,
  user_agent TEXT,
  city TEXT,
  country TEXT,
  location_data JSONB,
  session_duration INTEGER,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for visa_applications
CREATE POLICY "Users can view own applications" ON public.visa_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own applications" ON public.visa_applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON public.visa_applications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own applications" ON public.visa_applications FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for form_submissions
CREATE POLICY "Admin can view all submissions" ON public.form_submissions FOR SELECT USING (is_admin());
CREATE POLICY "Users can view own submissions" ON public.form_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create submissions" ON public.form_submissions FOR INSERT WITH CHECK (true);

-- RLS Policies for user_activity
CREATE POLICY "Admin can view all activity" ON public.user_activity FOR SELECT USING (is_admin());
CREATE POLICY "Users can view own activity" ON public.user_activity FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can create activity" ON public.user_activity FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_visa_applications_user_id ON public.visa_applications(user_id);
CREATE INDEX idx_visa_applications_status ON public.visa_applications(status);
CREATE INDEX idx_form_submissions_user_id ON public.form_submissions(user_id);
CREATE INDEX idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX idx_user_activity_email ON public.user_activity(email);

-- Create triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_visa_applications_updated_at BEFORE UPDATE ON public.visa_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON public.form_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
