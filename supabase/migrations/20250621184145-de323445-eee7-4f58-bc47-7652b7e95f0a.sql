
-- Create table for short-stay visa leads
CREATE TABLE public.short_visas_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  purpose TEXT NOT NULL,
  departure_city TEXT NOT NULL,
  nationality TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for long-stay visa leads
CREATE TABLE public.long_visas_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visa_category TEXT NOT NULL,
  departure_city TEXT NOT NULL,
  nationality TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (making tables public for now since no auth system)
ALTER TABLE public.short_visas_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.long_visas_leads ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (since this is a lead generation form)
CREATE POLICY "Allow all access to short_visas_leads" ON public.short_visas_leads FOR ALL USING (true);
CREATE POLICY "Allow all access to long_visas_leads" ON public.long_visas_leads FOR ALL USING (true);
