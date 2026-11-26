import React, { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Plus } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import { HotLink } from '@/components/site/fx';
import TripBar, { emptyTrip, type TripQuery } from '@/components/site/TripBar';
import { ALL_ITEMS, addToTrip, type TravelKind } from '@/data/travelCatalog';

const META: Record<TravelKind, { title: string; lead: string; sub: string; cta: string }> = {
  flights: { title: 'Flights', lead: 'Fly from your airport. To anywhere.', sub: 'Tell us the two cities and the dates. We confirm the final fare before you pay.', cta: 'Add flight to my trip' },
  stays: { title: 'Stays', lead: 'A bed for every night of the trip.', sub: 'Hotels for short stays, apartments and BnBs for longer ones. Starting prices, confirmed before you pay.', cta: 'Add stay to my trip' },
  cars: { title: 'Cars', lead: 'Pick up the car where you land.', sub: 'Economy to SUV. We confirm the price, the insurance and the mileage before you pay.', cta: 'Add car to my trip' },
  cruises: { title: 'Cruises', lead: 'Sea days and river days.', sub: 'Mediterranean, Caribbean, Nile, Alaska. We confirm the cabin and the sailing dates before you pay.', cta: 'Add cruise to my trip' },
  activities: { title: 'Activities', lead: 'What you do once you are there.', sub: 'City experiences, tours and day trips. Starting prices, confirmed before you pay.', cta: 'Add activity to my trip' },
};

const TABS: { to: string; label: string }[] = [
  { to: '/flights', label: 'Flights' },
  { to: '/stays', label: 'Stays' },
  { to: '/cars', label: 'Cars' },
  { to: '/cruises', label: 'Cruises' },
  { to: '/activities', label: 'Activities' },
  { to: '/packages', label: 'Packages' },
  { to: '/visas', label: 'Visas' },
];

export default function TravelModule({ kind }: { kind: TravelKind }) {
  const meta = META[kind];
  const [query, setQuery] = useState('');
  const [added, setAdded] = useState<string | null>(null);
  const [trip, setTrip] = useState<TripQuery>(emptyTrip);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = ALL_ITEMS.filter((i) => i.kind === kind);
    if (!q) return base;
    return base.filter((i) => i.city.toLowerCase().includes(q) || i.country.toLowerCase().includes(q) || i.title.toLowerCase().includes(q));
  }, [kind, query]);


  return (
    <SitePage title={meta.title} tone="night">
      <section className="ogt-night ogt-book-hero">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <ul className="ogt-booktabs" aria-label="What to book">
            {TABS.map((t) => <li key={t.to}><NavLink to={t.to}>{t.label}</NavLink></li>)}
          </ul>
          <p className="ogt-eyebrow">{meta.title}</p>
          <h1 className="ogt-h1" style={{ maxWidth: '48rem' }}>{meta.lead}</h1>
          <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>{meta.sub}</p>

          <div style={{ marginTop: '2rem', maxWidth: '46rem' }}>
            <TripBar value={trip} onChange={setTrip} submitLabel={kind === 'flights' ? 'Search flights' : 'See prices'} />
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', alignItems: 'end', justifyContent: 'space-between' }}>
            <div>
              <h2 className="ogt-h2">Where to?</h2>
              <p className="ogt-muted" style={{ margin: '0.6rem 0 0' }}>Starting estimates, not live prices. We confirm the real one before you pay.</p>
            </div>
            <div className="ogt-field" style={{ width: 'min(100%, 22rem)' }}>
              <label htmlFor="book-q">Search a city or a country</label>
              <input id="book-q" className="ogt-input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Paris, Tokyo, Dubai…" />
            </div>
          </div>

          {items.length === 0 ? (
            <p className="ogt-note" style={{ marginTop: '2rem' }}>No match for that search. Try Paris, Tokyo, Dubai, Rome or London, or <Link to="/contact" className="ogt-link">tell us where you want to go</Link>.</p>
          ) : (
            <ul className="ogt-cards ogt-cards-3" style={{ marginTop: '2rem' }}>
              {items.map((item) => (
                <li key={item.id}>
                  <article className="ogt-card">
                    <p className="ogt-card-tag">{item.tag} · {item.region}</p>
                    <h3 className="ogt-h3">{item.title}</h3>
                    <p className="ogt-small" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} aria-hidden="true" /> {item.city}, {item.country}</p>
                    <p>{item.detail}</p>
                    <div className="ogt-card-foot">
                      <span><span className="ogt-price" style={{ fontSize: '1.6rem' }}>${item.fromPrice.toLocaleString()}</span> <small className="ogt-muted">{item.priceLabel}</small></span>
                    </div>
                    <button
                      type="button"
                      className={`ogt-btn ${added === item.id ? 'ogt-btn-ghost' : 'ogt-btn-shine'}`}
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => { addToTrip({ id: item.id, kind: item.tag, title: item.title, detail: item.detail, price: item.fromPrice }); setAdded(item.id); }}
                    >
                      {added === item.id ? <><Check size={16} aria-hidden="true" /> Added to my trip</> : <><Plus size={16} aria-hidden="true" /> {meta.cta}</>}
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="ogt-h2">Need a visa for this trip?</h2>
            <p className="ogt-lede" style={{ marginTop: '0.9rem' }}>Check it in ten seconds. Everything you add lands in one trip with one total; nothing is charged from this page.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <HotLink to="/trips">Review my trip</HotLink>
            <Link to="/visas" className="ogt-btn ogt-btn-glass">Check my visa <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
