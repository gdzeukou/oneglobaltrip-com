/**
 * The trip planner: build a route, see every border on it.
 *
 * The left side is the route itself, drawn as a line with a marker at each
 * border it crosses. The right side is what those borders ask for: which
 * visas, which consulate, and the dates the paperwork has to hit. All of it
 * is computed in `routePlan.ts` from published rules.
 */

import React, { useEffect, useId, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Minus, Plus, X } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import { globeDestinations } from '@/data/globeDestinations';
import { PASSPORT_COUNTRIES, SCHENGEN, findDestination } from '@/lib/travelResolve';
import { SCOUTPASS, priceOf } from '@/data/visaCatalog';
import { fromIso, loadRoute, saveRoute, toIso as iso } from '@/lib/routeStore';
import { addDays, bordersOf, calendarFor, routeText, type Border, type Calendar, type Stop } from '@/lib/routePlan';

const fmt = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
const nightsLabel = (n: number) => `${n} night${n === 1 ? '' : 's'}`;

const PLACES = Array.from(new Map(globeDestinations.map((d) => [`${d.name}, ${d.country}`, d])).entries())
  .sort((a, b) => a[1].tier - b[1].tier || a[0].localeCompare(b[0]));

const stop = (city: string, country: string, nights: number): Stop => ({ id: `${city}-${Math.random().toString(36).slice(2, 8)}`, city, country, nights });

const TONE = { visa: 'red', none: 'green', check: 'ink' } as const;
const NEED_LABEL = { visa: 'Visa required', none: 'No visa', check: 'We check it' } as const;

function CalendarBar({ calendar, departure }: { calendar: Calendar; departure: Date }) {
  const today = new Date();
  const start = Math.min(today.getTime(), calendar.opensOn.getTime());
  const span = departure.getTime() - start || 1;
  const at = (d: Date) => Math.max(0, Math.min(100, ((d.getTime() - start) / span) * 100));
  const [opens, safe, last, now] = [at(calendar.opensOn), at(calendar.safeBy), at(calendar.lastDay), at(today)];

  return (
    <div>
      <div className="ogt-cal" role="img" aria-label={`Applications open ${fmt(calendar.opensOn)}. Best to have the appointment before ${fmt(calendar.safeBy)}. Applications close ${fmt(calendar.lastDay)}. Departure ${fmt(departure)}.`}>
        <span className="ogt-cal-zone ogt-cal-good" style={{ left: `${opens}%`, width: `${safe - opens}%` }} />
        <span className="ogt-cal-zone ogt-cal-tight" style={{ left: `${safe}%`, width: `${last - safe}%` }} />
        <span className="ogt-cal-zone ogt-cal-closed" style={{ left: `${last}%`, width: `${100 - last}%` }} />
        <span className="ogt-cal-mark ogt-cal-today" data-side="top" data-edge={now < 12 ? 'start' : now > 88 ? 'end' : undefined} style={{ left: `${now}%` }}><span>Today</span></span>
        <span className="ogt-cal-mark" data-side="bottom" data-edge="end" style={{ left: '100%' }}><span>Departure, {fmt(departure)}</span></span>
      </div>
      <ul className="ogt-feelist">
        <li><i className="ogt-cal-good" aria-hidden="true" /><span>Good time to have the appointment</span><b>{fmt(calendar.opensOn)} to {fmt(calendar.safeBy)}</b></li>
        <li><i className="ogt-cal-tight" aria-hidden="true" /><span>Possible, with little margin</span><b>until {fmt(calendar.lastDay)}</b></li>
        <li><i className="ogt-cal-closed" aria-hidden="true" /><span>Too late to apply</span><b>after {fmt(calendar.lastDay)}</b></li>
      </ul>
    </div>
  );
}

