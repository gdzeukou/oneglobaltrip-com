import React, { lazy, Suspense, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Stamp,
  Users,
} from 'lucide-react';
import { globeDestinations } from '@/data/globeDestinations';
import AiPlanner from '@/components/ogt/AiPlanner';

const MapboxGlobe = lazy(() => import('@/components/globe/MapboxGlobe'));

const SCHENGEN = new Set([
  'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria',
  'Switzerland', 'Portugal', 'Greece', 'Czech Republic', 'Poland', 'Denmark',
  'Sweden', 'Norway', 'Finland', 'Hungary', 'Croatia', 'Slovenia', 'Slovakia',
  'Luxembourg', 'Malta', 'Estonia', 'Latvia', 'Lithuania', 'Iceland',
]);

const PASSPORTS = ['United States', 'Cameroon', 'France', 'Canada', 'Other'];
const MONTHS = ['Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Flexible'];
const BOARD = ['PARIS — VFS GLOBAL', 'LONDON — TLSCONTACT', 'MADRID — BLS', 'ROME — VFS GLOBAL', 'BERLIN — TLSCONTACT', 'AMSTERDAM — VFS GLOBAL', 'LISBON — VFS GLOBAL', 'ATHENS — VFS GLOBAL'];

function visaVerdict(country: string, passport: string) {
  if (SCHENGEN.has(country)) {
    if (passport === 'France') return { badge: 'No visa needed', detail: 'EU passport. Schengen travel is open to you, no appointment needed for a short stay.', hunt: false };
    if (passport === 'United States' || passport === 'Canada') return { badge: 'No visa for under 90 days', detail: 'US and Canadian passports are normally visa-free for a short Schengen stay. We still check your file so nothing blocks you at the border.', hunt: false };
    return { badge: 'Schengen visa likely needed', detail: 'Most non-EU passports need a Schengen short-stay visa, with an appointment at VFS Global, TLScontact or BLS. That appointment is the hard part. We hunt it for you.', hunt: true };
  }
  if (country === 'United Kingdom') {
    if (passport === 'France') return { badge: 'No visa needed', detail: 'EU passport. Short UK visits are normally straightforward.', hunt: false };
    if (passport === 'United States' || passport === 'Canada') return { badge: 'ETA to check', detail: 'US and Canadian travelers usually do not need a visitor visa, but an ETA may apply. We confirm it before you book anything.', hunt: false };
    return { badge: 'UK visitor visa likely needed', detail: 'Most other passports need a UK visitor visa first. We review your file and walk you through the appointment.', hunt: true };
  }
  if (country === 'UAE') {
    if (passport === 'United States' || passport === 'Canada' || passport === 'France') return { badge: 'Visa on arrival in most cases', detail: 'US, Canadian and EU passports normally get a visa on arrival in the UAE. We confirm the exact rule for your trip dates.', hunt: false };
    return { badge: 'Visa to check', detail: 'UAE rules depend on your passport. We check them for you before you pay for anything.', hunt: false };
  }
  return { badge: 'We check it for you', detail: 'Visa rules depend on your passport and your trip. Tell us where you are going and we give you the exact next step, no guessing.', hunt: false };
}

function visaLink(country: string) {
  if (SCHENGEN.has(country)) return '/schengen-visa';
  if (country === 'United Kingdom') return '/visas/short-stay/uk';
  return '/visas';
}

