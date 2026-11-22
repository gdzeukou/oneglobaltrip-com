-- ogt_orders is the record of what a customer paid for. Until now the browser
-- wrote it: RLS let a signed-in user insert a row already marked
-- payment_status = 'completed', and update their own row afterwards. Either
-- one gives a "paid" order without a charge.
--
-- After this migration the browser can do exactly one thing: create its own
-- pending order (plan, add-ons, trip details). Payment state and every money
-- column are written by the square-create-payment function with the service
-- role, after Square has charged the server-computed amount.
--
-- Service role, migrations, the SQL editor and admins are not affected.

-- 1. Plans the site sells. The original constraint predates global_explorer,
--    so a Global Explorer order could not be inserted at all. The older ids
--    stay so existing rows remain valid. NOT VALID skips re-checking old rows
--    and still applies to every new or updated row.
ALTER TABLE public.ogt_orders DROP CONSTRAINT IF EXISTS ogt_orders_plan_type_check;
ALTER TABLE public.ogt_orders
  ADD CONSTRAINT ogt_orders_plan_type_check
  CHECK (plan_type IN ('visa_assist', 'global_explorer', 'trip_bundle', 'ogt_elite', 'passport_club'))
  NOT VALID;

-- 2. Policies. Customers may read their orders and create their own. They may
--    no longer update them, and an order must belong to the person creating it
--    (the old policy also allowed user_id IS NULL, i.e. anonymous inserts).
DROP POLICY IF EXISTS "Users can update their own orders" ON public.ogt_orders;
DROP POLICY IF EXISTS "Users can create orders" ON public.ogt_orders;
CREATE POLICY "Users can create orders"
ON public.ogt_orders
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- 3. Trigger. Policies are easy to loosen by accident, and they cannot
--    restrict individual columns, so the rule is also enforced here.
CREATE OR REPLACE FUNCTION public.guard_ogt_order_payment_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  -- auth.role() is 'authenticated' or 'anon' only for requests coming through
  -- the API with an end-user key.
  IF COALESCE(auth.role(), '') NOT IN ('authenticated', 'anon') OR public.is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    -- Blocking the whole update, not only the payment columns: changing
    -- plan_type or addons on a paid order would be a free upgrade, and
    -- changing them mid-payment would race the charge.
    RAISE EXCEPTION 'Orders cannot be changed after they are created'
      USING ERRCODE = '42501';
  END IF;

  IF auth.uid() IS NULL OR NEW.user_id IS DISTINCT FROM auth.uid() THEN
    RAISE EXCEPTION 'An order must belong to the signed-in user'
      USING ERRCODE = '42501';
  END IF;

  -- A new order is always unpaid, whatever the client sent. The money columns
  -- are filled in by the payment function from the server price list.
  NEW.payment_status := 'pending';
  NEW.order_status := 'created';
  NEW.plan_price := 0;
  NEW.addons_total := 0;
  NEW.total_amount := 0;
  NEW.currency := 'USD';
  NEW.square_payment_id := NULL;
  NEW.square_order_id := NULL;
  NEW.confirmed_at := NULL;
  NEW.completed_at := NULL;
  NEW.automation_processed := false;
  NEW.webhook_sent := false;
  NEW.membership_duration_days := NULL;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_guard_ogt_order_payment_fields ON public.ogt_orders;
CREATE TRIGGER trigger_guard_ogt_order_payment_fields
  BEFORE INSERT OR UPDATE ON public.ogt_orders
  FOR EACH ROW EXECUTE FUNCTION public.guard_ogt_order_payment_fields();
