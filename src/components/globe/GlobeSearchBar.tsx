import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { globeDestinations } from '@/data/globeDestinations';
import { COUNTRY_REGIONS } from '@/data/countryRegions';
import type { SelectedDestination } from './DestinationCard';

const PLACEHOLDERS = [
  'Where\'s the next stop?',
  'Schengen visa from New York?',
  'UK visa requirements?',
  'India visa for US citizens?',
  'Indian OCI card?',
  'UAE visa from South America?',
];

const VISA_QUICK_LINKS = [
  { label: '🛂 Schengen from USA', path: '/schengen-visa' },
  { label: '🇬🇧 UK Visa', path: '/visas/short-stay/uk' },
  { label: '🇮🇳 India Visa', path: '/visas' },
  { label: '🪪 Indian OCI', path: '/visas' },
  { label: '✈️ UAE Visa', path: '/visas' },
  { label: '🌍 All Visas', path: '/visas' },
];

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

interface GlobeSearchBarProps {
  onSelectCity: (dest: SelectedDestination) => void;
}

const GlobeSearchBar = ({ onSelectCity }: GlobeSearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [phIdx, setPhIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle placeholder every 3.2s
  useEffect(() => {
    const t = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const q = query.trim().toLowerCase();

  // City results from globeDestinations
  const cityResults = q.length >= 1
    ? globeDestinations
        .filter((d) =>
          d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
        )
        .slice(0, 5)
    : [];

  // Country/region results from COUNTRY_REGIONS
  const regionResults = q.length >= 1
    ? Object.entries(COUNTRY_REGIONS)
        .flatMap(([countrySlug, regions]) =>
          regions
            .filter((r) => r.name.toLowerCase().includes(q) || countrySlug.includes(q))
            .map((r) => ({ ...r, countrySlug }))
        )
        .slice(0, 3)
    : [];

  // Visa service results
  const visaResults = q.length >= 1
    ? VISA_QUICK_LINKS.filter((v) => v.label.toLowerCase().includes(q))
    : [];

  const hasResults = cityResults.length > 0 || regionResults.length > 0 || visaResults.length > 0;
  const showDropdown = focused && (hasResults || q.length === 0);

  const handleCitySelect = (dest: typeof globeDestinations[0]) => {
    const sel: SelectedDestination = {
      type: 'city',
      name: dest.name,
      country: dest.country,
      countrySlug: toSlug(dest.country),
      citySlug: toSlug(dest.name),
      emoji: dest.emoji,
      description: dest.description,
      lat: dest.lat,
      lng: dest.lng,
    };
    setQuery('');
    setFocused(false);
    onSelectCity(sel);
  };

  const handleRegionSelect = (region: { name: string; slug: string; lat: number; lng: number; emoji: string; countrySlug: string }) => {
    setQuery('');
    setFocused(false);
    // Fly to region center — treat as a city selection
    const sel: SelectedDestination = {
      type: 'city',
      name: region.name,
      country: region.countrySlug.replace(/-/g, ' '),
      countrySlug: region.countrySlug,
      citySlug: region.slug,
      emoji: region.emoji,
      lat: region.lat,
      lng: region.lng,
    };
    onSelectCity(sel);
  };

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
      {/* Search input */}
      <div className="relative">
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-black/65 backdrop-blur-2xl border border-white/20 shadow-xl transition-all"
          style={{ boxShadow: focused ? '0 0 0 2px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.3)' }}
        >
          <Search size={16} className="text-white/40 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            className="flex-1 bg-transparent text-white text-sm placeholder-white/35 outline-none"
            placeholder={PLACEHOLDERS[phIdx]}
          />
          {query && (
            <button onClick={() => { setQuery(''); inputRef.current?.focus(); }} className="text-white/40 hover:text-white/70 transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute top-full mt-2 left-0 right-0 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/15 shadow-2xl overflow-hidden">
            {!hasResults && (
              <div className="px-4 py-5">
                <p className="text-white/30 text-xs text-center">Start typing a city, country, or visa type…</p>
              </div>
            )}

            {cityResults.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1.5 text-white/30 text-[10px] uppercase tracking-widest">Destinations</p>
                {cityResults.map((d) => (
                  <button
                    key={d.id}
                    onMouseDown={() => handleCitySelect(d)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/8 transition-colors text-left"
                  >
                    <span className="text-lg leading-none">{d.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium">{d.name}</p>
                      <p className="text-white/40 text-xs">{d.country}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {regionResults.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1.5 text-white/30 text-[10px] uppercase tracking-widest">Regions</p>
                {regionResults.map((r) => (
                  <button
                    key={r.slug}
                    onMouseDown={() => handleRegionSelect(r)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/8 transition-colors text-left"
                  >
                    <span className="text-lg leading-none">{r.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium">{r.name}</p>
                      <p className="text-white/40 text-xs">{r.countrySlug.replace(/-/g, ' ')}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {visaResults.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1.5 text-white/30 text-[10px] uppercase tracking-widest">Visa Services</p>
                {visaResults.map((v) => (
                  <button
                    key={v.path + v.label}
                    onMouseDown={() => { setFocused(false); navigate(v.path); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/8 transition-colors text-left"
                  >
                    <p className="text-white text-sm">{v.label}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visa quick-chip row */}
      {!focused && (
        <div className="flex gap-2 mt-2.5 overflow-x-auto scrollbar-hide pb-1">
          {VISA_QUICK_LINKS.map((chip) => (
            <button
              key={chip.label}
              onClick={() => navigate(chip.path)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-white/70 bg-black/50 backdrop-blur-xl border border-white/15 hover:bg-black/70 hover:text-white transition-all whitespace-nowrap"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}.scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}`}</style>
    </div>
  );
};

export default GlobeSearchBar;
