import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { globeDestinations } from '@/data/globeDestinations';
import { ALL_ITEMS, addToTrip, clearTrip } from '@/data/travelCatalog';

const SCHENGEN = new Set(['France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'Switzerland', 'Portugal', 'Greece']);

function parseTrip(text: string) {
  const lower = text.toLowerCase();
  const dest = globeDestinations.find((d) => lower.includes(d.name.toLowerCase()) || lower.includes(d.country.toLowerCase())) || globeDestinations[0];
  const daysMatch = lower.match(/(\d+)\s*(day|jour)/);
  const days = daysMatch ? Math.min(14, Math.max(2, parseInt(daysMatch[1], 10))) : 5;
  const budgetMatch = lower.match(/\$?\s*(\d{3,5})/);
  const budget = budgetMatch ? parseInt(budgetMatch[1], 10) : 2500;
  const style = lower.includes('romantic') || lower.includes('couple') ? 'romantic' : lower.includes('family') || lower.includes('kids') ? 'family' : lower.includes('luxury') ? 'luxury' : lower.includes('adventure') ? 'adventure' : 'culture';
  return { dest, days, budget, style };
}

export default function AiPlanner() {
  const [text, setText] = useState('Plan me 5 days in Paris, culture and food, under $2500');
  const [submitted, setSubmitted] = useState<string | null>(null);
  const plan = useMemo(() => submitted ? parseTrip(submitted) : null, [submitted]);

  const items = useMemo(() => {
    if (!plan) return [];
    const flight = ALL_ITEMS.find((i) => i.kind === 'flights' && i.city === plan.dest.name);
    const stay = ALL_ITEMS.find((i) => i.kind === 'stays' && i.city === plan.dest.name);
    const act = ALL_ITEMS.find((i) => i.kind === 'activities' && i.city === plan.dest.name);
    return [flight, stay, act].filter(Boolean) as typeof ALL_ITEMS;
  }, [plan]);

  const estimate = items.reduce((s, i) => s + i.fromPrice, 0);
  const stayTotal = (ALL_ITEMS.find((i) => i.kind === 'stays' && i.city === plan?.dest.name)?.fromPrice || 0) * Math.max(1, (plan?.days || 5) - 1);
  const total = estimate + stayTotal;

  const addPlan = () => {
    clearTrip();
    items.forEach((i) => addToTrip({ id: i.id, kind: i.tag, title: i.title, detail: i.detail, price: i.fromPrice }));
  };

  return (
    <div className="border border-zinc-200 rounded-2xl p-5 md:p-7 bg-white shadow-sm">
      <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-zinc-500"><Sparkles size={14} /> Ask OGT, like you would ask ChatGPT — but it books, like Expedia</p>
      <h2 className="mt-2 font-display font-black text-2xl text-[#001a41]">Tell me the trip, in your own words.</h2>
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 border border-zinc-300 rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-900" placeholder="Plan me 5 days in Tokyo, food and culture, under $3000" />
        <button onClick={() => setSubmitted(text)} className="bg-zinc-900 text-white font-semibold px-5 py-3 rounded-md text-sm">Plan it</button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {['Plan me 5 days in Paris, culture and food, under $2500', 'Romantic 4 days in Rome', 'Family 7 days in Dubai', 'Adventure 6 days in Tokyo'].map((s) => (
          <button key={s} onClick={() => { setText(s); setSubmitted(s); }} className="text-xs bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full font-medium">{s}</button>
        ))}
      </div>

      {plan && (
        <div className="mt-6 border-t border-zinc-200 pt-5">
          <p className="font-bold">Got it: {plan.days} days in {plan.dest.name}, {plan.dest.country}, {plan.style} style, around ${plan.budget.toLocaleString()}.</p>
          <p className="mt-1 text-sm text-zinc-600">{plan.dest.description} Here is a first draft, not a booking. You edit it, then a concierge confirms live prices.</p>
          <ol className="mt-4 space-y-2 text-sm">
            <li><b>Day 1:</b> Fly Houston → {plan.dest.name}, settle in, evening walk.</li>
            <li><b>Day 2:</b> Main city experience in {plan.dest.name}.</li>
            {plan.days > 3 && <li><b>Day 3–{plan.days - 1}:</b> Food, culture and a day trip, at your pace.</li>}
            <li><b>Day {plan.days}:</b> Last morning, fly home.</li>
          </ol>
          <div className="mt-4 space-y-2">
            {items.map((i) => (
              <p key={i.id} className="text-sm flex justify-between gap-3"><span>{i.title}</span><b>${i.fromPrice.toLocaleString()} {i.priceLabel}</b></p>
            ))}
            <p className="text-sm flex justify-between gap-3"><span>Stay, {Math.max(1, plan.days - 1)} nights (estimate)</span><b>${stayTotal.toLocaleString()}</b></p>
            <p className="font-black flex justify-between gap-3 border-t border-zinc-200 pt-2"><span>Draft total (estimate)</span><span>${total.toLocaleString()}</span></p>
          </div>
          {SCHENGEN.has(plan.dest.country) && (
            <p className="mt-4 text-sm bg-amber-50 border border-amber-200 rounded-xl p-3">Visa check, only because this trip might need one: if your passport needs a Schengen visa, ScoutPass handles the appointment hunt, from $67, refunded if no slot. It is an option in this trip, not the trip itself. <Link to="/visas" className="underline font-semibold">Check your visa</Link></p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={addPlan} className="bg-amber-300 text-zinc-900 font-bold px-5 py-2.5 rounded-md text-sm">Add this draft to My Trip</button>
            <Link to="/trips" className="border border-zinc-300 font-semibold px-5 py-2.5 rounded-md text-sm flex items-center gap-1">Review My Trip <ArrowRight size={14} /></Link>
          </div>
          <p className="mt-3 text-xs text-zinc-500">Estimates only. Final live price, availability and cancellation terms are confirmed before payment.</p>
        </div>
      )}
    </div>
  );
}
