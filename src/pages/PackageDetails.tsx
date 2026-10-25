import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { OgtPage } from '@/components/ogt/OgtShell';
import { packages } from '@/data/packages';
import { addToTrip } from '@/data/travelCatalog';

export default function PackageDetails() {
  const { id } = useParams();
  const p = packages.find((x) => x.id === id) || packages[0];
  return (
    <OgtPage>
      <section className="pt-10 max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">{p.location} · {p.duration} · {p.category}</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">{p.title}</h1>
        {p.image && <img src={p.image} alt={p.title} className="mt-6 w-full h-72 object-cover rounded-2xl" />}
        <p className="mt-5 text-zinc-600 text-lg leading-relaxed">{p.description}</p>
        <p className="mt-3 text-sm text-zinc-500 flex items-center gap-1"><Star size={14} className="text-amber-500" /> {p.rating} · {p.reviews} reviews</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
          <div className="border border-zinc-200 rounded-2xl p-5"><p className="font-bold">Highlights</p><ul className="mt-2 space-y-1 text-zinc-600">{p.highlights.map((h) => <li key={h}>· {h}</li>)}</ul></div>
          <div className="border border-zinc-200 rounded-2xl p-5"><p className="font-bold">Included</p><ul className="mt-2 space-y-1 text-zinc-600">{p.included.map((h) => <li key={h}>· {h}</li>)}</ul></div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <p className="font-black text-2xl">${p.price.toLocaleString()}</p>
          <button onClick={() => addToTrip({ id: `pkg-${p.id}`, kind: 'Package', title: p.title, detail: p.location, price: p.price })} className="bg-zinc-900 text-white font-semibold px-5 py-2.5 rounded-md text-sm">Add to My Trip</button>
          <Link to="/trips" className="border border-zinc-300 font-semibold px-5 py-2.5 rounded-md text-sm flex items-center gap-1">Review My Trip <ArrowRight size={14} /></Link>
        </div>
        <p className="mt-3 text-xs text-zinc-500">Final live price and inclusions are confirmed before payment.</p>
      </section>
    </OgtPage>
  );
}
