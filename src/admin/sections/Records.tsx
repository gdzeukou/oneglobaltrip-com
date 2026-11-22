/**
 * The smaller lists: eligibility-check leads, refund requests, visa
 * applications from the old form, flight bookings, uploaded documents and
 * the log of messages sent to travelers.
 */

import React, { useState } from 'react';
import { FileText, Mail, Plane, ReceiptText, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ago, day, db, errText, humanize, matches, when, type Row } from '../lib';
import { updateRow, useApplications, useComms, useDocuments, useFlights, useLeads, useOrders, useRefreshAll, useRefunds } from '../data';
import { Chips, Drawer, Empty, Facts, Filter, Note, Panel, Pill, Skeleton } from '../ui';

function Table({
  loading,
  error,
  rows,
  empty,
  head,
  render,
  onRow,
}: {
  loading: boolean;
  error: unknown;
  rows: Row[];
  empty: React.ReactNode;
  head: (string | [string, string])[];
  render: (r: Row) => React.ReactNode[];
  onRow?: (r: Row) => void;
}) {
  return (
    <>
      {error ? <Note error>Could not load: {errText(error)}</Note> : null}
      <Panel flush>
        {loading ? (
          <div style={{ padding: 20 }}>
            <Skeleton />
          </div>
        ) : rows.length === 0 ? (
          empty
        ) : (
          <div className="ogc-table-wrap">
            <table className="ogc-table">
              <thead>
                <tr>
                  {head.map((h) => {
                    const [label, cls] = Array.isArray(h) ? h : [h, ''];
                    return (
                      <th key={label} className={cls}>
                        {label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className={onRow ? 'is-link' : undefined} onClick={onRow ? () => onRow(r) : undefined}>
                    {render(r).map((cell, i) => {
                      const h = head[i];
                      return (
                        <td key={i} className={Array.isArray(h) ? h[1] : undefined}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}

const two = (main: React.ReactNode, sub?: React.ReactNode) => (
  <>
    <span className="ogc-cell-main">{main || '—'}</span>
    {sub ? <span className="ogc-cell-sub">{sub}</span> : null}
  </>
);

/* ---------- Leads from the eligibility check ---------- */

export function Leads() {
  const { data = [], isLoading, error } = useLeads();
  const [q, setQ] = useState('');
  const [view, setView] = useState<'open' | 'converted' | 'all'>('open');
  const rows = data.filter(
    (l) =>
      (view === 'all' || (view === 'converted' ? !!l.converted_to_order_id : !l.converted_to_order_id)) &&
      matches(q, l.email, l.destination_country, l.country_of_origin, l.visa_type),
  );
  return (
    <>
      <div className="ogc-toolbar">
        <Chips
          value={view}
          onChange={(v) => setView(v as 'all' | 'converted' | 'open')}
          options={[
            { value: 'open', label: 'Not bought yet', count: data.filter((l) => !l.converted_to_order_id).length },
            { value: 'converted', label: 'Bought', count: data.filter((l) => !!l.converted_to_order_id).length },
            { value: 'all', label: 'All', count: data.length },
          ]}
        />
        <Filter value={q} onChange={setQ} placeholder="Email or country" />
      </div>
      <Table
        loading={isLoading}
        error={error}
        rows={rows}
        empty={<Empty icon={UserPlus} title="No leads" text="People who run the eligibility check and leave an email show up here." />}
        head={['Email', 'Trip', ['Travel date', 'hide-sm'], ['Source', 'hide-sm'], 'Received']}
        render={(l) => [
          <a href={`mailto:${l.email}`} onClick={(e) => e.stopPropagation()}>
            {l.email}
          </a>,
          two(`${l.country_of_origin ?? '?'} → ${l.destination_country ?? '?'}`, l.visa_type),
          day(l.travel_date),
          humanize(l.source),
          ago(l.created_at),
        ]}
      />
    </>
  );
}

/* ---------- Refund requests ---------- */

export function Refunds() {
  const { data = [], isLoading, error } = useRefunds();
  const orders = useOrders();
  const [openId, setOpenId] = useState<string | null>(null);
  const byId = new Map((orders.data ?? []).map((o) => [o.id, o]));
  const open = data.find((r) => r.id === openId);
  return (
    <>
      <Note>
        Marking a refund approved here records the decision only. Send the money back from the Stripe dashboard, then mark it refunded.
      </Note>
      <Table
        loading={isLoading}
        error={error}
        rows={data}
        onRow={(r) => setOpenId(r.id)}
        empty={<Empty icon={ReceiptText} title="No refund requests" />}
        head={['Order', 'Reason', 'Status', ['Asked', 'hide-sm']]}
        render={(r) => {
          const o = byId.get(r.order_id);
          return [
            two(o ? `${o.first_name} ${o.last_name}` : 'Order', o?.tracking_number ? <span className="mono">{o.tracking_number}</span> : null),
            <span className="ogc-cell-sub" style={{ maxWidth: 320 }}>
              {r.reason || '—'}
            </span>,
            <Pill status={r.status} />,
            ago(r.requested_at ?? r.created_at),
          ];
        }}
      />
      {open && <RefundDrawer key={open.id} refund={open} order={byId.get(open.order_id)} onClose={() => setOpenId(null)} />}
    </>
  );
}

const REFUND_STATUSES = ['pending', 'approved', 'rejected', 'refunded'];

function RefundDrawer({ refund, order, onClose }: { refund: Row; order?: Row; onClose: () => void }) {
  const { user } = useAuth();
  const refresh = useRefreshAll();
  const [status, setStatus] = useState<string>(refund.status ?? 'pending');
  const [notes, setNotes] = useState<string>(refund.resolution_notes ?? '');
  const [stripeId, setStripeId] = useState<string>(refund.stripe_refund_id ?? '');
  const [busy, setBusy] = useState(false);

  const save = async () => {
    setBusy(true);
    try {
      const resolved = status !== 'pending';
      await updateRow('scoutpass_refund_requests', refund.id, {
        status,
        resolution_notes: notes || null,
        stripe_refund_id: stripeId.trim() || null,
        resolved_at: resolved ? refund.resolved_at ?? new Date().toISOString() : null,
        resolved_by: resolved ? refund.resolved_by ?? user?.email ?? null : null,
      });
      // Keep the order's status in step once the money is back.
      if (status === 'refunded' && order && order.status !== 'refunded') {
        await updateRow('scoutpass_orders', order.id, { status: 'refunded' });
      }
      await refresh();
      toast.success('Refund updated');
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer
      title={order ? `Refund · ${order.first_name} ${order.last_name}` : 'Refund request'}
      subtitle={<Pill status={refund.status} />}
      onClose={onClose}
      footer={
        <>
          <a className="ogc-btn ogc-btn--ghost" href="https://dashboard.stripe.com/payments" target="_blank" rel="noreferrer">
            Open Stripe
          </a>
          <button type="button" className="ogc-btn" disabled={busy} onClick={save}>
            Save
          </button>
        </>
      }
    >
      <Facts
        rows={[
          ['Order', order?.tracking_number ? <span className="mono">{order.tracking_number}</span> : refund.order_id],
          ['Email', order?.email],
          ['Reason', refund.reason],
          ['Cities widened', refund.cities_expanded ? (refund.expanded_cities ?? []).join(', ') || 'Yes' : 'No'],
          ['Asked', when(refund.requested_at ?? refund.created_at)],
          ['Resolved', refund.resolved_at ? `${when(refund.resolved_at)} by ${refund.resolved_by ?? '—'}` : null],
        ]}
      />
      <div style={{ display: 'grid', gap: 12 }}>
        <label className="ogc-field">
          <span>Decision</span>
          <select className="ogc-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {REFUND_STATUSES.map((s) => (
              <option key={s} value={s}>
                {humanize(s)}
              </option>
            ))}
          </select>
        </label>
        <label className="ogc-field">
          <span>Stripe refund ID (re_…)</span>
          <input className="ogc-input mono" value={stripeId} onChange={(e) => setStripeId(e.target.value)} />
        </label>
        <label className="ogc-field">
          <span>Notes</span>
          <textarea className="ogc-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </div>
    </Drawer>
  );
}

/* ---------- Visa applications (older application form) ---------- */

export function Applications() {
  const { data = [], isLoading, error } = useApplications();
  const [view, setView] = useState<'submitted' | 'draft' | 'all'>('submitted');
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const isDraft = (a: Row) => a.is_draft || a.status === 'draft';
  const rows = data.filter(
    (a) =>
      (view === 'all' || (view === 'draft' ? isDraft(a) : !isDraft(a))) &&
      matches(q, a.name, a.email, a.visa_type, a.nationality, a.application_reference),
  );
  const open = data.find((a) => a.id === openId);
  return (
    <>
      <div className="ogc-toolbar">
        <Chips
          value={view}
          onChange={(v) => setView(v as 'all' | 'draft' | 'submitted')}
          options={[
            { value: 'submitted', label: 'Submitted', count: data.filter((a) => !isDraft(a)).length },
            { value: 'draft', label: 'Drafts', count: data.filter(isDraft).length },
            { value: 'all', label: 'All', count: data.length },
          ]}
        />
        <Filter value={q} onChange={setQ} placeholder="Name, email, reference" />
      </div>
      <Table
        loading={isLoading}
        error={error}
        rows={rows}
        onRow={(a) => setOpenId(a.id)}
        empty={<Empty icon={FileText} title="No applications here" />}
        head={['Applicant', 'Visa', ['Reference', 'hide-sm'], 'Status', ['Started', 'hide-sm']]}
        render={(a) => [
          two(a.name || 'Unnamed', a.email),
          two(humanize(a.visa_type), a.nationality),
          <span className="mono">{a.application_reference ?? '—'}</span>,
          <Pill status={a.status} />,
          day(a.created_at),
        ]}
      />
      {open && (
        <Drawer title={open.name || 'Visa application'} subtitle={<Pill status={open.status} />} onClose={() => setOpenId(null)}>
          <Facts
            rows={[
              ['Reference', <span className="mono">{open.application_reference}</span>],
              ['Email', open.email],
              ['Nationality', open.nationality],
              ['Visa', humanize(open.visa_type)],
              ['Purpose', humanize(open.travel_purpose)],
              ['Dates', open.departure_date ? `${day(open.departure_date)} → ${day(open.return_date)}` : null],
              ['Travelers', open.total_travelers],
              ['Step reached', open.progress_step],
              ['Submitted', when(open.submitted_at)],
              ['Last saved', when(open.last_updated ?? open.auto_saved_at)],
            ]}
          />
          {open.application_data && (
            <section>
              <h3 className="ogc-sub">Answers</h3>
              <pre className="mono" style={{ whiteSpace: 'pre-wrap', background: '#f6f7f4', padding: 12, borderRadius: 8, margin: 0, fontSize: 12 }}>
                {JSON.stringify(open.application_data, null, 2)}
              </pre>
            </section>
          )}
        </Drawer>
      )}
    </>
  );
}

/* ---------- Flight bookings ---------- */

export function Flights() {
  const { data = [], isLoading, error } = useFlights();
  return (
    <Table
      loading={isLoading}
      error={error}
      rows={data}
      empty={<Empty icon={Plane} title="No flight bookings" />}
      head={['Route', 'Departure', ['Reference', 'hide-sm'], 'Amount', 'Status']}
      render={(f) => [
        two(`${f.origin_airport} → ${f.destination_airport}`, `${f.passenger_count} passenger${f.passenger_count === 1 ? '' : 's'}`),
        two(day(f.departure_date), f.return_date ? `Return ${day(f.return_date)}` : 'One way'),
        <span className="mono">{f.pnr_code || f.booking_reference}</span>,
        `${Number(f.total_amount).toLocaleString('en-US', { maximumFractionDigits: 2 })} ${f.currency}`,
        <Pill status={f.booking_status} />,
      ]}
    />
  );
}

/* ---------- Uploaded documents ---------- */

export function Documents() {
  const { data = [], isLoading, error } = useDocuments();
  const [q, setQ] = useState('');
  const rows = data.filter((d) => matches(q, d.file_name, d.document_type));

  const openFile = async (d: Row) => {
    const { data: signed, error: e } = await db.storage.from('user-documents').createSignedUrl(d.file_path, 120);
    if (e || !signed?.signedUrl) return toast.error(e ? errText(e) : 'Could not open the file');
    window.open(signed.signedUrl, '_blank', 'noopener');
  };

  return (
    <>
      <div className="ogc-toolbar">
        <span className="muted">Files travelers uploaded to their account. Links open for two minutes.</span>
        <Filter value={q} onChange={setQ} placeholder="File name or type" />
      </div>
      <Table
        loading={isLoading}
        error={error}
        rows={rows}
        empty={<Empty icon={FileText} title="No documents uploaded" />}
        head={['File', 'Type', ['Size', 'hide-sm'], ['Uploaded', 'hide-sm'], '']}
        render={(d) => [
          two(d.file_name, d.mime_type),
          humanize(d.document_type),
          d.file_size ? `${Math.max(1, Math.round(d.file_size / 1024))} KB` : '—',
          ago(d.uploaded_at),
          <button type="button" className="ogc-btn ogc-btn--sm ogc-btn--ghost" onClick={() => openFile(d)}>
            Open
          </button>,
        ]}
      />
    </>
  );
}

/* ---------- Messages sent ---------- */

export function Comms() {
  const { data = [], isLoading, error } = useComms();
  return (
    <Table
      loading={isLoading}
      error={error}
      rows={data}
      empty={<Empty icon={Mail} title="No messages logged" text="Emails and texts sent to travelers about their hunt are logged here." />}
      head={['To', 'Message', ['Channel', 'hide-sm'], 'Status', 'Sent']}
      render={(m) => [
        m.recipient,
        two(humanize(m.type), m.error_message),
        humanize(m.channel),
        <Pill status={m.status} tone={m.status === 'sent' || m.status === 'delivered' ? 'good' : m.status === 'failed' ? 'bad' : undefined} />,
        ago(m.sent_at),
      ]}
    />
  );
}
