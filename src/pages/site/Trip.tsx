/**
 * The trip board: one route, everything it takes.
 *
 * Flights, stays and activities are searched live through `ogt-search`. Where
 * a provider is not connected, the board says so and shows an estimate, never
 * a made-up live price. Cars and cruises are quoted by a person. The border
 * is one line at the end: if the trip needs a visa, we can handle that too.
 */

import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import TripBar, { emptyTrip, type TripQuery } from '@/components/site/TripBar';
import { HotLink } from '@/components/site/fx';
import { resolvePlace } from '@/lib/places.trip';
import { PASSPORT_COUNTRIES, visaVerdict } from '@/lib/travelResolve';
import { SCOUTPASS, priceOf, serviceFor } from '@/data/visaCatalog';
import { ALL_ITEMS, addToTrip, loadTrip, type TripItem } from '@/data/travelCatalog';
import {
  clock, duration, money, searchActivities, searchFlights, searchStays,
  type ActivityOffer, type FlightOffer, type SearchResult, type StayOffer,
} from '@/lib/travelSearch';

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const nightsBetween = (a: string, b: string) => Math.max(1, Math.round((Date.parse(b) - Date.parse(a)) / 86400000));
const day = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

function useSearch<T>(run: (() => Promise<SearchResult<T>>) | null, key: string) {
  const [result, setResult] = useState<SearchResult<T> | null>(null);
  useEffect(() => {
    if (!run) {
      setResult(null);
      return;
    }
    let live = true;
    setResult(null);
    void run().then((r) => live && setResult(r));
    return () => {
      live = false;
    };
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return result;
}

function AddButton({ item, small = true }: { item: TripItem; small?: boolean }) {
  const [added, setAdded] = useState(() => loadTrip().some((t) => t.id === item.id));
  return (
    <button
      type="button"
      className={`ogt-btn ${small ? 'ogt-btn-small' : ''} ${added ? 'ogt-btn-ghost' : ''}`}
      onClick={() => { addToTrip(item); setAdded(true); }}
      aria-pressed={added}
    >
      {added ? <><Check size={15} aria-hidden="true" /> Added</> : <><Plus size={15} aria-hidden="true" /> Add</>}
    </button>
  );
}

function Block({ title, note, children }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="ogt-board-block">
      <header>
        <h2 className="ogt-h3">{title}</h2>
        {note && <p className="ogt-small ogt-muted">{note}</p>}
      </header>
      {children}
    </section>
  );
}

const Loading = ({ what }: { what: string }) => (
  <div className="ogt-board-loading" role="status">
    <span /><span /><span />
    <p className="sr-only">Searching {what}</p>
  </div>
);

const TestNote = () => (
  <p className="ogt-alert" style={{ marginBottom: '1rem' }}>Test connection: these schedules and prices are samples, not real fares.</p>
);

/** Shown when a provider is not connected: an honest estimate, or a quote. */
function Estimate({ kind, city, nights }: { kind: 'flights' | 'stays' | 'activities'; city: string; nights: number }) {
  const items = ALL_ITEMS.filter((i) => i.kind === kind && i.city === city);
  if (!items.length) {
    return (
      <p className="ogt-note">
        Live prices for this are not connected yet. Add it to your trip and we price it by hand before you pay.
      </p>
    );
  }
  return (
    <>
      <p className="ogt-small ogt-muted" style={{ margin: '0 0 0.75rem' }}>Live prices are not connected yet. These are starting estimates; we confirm the real price before you pay.</p>
      <ul className="ogt-rows">
        {items.map((i) => {
          const price = kind === 'stays' ? i.fromPrice * nights : i.fromPrice;
          return (
            <li key={i.id} className="ogt-row" style={{ alignItems: 'center' }}>
              <span className="ogt-row-name">{i.title}</span>
              <span className="ogt-row-meta">{kind === 'stays' ? `${nights} night${nights === 1 ? '' : 's'}, estimate` : i.priceLabel}</span>
              <span className="ogt-row-price">${price.toLocaleString()} <AddButton item={{ id: i.id, kind: i.tag, title: i.title, detail: i.detail, price }} /></span>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function Trip() {
  const [params] = useSearchParams();
  const initial = useMemo<TripQuery>(() => {
    const base = emptyTrip();
    const depart = params.get('depart') ?? '';
    const back = params.get('return') ?? '';
    return {
      from: params.get('from') ?? '',
      to: params.get('to') ?? '',
      depart: DATE.test(depart) ? depart : base.depart,
      back: DATE.test(back) ? back : params.has('depart') ? '' : base.back,
      pax: Math.min(9, Math.max(1, Number(params.get('pax')) || 1)),
    };
  }, [params]);
  const [bar, setBar] = useState(initial);
  useEffect(() => setBar(initial), [initial]);

  const from = resolvePlace(initial.from);
  const to = resolvePlace(initial.to);
  const nights = initial.back ? nightsBetween(initial.depart, initial.back) : 3;
  const checkOut = initial.back || new Date(Date.parse(initial.depart) + 3 * 86400000).toISOString().slice(0, 10);
  const key = `${initial.from}|${initial.to}|${initial.depart}|${initial.back}|${initial.pax}`;

  const flights = useSearch<FlightOffer>(
    initial.from && initial.to ? () => searchFlights({ from: from?.name ?? initial.from, to: to?.name ?? initial.to, depart: initial.depart, return: initial.back || undefined, adults: initial.pax }) : null,
    `f|${key}`,
  );
  const stays = useSearch<StayOffer>(
    to ? () => searchStays({ lat: to.lat, lng: to.lng, checkIn: initial.depart, checkOut, adults: Math.min(8, initial.pax) }) : null,
    `s|${key}`,
  );
  const activities = useSearch<ActivityOffer>(to ? () => searchActivities({ query: to.name }) : null, `a|${to?.id}`);

  const [passport, setPassport] = useState('');
  useEffect(() => {
    if (from && PASSPORT_COUNTRIES.includes(from.country)) setPassport((p) => p || from.country);
  }, [from]);
  const verdict = to && passport ? visaVerdict(to.country, passport) : null;
  const visa = to ? serviceFor(to.country) : undefined;

  const [count, setCount] = useState(0);
  useEffect(() => {
    const sync = () => setCount(loadTrip().length);
    sync();
    window.addEventListener('ogt-trip-changed', sync);
    return () => window.removeEventListener('ogt-trip-changed', sync);
  }, []);

  const toName = to?.name ?? initial.to;
  const title = initial.to ? `${from ? `${from.name} to ` : ''}${toName}` : 'Plan a trip';

  return (
    <SitePage title={title} tone="night">
      <section className="ogt-night ogt-book-hero">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">Your trip</p>
          <h1 className="ogt-h1">
            {initial.to ? <>{from ? <>{from.name} <span aria-hidden="true">→</span><span className="sr-only">to</span> </> : null}<em style={{ display: 'inline' }}>{toName}</em></> : 'Where do you want to go?'}
          </h1>
          {initial.to && (
            <p className="ogt-lede" style={{ marginTop: '1rem' }}>
              {day(initial.depart)}{initial.back ? ` to ${day(initial.back)}, ${nights} night${nights === 1 ? '' : 's'}` : ', one way'} · {initial.pax} traveler{initial.pax === 1 ? '' : 's'}
            </p>
          )}
          <div style={{ marginTop: '1.75rem' }}><TripBar value={bar} onChange={setBar} submitLabel="Update" /></div>
        </div>
      </section>

      {initial.to && (
        <section className="ogt-section-tight" style={{ paddingBottom: 'clamp(4rem, 9vw, 7rem)' }}>
          <div className="ogt-wrap ogt-board">
            <div className="ogt-board-main">
              {!to && (
                <p className="ogt-alert">We do not know "{initial.to}" yet. Flights can still be searched; for the rest, tell us in the form and a person prices it.</p>
              )}

              <Block title="Flights" note={initial.from ? `${from?.name ?? initial.from} to ${toName}, ${initial.back ? 'round trip' : 'one way'}, total for ${initial.pax}` : undefined}>
                {!initial.from ? (
                  <p className="ogt-note">Tell us where you leave from, above, to see flights.</p>
                ) : !flights ? <Loading what="flights" /> : flights.state === 'error' ? (
                  <p className="ogt-alert">{flights.message}</p>
                ) : flights.state === 'offline' ? (
                  <Estimate kind="flights" city={toName} nights={nights} />
                ) : flights.options.length === 0 ? (
                  <p className="ogt-note">No flights found for those dates. Try a day earlier or later.</p>
                ) : (
                  <>
                    {flights.test && <TestNote />}
                    <ul className="ogt-offers">
                      {flights.options.slice(0, 6).map((f) => (
                        <li key={f.id} className="ogt-offer">
                          <div className="ogt-offer-main">
                            <p className="ogt-offer-name">{f.airline ?? 'Flight'}</p>
                            {f.legs.map((l, i) => (
                              <p key={i} className="ogt-offer-leg">
                                <b>{clock(l.depart)}</b> {l.from} <span aria-hidden="true">→</span> <b>{clock(l.arrive)}</b> {l.to}
                                <span className="ogt-muted"> · {duration(l.duration)} · {l.stops === 0 ? 'direct' : `${l.stops} stop${l.stops === 1 ? '' : 's'}`}</span>
                              </p>
                            ))}
                          </div>
                          <div className="ogt-offer-price">
                            <span className="ogt-price">{money(f.total, f.currency)}</span>
                            <AddButton item={{ id: `flight-${f.id}`, kind: 'Flight', title: `${from?.name ?? initial.from} → ${toName}, ${f.airline ?? ''}`.trim(), detail: f.legs.map((l) => l.flights.join(' ')).join(' / '), price: Math.round(f.total) }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </Block>

              {to && (
                <Block title={`Stays in ${to.name}`} note={`${nights} night${nights === 1 ? '' : 's'}, total for the stay`}>
                  {!stays ? <Loading what="stays" /> : stays.state === 'error' ? (
                    <p className="ogt-alert">{stays.message}</p>
                  ) : stays.state === 'offline' ? (
                    <Estimate kind="stays" city={to.name} nights={nights} />
                  ) : stays.options.length === 0 ? (
                    <p className="ogt-note">No stays found for those dates.</p>
                  ) : (
                    <>
                      {stays.test && <TestNote />}
                      <ul className="ogt-offers">
                        {stays.options.slice(0, 6).map((s) => (
                          <li key={s.id} className="ogt-offer">
                            {s.photo && <img src={s.photo} alt="" loading="lazy" className="ogt-offer-photo" />}
                            <div className="ogt-offer-main">
                              <p className="ogt-offer-name">{s.name}</p>
                              <p className="ogt-offer-leg ogt-muted">{[s.stars ? `${s.stars}-star` : null, s.reviewScore ? `guest score ${s.reviewScore}` : null, s.address].filter(Boolean).join(' · ')}</p>
                            </div>
                            <div className="ogt-offer-price">
                              <span className="ogt-price">{money(s.total, s.currency)}</span>
                              <AddButton item={{ id: `stay-${s.id}`, kind: 'Hotel', title: `${s.name}, ${nights} night${nights === 1 ? '' : 's'}`, detail: s.address ?? to.name, price: Math.round(s.total) }} />
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </Block>
              )}

              {to && (
                <Block title={`Things to do in ${to.name}`} note="Price per person, from">
                  {!activities ? <Loading what="activities" /> : activities.state === 'error' ? (
                    <p className="ogt-alert">{activities.message}</p>
                  ) : activities.state === 'offline' ? (
                    <Estimate kind="activities" city={to.name} nights={nights} />
                  ) : activities.options.length === 0 ? (
                    <p className="ogt-note">Nothing listed for {to.name} yet. Tell us what you like and we find it.</p>
                  ) : (
                    <ul className="ogt-offers">
                      {activities.options.slice(0, 6).map((a) => (
                        <li key={a.id} className="ogt-offer">
                          {a.photo && <img src={a.photo} alt="" loading="lazy" className="ogt-offer-photo" />}
                          <div className="ogt-offer-main">
                            <p className="ogt-offer-name">{a.name}</p>
                            <p className="ogt-offer-leg ogt-muted">{a.rating ? `${a.rating.toFixed(1)} from ${a.reviews?.toLocaleString() ?? 0} reviews on Viator` : 'On Viator'}</p>
                          </div>
                          <div className="ogt-offer-price">
                            {a.total != null && <span className="ogt-price">{money(a.total, a.currency)}</span>}
                            <AddButton item={{ id: `act-${a.id}`, kind: 'Activity', title: a.name ?? 'Activity', detail: to.name, price: Math.round(a.total ?? 0) }} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Block>
              )}

              <Block title="Car and cruise" note="Priced by a person, for your dates">
                <ul className="ogt-rows">
                  <li className="ogt-row" style={{ alignItems: 'center' }}>
                    <span className="ogt-row-name">Rental car in {toName}</span>
                    <span className="ogt-row-meta">Pick up where you land. We send the price with the rest of the trip.</span>
                    <span className="ogt-row-price"><AddButton item={{ id: `car-${toName}`, kind: 'Rental', title: `Rental car in ${toName}`, detail: 'To be quoted', price: 0 }} /></span>
                  </li>
                  <li className="ogt-row" style={{ alignItems: 'center' }}>
                    <span className="ogt-row-name">A cruise from or near {toName}</span>
                    <span className="ogt-row-meta">Tell us the sea or the river. We find the sailing and the cabin.</span>
                    <span className="ogt-row-price"><AddButton item={{ id: `cruise-${toName}`, kind: 'Cruise', title: `Cruise near ${toName}`, detail: 'To be quoted', price: 0 }} /></span>
                  </li>
                </ul>
              </Block>

              {to && (
                <Block title="The border" note="Only matters if your passport needs a visa">
                  <div className="ogt-fields ogt-fields-2" style={{ alignItems: 'end' }}>
                    <div className="ogt-field">
                      <label htmlFor="trip-passport">Passport you travel on</label>
                      <select id="trip-passport" className="ogt-select" value={passport} onChange={(e) => setPassport(e.target.value)}>
                        <option value="">Choose a passport</option>
                        {PASSPORT_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <p className="ogt-small ogt-muted" style={{ margin: 0 }} aria-live="polite">
                      {!verdict ? `Pick it and we tell you what ${to.country} asks for.` : verdict.detail}
                    </p>
                  </div>
                  {verdict && (
                    <p style={{ margin: '1.1rem 0 0', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem 1.25rem' }}>
                      <span className="ogt-pill" data-tone={verdict.hunt ? 'warn' : 'ok'}>{verdict.badge}</span>
                      {verdict.hunt && visa && (
                        <>
                          <span className="ogt-small">We handle it: {priceOf(visa.pricing).totalPrice} with every fee, or the appointment alone for {SCOUTPASS.price}.</span>
                          <Link to={`/start?visa=${visa.slug}&passport=${encodeURIComponent(passport)}&to=${encodeURIComponent(to.country)}&date=${initial.depart}&travelers=${initial.pax}`} className="ogt-btn ogt-btn-small">Add the visa</Link>
                        </>
                      )}
                    </p>
                  )}
                </Block>
              )}
            </div>

            <aside className="ogt-board-side">
              <div className="ogt-panel">
                <h2 className="ogt-h3">{count ? `${count} thing${count === 1 ? '' : 's'} in your trip` : 'Build the trip'}</h2>
                <p className="ogt-muted" style={{ margin: '0.5rem 0 0' }}>
                  {count ? 'Send it. A person confirms every price, then you pay.' : 'Add what you want. Or skip the list and tell us the trip in your own words.'}
                </p>
                <p style={{ margin: '1.25rem 0 0', display: 'grid', gap: '0.6rem' }}>
                  <HotLink to="/startmytrip">{count ? 'Lock in my trip' : 'Tell us the trip'}</HotLink>
                  {count > 0 && <Link to="/trips" className="ogt-btn ogt-btn-ghost">Review my trip</Link>}
                </p>
                <ul className="ogt-checks" style={{ marginTop: '1.5rem' }}>
                  <li>Free to send</li>
                  <li>Prices confirmed before you pay</li>
                  <li>The visa handled if you need one</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>
      )}
    </SitePage>
  );
}
