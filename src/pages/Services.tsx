import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';

const SERVICES = [
  ['Flights', '/flights', 'Search, compare and add flights to one trip.'],
  ['Stays: hotels and BnBs', '/stays', 'Hotels for short stays, apartments for longer ones.'],
  ['Rental cars', '/cars', 'Pick up where you land.'],
  ['Cruises', '/cruises', 'Mediterranean, Caribbean, Nile, Alaska.'],
  ['Activities', '/activities', 'Tours and experiences for the city you pick.'],
  ['Curated packages', '/packages', 'Ready-made trips you can edit.'],
  ['AI trip planning', '/startmytrip', 'Tell OGT the trip in your own words, get a draft.'],
  ['My Trip', '/trips', 'Everything in one checklist and one total.'],
];

export default function Services() {
  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Services</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Everything for the trip, in one app.</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">Expedia for booking, Airbnb for stays, ChatGPT and Claude for planning, all in one place. That is the point of OGT.</p>
      </section>
      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map(([label, path, desc]) => (
          <Link key={path + label} to={path} className="border border-zinc-200 rounded-2xl p-5 hover:shadow-md bg-white">
            <span className="font-bold text-lg text-[#001a41] flex items-center justify-between">{label} <ArrowRight size={16} /></span>
            <span className="block mt-1 text-sm text-zinc-600 leading-relaxed">{desc}</span>
          </Link>
        ))}
      </section>
      <section className="mt-8 border border-zinc-200 rounded-2xl p-6">
        <p className="font-bold">And visa? Only if the trip needs it.</p>
        <p className="mt-1 text-sm text-zinc-600 leading-relaxed">Visa is the last item on this page, on purpose. If your passport and destination require a visa, ScoutPass handles the appointment hunt, from $67, refunded if no slot. OGT itself is travel, not visa. <Link to="/visas" className="underline font-semibold">Visa check</Link></p>
      </section>
    </OgtPage>
  );
}
