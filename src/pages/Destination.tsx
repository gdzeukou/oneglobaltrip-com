import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import { globeDestinations } from '@/data/globeDestinations';
import { ALL_ITEMS, addToTrip } from '@/data/travelCatalog';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const SCHENGEN = new Set(['France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Portugal', 'Greece']);

export default function Destination() {
  const { country, city } = useParams();
  const dest = globeDestinations.find((d) => (city && slug(d.name) === city) || slug(d.country) === country) || globeDestinations[0];
  const items = ALL_ITEMS.filter((i) => i.city === dest.name);
  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500 flex items-center gap-1"><MapPin size={13} /> {dest.country} · {dest.region}</p>
        <h1 className="mt-3 font-display font-black text-5xl md:text-6xl text-[#001a41]">{dest.emoji} {dest.name}</h1>
        <p className="mt-3 max-w-xl text-zinc-600 text-lg leading-relaxed">{dest.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/flights" className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-semibold">Flights</Link>
          <Link to="/stays" className="border border-zinc-300 px-4 py-2 rounded-md text-sm font-semibold">Stays</Link>
          <Link to="/activities" className="border border-zinc-300 px-4 py-2 rounded-md text-sm font-semibold">Activities</Link>
          <Link to="/trips" className="border border-zinc-300 px-4 py-2 rounded-md text-sm font-semibold">My Trip</Link>
        </div>
      </section>
      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((i) => (
          <article key={i.id} className="border border-zinc-200 rounded-2xl p-5 bg-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{i.tag}</p>
            <h2 className="mt-2 font-bold">{i.title}</h2>
            <p className="mt-1 text-sm text-zinc-600">{i.detail}</p>
            <p className="mt-3 font-black">${i.fromPrice.toLocaleString()} <span className="text-sm font-medium text-zinc-500">{i.priceLabel}</span></p>
            <button onClick={() => addToTrip({ id: i.id, kind: i.tag, title: i.title, detail: i.detail, price: i.fromPrice })} className="mt-3 w-full bg-zinc-900 text-white font-semibold py-2.5 rounded-md text-sm">Add to trip</button>
          </article>
        ))}
      </section>
      {SCHENGEN.has(dest.country) ? (
        <section className="mt-8 border border-amber-200 bg-amber-50 rounded-2xl p-5 text-sm">
          <p className="font-bold">Visa, only if your passport needs it.</p>
          <p className="mt-1 text-zinc-600">This is a Schengen destination. If your passport needs a visa, ScoutPass handles the appointment hunt. Otherwise, skip this step and keep building your trip. <Link to="/visas" className="underline font-semibold inline-flex items-center gap-1">Check your visa <ArrowRight size={13} /></Link></p>
        </section>
      ) : (
        <section className="mt-8 border border-zinc-200 rounded-2xl p-5 text-sm">
          <p className="font-bold">Visa check, quick.</p>
          <p className="mt-1 text-zinc-600">Visa rules depend on your passport. Check in one minute, then come back to the trip. <Link to="/visas" className="underline font-semibold inline-flex items-center gap-1">Check your visa <ArrowRight size={13} /></Link></p>
        </section>
      )}
      <p className="mt-4 text-xs text-zinc-500">Prices are starting estimates. Final live price is confirmed before payment.</p>
    </OgtPage>
  );
}
