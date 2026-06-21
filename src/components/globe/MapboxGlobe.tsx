import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, { Marker, NavigationControl, MapRef, MapMouseEvent, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { globeDestinations } from '@/data/globeDestinations';
import DestinationCard, { SelectedDestination } from './DestinationCard';
import ServiceChat, { ServiceType } from './ServiceChat';
import { useUserGlobeData } from '@/hooks/useUserGlobeData';
import { useTrip } from '@/hooks/useTrip';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSmartRequirements } from '@/hooks/useSmartRequirements';

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
  const [mapLoaded, setMapLoaded] = useState(false);
  const [chatService, setChatService] = useState<ServiceType | null>(null);

  const { saves, visited, recent, isSaved, isVisited, savePlace, unsavePlace, markVisited, unmarkVisited, trackRecent } =
    useUserGlobeData();
  const { stops, addStop, isInTrip } = useTrip();
  const { profile, updateProfile } = useUserProfile();

  const visaReqs = useSmartRequirements(
    selected?.countrySlug,
    profile,
    stops
  );

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
    const t = setTimeout(locate, 1200);
    return () => clearTimeout(t);
  }, []);

  // Country click → fly to country (no card). City click → card.
  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      const features = map.queryRenderedFeatures(e.point, {
        layers: ['country-label'],
      });

      if (features.length > 0) {
        // Fly into the country — city pins will appear at zoom 4+
        mapRef.current?.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: Math.max(zoom, 5),
          duration: 1400,
          essential: true,
        });
        setSelected(null);
      } else {
        setSelected(null);
      }
    },
    [zoom]
  );

  const handleCityClick = useCallback(
    (dest: (typeof globeDestinations)[0]) => {
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
      setSelected(sel);
      trackRecent(sel);
      mapRef.current?.flyTo({
        center: [dest.lng, dest.lat],
        zoom: Math.max(zoom, 8),
        duration: 1200,
        essential: true,
      });
    },
    [zoom, trackRecent]
  );

  const visitedSlugs = visited.map((v) => v.country_slug);

  const visibleCities =
    zoom >= CITY_ZOOM_THRESHOLD
      ? globeDestinations
      : globeDestinations.filter((d) => d.tier === 1);

  // Trip route GeoJSON
  const tripRouteGeoJSON = stops.length >= 2
    ? {
        type: 'Feature' as const,
        geometry: {
          type: 'LineString' as const,
          coordinates: stops.map((s) => [s.lng, s.lat]),
        },
      }
    : null;

  if (!TOKEN) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white gap-4 px-8 text-center">
        <span className="text-4xl">🌍</span>
        <h2 className="text-xl font-bold">Mapbox Token Required</h2>
        <p className="text-white/60 text-sm max-w-sm">
          Add{' '}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">VITE_MAPBOX_TOKEN</code>
          {' '}to your{' '}
          <code className="bg-white/10 px-1.5 py-0.5 rounded text-white/80">.env</code> file.
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
        onLoad={() => setMapLoaded(true)}
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

        {/* Visited country highlight layer */}
        {mapLoaded && visitedSlugs.length > 0 && (
          <Source
            id="visited-countries"
            type="vector"
            url="mapbox://mapbox.country-boundaries-v1"
          >
            <Layer
              id="visited-fill"
              type="fill"
              source-layer="country_boundaries"
              paint={{
                'fill-color': 'rgba(99, 202, 183, 0.25)',
                'fill-outline-color': 'rgba(99, 202, 183, 0.6)',
              }}
              filter={[
                'in',
                ['downcase', ['get', 'name_en']],
                ['literal', visited.map((v) => v.country.toLowerCase())],
              ]}
            />
          </Source>
        )}

        {/* Trip route polyline */}
        {mapLoaded && tripRouteGeoJSON && (
          <Source id="trip-route" type="geojson" data={tripRouteGeoJSON}>
            <Layer
              id="trip-route-line"
              type="line"
              paint={{
                'line-color': '#60a5fa',
                'line-width': 2,
                'line-dasharray': [2, 2],
                'line-opacity': 0.85,
              }}
            />
          </Source>
        )}

        {/* Trip stop numbered markers */}
        {stops.map((stop, idx) => (
          <Marker
            key={`trip-stop-${stop.id}`}
            longitude={stop.lng}
            latitude={stop.lat}
            anchor="center"
          >
            <div
              className="flex items-center justify-center rounded-full bg-blue-500 border-2 border-blue-300 text-white text-[10px] font-bold shadow-lg shadow-blue-500/50 cursor-default"
              style={{ width: 22, height: 22 }}
              title={stop.name}
            >
              {idx + 1}
            </div>
          </Marker>
        ))}

        {/* City markers */}
        {visibleCities.map((dest) => {
          const slug = toSlug(dest.name);
          const cSlug = toSlug(dest.country);
          const saved = isSaved(cSlug, slug);
          const recentlyViewed = recent.some((r) => r.city_slug === slug);
          const inTrip = isInTrip(slug);

          return (
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
                name={dest.name}
                tier={dest.tier}
                zoom={zoom}
                selected={selected?.name === dest.name}
                saved={saved}
                recent={recentlyViewed}
                inTrip={inTrip}
              />
            </Marker>
          );
        })}

        {/* Saved place markers (gold pins for cities not currently in visible list) */}
        {saves
          .filter((s) => s.type === 'city' && !visibleCities.find((d) => toSlug(d.name) === s.city_slug))
          .map((s) => (
            <Marker key={`save-${s.id}`} longitude={s.lng} latitude={s.lat} anchor="center">
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-amber-300 shadow-lg shadow-amber-500/50" />
                {zoom >= 4 && (
                  <span
                    className="mt-0.5 text-amber-300 text-[9px] font-semibold whitespace-nowrap"
                    style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                  >
                    {s.name}
                  </span>
                )}
              </div>
            </Marker>
          ))}
      </Map>

      {/* Destination card */}
      <DestinationCard
        destination={selected}
        onClose={() => setSelected(null)}
        isSaved={selected ? isSaved(selected.countrySlug, selected.citySlug) : false}
        isVisited={selected ? isVisited(selected.countrySlug) : false}
        isInTrip={selected ? isInTrip(selected.citySlug) : false}
        onSave={async () => {
          if (!selected) return;
          const saved = isSaved(selected.countrySlug, selected.citySlug);
          if (saved) {
            const s = saves.find(
              (x) => x.country_slug === selected.countrySlug && x.city_slug === (selected.citySlug ?? null)
            );
            if (s) unsavePlace(s.id);
          } else {
            await savePlace({
              type: selected.type,
              name: selected.name,
              country: selected.country ?? selected.name,
              country_slug: selected.countrySlug,
              city_slug: selected.citySlug,
              lat: selected.lat,
              lng: selected.lng,
              emoji: selected.emoji,
            });
          }
        }}
        onMarkVisited={async () => {
          if (!selected) return;
          const alreadyVisited = isVisited(selected.countrySlug);
          if (alreadyVisited) {
            const v = visited.find((x) => x.country_slug === selected.countrySlug);
            if (v) unmarkVisited(v.id);
          } else {
            await markVisited(selected.country ?? selected.name, selected.countrySlug);
          }
        }}
        onAddToTrip={async () => {
          if (!selected) return;
          await addStop({
            name: selected.name,
            country: selected.country,
            country_slug: selected.countrySlug,
            city_slug: selected.citySlug,
            lat: selected.lat,
            lng: selected.lng,
            emoji: selected.emoji,
          });
        }}
        onStartService={(service) => setChatService(service)}
        visaReqs={visaReqs}
        nationality={profile.nationality}
        onSetNationality={(code) => updateProfile({ nationality: code })}
      />

      {/* AI chat panel */}
      {chatService && selected && (
        <ServiceChat
          service={chatService}
          destination={selected}
          userProfile={profile}
          tripStops={stops}
          onClose={() => setChatService(null)}
        />
      )}
    </div>
  );
};

