import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Trash2 } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import { clearTrip, loadTrip, removeFromTrip, type TripItem } from '@/data/travelCatalog';

export default function MyTrip() {
  const [trip, setTrip] = useState<TripItem[]>([]);
  useEffect(() => { setTrip(loadTrip()); }, []);
  const total = trip.reduce((s, t) => s + t.price, 0);
  const kinds = new Set(trip.map((t) => t.kind.toLowerCase()));

  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — My trip</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Your trip, in one place.</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">Flights, stays, cars, cruises, activities and visas all land here. Add from any module, review here, then let a concierge confirm the live prices.</p>
      </section>

      {trip.length === 0 ? (
        <section className="mt-10 border border-zinc-200 rounded-2xl p-8 text-center">
          <p className="font-bold text-lg">Nothing in your trip yet.</p>
          <p className="mt-1 text-sm text-zinc-600">Start with a flight or a stay, then come back here.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link to="/flights" className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-semibold">Browse flights</Link>
            <Link to="/stays" className="border border-zinc-300 px-4 py-2 rounded-md text-sm font-semibold">Browse stays</Link>
            <Link to="/packages" className="border border-zinc-300 px-4 py-2 rounded-md text-sm font-semibold">Browse packages</Link>
          </div>
        </section>
      ) : (
        <>
          <section className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="border border-zinc-200 rounded-2xl p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Trip checklist</p>
              {[
                ['Flight added', kinds.has('flight')],
                ['Stay added', kinds.has('hotel') || kinds.has('bnb')],
                ['Car, cruise or activity added', kinds.has('rental') || kinds.has('cruise') || kinds.has('activity')],
              ].map(([label, done]) => (
                <p key={label as string} className="mt-3 flex gap-2 text-sm"><Check size={16} className={done ? 'text-emerald-600' : 'text-zinc-300'} /> {label}</p>
              ))}
              <p className="mt-3 text-sm text-zinc-500">Visa check lives on the home planner and on /visas. ScoutPass is the appointment-hunting module inside OGT, not a separate trip.</p>
            </div>
            <div className="md:col-span-2 border border-zinc-200 rounded-2xl p-5">
              {trip.map((t) => (
                <div key={t.id} className="flex items-start justify-between gap-3 py-3 border-b border-zinc-100 last:border-0">
                  <div>
                    <p className="font-semibold">{t.title}</p>
                    <p className="text-sm text-zinc-500">{t.kind} · estimate ${t.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => setTrip(removeFromTrip(t.id))} className="text-zinc-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              ))}
              <div className="flex items-center justify-between mt-4">
                <p className="font-black text-lg">Estimate total: ${total.toLocaleString()}</p>
                <button onClick={() => { clearTrip(); setTrip([]); }} className="text-sm font-semibold text-zinc-500 underline">Clear trip</button>
              </div>
            </div>
          </section>
          <section className="mt-6 bg-[#001a41] text-white rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h2 className="font-bold text-lg">Ready to lock it in?</h2>
              <p className="mt-1 text-sm text-white/70">Send this trip to a concierge. They confirm live prices and availability, then you pay. Nothing here charges you.</p>
            </div>
            <div className="flex gap-2">
              <Link to="/startmytrip" className="bg-amber-300 text-zinc-900 font-bold px-5 py-2.5 rounded-md text-sm">Start my trip</Link>
              <Link to="/contact" className="bg-white/10 font-semibold px-5 py-2.5 rounded-md text-sm">Contact</Link>
            </div>
          </section>
          <p className="mt-4 text-xs text-zinc-500">Estimates only. Final live price, availability and cancellation terms are confirmed before payment.</p>
        </>
      )}
    </OgtPage>
  );
}
