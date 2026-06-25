import React from 'react';
import { X, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { SelectedDestination } from './DestinationCard';

export interface SelectedRegion {
  name: string;
  emoji?: string;
  description?: string;
  countrySlug: string;
  countryName: string;
  mode: 'regions' | 'cities';
  schengenConsulate?: string;
  items: Array<{
    name: string;
    slug: string;
    lat: number;
    lng: number;
    emoji?: string;
    description?: string;
    cities?: Array<{ name: string; slug: string; lat: number; lng: number; emoji?: string }>;
    schengenConsulate?: string;
  }>;
}

interface RegionCardProps {
  region: SelectedRegion | null;
  onClose: () => void;
  onSelectCity: (dest: SelectedDestination) => void;
  onDrillDown: (item: SelectedRegion['items'][0]) => void;
}

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const RegionCard = ({ region, onClose, onSelectCity, onDrillDown }: RegionCardProps) => {
  const navigate = useNavigate();

  if (!region) return null;

  const handleCityPill = (city: { name: string; slug: string; lat: number; lng: number; emoji?: string }) => {
    const dest: SelectedDestination = {
      type: 'city',
      name: city.name,
      country: region.countryName,
      countrySlug: region.countrySlug,
      citySlug: city.slug || toSlug(city.name),
      emoji: city.emoji,
      lat: city.lat,
      lng: city.lng,
    };
    onSelectCity(dest);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-30" onClick={onClose} />

      <div
        className="fixed left-0 right-0 bottom-0 z-40"
        style={{ animation: 'slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <div className="mx-auto max-w-lg bg-black/92 backdrop-blur-2xl border border-white/15 rounded-t-3xl shadow-2xl">
          {/* Drag handle */}
          <div className="w-full flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {region.emoji && <span className="text-2xl">{region.emoji}</span>}
                  <div className="min-w-0">
                    <h2 className="text-white text-xl font-bold leading-tight truncate">{region.name}</h2>
                    <p className="text-white/45 text-sm">{region.countryName}</p>
                  </div>
                </div>
                {region.description && (
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">{region.description}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white transition-all flex-shrink-0 mt-1 ml-3"
              >
                <X size={15} />
              </button>
            </div>

            {/* Schengen consulate banner (US/Canada states only) */}
            {region.schengenConsulate && region.mode === 'cities' && (
              <button
                onClick={() => navigate('/schengen-visa')}
                className="w-full flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl bg-blue-500/10 border border-blue-400/25 mb-4 text-left hover:bg-blue-500/15 transition-colors"
              >
                <span className="text-base mt-0.5">🛂</span>
                <div className="min-w-0">
                  <p className="text-blue-300 text-xs font-semibold">Apply Schengen from {region.name} →</p>
                  <p className="text-white/35 text-[10px] mt-0.5 leading-relaxed">{region.schengenConsulate}</p>
                </div>
              </button>
            )}

            {/* Label */}
            <p className="text-white/30 text-[10px] uppercase tracking-widest mb-2">
              {region.mode === 'cities' ? 'Top Cities' : 'Regions'}
            </p>

            {/* Pills */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 mb-4">
              {region.items.map((item) => (
                <button
                  key={item.slug}
                  onClick={() => {
                    if (region.mode === 'cities') {
                      handleCityPill(item as any);
                    } else {
                      onDrillDown(item);
                    }
                  }}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/8 border border-white/15 hover:bg-white/14 hover:border-white/25 transition-all text-left"
                >
                  {item.emoji && <span className="text-base leading-none">{item.emoji}</span>}
                  <div>
                    <p className="text-white text-xs font-medium whitespace-nowrap">{item.name}</p>
                    {item.description && (
                      <p className="text-white/35 text-[10px] whitespace-nowrap hidden sm:block">{item.description}</p>
                    )}
                  </div>
                  {region.mode === 'regions' && item.cities && item.cities.length > 0 && (
                    <span className="text-white/25 text-[9px] ml-1">›</span>
                  )}
                </button>
              ))}
            </div>

            {/* Bottom row: visa link + agent CTA */}
            <div className="flex flex-col gap-2">
              {region.mode === 'regions' && (
                <button
                  onClick={() => navigate('/visas')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/6 border border-white/12 text-white/70 text-sm font-medium hover:bg-white/10 transition-all"
                >
                  🛂 Explore {region.name} visas →
                </button>
              )}
              <button
                onClick={() => navigate(`/concierge?destination=${toSlug(region.name)}`)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/20 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white text-sm font-semibold hover:from-blue-600/30 hover:to-purple-600/30 transition-all"
              >
                <Users size={15} />
                Let a dedicated OGT agent handle everything
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
};

export default RegionCard;
