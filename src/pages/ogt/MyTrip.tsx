import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Trash2 } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import { HotLink } from '@/components/site/fx';
import { clearTrip, loadTrip, removeFromTrip, type TripItem } from '@/data/travelCatalog';

export default function MyTrip() {
  const [trip, setTrip] = useState<TripItem[]>([]);
  useEffect(() => { setTrip(loadTrip()); }, []);
  const total = trip.reduce((s, t) => s + t.price, 0);
  const kinds = new Set(trip.map((t) => t.kind.toLowerCase()));

  return (
    <SitePage title="My trip" tone="night">
      <section className="ogt-night ogt-book-hero">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">My trip</p>
          <h1 className="ogt-h1">Your trip, in one place.</h1>
          <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
            Flights, stays, cars, cruises and activities all land here, with one total. We confirm the live prices, then you pay.
          </p>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          {trip.length === 0 ? (
            <div className="ogt-panel" style={{ textAlign: 'center', maxWidth: '40rem', marginInline: 'auto' }}>
              <h2 className="ogt-h3">Nothing in your trip yet.</h2>
              <p className="ogt-muted" style={{ margin: '0.5rem 0 0' }}>Start with a flight or a stay. It shows up here.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Link to="/flights" className="ogt-btn ogt-btn-shine">Find a flight</Link>
                <Link to="/stays" className="ogt-btn ogt-btn-ghost">Find a stay</Link>
                <Link to="/visas" className="ogt-btn ogt-btn-ghost">Check my visa</Link>
              </div>
            </div>
          ) : (
            <div className="ogt-split ogt-split-wide-right">
              <div className="ogt-panel">
                <h2 className="ogt-h3">Trip checklist</h2>
                <ul className="ogt-checklist">
                  {([
                    ['Flight', kinds.has('flight'), '/flights'],
                    ['Stay', kinds.has('hotel') || kinds.has('bnb'), '/stays'],
                    ['Car, cruise or activity', kinds.has('rental') || kinds.has('cruise') || kinds.has('activity'), '/cars'],
                  ] as [string, boolean, string][]).map(([label, done, to]) => (
                    <li key={label} data-done={done ? '' : undefined}>
                      <Check size={16} aria-hidden="true" />
                      <span>{label}</span>
                      {!done && <Link to={to} className="ogt-link">Add</Link>}
                    </li>
                  ))}
                  <li><Check size={16} aria-hidden="true" /><span>Visa</span><Link to="/visas" className="ogt-link">Check</Link></li>
                </ul>
              </div>
              <div>
                <ul className="ogt-rows">
                  {trip.map((t) => (
                    <li key={t.id} className="ogt-row" style={{ alignItems: 'center' }}>
                      <span className="ogt-row-name">{t.title}</span>
                      <span className="ogt-row-meta">{t.kind} · estimate</span>
                      <span className="ogt-row-price">
                        ${t.price.toLocaleString()}
                        <button type="button" onClick={() => setTrip(removeFromTrip(t.id))} aria-label={`Remove ${t.title}`} className="ogt-icon-btn"><Trash2 size={16} /></button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginTop: '1.5rem' }}>
                  <p style={{ margin: 0 }}><span className="ogt-muted">Estimate total</span> <span className="ogt-price">${total.toLocaleString()}</span></p>
                  <button type="button" onClick={() => { clearTrip(); setTrip([]); }} className="ogt-link" style={{ background: 'none', border: 0, cursor: 'pointer' }}>Clear trip</button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.75rem' }}>
                  <HotLink to="/startmytrip">Lock in this trip</HotLink>
                  <Link to="/contact" className="ogt-btn ogt-btn-ghost">Talk to us first</Link>
                </div>
                <p className="ogt-note" style={{ marginTop: '1.5rem' }}>Estimates only. We confirm the live price, the availability and the cancellation terms before you pay.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </SitePage>
  );
}
