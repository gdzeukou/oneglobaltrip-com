import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';

const SCHENGEN = new Set(['France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Portugal', 'Greece']);

export default function Visas() {
  const [passport, setPassport] = useState('United States');
  const [dest, setDest] = useState('France');
  const isSchengen = SCHENGEN.has(dest);
  const needsVisa = isSchengen && passport !== 'France' && passport !== 'United States' && passport !== 'Canada';
  const isUk = dest === 'United Kingdom';
  return (
    <OgtPage>
      <section className="pt-10 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Visa check, only if you need it</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Do I need a visa for this trip?</h1>
        <p className="mt-3 text-zinc-600 leading-relaxed">Visa is not the product here. It is one checkbox in your trip, only when your passport and destination require it. When it is required, ScoutPass handles it. OGT handles everything else.</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <label className="text-sm font-semibold">Your passport
            <select value={passport} onChange={(e) => setPassport(e.target.value)} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm font-normal">
              {['United States', 'Cameroon', 'France', 'Canada', 'Other'].map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold">Destination
            <select value={dest} onChange={(e) => setDest(e.target.value)} className="mt-1 w-full border border-zinc-300 rounded-md px-3 py-2.5 text-sm font-normal">
              {['France', 'Italy', 'Spain', 'Germany', 'United Kingdom', 'United States', 'Japan', 'United Arab Emirates'].map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-6 border border-zinc-200 rounded-2xl p-6">
          <p className="flex items-center gap-2 font-bold"><ShieldCheck size={18} className="text-emerald-600" /> {needsVisa ? 'Likely yes — add the visa step to your trip' : isUk ? 'Check ETA / visitor visa rules for your passport' : 'Likely no visa step for this combination'}</p>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed">Rules change. Always double-check with the official consulate before you travel. This is guidance, not a guarantee, and not a consulate decision.</p>
          {needsVisa && (
            <div className="mt-4 bg-[#001a41] text-white rounded-xl p-5">
              <p className="font-bold">ScoutPass takes it from here.</p>
              <p className="mt-1 text-sm text-white/70">ScoutPass is the visa appointment product inside One Global Trip: file check plus appointment hunting at VFS Global, TLScontact or BLS, from $67 per applicant, refunded if no appointment can be secured.</p>
              <Link to="/schengen-visa" className="inline-flex items-center gap-1 mt-3 bg-amber-300 text-zinc-900 font-bold px-4 py-2 rounded-md text-sm">Start the visa step <ArrowRight size={14} /></Link>
            </div>
          )}
          {!needsVisa && (
            <Link to="/trips" className="inline-flex items-center gap-1 mt-4 bg-zinc-900 text-white font-semibold px-4 py-2.5 rounded-md text-sm">Back to My Trip <ArrowRight size={14} /></Link>
          )}
        </div>
        <p className="mt-6 text-sm text-zinc-500">Detailed visa pages still exist below the surface: <Link to="/schengen-visa" className="underline">Schengen</Link>, <Link to="/visas/short-stay/uk" className="underline">UK</Link>, <Link to="/visas/pricing" className="underline">visa pricing</Link>. They are reference pages, not the home of OGT.</p>
      </section>
    </OgtPage>
  );
}
