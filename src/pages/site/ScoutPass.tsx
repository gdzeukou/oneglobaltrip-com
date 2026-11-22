import React from 'react';
import { Link } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import RequestForm from '@/components/site/RequestForm';
import { SCOUTPASS } from '@/data/visaCatalog';

export default function ScoutPass() {
  return (
    <SitePage title="ScoutPass appointment hunt">
      <section className="ogt-hero">
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <h1 className="ogt-h1">We hunt your visa appointment.</h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              ScoutPass watches {SCOUTPASS.centers.join(', ').replace(/, ([^,]*)$/, ' and $1')} for an open slot in your
              city and secures it. You keep your own file and go to one appointment.
            </p>
            <p style={{ margin: '2rem 0 0' }}>
              <span className="ogt-price" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}>{SCOUTPASS.price}</span>{' '}
              <span className="ogt-muted">{SCOUTPASS.unit}</span>
            </p>
            <div className="ogt-stamp ogt-stampface" data-tone="green" aria-hidden="true" style={{ justifySelf: 'start', margin: '1.75rem 0 0 0.5rem', width: '8.5rem' }}>
              <span className="ogt-stamp-big" style={{ fontSize: '1.2rem' }}>Refunded</span>
              <span className="ogt-stamp-small">if no slot</span>
            </div>
            <p className="ogt-small ogt-muted" style={{ marginTop: '1.25rem', maxWidth: '30rem' }}>
              {SCOUTPASS.refund} Consulate and visa center fees are separate and paid when you apply.
            </p>
          </div>
          <div id="start">
            <RequestForm defaults={{ service: 'appointment' }} />
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap">
          <h2 className="ogt-h2">How the hunt runs</h2>
          <ol className="ogt-steps ogt-steps-4" style={{ marginTop: '2.5rem' }}>
            <li><h3 className="ogt-h3">You send the request</h3><p className="ogt-muted">Your passport, the visa, the city you apply from and the dates that work for you.</p></li>
            <li><h3 className="ogt-h3">We confirm and you pay</h3><p className="ogt-muted">We check that the visa and the center are right for your case, then you pay the hunt.</p></li>
            <li><h3 className="ogt-h3">We watch for a slot</h3><p className="ogt-muted">When an appointment opens in your window, we secure it and send you the confirmation.</p></li>
            <li><h3 className="ogt-h3">You go once</h3><p className="ogt-muted">You attend with your file. If we cannot secure an appointment, the hunt is refunded.</p></li>
          </ol>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div>
            <h2 className="ogt-h2">Want the file done too?</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              The full service adds the forms, a review of every document and the consulate and center fees, in one price.
            </p>
          </div>
          <ul className="ogt-rows">
            <li><Link to="/visas/schengen" className="ogt-row"><span className="ogt-row-name">Schengen short-stay visa</span><span className="ogt-row-meta">29 countries, up to 90 days</span></Link></li>
            <li><Link to="/visas/uk" className="ogt-row"><span className="ogt-row-name">UK visitor visa</span><span className="ogt-row-meta">Up to 6 months</span></Link></li>
            <li><Link to="/visas" className="ogt-row"><span className="ogt-row-name">All visas</span><span className="ogt-row-meta">Short stays and long stays</span></Link></li>
          </ul>
        </div>
      </section>
    </SitePage>
  );
}
