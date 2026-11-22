-- The signed-in traveler's own appointment-hunt orders, for the account page.
--
-- Orders are created at checkout before anyone signs in, so they are tied to
-- an email, not a user id. This returns the orders whose email matches the
-- caller's confirmed email, and only the fields the account page shows: no
-- passport number, date of birth or phone.

create or replace function public.my_scoutpass_orders()
returns table (
  id uuid,
  tracking_number text,
  status text,
  destination_country text,
  visa_type text,
  created_at timestamptz,
  paid_at timestamptz,
  appointment_secured_at timestamptz,
  decision_received_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select o.id, o.tracking_number, o.status::text, o.destination_country, o.visa_type,
         o.created_at, o.paid_at, o.appointment_secured_at, o.decision_received_at
  from public.scoutpass_orders o
  join auth.users u on u.id = auth.uid()
  where u.email_confirmed_at is not null
    and lower(o.email) = lower(u.email)
  order by o.created_at desc
$$;

revoke all on function public.my_scoutpass_orders() from public, anon;
grant execute on function public.my_scoutpass_orders() to authenticated;