const HomeApp = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<'planner' | 'globe'>('planner');
  const [query, setQuery] = useState('');
  const [destId, setDestId] = useState('paris');
  const [passport, setPassport] = useState('United States');
  const [month, setMonth] = useState('Flexible');
  const [travelers, setTravelers] = useState(2);
  const [region, setRegion] = useState('All');

  const dest = globeDestinations.find((d) => d.id === destId) || globeDestinations[0];
  const verdict = visaVerdict(dest.country, passport);

  const quickPicks = useMemo(() => {
    const q = query.trim().toLowerCase();
    const tier1 = globeDestinations.filter((d) => d.tier === 1);
    if (!q) return tier1.slice(0, 12);
    return tier1.filter((d) => d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  const regions = useMemo(() => {
    const set = new Set<string>();
    globeDestinations.filter((d) => d.tier === 1).forEach((d) => set.add(d.region.split('/')[0].trim()));
    return ['All', ...Array.from(set)];
  }, []);

  const grid = useMemo(() => {
    const tier1 = globeDestinations.filter((d) => d.tier === 1);
    if (region === 'All') return tier1;
    return tier1.filter((d) => d.region.split('/')[0].trim() === region);
  }, [region]);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      <style>{`@keyframes ogt-board { from { transform: translateX(0); } to { transform: translateX(-50%); } } .ogt-board { animation: ogt-board 28s linear infinite; } .ogt-ticket { background-image: radial-gradient(circle at 0 50%, #fff 10px, transparent 11px), radial-gradient(circle at 100% 50%, #fff 10px, transparent 11px); }`}</style>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tight text-lg text-[#001a41]">
            <span className="w-8 h-8 rounded-md bg-[#001a41] text-white grid place-items-center"><Plane size={16} /></span>
            One Global Trip
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
            <Link to="/flights" className="hover:text-zinc-900">Flights</Link>
            <Link to="/stays" className="hover:text-zinc-900">Stays</Link>
            <Link to="/packages" className="hover:text-zinc-900">Packages</Link>
            <Link to="/trips" className="hover:text-zinc-900">My Trip</Link>
            <Link to="/visas" className="hover:text-zinc-900">Visa check</Link>
          </nav>
          <Link to="/startmytrip" className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-zinc-800">Start my trip</Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        <section className="pt-10 md:pt-16 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Flights, stays, cars, cruises, activities, packages</p>
            <h1 className="mt-4 font-display font-black leading-[0.92] tracking-tight text-[#001a41] text-5xl md:text-7xl">
              Where to next?<br />We handle the <span className="bg-amber-200 px-2 -mx-1">visa.</span><br />You pack.
            </h1>
            <p className="mt-5 max-w-lg text-zinc-600 text-lg leading-relaxed">
              Book the trip like Expedia, plan it in words like ChatGPT and Claude, stay like Airbnb. Visa is only a checkbox, if your trip needs one.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm border-t border-zinc-200 pt-5">
              <span><b className="text-[#001a41]">27</b> Schengen countries</span>
              <span><b className="text-[#001a41]">UK · US · Canada</b> covered too</span>
              <span><b className="text-[#001a41]">$67</b> to start a slot hunt</span>
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={() => setView('planner')} className={view === 'planner' ? 'px-4 py-2 rounded-md bg-zinc-900 text-white text-sm font-semibold' : 'px-4 py-2 rounded-md border border-zinc-300 text-sm font-semibold'}>Trip planner</button>
              <button onClick={() => setView('globe')} className={view === 'globe' ? 'px-4 py-2 rounded-md bg-zinc-900 text-white text-sm font-semibold' : 'px-4 py-2 rounded-md border border-zinc-300 text-sm font-semibold'}>Explore the globe</button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="ogt-ticket bg-[#001a41] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full border-2 border-dashed border-amber-300/60 grid place-items-center rotate-12">
                <span className="text-amber-300 text-[10px] font-black tracking-widest text-center leading-tight">SLOT<br />HUNTER</span>
              </div>
              <p className="text-xs tracking-widest uppercase text-white/60">Boarding pass — your trip</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl font-black">USA</span>
                <span className="flex-1 border-t border-dashed border-white/40 relative"><Plane size={16} className="absolute -top-2 left-1/2 text-amber-300" /></span>
                <span className="text-2xl font-black">{dest.name.toUpperCase()}</span>
              </div>
              <p className="mt-1 text-white/60 text-sm">{dest.country} · {passport} · {travelers} traveler{travelers > 1 ? 's' : ''} · {month}</p>
              <div className="my-5 border-t border-dashed border-white/30" />
              <p className="flex items-center gap-2 font-semibold"><ShieldCheck size={18} className="text-amber-300" /> {verdict.badge}</p>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">{verdict.detail}</p>
              <div className="mt-5 flex gap-1.5" aria-hidden="true">
                {[3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 2, 4, 1, 2].map((w, i) => (
                  <span key={i} className="bg-white/80 inline-block h-8" style={{ width: w * 3 }} />
                ))}
              </div>
              <button onClick={() => navigate(dest.ctaLink)} className="mt-4 w-full bg-amber-300 text-[#001a41] font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-amber-200">
                Start this trip <ArrowRight size={18} />
              </button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">Rules change. Always double-check with the official consulate. This is guidance, not a guarantee.</p>
          </div>
        </section>

        <section className="mt-10">
          <AiPlanner />
        </section>

        {view === 'globe' ? (
          <section className="mt-12">
            <div className="relative h-[72vh] rounded-2xl overflow-hidden bg-black border border-zinc-200">
              <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-white/60 text-sm">Loading globe...</div>}>
                <MapboxGlobe />
              </Suspense>
            </div>
            <p className="mt-3 text-sm text-zinc-500">Tap a country, then a city. The globe is still here, it just stopped being the whole homepage.</p>
            <button onClick={() => setView('planner')} className="mt-3 text-sm font-semibold text-blue-700 underline">Back to the planner</button>
          </section>
        ) : (
          <>
            <section className="mt-12 border border-zinc-200 rounded-2xl shadow-sm">
              <div className="px-5 md:px-7 pt-6 pb-2 flex items-center justify-between">
                <h2 className="font-bold text-lg text-[#001a41]">Build your trip</h2>
                <span className="text-xs font-semibold bg-zinc-100 px-2.5 py-1 rounded-full">3 steps, 30 seconds</span>
              </div>
              <div className="px-5 md:px-7 py-6 grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">01 — Destination</p>
                  <div className="mt-3 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Paris, Tokyo, Dubai..." className="w-full pl-9 pr-3 py-2.5 rounded-md border border-zinc-300 outline-none focus:ring-2 focus:ring-zinc-900 text-sm" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {quickPicks.map((d) => (
                      <button key={d.id} onClick={() => setDestId(d.id)} className={d.id === destId ? 'px-2.5 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-semibold' : 'px-2.5 py-1.5 rounded-md bg-zinc-100 text-xs font-medium hover:bg-zinc-200'}>
                        {d.emoji} {d.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">02 — Passport</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {PASSPORTS.map((p) => (
                      <button key={p} onClick={() => setPassport(p)} className={p === passport ? 'px-2.5 py-1.5 rounded-md bg-amber-300 text-zinc-900 text-xs font-bold' : 'px-2.5 py-1.5 rounded-md bg-zinc-100 text-xs font-medium hover:bg-zinc-200'}>{p}</button>
                    ))}
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500"><Users size={12} className="inline mr-1" /> Travelers</p>
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3, 4].map((n) => (
                      <button key={n} onClick={() => setTravelers(n)} className={n === travelers ? 'w-9 h-9 rounded-md bg-zinc-900 text-white text-sm font-bold' : 'w-9 h-9 rounded-md bg-zinc-100 text-sm font-medium'}>{n}{n === 4 ? '+' : ''}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">03 — When <Calendar size={12} className="inline" /></p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {MONTHS.map((m) => (
                      <button key={m} onClick={() => setMonth(m)} className={m === month ? 'px-2.5 py-1.5 rounded-md bg-zinc-900 text-white text-xs font-semibold' : 'px-2.5 py-1.5 rounded-md bg-zinc-100 text-xs font-medium'}>{m}</button>
                    ))}
                  </div>
                  <div className="mt-5 space-y-2 text-sm">
                    <p className="flex gap-2"><Check size={16} className="text-emerald-600 shrink-0" /> {dest.name}, {dest.country}</p>
                    <p className="flex gap-2"><Check size={16} className="text-emerald-600 shrink-0" /> {verdict.hunt ? 'Next: start the appointment hunt' : 'Next: build the itinerary'}</p>
                  </div>
                  <button onClick={() => navigate(visaLink(dest.country))} className="mt-4 w-full border border-zinc-300 font-semibold py-2.5 rounded-md text-sm hover:bg-zinc-50">
                    See {dest.country} visa details
                  </button>
                </div>
              </div>
            </section>

            <section className="mt-6 bg-[#001a41] text-white rounded-2xl overflow-hidden">
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-xs font-semibold tracking-widest uppercase text-amber-300 flex items-center gap-2"><Stamp size={14} /> Slot hunter</p>
                  <h3 className="mt-2 text-2xl md:text-3xl font-display font-black leading-tight">Need a visa? ScoutPass hunts the appointment, only then.</h3>
                  <p className="mt-2 text-white/70 leading-relaxed">We watch VFS Global, TLScontact and BLS across the US appointment cities, and we alert you the moment a slot opens. If no appointment can be secured, you get refunded.</p>
                </div>
                <div className="shrink-0 md:text-right">
                  <p className="text-4xl font-black text-amber-300">$67</p>
                  <p className="text-sm text-white/60">per applicant, to start the hunt</p>
                  <Link to="/pricing" className="inline-block mt-3 bg-white text-zinc-900 font-semibold px-5 py-2.5 rounded-md text-sm">See pricing</Link>
                </div>
              </div>
              <div className="border-t border-white/15 py-3 overflow-hidden whitespace-nowrap">
                <div className="ogt-board inline-flex gap-8 text-xs font-semibold tracking-widest text-white/60">
                  {[...BOARD, ...BOARD].map((b, i) => <span key={i}>{b} · CHECKING</span>)}
                </div>
              </div>
            </section>

            <section className="mt-16">
              <h2 className="text-3xl font-display font-black text-[#001a41]">Everything, in one app.</h2>
              <p className="mt-1 text-zinc-600 max-w-2xl">ScoutPass is the visa appointment niche. OGT is bigger: build the whole trip here, then check the visa inside the same trip.</p>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  ['Flights', '/flights', 'Houston to the world, added to your trip.'],
                  ['Stays: hotels and BnBs', '/stays', 'Hotels for short stays, apartments for longer ones.'],
                  ['Rental cars', '/cars', 'Pick up where you land.'],
                  ['Cruises', '/cruises', 'Mediterranean, Caribbean, Nile, Alaska.'],
                  ['Activities', '/activities', 'Tours and experiences for the city you pick.'],
                  ['Packages', '/packages', 'Curated trips with real prices from the site.'],
                  ['Visas — ScoutPass inside OGT', '/visas', 'The visa niche: file check plus appointment hunting at VFS, TLScontact and BLS, from $67.'],
                  ['My trip', '/trips', 'Everything you added, one checklist, one total.'],
                ].map(([label, path, desc]) => (
                  <button key={path + label} onClick={() => navigate(path)} className="text-left border border-zinc-200 rounded-2xl p-5 hover:shadow-md transition bg-white">
                    <span className="font-bold text-lg text-[#001a41]">{label}</span>
                    <span className="block mt-1 text-sm text-zinc-600 leading-relaxed">{desc}</span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">Open <ArrowRight size={14} /></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-4">
                <div>
                  <h2 className="text-3xl font-display font-black text-[#001a41]">Pick a place. Go.</h2>
                  <p className="mt-1 text-zinc-600">Real destinations from the site, not stock filler. Tap one and your planner updates.</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {regions.map((r) => (
                    <button key={r} onClick={() => setRegion(r)} className={r === region ? 'px-3 py-1.5 rounded-md bg-zinc-900 text-white text-sm font-semibold' : 'px-3 py-1.5 rounded-md border border-zinc-300 text-sm font-medium'}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grid.map((d, i) => (
                  <button key={d.id} onClick={() => { setDestId(d.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`text-left border border-zinc-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-0.5 transition bg-white ${i === 0 ? 'sm:col-span-2' : ''}`}>
                    <span className="block h-1.5 w-12 rounded-full" style={{ background: d.color }} />
                    <div className="mt-4 flex items-start justify-between gap-3">
                      <h3 className="font-display font-black text-2xl text-[#001a41] leading-none">{d.name}</h3>
                      <ArrowUpRight size={18} className="text-zinc-400 shrink-0" />
                    </div>
                    <p className="mt-2 text-sm text-zinc-500 flex items-center gap-1"><MapPin size={13} /> {d.country} · {d.region}</p>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{d.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-zinc-900">Start this trip <ArrowRight size={14} /></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-16 grid md:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">
              {[
                { n: '01', title: 'Tell us where', text: 'Destination, passport, dates. Thirty seconds, no account needed to see your first answer.' },
                { n: '02', title: 'We handle the hard part', text: 'Visa check, file review, and appointment hunting at VFS, TLScontact or BLS.' },
                { n: '03', title: 'You travel', text: 'Packages, itinerary and support in one place, from first check to departure.' },
              ].map((s) => (
                <div key={s.n} className="bg-white p-6">
                  <p className="font-display font-black text-4xl text-zinc-200">{s.n}</p>
                  <h3 className="mt-3 font-bold text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </section>

            <section className="mt-16">
              <h2 className="text-2xl font-display font-black text-[#001a41]">Questions people actually ask</h2>
              <div className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200">
                {[
                  ['Do you guarantee a visa?', 'No agency can guarantee a consulate decision. We guarantee the work: a clean file, the right appointment hunt, and a refund if no appointment can be secured.'],
                  ['What does the $67 cover?', 'The appointment hunt, per applicant. Visa fees charged by the consulate or center are separate.'],
                  ['Which countries do you cover?', 'All 27 Schengen countries, plus the UK, US and Canada, with appointments across US cities.'],
                  ['Can I just explore first?', 'Yes. Use the planner and the globe for free. You only start a paid step when you are ready.'],
                ].map(([q, a]) => (
                  <details key={q} className="py-4 group">
                    <summary className="font-semibold cursor-pointer list-none flex justify-between gap-4">{q}<span className="text-zinc-400">+</span></summary>
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-2xl">{a}</p>
                  </details>
                ))}
              </div>
              <p className="mt-4 text-xs text-zinc-500 flex items-center gap-1"><Clock size={12} /> Still stuck? <Link to="/contact" className="underline font-semibold">Talk to a human</Link></p>
            </section>
          </>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-500">
          <p className="font-bold text-[#001a41]">One Global Trip</p>
          <div className="flex flex-wrap gap-5">
            <Link to="/visas">Visas</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeApp;
