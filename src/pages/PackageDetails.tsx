import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import { HotLink } from '@/components/site/fx';
import { packages } from '@/data/packages';
import { addToTrip } from '@/data/travelCatalog';

export default function PackageDetails() {
  const { id } = useParams();
  const p = packages.find((x) => x.id === id);
  const [added, setAdded] = useState(false);
  if (!p) return <Navigate replace to="/packages" />;

  const add = () => {
    addToTrip({ id: `pkg-${p.id}`, kind: 'Package', title: p.title, detail: p.location ?? p.country, price: p.price });
    setAdded(true);
  };

  return (
    <SitePage title={p.title} tone="night">
      <section className="ogt-hero ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <nav className="ogt-crumbs" aria-label="Breadcrumb">
            <Link to="/packages">Packages</Link><span aria-hidden="true">/</span><span>{p.location ?? p.country}</span>
          </nav>
          <div className="ogt-hero-grid">
            <div>
              <p className="ogt-eyebrow">{p.duration} · {p.category}</p>
              <h1 className="ogt-h1">{p.title}</h1>
              <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>{p.description}</p>
              <p style={{ margin: '2rem 0 0' }}>
                <span className="ogt-small">from</span>{' '}
                <span className="ogt-price" style={{ fontSize: 'clamp(2.75rem, 7vw, 4rem)', color: '#fff' }}>${p.price.toLocaleString()}</span>{' '}
                <span className="ogt-muted">per person</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                {added
                  ? <HotLink to="/startmytrip" className="ogt-btn-big">Lock in my trip</HotLink>
                  : <button type="button" className="ogt-btn ogt-btn-hot ogt-btn-big" onClick={add}>Add to my trip</button>}
                <Link to="/startmytrip" className="ogt-btn ogt-btn-glass ogt-btn-big">Change this trip</Link>
              </div>
              {added && <p className="ogt-pill" role="status" style={{ marginTop: '1rem' }}>In your trip</p>}
            </div>
            <div className="ogt-panel">
              <h2 className="ogt-h3">At a glance</h2>
              <ul className="ogt-checks" style={{ marginTop: '1rem' }}>
                {p.highlights.slice(0, 4).map((h) => <li key={h}>{h}</li>)}
              </ul>
              <p className="ogt-small ogt-muted" style={{ margin: '1.25rem 0 0' }}>{p.duration} · {p.location ?? p.country}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div data-reveal>
            <h2 className="ogt-h2">What you see</h2>
            <ul className="ogt-checks" style={{ marginTop: '1.75rem' }}>
              {p.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            {p.specialFeatures?.length > 0 && (
              <>
                <h3 className="ogt-h3" style={{ marginTop: '2.25rem' }}>How it is run</h3>
                <ul className="ogt-checks" style={{ marginTop: '1rem' }}>
                  {p.specialFeatures.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </>
            )}
          </div>
          <div data-reveal>
            {p.included && p.included.length > 0 && (
              <>
                <h2 className="ogt-h2">What is included</h2>
                <ul className="ogt-checks" style={{ marginTop: '1.75rem' }}>
                  {p.included.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </>
            )}
            {p.visasRequired?.length > 0 && (
              <div className="ogt-panel" style={{ marginTop: '2.25rem' }}>
                <h3 className="ogt-h3">Visas this trip may need</h3>
                <p className="ogt-muted" style={{ margin: '0.5rem 0 0' }}>{p.visasRequired.join(', ')}. It depends on your passport.</p>
                <p style={{ margin: '1.1rem 0 0' }}><Link to="/visas" className="ogt-btn ogt-btn-shine"><Check size={16} aria-hidden="true" /> Check my visa</Link></p>
              </div>
            )}
            <p className="ogt-note" style={{ marginTop: '2rem' }}>A starting price per person. We confirm the final price and what is included before you pay.</p>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
