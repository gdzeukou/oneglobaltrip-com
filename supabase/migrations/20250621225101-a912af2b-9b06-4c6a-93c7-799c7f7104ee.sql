
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  nationality TEXT,
  passport_number TEXT,
  passport_expiry DATE,
  date_of_birth DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trips table for managing user trips
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination_country TEXT NOT NULL,
  departure_city TEXT,
  departure_date DATE,
  return_date DATE,
  trip_type TEXT DEFAULT 'tourism',
  status TEXT DEFAULT 'planning', -- planning, booked, in_progress, completed, cancelled
  total_budget DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for flights, hotels, activities
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_type TEXT NOT NULL, -- flight, hotel, activity, rental
  booking_reference TEXT,
  provider TEXT,
  description TEXT,
  booking_date DATE,
  check_in_date DATE,
  check_out_date DATE,
  location TEXT,
  cost DECIMAL(10,2),
  status TEXT DEFAULT 'confirmed', -- confirmed, pending, cancelled
  booking_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table for file storage
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.visa_applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- passport, photo, certificate, etc
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhance visa_applications table with user_id and status tracking
ALTER TABLE public.visa_applications 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'submitted',
ADD COLUMN IF NOT EXISTS application_reference TEXT,
ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Add status options: submitted, under_review, additional_docs_required, approved, rejected, visa_issued

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_applications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for trips
CREATE POLICY "Users can view their own trips" ON public.trips
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own trips" ON public.trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own trips" ON public.trips
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own trips" ON public.trips
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own bookings" ON public.bookings
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for documents
CREATE POLICY "Users can view their own documents" ON public.documents
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upload their own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own documents" ON public.documents
  FOR DELETE USING (auth.uid() = user_id);

-- Update RLS policies for visa_applications
DROP POLICY IF EXISTS "Allow all access to visa_applications" ON public.visa_applications;
CREATE POLICY "Users can view their own applications" ON public.visa_applications
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can create applications" ON public.visa_applications
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their own applications" ON public.visa_applications
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
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

-- Create trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add update triggers for timestamp columns
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_trips_updated_at BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
