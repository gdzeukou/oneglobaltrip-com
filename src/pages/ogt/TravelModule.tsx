import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, MapPin, Plus, Search } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import { ALL_ITEMS, addToTrip, type TravelKind } from '@/data/travelCatalog';
import { supabase } from '@/integrations/supabase/client';

const META: Record<TravelKind, { title: string; sub: string; cta: string }> = {
  flights: { title: 'Flights', sub: 'Live search via the existing Supabase function agent-search-flights (Amadeus test API). If that function is not deployed or its keys are missing, you see estimates below instead, clearly labelled.', cta: 'Add flight to my trip' },
  stays: { title: 'Stays: hotels and BnBs', sub: 'Hotels for short stays, apartments and BnBs for longer ones. Live hotel search via the new ogt-hotel-search function (Amadeus), once deployed with the same Amadeus keys.', cta: 'Add stay to my trip' },
  cars: { title: 'Rental cars', sub: 'Pick up where you land. No rental API is connected in the repo yet, so these are estimates. A concierge confirms the live price before you pay.', cta: 'Add car to my trip' },
  cruises: { title: 'Cruises', sub: 'Mediterranean, Caribbean, Nile, Alaska. No cruise API is connected in the repo yet, so these are estimates. A concierge confirms cabin and sailing dates before you pay.', cta: 'Add cruise to my trip' },
  activities: { title: 'Activities', sub: 'City experiences, tours and day trips. Live search via the new ogt-activities-search function (Amadeus, by coordinates), once deployed.', cta: 'Add activity to my trip' },
};

const IATA: Record<string, string> = {
  Paris: 'CDG', London: 'LHR', Rome: 'FCO', Barcelona: 'BCN', Amsterdam: 'AMS', Madrid: 'MAD', Berlin: 'BER',
  Tokyo: 'HND', Dubai: 'DXB', Bangkok: 'BKK', Singapore: 'SIN', Mumbai: 'BOM', 'New Delhi': 'DEL',
  Cairo: 'CAI', 'Cape Town': 'CPT', Toronto: 'YYZ', 'New York': 'JFK', 'Los Angeles': 'LAX', Miami: 'MIA',
};

interface LiveFlight {
  itineraryId: string;
  carrierCodes: string[];
  flightNumbers: string[];
  depart?: string;
  arrive?: string;
  duration?: string;
  stops: number;
  total?: number;
  currency?: string;
}

export default function TravelModule({ kind }: { kind: TravelKind }) {
  const meta = META[kind];
  const [query, setQuery] = useState('');
  const [added, setAdded] = useState<string | null>(null);
  const [origin, setOrigin] = useState('IAH');
  const [destCity, setDestCity] = useState('Paris');
  const [departDate, setDepartDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-27');
  const [liveFlights, setLiveFlights] = useState<LiveFlight[] | null>(null);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [searching, setSearching] = useState(false);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = ALL_ITEMS.filter((i) => i.kind === kind);
    if (!q) return base;
    return base.filter((i) => i.city.toLowerCase().includes(q) || i.country.toLowerCase().includes(q) || i.title.toLowerCase().includes(q));
  }, [kind, query]);

  const searchLiveFlights = async () => {
    const destCode = IATA[destCity] || destCity;
    setSearching(true);
    setLiveError(null);
    setLiveFlights(null);
    try {
      const { data, error } = await supabase.functions.invoke('agent-search-flights', {
        body: { origin, destination: destCode, departDate, returnDate, pax: 1 },
      });
      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(String(data.error));
      setLiveFlights((data?.options || []) as LiveFlight[]);
    } catch (e) {
      setLiveError(e instanceof Error ? e.message : 'Live flight search failed');
    } finally {
      setSearching(false);
    }
  };

  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — {meta.title}</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41] leading-tight">{meta.title}</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">{meta.sub}</p>

        {kind === 'flights' && (
          <div className="mt-6 border border-zinc-200 rounded-2xl p-5 bg-zinc-50">
            <p className="font-bold text-sm">Live flight search — Amadeus via Supabase</p>
            <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="text-xs font-semibold">From (IATA)<input value={origin} onChange={(e) => setOrigin(e.target.value.toUpperCase())} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2 text-sm" /></label>
              <label className="text-xs font-semibold">To<select value={destCity} onChange={(e) => setDestCity(e.target.value)} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2 text-sm">{Object.keys(IATA).map((c) => <option key={c}>{c}</option>)}</select></label>
              <label className="text-xs font-semibold">Depart<input type="date" value={departDate} onChange={(e) => setDepartDate(e.target.value)} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2 text-sm" /></label>
              <label className="text-xs font-semibold">Return<input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2 text-sm" /></label>
              <button onClick={searchLiveFlights} disabled={searching} className="self-end bg-zinc-900 text-white font-semibold py-2.5 rounded-md text-sm flex items-center justify-center gap-2 disabled:opacity-50">
                {searching && <Loader2 size={16} className="animate-spin" />} Search live
              </button>
            </div>
            {liveError && <p className="mt-3 text-sm text-red-700">Live search unavailable: {liveError}. Estimates below still work, and a concierge can confirm the live fare.</p>}
            {liveFlights && liveFlights.length === 0 && <p className="mt-3 text-sm text-zinc-600">No live offers for that route and dates. Try other dates.</p>}
            {liveFlights && liveFlights.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Live offers — Amadeus test API, prices in {liveFlights[0].currency || 'USD'}</p>
                {liveFlights.slice(0, 6).map((f) => (
                  <div key={f.itineraryId} className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <p className="font-bold">{f.carrierCodes.join(', ')} · {f.flightNumbers.join(', ')}</p>
                      <p className="text-sm text-zinc-500">{f.depart || ''} → {f.arrive || ''} · {f.stops} stop{f.stops === 1 ? '' : 's'} · {f.duration || ''}</p>
                    </div>
                    <p className="font-black text-lg">${f.total?.toLocaleString()}</p>
                    <button onClick={() => { addToTrip({ id: `live-${f.itineraryId}`, kind: 'Flight', title: `${origin} → ${IATA[destCity] || destCity} · ${f.carrierCodes.join(', ')}`, detail: `${f.flightNumbers.join(', ')} · ${f.depart || ''} → ${f.arrive || ''}`, price: Math.round(f.total || 0) }); setAdded(f.itineraryId); }} className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md">
                      {added === f.itineraryId ? 'Added' : 'Add to trip'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-6 relative max-w-xl">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the estimate catalog by city or country..." className="w-full pl-9 pr-3 py-3 rounded-md border border-zinc-300 outline-none focus:ring-2 focus:ring-zinc-900 text-sm" />
        </div>
      </section>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-500">Estimate catalog — not live fares</p>
      {items.length === 0 ? (
        <p className="mt-4 text-zinc-500">No match for that search. Try Paris, Tokyo, Dubai, Rome or London.</p>
      ) : (
        <section className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <p className="mt-4 text-xs text-zinc-500">Prices in the estimate catalog are starting estimates, not live fares. Final price, availability and cancellation terms are confirmed before payment.</p>
    </OgtPage>
  );
}
