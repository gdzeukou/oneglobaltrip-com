/**
 * The trip drafter: one sentence in, a first draft out.
 *
 * It reads the destination, the number of days and the budget out of the
 * sentence and prices a flight, a stay and an activity from the estimate
 * catalogue. It is a starting point for a person to confirm, and says so.
 */

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { globeDestinations } from '@/data/globeDestinations';
import { ALL_ITEMS, addToTrip, clearTrip } from '@/data/travelCatalog';
import { SCHENGEN } from '@/lib/travelResolve';
import { SCOUTPASS } from '@/data/visaCatalog';

const IDEAS = ['5 days in Paris, culture and food, under $2500', 'Romantic 4 days in Rome', 'Family week in Dubai', '6 days in Tokyo, adventure'];

function parseTrip(text: string) {
  const lower = text.toLowerCase();
  const dest = globeDestinations.find((d) => lower.includes(d.name.toLowerCase()) || lower.includes(d.country.toLowerCase()));
  const daysMatch = lower.match(/(\d+)\s*(day|jour|night|nuit)/) ?? (lower.includes('week') || lower.includes('semaine') ? ['', '7'] : null);
  const days = daysMatch ? Math.min(21, Math.max(2, parseInt(daysMatch[1], 10))) : 5;
  const budgetMatch = lower.match(/[$€£]\s*(\d[\d,]{2,6})|(\d[\d,]{2,6})\s*(usd|eur|dollars|euros|\$|€)/);
  const budget = budgetMatch ? parseInt((budgetMatch[1] ?? budgetMatch[2]).replace(/,/g, ''), 10) : null;
  return { dest, days, budget };
}

export default function AiPlanner({ onAdded }: { onAdded?: () => void }) {
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const plan = useMemo(() => (submitted ? parseTrip(submitted) : null), [submitted]);
  const dest = plan?.dest;

  const nights = Math.max(1, (plan?.days ?? 5) - 1);
  const flight = dest && ALL_ITEMS.find((i) => i.kind === 'flights' && i.city === dest.name);
  const stay = dest && ALL_ITEMS.find((i) => i.kind === 'stays' && i.city === dest.name);
  const activity = dest && ALL_ITEMS.find((i) => i.kind === 'activities' && i.city === dest.name);
  const lines = [
    flight && { item: flight, label: flight.title, price: flight.fromPrice },
    stay && { item: stay, label: `${stay.title}, ${nights} night${nights === 1 ? '' : 's'}`, price: stay.fromPrice * nights },
    activity && { item: activity, label: activity.title, price: activity.fromPrice },
  ].filter(Boolean) as { item: (typeof ALL_ITEMS)[number]; label: string; price: number }[];
  const total = lines.reduce((s, l) => s + l.price, 0);

  const run = (value: string) => {
    if (!value.trim()) return;
    setText(value);
    setSubmitted(value);
    setAdded(false);
  };

  const addPlan = () => {
    clearTrip();
    lines.forEach((l) => addToTrip({ id: l.item.id, kind: l.item.tag, title: l.label, detail: l.item.detail, price: l.price }));
    setAdded(true);
    onAdded?.();
  };

  return (
    <div className="ogt-panel">
      <p className="ogt-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Sparkles size={14} aria-hidden="true" /> Trip drafter</p>
      <h2 className="ogt-h3">Describe the trip in one sentence.</h2>
      <form onSubmit={(e) => { e.preventDefault(); run(text); }} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1rem' }}>
        <label htmlFor="drafter" className="sr-only">Your trip, in your own words</label>
        <input id="drafter" className="ogt-input" style={{ flex: '1 1 16rem' }} value={text} onChange={(e) => setText(e.target.value)} placeholder="10 days in Tokyo, food and temples, under $3000" />
        <button type="submit" className="ogt-btn ogt-btn-shine">Draft it</button>
      </form>
      <ul className="ogt-chips ogt-chips-paper" style={{ marginTop: '0.9rem' }} aria-label="Examples">
        {IDEAS.map((s) => (
          <li key={s}><button type="button" className="ogt-chip ogt-chip-small" onClick={() => run(s)}>{s}</button></li>
        ))}
      </ul>

      <div aria-live="polite">
        {plan && !dest && (
          <p className="ogt-note" style={{ marginTop: '1.25rem' }}>
            We did not catch a city or a country in that sentence. Name one, or send the idea as it is with the form: a person reads it.
          </p>
        )}
        {plan && dest && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px dashed var(--ink)' }}>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>
              {plan.days} days in {dest.name}, {dest.country}{plan.budget ? `, around $${plan.budget.toLocaleString()}` : ''}.
            </p>
            <p className="ogt-muted" style={{ margin: '0.4rem 0 0' }}>A first draft, not a booking. Change anything; we confirm the live prices.</p>
            <ul className="ogt-feelist" style={{ marginTop: '1rem' }}>
              {lines.map((l) => (
                <li key={l.item.id}><span /><span>{l.label}</span><b>${l.price.toLocaleString()}</b></li>
              ))}
              <li style={{ borderTop: '1.5px solid var(--ink)', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                <span /><span style={{ fontWeight: 700 }}>Draft total, estimate</span><b style={{ fontSize: '1.2rem', color: 'var(--ink)' }}>${total.toLocaleString()}</b>
              </li>
            </ul>
            {plan.budget !== null && total > plan.budget && (
              <p className="ogt-small ogt-muted" style={{ margin: '0.75rem 0 0' }}>That is above your budget. Tell us in the form and we look for a cheaper route or stay.</p>
            )}
            {SCHENGEN.has(dest.country) && (
              <p className="ogt-note" style={{ marginTop: '1rem' }}>
                {dest.country} is in the Schengen area. If your passport needs a visa, we file it, or hunt the appointment alone for {SCOUTPASS.price}.{' '}
                <Link to="/visas" className="ogt-link">Check my visa</Link>
              </p>
            )}
            <button type="button" className={`ogt-btn ${added ? 'ogt-btn-ghost' : ''}`} style={{ marginTop: '1.25rem' }} onClick={addPlan}>
              {added ? <><Check size={16} aria-hidden="true" /> In my trip</> : 'Put this draft in my trip'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
