
-- Create table for consultation requests
CREATE TABLE public.consultation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  travel_dates TEXT,
  destinations TEXT,
  travelers TEXT,
  budget TEXT,
  interests TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for visa applications
CREATE TABLE public.visa_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  visa_type TEXT NOT NULL,
  nationality TEXT NOT NULL,
  travel_purpose TEXT NOT NULL DEFAULT 'tourism',
  departure_date DATE,
  return_date DATE,
  previous_visas TEXT,
  special_circumstances TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (these tables don't need user-specific access, but it's good practice)
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visa_applications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for form submissions
CREATE POLICY "Allow public consultation submissions" 
  ON public.consultation_requests 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow public visa submissions" 
  ON public.visa_applications 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Admin can view all submissions (you'll need to implement auth later)
CREATE POLICY "Admin can view consultation requests" 
  ON public.consultation_requests 
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Admin can view visa applications" 
  ON public.visa_applications 
  FOR SELECT 
  TO authenticated 
  USING (true);
