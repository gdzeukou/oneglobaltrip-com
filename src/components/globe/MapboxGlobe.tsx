import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, { Marker, NavigationControl, MapRef, MapMouseEvent } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { globeDestinations } from '@/data/globeDestinations';
import DestinationCard, { SelectedDestination } from './DestinationCard';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const INITIAL_VIEW = { longitude: 10, latitude: 20, zoom: 1.8 };
const CITY_ZOOM_THRESHOLD = 4;

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const MapboxGlobe = () => {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW);
  const [selected, setSelected] = useState<SelectedDestination | null>(null);
  const [zoom, setZoom] = useState(INITIAL_VIEW.zoom);

  // Auto-locate user on mount
  useEffect(() => {
    const locate = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.latitude && data.longitude) {
          mapRef.current?.flyTo({
            center: [data.longitude, data.latitude],
            zoom: 3.5,
            duration: 2500,
            essential: true,
          });
        }
      } catch {
        // fallback: navigator
        navigator.geolocation?.getCurrentPosition((pos) => {
          mapRef.current?.flyTo({
            center: [pos.coords.longitude, pos.coords.latitude],
            zoom: 3.5,
            duration: 2000,
            essential: true,
          });
        });
      }
    };
    // Delay to let the globe render first
    const t = setTimeout(locate, 1200);
    return () => clearTimeout(t);
  }, []);

  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      // Check if click is on a city marker (handled by Marker onClick)
      // Here we handle country clicks via rendered features
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['country-label'],
      });

      if (features.length > 0) {
        const f = features[0];
        const countryName: string =
          (f.properties?.name_en as string) ||
          (f.properties?.name as string) ||
          '';
        if (!countryName) return;

        setSelected({
          type: 'country',
          name: countryName,
          countrySlug: toSlug(countryName),
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        });
      } else {
        setSelected(null);
      }
    },
    []
  );

  const handleCityClick = useCallback((dest: (typeof globeDestinations)[0]) => {
    setSelected({
      type: 'city',
      name: dest.name,
      country: dest.country,
      countrySlug: toSlug(dest.country),
      citySlug: toSlug(dest.name),
      emoji: dest.emoji,
      description: dest.description,
      lat: dest.lat,
      lng: dest.lng,
    });
    // Fly to city
    mapRef.current?.flyTo({
      center: [dest.lng, dest.lat],
      zoom: Math.max(zoom, 8),
      duration: 1200,
      essential: true,
    });
  }, [zoom]);

  const visibleCities = zoom >= CITY_ZOOM_THRESHOLD ? globeDestinations : globeDestinations.filter((d) => d.tier === 1);

  if (!TOKEN) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white gap-4 px-8 text-center">
        <span className="text-4xl">🌍</span>
        <h2 className="text-xl font-bold">Mapbox Token Required</h2>
        <p className="text-white/60 text-sm max-w-sm">
          Add <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">VITE_MAPBOX_TOKEN</code> to your{' '}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">.env</code> file.{' '}
          Get a free token at{' '}
          <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">
            mapbox.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(e) => {
          setViewState(e.viewState);
          setZoom(e.viewState.zoom);
        }}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        projection={{ name: 'globe' } as any}
        style={{ width: '100%', height: '100%' }}
        onClick={handleMapClick}
        cursor="crosshair"
        fog={{
          color: 'rgb(5, 10, 25)',
          'high-color': 'rgb(10, 20, 50)',
          'horizon-blend': 0.08,
          'space-color': 'rgb(3, 5, 15)',
          'star-intensity': 0.9,
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

        {/* City markers */}
        {visibleCities.map((dest) => (
          <Marker
            key={dest.id}
            longitude={dest.lng}
            latitude={dest.lat}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleCityClick(dest);
            }}
          >
            <CityPin
              emoji={dest.emoji}
              name={dest.name}
              tier={dest.tier}
              zoom={zoom}
              selected={selected?.name === dest.name}
            />
          </Marker>
        ))}
      </Map>

      <DestinationCard destination={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

const CityPin = ({
  emoji,
  name,
  tier,
  zoom,
  selected,
}: {
  emoji: string;
  name: string;
  tier: 1 | 2 | 3;
  zoom: number;
  selected: boolean;
}) => {
  const showLabel = zoom >= 3 || tier === 1;
  const size = tier === 1 ? 10 : tier === 2 ? 8 : 6;

  return (
    <div className="flex flex-col items-center cursor-pointer group" style={{ transform: 'translateY(-50%)' }}>
      <div
        className={`rounded-full border-2 transition-all duration-150 ${
          selected
            ? 'border-white bg-white scale-150'
            : 'border-white/80 bg-white/30 group-hover:scale-125 group-hover:bg-white/60'
        }`}
        style={{ width: size, height: size }}
      />
      {showLabel && (
        <span
          className={`mt-1 text-white text-[10px] font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] whitespace-nowrap leading-none ${
            selected ? 'text-white' : 'text-white/90'
          }`}
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.7)' }}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default MapboxGlobe;
