import React from 'react';
import { Link } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import VisaCheck from '@/components/site/VisaCheck';
import FeeBreakdown from '@/components/site/FeeBreakdown';
import { LONG_STAY, SCOUTPASS, SHORT_STAY, priceOf } from '@/data/visaCatalog';

export const FAQ: [string, string][] = [
  ['Do you guarantee a visa?', 'No. No agency can guarantee a consulate decision. We guarantee the work: a complete file, the appointment hunt, and a refund of the hunt if no appointment can be secured.'],
  ['What does the appointment hunt cover?', `Finding and securing your appointment at the visa center, at ${SCOUTPASS.price} ${SCOUTPASS.unit}. Fees charged by the consulate or the center are separate when you take the hunt alone.`],
  ['Which countries do you cover?', 'All 29 Schengen countries, the United Kingdom, Canada, the UAE, India, Brazil and Nigeria for short stays, and long-stay visas for seven European countries.'],
  ['Where can I apply from?', 'We secure appointments in US cities. If you apply from somewhere else, say where in your request and we will tell you whether we can help.'],
  ['When do I pay?', 'After we have confirmed the visa you need, the document list and the price. Sending a request costs nothing.'],
];

export default function Home() {
  const schengen = priceOf('schengenShortStay');

  return (
    <SitePage title="Visa files and visa appointments">
      <section className="ogt-hero">
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <h1 className="ogt-h1">Need a visa? We get you the appointment.</h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              Choose your passport and where you are going. If a visa stands between you and the trip, we prepare the file
              and hunt the appointment at {SCOUTPASS.centers.join(', ').replace(/, ([^,]*)$/, ' or $1')}.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
              <Link to="/start" className="ogt-btn">Start my visa</Link>
              <Link to="/visas" className="ogt-btn ogt-btn-ghost">See all visas</Link>
            </div>
          </div>
          <VisaCheck />
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap ogt-split ogt-split-wide-left">
          <div>
            <h2 className="ogt-h2">The appointment is the hard part.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              Slots at visa centers open without warning and fill fast. ScoutPass is our appointment hunt:
              we watch for a slot in your city and secure it for you.
            </p>
            <ul className="ogt-checks" style={{ marginTop: '1.75rem', maxWidth: '34rem' }}>
              <li>Appointments at {SCOUTPASS.centers.join(', ')} across US cities</li>
              <li>You keep your own file, or we prepare it with the full service</li>
              <li>{SCOUTPASS.refund}</li>
            </ul>
          </div>
          <div className="ogt-panel">
            <h3 className="ogt-h3">ScoutPass appointment hunt</h3>
            <p style={{ margin: '0.9rem 0 0' }}>
              <span className="ogt-price" style={{ fontSize: '3.25rem' }}>{SCOUTPASS.price}</span>{' '}
              <span className="ogt-muted">{SCOUTPASS.unit}</span>
            </p>
            <p className="ogt-small ogt-muted" style={{ margin: '0.6rem 0 1.4rem' }}>Consulate and center fees are not part of this price.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/start?service=appointment" className="ogt-btn">Hunt my appointment</Link>
              <Link to="/scoutpass" className="ogt-btn ogt-btn-ghost">How it works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }}>From the first question to the border.</h2>
          <ol className="ogt-steps ogt-steps-4" style={{ marginTop: '2.5rem', color: 'var(--ink)' }}>
            <li><h3 className="ogt-h3">Check</h3><p className="ogt-muted">Tell us your passport, your destination and your dates. We confirm which visa you need, or that you need none.</p></li>
            <li><h3 className="ogt-h3">File</h3><p className="ogt-muted">You get the exact document list. We complete the forms with you and review every document before it is submitted.</p></li>
            <li><h3 className="ogt-h3">Appointment</h3><p className="ogt-muted">We hunt the slot at the visa center and book it. You go once, with a file that is ready.</p></li>
            <li><h3 className="ogt-h3">Travel</h3><p className="ogt-muted">We track the application until the passport is back, then help you plan the trip itself.</p></li>
          </ol>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap ogt-split ogt-split-wide-left">
          <div>
            <h2 className="ogt-h2">Visas we handle</h2>
            <p className="ogt-muted" style={{ margin: '0.9rem 0 1.75rem', maxWidth: '34rem' }}>Prices are totals. Consulate and center fees are already inside.</p>
            <ul className="ogt-rows">
              {SHORT_STAY.map((v) => (
                <li key={v.slug}>
                  <Link to={`/visas/${v.slug}`} className="ogt-row">
                    <span className="ogt-row-name">{v.name}</span>
                    <span className="ogt-row-meta">{v.stay}</span>
                    <span className="ogt-row-price">{priceOf(v.pricing).totalPrice}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/visas#long-stay" className="ogt-row">
                  <span className="ogt-row-name">Long-stay visas for Europe</span>
                  <span className="ogt-row-meta">{LONG_STAY.map((v) => v.name.replace(' long-stay visa', '')).join(', ')}</span>
                  <span className="ogt-row-price">{priceOf(LONG_STAY[0].pricing).totalPrice}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="ogt-h3">What a Schengen visa costs, line by line</h3>
            <p className="ogt-muted" style={{ margin: '0.6rem 0 1.25rem' }}>You see what goes to the consulate, what goes to the visa center, and what goes to us.</p>
            <FeeBreakdown price={schengen} />
            <p style={{ marginTop: '1.5rem' }}><Link to="/pricing" className="ogt-link">See every price</Link></p>
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div>
            <h2 className="ogt-h2">Visa sorted. Now the trip.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              Build the route and see every border on it: which visas it needs, which consulate takes the file and the
              dates the paperwork has to hit.
            </p>
          </div>
          <ul className="ogt-rows">
            <li><Link to="/plan" className="ogt-row"><span className="ogt-row-name">Route planner</span><span className="ogt-row-meta">Every border on your route, with the dates to hit</span></Link></li>
            <li><Link to="/globe" className="ogt-row"><span className="ogt-row-name">The globe</span><span className="ogt-row-meta">Spin it, pick a city, ask the AI planner</span></Link></li>
            <li><Link to="/packages" className="ogt-row"><span className="ogt-row-name">Packages</span><span className="ogt-row-meta">Ready-made trips you can change</span></Link></li>
            <li><Link to="/trips" className="ogt-row"><span className="ogt-row-name">My trip</span><span className="ogt-row-meta">Everything you have added, with one total</span></Link></li>
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <h2 className="ogt-h2">Questions people ask first</h2>
          <div className="ogt-faq" style={{ marginTop: '2rem', maxWidth: '52rem' }}>
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>
    </SitePage>
  );
}
