-- Add membership_expiry field to profiles table for Passport Club subscription tracking
ALTER TABLE public.profiles 
ADD COLUMN membership_expiry DATE;

-- Add membership status helper function
CREATE OR REPLACE FUNCTION public.is_passport_club_member(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE 
    WHEN membership_expiry IS NULL THEN false
    WHEN membership_expiry < CURRENT_DATE THEN false
    ELSE true
  END
  FROM profiles 
  WHERE id = user_id;
$$;

-- Update ogt_orders table to support passport_club plan type
ALTER TABLE public.ogt_orders 
ADD COLUMN IF NOT EXISTS membership_duration_days INTEGER DEFAULT NULL;

-- Create webhook placeholder for membership automation
CREATE TABLE IF NOT EXISTS public.membership_webhooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  event_type TEXT NOT NULL,
  webhook_data JSONB DEFAULT '{}',
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on membership_webhooks
ALTER TABLE public.membership_webhooks ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for membership_webhooks
CREATE POLICY "Users can view their own membership webhooks"
ON public.membership_webhooks
FOR ALL
USING (auth.uid() = user_id);

-- Add index for membership_expiry lookup
CREATE INDEX IF NOT EXISTS idx_profiles_membership_expiry ON public.profiles(membership_expiry);

-- Add trigger to update membership_expiry when passport club is purchased
CREATE OR REPLACE FUNCTION public.update_membership_expiry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Create trigger on ogt_orders
DROP TRIGGER IF EXISTS trigger_update_membership_expiry ON public.ogt_orders;
CREATE TRIGGER trigger_update_membership_expiry
  AFTER UPDATE ON public.ogt_orders
  FOR EACH ROW
  WHEN (OLD.payment_status != NEW.payment_status AND NEW.payment_status = 'completed')
  EXECUTE FUNCTION public.update_membership_expiry();