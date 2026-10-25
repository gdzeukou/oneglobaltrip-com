import React, { lazy, Suspense, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Globe,
  MapPin,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { globeDestinations } from '@/data/globeDestinations';

const MapboxGlobe = lazy(() => import('@/components/globe/MapboxGlobe'));

const SCHENGEN = new Set([
  'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria',
  'Switzerland', 'Portugal', 'Greece', 'Czech Republic', 'Poland', 'Denmark',
  'Sweden', 'Norway', 'Finland', 'Hungary', 'Croatia', 'Slovenia', 'Slovakia',
  'Luxembourg', 'Malta', 'Estonia', 'Latvia', 'Lithuania', 'Iceland',
]);

const PASSPORTS = ['United States', 'Cameroon', 'France', 'Canada', 'Other'];
const MONTHS = ['Nov 2026', 'Dec 2026', 'Jan 2027', 'Feb 2027', 'Mar 2027', 'Flexible'];

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

  const stepsDone = [!!dest, !!passport, !!month].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#faf6ef] text-slate-900 font-sans">
      <header className="sticky top-0 z-40 bg-[#001a41] text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 font-black tracking-tight text-lg">
            <span className="w-9 h-9 rounded-full bg-amber-400 text-[#001a41] grid place-items-center"><Plane size={18} /></span>
            One Global Trip
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <Link to="/visas" className="hover:text-white">Visas</Link>
            <Link to="/packages" className="hover:text-white">Packages</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
            <button onClick={() => setView('globe')} className="hover:text-white">Globe</button>
          </nav>
          <Link to="/startmytrip" className="bg-amber-400 text-[#001a41] text-sm font-bold px-4 py-2 rounded-full hover:bg-amber-300">
            Start my trip
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        <section className="pt-10 md:pt-14">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-700">Visa + trip, in one place</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-black leading-[0.95] tracking-tight text-[#001a41]">
            Where to next?<br />We handle the visa.<br />You pack.
          </h1>
          <p className="mt-4 max-w-xl text-slate-600 text-lg">
            Pick a destination. We tell you straight away if you need a visa, if you need an appointment, and what to do first. No globe to decode, no guessing.
          </p>

          <div className="mt-6 flex gap-2">
            <button onClick={() => setView('planner')} className={view === 'planner' ? 'px-4 py-2 rounded-full bg-[#001a41] text-white text-sm font-bold' : 'px-4 py-2 rounded-full bg-white border text-sm font-bold'}>Trip planner</button>
            <button onClick={() => setView('globe')} className={view === 'globe' ? 'px-4 py-2 rounded-full bg-[#001a41] text-white text-sm font-bold' : 'px-4 py-2 rounded-full bg-white border text-sm font-bold'}>Explore the globe</button>
          </div>
        </section>

        {view === 'globe' ? (
          <section className="mt-8">
            <div className="relative h-[72vh] rounded-[28px] overflow-hidden bg-black shadow-xl">
              <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-white/60 text-sm">Loading globe...</div>}>
                <MapboxGlobe />
              </Suspense>
            </div>
            <p className="mt-3 text-sm text-slate-500">Tap a country, then a city. The globe is still here, it just stopped being the whole homepage.</p>
            <button onClick={() => setView('planner')} className="mt-3 text-sm font-bold text-blue-700 underline">Back to the planner</button>
          </section>
        ) : (
          <>
            <section className="mt-8 grid lg:grid-cols-[1.5fr_1fr] gap-5 items-start">
              <div className="bg-white rounded-[28px] border shadow-sm p-5 md:p-7">
                <div className="flex items-center justify-between">
                  <h2 className="font-black text-xl text-[#001a41]">Build your trip</h2>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">{stepsDone}/3 set</span>
                </div>

                <label className="block mt-6 text-xs font-bold uppercase tracking-wider text-slate-500">1. Where are you going?</label>
                <div className="mt-2 relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Paris, Tokyo, Dubai..." className="w-full pl-11 pr-4 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickPicks.map((d) => (
                    <button key={d.id} onClick={() => setDestId(d.id)} className={d.id === destId ? 'px-3 py-2 rounded-full bg-[#001a41] text-white text-sm font-bold' : 'px-3 py-2 rounded-full bg-slate-100 text-sm font-medium hover:bg-slate-200'}>
                      {d.emoji} {d.name}
                    </button>
                  ))}
                </div>

                <label className="block mt-7 text-xs font-bold uppercase tracking-wider text-slate-500">2. What passport do you travel on?</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PASSPORTS.map((p) => (
                    <button key={p} onClick={() => setPassport(p)} className={p === passport ? 'px-3 py-2 rounded-full bg-amber-400 text-[#001a41] text-sm font-bold' : 'px-3 py-2 rounded-full bg-slate-100 text-sm font-medium hover:bg-slate-200'}>{p}</button>
                  ))}
                </div>

                <div className="mt-7 grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500"><Calendar size={13} className="inline mr-1" /> When?</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {MONTHS.map((m) => (
                        <button key={m} onClick={() => setMonth(m)} className={m === month ? 'px-3 py-1.5 rounded-full bg-[#001a41] text-white text-xs font-bold' : 'px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium'}>{m}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500"><Users size={13} className="inline mr-1" /> Travelers</label>
                    <div className="mt-2 flex gap-2">
                      {[1, 2, 3, 4].map((n) => (
                        <button key={n} onClick={() => setTravelers(n)} className={n === travelers ? 'w-10 h-10 rounded-full bg-[#001a41] text-white font-bold' : 'w-10 h-10 rounded-full bg-slate-100 font-medium'}>{n}{n === 4 ? '+' : ''}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#001a41] text-white rounded-[28px] p-6 md:p-7 lg:sticky lg:top-24 shadow-xl">
                <p className="text-xs font-bold tracking-widest uppercase text-amber-300">Your trip, right now</p>
                <h3 className="mt-3 text-3xl font-black leading-tight">{dest.emoji} {dest.name}, {dest.country}</h3>
                <p className="mt-2 text-white/70">{dest.description}</p>
                <div className="mt-5 bg-white/10 rounded-2xl p-4">
                  <p className="flex items-center gap-2 font-bold"><ShieldCheck size={18} className="text-amber-300" /> {verdict.badge}</p>
                  <p className="mt-2 text-sm text-white/75 leading-relaxed">{verdict.detail}</p>
                  <p className="mt-3 text-xs text-white/50">Rules change. Always double-check with the official consulate before you travel. This is guidance, not a guarantee.</p>
                </div>
                <div className="mt-5 space-y-2 text-sm">
                  <p className="flex gap-2"><Check size={16} className="text-amber-300 shrink-0 mt-0.5" /> Destination picked: {dest.name}</p>
                  <p className="flex gap-2"><Check size={16} className="text-amber-300 shrink-0 mt-0.5" /> Passport: {passport} · {travelers} traveler{travelers > 1 ? 's' : ''} · {month}</p>
                  <p className="flex gap-2"><Check size={16} className="text-amber-300 shrink-0 mt-0.5" /> {verdict.hunt ? 'Next: start the appointment hunt' : 'Next: build the itinerary'}</p>
                </div>
                <button onClick={() => navigate(dest.ctaLink)} className="mt-6 w-full bg-amber-400 text-[#001a41] font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-amber-300">
                  Start this trip <ArrowRight size={18} />
                </button>
                <button onClick={() => navigate(visaLink(dest.country))} className="mt-2 w-full bg-white/10 font-bold py-3 rounded-2xl hover:bg-white/20">
                  See {dest.country} visa details
                </button>
              </div>
            </section>

            <section className="mt-6 bg-[#001a41] text-white rounded-[28px] p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <p className="text-xs font-bold tracking-widest uppercase text-amber-300 flex items-center gap-2"><Sparkles size={14} /> Slot hunter</p>
                <h3 className="mt-2 text-2xl md:text-3xl font-black leading-tight">No appointment available? We hunt it for you.</h3>
                <p className="mt-2 text-white/70">We watch VFS Global, TLScontact and BLS across the US appointment cities, and we alert you the moment a slot opens. If no appointment can be secured, you get refunded.</p>
              </div>
              <div className="md:text-right shrink-0">
                <p className="text-4xl font-black text-amber-300">$67</p>
                <p className="text-sm text-white/60">per applicant, to start the hunt</p>
                <Link to="/pricing" className="inline-block mt-3 bg-white text-[#001a41] font-bold px-5 py-2.5 rounded-full text-sm">See pricing</Link>
              </div>
            </section>

            <section className="mt-14">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-[#001a41]">Pick a place. Go.</h2>
                  <p className="mt-1 text-slate-600">Real destinations from the site, not stock filler. Tap one and your planner updates.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {regions.map((r) => (
                    <button key={r} onClick={() => setRegion(r)} className={r === region ? 'px-3 py-1.5 rounded-full bg-[#001a41] text-white text-sm font-bold' : 'px-3 py-1.5 rounded-full bg-white border text-sm font-medium'}>{r}</button>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grid.map((d) => (
                  <button key={d.id} onClick={() => { setDestId(d.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left bg-white rounded-[24px] border p-5 hover:shadow-lg hover:-translate-y-0.5 transition">
                    <span className="text-4xl">{d.emoji}</span>
                    <h3 className="mt-3 font-black text-lg text-[#001a41]">{d.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1"><MapPin size={13} /> {d.country} · {d.region}</p>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{d.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-700">Start this trip <ArrowRight size={14} /></span>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-14 grid md:grid-cols-3 gap-4">
              {[
                { icon: <MapPin size={20} />, title: '1. Tell us where', text: 'Destination, passport, dates. Thirty seconds, no account needed to see your first answer.' },
                { icon: <Clock size={20} />, title: '2. We handle the hard part', text: 'Visa check, file review, and appointment hunting at VFS, TLScontact or BLS.' },
                { icon: <Plane size={20} />, title: '3. You travel', text: 'Packages, itinerary and support in one place, from first check to departure.' },
              ].map((s) => (
                <div key={s.title} className="bg-white rounded-[24px] border p-6">
                  <span className="w-10 h-10 rounded-full bg-amber-100 text-[#001a41] grid place-items-center">{s.icon}</span>
                  <h3 className="mt-4 font-black text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </section>

            <section className="mt-14 bg-white rounded-[28px] border p-6 md:p-8">
              <h2 className="text-2xl font-black text-[#001a41]">Questions people actually ask</h2>
              <div className="mt-5 grid md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div><p className="font-bold">Do you guarantee a visa?</p><p className="mt-1 text-slate-600">No agency can guarantee a consulate decision. We guarantee the work: a clean file, the right appointment hunt, and a refund if no appointment can be secured.</p></div>
                <div><p className="font-bold">What does the $67 cover?</p><p className="mt-1 text-slate-600">The appointment hunt, per applicant. Visa fees charged by the consulate or center are separate.</p></div>
                <div><p className="font-bold">Which countries do you cover?</p><p className="mt-1 text-slate-600">All 27 Schengen countries, plus the UK, US and Canada, with appointments across US cities.</p></div>
                <div><p className="font-bold">Can I just explore first?</p><p className="mt-1 text-slate-600">Yes. Use the planner and the globe above for free. You only start a paid step when you are ready.</p></div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-slate-500">
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
