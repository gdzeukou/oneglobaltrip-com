-- Drop the old trips table and recreate with the new schema
DROP TABLE IF EXISTS public.trips CASCADE;

-- Create trips table with new schema for premium travel app
CREATE TABLE public.trips (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  travelers_count INTEGER DEFAULT 1,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'confirmed', 'ongoing', 'completed', 'cancelled')),
  budget_amount DECIMAL(10,2),
  budget_currency TEXT DEFAULT 'USD',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trip_days table
CREATE TABLE public.trip_days (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create trip_activities table
CREATE TABLE public.trip_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_day_id UUID NOT NULL REFERENCES public.trip_days(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('activity', 'transport', 'hotel', 'note')),
  title TEXT NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT,
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  price_amount DECIMAL(10,2),
  price_currency TEXT DEFAULT 'USD',
  booking_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blockchain_keys table
CREATE TABLE public.blockchain_keys (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  key_hash TEXT NOT NULL UNIQUE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE
);

-- Update user_documents table to add encryption columns
ALTER TABLE public.user_documents ADD COLUMN IF NOT EXISTS is_encrypted BOOLEAN DEFAULT false;
ALTER TABLE public.user_documents ADD COLUMN IF NOT EXISTS encryption_method TEXT;
ALTER TABLE public.user_documents ADD COLUMN IF NOT EXISTS blockchain_key_id UUID REFERENCES public.blockchain_keys(id);

-- Enable RLS on all new tables
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blockchain_keys ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trips
CREATE POLICY "Users can view their own trips"
  ON public.trips FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own trips"
  ON public.trips FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for trip_days
CREATE POLICY "Users can view their trip days"
  ON public.trip_days FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_days.trip_id AND trips.user_id = auth.uid()));

CREATE POLICY "Users can create their trip days"
  ON public.trip_days FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_days.trip_id AND trips.user_id = auth.uid()));

CREATE POLICY "Users can update their trip days"
  ON public.trip_days FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_days.trip_id AND trips.user_id = auth.uid()));

CREATE POLICY "Users can delete their trip days"
  ON public.trip_days FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.trips WHERE trips.id = trip_days.trip_id AND trips.user_id = auth.uid()));

-- RLS Policies for trip_activities
CREATE POLICY "Users can view their trip activities"
  ON public.trip_activities FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.trip_days
    JOIN public.trips ON trips.id = trip_days.trip_id
    WHERE trip_days.id = trip_activities.trip_day_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can create their trip activities"
  ON public.trip_activities FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.trip_days
    JOIN public.trips ON trips.id = trip_days.trip_id
    WHERE trip_days.id = trip_activities.trip_day_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their trip activities"
  ON public.trip_activities FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.trip_days
    JOIN public.trips ON trips.id = trip_days.trip_id
    WHERE trip_days.id = trip_activities.trip_day_id AND trips.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their trip activities"
  ON public.trip_activities FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.trip_days
    JOIN public.trips ON trips.id = trip_days.trip_id
    WHERE trip_days.id = trip_activities.trip_day_id AND trips.user_id = auth.uid()
  ));

-- RLS Policies for blockchain_keys
CREATE POLICY "Users can view their own blockchain keys"
  ON public.blockchain_keys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own blockchain key"
  ON public.blockchain_keys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blockchain key"
  ON public.blockchain_keys FOR UPDATE
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_trips_user_id ON public.trips(user_id);
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_trip_days_trip_id ON public.trip_days(trip_id);
CREATE INDEX idx_trip_activities_trip_day_id ON public.trip_activities(trip_day_id);
CREATE INDEX idx_blockchain_keys_user_id ON public.blockchain_keys(user_id);

-- Create trigger for updated_at on trips
CREATE OR REPLACE FUNCTION public.update_trips_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW
  EXECUTE FUNCTION public.update_trips_updated_at();