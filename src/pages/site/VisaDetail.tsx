import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import FeeBreakdown from '@/components/site/FeeBreakdown';
import { SCOUTPASS, priceOf, visaBySlug } from '@/data/visaCatalog';

export default function VisaDetail() {
  const { slug } = useParams();
  const visa = visaBySlug(slug);
  if (!visa) return <Navigate replace to="/visas" />;

  const price = priceOf(visa.pricing);
  const variant = visa.variant ? priceOf(visa.variant.pricing) : null;
  const needsAppointment = /appointment/i.test(visa.route) || visa.kind === 'long';

  return (
    <SitePage title={visa.name}>
      <section className="ogt-hero">
        <div className="ogt-wrap">
          <nav className="ogt-crumbs" aria-label="Breadcrumb">
            <Link to="/visas">Visas</Link><span aria-hidden="true">/</span>
            <span>{visa.kind === 'short' ? 'Short stays' : 'Long stays'}</span>
          </nav>
          <div className="ogt-split ogt-split-wide-left">
            <div>
              <h1 className="ogt-h1">{visa.name}</h1>
              <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>{visa.summary}</p>
              <dl style={{ display: 'grid', gap: '1rem', margin: '2.25rem 0 0', maxWidth: '36rem' }}>
                {[
                  ['How long you can stay', visa.stay],
                  ['How you apply', visa.route],
                  ['How long a decision takes', visa.timing],
                ].map(([k, v]) => (
                  <div key={k} style={{ borderTop: '1px solid var(--line)', paddingTop: '0.8rem' }}>
                    <dt className="ogt-small ogt-muted">{k}</dt>
                    <dd style={{ margin: '0.15rem 0 0', fontWeight: 650, color: 'var(--ink)', fontSize: '1.1rem' }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="ogt-panel">
              <h2 className="ogt-h3">Full service, fees included</h2>
              <div style={{ marginTop: '1.1rem' }}><FeeBreakdown price={price} /></div>
              {variant && visa.variant && (
                <p className="ogt-small ogt-muted" style={{ margin: '1rem 0 0' }}>{visa.variant.label}: {variant.totalPrice}, fees included.</p>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Link to={`/start?visa=${visa.slug}`} className="ogt-btn">Start this visa</Link>
                {needsAppointment && <Link to={`/start?visa=${visa.slug}&service=appointment`} className="ogt-btn ogt-btn-ghost">Appointment only, {SCOUTPASS.price}</Link>}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap ogt-split">
          <div>
            <h2 className="ogt-h2">Documents to prepare</h2>
            <ul className="ogt-checks" style={{ marginTop: '1.75rem' }}>
              {visa.documents.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <p className="ogt-note" style={{ marginTop: '1.75rem' }}>
              This is the standard list. The consulate sets the final one, and it can change with your passport, your job
              and the reason for the trip. We confirm it for your case before you gather anything.
            </p>
          </div>
          <div>
            <h2 className="ogt-h2">What we do for you</h2>
            <ul className="ogt-checks" style={{ marginTop: '1.75rem' }}>
              {price.included.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="ogt-h2">Ready when you are.</h2>
            <p className="ogt-lede" style={{ marginTop: '0.9rem' }}>Send the request now. You pay once the visa, the documents and the price are confirmed.</p>
          </div>
          <Link to={`/start?visa=${visa.slug}`} className="ogt-btn ogt-btn-paper">Start this visa</Link>
        </div>
      </section>
    </SitePage>
  );
}
