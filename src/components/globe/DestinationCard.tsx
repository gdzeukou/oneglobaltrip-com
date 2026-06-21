import React, { useEffect, useRef, useState } from 'react';
import {
  X, ChevronDown, Plane, Building2, Car, Camera, FileText, Globe,
  Bookmark, BookmarkCheck, CheckCircle2, PlusCircle, CheckCheck,
  AlertCircle, MapPin, Calendar,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  VISA_STATUS_LABELS, VISA_STATUS_COLORS, NATIONALITY_OPTIONS,
} from '@/data/visaRequirements';
import type { SmartRequirementsResult } from '@/hooks/useSmartRequirements';
import type { ServiceType } from './ServiceChat';

export interface SelectedDestination {
  type: 'city';
  name: string;
  country: string;
  countrySlug: string;
  citySlug: string;
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
  isInTrip?: boolean;
  onSave?: () => Promise<void>;
  onMarkVisited?: () => Promise<void>;
  onAddToTrip?: () => Promise<void>;
  onStartService?: (service: ServiceType) => void;
  visaReqs?: SmartRequirementsResult;
  nationality?: string;
  onSetNationality?: (code: string) => void;
}

type Tab = ServiceType;
const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'flights',     label: 'Flights',     icon: <Plane size={14} /> },
  { id: 'hotels',      label: 'Hotels',      icon: <Building2 size={14} /> },
  { id: 'rentals',     label: 'Rentals',     icon: <Car size={14} /> },
  { id: 'activities',  label: 'Activities',  icon: <Camera size={14} /> },
  { id: 'visa',        label: 'Visa',        icon: <FileText size={14} /> },
  { id: 'immigration', label: 'Immigration', icon: <Globe size={14} /> },
];

