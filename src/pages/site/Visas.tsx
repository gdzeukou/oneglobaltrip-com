import React from 'react';
import { Link } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import VisaCheck from '@/components/site/VisaCheck';
import { LONG_STAY, SHORT_STAY, priceOf, type VisaService } from '@/data/visaCatalog';

function VisaRows({ items }: { items: VisaService[] }) {
  return (
    <ul className="ogt-rows">
      {items.map((v) => (
        <li key={v.slug}>
          <Link to={`/visas/${v.slug}`} className="ogt-row">
            <span className="ogt-row-name">{v.name}</span>
            <span className="ogt-row-meta">{v.summary} {v.stay}.</span>
            <span className="ogt-row-price">{priceOf(v.pricing).totalPrice}<small>fees included</small></span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Visas() {
  return (
    <SitePage title="All visas">
      <section className="ogt-hero">
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <h1 className="ogt-h1">Every visa we handle, with its real price.</h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              Not sure which one applies to you? Run the check. It takes your passport and your destination and tells you
              what stands between you and the trip.
            </p>
          </div>
          <VisaCheck />
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet" id="short-stay">
        <div className="ogt-wrap ogt-split ogt-split-wide-right">
          <div>
            <h2 className="ogt-h2">Short stays</h2>
            <p className="ogt-muted" style={{ marginTop: '0.9rem', maxWidth: '26rem' }}>
              Tourism, family visits and business trips. For Schengen and the UK, the appointment is usually what takes longest.
            </p>
          </div>
          <VisaRows items={SHORT_STAY} />
        </div>
      </section>

      <section className="ogt-section" id="long-stay">
        <div className="ogt-wrap ogt-split ogt-split-wide-right">
          <div>
            <h2 className="ogt-h2">Long stays</h2>
            <p className="ogt-muted" style={{ marginTop: '0.9rem', maxWidth: '26rem' }}>
              Work, study, family reunion or retirement in Europe, for more than 90 days. These are national visas, filed
              with the consulate of the country you are moving to.
            </p>
          </div>
          <VisaRows items={LONG_STAY} />
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem 3rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="ogt-h2">A visa that is not on this list?</h2>
            <p className="ogt-lede" style={{ marginTop: '0.9rem' }}>Tell us the country and your passport. We will say whether we can take it.</p>
          </div>
          <Link to="/contact" className="ogt-btn ogt-btn-paper">Ask us</Link>
        </div>
      </section>
    </SitePage>
  );
}
