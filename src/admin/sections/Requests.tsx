/**
 * Requests sent from the site's forms (form_submissions): visa files,
 * appointment hunts before payment, contact forms. The team moves each one
 * through new → contacted → qualified → won or lost, and keeps notes.
 *
 * The traveler's account page reads the same row, so "Contacted" and
 * "Appointment booked" show up as done on their side too.
 */

import React, { useMemo, useState } from 'react';
import { Inbox } from 'lucide-react';
import { toast } from 'sonner';
import { LEAD_STATUSES, ago, day, errText, humanize, matches, when, type Request } from '../lib';
import { updateRow, useRefreshAll, useRequests } from '../data';
import { Chips, Drawer, Empty, Facts, Filter, Note, Panel, Pill, Skeleton, mailto, tel } from '../ui';

const statusOf = (r: Request) => r.lead_status || 'new';

export default function Requests({ openId, onOpen }: { openId: string | null; onOpen: (id: string | null) => void }) {
  const { data = [], isLoading, error } = useRequests();
  const [view, setView] = useState('open');
  const [q, setQ] = useState('');

  const counts = useMemo(() => {
    const c: Record<string, number> = { open: 0, all: data.length };
    data.forEach((r) => {
      const s = statusOf(r);
      c[s] = (c[s] ?? 0) + 1;
      if (s !== 'won' && s !== 'lost') c.open++;
    });
    return c;
  }, [data]);

  const list = data.filter((r) => {
    const s = statusOf(r);
    const okView = view === 'all' || (view === 'open' ? s !== 'won' && s !== 'lost' : s === view);
    return okView && matches(q, r.name, r.email, r.phone, r.destination, r.visa_type, r.form_type);
  });
  const open = data.find((r) => r.id === openId) ?? null;

  return (
    <>
      <div className="ogc-toolbar">
        <Chips
          value={view}
          onChange={setView}
          options={[
            { value: 'open', label: 'Open', count: counts.open },
            ...LEAD_STATUSES.map((s) => ({ value: s.value, label: s.label, count: counts[s.value] ?? 0 })),
            { value: 'all', label: 'All', count: counts.all },
          ]}
        />
        <Filter value={q} onChange={setQ} placeholder="Name, email, destination" />
      </div>

      {error && <Note error>Could not load requests: {errText(error)}</Note>}

      <Panel flush>
        {isLoading ? (
          <div style={{ padding: 20 }}>
            <Skeleton />
          </div>
        ) : list.length === 0 ? (
          <Empty icon={Inbox} title="Inbox clear" text="New requests from the site land here." />
        ) : (
          <div className="ogc-table-wrap">
            <table className="ogc-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>Wants</th>
                  <th className="hide-sm">Form</th>
                  <th>Status</th>
                  <th className="hide-sm">Received</th>
                </tr>
              </thead>
              <tbody>
                {list.map((r) => (
                  <tr key={r.id} className="is-link" onClick={() => onOpen(r.id)}>
                    <td>
                      <span className="ogc-cell-main">{r.name}</span>
                      <span className="ogc-cell-sub">{r.email}</span>
                    </td>
                    <td>
                      <span className="ogc-cell-main">{r.destination ?? '—'}</span>
                      <span className="ogc-cell-sub">{humanize(r.visa_type)}</span>
                    </td>
                    <td className="hide-sm">{humanize(r.form_type)}</td>
                    <td>
                      <Pill status={statusOf(r)} />
                    </td>
                    <td className="hide-sm">{ago(r.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {open && <RequestDrawer key={open.id} request={open} onClose={() => onOpen(null)} />}
    </>
  );
}

function RequestDrawer({ request: r, onClose }: { request: Request; onClose: () => void }) {
  const refresh = useRefreshAll();
  const [status, setStatus] = useState(statusOf(r));
  const [notes, setNotes] = useState(r.internal_notes ?? '');
  const [booked, setBooked] = useState(!!r.appointment_booked);
  const [value, setValue] = useState(r.sales_value?.toString() ?? '');
  const [busy, setBusy] = useState(false);

  const changed =
    status !== statusOf(r) || notes !== (r.internal_notes ?? '') || booked !== !!r.appointment_booked || value !== (r.sales_value?.toString() ?? '');

  const save = async () => {
    const amount = value.trim() === '' ? null : Number(value);
    if (amount !== null && (!Number.isFinite(amount) || amount < 0)) {
      toast.error('Value must be a number of dollars');
      return;
    }
    setBusy(true);
    try {
      const now = new Date().toISOString();
      await updateRow('form_submissions', r.id, {
        lead_status: status,
        internal_notes: notes || null,
        appointment_booked: booked,
        sales_value: amount,
        // First move off "new" counts as the first contact.
        ...(status !== 'new' && !r.contacted_at ? { contacted_at: now } : {}),
        ...(status !== statusOf(r) ? { last_follow_up: now } : {}),
      });
      await refresh();
      toast.success('Request updated');
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Drawer
      title={r.name}
      subtitle={
        <>
          <Pill status={statusOf(r)} />
          <span className="muted">{humanize(r.form_type)} · {ago(r.created_at)}</span>
        </>
      }
      onClose={onClose}
      footer={
        <>
          <a className="ogc-btn ogc-btn--ghost" href={`mailto:${r.email}`}>
            Email
          </a>
          <button type="button" className="ogc-btn" disabled={!changed || busy} onClick={save}>
            Save
          </button>
        </>
      }
    >
      <section>
        <h3 className="ogc-sub">Contact</h3>
        <Facts
          rows={[
            ['Email', mailto(r.email)],
            ['Phone', tel(r.phone)],
            ['Nationality', r.nationality],
            ['Signed-in account', r.user_id ? 'Yes' : 'No'],
            ['Came from', r.referral_source],
          ]}
        />
      </section>

      <section>
        <h3 className="ogc-sub">Request</h3>
        <Facts
          rows={[
            ['Destination', r.destination],
            ['Visa', humanize(r.visa_type)],
            ['Purpose', humanize(r.travel_purpose)],
            ['Travel date', r.travel_date ? day(r.travel_date) : null],
            ['Return', r.return_date ? day(r.return_date) : null],
            ['Travelers', r.travelers],
            ['Message', r.special_requests || r.other_needs],
            ['Received', when(r.created_at)],
            ['First contact', when(r.contacted_at)],
          ]}
        />
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h3 className="ogc-sub" style={{ marginBottom: 0 }}>
          Follow-up
        </h3>
        <div className="ogc-form-row">
          <label className="ogc-field">
            <span>Status</span>
            <select className="ogc-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {LEAD_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <label className="ogc-field">
            <span>Value ($)</span>
            <input className="ogc-input" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0" />
          </label>
        </div>
        <label className="ogc-check">
          <input type="checkbox" checked={booked} onChange={(e) => setBooked(e.target.checked)} />
          Appointment booked (the traveler sees this on their account)
        </label>
        <label className="ogc-field">
          <span>Notes (only the team sees these)</span>
          <textarea className="ogc-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </section>
    </Drawer>
  );
}
