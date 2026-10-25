import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, ShoppingBag, X } from 'lucide-react';
import { loadTrip, removeFromTrip, type TripItem } from '@/data/travelCatalog';

export const MODULES = [
  { path: '/flights', label: 'Flights' },
  { path: '/stays', label: 'Stays' },
  { path: '/cars', label: 'Cars' },
  { path: '/cruises', label: 'Cruises' },
  { path: '/activities', label: 'Activities' },
  { path: '/packages', label: 'Packages' },
  { path: '/visas', label: 'Visas' },
];

export function OgtHeader() {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<TripItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setTrip(loadTrip());
    sync();
    window.addEventListener('ogt-trip-changed', sync);
    return () => window.removeEventListener('ogt-trip-changed', sync);
  }, []);

  const total = trip.reduce((s, t) => s + t.price, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-black tracking-tight text-lg text-[#001a41]">
          <span className="w-8 h-8 rounded-md bg-[#001a41] text-white grid place-items-center"><Plane size={16} /></span>
          One Global Trip
        </Link>
        <nav className="hidden lg:flex items-center gap-5 text-sm text-zinc-600">
          {MODULES.map((m) => (
            <Link key={m.path} to={m.path} className="hover:text-zinc-900">{m.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(!open)} className="relative flex items-center gap-2 border border-zinc-300 px-3 py-2 rounded-md text-sm font-semibold hover:bg-zinc-50">
            <ShoppingBag size={16} /> My trip
            {trip.length > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-300 text-zinc-900 text-xs grid place-items-center font-bold">{trip.length}</span>}
          </button>
          <Link to="/startmytrip" className="hidden sm:block bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-zinc-800">Start my trip</Link>
        </div>
      </div>
      <nav className="lg:hidden border-t border-zinc-100 px-4 py-2 flex gap-4 overflow-x-auto text-sm text-zinc-600">
        {MODULES.map((m) => (
          <Link key={m.path} to={m.path} className="shrink-0">{m.label}</Link>
        ))}
      </nav>
      {open && (
        <div className="border-t border-zinc-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            {trip.length === 0 ? (
              <p className="text-sm text-zinc-500">Your trip is empty. Add a flight, a stay, a car, a cruise or an activity, and it lands here.</p>
            ) : (
              <>
                {trip.map((t) => (
                  <div key={t.id} className="flex items-center justify-between gap-3 py-2 border-b border-zinc-100 last:border-0">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{t.title}</p>
                      <p className="text-xs text-zinc-500">{t.kind} · estimate ${t.price}</p>
                    </div>
                    <button onClick={() => setTrip(removeFromTrip(t.id))} className="text-zinc-400 hover:text-zinc-900"><X size={16} /></button>
                  </div>
                ))}
                <div className="flex items-center justify-between mt-3">
                  <p className="font-bold text-sm">Estimate total: ${total.toLocaleString()}</p>
                  <button onClick={() => { setOpen(false); navigate('/trips'); }} className="bg-zinc-900 text-white text-sm font-semibold px-4 py-2 rounded-md">Review my trip</button>
                </div>
                <p className="mt-2 text-xs text-zinc-500">Estimates only. Final live price is confirmed before you pay anything.</p>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function OgtFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="font-bold text-[#001a41]">One Global Trip</p>
        <p className="mt-1 text-sm text-zinc-500 max-w-xl">The full travel app. Flights, stays, cars, cruises, activities and packages. Visas are one module inside it, powered by ScoutPass for appointment hunting, not the whole company.</p>
        <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-500">
          <Link to="/flights">Flights</Link>
          <Link to="/stays">Stays</Link>
          <Link to="/cars">Cars</Link>
          <Link to="/cruises">Cruises</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/packages">Packages</Link>
          <Link to="/visas">Visas</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export function OgtPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans antialiased">
      <OgtHeader />
      <main className="max-w-6xl mx-auto px-4 pb-8">{children}</main>
      <OgtFooter />
    </div>
  );
}
