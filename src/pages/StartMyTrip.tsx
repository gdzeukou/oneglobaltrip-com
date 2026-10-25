import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import AiPlanner from '@/components/ogt/AiPlanner';

export default function StartMyTrip() {
  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Start my trip</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Start with words, finish with a trip.</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">No account needed to plan. Tell OGT what you want, get a draft, add flights, stays, cars, cruises and activities, and check the visa only if your trip needs one.</p>
      </section>
      <section className="mt-8">
        <AiPlanner />
      </section>
      <section className="mt-6 grid sm:grid-cols-3 gap-4">
        {[
          ['Flights', '/flights', 'Search and add a flight.'],
          ['Stays', '/stays', 'Hotel or BnB, your choice.'],
          ['My Trip', '/trips', 'Review everything in one place.'],
        ].map(([label, path, desc]) => (
          <Link key={path} to={path} className="border border-zinc-200 rounded-2xl p-5 hover:shadow-md bg-white">
            <span className="font-bold text-lg text-[#001a41] flex items-center justify-between">{label} <ArrowRight size={16} /></span>
            <span className="block mt-1 text-sm text-zinc-600">{desc}</span>
          </Link>
        ))}
      </section>
    </OgtPage>
  );
}
