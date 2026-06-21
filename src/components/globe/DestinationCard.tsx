import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plane, Building2, Car, Camera, FileText, Globe, Bookmark, BookmarkCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export interface SelectedDestination {
  type: 'country' | 'city';
  name: string;
  country?: string;
  countrySlug: string;
  citySlug?: string;
  emoji?: string;
  description?: string;
  lat: number;
  lng: number;
}

interface DestinationCardProps {
  destination: SelectedDestination | null;
  onClose: () => void;
  isSaved?: boolean;
  isVisited?: boolean;
  onSave?: () => Promise<void>;
  onMarkVisited?: () => Promise<void>;
}

const DestinationCard = ({
  destination,
  onClose,
  isSaved = false,
  isVisited = false,
  onSave,
  onMarkVisited,
}: DestinationCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!destination) return;
    const handle = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [destination, onClose]);

  if (!destination) return null;

  const goTo = (tab: string) => {
    const base =
      destination.citySlug
        ? `/destination/${destination.countrySlug}/${destination.citySlug}`
        : `/destination/${destination.countrySlug}`;
    navigate(`${base}?tab=${tab}`);
    onClose();
  };

  const isCity = destination.type === 'city';

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />

      <div
        ref={cardRef}
        className="fixed bottom-0 left-0 right-0 z-40"
        style={{ animation: 'slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <div className="mx-auto max-w-lg bg-black/90 backdrop-blur-2xl border border-white/15 rounded-t-3xl px-6 pt-5 pb-8 shadow-2xl">
          {/* Drag handle */}
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                {destination.emoji && <span className="text-2xl">{destination.emoji}</span>}
                <h2 className="text-white text-xl font-bold truncate">{destination.name}</h2>
              </div>
              {isCity && destination.country && (
                <p className="text-white/50 text-sm">{destination.country}</p>
              )}
              {destination.description && (
                <p className="text-white/55 text-xs mt-1.5 leading-relaxed line-clamp-2">
                  {destination.description}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-all flex-shrink-0 mt-1 ml-3"
            >
              <X size={15} />
            </button>
          </div>

          {/* Save / Visited actions (logged-in only) */}
          {user && (
            <div className="flex gap-2 mb-4">
              <button
                onClick={onSave}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSaved
                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                    : 'bg-white/8 border-white/15 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {isSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={onMarkVisited}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isVisited
                    ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                    : 'bg-white/8 border-white/15 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <CheckCircle2 size={13} />
                {isVisited ? 'Visited' : 'Mark visited'}
              </button>
            </div>
          )}

          {/* Action buttons */}
          {isCity ? (
            <div className="grid grid-cols-5 gap-2">
              <ActionButton icon={<Plane size={18} />} label="Flights" onClick={() => goTo('flights')} />
              <ActionButton icon={<Building2 size={18} />} label="Hotels" onClick={() => goTo('hotels')} />
              <ActionButton icon={<Car size={18} />} label="Rentals" onClick={() => goTo('rentals')} />
              <ActionButton icon={<Camera size={18} />} label="Tourist" onClick={() => goTo('tourist')} />
              <ActionButton icon={<FileText size={18} />} label="Visa" onClick={() => goTo('visa')} />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              <ActionButton icon={<FileText size={18} />} label="Visa Info" onClick={() => goTo('visa')} wide />
              <ActionButton icon={<Globe size={18} />} label="Immigration" onClick={() => goTo('immigration')} wide />
              <ActionButton icon={<Building2 size={18} />} label="Live There" onClick={() => goTo('live')} wide />
            </div>
          )}

          <button
            onClick={() => goTo(isCity ? 'flights' : 'visa')}
            className="w-full mt-4 py-3 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
          >
            Explore {destination.name} →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);   opacity: 1; }
        }
      `}</style>
    </>
  );
};

const ActionButton = ({
  icon,
  label,
  onClick,
  wide,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  wide?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl bg-white/8 border border-white/10 text-white hover:bg-white/15 transition-all ${wide ? 'py-3.5' : ''}`}
  >
    <span className="text-white/70">{icon}</span>
    <span className="text-xs text-white/70 font-medium">{label}</span>
  </button>
);

export default DestinationCard;
