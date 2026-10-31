/**
 * OGT homepage: the Earth fills the screen, everything else floats over it.
 *
 *   - top: AI search bar (ogt-travel-agent), account button
 *   - tabs: vertical rail on large screens, bottom bar on phones
 *   - panels: side panel on large screens, bottom sheet on phones
 *
 * Picking a destination (search, tap on a gold dot, Explore list) flies an
 * arc from the traveler's origin and opens the Trip panel.
 */

import React, { lazy, Suspense, useCallback, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUp,
  Compass,
  Hand,
  Loader2,
  MapPin,
  Minus,
  Plane,
  Plus,
  ShieldCheck,
  Sparkles,
  Stamp,
  User,
  WifiOff,
} from 'lucide-react';
import { globeDestinations, type GlobeDestination } from '@/data/globeDestinations';
import type { GlobeDot, LatLng, RGB } from '@/components/earth/globe';
import type { GlobeApi } from '@/components/earth/WorldGlobe';
import GlobePanel from '@/components/ogt/GlobePanel';
import { useTravelAgent, type AgentTurn, type OfferCard } from '@/hooks/useTravelAgent';
import { useAuth } from '@/contexts/AuthContext';
import {
  ORIGINS,
  PASSPORTS,
  type Passport,
  arcDeg,
  detectPassport,
  findDestination,
  visaLink,
  visaVerdict,
} from '@/lib/travelResolve';

const WorldGlobe = lazy(() => import('@/components/earth/WorldGlobe'));

type PanelId = 'ask' | 'trip' | 'explore' | 'visa' | 'account';

const MONTHS = ['Flexible', 'Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Apr 2027'];
const BOARD = ['PARIS — VFS GLOBAL', 'LONDON — TLSCONTACT', 'MADRID — BLS', 'ROME — VFS GLOBAL', 'BERLIN — TLSCONTACT', 'AMSTERDAM — VFS GLOBAL', 'LISBON — VFS GLOBAL', 'ATHENS — VFS GLOBAL'];
const EXAMPLES = [
  '5 days in Lisbon in March',
  'Do I need a visa for Paris with a Cameroonian passport?',
  'Beach trip in December under $2,000',
];

// Linear-light dot colours: big hubs bright gold, smaller places a soft warm white.
const HUB_DOT: RGB = [1.0, 0.7, 0.24];
const TOWN_DOT: RGB = [0.5, 0.42, 0.3];

/** Where an offer card leads. We route by card type, not by the URL the model wrote. */
function cardHref(card: OfferCard, dest: GlobeDestination | null): string {
  switch (card.type) {
    case 'flight': return '/flights';
    case 'hotel': return '/stays';
    case 'visa_consultation': return dest ? visaLink(dest.country) : '/visas';
    case 'trip_bundle': return '/packages';
    case 'insurance': return '/services';
    case 'connect': return '/discover';
    case 'elite': return '/pricing';
    default: return dest ? dest.ctaLink : '/startmytrip';
  }
}

const TABS: { id: PanelId; label: string; icon: React.ElementType }[] = [
  { id: 'explore', label: 'Explore', icon: Compass },
  { id: 'trip', label: 'Trip', icon: Plane },
  { id: 'ask', label: 'Ask AI', icon: Sparkles },
  { id: 'visa', label: 'Visa', icon: Stamp },
  { id: 'account', label: 'Account', icon: User },
];

const PANEL_TITLES: Record<PanelId, string> = {
  ask: 'Ask One Global Trip',
  trip: 'Your trip',
  explore: 'Explore',
  visa: 'Visa help',
  account: 'Your account',
};

