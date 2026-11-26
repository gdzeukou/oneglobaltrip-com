import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import GlobeHero from '@/components/site/GlobeHero';
import FeeBreakdown from '@/components/site/FeeBreakdown';
import SlotRadar from '@/components/site/SlotRadar';
import { HotLink, StickyCta, Ticker } from '@/components/site/fx';
import type { VisaCheckValue } from '@/components/site/VisaCheck';
import { LONG_STAY, SCOUTPASS, SHORT_STAY, VISA_SERVICES, priceOf } from '@/data/visaCatalog';
import { originFor, visaVerdict } from '@/lib/travelResolve';

export const FAQ: [string, string][] = [
  ['Do you guarantee a visa?', 'No. No agency can guarantee a consulate decision. We guarantee the work: a complete file, the appointment hunt, and a refund of the hunt if no appointment can be secured.'],
  ['What does the appointment hunt cover?', `Finding and securing your appointment at the visa center, at ${SCOUTPASS.price} ${SCOUTPASS.unit}. Fees charged by the consulate or the center are separate when you take the hunt alone.`],
  ['Which countries do you cover?', 'All 29 Schengen countries, the United Kingdom, Canada, the UAE, India, Brazil and Nigeria for short stays, and long-stay visas for seven European countries.'],
  ['Where can I apply from?', 'We secure appointments in US cities. If you apply from somewhere else, say where in your request and we will tell you whether we can help.'],
  ['When do I pay?', 'After we have confirmed the visa you need, the document list and the price. Sending a request costs nothing.'],
];


/** Passports that meet the most visa desks. Picking one redraws the globe. */
const PASSPORTS = ['Nigeria', 'India', 'Cameroon', 'Ghana', 'Kenya', 'Philippines', 'Pakistan', 'Egypt', 'Morocco', 'Senegal', 'China', 'Vietnam', 'South Africa', 'Turkey'];

/** Routes for the ticker. The verdict on each is computed, never typed in. */
const ROUTES: [string, string][] = [
  ['Nigeria', 'France'], ['India', 'United Kingdom'], ['Cameroon', 'Germany'], ['United States', 'Italy'],
  ['Ghana', 'Spain'], ['Philippines', 'Netherlands'], ['Kenya', 'United Kingdom'], ['Brazil', 'Portugal'],
  ['Pakistan', 'Switzerland'], ['Egypt', 'Greece'], ['Morocco', 'France'], ['Canada', 'United Kingdom'],
];

function routeLine([passport, destination]: [string, string]) {
  const verdict = visaVerdict(destination, passport);
  const to = originFor(destination);
  return (
    <>
      {originFor(passport).label} <span aria-hidden="true">→</span> {to.country === destination ? to.label : destination}
      <b data-tone={verdict.hunt ? 'red' : 'green'}>{verdict.hunt ? 'Visa first' : 'No visa'}</b>
    </>
  );
}