function CalendarBlock({ border, departure, onMove }: { border: Border; departure: Date; onMove: (d: Date) => void }) {
  const calendar = calendarFor(border, departure);
  if (!calendar || !border.service) return null;
  const headline = {
    'on-time': `Have the appointment before ${fmt(calendar.safeBy)}.`,
    tight: `Tight. The appointment has to happen before ${fmt(calendar.lastDay)}.`,
    late: `Too late for a departure on ${fmt(departure)}.`,
    early: `Nothing to file yet. Applications open on ${fmt(calendar.opensOn)}.`,
  }[calendar.timing];

  return (
    <div className="ogt-report-block">
      <h3 className="ogt-h3">{border.service.name}: the calendar</h3>
      <p style={{ margin: '0.5rem 0 0', fontWeight: 650, color: calendar.timing === 'late' || calendar.timing === 'tight' ? 'var(--red)' : 'var(--green)' }}>{headline}</p>
      {calendar.earliestDeparture && (
        <p style={{ margin: '0.6rem 0 0' }}>
          <button type="button" className="ogt-btn ogt-btn-ghost ogt-btn-small" onClick={() => onMove(calendar.earliestDeparture!)}>
            Move departure to {fmt(calendar.earliestDeparture)}
          </button>
        </p>
      )}
      <CalendarBar calendar={calendar} departure={departure} />
      <p className="ogt-small ogt-muted" style={{ margin: '0.9rem 0 0' }}>{calendar.window.rule}</p>
    </div>
  );
}

