/**
 * What the console loads. Volumes are small (tens to hundreds of rows), so
 * each list is read whole and filtered in the page. Every query runs as the
 * signed-in admin; a table the admin cannot read comes back as an error on
 * that list only, not a broken console.
 */

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { db, type Account, type Order, type Request, type Row } from './lib';

async function rows<T>(table: string, order = 'created_at', limit = 500): Promise<T[]> {
  const { data, error } = await db.from(table).select('*').order(order, { ascending: false }).limit(limit);
  if (error) throw error;
  return (data ?? []) as T[];
}

const opts = { staleTime: 30_000, refetchOnWindowFocus: true } as const;

export const useOrders = () => useQuery({ queryKey: ['admin', 'orders'], queryFn: () => rows<Order>('scoutpass_orders'), ...opts });
export const useRequests = () => useQuery({ queryKey: ['admin', 'requests'], queryFn: () => rows<Request>('form_submissions'), ...opts });
export const useLeads = () => useQuery({ queryKey: ['admin', 'leads'], queryFn: () => rows<Row>('scoutpass_leads'), ...opts });
export const useRefunds = () =>
  useQuery({ queryKey: ['admin', 'refunds'], queryFn: () => rows<Row>('scoutpass_refund_requests', 'requested_at'), ...opts });
export const useApplications = () =>
  useQuery({ queryKey: ['admin', 'applications'], queryFn: () => rows<Row>('visa_applications'), ...opts });
export const useFlights = () => useQuery({ queryKey: ['admin', 'flights'], queryFn: () => rows<Row>('flight_bookings'), ...opts });
export const useDocuments = () =>
  useQuery({ queryKey: ['admin', 'documents'], queryFn: () => rows<Row>('user_documents', 'uploaded_at'), ...opts });
export const useComms = () => useQuery({ queryKey: ['admin', 'comms'], queryFn: () => rows<Row>('scoutpass_comms_log', 'sent_at', 200), ...opts });

export const useAccounts = () =>
  useQuery({
    queryKey: ['admin', 'accounts'],
    queryFn: async () => {
      const { data, error } = await db.rpc('admin_list_users');
      if (error) throw error;
      return (data ?? []) as Account[];
    },
    ...opts,
  });

/** Applications (consulate appointments) for one appointment-hunt order. */
export const useOrderApplications = (orderId: string | null) =>
  useQuery({
    queryKey: ['admin', 'order-applications', orderId],
    enabled: !!orderId,
    queryFn: async () => {
      const { data, error } = await db.from('scoutpass_applications').select('*').eq('order_id', orderId).order('application_number');
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

/** Travelers in a group order. */
export const useGroupMembers = (orderId: string | null, enabled: boolean) =>
  useQuery({
    queryKey: ['admin', 'group', orderId],
    enabled: !!orderId && enabled,
    queryFn: async () => {
      const { data, error } = await db
        .from('scoutpass_group_members')
        .select('id, first_name, last_name, nationality, relationship, email, phone')
        .eq('order_id', orderId);
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

/** Re-reads every list after a change. */
export function useRefreshAll() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ['admin'] });
}

/** Updates one row and re-reads the lists. Throws the database error, if any. */
export async function updateRow(table: string, id: string, patch: Record<string, unknown>) {
  // Row level security turns a refused update into "0 rows changed", not an
  // error, so ask for the row back and treat no row as a refusal.
  const { data, error } = await db.from(table).update(patch).eq('id', id).select('id');
  if (error) throw error;
  if (!data || data.length === 0) throw new Error('Not saved: this account is not allowed to change that record.');
}
