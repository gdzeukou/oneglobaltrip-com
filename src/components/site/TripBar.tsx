/**
 * The trip bar: where you are, where you want to go, when, how many.
 *
 * It is the front door of the site. Submitting it opens the trip board for
 * that route, where flights, stays, activities and the border all line up.
 */

import React, { useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeftRight } from 'lucide-react';
import { PLACE_LABELS } from '@/lib/places.trip';
import { isoDate } from '@/lib/travelSearch';

export type TripQuery = { from: string; to: string; depart: string; back: string; pax: number };

export const emptyTrip = (): TripQuery => ({ from: '', to: '', depart: isoDate(30), back: isoDate(37), pax: 1 });

export function tripUrl(q: TripQuery): string {
  const p = new URLSearchParams({ from: q.from, to: q.to, depart: q.depart, pax: String(q.pax) });
  if (q.back) p.set('return', q.back);
  return `/trip?${p.toString()}`;
}

export default function TripBar({
  value,
  onChange,
  submitLabel = 'Plan my trip',
}: {
  value: TripQuery;
  onChange: (next: TripQuery) => void;
  submitLabel?: string;
}) {
  const id = useId();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const today = isoDate(0);
  const set = <K extends keyof TripQuery>(k: K, v: TripQuery[K]) => onChange({ ...value, [k]: v });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.to.trim()) {
      setError('Tell us where you want to go.');
      return;
    }
    if (value.back && value.back < value.depart) {
      setError('The return date is before the departure.');
      return;
    }
    setError('');
    navigate(tripUrl(value));
  }

  return (
    <form className="ogt-tripbar" onSubmit={submit} role="search" aria-label="Plan a trip">
      <datalist id={`${id}-places`}>
        {PLACE_LABELS.map((p) => <option key={p} value={p} />)}
      </datalist>
      <div className="ogt-tripbar-route">
        <div className="ogt-field">
          <label htmlFor={`${id}-from`}>Where are you now?</label>
          <input id={`${id}-from`} className="ogt-input" list={`${id}-places`} value={value.from} onChange={(e) => set('from', e.target.value)} placeholder="City you leave from" autoComplete="off" />
        </div>
        <button type="button" className="ogt-tripbar-swap" aria-label="Swap the two cities" onClick={() => onChange({ ...value, from: value.to, to: value.from })}>
          <ArrowLeftRight size={16} />
        </button>
        <div className="ogt-field">
          <label htmlFor={`${id}-to`}>Where do you want to go?</label>
          <input id={`${id}-to`} className="ogt-input" list={`${id}-places`} value={value.to} onChange={(e) => set('to', e.target.value)} placeholder="City or country" autoComplete="off" />
        </div>
      </div>
      <div className="ogt-tripbar-rest">
        <div className="ogt-field">
          <label htmlFor={`${id}-out`}>Leave</label>
          <input id={`${id}-out`} type="date" className="ogt-input" min={today} value={value.depart} onChange={(e) => set('depart', e.target.value)} required />
        </div>
        <div className="ogt-field">
          <label htmlFor={`${id}-back`}>Come back</label>
          <input id={`${id}-back`} type="date" className="ogt-input" min={value.depart || today} value={value.back} onChange={(e) => set('back', e.target.value)} />
        </div>
        <div className="ogt-field">
          <label htmlFor={`${id}-pax`}>Travelers</label>
          <select id={`${id}-pax`} className="ogt-select" value={value.pax} onChange={(e) => set('pax', Number(e.target.value))}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <button type="submit" className="ogt-btn ogt-btn-hot ogt-btn-big">
          <span>{submitLabel}</span>
          <ArrowRight size={18} className="ogt-btn-arrow" aria-hidden="true" />
        </button>
      </div>
      {error && <p className="ogt-alert" role="alert" style={{ gridColumn: '1 / -1', margin: 0 }}>{error}</p>}
    </form>
  );
}
