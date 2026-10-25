import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';

export default function About() {
  return (
    <OgtPage>
      <section className="pt-10 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — About</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41] leading-tight">If Expedia, ChatGPT, Airbnb and Claude had a child, it would be OGT.</h1>
        <p className="mt-4 text-zinc-600 text-lg leading-relaxed">Expedia lets you book. ChatGPT and Claude let you plan in words. Airbnb lets you stay like a local. OGT puts all three in one trip, with one checklist, one total, and a human concierge to confirm live prices before you pay.</p>
        <p className="mt-3 text-zinc-600 leading-relaxed">ScoutPass is part of that story, not the story. ScoutPass is the visa appointment product inside One Global Trip. If your trip needs a visa, ScoutPass hunts the appointment. If it does not, you never see it. OGT itself is flights, stays, cars, cruises, activities and packages.</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/startmytrip" className="bg-zinc-900 text-white font-semibold px-5 py-2.5 rounded-md text-sm flex items-center gap-1">Start my trip <ArrowRight size={14} /></Link>
          <Link to="/services" className="border border-zinc-300 font-semibold px-5 py-2.5 rounded-md text-sm">See all services</Link>
        </div>
      </section>
    </OgtPage>
  );
}
