-- square-create-payment charges flight_bookings.total_amount. RLS lets a
-- signed-in user insert and update their own flight_bookings rows, so without
-- this guard they could lower the price on the row and then pay that.
--
-- Only the backend (service role, used by the ai-travel-agent function) and
-- admins may set the price. Customers can still read and otherwise edit
-- their own bookings.

CREATE OR REPLACE FUNCTION public.guard_flight_booking_price()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  -- auth.role() is 'authenticated' or 'anon' only for requests coming through
  -- the API with an end-user key. Service role, migrations and the SQL editor
  -- are unaffected.
  IF COALESCE(auth.role(), '') NOT IN ('authenticated', 'anon') OR public.is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    RAISE EXCEPTION 'Flight bookings are created by the booking service'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.total_amount IS DISTINCT FROM OLD.total_amount
     OR NEW.currency IS DISTINCT FROM OLD.currency THEN
    RAISE EXCEPTION 'The price of a flight booking cannot be changed'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_guard_flight_booking_price ON public.flight_bookings;
CREATE TRIGGER trigger_guard_flight_booking_price
  BEFORE INSERT OR UPDATE ON public.flight_bookings
  FOR EACH ROW EXECUTE FUNCTION public.guard_flight_booking_price();
