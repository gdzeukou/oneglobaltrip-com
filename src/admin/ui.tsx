/**
 * Building blocks for the admin console, so every section's cards, counts,
 * statuses, tables and drawers look the same.
 */

import React, { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { LucideIcon } from 'lucide-react';
import { AlertTriangle, Search, X } from 'lucide-react';
import { humanize, toneOf, type Tone } from './lib';

export function Pill({ status, label, tone }: { status?: string | null; label?: ReactNode; tone?: Tone }) {
  return <span className={`ogc-pill ogc-pill--${tone ?? toneOf(status)}`}>{label ?? humanize(status)}</span>;
}

export function Panel({
  title,
  description,
  actions,
  flush,
  children,
}: {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  flush?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="ogc-panel">
      {(title || actions) && (
        <header className="ogc-panel-head">
          <div>
            {title && <h2 className="ogc-panel-title">{title}</h2>}
            {description && <p className="ogc-panel-desc">{description}</p>}
          </div>
          {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
        </header>
      )}
      <div className={flush ? 'ogc-panel-body--flush' : 'ogc-panel-body'}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon: Icon,
  tone,
  onClick,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon;
  tone?: 'green' | 'amber' | 'red';
  onClick?: () => void;
}) {
  const body = (
    <>
      <div className="ogc-stat-top">
        <span className="ogc-stat-label">{label}</span>
        {Icon && (
          <span className={`ogc-stat-icon${tone ? ` ogc-stat-icon--${tone}` : ''}`}>
            <Icon />
          </span>
        )}
      </div>
      <p className="ogc-stat-value">{value}</p>
      {hint && <p className="ogc-stat-hint">{hint}</p>}
    </>
  );
  return onClick ? (
    <button type="button" className="ogc-stat" onClick={onClick}>
      {body}
    </button>
  ) : (
    <div className="ogc-stat">{body}</div>
  );
}

export function Empty({ icon: Icon, title, text, action }: { icon?: LucideIcon; title: ReactNode; text?: ReactNode; action?: ReactNode }) {
  return (
    <div className="ogc-empty">
      {Icon && (
        <span className="ogc-empty-icon">
          <Icon />
        </span>
      )}
      <p className="ogc-empty-title">{title}</p>
      {text && <p className="ogc-empty-text">{text}</p>}
      {action && <div style={{ marginTop: 18 }}>{action}</div>}
    </div>
  );
}

export function Note({ children, error }: { children: ReactNode; error?: boolean }) {
  return (
    <div className={`ogc-note${error ? ' ogc-note--error' : ''}`} role={error ? 'alert' : undefined}>
      <AlertTriangle />
      <div>{children}</div>
    </div>
  );
}

export function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: NoInfer<T>; label: string; count?: number }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="ogc-chips" role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          className="ogc-chip"
          onClick={() => onChange(o.value)}
        >
          {o.label}
          {typeof o.count === 'number' && <small>{o.count}</small>}
        </button>
      ))}
    </div>
  );
}

export function Filter({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <label className="ogc-filter">
      <Search aria-hidden />
      <span className="sr-only">{placeholder}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} type="search" />
    </label>
  );
}

export function Skeleton({ height = 220 }: { height?: number }) {
  return <div className="ogc-skel" style={{ height }} aria-hidden />;
}

/** Side panel with the full record. Closes on Escape and on the backdrop. */
export function Drawer({
  title,
  subtitle,
  onClose,
  footer,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  // Rendered into <body>: the section's entrance animation would otherwise
  // trap a fixed-position panel inside the page.
  return createPortal(
    <div className="ogc ogc-portal">
      <div className="ogc-overlay" onClick={onClose} aria-hidden />
      <aside className="ogc-drawer" role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : 'Details'}>
        <header className="ogc-drawer-head">
          <div className="grow">
            <h2 className="ogc-drawer-title">{title}</h2>
            {subtitle && <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>{subtitle}</div>}
          </div>
          <button type="button" className="ogc-drawer-close" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </header>
        <div className="ogc-drawer-body">{children}</div>
        {footer && <footer className="ogc-drawer-foot">{footer}</footer>}
      </aside>
    </div>,
    document.body,
  );
}

export function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="ogc-facts">
      {rows.map(([k, v]) => (
        <React.Fragment key={k}>
          <dt>{k}</dt>
          <dd>{v === null || v === undefined || v === '' ? '—' : v}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

export const mailto = (email?: string | null) => (email ? <a href={`mailto:${email}`}>{email}</a> : '—');
export const tel = (phone?: string | null) => (phone ? <a href={`tel:${phone}`}>{phone}</a> : '—');
