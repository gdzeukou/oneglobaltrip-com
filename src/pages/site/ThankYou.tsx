/** Where Stripe sends the traveler back after paying for the appointment hunt. */

import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import { SCOUTPASS } from '@/data/visaCatalog';

export default function ThankYou() {
  const [params] = useSearchParams();
  const paid = Boolean(params.get('session_id'));

  return (
    <SitePage title={paid ? 'Payment received' : 'Thank you'}>
      <section className="ogt-hero">
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <h1 className="ogt-h1">{paid ? 'Payment received. The hunt starts now.' : 'Thank you.'}</h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              {paid
                ? 'Stripe has sent your receipt by email. We write to you with your tracking number, and again as soon as an appointment is secured.'
                : 'If you just paid, your receipt is in your email. If you did not, nothing was charged.'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
              <Link to="/file" className="ogt-btn">Write my cover letter and travel plan</Link>
              <Link to="/dashboard" className="ogt-btn ogt-btn-ghost">Open my file</Link>
            </div>
          </div>
          {paid && (
            <div className="ogt-panel">
              <h2 className="ogt-h3">What happens next</h2>
              <ol className="ogt-steps" style={{ marginTop: '1.25rem', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.25rem', color: 'var(--ink)' }}>
                <li><h3 className="ogt-h3">We watch for a slot</h3><p className="ogt-muted">At the visa center for your city and your dates.</p></li>
                <li><h3 className="ogt-h3">We secure it and tell you</h3><p className="ogt-muted">You get the confirmation by email.</p></li>
                <li><h3 className="ogt-h3">You go once, with your file</h3><p className="ogt-muted">{SCOUTPASS.refund}</p></li>
              </ol>
            </div>
          )}
        </div>
      </section>
    </SitePage>
  );
}
