/**
 * /admin — the One Global Trip admin console.
 *
 * Built on the same frame as the Houston Signing Pro console: fixed sidebar
 * with grouped sections and counts, the title once at the top, a search bar,
 * and records that open in a side drawer.
 *
 * Access: sign in with an account that holds the admin role (granted to
 * gdzeukou@gmail.com in supabase/migrations/20261122160000_admin_console.sql).
 * This page only decides what to show. The database refuses every admin
 * read and write from anyone else, whatever the page does.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, LogOut, Menu, RefreshCw, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { rememberAfterAuth } from '@/utils/afterAuth';
import '@/styles/console.css';

import { ACTIVE_ORDER, fullName, matches } from '@/admin/lib';
import { useAccounts, useOrders, useRefreshAll, useRefunds, useRequests } from '@/admin/data';
import { SECTIONS, TITLES, nav, type Section } from '@/admin/nav';
import { Panel, Pill } from '@/admin/ui';
import Overview from '@/admin/sections/Overview';
import Orders from '@/admin/sections/Orders';
import Requests from '@/admin/sections/Requests';
import People from '@/admin/sections/People';
import Setup from '@/admin/sections/Setup';
import { Applications, Comms, Documents, Flights, Leads, Refunds } from '@/admin/sections/Records';

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const role = useQuery({
    queryKey: ['admin', 'is-admin', user?.id],
    enabled: !!user,
    staleTime: 5 * 60_000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc('is_admin');
      if (error) throw error;
      return data === true;
    },
  });

  if (loading || (user && role.isLoading)) {
    return (
      <div className="ogc ogc-gate">
        <div className="ogc-gate-card">
          <span className="ogc-brand-mark">OGT</span>
          <p>Checking your access…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Gate
        title="Admin console"
        text="Sign in with your admin account to manage One Global Trip."
        action={
          <button
            type="button"
            className="ogc-btn"
            onClick={() => {
              // Google sign-in leaves the site; this brings it back here.
              rememberAfterAuth('/admin');
              navigate('/auth', { state: { from: { pathname: '/admin' } } });
            }}
          >
            Sign in
          </button>
        }
      />
    );
  }

  if (role.error || !role.data) {
    return (
      <Gate
        title={role.error ? 'Could not check your access' : 'No access'}
        text={
          role.error
            ? 'The check failed. Reload the page to try again.'
            : `${user.email} is not an admin. Sign in with the admin account, or ask an admin to give you access.`
        }
        action={
          <>
            <button type="button" className="ogc-btn" onClick={() => supabase.auth.signOut().then(() => navigate('/auth', { state: { from: { pathname: '/admin' } } }))}>
              Use another account
            </button>
            <Link to="/" className="ogc-btn ogc-btn--ghost">
              Back to the website
            </Link>
          </>
        }
      />
    );
  }

  return <Console />;
}

function Gate({ title, text, action }: { title: string; text: string; action: React.ReactNode }) {
  return (
    <div className="ogc ogc-gate">
      <div className="ogc-gate-card">
        <span className="ogc-brand-mark">OGT</span>
        <h1>{title}</h1>
        <p>{text}</p>
        <div className="ogc-gate-actions">{action}</div>
      </div>
    </div>
  );
}

function Console() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const raw = params.get('s') as Section | null;
  const section: Section = raw && SECTIONS.includes(raw) ? raw : 'overview';
  const openId = params.get('id');
  const [drawer, setDrawer] = useState(false);
  const [q, setQ] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const refresh = useRefreshAll();

  const orders = useOrders().data;
  const requests = useRequests().data;
  const refunds = useRefunds().data;

  const counts = useMemo(
    () => ({
      requests: (requests ?? []).filter((r) => !r.lead_status || r.lead_status === 'new').length,
      orders: (orders ?? []).filter((o) => ACTIVE_ORDER.has(o.status)).length,
      refunds: (refunds ?? []).filter((r) => (r.status ?? 'pending') === 'pending').length,
    }),
    [orders, requests, refunds],
  );

  const go = (s: Section, id?: string) => {
    const next = new URLSearchParams();
    if (s !== 'overview') next.set('s', s);
    if (id) next.set('id', id);
    setParams(next);
    setQ('');
    setDrawer(false);
    window.scrollTo({ top: 0 });
  };
  const setOpen = (id: string | null) => {
    const next = new URLSearchParams(params);
    if (id) next.set('id', id);
    else next.delete('id');
    setParams(next, { replace: true });
  };

  // ⌘K / Ctrl K focuses the search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.title = `${TITLES[section].title} · OGT Admin`;
  }, [section]);

  const meta = (user?.user_metadata ?? {}) as Record<string, string | undefined>;
  const name = meta.full_name || meta.name || fullName(meta.first_name, meta.last_name) || 'Admin';
  const initials = (name === 'Admin' ? user?.email ?? 'A' : name)
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);
  const { title, description } = TITLES[section];

  const sidebar = (
    <aside className={`ogc-side${drawer ? ' is-open' : ''}`} aria-label="Admin navigation">
      <Link to="/admin" className="ogc-brand" onClick={() => go('overview')}>
        <span className="ogc-brand-mark">OGT</span>
        <span>
          <span className="ogc-brand-name">One Global Trip</span>
          <span className="ogc-brand-sub">Admin console</span>
        </span>
      </Link>
      <nav className="ogc-nav">
        {nav(counts).map((g, i) => (
          <div key={g.label ?? i} className="ogc-nav-group">
            {g.label && <span className="ogc-nav-label">{g.label}</span>}
            <ul>
              {g.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="ogc-nav-row"
                      aria-current={item.id === section ? 'page' : undefined}
                      onClick={() => go(item.id)}
                    >
                      <Icon />
                      <span className="ogc-nav-text">{item.label}</span>
                      {!!item.count && <span className={`ogc-count${item.alert ? ' ogc-count--alert' : ''}`}>{item.count}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="ogc-user">
        <div className="ogc-user-card">
          <span className="ogc-avatar">{initials}</span>
          <span style={{ minWidth: 0 }}>
            <span className="ogc-user-name">{name}</span>
            <span className="ogc-user-email">{user?.email}</span>
          </span>
        </div>
        <div className="ogc-user-actions">
          <Link to="/">
            <ArrowUpRight /> Website
          </Link>
          <button type="button" onClick={() => signOut().then(() => navigate('/'))}>
            <LogOut /> Sign out
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="ogc">
      {sidebar}
      {drawer && <div className="ogc-overlay" style={{ zIndex: 51 }} onClick={() => setDrawer(false)} aria-hidden />}

      <div className="ogc-body">
        <header className="ogc-mobilebar">
          <button type="button" onClick={() => setDrawer(true)} aria-label="Open navigation">
            <Menu size={20} />
          </button>
          <span className="ogc-brand-mark">OGT</span>
          <strong>Admin console</strong>
        </header>

        <div className="ogc-topbar">
          <div className="ogc-topbar-inner">
            <label className="ogc-search">
              <Search aria-hidden />
              <span className="sr-only">Search orders, requests and accounts</span>
              <input
                ref={searchRef}
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search orders, requests and accounts"
              />
              <kbd>{isMac ? '⌘' : 'Ctrl'} K</kbd>
            </label>
            <div className="ogc-topbar-right">
              <button type="button" className="ogc-btn ogc-btn--ghost ogc-btn--sm" onClick={() => refresh()}>
                <RefreshCw /> Refresh
              </button>
            </div>
          </div>
        </div>

        <main className="ogc-main" id="ogc-main">
          <div className="ogc-page">
            {q.trim() ? (
              <SearchResults q={q} go={go} />
            ) : (
              <>
                <div className="ogc-head" key={`h-${section}`}>
                  <div>
                    <p className="ogc-eyebrow">
                      <span className="ogc-live" aria-hidden />
                      Live · Admin console
                    </p>
                    <h1 className="ogc-title">{title}</h1>
                    {description && <p className="ogc-desc">{description}</p>}
                  </div>
                </div>
                <div className="ogc-section" key={`b-${section}`}>
                  {section === 'overview' && <Overview go={go} />}
                  {section === 'requests' && <Requests openId={openId} onOpen={setOpen} />}
                  {section === 'leads' && <Leads />}
                  {section === 'orders' && <Orders openId={openId} onOpen={setOpen} />}
                  {section === 'refunds' && <Refunds />}
                  {section === 'applications' && <Applications />}
                  {section === 'flights' && <Flights />}
                  {section === 'people' && <People />}
                  {section === 'admins' && <People adminsOnly />}
                  {section === 'documents' && <Documents />}
                  {section === 'comms' && <Comms />}
                  {section === 'setup' && <Setup />}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/** One search across hunts, requests and accounts. */
