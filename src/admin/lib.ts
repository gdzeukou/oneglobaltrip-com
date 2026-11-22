/**
 * Shared pieces of the admin console: row types, labels and formatting.
 *
 * Every read and write goes through the signed-in admin's own Supabase
 * session. Row level security decides what an admin can reach; see
 * supabase/migrations/20261122160000_admin_console.sql.
 */

import { supabase } from '@/integrations/supabase/client';

/** The database client without generated types, for tables the generated file lags on. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = supabase as any;

/** A row from a table the console shows as is. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Row = Record<string, any>;

export type Tone = 'neutral' | 'info' | 'warn' | 'good' | 'bad';

export interface Order {
  id: string;
  tracking_number: string | null;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  nationality: string | null;
  destination_country: string;
  visa_type: string;
  travel_date_from: string | null;
  travel_date_to: string | null;
  travel_purpose: string | null;
  preferred_cities: string[] | null;
  is_group: boolean | null;
  agent_notes: string | null;
  agent_assigned: string | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  locale: string;
  created_at: string;
  updated_at: string | null;
  paid_at: string | null;
  info_received_at: string | null;
  application_prepared_at: string | null;
  appointment_secured_at: string | null;
  appointment_attended_at: string | null;
  awaiting_decision_at: string | null;
  passport_returned_at: string | null;
  decision_received_at: string | null;
  closed_at: string | null;
}

export interface Request {
  id: string;
  user_id: string | null;
  form_type: string;
  name: string;
  email: string;
  phone: string;
  nationality: string | null;
  destination: string | null;
  travel_date: string | null;
  return_date: string | null;
  travel_purpose: string | null;
  visa_type: string | null;
  travelers: string | null;
  special_requests: string | null;
  other_needs: string | null;
  lead_status: string | null;
  appointment_booked: boolean | null;
  contacted_at: string | null;
  last_follow_up: string | null;
  internal_notes: string | null;
  sales_value: number | null;
  referral_source: string | null;
  created_at: string | null;
}

export interface Account {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed: boolean;
  providers: string[];
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  nationality: string | null;
  roles: string[];
  request_count: number;
  order_count: number;
}

/**
 * The appointment hunt, stage by stage. Each stage after payment has a
 * timestamp column the team fills in; the order's status is the latest one.
 * Payment is recorded by the Stripe webhook, never by hand.
 */
export const ORDER_STAGES: { status: string; label: string; column: keyof Order }[] = [
  { status: 'paid', label: 'Paid', column: 'paid_at' },
  { status: 'info_received', label: 'Information received', column: 'info_received_at' },
  { status: 'application_prepared', label: 'Application prepared', column: 'application_prepared_at' },
  { status: 'appointment_secured', label: 'Appointment secured', column: 'appointment_secured_at' },
  { status: 'appointment_attended', label: 'Appointment attended', column: 'appointment_attended_at' },
  { status: 'awaiting_decision', label: 'Awaiting decision', column: 'awaiting_decision_at' },
  { status: 'passport_returned', label: 'Passport returned', column: 'passport_returned_at' },
  { status: 'decision_received', label: 'Decision received', column: 'decision_received_at' },
  { status: 'closed', label: 'Closed', column: 'closed_at' },
];

export const ORDER_STATUS_LABEL: Record<string, string> = {
  pending_payment: 'Not paid',
  refund_requested: 'Refund asked',
  refunded: 'Refunded',
  ...Object.fromEntries(ORDER_STAGES.map((s) => [s.status, s.label])),
};

/** Orders that are paid and still being worked on. */
export const ACTIVE_ORDER = new Set([
  'paid',
  'info_received',
  'application_prepared',
  'appointment_secured',
  'appointment_attended',
  'awaiting_decision',
  'passport_returned',
  'decision_received',
]);

export const LEAD_STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const TONES: Record<string, Tone> = {
  new: 'warn',
  pending: 'warn',
  pending_payment: 'neutral',
  refund_requested: 'bad',
  contacted: 'info',
  qualified: 'info',
  submitted: 'info',
  draft: 'neutral',
  paid: 'info',
  info_received: 'info',
  application_prepared: 'info',
  appointment_secured: 'good',
  appointment_attended: 'good',
  awaiting_decision: 'info',
  passport_returned: 'good',
  decision_received: 'good',
  confirmed: 'good',
  won: 'good',
  approved: 'good',
  closed: 'neutral',
  refunded: 'neutral',
  cancelled: 'neutral',
  lost: 'neutral',
  rejected: 'bad',
  failed: 'bad',
};

export const toneOf = (status: string | null | undefined): Tone => TONES[status ?? ''] ?? 'neutral';

export function humanize(value: string | null | undefined): string {
  if (!value) return '—';
  if (ORDER_STATUS_LABEL[value]) return ORDER_STATUS_LABEL[value];
  const s = value.replace(/[_-]+/g, ' ').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const fullName = (first?: string | null, last?: string | null) =>
  [first, last].filter(Boolean).join(' ').trim();

export function day(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function when(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-US', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
}

/** "3 min ago", "5 h ago", "2 d ago", then a date. */
export function ago(iso: string | null | undefined): string {
  if (!iso) return '—';
  const ms = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(ms)) return '—';
  const min = Math.round(ms / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 14) return `${d} d ago`;
  return day(iso);
}

export const matches = (q: string, ...fields: (string | null | undefined)[]) => {
  const needle = q.trim().toLowerCase();
  if (!needle) return true;
  return fields.some((f) => (f ?? '').toLowerCase().includes(needle));
};

/** A Supabase error, as one readable line. */
export const errText = (e: unknown) =>
  e && typeof e === 'object' && 'message' in e ? String((e as { message: unknown }).message) : 'Something went wrong';
