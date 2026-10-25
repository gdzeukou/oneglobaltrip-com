import React from 'react';
import { Link } from 'react-router-dom';
import { OgtPage } from '@/components/ogt/OgtShell';
import { visaPricingData } from '@/data/visaPricing';
import { packages } from '@/data/packages';

export default function Pricing() {
  return (
    <OgtPage>
      <section className="pt-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-zinc-500">One Global Trip — Pricing</p>
        <h1 className="mt-3 font-display font-black text-4xl md:text-5xl text-[#001a41]">Travel first. Visa pricing, separate.</h1>
        <p className="mt-3 max-w-xl text-zinc-600 leading-relaxed">Travel modules are estimates until a concierge confirms the live price. Visa module pricing below comes from the site's own visa pricing data, and ScoutPass slot hunting is separate again.</p>
      </section>
      <section className="mt-8">
        <h2 className="font-bold text-xl">Packages, from the site</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.slice(0, 6).map((p) => (
            <Link key={p.id} to={`/packages/${p.id}`} className="border border-zinc-200 rounded-2xl p-5 hover:shadow-md bg-white">
              <p className="font-bold text-[#001a41]">{p.title}</p>
              <p className="text-sm text-zinc-500">{p.location} · {p.duration}</p>
              <p className="mt-2 font-black">${p.price.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <h2 className="font-bold text-xl">Visa module, separate from travel</h2>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div className="border border-zinc-200 rounded-2xl p-5">
            <p className="font-bold">ScoutPass slot hunt</p>
            <p className="text-sm text-zinc-600 mt-1">Appointment hunting at VFS, TLScontact or BLS. From $67 per applicant, refunded if no appointment can be secured.</p>
          </div>
          {[
            ['Schengen short-stay visa assistance', visaPricingData.schengenShortStay.totalPrice],
            ['UK visa assistance, 6-month', visaPricingData.ukVisa6Month.totalPrice],
            ['Canada entry', visaPricingData.canadaEntry.totalPrice],
            ['UAE visa', visaPricingData.uaeVisa.totalPrice],
          ].map(([label, price]) => (
            <div key={label} className="border border-zinc-200 rounded-2xl p-5 flex justify-between gap-3">
              <p className="font-bold">{label}</p>
              <p className="font-black shrink-0">{price}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-zinc-500">Visa prices are assistance totals from the site's data, consular and center fees included as listed there. They are not travel prices, and they do not change your flight or stay estimate.</p>
      </section>
    </OgtPage>
  );
}
