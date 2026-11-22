/**
 * Accounts and admins.
 *
 * The list comes from admin_list_users(), which refuses anyone who is not an
 * admin. Making someone an admin gives them this whole console, so it asks
 * first. An admin cannot remove their own role here, which keeps at least
 * one way back in.
 */

import React, { useState } from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { ago, day, db, errText, fullName, matches, type Account } from '../lib';
import { useAccounts, useRefreshAll } from '../data';
import { Chips, Empty, Filter, Note, Panel, Pill, Skeleton } from '../ui';

export default function People({ adminsOnly = false }: { adminsOnly?: boolean }) {
  const { user } = useAuth();
  const { data = [], isLoading, error } = useAccounts();
  const refresh = useRefreshAll();
  const [view, setView] = useState<'all' | 'customers' | 'admins'>(adminsOnly ? 'admins' : 'all');
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState<string | null>(null);

  const isAdmin = (a: Account) => a.roles.includes('admin');
  const list = data.filter(
    (a) =>
      (view === 'all' || (view === 'admins' ? isAdmin(a) : !isAdmin(a))) &&
      matches(q, a.email, a.first_name, a.last_name, a.phone, a.nationality),
  );

  const setAdmin = async (a: Account, on: boolean) => {
    const verb = on ? 'Give' : 'Remove';
    if (!window.confirm(`${verb} admin access ${on ? 'to' : 'from'} ${a.email}?${on ? '\n\nThey will see every order, request and account.' : ''}`)) return;
    setBusy(a.id);
    try {
      const res = on
        ? await db.from('user_roles').insert({ user_id: a.id, role: 'admin' })
        : await db.from('user_roles').delete().eq('user_id', a.id).eq('role', 'admin');
      if (res.error) throw res.error;
      await refresh();
      toast.success(on ? `${a.email} is now an admin` : `${a.email} is no longer an admin`);
    } catch (e) {
      toast.error(errText(e));
    } finally {
      setBusy(null);
    }
  };

  return (
    <>
      <div className="ogc-toolbar">
        <Chips<'all' | 'customers' | 'admins'>
          value={view}
          onChange={setView}
          options={[
            { value: 'all', label: 'Everyone', count: data.length },
            { value: 'customers', label: 'Travelers', count: data.filter((a) => !isAdmin(a)).length },
            { value: 'admins', label: 'Admins', count: data.filter(isAdmin).length },
          ]}
        />
        <Filter value={q} onChange={setQ} placeholder="Email, name, phone" />
      </div>

      {error && <Note error>Could not load accounts: {errText(error)}</Note>}

      <Panel flush>
        {isLoading ? (
          <div style={{ padding: 20 }}>
            <Skeleton />
          </div>
        ) : list.length === 0 ? (
          <Empty icon={Users} title="No account matches" />
        ) : (
          <div className="ogc-table-wrap">
            <table className="ogc-table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th className="hide-sm">Signs in with</th>
                  <th>Activity</th>
                  <th className="hide-sm">Joined</th>
                  <th>Access</th>
                </tr>
              </thead>
              <tbody>
                {list.map((a) => {
                  const self = a.id === user?.id;
                  return (
                    <tr key={a.id}>
                      <td>
                        <span className="ogc-cell-main">{fullName(a.first_name, a.last_name) || a.email}</span>
                        <span className="ogc-cell-sub">
                          {a.email}
                          {!a.email_confirmed && ' · email not confirmed'}
                        </span>
                      </td>
                      <td className="hide-sm">{a.providers.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(', ') || '—'}</td>
                      <td>
                        <span className="ogc-cell-main">
                          {a.request_count} request{a.request_count === 1 ? '' : 's'} · {a.order_count} hunt{a.order_count === 1 ? '' : 's'}
                        </span>
                        <span className="ogc-cell-sub">Last sign-in {ago(a.last_sign_in_at)}</span>
                      </td>
                      <td className="hide-sm">{day(a.created_at)}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                          {isAdmin(a) ? <Pill tone="info" label="Admin" /> : <Pill tone="neutral" label="Traveler" />}
                          {isAdmin(a) ? (
                            !self && (
                              <button type="button" className="ogc-btn ogc-btn--sm ogc-btn--danger" disabled={busy === a.id} onClick={() => setAdmin(a, false)}>
                                Remove
                              </button>
                            )
                          ) : (
                            <button
                              type="button"
                              className="ogc-btn ogc-btn--sm ogc-btn--ghost"
                              disabled={busy === a.id || !a.email_confirmed}
                              title={a.email_confirmed ? undefined : 'Their email must be confirmed first'}
                              onClick={() => setAdmin(a, true)}
                            >
                              <ShieldCheck /> Make admin
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </>
  );
}
