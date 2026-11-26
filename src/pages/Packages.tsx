import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Plus } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import { HotLink } from '@/components/site/fx';
import { categories, packages } from '@/data/packages';
import { addToTrip } from '@/data/travelCatalog';

export default function Packages() {
  const [cat, setCat] = useState('all');
  const [added, setAdded] = useState<string[]>([]);
  const list = cat === 'all' ? packages : packages.filter((p) => p.category === cat);

  return (
    <SitePage title="Packages" tone="night">
      <section className="ogt-night ogt-book-hero">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">Packages</p>
          <h1 className="ogt-h1" style={{ maxWidth: '48rem' }}>Whole trips, <em>ready to change.</em></h1>
          <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
            A package is a starting point. Add it to your trip, swap what you want, and we confirm the live price and
            the visas it needs before you pay.
          </p>
          <ul className="ogt-chips" style={{ marginTop: '2rem' }} aria-label="Filter the packages">
            {categories.map((c) => {
              const count = c.id === 'all' ? packages.length : packages.filter((p) => p.category === c.id).length;
              if (!count) return null;
              return (
                <li key={c.id}>
                  <button type="button" className="ogt-chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.name} <small>{count}</small></button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <ul className="ogt-cards ogt-cards-3" aria-live="polite">
            {list.map((p) => {
              const isIn = added.includes(p.id);
              return (
                <li key={p.id}>
                  <article className="ogt-card">
                    <p className="ogt-card-tag" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={12} aria-hidden="true" /> {p.location ?? p.country} · {p.duration}</p>
                    <h2 className="ogt-h3"><Link to={`/packages/${p.id}`} style={{ textDecoration: 'none' }}>{p.title}</Link></h2>
                    <p>{p.description}</p>
                    {p.visasRequired?.length > 0 && <p className="ogt-small">May need: {p.visasRequired.join(', ')}</p>}
                    <div className="ogt-card-foot">
                      <span><small className="ogt-muted">from</small> <span className="ogt-price" style={{ fontSize: '1.6rem' }}>${p.price.toLocaleString()}</span></span>
                      <Link to={`/packages/${p.id}`} className="ogt-link">Details</Link>
                    </div>
                    <button
                      type="button"
                      className={`ogt-btn ${isIn ? 'ogt-btn-ghost' : 'ogt-btn-shine'}`}
                      style={{ marginTop: '1rem', width: '100%' }}
                      onClick={() => { addToTrip({ id: `pkg-${p.id}`, kind: 'Package', title: p.title, detail: p.location ?? p.country, price: p.price }); setAdded((a) => [...a, p.id]); }}
                    >
                      {isIn ? <><Check size={16} aria-hidden="true" /> In my trip</> : <><Plus size={16} aria-hidden="true" /> Add to my trip</>}
                    </button>
                  </article>
                </li>
              );
            })}
          </ul>
          <p className="ogt-note" style={{ marginTop: '2rem' }}>Prices are starting prices per person. We confirm the final price and what is included before you pay.</p>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="ogt-h2">None of these is your trip?</h2>
            <p className="ogt-lede" style={{ marginTop: '0.9rem' }}>Describe it in one sentence. We draft it and price it.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <HotLink to="/startmytrip">Start my trip</HotLink>
            <Link to="/trips" className="ogt-btn ogt-btn-glass">Review my trip <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
