/**
 * Appointment hunts (ScoutPass orders): the list, and one order in a drawer
 * where the team records each stage, assigns it and keeps notes.
 *
 * Recording a stage writes its timestamp and moves the order's status to the
 * latest recorded stage. Payment is never recorded here: the Stripe webhook
 * sets it when the money arrives.
 */

import React, { useMemo, useState } from 'react';
import { Check, Plane } from 'lucide-react';
import { toast } from 'sonner';
import { ACTIVE_ORDER, ORDER_STAGES, day, errText, fullName, matches, when, type Order } from '../lib';
import { updateRow, useGroupMembers, useOrderApplications, useOrders, useRefreshAll } from '../data';
import { Chips, Drawer, Empty, Facts, Filter, Note, Panel, Pill, Skeleton, mailto, tel } from '../ui';

type View = 'active' | 'unpaid' | 'done' | 'refunds' | 'all';

const inView = (o: Order, v: View) =>
  v === 'all' ||
  (v === 'active' && ACTIVE_ORDER.has(o.status)) ||
  (v === 'unpaid' && o.status === 'pending_payment') ||
  (v === 'done' && o.status === 'closed') ||
  (v === 'refunds' && (o.status === 'refund_requested' || o.status === 'refunded'));

export default function Orders({ openId, onOpen }: { openId: string | null; onOpen: (id: string | null) => void }) {
  const { data = [], isLoading, error } = useOrders();
  const [view, setView] = useState<View>('active');
  const [q, setQ] = useState('');

  const counts = useMemo(() => {
    const c: Record<View, number> = { active: 0, unpaid: 0, done: 0, refunds: 0, all: data.length };
    data.forEach((o) => (['active', 'unpaid', 'done', 'refunds'] as View[]).forEach((v) => inView(o, v) && c[v]++));
    return c;
  }, [data]);

  const list = data.filter(
    (o) =>
      inView(o, view) &&
      matches(q, o.tracking_number, o.first_name, o.last_name, o.email, o.destination_country, o.visa_type, o.phone),
  );
  const open = data.find((o) => o.id === openId) ?? null;

  return (
    <>
      <div className="ogc-toolbar">
        <Chips
          value={view}
          onChange={setView}
          options={[
            { value: 'active', label: 'In progress', count: counts.active },
            { value: 'unpaid', label: 'Not paid', count: counts.unpaid },
            { value: 'refunds', label: 'Refunds', count: counts.refunds },
            { value: 'done', label: 'Closed', count: counts.done },
            { value: 'all', label: 'All', count: counts.all },
          ]}
        />
        <Filter value={q} onChange={setQ} placeholder="Name, email, tracking number" />
      </div>

      {error && <Note error>Could not load orders: {errText(error)}</Note>}

      <Panel flush>
        {isLoading ? (
          <div style={{ padding: 20 }}>
            <Skeleton />
          </div>
        ) : list.length === 0 ? (
          <Empty
            icon={Plane}
            title={view === 'active' ? 'No hunt in progress' : 'Nothing here'}
            text={view === 'active' ? 'Paid orders land here until they are closed.' : 'Try another filter or clear the search.'}
          />
        ) : (
          <div className="ogc-table-wrap">
            <table className="ogc-table">
              <thead>
                <tr>
                  <th>Traveler</th>
                  <th>Visa</th>
                  <th className="hide-sm">Tracking</th>
                  <th>Status</th>
                  <th className="hide-sm">Created</th>
                </tr>
              </thead>
              <tbody>
                {list.map((o) => (
                  <tr key={o.id} className="is-link" onClick={() => onOpen(o.id)}>
                    <td>
                      <span className="ogc-cell-main">{fullName(o.first_name, o.last_name) || o.email}</span>
                      <span className="ogc-cell-sub">{o.email}</span>
                    </td>
                    <td>
                      <span className="ogc-cell-main">{o.destination_country}</span>
                      <span className="ogc-cell-sub">{o.visa_type}</span>
                    </td>
                    <td className="hide-sm">
                      <span className="mono">{o.tracking_number ?? '—'}</span>
                    </td>
                    <td>
                      <Pill status={o.status} />
                    </td>
                    <td className="hide-sm">{day(o.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      {open && <OrderDrawer key={open.id} order={open} onClose={() => onOpen(null)} />}
    </>
  );
}

function OrderDrawer({ order, onClose }: { order: Order; onClose: () => void }) {
  const refresh = useRefreshAll();
  const apps = useOrderApplications(order.id);
  const group = useGroupMembers(order.id, !!order.is_group);
  const [notes, setNotes] = useState(order.agent_notes ?? '');
  const [agent, setAgent] = useState(order.agent_assigned ?? '');
  const [busy, setBusy] = useState(false);

  const paid = !!order.paid_at;
  const stuck = order.status === 'refund_requested' || order.status === 'refunded';
  const lastDone = ORDER_STAGES.reduce((i, s, idx) => (order[s.column] ? idx : i), -1);

  const save = async (patch: Partial<Order>, done: string) => {
    setBusy(true);
    try {
      await updateRow('scoutpass_orders', order.id, patch);
      await refresh();
      toast.success(done);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setBusy(false);
    }
  };

  /** Record a stage (now), or clear it if it was the latest one recorded. */
  const toggleStage = (idx: number) => {
    const stage = ORDER_STAGES[idx];
    if (order[stage.column]) {
      const prev = ORDER_STAGES[idx - 1];
      return save({ [stage.column]: null, status: prev ? prev.status : 'paid' } as Partial<Order>, `${stage.label} cleared`);
    }
    return save({ [stage.column]: new Date().toISOString(), status: stage.status } as Partial<Order>, `${stage.label} recorded`);
  };

  const notesChanged = notes !== (order.agent_notes ?? '') || agent !== (order.agent_assigned ?? '');

  return (
    <Drawer
      title={fullName(order.first_name, order.last_name) || order.email}
      subtitle={
        <>
          <Pill status={order.status} />
          {order.tracking_number && <span className="mono muted">{order.tracking_number}</span>}
        </>
      }
      onClose={onClose}
      footer={
        <>
          <button type="button" className="ogc-btn ogc-btn--ghost" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="ogc-btn"
            disabled={!notesChanged || busy}
            onClick={() => save({ agent_notes: notes || null, agent_assigned: agent || null }, 'Notes saved')}
          >
            Save notes
          </button>
        </>
      }
    >
      <section>
        <h3 className="ogc-sub">Progress</h3>
        {!paid && !stuck && (
          <Note>Not paid yet. Stages open once Stripe confirms the payment, so nothing here can be recorded.</Note>
        )}
        {stuck && <Note>A refund was asked for or made. Stages are locked; handle it from Refunds.</Note>}
        <ol className="ogc-steps" style={{ marginTop: !paid || stuck ? 12 : 0 }}>
          {ORDER_STAGES.map((s, idx) => {
            const at = order[s.column] as string | null;
            const isPay = idx === 0;
            // Only the next stage can be recorded and only the latest can be cleared, so the history stays in order.
            const canToggle = paid && !stuck && !isPay && (idx === lastDone + 1 || (at && idx === lastDone));
            return (
              <li key={s.status} className={`ogc-step${at ? ' is-done' : ''}${idx === lastDone + 1 && paid ? ' is-current' : ''}`}>
                <span className="ogc-step-dot">{at && <Check />}</span>
                <span className="grow">
                  <span className="ogc-step-label">{s.label}</span>
                  <span className="ogc-step-when">{at ? when(at) : isPay ? 'Set by Stripe' : 'Not yet'}</span>
                </span>
                {canToggle && (
                  <button
                    type="button"
                    className={`ogc-btn ogc-btn--sm ${at ? 'ogc-btn--ghost' : ''}`}
                    disabled={busy}
                    onClick={() => toggleStage(idx)}
                  >
                    {at ? 'Undo' : 'Mark done'}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section>
        <h3 className="ogc-sub">Traveler</h3>
        <Facts
          rows={[
            ['Email', mailto(order.email)],
            ['Phone', tel(order.phone)],
            ['WhatsApp', order.whatsapp],
            ['Nationality', order.nationality],
            ['Language', order.locale?.toUpperCase()],
            ['Group', order.is_group ? 'Yes' : 'No'],
          ]}
        />
      </section>

      <section>
        <h3 className="ogc-sub">Trip</h3>
        <Facts
          rows={[
            ['Destination', order.destination_country],
            ['Visa', order.visa_type],
            ['Purpose', order.travel_purpose],
            ['Travel dates', order.travel_date_from ? `${day(order.travel_date_from)} → ${day(order.travel_date_to)}` : null],
            ['Cities', order.preferred_cities?.join(', ')],
            ['Created', when(order.created_at)],
            ['Stripe payment', order.stripe_payment_intent_id ? <span className="mono">{order.stripe_payment_intent_id}</span> : null],
          ]}
        />
      </section>

      {order.is_group && (
        <section>
          <h3 className="ogc-sub">Group</h3>
          {group.isLoading ? (
            <Skeleton height={60} />
          ) : (group.data ?? []).length === 0 ? (
            <p className="muted">No travelers added.</p>
          ) : (
            <ul className="ogc-list">
              {(group.data ?? []).map((m) => (
                <li key={m.id} style={{ padding: '8px 0' }}>
                  <strong>{fullName(m.first_name, m.last_name)}</strong>
                  <span className="muted"> · {[m.relationship, m.nationality].filter(Boolean).join(' · ') || '—'}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <section>
        <h3 className="ogc-sub">Consulate appointments</h3>
        {apps.isLoading ? (
          <Skeleton height={60} />
        ) : (apps.data ?? []).length === 0 ? (
          <p className="muted">None recorded yet.</p>
        ) : (
          <ul className="ogc-list">
            {(apps.data ?? []).map((a) => (
              <li key={a.id} style={{ padding: '10px 0' }}>
                <strong>#{a.application_number}</strong> {a.appointment_center ?? a.appointment_city ?? '—'}
                <span className="muted"> · {a.appointment_date ? when(a.appointment_date) : 'no date'}</span>
                {a.decision && (
                  <span style={{ marginLeft: 8 }}>
                    <Pill status={a.decision} />
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ display: 'grid', gap: 12 }}>
        <h3 className="ogc-sub" style={{ marginBottom: 0 }}>
          Team notes
        </h3>
        <label className="ogc-field">
          <span>Assigned to</span>
          <input className="ogc-input" value={agent} onChange={(e) => setAgent(e.target.value)} placeholder="Who is working on it" />
        </label>
        <label className="ogc-field">
          <span>Notes (only the team sees these)</span>
          <textarea className="ogc-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
      </section>
    </Drawer>
  );
}
