import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Star } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import { categories, packages } from '@/data/packages';
import { addToTrip } from '@/data/travelCatalog';

export default function Packages() {
  const [cat, setCat] = useState('all');
  const [added, setAdded] = useState<string | null>(null);
  const list = cat === 'all' ? packages : packages.filter((p) => p.category === cat);
  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Packages</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Curated trips, ready to edit.</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">Start from a package, then add flights, stays or activities from My Trip. A package is a starting point, not a locked box.</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={c.id === cat ? 'px-3 py-1.5 rounded-md bg-zinc-900 text-white text-sm font-semibold' : 'px-3 py-1.5 rounded-md border border-zinc-300 text-sm font-medium'}>{c.name}</button>
          ))}
        </div>
      </section>
      <section className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((p) => (
          <article key={p.id} className="border border-zinc-200 rounded-2xl overflow-hidden bg-white hover:shadow-md transition">
            {p.image && <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1"><MapPin size={12} /> {p.location} · {p.duration}</p>
              <h2 className="mt-2 font-bold text-lg text-[#001a41] leading-snug">{p.title}</h2>
              <p className="mt-1 text-sm text-zinc-600 leading-relaxed">{p.description}</p>
              <p className="mt-2 text-sm text-zinc-500 flex items-center gap-1"><Star size={14} className="text-amber-500" /> {p.rating} · {p.reviews} reviews</p>
              <p className="mt-3 font-black text-lg">${p.price.toLocaleString()}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/packages/${p.id}`} className="flex-1 text-center border border-zinc-300 font-semibold py-2.5 rounded-md text-sm">Details</Link>
                <button onClick={() => { addToTrip({ id: `pkg-${p.id}`, kind: 'Package', title: p.title, detail: p.location, price: p.price }); setAdded(p.id); }} className="flex-1 bg-zinc-900 text-white font-semibold py-2.5 rounded-md text-sm flex items-center justify-center gap-1"><Plus size={14} /> {added === p.id ? 'Added' : 'Add to trip'}</button>
              </div>
            </div>
          </article>
        ))}
      </section>
      <p className="mt-4 text-xs text-zinc-500">Package prices come from the site's own packages data. Final live price and inclusions are confirmed before payment.</p>
    </OgtPage>
  );
}