function AskBar({ onAsk, busy }: { onAsk: (q: string) => void; busy: boolean }) {
  const [q, setQ] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const text = q.trim();
        if (!text || busy) return;
        onAsk(text);
        setQ('');
      }}
      className="relative w-full"
      role="search"
    >
      <Sparkles size={18} className="absolute z-10 left-4 top-1/2 -translate-y-1/2 text-amber-300 pointer-events-none" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Ask anything about your trip"
        placeholder="Ask anything: where, when, visa, budget…"
        maxLength={500}
        className="w-full h-14 pl-11 pr-14 rounded-full bg-[#0b1224]/75 backdrop-blur-xl border border-white/15 text-white placeholder:text-white/45 text-[15px] outline-none shadow-[0_12px_40px_rgba(0,0,0,0.45)] focus:border-amber-300/70 transition"
      />
      <button
        type="submit"
        disabled={busy || !q.trim()}
        aria-label="Ask"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-amber-300 text-[#030712] grid place-items-center disabled:opacity-40 hover:bg-amber-200 transition"
      >
        {busy ? <Loader2 size={18} className="animate-spin" /> : <ArrowUp size={18} />}
      </button>
    </form>
  );
}

function Turn({
  turn,
  dest,
  passport,
  onAsk,
  onOpenTrip,
}: {
  turn: AgentTurn;
  dest: GlobeDestination | null;
  passport: Passport;
  onAsk: (q: string) => void;
  onOpenTrip: () => void;
}) {
  const navigate = useNavigate();
  const verdict = dest ? visaVerdict(dest.country, passport) : null;
  return (
    <div className="space-y-3">
      <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-amber-300 text-[#030712] px-3.5 py-2 text-sm font-medium">{turn.question}</p>
      {turn.status === 'loading' ? (
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Loader2 size={16} className="animate-spin" /> Thinking about your trip…
        </div>
      ) : turn.offline ? (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <p className="flex items-center gap-2 text-xs text-white/50"><WifiOff size={14} /> The AI agent didn't answer. Here's what we know.</p>
          {dest && verdict ? (
            <>
              <p className="text-sm leading-relaxed"><b>{dest.emoji} {dest.name}, {dest.country}.</b> {verdict.badge}. {verdict.detail}</p>
              <button onClick={onOpenTrip} className="w-full bg-white text-[#030712] font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-2">
                Open the trip <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <p className="text-sm text-white/80">Try a city or a country name, or open Explore and tap a place.</p>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[15px] leading-relaxed text-white/90 whitespace-pre-line">{turn.message}</p>
          {turn.cards.length > 0 && (
            <div className="grid gap-2">
              {turn.cards.map((c, i) => (
                <button
                  key={i}
                  onClick={() => navigate(cardHref(c, dest))}
                  className="text-left rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 transition group"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-semibold text-sm">{c.title}</span>
                    {c.badge && <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-300/10 rounded-full px-2 py-0.5">{c.badge}</span>}
                  </span>
                  {c.subtitle && <span className="block mt-1 text-xs text-white/60 leading-relaxed">{c.subtitle}</span>}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:underline">
                    {c.cta_label || 'Open'} <ArrowRight size={13} />
                  </span>
                </button>
              ))}
            </div>
          )}
          {turn.followUp && (
            <button onClick={() => onAsk(turn.followUp!)} className="text-left text-sm rounded-xl border border-dashed border-white/20 px-3.5 py-2.5 text-white/75 hover:bg-white/5 w-full">
              {turn.followUp}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const HomeApp = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { turns, ask } = useTravelAgent(user?.id ?? null);
  const globeApi = useRef<GlobeApi | null>(null);

  const [panel, setPanel] = useState<PanelId | null>(null);
  const [destId, setDestId] = useState<string | null>(null);
  const [passport, setPassport] = useState<Passport>('United States');
  const [month, setMonth] = useState('Flexible');
  const [travelers, setTravelers] = useState(2);
  const [region, setRegion] = useState('All');

  const dest = destId ? globeDestinations.find((d) => d.id === destId) ?? null : null;
  const verdict = dest ? visaVerdict(dest.country, passport) : null;
  const origin = ORIGINS[passport];
  const busy = turns.some((t) => t.status === 'loading');

  const pickable = useMemo(() => globeDestinations.filter((d) => d.tier <= 2), []);
  const dots: GlobeDot[] = useMemo(
    () => pickable.map((d) => ({ lat: d.lat, lng: d.lng, color: d.tier === 1 ? HUB_DOT : TOWN_DOT })),
    [pickable],
  );
  const globeDest = useMemo(
    () => (dest ? { lat: dest.lat, lng: dest.lng, label: `${dest.emoji} ${dest.name}` } : null),
    [dest],
  );

  const regions = useMemo(() => {
    const set = new Set<string>();
    globeDestinations.filter((d) => d.tier === 1).forEach((d) => set.add(d.region.split('/')[0].trim()));
    return ['All', ...Array.from(set)];
  }, []);
  const explore = useMemo(() => {
    const tier1 = globeDestinations.filter((d) => d.tier === 1);
    return region === 'All' ? tier1 : tier1.filter((d) => d.region.split('/')[0].trim() === region);
  }, [region]);

  const goTo = useCallback((d: GlobeDestination) => {
    setDestId(d.id);
    setPanel('trip');
  }, []);

  const pickNearest = useCallback(
    (at: LatLng) => {
      let best: GlobeDestination | null = null;
      let bestDeg = 7;
      for (const d of pickable) {
        const deg = arcDeg(at, d);
        if (deg < bestDeg) {
          best = d;
          bestDeg = deg;
        }
      }
      if (best) goTo(best);
    },
    [pickable, goTo],
  );

  const onAsk = useCallback(
    async (question: string) => {
      setPanel('ask');
      const p = detectPassport(question);
      if (p) setPassport(p);
      const asked = findDestination(question);
      if (asked) setDestId(asked.id);
      const turn = await ask(question);
      if (!asked && !turn.offline) {
        const text = `${turn.message} ${turn.cards.map((c) => `${c.title} ${c.subtitle ?? ''}`).join(' ')}`;
        const found = findDestination(text);
        // Skip the traveler's own city, which replies often mention as the origin.
        if (found && found.name !== ORIGINS[p ?? passport].label) setDestId(found.id);
      }
    },
    [ask, passport],
  );

  const toggle = (id: PanelId) => setPanel((cur) => (cur === id ? null : id));
  const closePanel = useCallback(() => setPanel(null), []);

  const startTrip = () => {
    if (!dest) return;
    const join = dest.ctaLink.includes('?') ? '&' : '?';
    navigate(`${dest.ctaLink}${join}travelers=${travelers}&month=${encodeURIComponent(month)}&passport=${encodeURIComponent(passport)}`);
  };

  return (
    <div className="ogt-app fixed inset-0 overflow-hidden bg-[#030712] text-white text-left font-sans antialiased">
      <style>{`@keyframes ogt-board { from { transform: translateX(0); } to { transform: translateX(-50%); } } .ogt-board { animation: ogt-board 28s linear infinite; } @media (prefers-reduced-motion: reduce) { .ogt-board { animation: none; } }`}</style>
      <h1 className="sr-only">One Global Trip: plan your trip on the globe, we handle the visa</h1>

      {/* Sky and Earth */}
      <div aria-hidden="true" className="ogt-stars absolute inset-0" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vmax] h-[140vmax] rounded-full bg-[radial-gradient(circle,rgba(56,130,246,0.16),transparent_45%)]" />
      <div
        className={`absolute top-[53%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-700 ease-out ${panel ? 'left-1/2 lg:left-[calc(50%-150px)]' : 'left-1/2'}`}
        style={{ width: 'min(max(100vw, 70svh), 115svh)' }}
      >
        <Suspense fallback={<div className="aspect-square w-full" />}>
          <WorldGlobe
            origin={origin}
            destination={globeDest}
            tone={verdict?.hunt ? 'visa' : 'clear'}
            dots={dots}
            onPick={pickNearest}
            apiRef={globeApi}
            chrome={false}
          />
        </Suspense>
      </div>

      {/* Top bar: logo, AI search, account */}
      <div className="absolute top-0 inset-x-0 z-40 px-3 pt-3 lg:px-6 lg:pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
          <Link to="/" className="order-1 flex items-center gap-2 font-black tracking-tight text-lg shrink-0">
            <span className="w-9 h-9 rounded-xl bg-amber-300 text-[#030712] grid place-items-center"><Plane size={17} /></span>
            <span className="hidden sm:inline">One Global Trip</span>
            <span className="sm:hidden">OGT</span>
          </Link>
          <div className="order-3 lg:order-2 w-full lg:w-auto lg:flex-1 lg:max-w-2xl lg:mx-auto">
            <AskBar onAsk={onAsk} busy={busy} />
          </div>
          <button
            onClick={() => toggle('account')}
            className="order-2 lg:order-3 ml-auto lg:ml-0 h-10 pl-2 pr-3.5 rounded-full bg-[#0b1224]/75 backdrop-blur-xl border border-white/15 flex items-center gap-2 text-sm font-semibold hover:bg-white/10"
            aria-pressed={panel === 'account'}
          >
            <span className="w-7 h-7 rounded-full bg-white/15 grid place-items-center text-xs font-bold">
              {user?.email ? user.email[0].toUpperCase() : <User size={14} />}
            </span>
            {user ? 'Account' : 'Sign in'}
          </button>
        </div>
        {!panel && turns.length === 0 && (
          <div className="mt-3 lg:max-w-2xl lg:mx-auto -mx-3 px-3 flex gap-2 overflow-x-auto no-scrollbar lg:flex-wrap lg:justify-center">
            {EXAMPLES.map((e) => (
              <button
                key={e}
                onClick={() => onAsk(e)}
                className="shrink-0 px-3.5 py-2 rounded-full bg-[#0b1224]/60 backdrop-blur border border-white/10 text-xs text-white/80 hover:bg-white/10"
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tabs: vertical rail on large screens */}
      <nav aria-label="Panels" className="hidden lg:flex fixed z-40 left-6 top-1/2 -translate-y-1/2 flex-col gap-1 p-1.5 rounded-2xl bg-[#0b1224]/75 backdrop-blur-xl border border-white/10">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            aria-pressed={panel === id}
            className={`w-16 py-2.5 rounded-xl flex flex-col items-center gap-1 text-[10px] font-semibold transition ${panel === id ? 'bg-amber-300 text-[#030712]' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
          >
            <Icon size={19} />
            {label}
          </button>
        ))}
      </nav>

      {/* Tabs: bottom bar on phones */}
      <nav aria-label="Panels" className="lg:hidden fixed z-40 bottom-0 inset-x-0 h-[4.25rem] pb-[env(safe-area-inset-bottom)] bg-[#030712]/90 backdrop-blur-xl border-t border-white/10 grid grid-cols-5">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => toggle(id)}
            aria-pressed={panel === id}
            className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold ${panel === id ? 'text-amber-300' : 'text-white/60'}`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>

      {/* Zoom, hint and credit */}
      <div className={`fixed z-30 right-3 lg:right-6 flex-col gap-1.5 bottom-24 lg:bottom-8 ${panel ? 'hidden lg:flex lg:right-[460px]' : 'flex'}`}>
        <button type="button" onClick={() => globeApi.current?.zoomBy(1.25)} className="ogt-globe-btn" aria-label="Zoom in on the globe"><Plus size={16} /></button>
        <button type="button" onClick={() => globeApi.current?.zoomBy(0.8)} className="ogt-globe-btn" aria-label="Zoom out of the globe"><Minus size={16} /></button>
      </div>
      {!panel && (
        <p className="fixed z-20 left-1/2 -translate-x-1/2 bottom-[5.5rem] lg:bottom-8 text-xs text-white/50 flex items-center gap-1.5 whitespace-nowrap pointer-events-none">
          <Hand size={13} /> Drag to spin. Tap a gold dot to fly there.
        </p>
      )}
      <a
        href="https://www.solarsystemscope.com/textures/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-20 left-3 bottom-[4.6rem] lg:left-6 lg:bottom-3 text-[9px] text-white/30 hover:text-white/60"
      >
        Imagery: Solar System Scope / NASA, CC BY 4.0
      </a>

      {/* Panels */}
      {panel && (
        <GlobePanel title={PANEL_TITLES[panel]} onClose={closePanel}>
          {panel === 'ask' && (
            <div className="space-y-6" aria-live="polite">
              {turns.length === 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-white/70">Ask in your own words. Where you want to go, when, your passport, your budget. The globe follows along.</p>
                  {EXAMPLES.map((e) => (
                    <button key={e} onClick={() => onAsk(e)} className="w-full text-left text-sm rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 hover:bg-white/10">{e}</button>
                  ))}
                </div>
              ) : (
                turns.map((t) => (
                  <Turn key={t.id} turn={t} dest={dest} passport={passport} onAsk={onAsk} onOpenTrip={() => setPanel('trip')} />
                ))
              )}
              {!user && turns.length > 0 && (
                <p className="text-xs text-white/50">
                  <button onClick={() => setPanel('account')} className="underline font-semibold text-white/70">Create a free account</button> and the agent remembers your passport and home airport next time.
                </p>
              )}
            </div>
          )}

          {panel === 'trip' && (
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">Your passport</p>
                <div className="mt-2 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Your passport">
                  {PASSPORTS.map((p) => (
                    <button
                      key={p}
                      role="radio"
                      aria-checked={p === passport}
                      onClick={() => setPassport(p)}
                      className={p === passport ? 'px-3 py-1.5 rounded-md bg-white text-[#030712] text-xs font-bold' : 'px-3 py-1.5 rounded-md border border-white/20 text-white/80 text-xs font-medium hover:bg-white/10'}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {dest && verdict ? (
                <div className="rounded-2xl bg-white text-zinc-900 overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      <span>Boarding pass</span>
                      <span>{passport} passport</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-xl font-black text-[#001a41] truncate">{origin.label.toUpperCase()}</span>
                      <span className="flex-1 min-w-6 border-t border-dashed border-zinc-300 relative"><Plane size={15} className="absolute -top-2 left-1/2 -translate-x-1/2 text-amber-500" /></span>
                      <span className="text-xl font-black text-[#001a41] truncate">{dest.name.toUpperCase()}</span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-500">{dest.emoji} {dest.country} · {dest.description}</p>
                    <div className={`mt-4 rounded-xl p-3 border ${verdict.hunt ? 'bg-orange-50 border-orange-200' : 'bg-amber-50 border-amber-200'}`}>
                      <p className="flex items-center gap-2 font-semibold text-sm"><ShieldCheck size={17} className={verdict.hunt ? 'text-orange-600' : 'text-amber-600'} /> {verdict.badge}</p>
                      <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{verdict.detail}</p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <label className="text-xs font-semibold text-zinc-500">
                        Travelers
                        <select value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} className="mt-1 block w-full h-10 rounded-md border border-zinc-300 bg-white px-2 text-sm text-zinc-900 font-medium">
                          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} traveler{n > 1 ? 's' : ''}</option>)}
                        </select>
                      </label>
                      <label className="text-xs font-semibold text-zinc-500">
                        When
                        <select value={month} onChange={(e) => setMonth(e.target.value)} className="mt-1 block w-full h-10 rounded-md border border-zinc-300 bg-white px-2 text-sm text-zinc-900 font-medium">
                          {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </label>
                    </div>
                  </div>
                  <div className="border-t border-dashed border-zinc-200 p-5 pt-4 flex gap-2">
                    <button onClick={startTrip} className="flex-1 bg-[#001a41] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#0a2a5c]">
                      Start this trip <ArrowRight size={17} />
                    </button>
                    <button onClick={() => navigate(visaLink(dest.country))} className="px-4 py-3 rounded-lg border border-zinc-300 font-semibold text-sm hover:bg-zinc-50">
                      Visa
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/20 p-5 text-sm text-white/70 space-y-3">
                  <p>No destination yet. Ask the search bar, tap a gold dot on the globe, or pick one from Explore.</p>
                  <button onClick={() => setPanel('explore')} className="inline-flex items-center gap-1.5 font-semibold text-amber-300"><Compass size={15} /> Open Explore</button>
                </div>
              )}
              <p className="text-xs text-white/40">Rules change. Always double-check with the official consulate. This is guidance, not a guarantee.</p>
            </div>
          )}

          {panel === 'explore' && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-1.5">
                {regions.map((r) => (
                  <button key={r} onClick={() => setRegion(r)} aria-pressed={r === region} className={r === region ? 'px-3 py-1.5 rounded-full bg-amber-300 text-[#030712] text-xs font-bold' : 'px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium hover:bg-white/20'}>{r}</button>
                ))}
              </div>
              <ul className="divide-y divide-white/10 -mx-1">
                {explore.map((d) => (
                  <li key={d.id}>
                    <button onClick={() => goTo(d)} className="w-full text-left px-1 py-3 flex items-center gap-3 hover:bg-white/5 rounded-lg">
                      <span className="w-10 h-10 rounded-xl grid place-items-center text-lg shrink-0" style={{ background: `${d.color}26` }} aria-hidden="true">{d.emoji}</span>
                      <span className="flex-1 min-w-0">
                        <span className="block font-semibold text-sm">{d.name}</span>
                        <span className="block text-xs text-white/50 truncate"><MapPin size={11} className="inline -mt-0.5" /> {d.country} · {d.description}</span>
                      </span>
                      <ArrowRight size={15} className="text-white/40 shrink-0" />
                    </button>
                  </li>
                ))}
              </ul>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">Everything for the trip</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    ['Flights', '/flights'],
                    ['Stays', '/stays'],
                    ['Rental cars', '/cars'],
                    ['Cruises', '/cruises'],
                    ['Activities', '/activities'],
                    ['Packages', '/packages'],
                  ].map(([label, path]) => (
                    <Link key={path} to={path} className="rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-sm font-semibold hover:bg-white/10 flex items-center justify-between">
                      {label} <ArrowRight size={14} className="text-white/40" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {panel === 'visa' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-gradient-to-br from-[#001a41] to-[#0b1224] border border-white/10 overflow-hidden">
                <div className="p-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-amber-300 flex items-center gap-2"><Stamp size={14} /> Slot hunter</p>
                  <p className="mt-2 text-xl font-black leading-tight">ScoutPass hunts the visa appointment for you.</p>
                  <p className="mt-2 text-sm text-white/70 leading-relaxed">We watch VFS Global, TLScontact and BLS across the US appointment cities and alert you the moment a slot opens. If no appointment can be secured, you get refunded.</p>
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <p><span className="text-3xl font-black text-amber-300">$67</span> <span className="text-xs text-white/60">per applicant</span></p>
                    <Link to="/pricing" className="bg-white text-[#030712] font-semibold px-4 py-2 rounded-lg text-sm">See pricing</Link>
                  </div>
                </div>
                <div className="border-t border-white/10 py-2.5 overflow-hidden whitespace-nowrap" aria-hidden="true">
                  <div className="ogt-board inline-flex gap-8 text-[11px] font-semibold tracking-widest text-white/50">
                    {[...BOARD, ...BOARD].map((b, i) => <span key={i}>{b} · CHECKING</span>)}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                {[
                  ['Schengen short-stay visa', '/schengen-visa'],
                  ['UK visitor visa', '/visas/short-stay/uk'],
                  ['Long-stay and residency visas', '/visas/long-stay'],
                  ['Do I need a visa?', '/visas'],
                ].map(([label, path]) => (
                  <Link key={path} to={path} className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-3 text-sm font-semibold hover:bg-white/10 flex items-center justify-between">
                    {label} <ArrowRight size={14} className="text-white/40" />
                  </Link>
                ))}
              </div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {[
                  ['Do you guarantee a visa?', 'No agency can guarantee a consulate decision. We guarantee the work: a clean file, the right appointment hunt, and a refund if no appointment can be secured.'],
                  ['What does the $67 cover?', 'The appointment hunt, per applicant. Visa fees charged by the consulate or center are separate.'],
                  ['Which countries do you cover?', 'All 27 Schengen countries, plus the UK, US and Canada, with appointments across US cities.'],
                ].map(([q, a]) => (
                  <details key={q} className="py-3 group">
                    <summary className="text-sm font-semibold cursor-pointer list-none flex justify-between gap-4">{q}<span className="text-white/40 group-open:rotate-45 transition">+</span></summary>
                    <p className="mt-2 text-sm text-white/65 leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {panel === 'account' && (
            <div className="space-y-5">
              {user ? (
                <>
                  <p className="text-sm text-white/70">Signed in as <b className="text-white">{user.email}</b></p>
                  <div className="grid gap-2">
                    {[
                      ['My trip', '/trips'],
                      ['Dashboard', '/dashboard'],
                      ['Profile and passport', '/profile'],
                    ].map(([label, path]) => (
                      <Link key={path} to={path} className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-3 text-sm font-semibold hover:bg-white/10 flex items-center justify-between">
                        {label} <ArrowRight size={14} className="text-white/40" />
                      </Link>
                    ))}
                  </div>
                  <button onClick={() => void signOut()} className="text-sm text-white/60 underline">Sign out</button>
                </>
              ) : (
                <>
                  <div>
                    <p className="text-lg font-black">Free to use. Better with an account.</p>
                    <ul className="mt-3 space-y-2 text-sm text-white/75">
                      <li className="flex gap-2"><ShieldCheck size={16} className="text-amber-300 shrink-0 mt-0.5" /> The AI agent remembers your passport, home airport and travel style.</li>
                      <li className="flex gap-2"><ShieldCheck size={16} className="text-amber-300 shrink-0 mt-0.5" /> Save trips and pick up where you left off on any device.</li>
                      <li className="flex gap-2"><ShieldCheck size={16} className="text-amber-300 shrink-0 mt-0.5" /> Track your visa file and appointment hunt in one place.</li>
                    </ul>
                  </div>
                  <div className="grid gap-2">
                    <Link to="/auth" className="bg-amber-300 text-[#030712] font-bold py-3 rounded-lg text-center hover:bg-amber-200">Create a free account</Link>
                    <Link to="/auth" className="border border-white/20 font-semibold py-3 rounded-lg text-center hover:bg-white/10">Sign in</Link>
                  </div>
                </>
              )}
              <div className="rounded-xl border border-dashed border-white/20 p-4">
                <p className="text-sm font-semibold flex items-center gap-2"><Sparkles size={15} className="text-amber-300" /> Premium is coming</p>
                <p className="mt-1 text-xs text-white/60 leading-relaxed">More for frequent travelers. The free plan stays free.</p>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/45 pt-2 border-t border-white/10">
                <Link to="/about" className="hover:text-white">About</Link>
                <Link to="/contact" className="hover:text-white">Contact</Link>
                <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
                <Link to="/terms-conditions" className="hover:text-white">Terms</Link>
              </div>
            </div>
          )}
        </GlobePanel>
      )}
    </div>
  );
};

export default HomeApp;
