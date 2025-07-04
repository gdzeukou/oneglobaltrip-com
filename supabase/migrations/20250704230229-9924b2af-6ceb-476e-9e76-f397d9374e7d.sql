
-- Create flight_bookings table to store actual booking records
CREATE TABLE public.flight_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  conversation_id UUID REFERENCES public.chat_conversations(id),
  booking_reference TEXT UNIQUE NOT NULL,
  pnr_code TEXT,
  booking_status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  flight_data JSONB NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  departure_date DATE NOT NULL,
  return_date DATE,
  origin_airport TEXT NOT NULL,
  destination_airport TEXT NOT NULL,
  airline_code TEXT,
  flight_numbers TEXT[],
  passenger_count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create booking_passengers table for passenger details
CREATE TABLE public.booking_passengers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.flight_bookings(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  nationality TEXT NOT NULL,
  passport_number TEXT,
  passport_expiry DATE,
  email TEXT NOT NULL,
  phone TEXT,
  seat_preference TEXT,
  meal_preference TEXT,
  special_requests TEXT,
  passenger_type TEXT NOT NULL DEFAULT 'adult',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create booking_payments table for payment tracking
CREATE TABLE public.booking_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.flight_bookings(id) ON DELETE CASCADE NOT NULL,
  payment_intent_id TEXT UNIQUE,
  stripe_payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  refund_amount DECIMAL(10,2) DEFAULT 0,
  refund_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create booking_documents table for travel documents
CREATE TABLE public.booking_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES public.flight_bookings(id) ON DELETE CASCADE NOT NULL,
  passenger_id UUID REFERENCES public.booking_passengers(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  document_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX idx_flight_bookings_user_id ON public.flight_bookings(user_id);
CREATE INDEX idx_flight_bookings_status ON public.flight_bookings(booking_status);
CREATE INDEX idx_flight_bookings_departure_date ON public.flight_bookings(departure_date);
CREATE INDEX idx_booking_passengers_booking_id ON public.booking_passengers(booking_id);
CREATE INDEX idx_booking_payments_booking_id ON public.booking_payments(booking_id);
CREATE INDEX idx_booking_payments_status ON public.booking_payments(payment_status);
CREATE INDEX idx_booking_documents_booking_id ON public.booking_documents(booking_id);

-- Enable Row Level Security
ALTER TABLE public.flight_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_passengers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for flight_bookings
CREATE POLICY "Users can view their own bookings" 
  ON public.flight_bookings 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bookings" 
  ON public.flight_bookings 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings" 
  ON public.flight_bookings 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- RLS Policies for booking_passengers
CREATE POLICY "Users can view passengers from their bookings" 
  ON public.booking_passengers 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_passengers.booking_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create passengers for their bookings" 
  ON public.booking_passengers 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_passengers.booking_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update passengers from their bookings" 
  ON public.booking_passengers 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_passengers.booking_id 
    AND user_id = auth.uid()
  ));

-- RLS Policies for booking_payments
CREATE POLICY "Users can view payments from their bookings" 
  ON public.booking_payments 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_payments.booking_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create payments for their bookings" 
  ON public.booking_payments 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_payments.booking_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can update payments from their bookings" 
  ON public.booking_payments 
  FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_payments.booking_id 
    AND user_id = auth.uid()
  ));

-- RLS Policies for booking_documents
CREATE POLICY "Users can view documents from their bookings" 
  ON public.booking_documents 
  FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_documents.booking_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can create documents for their bookings" 
  ON public.booking_documents 
  FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_documents.booking_id 
    AND user_id = auth.uid()
  ));

CREATE POLICY "Users can delete documents from their bookings" 
  ON public.booking_documents 
  FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM public.flight_bookings 
    WHERE id = booking_documents.booking_id 
    AND user_id = auth.uid()
  ));

-- Create function to generate booking references
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN 'OGT-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 1000000)::TEXT, 6, '0');
END;
$$;

-- Create trigger to auto-generate booking references
CREATE OR REPLACE FUNCTION public.set_booking_reference()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
    NEW.booking_reference := public.generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_set_booking_reference
  BEFORE INSERT ON public.flight_bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_booking_reference();

-- Create trigger to update updated_at timestamp
CREATE TRIGGER trigger_update_flight_bookings_updated_at
  BEFORE UPDATE ON public.flight_bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trigger_update_booking_payments_updated_at
  BEFORE UPDATE ON public.booking_payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
