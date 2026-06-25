import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import Map, { MapRef, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ArrowLeft, Plane, Building2, Car, Camera, FileText, Globe } from 'lucide-react';
import { globeDestinations } from '@/data/globeDestinations';
import FloatingMenu from '@/components/globe/FloatingMenu';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const TABS = [
  { id: 'flights',     icon: <Plane size={16} />,     label: 'Flights' },
  { id: 'hotels',      icon: <Building2 size={16} />, label: 'Hotels' },
  { id: 'rentals',     icon: <Car size={16} />,       label: 'Rentals' },
  { id: 'tourist',     icon: <Camera size={16} />,    label: 'Tourist' },
  { id: 'visa',        icon: <FileText size={16} />,  label: 'Visa' },
  { id: 'immigration', icon: <Globe size={16} />,     label: 'Immigration' },
  { id: 'live',        icon: <Building2 size={16} />, label: 'Live There' },
];

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const Destination = () => {
  const { country = '', city } = useParams<{ country: string; city?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const mapRef = useRef<MapRef>(null);

  const activeTab = searchParams.get('tab') || (city ? 'flights' : 'visa');

  // Find destination data
  const destData = city
    ? globeDestinations.find((d) => toSlug(d.name) === city)
    : globeDestinations.find((d) => toSlug(d.country) === country);

  const center = destData
    ? { longitude: destData.lng, latitude: destData.lat }
    : { longitude: 0, latitude: 20 };

  const initialZoom = city ? 10 : 4.5;

  useEffect(() => {
    if (destData) {
      setTimeout(() => {
        mapRef.current?.flyTo({
          center: [destData.lng, destData.lat],
          zoom: initialZoom,
          duration: 1500,
          essential: true,
        });
      }, 300);
    }
  }, [destData, initialZoom]);

  const displayName = destData
    ? city
      ? destData.name
      : destData.country
    : city || country;

  const emoji = destData?.emoji ?? '🌍';

  const availableTabs = city
    ? TABS.filter((t) => ['flights', 'hotels', 'rentals', 'tourist', 'visa'].includes(t.id))
    : TABS.filter((t) => ['visa', 'immigration', 'live'].includes(t.id));

  return (
    <div className="fixed inset-0 bg-black">
      {/* Map background */}
      {TOKEN && (
        <Map
          ref={mapRef}
          initialViewState={{ ...center, zoom: initialZoom }}
          mapboxAccessToken={TOKEN}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          style={{ width: '100%', height: '100%' }}
          fog={{
            color: 'rgb(186, 210, 235)',
            'high-color': 'rgb(100, 140, 200)',
            'horizon-blend': 0.08,
            'space-color': 'rgb(8, 10, 30)',
            'star-intensity': 0.5,
          }}
        >
          <NavigationControl
            position="bottom-right"
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              marginBottom: '24px',
              marginRight: '16px',
            }}
          />
        </Map>
      )}

      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white hover:bg-black/80 transition-all text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Globe
      </button>

      <FloatingMenu />

      {/* Info panel — bottom sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-2xl bg-black/90 backdrop-blur-2xl border-t border-white/10 rounded-t-3xl">
          {/* Handle */}
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mt-4 mb-2" />

          {/* Title */}
          <div className="px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emoji}</span>
              <h1 className="text-white text-xl font-bold">{displayName}</h1>
            </div>
            {destData?.description && (
              <p className="text-white/50 text-sm mt-1">{destData.description}</p>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 px-4 pb-2 overflow-x-auto scrollbar-hide">
            {availableTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="px-6 py-4 pb-8 min-h-[140px]">
            <TabContent tab={activeTab} destination={displayName} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent = ({ tab, destination }: { tab: string; destination: string }) => {
  const messages: Record<string, { title: string; body: string; cta: string }> = {
    flights: {
      title: `Flights to ${destination}`,
      body: 'Real-time flight search coming in 4 weeks. We\'ll connect to Amadeus & Skyscanner APIs to show you the best deals.',
      cta: 'Search Flights (Coming Soon)',
    },
    hotels: {
      title: `Hotels in ${destination}`,
      body: 'Browse and book hotels with our concierge service. Full hotel API integration coming soon.',
      cta: 'Browse Hotels (Coming Soon)',
    },
    rentals: {
      title: `Car Rentals in ${destination}`,
      body: 'Compare rental cars from top providers. API integration in progress.',
      cta: 'Compare Rentals (Coming Soon)',
    },
    tourist: {
      title: `Things to Do in ${destination}`,
      body: 'Discover top attractions, tours, and experiences. Powered by real traveler reviews.',
      cta: 'Explore Activities (Coming Soon)',
    },
    visa: {
      title: `Visa for ${destination}`,
      body: 'Check visa requirements, costs, and processing times. Start your application with a OneGlobalTrip concierge.',
      cta: 'Start Visa Process',
    },
    immigration: {
      title: `Immigration Info for ${destination}`,
      body: 'Long-stay visas, residency permits, and immigration pathways. Our team guides you through every step.',
      cta: 'Talk to Immigration Expert',
    },
    live: {
      title: `Living in ${destination}`,
      body: 'Cost of living, neighborhoods, schools, and relocation support. We help you make the move.',
      cta: 'Start Relocation Planning',
    },
  };

  const content = messages[tab] || messages.visa;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white font-semibold text-base">{content.title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{content.body}</p>
      <button className="self-start px-5 py-2.5 rounded-2xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all">
        {content.cta}
      </button>
    </div>
  );
};

export default Destination;
