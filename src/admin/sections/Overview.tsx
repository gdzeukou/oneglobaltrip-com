/**
 * Today: what needs the team now, and what came in lately.
 */

import React from 'react';
import { CalendarCheck, Inbox, Plane, ReceiptText, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ACTIVE_ORDER, ORDER_STAGES, ago, fullName, humanize } from '../lib';
import { useAccounts, useOrders, useRefunds, useRequests } from '../data';
import { Empty, Panel, Pill, Stat } from '../ui';
import type { Section } from '../nav';

export default function Overview({ go }: { go: (s: Section, id?: string) => void }) {
  const { user } = useAuth();
  const meta = (user?.user_metadata ?? {}) as Record<string, string | undefined>;
  const firstName = meta.first_name || (meta.full_name || meta.name || '').split(' ')[0];
  const orders = useOrders().data ?? [];
  const requests = useRequests().data ?? [];
  const refunds = useRefunds().data ?? [];
  const accounts = useAccounts().data ?? [];

  const active = orders.filter((o) => ACTIVE_ORDER.has(o.status));
  const newRequests = requests.filter((r) => !r.lead_status || r.lead_status === 'new');
  const openRefunds = refunds.filter((r) => (r.status ?? 'pending') === 'pending');
  const unpaid = orders.filter((o) => o.status === 'pending_payment');
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime();
  const paidThisMonth = orders.filter((o) => o.paid_at && new Date(o.paid_at).getTime() >= monthStart).length;
  const secured = orders.filter((o) => o.appointment_secured_at).length;
  const signupsThisMonth = accounts.filter((a) => new Date(a.created_at).getTime() >= monthStart).length;

  /** Paid hunts waiting on the team, oldest first. */
  const toWork = [...active].sort((a, b) => +new Date(a.updated_at ?? a.created_at) - +new Date(b.updated_at ?? b.created_at)).slice(0, 6);

  const hour = new Date().getHours();
  const hello = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const todo = newRequests.length + openRefunds.length;

  return (
    <>
      <section className="ogc-hero">
        <div className="ogc-hero-row">
          <div>
            <p className="ogc-hero-eyebrow">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h2 className="ogc-hero-title">{hello}{firstName ? `, ${firstName}` : ''}.</h2>
            <p className="ogc-hero-text">
              {todo === 0
                ? 'Nothing is waiting on you. New requests and refund asks will show up here.'
                : `${newRequests.length} new request${newRequests.length === 1 ? '' : 's'} to answer and ${openRefunds.length} refund${openRefunds.length === 1 ? '' : 's'} to decide.`}
            </p>
          </div>
          <div className="ogc-hero-stats">
            <div className="ogc-hero-stat">
              <b>{active.length}</b>
              <span>Hunts running</span>
            </div>
            <div className="ogc-hero-stat">
              <b>{newRequests.length}</b>
              <span>New requests</span>
            </div>
            <div className="ogc-hero-stat">
              <b>{paidThisMonth}</b>
              <span>Paid this month</span>
            </div>
          </div>
        </div>
      </section>

      <div className="ogc-stats">
        <Stat label="New requests" value={newRequests.length} hint={`${requests.length} in total`} icon={Inbox} tone="amber" onClick={() => go('requests')} />
        <Stat label="Hunts running" value={active.length} hint={`${unpaid.length} started, not paid`} icon={Plane} onClick={() => go('orders')} />
        <Stat label="Appointments secured" value={secured} hint="Since the start" icon={CalendarCheck} tone="green" onClick={() => go('orders')} />
        <Stat label="Accounts" value={accounts.length} hint={`${signupsThisMonth} joined this month`} icon={Users} onClick={() => go('people')} />
      </div>

      <div className="ogc-grid-2">
        <Panel title="Hunts to move" description="Paid orders, the longest untouched first." flush>
          {toWork.length === 0 ? (
            <Empty icon={Plane} title="No paid hunt in progress" text="When Stripe confirms a payment, the order shows up here." />
          ) : (
            <ul className="ogc-list">
              {toWork.map((o) => {
                const next = ORDER_STAGES.find((s) => !o[s.column]);
                return (
                  <li key={o.id}>
                    <button type="button" className="ogc-list-row" onClick={() => go('orders', o.id)}>
                      <span className="grow">
                        <span className="ogc-cell-main">
                          {fullName(o.first_name, o.last_name)} · {o.destination_country}
                        </span>
                        <span className="ogc-cell-sub">
                          Next: {next?.label ?? 'Close'} · touched {ago(o.updated_at ?? o.created_at)}
                        </span>
                      </span>
                      <Pill status={o.status} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Needs an answer" flush>
          {newRequests.length + openRefunds.length === 0 ? (
            <Empty icon={Inbox} title="All answered" />
          ) : (
            <ul className="ogc-list">
              {openRefunds.slice(0, 3).map((r) => (
                <li key={r.id}>
                  <button type="button" className="ogc-list-row" onClick={() => go('refunds')}>
                    <ReceiptText size={16} style={{ color: 'var(--red)' }} />
                    <span className="grow">
                      <span className="ogc-cell-main">Refund asked</span>
                      <span className="ogc-cell-sub">{r.reason || 'No reason given'}</span>
                    </span>
                    <span className="muted">{ago(r.requested_at ?? r.created_at)}</span>
                  </button>
                </li>
              ))}
              {newRequests.slice(0, 6).map((r) => (
                <li key={r.id}>
                  <button type="button" className="ogc-list-row" onClick={() => go('requests', r.id)}>
                    <span className="ogc-list-dot" aria-hidden />
                    <span className="grow">
                      <span className="ogc-cell-main">{r.name}</span>
                      <span className="ogc-cell-sub">
                        {humanize(r.form_type)} · {r.destination ?? humanize(r.visa_type)}
                      </span>
                    </span>
                    <span className="muted">{ago(r.created_at)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