export default function Plan() {
  const id = useId();
  const [params] = useSearchParams();
  const saved = useMemo(() => loadRoute(), []);
  const [passport, setPassport] = useState(() => {
    const p = params.get('passport') ?? saved?.passport;
    return p && PASSPORT_COUNTRIES.includes(p) ? p : 'Cameroon';
  });
  const [departure, setDeparture] = useState(() => {
    const d = saved ? fromIso(saved.departure) : null;
    return d && d.getTime() > Date.now() ? d : addDays(new Date(), 75);
  });
  const [travelers, setTravelers] = useState(saved?.travelers ?? 1);
  const [stops, setStops] = useState<Stop[]>(() => saved?.stops ?? [stop('Paris', 'France', 4), stop('Rome', 'Italy', 3), stop('London', 'United Kingdom', 3)]);

  useEffect(() => {
    saveRoute({ passport, departure: iso(departure), travelers, stops });
  }, [passport, departure, travelers, stops]);

  const [query, setQuery] = useState('');
  const [addError, setAddError] = useState('');

  const borders = useMemo(() => bordersOf(passport, stops), [passport, stops]);
  const totalNights = stops.reduce((n, s) => n + s.nights, 0);
  const back = addDays(departure, totalNights);
  const visas = borders.filter((b) => b.need === 'visa' && b.service);
  const schengen = borders.find((b) => b.zone === 'Schengen area');
  const first = visas[0] ?? borders.find((b) => b.need === 'check' && b.service);

  function addStop(e: React.FormEvent) {
    e.preventDefault();
    const exact = PLACES.find(([label]) => label.toLowerCase() === query.trim().toLowerCase())?.[1];
    const found = exact ?? findDestination(query);
    if (!found) {
      setAddError(query.trim() ? `We do not have "${query.trim()}" yet. Pick a city from the list.` : 'Type a city, then add it.');
      return;
    }
    setStops((s) => [...s, stop(found.name, found.country, 3)]);
    setQuery('');
    setAddError('');
  }

  const setNights = (stopId: string, delta: number) =>
    setStops((s) => s.map((x) => (x.id === stopId ? { ...x, nights: Math.max(1, Math.min(90, x.nights + delta)) } : x)));

  const zoneOf = (country: string) => (country === passport ? 'home' : SCHENGEN.has(country) ? 'Schengen area' : country);
  const startHref = first?.service
    ? `/start?visa=${first.service.slug}&passport=${encodeURIComponent(passport)}&date=${iso(departure)}&travelers=${travelers}&route=${encodeURIComponent(routeText(stops, departure))}`
    : '/start';

  return (
    <SitePage title="Plan a trip">
      <section className="ogt-hero" style={{ paddingBottom: '2rem' }}>
        <div className="ogt-wrap">
          <h1 className="ogt-h1" style={{ maxWidth: '52rem' }}>Plan the trip that clears the border.</h1>
          <p className="ogt-lede" style={{ marginTop: '1.5rem', maxWidth: '42rem' }}>
            Build your route. We read it the way a border officer would: which visas it needs, which consulate takes the
            file, and the dates the paperwork has to hit.
          </p>
          <div className="ogt-fields" style={{ marginTop: '2.25rem', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', maxWidth: '46rem' }}>
            <div className="ogt-field">
              <label htmlFor={`${id}-passport`}>Your passport</label>
              <select id={`${id}-passport`} className="ogt-select" value={passport} onChange={(e) => setPassport(e.target.value)}>
                {PASSPORT_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="ogt-field">
              <label htmlFor={`${id}-departure`}>Departure</label>
              <input id={`${id}-departure`} type="date" className="ogt-input" value={iso(departure)} min={iso(new Date())} onChange={(e) => e.target.value && setDeparture(fromIso(e.target.value))} />
            </div>
            <div className="ogt-field">
              <label htmlFor={`${id}-travelers`}>Travelers</label>
              <select id={`${id}-travelers`} className="ogt-select" value={travelers} onChange={(e) => setTravelers(Number(e.target.value))}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section-tight" style={{ paddingBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
        <div className="ogt-wrap ogt-split">
          <div>
            <h2 className="ogt-h2">Your route</h2>
            <ol className="ogt-rail" style={{ marginTop: '1.5rem' }}>
              <li>
                <div className="ogt-stop ogt-stop-end">
                  <div><span className="ogt-stop-city">Departure</span><br /><span className="ogt-small ogt-muted">{fmt(departure)}</span></div>
                </div>
              </li>
              {stops.map((s, i) => {
                const zone = zoneOf(s.country);
                const prevZone = i === 0 ? 'home' : zoneOf(stops[i - 1].country);
                const border = zone !== prevZone && zone !== 'home' ? borders.find((b) => b.zone === zone) : undefined;
                return (
                  <li key={s.id}>
                    {border && (
                      <div className="ogt-crossing" data-need={border.need}>
                        <span>Border: {border.zone}</span>
                        <span>{NEED_LABEL[border.need]}</span>
                      </div>
                    )}
                    <div className="ogt-stop">
                      <div>
                        <span className="ogt-stop-city">{s.city}</span><br />
                        <span className="ogt-small ogt-muted">{s.country}{zone === 'home' ? ', your own country' : ''}</span>
                      </div>
                      <div className="ogt-stop-tools">
                        <button type="button" className="ogt-step-btn" onClick={() => setNights(s.id, -1)} disabled={s.nights <= 1} aria-label={`One night less in ${s.city}`}><Minus size={16} /></button>
                        <span className="ogt-nights" aria-live="polite">{nightsLabel(s.nights)}</span>
                        <button type="button" className="ogt-step-btn" onClick={() => setNights(s.id, 1)} aria-label={`One night more in ${s.city}`}><Plus size={16} /></button>
                        <button type="button" className="ogt-step-btn" style={{ borderColor: 'transparent', background: 'transparent' }} onClick={() => setStops((all) => all.filter((x) => x.id !== s.id))} aria-label={`Remove ${s.city}`}><X size={18} /></button>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li>
                <div className="ogt-stop ogt-stop-end">
                  <div><span className="ogt-stop-city">Back home</span><br /><span className="ogt-small ogt-muted">{fmt(back)}, after {nightsLabel(totalNights)}</span></div>
                </div>
              </li>
            </ol>

            <form className="ogt-add" onSubmit={addStop}>
              <div>
                <label htmlFor={`${id}-add`} className="sr-only">Add a city</label>
                <input id={`${id}-add`} className="ogt-input" list={`${id}-places`} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Add a city: Lisbon, Dubai, Toronto..." autoComplete="off" />
                <datalist id={`${id}-places`}>{PLACES.map(([label]) => <option key={label} value={label} />)}</datalist>
              </div>
              <button type="submit" className="ogt-btn">Add stop</button>
            </form>
            {addError && <p className="ogt-alert" role="alert" style={{ marginTop: '0.75rem' }}>{addError}</p>}
          </div>

          <div className="ogt-panel ogt-report">
            <div className="ogt-report-block">
              <h2 className="ogt-h3" style={{ fontSize: '1.5rem' }}>What the borders ask for</h2>
              {borders.length === 0 && (
                <p className="ogt-muted" style={{ margin: '0.6rem 0 0' }}>
                  {stops.length === 0 ? 'Add a first stop and the borders on your route show up here.' : 'This route stays in your own country. No border to clear.'}
                </p>
              )}
              {borders.map((b) => (
                <div key={b.zone} style={{ marginTop: '1.25rem' }}>
                  <p style={{ margin: 0, display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                    <b style={{ color: 'var(--ink)', fontSize: '1.1rem' }}>{b.zone}</b>
                    <span className="ogt-tag" data-tone={TONE[b.need]}>{NEED_LABEL[b.need]}</span>
                    <span className="ogt-small ogt-muted">{nightsLabel(b.nights)}</span>
                  </p>
                  <p className="ogt-small ogt-muted" style={{ margin: '0.4rem 0 0' }}>{b.verdict.detail}</p>
                  {b.need === 'visa' && b.applyTo && (
                    <p style={{ margin: '0.6rem 0 0' }}>
                      <b>Apply to {b.applyTo.country}.</b> <span className="ogt-muted">{b.applyTo.reason}</span>
                    </p>
                  )}
                  {b.overstay && (
                    <p className="ogt-alert" style={{ marginTop: '0.6rem' }}>
                      {b.nights} nights is over the 90 a short-stay visa allows. This route needs a long-stay visa.
                    </p>
                  )}
                  {b.need !== 'none' && b.service && (
                    <p style={{ margin: '0.6rem 0 0' }}>
                      <Link to={`/visas/${b.service.slug}`} className="ogt-link">{b.service.name}</Link>
                      <span className="ogt-muted">, {priceOf(b.service.pricing).totalPrice} per person with fees{travelers > 1 ? `, ${travelers} travelers` : ''}</span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {visas.map((b) => <CalendarBlock key={b.zone} border={b} departure={departure} onMove={setDeparture} />)}

            {schengen?.need === 'visa' && (
              <div className="ogt-report-block">
                <h3 className="ogt-h3">What this route puts in your visa file</h3>
                <ul className="ogt-checks" style={{ marginTop: '0.9rem' }}>
                  <li>Travel insurance from {fmt(departure)} to {fmt(back)}, covering at least €30,000</li>
                  <li>Proof of accommodation for {nightsLabel(schengen.nights)} in {schengen.countries.join(', ')}</li>
                  <li>A flight itinerary that enters and leaves on these dates</li>
                </ul>
              </div>
            )}

            <div className="ogt-report-block">
              {first?.service ? (
                <>
                  <Link to="/file" className="ogt-btn" style={{ width: '100%' }}>Build my visa file from this route</Link>
                  <p className="ogt-small ogt-muted" style={{ margin: '0.7rem 0 1rem' }}>
                    A cover letter, a day-by-day plan and the answers for the application form, written from this route.
                  </p>
                  <Link to={startHref} className="ogt-btn ogt-btn-ghost" style={{ width: '100%' }}>Send this route with my visa request</Link>
                  <p className="ogt-small ogt-muted" style={{ margin: '0.7rem 0 0' }}>
                    No payment to send it. The appointment alone is {SCOUTPASS.price} {SCOUTPASS.unit}.
                  </p>
                </>
              ) : (
                <p className="ogt-muted" style={{ margin: 0 }}>No visa to file for this route.</p>
              )}
              <p style={{ margin: '1rem 0 0' }}><Link to="/globe" className="ogt-link">See these places on the globe</Link></p>
            </div>
          </div>
        </div>
      </section>
    </SitePage>
  );
}