const CityPin = ({
  name,
  tier,
  zoom,
  selected,
  saved,
  recent,
  inTrip,
}: {
  name: string;
  tier: 1 | 2 | 3;
  zoom: number;
  selected: boolean;
  saved: boolean;
  recent: boolean;
  inTrip: boolean;
}) => {
  const showLabel = zoom >= 3 || tier === 1;
  const size = tier === 1 ? 10 : tier === 2 ? 8 : 6;

  const dotColor = inTrip
    ? 'border-blue-300 bg-blue-500 shadow-blue-500/50'
    : saved
    ? 'border-amber-300 bg-amber-400 shadow-amber-500/50'
    : recent
    ? 'border-blue-300/80 bg-blue-400/50'
    : 'border-white/80 bg-white/30 group-hover:bg-white/60';

  return (
    <div className="flex flex-col items-center cursor-pointer group" style={{ transform: 'translateY(-50%)' }}>
      <div
        className={`rounded-full border-2 transition-all duration-150 shadow-sm ${
          selected ? 'border-white bg-white scale-150' : `${dotColor} group-hover:scale-125`
        }`}
        style={{ width: size, height: size }}
      />
      {showLabel && (
        <span
          className={`mt-1 text-[10px] font-semibold whitespace-nowrap leading-none ${
            inTrip ? 'text-blue-300' : saved ? 'text-amber-300' : selected ? 'text-white' : 'text-white/90'
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
