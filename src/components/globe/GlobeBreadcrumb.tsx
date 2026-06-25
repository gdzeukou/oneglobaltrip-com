import React from 'react';
import { ChevronRight, Globe } from 'lucide-react';
import { Continent } from '@/data/continents';

interface GlobeBreadcrumbProps {
  continent: Continent | null;
  countryName: string | null;
  countryEmoji?: string;
  regionName: string | null;
  regionEmoji?: string;
  onClickGlobe: () => void;
  onClickContinent: () => void;
  onClickCountry: () => void;
}

const GlobeBreadcrumb = ({
  continent,
  countryName,
  countryEmoji,
  regionName,
  regionEmoji,
  onClickGlobe,
  onClickContinent,
  onClickCountry,
}: GlobeBreadcrumbProps) => {
  if (!continent && !countryName) return null;

  return (
    <div className="fixed top-4 left-4 z-40 flex items-center gap-1 px-3 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-lg max-w-xs overflow-hidden">
      <button
        onClick={onClickGlobe}
        className="flex items-center gap-1 text-white/50 hover:text-white transition-colors text-xs font-medium shrink-0"
      >
        <Globe size={11} />
        <span>Globe</span>
      </button>

      {continent && (
        <>
          <ChevronRight size={10} className="text-white/25 shrink-0" />
          <button
            onClick={onClickContinent}
            className={`flex items-center gap-1 text-xs font-medium shrink-0 transition-colors ${
              !countryName ? 'text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            <span>{continent.emoji}</span>
            <span>{continent.name}</span>
          </button>
        </>
      )}

      {countryName && (
        <>
          <ChevronRight size={10} className="text-white/25 shrink-0" />
          <button
            onClick={onClickCountry}
            className={`flex items-center gap-1 text-xs font-medium shrink-0 transition-colors ${
              !regionName ? 'text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            {countryEmoji && <span>{countryEmoji}</span>}
            <span className="truncate max-w-[80px]">{countryName}</span>
          </button>
        </>
      )}

      {regionName && (
        <>
          <ChevronRight size={10} className="text-white/25 shrink-0" />
          <span className="flex items-center gap-1 text-white text-xs font-medium shrink-0">
            {regionEmoji && <span>{regionEmoji}</span>}
            <span className="truncate max-w-[70px]">{regionName}</span>
          </span>
        </>
      )}
    </div>
  );
};

export default GlobeBreadcrumb;
