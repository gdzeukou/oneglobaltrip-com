
-- Add lead management columns to form_submissions
ALTER TABLE public.form_submissions 
ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'not_contacted',
ADD COLUMN IF NOT EXISTS lead_tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS internal_notes TEXT,
ADD COLUMN IF NOT EXISTS contacted_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_follow_up TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS sales_value NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS appointment_booked BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS referral_source TEXT;

-- Add enhanced user activity tracking
ALTER TABLE public.user_activity 
ADD COLUMN IF NOT EXISTS session_duration INTEGER,
ADD COLUMN IF NOT EXISTS referrer_source TEXT,
ADD COLUMN IF NOT EXISTS location_data JSONB;

-- Create email templates table
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  template_type TEXT DEFAULT 'manual', -- 'welcome', 'follow_up', 'booking_confirmation'
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create automation rules table
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL, -- 'form_submit', 'no_reply', 'page_visits'
  trigger_conditions JSONB NOT NULL,
  action_type TEXT NOT NULL, -- 'send_email', 'add_tag', 'update_status'
  action_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointments/calendar table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.form_submissions(id),
  appointment_type TEXT DEFAULT 'consultation',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT DEFAULT 'scheduled', -- 'scheduled', 'completed', 'cancelled', 'no_show'
  meeting_link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create email tracking table
CREATE TABLE IF NOT EXISTS public.email_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_send_id UUID REFERENCES public.campaign_sends(id),
  lead_id UUID REFERENCES public.form_submissions(id),
  email_template_id UUID REFERENCES public.email_templates(id),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  replied_at TIMESTAMP WITH TIME ZONE,
  tracking_pixel_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_tracking ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all access to email_templates" ON public.email_templates FOR ALL USING (true);
CREATE POLICY "Allow all access to automation_rules" ON public.automation_rules FOR ALL USING (true);
CREATE POLICY "Allow all access to appointments" ON public.appointments FOR ALL USING (true);
CREATE POLICY "Allow all access to email_tracking" ON public.email_tracking FOR ALL USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_lead_status ON public.form_submissions(lead_status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_lead_tags ON public.form_submissions USING GIN(lead_tags);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_at ON public.appointments(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_email_tracking_lead_id ON public.email_tracking(lead_id);

-- Insert default email templates
INSERT INTO public.email_templates (name, subject, content, template_type) VALUES
('Visa Welcome', '✈️ Your {{visa_country}} Visa Application - Next Steps', 
'<h2>Hi {{name}},</h2>
<p>Thank you for choosing One Global Trip for your {{visa_country}} visa application!</p>
<p><strong>What happens next:</strong></p>
<ul>
<li>Our visa specialist will review your case within 24 hours</li>
<li>We''ll send you a personalized document checklist</li>
<li>Book your consultation call: <a href="https://calendly.com/oneglobaltrip/intro">Schedule Here</a></li>
</ul>
<p>Questions? Reply to this email or WhatsApp us at +1 (555) 555-0130</p>
<p>Best regards,<br>One Global Trip Team</p>', 'welcome'),

('Follow Up Reminder', 'Don''t Miss Out - {{visa_country}} Visa Deadline Approaching! 🕐', 
'<h2>Hi {{name}},</h2>
<p>We noticed you started your {{visa_country}} visa application but haven''t completed it yet.</p>
<p><strong>⚠️ Important:</strong> Visa processing times are increasing. The sooner we start, the better your chances!</p>
<p><strong>Quick 15-min call?</strong> <a href="https://calendly.com/oneglobaltrip/intro">Book here</a></p>
<p>Or reply with your questions - we''re here to help!</p>', 'follow_up'),

('Booking Confirmation', '🎉 Your Consultation is Confirmed - {{appointment_date}}', 
'<h2>Great news, {{name}}!</h2>
<p>Your consultation for {{visa_country}} visa is confirmed:</p>
<p><strong>📅 Date:</strong> {{appointment_date}}<br>
<strong>🕒 Time:</strong> {{appointment_time}}<br>
<strong>💻 Meeting Link:</strong> {{meeting_link}}</p>
<p><strong>What to prepare:</strong></p>
<ul>
<li>Passport copy</li>
<li>Travel dates (approximate)</li>
<li>Any questions about the visa process</li>
</ul>
<p>See you soon!</p>', 'booking_confirmation');
