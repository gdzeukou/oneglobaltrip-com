-- Create ogt_orders table for storing all booking submissions
CREATE TABLE public.ogt_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  order_reference TEXT NOT NULL UNIQUE DEFAULT ('OGT-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8))),
  
  -- Plan details
  plan_type TEXT NOT NULL CHECK (plan_type IN ('visa_assist', 'trip_bundle', 'ogt_elite')),
  plan_price DECIMAL(10,2) NOT NULL,
  
  -- Trip information
  trip_meta JSONB NOT NULL DEFAULT '{}',
  
  -- Add-ons with quantities
  addons JSONB NOT NULL DEFAULT '[]',
  addons_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  
  -- Payment information
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  square_payment_id TEXT,
  square_order_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  
  -- Order status
  order_status TEXT NOT NULL DEFAULT 'created' CHECK (order_status IN ('created', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  
  -- Automation flags
  automation_processed BOOLEAN NOT NULL DEFAULT false,
  webhook_sent BOOLEAN NOT NULL DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.ogt_orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own orders"
ON public.ogt_orders
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
ON public.ogt_orders
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own orders"
ON public.ogt_orders
FOR UPDATE
USING (auth.uid() = user_id);

-- Admin policy for full access
CREATE POLICY "Admins can manage all orders"
ON public.ogt_orders
FOR ALL
USING (is_admin());

-- Create indexes for performance
CREATE INDEX idx_ogt_orders_user_id ON public.ogt_orders(user_id);
CREATE INDEX idx_ogt_orders_status ON public.ogt_orders(order_status);
CREATE INDEX idx_ogt_orders_created ON public.ogt_orders(created_at);
CREATE INDEX idx_ogt_orders_square_payment ON public.ogt_orders(square_payment_id);

-- Create trigger for updated_at
CREATE TRIGGER update_ogt_orders_updated_at
BEFORE UPDATE ON public.ogt_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();