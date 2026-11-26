import React from 'react';
import { Link } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import TravelDeck from '@/components/site/TravelDeck';
import { HotLink } from '@/components/site/fx';
import { SCOUTPASS, VISA_SERVICES } from '@/data/visaCatalog';

export default function About() {
  return (
    <SitePage title="About" tone="night">
      <section className="ogt-hero ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">About One Global Trip</p>
          <h1 className="ogt-h1" style={{ maxWidth: '58rem' }}>Where you were born should not decide <em>how far you can go.</em></h1>
          <p className="ogt-lede" style={{ marginTop: '1.5rem', maxWidth: '44rem' }}>
            One Global Trip is a mobility company. We clear the border, then we book the trip: the visa, the
            appointment, the flight, the stay and the car, for any passport and any destination.
          </p>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div data-reveal>
            <p className="ogt-eyebrow">Why we exist</p>
            <h2 className="ogt-h2">A trip is one thing. It is sold in six pieces.</h2>
          </div>
          <div data-reveal>
            <p style={{ margin: 0, fontSize: '1.15rem' }}>
              You plan in one place, book flights in another and beds in a third. Then the visa stops everything, on a
              government site that has no slots for months. For a lot of passports, that last step is the whole trip.
            </p>
            <p style={{ margin: '1.1rem 0 0' }} className="ogt-muted">
              We put it back together. You describe the trip in your own words, add what you want to book, and a person
              confirms the live prices and the paperwork before you pay. One trip, one total.
            </p>
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>What we do</p>
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }} data-reveal>Eight doors, one trip.</h2>
          <div style={{ marginTop: '2.25rem' }}><TravelDeck /></div>
          <ul className="ogt-figures" style={{ marginTop: '3.5rem' }} data-reveal data-reveal-group>
            <li><b>{VISA_SERVICES.length}</b><span>visas we file, short stay and long stay</span></li>
            <li><b>29</b><span>Schengen countries on one visa</span></li>
            <li><b>{SCOUTPASS.price}</b><span>for the appointment hunt, {SCOUTPASS.unit}</span></li>
            <li><b>100%</b><span>of the hunt refunded if we find no slot</span></li>
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>How we work</p>
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }} data-reveal>Four rules we do not bend.</h2>
          <ol className="ogt-steps ogt-steps-4" style={{ marginTop: '2.5rem' }} data-reveal data-reveal-group>
            <li><h3 className="ogt-h3">Every fee shown</h3><p className="ogt-muted">You see what goes to the consulate, to the visa center and to us, before you send anything.</p></li>
            <li><h3 className="ogt-h3">No promised visa</h3><p className="ogt-muted">The consulate decides. We promise the work: a complete file and the appointment.</p></li>
            <li><h3 className="ogt-h3">Pay after the quote</h3><p className="ogt-muted">Asking is free. You pay once the visa, the documents and the price are confirmed.</p></li>
            <li><h3 className="ogt-h3">Refund if we fail</h3><p className="ogt-muted">If we cannot secure an appointment, the hunt is refunded in full.</p></li>
          </ol>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div data-reveal>
            <p className="ogt-eyebrow">ScoutPass</p>
            <h2 className="ogt-h2">The appointment hunt has its own name.</h2>
          </div>
          <div data-reveal>
            <p style={{ margin: 0 }}>
              ScoutPass is our product for one problem: visa center calendars that are always full. We watch{' '}
              {SCOUTPASS.centers.join(', ')} and secure the slot. It is one door of One Global Trip, not the whole house.
            </p>
            <p style={{ margin: '1.5rem 0 0' }}><Link to="/scoutpass" className="ogt-btn ogt-btn-shine">How the hunt works</Link></p>
            <p className="ogt-note" style={{ marginTop: '2rem' }}>
              One Global Trip LLC is a private company based in Houston, Texas. We are not a government agency and we do
              not decide visas.
            </p>
          </div>
        </div>
      </section>

      <section className="ogt-night ogt-finale">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap" data-reveal>
          <p className="ogt-eyebrow">Your turn</p>
          <h2 className="ogt-h1">Tell us where. <em>We clear the way.</em></h2>
          <div className="ogt-finale-actions">
            <HotLink to="/start" className="ogt-btn-big">Start my visa</HotLink>
            <Link to="/startmytrip" className="ogt-btn ogt-btn-glass ogt-btn-big">Start my trip</Link>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
