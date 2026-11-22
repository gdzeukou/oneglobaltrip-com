-- Close public access to the ScoutPass tables.
--
-- Before this migration, anyone holding the public anon key could read every
-- row of scoutpass_orders, scoutpass_group_members, scoutpass_applications and
-- scoutpass_refund_requests (names, contact details, dates of birth, passport
-- numbers, Stripe ids), and update any order, application, refund request or
-- lead, including setting an order's status to 'paid'.
--
-- After it:
--   * service role (create-checkout, stripe-webhook, send-notification):
--     unchanged. It bypasses row-level security.
--   * admins (scoutpass_is_admin()): unchanged, through the *_admin_all policies.
--   * everyone else: no direct access to these tables, except inserting a lead.
--     Order tracking goes through scoutpass_track_order(), which needs the
--     tracking number and the order's email and returns status fields only.
--
-- Rollback statements are at the bottom of this file.

-- 1. scoutpass_orders -------------------------------------------------------
DROP POLICY IF EXISTS scoutpass_orders_public_select ON public.scoutpass_orders;
DROP POLICY IF EXISTS scoutpass_orders_update        ON public.scoutpass_orders;
-- Orders are created by the create-checkout edge function with the service role.
DROP POLICY IF EXISTS scoutpass_orders_insert        ON public.scoutpass_orders;

-- 2. scoutpass_group_members (passport data of fellow travellers) ------------
DROP POLICY IF EXISTS scoutpass_group_members_public_select ON public.scoutpass_group_members;
-- Inserted by create-checkout with the service role.
DROP POLICY IF EXISTS scoutpass_group_members_insert        ON public.scoutpass_group_members;

-- 3. scoutpass_applications (appointment references, decisions, agent notes) -
DROP POLICY IF EXISTS scoutpass_applications_public_select ON public.scoutpass_applications;
DROP POLICY IF EXISTS scoutpass_applications_update        ON public.scoutpass_applications;
-- Inserted by stripe-webhook with the service role.
DROP POLICY IF EXISTS scoutpass_applications_insert        ON public.scoutpass_applications;

-- 4. scoutpass_refund_requests ----------------------------------------------
DROP POLICY IF EXISTS scoutpass_refunds_public_select ON public.scoutpass_refund_requests;
DROP POLICY IF EXISTS scoutpass_refunds_update        ON public.scoutpass_refund_requests;
DROP POLICY IF EXISTS scoutpass_refunds_insert        ON public.scoutpass_refund_requests;

-- 5. scoutpass_comms_log ----------------------------------------------------
-- Written by send-notification with the service role.
DROP POLICY IF EXISTS scoutpass_comms_insert ON public.scoutpass_comms_log;

-- 6. scoutpass_leads --------------------------------------------------------
-- The validated public INSERT policy (scoutpass_leads_insert) stays, so a lead
-- capture form keeps working. The open UPDATE goes.
DROP POLICY IF EXISTS scoutpass_leads_update ON public.scoutpass_leads;

-- 7. Table privileges -------------------------------------------------------
-- Second layer under RLS: the anon role keeps no privilege on these tables, so
-- a policy added by mistake later cannot reopen them to the public key.
-- Signed-in users keep their grants; RLS limits them to the admin policies.
REVOKE ALL ON public.scoutpass_orders,
              public.scoutpass_group_members,
              public.scoutpass_applications,
              public.scoutpass_refund_requests,
              public.scoutpass_comms_log,
              public.scoutpass_leads
  FROM anon;
GRANT INSERT ON public.scoutpass_leads TO anon;

-- 8. Order tracking ---------------------------------------------------------
-- Returns at most one order, and only when both the tracking number and the
-- email on the order match. A wrong pair and an unknown tracking number look
-- the same to the caller (no rows). No contact, passport or Stripe field is
-- returned, and neither is the order id.
CREATE OR REPLACE FUNCTION public.scoutpass_track_order(
  p_tracking_number text,
  p_email           text
)
RETURNS TABLE (
  tracking_number         text,
  status                  text,
  destination_country     text,
  visa_type               text,
  is_group                boolean,
  created_at              timestamptz,
  paid_at                 timestamptz,
  info_received_at        timestamptz,
  application_prepared_at timestamptz,
  appointment_secured_at  timestamptz,
  appointment_attended_at timestamptz,
  awaiting_decision_at    timestamptz,
  passport_returned_at    timestamptz,
  decision_received_at    timestamptz,
  closed_at               timestamptz,
  updated_at              timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT o.tracking_number,
         o.status::text,
         o.destination_country,
         o.visa_type,
         o.is_group,
         o.created_at,
         o.paid_at,
         o.info_received_at,
         o.application_prepared_at,
         o.appointment_secured_at,
         o.appointment_attended_at,
         o.awaiting_decision_at,
         o.passport_returned_at,
         o.decision_received_at,
         o.closed_at,
         o.updated_at
  FROM public.scoutpass_orders o
  WHERE o.tracking_number = upper(btrim(p_tracking_number))
    AND lower(o.email) = lower(btrim(p_email))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.scoutpass_track_order(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.scoutpass_track_order(text, text)
  TO anon, authenticated, service_role;

COMMENT ON FUNCTION public.scoutpass_track_order(text, text) IS
  'Public order tracking: status fields for one order, given its tracking number and email.';

-- Rollback (restores the previous, open state; do not run unless something
-- legitimate broke and you accept the exposure while you fix it):
--
--   DROP FUNCTION IF EXISTS public.scoutpass_track_order(text, text);
--   GRANT ALL ON public.scoutpass_orders, public.scoutpass_group_members,
--     public.scoutpass_applications, public.scoutpass_refund_requests,
--     public.scoutpass_comms_log, public.scoutpass_leads TO anon;
--   CREATE POLICY scoutpass_orders_public_select ON public.scoutpass_orders FOR SELECT USING (true);
--   CREATE POLICY scoutpass_orders_update ON public.scoutpass_orders FOR UPDATE USING (true);
--   CREATE POLICY scoutpass_orders_insert ON public.scoutpass_orders FOR INSERT WITH CHECK (true);
--   CREATE POLICY scoutpass_group_members_public_select ON public.scoutpass_group_members FOR SELECT USING (true);
--   CREATE POLICY scoutpass_group_members_insert ON public.scoutpass_group_members FOR INSERT WITH CHECK (true);
--   CREATE POLICY scoutpass_applications_public_select ON public.scoutpass_applications FOR SELECT USING (true);
--   CREATE POLICY scoutpass_applications_update ON public.scoutpass_applications FOR UPDATE USING (true);
--   CREATE POLICY scoutpass_applications_insert ON public.scoutpass_applications FOR INSERT WITH CHECK (true);
--   CREATE POLICY scoutpass_refunds_public_select ON public.scoutpass_refund_requests FOR SELECT USING (true);
--   CREATE POLICY scoutpass_refunds_update ON public.scoutpass_refund_requests FOR UPDATE USING (true);
--   CREATE POLICY scoutpass_refunds_insert ON public.scoutpass_refund_requests FOR INSERT WITH CHECK (true);
--   CREATE POLICY scoutpass_comms_insert ON public.scoutpass_comms_log FOR INSERT WITH CHECK (true);
--   CREATE POLICY scoutpass_leads_update ON public.scoutpass_leads FOR UPDATE USING (true);
