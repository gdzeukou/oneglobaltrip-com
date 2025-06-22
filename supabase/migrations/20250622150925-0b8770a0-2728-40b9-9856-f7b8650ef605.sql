
-- Create table to store all form submissions from UnifiedTravelForm
CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  form_type TEXT NOT NULL, -- 'consultation', 'visa-application', 'package-booking'
  
  -- Personal Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  nationality TEXT,
  
  -- Travel Details
  destination TEXT,
  travel_date TEXT,
  duration TEXT,
  travelers TEXT,
  budget TEXT,
  
  -- Package and Travel Needs
  selected_packages TEXT[], -- Array of package IDs
  travel_needs TEXT[], -- Array of travel needs
  other_needs TEXT,
  
  -- Additional Information
  special_requests TEXT,
  visa_type TEXT,
  travel_purpose TEXT DEFAULT 'tourism',
  departure_date TEXT,
  return_date TEXT,
  
  -- Tracking
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table to track user activity and online status
CREATE TABLE public.user_activity (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL, -- For non-authenticated users
  
  -- Activity tracking
  page_visited TEXT NOT NULL,
  action_type TEXT, -- 'page_view', 'form_start', 'form_submit', 'package_view', etc.
  action_data JSONB, -- Additional data about the action
  
  -- Session tracking
  session_id TEXT,
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Device/Location info
  ip_address TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for email/SMS campaigns
CREATE TABLE public.marketing_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'email' or 'sms'
  subject TEXT, -- For emails
  content TEXT NOT NULL,
  
  -- Targeting criteria
  target_form_types TEXT[], -- Target specific form types
  target_travel_needs TEXT[], -- Target users with specific travel needs
  target_destinations TEXT[], -- Target users interested in specific destinations
  target_budget_ranges TEXT[], -- Target users with specific budget ranges
  min_days_since_signup INTEGER DEFAULT 0,
  max_days_since_signup INTEGER,
  
  -- Campaign status
  status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'sent', 'cancelled'
  scheduled_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  
  -- Statistics
  recipients_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table to track campaign sends
CREATE TABLE public.campaign_sends (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES public.marketing_campaigns(id) ON DELETE CASCADE,
  recipient_email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  status TEXT DEFAULT 'sent', -- 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_sends ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (assuming you'll be the admin viewing all data)
-- You can modify these based on your admin user setup

-- Allow all access for now (you can restrict this to admin users later)
CREATE POLICY "Allow all access to form_submissions" ON public.form_submissions FOR ALL USING (true);
CREATE POLICY "Allow all access to user_activity" ON public.user_activity FOR ALL USING (true);
CREATE POLICY "Allow all access to marketing_campaigns" ON public.marketing_campaigns FOR ALL USING (true);
CREATE POLICY "Allow all access to campaign_sends" ON public.campaign_sends FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_form_submissions_email ON public.form_submissions(email);
CREATE INDEX idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX idx_user_activity_email ON public.user_activity(email);
CREATE INDEX idx_user_activity_last_seen ON public.user_activity(last_seen);
CREATE INDEX idx_campaign_sends_campaign_id ON public.campaign_sends(campaign_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON public.form_submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketing_campaigns_updated_at BEFORE UPDATE ON public.marketing_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
