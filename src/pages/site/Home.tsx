import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import GlobeHero from '@/components/site/GlobeHero';
import TripBar, { emptyTrip, tripUrl, type TripQuery } from '@/components/site/TripBar';
import TravelDeck from '@/components/site/TravelDeck';
import VisaCheck from '@/components/site/VisaCheck';
import { HotLink, StickyCta, Ticker } from '@/components/site/fx';
import { globeDestinations } from '@/data/globeDestinations';
import { SCOUTPASS } from '@/data/visaCatalog';
import { coarseFix } from '@/lib/geolocate';
import { placeLabel, resolvePlace } from '@/lib/places.trip';
import { nearestCity } from '@/lib/travelResolve';

export const FAQ: [string, string][] = [
  ['What can I book here?', 'The whole trip: flights, stays, rental cars, activities, cruises and ready-made packages. Everything goes into one trip with one total.'],
  ['Where can I travel from, and to?', 'From anywhere to anywhere. Tell us the city you leave from and where you want to go.'],
  ['When do I pay?', 'After a person has confirmed the prices and what is included. Sending a trip costs nothing.'],
  ['What if my trip needs a visa?', `We handle that too. We prepare the file, or hunt the appointment alone for ${SCOUTPASS.price} ${SCOUTPASS.unit}. If your passport needs nothing, you never hear about it.`],
  ['Do you guarantee a visa?', 'No. No company can guarantee a consulate decision. We guarantee the work: a complete file, the appointment hunt, and a refund of the hunt if no appointment can be secured.'],
  ['Can I talk to a person?', 'Yes. Every trip is confirmed by a person before you pay, and you can write to us at any step.'],
];

/** Places shown as ideas. All are cities the globe knows, in several regions. */
const IDEAS = ['Paris', 'Tokyo', 'Dubai', 'New York', 'Cape Town', 'Rio de Janeiro', 'Bali', 'Rome', 'Bangkok', 'Marrakech', 'Sydney', 'Istanbul'];