function SearchResults({ q, go }: { q: string; go: (s: Section, id?: string) => void }) {
  const orders = (useOrders().data ?? []).filter((o) =>
    matches(q, o.tracking_number, o.first_name, o.last_name, o.email, o.phone, o.destination_country),
  );
  const requests = (useRequests().data ?? []).filter((r) => matches(q, r.name, r.email, r.phone, r.destination));
  const accounts = (useAccounts().data ?? []).filter((a) => matches(q, a.email, a.first_name, a.last_name, a.phone));
  const none = orders.length + requests.length + accounts.length === 0;

  return (
    <div className="ogc-section">
      <div className="ogc-head">
        <div>
          <p className="ogc-eyebrow">Search</p>
          <h1 className="ogc-title">“{q.trim()}”</h1>
        </div>
      </div>
      {none && <Panel>Nothing matches. Try an email, a name or a tracking number.</Panel>}
      {orders.length > 0 && (
        <Panel title={`Appointment hunts · ${orders.length}`} flush>
          <ul className="ogc-list">
            {orders.slice(0, 20).map((o) => (
              <li key={o.id}>
                <button type="button" className="ogc-list-row" onClick={() => go('orders', o.id)}>
                  <span className="grow">
                    <span className="ogc-cell-main">{fullName(o.first_name, o.last_name)}</span>
                    <span className="ogc-cell-sub">
                      {o.email} · {o.destination_country} · <span className="mono">{o.tracking_number}</span>
                    </span>
                  </span>
                  <Pill status={o.status} />
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}
      {requests.length > 0 && (
        <Panel title={`Requests · ${requests.length}`} flush>
          <ul className="ogc-list">
            {requests.slice(0, 20).map((r) => (
              <li key={r.id}>
                <button type="button" className="ogc-list-row" onClick={() => go('requests', r.id)}>
                  <span className="grow">
                    <span className="ogc-cell-main">{r.name}</span>
                    <span className="ogc-cell-sub">
                      {r.email} · {r.destination ?? '—'}
                    </span>
                  </span>
                  <Pill status={r.lead_status || 'new'} />
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}
      {accounts.length > 0 && (
        <Panel title={`Accounts · ${accounts.length}`} flush>
          <ul className="ogc-list">
            {accounts.slice(0, 20).map((a) => (
              <li key={a.id}>
                <button type="button" className="ogc-list-row" onClick={() => go('people')}>
                  <span className="grow">
                    <span className="ogc-cell-main">{fullName(a.first_name, a.last_name) || a.email}</span>
                    <span className="ogc-cell-sub">{a.email}</span>
                  </span>
                  {a.roles.includes('admin') && <Pill tone="info" label="Admin" />}
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}
