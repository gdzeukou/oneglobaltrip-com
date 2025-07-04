
-- Update booking_payments table to support Square instead of Stripe
ALTER TABLE public.booking_payments 
DROP COLUMN IF EXISTS stripe_payment_id,
ADD COLUMN square_payment_id TEXT,
ADD COLUMN square_order_id TEXT,
ADD COLUMN square_location_id TEXT;

-- Add Square-specific indexes
CREATE INDEX idx_booking_payments_square_payment_id ON public.booking_payments(square_payment_id);
CREATE INDEX idx_booking_payments_square_order_id ON public.booking_payments(square_order_id);

-- Update flight_bookings table to include Square order reference
ALTER TABLE public.flight_bookings 
ADD COLUMN square_order_id TEXT;

-- Create Square webhooks tracking table
CREATE TABLE public.square_webhooks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  webhook_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Add RLS for webhooks (admin only)
ALTER TABLE public.square_webhooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage webhooks" 
  ON public.square_webhooks 
  FOR ALL 
  USING (is_admin());

-- Add indexes for webhook processing
CREATE INDEX idx_square_webhooks_event_type ON public.square_webhooks(event_type);
CREATE INDEX idx_square_webhooks_processed ON public.square_webhooks(processed);
CREATE INDEX idx_square_webhooks_created_at ON public.square_webhooks(created_at);