export default function Home() {
  const [trip, setTrip] = useState<TripQuery>(emptyTrip);
  const touched = useRef(false);
  const change = (next: TripQuery) => {
    touched.current = true;
    setTrip(next);
  };

  // Open on the visitor's own city, from the coarse location the edge already
  // has. No prompt. If they typed something first, leave it alone.
  useEffect(() => {
    let live = true;
    void coarseFix().then((fix) => {
      const city = fix ? nearestCity(fix) : null;
      if (!live || touched.current || !city) return;
      setTrip((t) => (t.from ? t : { ...t, from: placeLabel(city) }));
    });
    return () => {
      live = false;
    };
  }, []);

  const from = useMemo(() => resolvePlace(trip.from), [trip.from]);
  const to = useMemo(() => resolvePlace(trip.to), [trip.to]);

  const ideas = useMemo(
    () => IDEAS.map((name) => globeDestinations.find((d) => d.name === name)).filter((d): d is NonNullable<typeof d> => !!d).slice(0, 8),
    [],
  );
  const pick = (label: string) => {
    touched.current = true;
    setTrip((t) => ({ ...t, to: label }));
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return (
    <SitePage title="Flights, stays, cars, activities and cruises, from anywhere to anywhere" tone="night">
      <GlobeHero from={from} to={to}>
        <p className="ogt-eyebrow">One trip. Everything in it.</p>
        <h1 className="ogt-h1">Where to next? <em>We take you there.</em></h1>
        <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
          Tell us where you are and where you want to go. Flights, stays, cars, activities and cruises, put together
          into one trip and confirmed by a person.
        </p>
        <div className="ogt-globehero-check">
          <TripBar value={trip} onChange={change} />
        </div>
        <p className="ogt-small ogt-hero-aside">
          Need a visa for it? <Link to="/visas">We handle that too.</Link>
        </p>
      </GlobeHero>

      <Ticker
        label="Places you can go"
        items={globeDestinations.filter((d) => d.tier === 1).map((d) => <>{d.name} <b>{d.country}</b></>)}
      />

      <section className="ogt-section-tight ogt-night ogt-deck-band">
        <div className="ogt-wrap">
          <h2 className="sr-only">Everything for the trip</h2>
          <TravelDeck />
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>How we take you there</p>
          <h2 className="ogt-h2" style={{ maxWidth: '42rem' }} data-reveal>You say where. We do the rest.</h2>
          <ol className="ogt-route" style={{ marginTop: '2.5rem' }} data-reveal data-reveal-group>
            <li><h3 className="ogt-h3">Tell us the trip</h3><p>Where you are, where you want to go, when, and who is coming. One sentence is enough.</p></li>
            <li><h3 className="ogt-h3">Pick what you like</h3><p>Flights, a place to sleep, a car, things to do. Add them to one trip and watch the total.</p></li>
            <li><h3 className="ogt-h3">A person confirms it</h3><p>We check every price and what is included, and clear the border if your passport needs it.</p></li>
            <li><h3 className="ogt-h3">You pay, and go</h3><p>One total, after you have seen it. We stay with you until you are home.</p></li>
          </ol>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>Need an idea?</p>
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }} data-reveal>Pick a place. The globe turns to it.</h2>
          <ul className="ogt-cards ogt-cards-4" style={{ marginTop: '2.25rem' }} data-reveal data-reveal-group>
            {ideas.map((d) => (
              <li key={d.id}>
                <button type="button" className="ogt-card ogt-idea" onClick={() => pick(placeLabel(d))}>
                  <span className="ogt-card-tag">{d.region.split('/')[0].trim()}</span>
                  <span className="ogt-h3">{d.name}</span>
                  <span className="ogt-idea-line">{d.description}</span>
                  <span className="ogt-card-foot"><span>{d.country}</span><span>Go <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span></span>
                </button>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link to="/packages" className="ogt-btn ogt-btn-shine">See ready-made trips</Link>
            <Link to="/globe" className="ogt-btn ogt-btn-ghost">Explore the globe</Link>
          </p>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div data-reveal>
            <p className="ogt-eyebrow">Not sure yet?</p>
            <h2 className="ogt-h2">Say it in one sentence. We draft the trip.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              "Ten days in Japan in April, two of us, food and temples." That is enough to start. We come back with a
              route, prices and a total.
            </p>
            <p style={{ marginTop: '1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <HotLink to="/startmytrip">Start my trip</HotLink>
              <Link to="/contact?topic=trip" className="ogt-btn ogt-btn-ghost">Ask a person</Link>
            </p>
          </div>
          <ul className="ogt-rows" data-reveal>
            <li><Link to="/flights" className="ogt-row"><span className="ogt-row-name">Flights</span><span className="ogt-row-meta">From your own airport, to anywhere</span></Link></li>
            <li><Link to="/stays" className="ogt-row"><span className="ogt-row-name">Stays</span><span className="ogt-row-meta">Hotels for short trips, apartments for long ones</span></Link></li>
            <li><Link to="/cars" className="ogt-row"><span className="ogt-row-name">Cars</span><span className="ogt-row-meta">Pick up where you land</span></Link></li>
            <li><Link to="/activities" className="ogt-row"><span className="ogt-row-name">Activities</span><span className="ogt-row-meta">Tours and day trips, in any country</span></Link></li>
            <li><Link to="/cruises" className="ogt-row"><span className="ogt-row-name">Cruises</span><span className="ogt-row-meta">Sea days and river days</span></Link></li>
            <li><Link to="/plan" className="ogt-row"><span className="ogt-row-name">Route planner</span><span className="ogt-row-meta">Several countries in one trip</span></Link></li>
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap ogt-split" style={{ alignItems: 'center' }}>
          <div data-reveal>
            <p className="ogt-eyebrow">And if there is a border in the way</p>
            <h2 className="ogt-h2">Need a visa? That is our other job.</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              Most travel sites stop at the booking. We also prepare visa files and hunt consulate appointments, so the
              trip you booked is a trip you can take.
            </p>
            <ul className="ogt-checks" style={{ marginTop: '1.75rem', maxWidth: '34rem' }}>
              <li>Check your passport against your destination, free</li>
              <li>Full visa service with every fee shown</li>
              <li>Appointment hunt alone, {SCOUTPASS.price} {SCOUTPASS.unit}, refunded if we find no slot</li>
            </ul>
            <p style={{ margin: '2rem 0 0', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <Link to="/visas" className="ogt-btn ogt-btn-paper">See the visas</Link>
              <Link to="/scoutpass" className="ogt-btn ogt-btn-glass">The appointment hunt</Link>
            </p>
          </div>
          <div data-reveal>
            <VisaCheck initialPassport={from?.country ?? 'Cameroon'} initialDestination="France" key={from?.country ?? 'default'} footnote={false} />
          </div>
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
          <h2 className="ogt-h1">Tell us where. <em>We take you there.</em></h2>
          <p className="ogt-lede">Sending a trip costs nothing. You see every price before you pay.</p>
          <div className="ogt-finale-actions">
            <HotLink to="/startmytrip" className="ogt-btn-big">Start my trip</HotLink>
            <Link to={trip.to ? tripUrl(trip) : '/flights'} className="ogt-btn ogt-btn-glass ogt-btn-big">{trip.to ? 'See my trip board' : 'Find a flight'}</Link>
          </div>
        </div>
      </section>

      <StickyCta to="/startmytrip" label="Start my trip" note="Free to send. Pay after the quote." />
    </SitePage>
  );
}
