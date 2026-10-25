import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Plus, Search } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import { ALL_ITEMS, addToTrip, type TravelKind } from '@/data/travelCatalog';

const META: Record<TravelKind, { title: string; sub: string; cta: string }> = {
  flights: { title: 'Flights', sub: 'Houston to the world. Search a city, add the flight to your trip, get the live fare confirmed before you pay.', cta: 'Add flight to my trip' },
  stays: { title: 'Stays: hotels and BnBs', sub: 'Hotels for short stays, apartments and BnBs for longer ones. Same trip, same checkout flow.', cta: 'Add stay to my trip' },
  cars: { title: 'Rental cars', sub: 'Pick up where you land. Economy to SUV, insurance and mileage confirmed before you pay.', cta: 'Add car to my trip' },
  cruises: { title: 'Cruises', sub: 'Mediterranean, Caribbean, Nile, Alaska. Cabin and sailing dates confirmed before you pay.', cta: 'Add cruise to my trip' },
  activities: { title: 'Activities', sub: 'City experiences, tours and day trips, picked for the city you are actually going to.', cta: 'Add activity to my trip' },
};

export default function TravelModule({ kind }: { kind: TravelKind }) {
  const meta = META[kind];
  const [query, setQuery] = useState('');
  const [added, setAdded] = useState<string | null>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = ALL_ITEMS.filter((i) => i.kind === kind);
    if (!q) return base;
    return base.filter((i) => i.city.toLowerCase().includes(q) || i.country.toLowerCase().includes(q) || i.title.toLowerCase().includes(q));
  }, [kind, query]);

  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — {meta.title}</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41] leading-tight">{meta.title}</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">{meta.sub}</p>
        <div className="mt-6 relative max-w-xl">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a city or country..." className="w-full pl-9 pr-3 py-3 rounded-md border border-zinc-300 outline-none focus:ring-2 focus:ring-zinc-900 text-sm" />
        </div>
      </section>

      {items.length === 0 ? (
        <p className="mt-10 text-zinc-500">No match for that search. Try Paris, Tokyo, Dubai, Rome or London.</p>
      ) : (
        <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <article key={item.id} className="border border-zinc-200 rounded-2xl p-5 bg-white hover:shadow-md transition">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{item.tag} · {item.region}</p>
              <h2 className="mt-2 font-bold text-lg text-[#001a41] leading-snug">{item.title}</h2>
              <p className="mt-1 text-sm text-zinc-500 flex items-center gap-1"><MapPin size={13} /> {item.city}, {item.country}</p>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.detail}</p>
              <p className="mt-4 font-black text-lg">${item.fromPrice.toLocaleString()} <span className="text-sm font-medium text-zinc-500">{item.priceLabel}</span></p>
              <button
                onClick={() => { addToTrip({ id: item.id, kind: item.tag, title: item.title, detail: item.detail, price: item.fromPrice }); setAdded(item.id); }}
                className="mt-4 w-full bg-zinc-900 text-white font-semibold py-2.5 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-zinc-800"
              >
                <Plus size={16} /> {added === item.id ? 'Added to my trip' : meta.cta}
              </button>
            </article>
          ))}
        </section>
      )}

      <section className="mt-10 border border-zinc-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <h2 className="font-bold text-lg">Want a human to lock it in?</h2>
          <p className="mt-1 text-sm text-zinc-600">Your trip drawer holds everything you added. A concierge confirms the live price, then you pay. Nothing is charged from this page alone.</p>
        </div>
        <Link to="/trips" className="shrink-0 bg-amber-300 text-zinc-900 font-bold px-5 py-2.5 rounded-md text-sm flex items-center gap-2">Review my trip <ArrowRight size={16} /></Link>
      </section>
      <p className="mt-4 text-xs text-zinc-500">Prices on this page are starting estimates, not live fares. Final price, availability and cancellation terms are confirmed before payment.</p>
    </OgtPage>
  );
}
