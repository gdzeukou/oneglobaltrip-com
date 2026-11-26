import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import RequestForm from '@/components/site/RequestForm';
import SlotRadar from '@/components/site/SlotRadar';
import { HotLink, StickyCta } from '@/components/site/fx';
import { SCOUTPASS } from '@/data/visaCatalog';

const HUNT_FAQ: [string, string][] = [
  ['What exactly do I pay for?', `The hunt: finding and securing your appointment at the visa center. It is ${SCOUTPASS.price} ${SCOUTPASS.unit}. Consulate and visa center fees are separate and paid when you apply.`],
  ['What if you find no appointment?', SCOUTPASS.refund],
  ['Do you guarantee the visa?', 'No. The consulate alone decides. We guarantee the hunt, and the refund if it fails.'],
  ['Which centers do you watch?', `${SCOUTPASS.centers.join(', ')}, in the city you apply from, wherever that is. Tell us the city in your request.`],
  ['Can you prepare my file too?', 'Yes. The full service adds the forms, a review of every document and the consulate and center fees, in one price.'],
];

export default function ScoutPass() {
  const cancelled = useSearchParams()[0].get('payment') === 'cancelled';
  return (
    <SitePage title="ScoutPass appointment hunt" tone="night">
      <section className="ogt-hero ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <p className="ogt-eyebrow">ScoutPass by One Global Trip</p>
            <h1 className="ogt-h1">No slots for months? <em>We hunt yours.</em></h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              ScoutPass watches {SCOUTPASS.centers.join(', ').replace(/, ([^,]*)$/, ' and $1')} for an open slot in your
              city and secures it. You keep your own file and go to one appointment.
            </p>
            <p style={{ margin: '2rem 0 0' }}>
              <span className="ogt-price" style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', color: '#fff' }}>{SCOUTPASS.price}</span>{' '}
              <span className="ogt-muted">{SCOUTPASS.unit}</span>
            </p>
            <p className="ogt-pill" style={{ marginTop: '1.25rem' }}>Refunded in full if no slot</p>
            <p className="ogt-small ogt-muted" style={{ marginTop: '1.25rem', maxWidth: '30rem' }}>
              {SCOUTPASS.refund} Consulate and visa center fees are separate and paid when you apply.
            </p>
          </div>
          <div id="start">
            {cancelled && <p className="ogt-alert" role="status" style={{ marginBottom: '1rem' }}>Payment cancelled. Nothing was charged. Your request is saved, and you can pay again below.</p>}
            <RequestForm defaults={{ service: 'appointment' }} />
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>How the hunt runs</p>
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }} data-reveal>Four steps. You show up for one of them.</h2>
          <ol className="ogt-route" style={{ marginTop: '2.5rem' }} data-reveal data-reveal-group>
            <li><h3 className="ogt-h3">You tell us the trip</h3><p>Your passport, the visa, the city you apply from and the dates that work for you.</p></li>
            <li><h3 className="ogt-h3">You pay the hunt</h3><p>By card, on Stripe. You get a receipt and a tracking number by email.</p></li>
            <li><h3 className="ogt-h3">We watch for a slot</h3><p>When an appointment opens in your window, we secure it and send you the confirmation.</p></li>
            <li><h3 className="ogt-h3">You go once</h3><p>You attend with your file. If we cannot secure an appointment, the hunt is refunded.</p></li>
          </ol>
        </div>
      </section>

      <section className="ogt-section ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap ogt-split" style={{ alignItems: 'center' }}>
          <div data-reveal><SlotRadar /></div>
          <div data-reveal>
            <p className="ogt-eyebrow">Why it is hard alone</p>
            <h2 className="ogt-h2">Slots open without warning and are gone in minutes.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              Refreshing a booking page between meetings is not a plan. Watching it is our job.
            </p>
            <p style={{ marginTop: '2rem' }}><HotLink to="#start">Hunt my appointment</HotLink></p>
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Hunting alone, or with ScoutPass</h2>
          <div className="ogt-versus" style={{ marginTop: '2.25rem' }} data-reveal>
            <div>
              <h3 className="ogt-h3">On your own</h3>
              <ul>
                <li>You check the booking page whenever you remember to</li>
                <li>A slot opens while you are at work and is taken before you see it</li>
                <li>You plan flights around a date you do not have yet</li>
                <li>The hours you spend are gone whether or not you get a slot</li>
              </ul>
            </div>
            <div data-side="us">
              <h3 className="ogt-h3">With ScoutPass</h3>
              <ul>
                <li>We watch {SCOUTPASS.centers.join(', ')} for your city and your dates</li>
                <li>When a slot opens in your window, we secure it</li>
                <li>You get the confirmation by email, with a tracking number from day one</li>
                <li>{SCOUTPASS.price} {SCOUTPASS.unit}. {SCOUTPASS.refund}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Before you pay</h2>
          <div className="ogt-faq" style={{ marginTop: '2rem', maxWidth: '52rem' }} data-reveal>
            {HUNT_FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
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
      <StickyCta to="#start" label="Hunt my appointment" note={`${SCOUTPASS.price} ${SCOUTPASS.unit}. Refunded if no slot.`} />
    </SitePage>
  );
}