export default function Home() {
  const schengen = priceOf('schengenShortStay');
  const longStay = priceOf(LONG_STAY[0].pricing);
  const [check, setCheck] = useState<VisaCheckValue>({ passport: 'Cameroon', destination: 'France' });

  const pickPassport = (passport: string) => {
    setCheck((c) => ({ ...c, passport }));
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <SitePage title="Visas, appointments and global mobility" tone="night">
      <GlobeHero value={check} onChange={setCheck}>
        <p className="ogt-eyebrow">Global mobility, done for you</p>
        <h1 className="ogt-h1">Borders are paperwork. <em>We do the paperwork.</em></h1>
        <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
          Pick your passport and where you are going. The globe shows every border in your way. We prepare the file
          and hunt the appointment.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.75rem' }}>
          <HotLink to="/start" className="ogt-btn-big">Start my visa</HotLink>
          <Link to="/scoutpass" className="ogt-btn ogt-btn-glass ogt-btn-big">Appointment only, {SCOUTPASS.price}</Link>
        </div>
      </GlobeHero>

      <Ticker label="Sample routes and whether they need a visa" items={ROUTES.map(routeLine)} />

      <section className="ogt-section-tight ogt-band-sheet">
        <div className="ogt-wrap">
          <ul className="ogt-figures" data-reveal data-reveal-group>
            <li><b>29</b><span>Schengen countries on one visa</span></li>
            <li><b>{VISA_SERVICES.length}</b><span>visas we file, short stay and long stay</span></li>
            <li><b>{SCOUTPASS.price}</b><span>for the appointment hunt, {SCOUTPASS.unit}</span></li>
            <li><b>100%</b><span>of the hunt refunded if we find no slot</span></li>
          </ul>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>What we do</p>
          <h2 className="ogt-h2" style={{ maxWidth: '44rem' }} data-reveal>One desk for every way of crossing a border.</h2>
          <ul className="ogt-cards ogt-cards-3" style={{ marginTop: '2.5rem' }} data-reveal data-reveal-group>
            <li>
              <Link to="/start" className="ogt-card ogt-card-feature">
                <p className="ogt-card-tag">Most chosen</p>
                <h3 className="ogt-h3">Full visa service</h3>
                <p>The forms, a review of every document, the appointment, and the consulate and center fees, in one price.</p>
                <div className="ogt-card-foot"><span>From {schengen.totalPrice}</span><span>Start <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></div>
              </Link>
            </li>
            <li>
              <Link to="/scoutpass" className="ogt-card">
                <p className="ogt-card-tag">ScoutPass</p>
                <h3 className="ogt-h3">Appointment hunt</h3>
                <p>Your file is ready and the calendar is full. We watch {SCOUTPASS.centers.join(', ')} and secure the slot.</p>
                <div className="ogt-card-foot"><span>{SCOUTPASS.price} {SCOUTPASS.unit}</span><span>Hunt <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></div>
              </Link>
            </li>
            <li>
              <Link to="/visas#long-stay" className="ogt-card">
                <p className="ogt-card-tag">Relocation</p>
                <h3 className="ogt-h3">Long-stay visas</h3>
                <p>Work, study, family or retirement in {LONG_STAY.length} European countries, for more than 90 days.</p>
                <div className="ogt-card-foot"><span>From {longStay.totalPrice}</span><span>See <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></div>
              </Link>
            </li>
            <li>
              <Link to="/contact?topic=refusal" className="ogt-card">
                <p className="ogt-card-tag">On request</p>
                <h3 className="ogt-h3">After a refusal</h3>
                <p>Send us the refusal letter. We read what the consulate objected to and rebuild the file around it before you apply again.</p>
                <div className="ogt-card-foot"><span>Quoted before you pay</span><span>Ask <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></div>
              </Link>
            </li>
            <li>
              <Link to="/contact?topic=family" className="ogt-card">
                <p className="ogt-card-tag">On request</p>
                <h3 className="ogt-h3">Families and groups</h3>
                <p>One contact for every traveler, files that match each other, and appointments hunted for the same day.</p>
                <div className="ogt-card-foot"><span>Quoted before you pay</span><span>Ask <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></div>
              </Link>
            </li>
            <li>
              <Link to="/contact?topic=business" className="ogt-card">
                <p className="ogt-card-tag">On request</p>
                <h3 className="ogt-h3">Teams and employers</h3>
                <p>Staff who travel on passports that need visas. We keep the calendar of who needs what, and when to file.</p>
                <div className="ogt-card-foot"><span>Quoted before you pay</span><span>Ask <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></div>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap ogt-split" style={{ alignItems: 'center' }}>
          <div data-reveal>
            <p className="ogt-eyebrow">ScoutPass</p>
            <h2 className="ogt-h2">The appointment is the hard part. We hunt it.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              Slots at visa centers open without warning and fill fast. We watch for one in your city and secure it for you.
            </p>
            <ul className="ogt-checks" style={{ marginTop: '1.75rem', maxWidth: '34rem' }}>
              <li>Appointments at {SCOUTPASS.centers.join(', ')} across US cities</li>
              <li>You keep your own file, or we prepare it with the full service</li>
              <li>{SCOUTPASS.refund}</li>
            </ul>
            <p style={{ margin: '2rem 0 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem 1.5rem' }}>
              <span><span className="ogt-price" style={{ fontSize: '3.25rem', color: '#fff' }}>{SCOUTPASS.price}</span>{' '}<span className="ogt-muted">{SCOUTPASS.unit}</span></span>
              <HotLink to="/start?service=appointment">Hunt my appointment</HotLink>
              <Link to="/scoutpass" className="ogt-btn ogt-btn-glass">How it works</Link>
            </p>
            <p className="ogt-small ogt-muted" style={{ margin: '1rem 0 0' }}>Consulate and center fees are not part of this price.</p>
          </div>
          <div data-reveal><SlotRadar /></div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>How it runs</p>
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }} data-reveal>From the first question to the border.</h2>
          <ol className="ogt-route" style={{ marginTop: '2.5rem' }} data-reveal data-reveal-group>
            <li><h3 className="ogt-h3">Check</h3><p>Tell us your passport, your destination and your dates. We confirm which visa you need, or that you need none.</p></li>
            <li><h3 className="ogt-h3">File</h3><p>You get the exact document list. We complete the forms with you and review every document before it is submitted.</p></li>
            <li><h3 className="ogt-h3">Appointment</h3><p>We hunt the slot at the visa center and book it. You go once, with a file that is ready.</p></li>
            <li><h3 className="ogt-h3">Travel</h3><p>We track the application until the passport is back, then help you plan the trip itself.</p></li>
          </ol>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>Your passport, your map</p>
          <h2 className="ogt-h2" style={{ maxWidth: '46rem' }} data-reveal>Some passports get asked for more. Those are the ones we work for.</h2>
          <p className="ogt-lede" style={{ marginTop: '1.25rem' }} data-reveal>
            Pick yours. The globe redraws the world as your passport sees it: red where a visa comes first.
          </p>
          <ul className="ogt-chips" style={{ marginTop: '2rem' }} data-reveal>
            {PASSPORTS.map((p) => (
              <li key={p}>
                <button type="button" className="ogt-chip" aria-pressed={check.passport === p} onClick={() => pickPassport(p)}>
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap ogt-split ogt-split-wide-left">
          <div data-reveal>
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
                  <span className="ogt-row-price">{longStay.totalPrice}</span>
                </Link>
              </li>
            </ul>
          </div>
          <div data-reveal>
            <h3 className="ogt-h3">What a Schengen visa costs, line by line</h3>
            <p className="ogt-muted" style={{ margin: '0.6rem 0 1.25rem' }}>You see what goes to the consulate, what goes to the visa center, and what goes to us.</p>
            <FeeBreakdown price={schengen} />
            <p style={{ marginTop: '1.5rem' }}><Link to="/pricing" className="ogt-link">See every price</Link></p>
          </div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div data-reveal>
            <h2 className="ogt-h2">Visa sorted. Now the trip.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              Build the route and see every border on it: which visas it needs, which consulate takes the file and the
              dates the paperwork has to hit.
            </p>
          </div>
          <ul className="ogt-rows" data-reveal>
            <li><Link to="/plan" className="ogt-row"><span className="ogt-row-name">Route planner</span><span className="ogt-row-meta">Every border on your route, with the dates to hit</span></Link></li>
            <li><Link to="/globe" className="ogt-row"><span className="ogt-row-name">The globe</span><span className="ogt-row-meta">Spin it, pick a city, ask the AI planner</span></Link></li>
            <li><Link to="/packages" className="ogt-row"><span className="ogt-row-name">Packages</span><span className="ogt-row-meta">Ready-made trips you can change</span></Link></li>
            <li><Link to="/trips" className="ogt-row"><span className="ogt-row-name">My trip</span><span className="ogt-row-meta">Everything you have added, with one total</span></Link></li>
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Questions people ask first</h2>
          <div className="ogt-faq" style={{ marginTop: '2rem', maxWidth: '52rem' }} data-reveal>
            {FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="ogt-night ogt-finale">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap" data-reveal>
          <p className="ogt-eyebrow">Two minutes to start</p>
          <h2 className="ogt-h1">Tell us where. <em>We clear the way.</em></h2>
          <p className="ogt-lede">Sending a request costs nothing. You see the visa, the document list and the price before you pay.</p>
          <div className="ogt-finale-actions">
            <HotLink to="/start" className="ogt-btn-big">Start my visa</HotLink>
            <Link to="/pricing" className="ogt-btn ogt-btn-glass ogt-btn-big">See every price</Link>
          </div>
        </div>
      </section>

      <StickyCta to="/start" label="Start my visa" note="Free to ask. Pay after the quote." />
    </SitePage>
  );
}
