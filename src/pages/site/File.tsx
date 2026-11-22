/**
 * The visa file, written from the route.
 *
 * Three documents come out of the trip the traveler built in the planner:
 * a cover letter, a day-by-day plan, and the trip answers for the
 * application form. Everything is assembled in the browser from what the
 * traveler typed; nothing is sent anywhere until they choose to.
 */

import React, { useEffect, useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import { fromIso, loadRoute } from '@/lib/routeStore';
import { bordersOf, legsOf, schengenStays, type Border } from '@/lib/routePlan';

const long = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
const short = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

const the = (country: string) => (['United Kingdom', 'United States', 'UAE', 'Netherlands', 'Philippines'].includes(country) ? `the ${country}` : country);

const PURPOSES = ['Tourism', 'Visiting family or friends', 'Business'] as const;

interface Applicant {
  name: string;
  passportNumber: string;
  address: string;
  city: string;
  status: string;
  occupation: string;
  employer: string;
  purpose: (typeof PURPOSES)[number];
  payer: 'self' | 'sponsor';
  sponsor: string;
  stays: Record<string, string>;
}

const EMPTY: Applicant = {
  name: '', passportNumber: '', address: '', city: '', status: '', occupation: '', employer: '',
  purpose: 'Tourism', payer: 'self', sponsor: '', stays: {},
};

const DRAFT_KEY = 'ogt-file-draft';

/** A value the traveler has typed, or a highlighted gap that says what is missing. */
function V({ value, missing }: { value: string; missing: string }) {
  return value.trim() ? <>{value.trim()}</> : <span className="ogt-blank">[{missing}]</span>;
}

function purposeSentence(p: Applicant['purpose']) {
  return { Tourism: 'tourism', 'Visiting family or friends': 'to visit family or friends', Business: 'business' }[p];
}

export default function VisaFile() {
  const id = useId();
  const route = useMemo(() => loadRoute(), []);
  const [a, setA] = useState<Applicant>(() => {
    try {
      return { ...EMPTY, ...(JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? '{}') as Partial<Applicant>) };
    } catch {
      return EMPTY;
    }
  });

  // The draft lives in this tab only, and is gone when the tab closes.
  useEffect(() => {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(a)); } catch { /* not remembered */ }
  }, [a]);

  const set = (k: keyof Applicant) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setA((x) => ({ ...x, [k]: e.target.value }));

  if (!route || route.stops.length === 0) {
    return (
      <SitePage title="My visa file">
        <section className="ogt-hero">
          <div className="ogt-wrap">
            <h1 className="ogt-h1">Build the route first.</h1>
            <p className="ogt-lede" style={{ margin: '1.5rem 0 2rem' }}>The file is written from your trip: the cities, the nights and the dates. Add them in the planner and come back.</p>
            <Link to="/plan" className="ogt-btn">Open the planner</Link>
          </div>
        </section>
      </SitePage>
    );
  }

  const departure = fromIso(route.departure);
  const legs = legsOf(route.stops, departure);
  const back = legs[legs.length - 1].leave;
  const borders = bordersOf(route.passport, route.stops).filter((b) => b.need === 'visa');
  const schengen = borders.find((b) => b.zone === 'Schengen area');
  const stays = schengenStays(route.stops, departure);
  const schengenDays = stays.reduce((n, s) => n + s.days, 0);
  const today = new Date();

  const recipient = (b: Border) => (b.zone === 'Schengen area' ? `Consulate General of ${b.applyTo?.country}, Visa Section` : b.zone === 'United Kingdom' ? 'UK Visas and Immigration' : `Consulate of ${b.zone}, Visa Section`);
  const visaName = (b: Border) => (b.zone === 'Schengen area' ? 'Schengen short-stay visa' : b.zone === 'United Kingdom' ? 'UK Standard Visitor visa' : `visitor visa for ${b.zone}`);
  const datesIn = (b: Border) => {
    const inside = legs.filter((l) => b.countries.includes(l.stop.country));
    return { from: inside[0].arrive, to: inside[inside.length - 1].leave };
  };

  return (
    <SitePage title="My visa file">
      <section className="ogt-hero ogt-no-print" style={{ paddingBottom: '2rem' }}>
        <div className="ogt-wrap">
          <h1 className="ogt-h1" style={{ maxWidth: '50rem' }}>Your visa file, written from your route.</h1>
          <p className="ogt-lede" style={{ marginTop: '1.5rem', maxWidth: '42rem' }}>
            {list(route.stops.map((s) => s.city))}, {long(departure)} to {long(back)}. Fill in what only you know and the
            documents update as you type. <Link to="/plan" className="ogt-link">Change the route</Link>
          </p>
        </div>
      </section>

      <section className="ogt-section-tight" style={{ paddingBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
        <div className="ogt-wrap ogt-split ogt-split-wide-right ogt-print-root">
          <div className="ogt-no-print">
            <div className="ogt-panel">
              <h2 className="ogt-h3">About you</h2>
              <div className="ogt-fields" style={{ marginTop: '1rem' }}>
                <div className="ogt-field"><label htmlFor={`${id}-name`}>Full name, as on the passport</label><input id={`${id}-name`} className="ogt-input" value={a.name} onChange={set('name')} autoComplete="name" /></div>
                <div className="ogt-field"><label htmlFor={`${id}-pn`}>Passport number</label><input id={`${id}-pn`} className="ogt-input" value={a.passportNumber} onChange={set('passportNumber')} autoComplete="off" /></div>
                <div className="ogt-field"><label htmlFor={`${id}-addr`}>Street address</label><input id={`${id}-addr`} className="ogt-input" value={a.address} onChange={set('address')} autoComplete="street-address" /></div>
                <div className="ogt-field"><label htmlFor={`${id}-city`}>City, state and ZIP</label><input id={`${id}-city`} className="ogt-input" value={a.city} onChange={set('city')} placeholder="Houston, TX 77002" /></div>
                <div className="ogt-field"><label htmlFor={`${id}-status`}>Your status where you live</label><input id={`${id}-status`} className="ogt-input" value={a.status} onChange={set('status')} placeholder="a lawful permanent resident of the United States" /></div>
                <div className="ogt-field"><label htmlFor={`${id}-occ`}>Occupation</label><input id={`${id}-occ`} className="ogt-input" value={a.occupation} onChange={set('occupation')} placeholder="a registered nurse" /></div>
                <div className="ogt-field"><label htmlFor={`${id}-emp`}>Employer or school</label><input id={`${id}-emp`} className="ogt-input" value={a.employer} onChange={set('employer')} /></div>
              </div>

              <h2 className="ogt-h3" style={{ marginTop: '2rem' }}>About the trip</h2>
              <div className="ogt-fields" style={{ marginTop: '1rem' }}>
                <div className="ogt-field">
                  <label htmlFor={`${id}-purpose`}>Reason for the trip</label>
                  <select id={`${id}-purpose`} className="ogt-select" value={a.purpose} onChange={set('purpose')}>{PURPOSES.map((p) => <option key={p}>{p}</option>)}</select>
                </div>
                <div className="ogt-field">
                  <label htmlFor={`${id}-payer`}>Who pays for the trip</label>
                  <select id={`${id}-payer`} className="ogt-select" value={a.payer} onChange={set('payer')}>
                    <option value="self">I pay myself</option>
                    <option value="sponsor">Someone else pays</option>
                  </select>
                </div>
                {a.payer === 'sponsor' && (
                  <div className="ogt-field"><label htmlFor={`${id}-sponsor`}>Sponsor's name and relation to you</label><input id={`${id}-sponsor`} className="ogt-input" value={a.sponsor} onChange={set('sponsor')} placeholder="my sister, Grace Ndi" /></div>
                )}
                {legs.map((l) => (
                  <div className="ogt-field" key={l.stop.id}>
                    <label htmlFor={`${id}-stay-${l.stop.id}`}>Where you sleep in {l.stop.city}</label>
                    <input id={`${id}-stay-${l.stop.id}`} className="ogt-input" value={a.stays[l.stop.id] ?? ''} onChange={(e) => setA((x) => ({ ...x, stays: { ...x.stays, [l.stop.id]: e.target.value } }))} placeholder="Hotel name and address, or your host" />
                  </div>
                ))}
              </div>

              <button type="button" className="ogt-btn" style={{ width: '100%', marginTop: '1.75rem' }} onClick={() => window.print()}>Print or save as PDF</button>
              <p className="ogt-small ogt-muted" style={{ margin: '0.7rem 0 0' }}>
                What you type stays in this browser tab. It is not sent to us and is erased when you close the tab.
              </p>
            </div>
            <p className="ogt-note" style={{ marginTop: '1.5rem' }}>
              Write only what is true. Consulates check employers, bookings and bank statements, and a false statement is
              grounds for refusal. Highlighted gaps are things you still have to fill in.
            </p>
          </div>

          <div>
            {borders.length === 0 && (
              <div className="ogt-panel ogt-no-print">
                <h2 className="ogt-h3">No visa to file for this route</h2>
                <p style={{ margin: '0.6rem 0 0' }}>On a {route.passport} passport, we do not see a visa to apply for on this route. The day-by-day plan below is still useful at the border.</p>
              </div>
            )}

            {borders.map((b) => {
              const { from, to } = datesIn(b);
              const multi = b.zone === 'Schengen area' && stays.length > 1;
              return (
                <React.Fragment key={b.zone}>
                  <div className="ogt-sheet-title ogt-no-print">
                    <h2 className="ogt-h3">Cover letter, {b.zone}</h2>
                    <span className="ogt-small ogt-muted">Sign it by hand</span>
                  </div>
                  <article className="ogt-sheet">
                    <p><V value={a.name} missing="your full name" /><br /><V value={a.address} missing="street address" /><br /><V value={a.city} missing="city, state, ZIP" /></p>
                    <p>{long(today)}</p>
                    <p>{recipient(b)}</p>
                    <p><b>Subject: application for a {visaName(b)}, {long(from)} to {long(to)}</b></p>
                    <p>Dear Sir or Madam,</p>
                    <p>
                      I am a citizen of {route.passport}{a.status.trim() ? ` and ${a.status.trim()}` : ''}, holder of passport number <V value={a.passportNumber} missing="passport number" />.
                      I am applying for a {visaName(b)} to travel to {list(b.countries.map(the))} from {long(from)} to {long(to)} for {purposeSentence(a.purpose)}.
                    </p>
                    <p>
                      My route is {list(legs.map((l) => `${l.stop.city} (${l.stop.nights} night${l.stop.nights === 1 ? '' : 's'})`))}. I leave on {long(departure)} and return home on {long(back)}.
                      {b.zone === 'Schengen area' && b.applyTo && b.countries.length > 1 && ` I am applying to ${b.applyTo.country} because ${b.applyTo.reason.startsWith('You spend') ? 'it is where I spend the most nights' : 'it is the first Schengen country I enter and no country has more nights than the others'}.`}
                      {multi && ` My route leaves the Schengen area and enters it again, ${stays.length} entries in total, so I am asking for a multiple-entry visa.`}
                    </p>
                    <p>
                      I work as <V value={a.occupation} missing="occupation" /> at <V value={a.employer} missing="employer or school" />, and I will return to <V value={a.city.split(',')[0]} missing="your city" /> on {long(back)}.
                    </p>
                    <p>
                      {a.payer === 'self'
                        ? 'I am paying for this trip myself. My bank statements for the last three months are attached.'
                        : <>This trip is paid for by <V value={a.sponsor} missing="sponsor's name and relation" />. Their letter of support and bank statements are attached.</>}
                    </p>
                    <p>
                      {b.zone === 'Schengen area'
                        ? 'Attached to this letter: my passport, the completed application form, one photo, travel medical insurance, my flight itinerary, proof of accommodation for every night, my day-by-day plan, and proof of my employment and residence.'
                        : 'Attached to this letter: my passport, my day-by-day plan, proof of accommodation, and proof of my employment and residence.'}
                    </p>
                    <p>Thank you for considering my application.</p>
                    <p>Sincerely,</p>
                    <p style={{ marginTop: '3rem' }}><V value={a.name} missing="your full name" /></p>
                  </article>
                </React.Fragment>
              );
            })}

            <div className="ogt-sheet-title ogt-no-print" style={{ marginTop: borders.length ? '2.5rem' : 0 }}>
              <h2 className="ogt-h3">Day-by-day plan</h2>
              <span className="ogt-small ogt-muted">{legs.reduce((n, l) => n + l.stop.nights, 0)} nights</span>
            </div>
            <article className="ogt-sheet">
              <h3>Travel plan of <V value={a.name} missing="your full name" /></h3>
              <div className="ogt-sheet-scroll">
                <table>
                  <thead><tr><th>Dates</th><th>Place</th><th>Nights</th><th>Accommodation</th></tr></thead>
                  <tbody>
                    <tr><td>{short(departure)}</td><td colSpan={3}>Departure from <V value={a.city.split(',')[0]} missing="your city" />, arrival in {legs[0].stop.city}</td></tr>
                    {legs.map((l, i) => (
                      <React.Fragment key={l.stop.id}>
                        <tr>
                          <td>{short(l.arrive)} to {short(l.leave)}</td>
                          <td>{l.stop.city}, {l.stop.country}</td>
                          <td>{l.stop.nights}</td>
                          <td><V value={a.stays[l.stop.id] ?? ''} missing="hotel or host, with address" /></td>
                        </tr>
                        {legs[i + 1] && <tr><td>{short(l.leave)}</td><td colSpan={3}>Travel from {l.stop.city} to {legs[i + 1].stop.city}</td></tr>}
                      </React.Fragment>
                    ))}
                    <tr><td>{short(back)}</td><td colSpan={3}>Return from {legs[legs.length - 1].stop.city} to <V value={a.city.split(',')[0]} missing="your city" /></td></tr>
                  </tbody>
                </table>
              </div>
            </article>

            {schengen && schengen.applyTo && (
              <>
                <div className="ogt-sheet-title ogt-no-print" style={{ marginTop: '2.5rem' }}>
                  <h2 className="ogt-h3">Schengen application form, trip answers</h2>
                  <span className="ogt-small ogt-muted">Copy these onto the form</span>
                </div>
                <article className="ogt-sheet">
                  <h3>Answers for the trip section of the Schengen form</h3>
                  <div className="ogt-sheet-scroll">
                    <table>
                      <thead><tr><th>Question on the form</th><th>Your answer</th></tr></thead>
                      <tbody>
                        <tr><td>Purpose of the journey</td><td>{a.purpose}</td></tr>
                        <tr><td>Member State of main destination</td><td>{schengen.applyTo.country}</td></tr>
                        <tr><td>Other Member States of destination</td><td>{schengen.countries.filter((c) => c !== schengen.applyTo!.country).join(', ') || 'None'}</td></tr>
                        <tr><td>Member State of first entry</td><td>{stays[0].firstCountry}</td></tr>
                        <tr><td>Number of entries requested</td><td>{stays.length === 1 ? 'Single entry' : stays.length === 2 ? 'Two entries' : 'Multiple entries'}</td></tr>
                        <tr><td>Intended date of arrival in the Schengen area</td><td>{long(stays[0].entry)}</td></tr>
                        <tr><td>Intended date of departure from the Schengen area</td><td>{long(stays[stays.length - 1].exit)}</td></tr>
                        <tr><td>Days in the Schengen area</td><td>{schengenDays}{stays.length > 1 ? ` (${stays.map((s) => s.days).join(' + ')})` : ''}</td></tr>
                        <tr><td>Hotel or host in the Member States</td><td>{legs.filter((l) => schengen.countries.includes(l.stop.country)).map((l) => <div key={l.stop.id}>{l.stop.city}: <V value={a.stays[l.stop.id] ?? ''} missing="hotel or host" /></div>)}</td></tr>
                        <tr><td>Cost of travelling and living is covered by</td><td>{a.payer === 'self' ? 'The applicant' : <>A sponsor: <V value={a.sponsor} missing="sponsor" /></>}</td></tr>
                        <tr><td>Travel medical insurance must cover</td><td>{long(stays[0].entry)} to {long(stays[stays.length - 1].exit)}, at least €30,000</td></tr>
                      </tbody>
                    </table>
                  </div>
                </article>
              </>
            )}

            <div className="ogt-panel ogt-no-print" style={{ marginTop: '2.5rem' }}>
              <h2 className="ogt-h3">Want us to check it and get the appointment?</h2>
              <p style={{ margin: '0.6rem 0 1.25rem' }}>We review the file against the consulate's list and book the appointment at the visa center.</p>
              <Link to={`/start?visa=${borders[0]?.service?.slug ?? 'schengen'}&passport=${encodeURIComponent(route.passport)}&date=${route.departure}&travelers=${route.travelers}`} className="ogt-btn">Start my visa</Link>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