const DestinationCard = ({
  destination,
  onClose,
  isSaved = false,
  isVisited = false,
  isInTrip = false,
  onSave,
  onMarkVisited,
  onAddToTrip,
  onStartService,
  visaReqs,
  nationality,
  onSetNationality,
}: DestinationCardProps) => {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('flights');
  const [addingToTrip, setAddingToTrip] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!destination) return;
    setExpanded(false);
    setActiveTab('flights');
    const handle = (e: KeyboardEvent) => e.key === 'Escape' && (expanded ? setExpanded(false) : onClose());
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [destination, onClose]);

  // Reset expanded when destination changes
  useEffect(() => { setExpanded(false); }, [destination?.citySlug]);

  if (!destination) return null;

  const openTab = (tab: Tab) => {
    setActiveTab(tab);
    setExpanded(true);
  };

  const handleAddToTrip = async () => {
    if (!onAddToTrip) return;
    setAddingToTrip(true);
    try { await onAddToTrip(); } finally { setAddingToTrip(false); }
  };

  return (
    <>
      {/* Backdrop (only dimmed when expanded) */}
      {expanded && <div className="fixed inset-0 z-30" onClick={() => setExpanded(false)} />}
      {!expanded && <div className="fixed inset-0 z-30" onClick={onClose} />}

      <div
        ref={cardRef}
        className={`fixed left-0 right-0 bottom-0 z-40 transition-all duration-300 ease-out`}
        style={{ animation: 'slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)' }}
      >
        <div
          className={`mx-auto bg-black/92 backdrop-blur-2xl border border-white/15 shadow-2xl transition-all duration-300 ${
            expanded
              ? 'max-w-full rounded-t-3xl h-[85vh] flex flex-col'
              : 'max-w-lg rounded-t-3xl'
          }`}
        >
          {/* Drag handle */}
          <button
            onClick={() => expanded ? setExpanded(false) : setExpanded(true)}
            className="w-full flex justify-center pt-3 pb-1 cursor-pointer"
          >
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </button>

          {/* ── COLLAPSED STATE ── */}
          {!expanded && (
            <div className="px-5 pb-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {destination.emoji && <span className="text-xl">{destination.emoji}</span>}
                    <h2 className="text-white text-xl font-bold truncate">{destination.name}</h2>
                  </div>
                  <p className="text-white/50 text-sm">{destination.country}</p>
                  {destination.description && (
                    <p className="text-white/40 text-xs mt-1 leading-relaxed line-clamp-1">
                      {destination.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white transition-all flex-shrink-0 mt-1 ml-3"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Visa status badge */}
              {visaReqs && visaReqs.visaStatus !== 'unknown' && (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium mb-3 ${VISA_STATUS_COLORS[visaReqs.visaStatus]}`}>
                  <FileText size={11} />
                  {VISA_STATUS_LABELS[visaReqs.visaStatus]}
                  {visaReqs.visaInfo.maxStay && ` · ${visaReqs.visaInfo.maxStay}`}
                </div>
              )}

              {/* Action pills (logged-in) */}
              {user && (
                <div className="flex flex-wrap gap-2 mb-3">
                  <button
                    onClick={onSave}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isSaved
                        ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                        : 'bg-white/8 border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    {isSaved ? <BookmarkCheck size={12} /> : <Bookmark size={12} />}
                    {isSaved ? 'Saved' : 'Save'}
                  </button>

                  <button
                    onClick={onMarkVisited}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isVisited
                        ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-300'
                        : 'bg-white/8 border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 size={12} />
                    {isVisited ? 'Visited' : 'Mark visited'}
                  </button>

                  <button
                    onClick={handleAddToTrip}
                    disabled={addingToTrip}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      isInTrip
                        ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                        : 'bg-white/8 border-white/15 text-white/60 hover:text-white hover:border-blue-400/30'
                    }`}
                  >
                    {isInTrip ? <CheckCheck size={12} /> : <PlusCircle size={12} />}
                    {isInTrip ? 'In Trip' : 'Add to Trip'}
                  </button>
                </div>
              )}

              {/* Service tab row */}
              <div className="grid grid-cols-6 gap-1.5">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => openTab(tab.id)}
                    className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl bg-white/8 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all group"
                  >
                    <span className="text-white/50 group-hover:text-white/80 transition-colors">{tab.icon}</span>
                    <span className="text-white/50 text-[9px] font-medium group-hover:text-white/80 transition-colors leading-none">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Expand CTA */}
              <button
                onClick={() => setExpanded(true)}
                className="w-full mt-3 py-3 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all flex items-center justify-center gap-1.5"
              >
                Explore {destination.name}
                <ChevronDown size={15} className="rotate-180" />
              </button>
            </div>
          )}

          {/* ── EXPANDED STATE ── */}
          {expanded && (
            <>
              {/* Sticky expanded header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 flex-shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  {destination.emoji && <span className="text-lg">{destination.emoji}</span>}
                  <div className="min-w-0">
                    <h2 className="text-white font-bold truncate">{destination.name}</h2>
                    <p className="text-white/40 text-xs">{destination.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {user && !isInTrip && (
                    <button
                      onClick={handleAddToTrip}
                      disabled={addingToTrip}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border bg-white/8 border-white/15 text-white/60 hover:text-white transition-all"
                    >
                      <PlusCircle size={11} />
                      Add to Trip
                    </button>
                  )}
                  {isInTrip && (
                    <span className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border bg-blue-500/20 border-blue-400/40 text-blue-300">
                      <CheckCheck size={11} />
                      In Trip
                    </span>
                  )}
                  <button
                    onClick={() => setExpanded(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white transition-all"
                  >
                    <ChevronDown size={15} />
                  </button>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex gap-0 border-b border-white/10 overflow-x-auto scrollbar-hide flex-shrink-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium whitespace-nowrap border-b-2 transition-all ${
                      activeTab === tab.id
                        ? 'border-white text-white'
                        : 'border-transparent text-white/40 hover:text-white/70'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content (scrollable) */}
              <div className="flex-1 overflow-y-auto">
                <TabContent
                  tab={activeTab}
                  destination={destination}
                  visaReqs={visaReqs}
                  nationality={nationality}
                  onSetNationality={onSetNationality}
                  onStartService={() => onStartService?.(activeTab)}
                />
              </div>
            </>
          )}
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

/* ────────────────────────────────────────────────── */
/* Per-tab content                                    */
/* ────────────────────────────────────────────────── */
const TabContent = ({
  tab, destination, visaReqs, nationality, onSetNationality, onStartService,
}: {
  tab: Tab;
  destination: SelectedDestination;
  visaReqs?: SmartRequirementsResult;
  nationality?: string;
  onSetNationality?: (code: string) => void;
  onStartService: () => void;
}) => {
  switch (tab) {
    case 'flights':
      return (
        <ServicePanel
          icon={<Plane size={20} />}
          title="Find Flights"
          subtitle={`Fly to ${destination.name}`}
          items={[
            { icon: <MapPin size={14} />, label: 'From', value: 'Your home city (set in profile)' },
            { icon: <MapPin size={14} />, label: 'To', value: `${destination.name}, ${destination.country}` },
            { icon: <Calendar size={14} />, label: 'Typical price range', value: 'Varies by origin · starts from ~$200' },
          ]}
          tips={[
            'Book 6–8 weeks ahead for the best prices',
            'Tuesday/Wednesday departures are often cheaper',
            'Check Skyscanner, Google Flights, and Kayak for comparisons',
          ]}
          ctaLabel="Plan my flights with AI →"
          onCTA={onStartService}
        />
      );

    case 'hotels':
      return (
        <ServicePanel
          icon={<Building2 size={20} />}
          title="Find Hotels"
          subtitle={`Stay in ${destination.name}`}
          items={[
            { icon: <Building2 size={14} />, label: 'Budget', value: 'From ~$40/night (hostel) to $500+/night (luxury)' },
            { icon: <MapPin size={14} />, label: 'Best areas', value: 'City center, old town, or beachfront' },
            { icon: <Calendar size={14} />, label: 'Tip', value: 'Compare Booking.com, Airbnb, and Hotels.com' },
          ]}
          tips={[
            'Book refundable rates until you confirm your flights',
            'Check reviews from the past 6 months for accuracy',
            'Look for properties that include breakfast to save on meals',
          ]}
          ctaLabel="Find the perfect hotel with AI →"
          onCTA={onStartService}
        />
      );

    case 'rentals':
      return (
        <ServicePanel
          icon={<Car size={20} />}
          title="Car Rentals"
          subtitle={`Drive around ${destination.country}`}
          items={[
            { icon: <Car size={14} />, label: 'Economy', value: '~$25–50/day' },
            { icon: <Car size={14} />, label: 'SUV', value: '~$60–120/day' },
            { icon: <Car size={14} />, label: 'Luxury', value: '~$150+/day' },
          ]}
          tips={[
            'Check if your credit card includes rental insurance',
            'Book in advance — airport desks often cost more',
            'Ensure your drivers license is valid for this country (IDP may be needed)',
          ]}
          ctaLabel="Book a rental car with AI →"
          onCTA={onStartService}
        />
      );

    case 'activities':
      return (
        <ServicePanel
          icon={<Camera size={20} />}
          title="Activities & Experiences"
          subtitle={`Discover ${destination.name}`}
          items={[
            { icon: <Camera size={14} />, label: 'Culture', value: 'Museums, historical sites, local tours' },
            { icon: <Camera size={14} />, label: 'Adventure', value: 'Outdoor activities, sports, nature' },
            { icon: <Camera size={14} />, label: 'Food', value: 'Food tours, cooking classes, restaurants' },
          ]}
          tips={[
            'Book popular attractions in advance to skip queues',
            'Look for free walking tours — just tip your guide',
            'Check GetYourGuide and Viator for vetted experiences',
          ]}
          ctaLabel="Discover activities with AI →"
          onCTA={onStartService}
        />
      );

    case 'visa':
      return (
        <VisaPanel
          destination={destination}
          visaReqs={visaReqs}
          nationality={nationality}
          onSetNationality={onSetNationality}
          onStartService={onStartService}
        />
      );

    case 'immigration':
      return (
        <ServicePanel
          icon={<Globe size={20} />}
          title="Immigration & Long-Stay"
          subtitle={`Live or work in ${destination.country}`}
          items={[
            { icon: <Globe size={14} />, label: 'Work permit', value: 'Employer-sponsored or point-based' },
            { icon: <Globe size={14} />, label: 'Digital nomad', value: 'Remote worker visas available in many countries' },
            { icon: <Globe size={14} />, label: 'Permanent residency', value: 'Typically 2–5 years of lawful residence' },
          ]}
          tips={[
            'Start the immigration process 6–12 months before your planned move',
            'Consult a licensed immigration lawyer for complex cases',
            'Check if your country has a bilateral social security agreement',
          ]}
          ctaLabel="Explore immigration options with AI →"
          onCTA={onStartService}
        />
      );

    default:
      return null;
  }
};

const ServicePanel = ({
  icon, title, subtitle, items, tips, ctaLabel, onCTA,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items: { icon: React.ReactNode; label: string; value: string }[];
  tips: string[];
  ctaLabel: string;
  onCTA: () => void;
}) => (
  <div className="px-5 py-5 space-y-5">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/70">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="text-white/40 text-xs">{subtitle}</p>
      </div>
    </div>

    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5">
          <span className="text-white/30 mt-0.5 flex-shrink-0">{item.icon}</span>
          <div className="min-w-0">
            <p className="text-white/40 text-[10px] uppercase tracking-wider">{item.label}</p>
            <p className="text-white/80 text-sm">{item.value}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white/4 border border-white/8 rounded-xl p-3.5 space-y-2">
      <p className="text-white/30 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
        <AlertCircle size={10} /> Pro Tips
      </p>
      {tips.map((tip, i) => (
        <p key={i} className="text-white/60 text-xs leading-relaxed flex items-start gap-2">
          <span className="text-white/20 mt-0.5">•</span>
          {tip}
        </p>
      ))}
    </div>

    <button
      onClick={onCTA}
      className="w-full py-3.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
    >
      {ctaLabel}
    </button>
  </div>
);

const VisaPanel = ({
  destination, visaReqs, nationality, onSetNationality, onStartService,
}: {
  destination: SelectedDestination;
  visaReqs?: SmartRequirementsResult;
  nationality?: string;
  onSetNationality?: (code: string) => void;
  onStartService: () => void;
}) => {
  return (
    <div className="px-5 py-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-white/70">
          <FileText size={20} />
        </div>
        <div>
          <h3 className="text-white font-semibold">Visa & Entry Requirements</h3>
          <p className="text-white/40 text-xs">{destination.country}</p>
        </div>
      </div>

      {/* Nationality selector */}
      <div className="space-y-1.5">
        <p className="text-white/30 text-[10px] uppercase tracking-wider">Your Nationality</p>
        <select
          value={nationality ?? ''}
          onChange={(e) => onSetNationality?.(e.target.value)}
          className="w-full bg-white/8 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white appearance-none outline-none focus:border-white/30"
        >
          <option value="" className="bg-black">Select your passport…</option>
          {NATIONALITY_OPTIONS.map((n) => (
            <option key={n.code} value={n.code} className="bg-black">{n.label}</option>
          ))}
        </select>
      </div>

      {/* Visa status result */}
      {visaReqs && nationality && visaReqs.visaStatus !== 'unknown' && (
        <>
          <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border ${VISA_STATUS_COLORS[visaReqs.visaStatus]}`}>
            <div className="flex-1">
              <p className="font-semibold text-sm">{VISA_STATUS_LABELS[visaReqs.visaStatus]}</p>
              {visaReqs.visaInfo.maxStay && (
                <p className="text-xs opacity-80 mt-0.5">Up to {visaReqs.visaInfo.maxStay}</p>
              )}
            </div>
          </div>

          {visaReqs.visaInfo.fee && (
            <div className="grid grid-cols-2 gap-2">
              <InfoCell label="Fee" value={visaReqs.visaInfo.fee} />
              {visaReqs.visaInfo.processingTime && (
                <InfoCell label="Processing" value={visaReqs.visaInfo.processingTime} />
              )}
            </div>
          )}

          {visaReqs.alerts.length > 0 && (
            <div className="space-y-1.5">
              {visaReqs.alerts.map((alert, i) => (
                <p key={i} className="text-white/60 text-xs leading-relaxed flex items-start gap-2 bg-white/4 border border-white/8 rounded-xl px-3.5 py-2.5">
                  <AlertCircle size={12} className="text-white/30 flex-shrink-0 mt-0.5" />
                  {alert}
                </p>
              ))}
            </div>
          )}
        </>
      )}

      {nationality && visaReqs?.visaStatus === 'unknown' && (
        <div className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 text-white/50 text-sm">
          Requirements for your passport are not in our database yet. Ask our AI assistant for up-to-date information.
        </div>
      )}

      <button
        onClick={onStartService}
        className="w-full py-3.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all"
      >
        Get full visa guidance with AI →
      </button>
    </div>
  );
};

const InfoCell = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/5 border border-white/8 rounded-xl px-3.5 py-2.5">
    <p className="text-white/30 text-[10px] uppercase tracking-wider">{label}</p>
    <p className="text-white/80 text-sm font-medium mt-0.5">{value}</p>
  </div>
);

export default DestinationCard;
