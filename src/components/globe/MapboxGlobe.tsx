import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, { Marker, MapRef, MapMouseEvent, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { globeDestinations } from '@/data/globeDestinations';
import DestinationCard, { SelectedDestination } from './DestinationCard';
import ServiceChat, { ServiceType } from './ServiceChat';
import GlobeBreadcrumb from './GlobeBreadcrumb';
import GlobeControls from './GlobeControls';
import { useUserGlobeData } from '@/hooks/useUserGlobeData';
import { useTrip } from '@/hooks/useTrip';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSmartRequirements } from '@/hooks/useSmartRequirements';
import { CONTINENTS, getContinentByCountry, Continent } from '@/data/continents';
import { COUNTRY_REGIONS } from '@/data/countryRegions';
import type { CountryRegion } from '@/data/countryRegions';
import RegionCard, { SelectedRegion } from './RegionCard';

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

const INITIAL_VIEW = { longitude: 10, latitude: 20, zoom: 1.8 };
const CITY_ZOOM_THRESHOLD = 4;
const REGION_ZOOM_THRESHOLD = 5;
const CONTINENT_ZOOM_MAX = 3;

const toSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Country emoji flags from ISO codes (best-effort lookup)
const COUNTRY_EMOJIS: Record<string, string> = {
  france: '🇫🇷', italy: '🇮🇹', spain: '🇪🇸', germany: '🇩🇪', 'united-kingdom': '🇬🇧',
  japan: '🇯🇵', usa: '🇺🇸', thailand: '🇹🇭', australia: '🇦🇺', brazil: '🇧🇷',
  canada: '🇨🇦', mexico: '🇲🇽', india: '🇮🇳', china: '🇨🇳', indonesia: '🇮🇩',
  portugal: '🇵🇹', greece: '🇬🇷', 'south-africa': '🇿🇦', kenya: '🇰🇪', morocco: '🇲🇦',
  'saudi-arabia': '🇸🇦', egypt: '🇪🇬', colombia: '🇨🇴', singapore: '🇸🇬', vietnam: '🇻🇳',
  'united-arab-emirates': '🇦🇪', 'south-korea': '🇰🇷', argentina: '🇦🇷', peru: '🇵🇪',
  chile: '🇨🇱', 'new-zealand': '🇳🇿', switzerland: '🇨🇭', netherlands: '🇳🇱',
  sweden: '🇸🇪', norway: '🇳🇴', denmark: '🇩🇰', austria: '🇦🇹', belgium: '🇧🇪',
  turkey: '🇹🇷', israel: '🇮🇱', jordan: '🇯🇴', qatar: '🇶🇦',
};

interface MapboxGlobeProps {
  onRegisterCityTrigger?: (fn: (dest: SelectedDestination) => void) => void;
}

const MapboxGlobe = ({ onRegisterCityTrigger }: MapboxGlobeProps = {}) => {
  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW);
  const [selected, setSelected] = useState<SelectedDestination | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion | null>(null);
  const [zoom, setZoom] = useState(INITIAL_VIEW.zoom);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [chatService, setChatService] = useState<ServiceType | null>(null);
  const [locating, setLocating] = useState(false);

  // Breadcrumb state
  const [activeContinent, setActiveContinent] = useState<Continent | null>(null);
  const [activeCountryName, setActiveCountryName] = useState<string | null>(null);
  const [activeCountrySlug, setActiveCountrySlug] = useState<string | null>(null);
  const [activeRegionName, setActiveRegionName] = useState<string | null>(null);
  const [activeRegionEmoji, setActiveRegionEmoji] = useState<string | undefined>(undefined);

  const { saves, visited, recent, isSaved, isVisited, savePlace, unsavePlace, markVisited, unmarkVisited, trackRecent } =
    useUserGlobeData();
  const { stops, addStop, isInTrip } = useTrip();
  const { profile, updateProfile } = useUserProfile();

  const visaReqs = useSmartRequirements(
    selected?.countrySlug,
    profile,
    stops
  );

  const flyTo = useCallback((lng: number, lat: number, z: number, duration = 1400) => {
    mapRef.current?.flyTo({ center: [lng, lat], zoom: z, duration, essential: true });
  }, []);

  const locateUser = useCallback(() => {
    setLocating(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        flyTo(pos.coords.longitude, pos.coords.latitude, 3.5, 2000);
        setLocating(false);
      },
      async () => {
        // Fall back to IP geolocation if user denies browser GPS
        try {
          const res = await fetch('https://ipapi.co/json/');
          const data = await res.json();
          if (data.latitude && data.longitude) {
            flyTo(data.longitude, data.latitude, 3, 2500);
          }
        } catch {
          // silent fail
        }
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }, [flyTo]);

  // Auto-locate on mount: GPS first, IP fallback
  useEffect(() => {
    const t = setTimeout(locateUser, 1200);
    return () => clearTimeout(t);
  }, [locateUser]);

  // Continent click
  const handleContinentClick = useCallback(
    (continent: Continent) => {
      setActiveContinent(continent);
      setActiveCountryName(null);
      setActiveCountrySlug(null);
      setActiveRegionName(null);
      setSelected(null);
      setSelectedRegion(null);
      flyTo(continent.center[0], continent.center[1], continent.zoom);
    },
    [flyTo]
  );

  // Country click → fly in, set breadcrumb
  const handleMapClick = useCallback(
    (e: MapMouseEvent) => {
      const map = mapRef.current?.getMap();
      if (!map) return;

      // Admin-1 detection for US/Canada states at zoom >= 5
      if (zoom >= REGION_ZOOM_THRESHOLD && (activeCountrySlug === 'usa' || activeCountrySlug === 'canada')) {
        const admin1 = map.queryRenderedFeatures(e.point, { layers: ['admin-1-label'] });
        if (admin1.length > 0) {
          const stateName = admin1[0].properties?.name_en as string | undefined;
          const stateEntry = stateName
            ? (COUNTRY_REGIONS[activeCountrySlug] ?? []).find(
                (r) => r.name.toLowerCase() === stateName.toLowerCase()
              )
            : undefined;
          if (stateEntry?.cities?.length) {
            setSelectedRegion({
              name: stateEntry.name,
              emoji: stateEntry.emoji,
              description: stateEntry.description,
              countrySlug: activeCountrySlug,
              countryName: activeCountrySlug === 'usa' ? 'United States' : 'Canada',
              items: stateEntry.cities!,
              mode: 'cities',
              schengenConsulate: stateEntry.schengenConsulate,
            });
            setSelected(null);
            flyTo(stateEntry.lng, stateEntry.lat, Math.max(zoom, 7), 1200);
            return;
          }
        }
      }

      const features = map.queryRenderedFeatures(e.point, {
        layers: ['country-label'],
      });

      if (features.length > 0) {
        const countryName = features[0].properties?.name_en as string | undefined;
        if (countryName) {
          const slug = toSlug(countryName);
          const continent = getContinentByCountry(slug) ?? activeContinent;
          setActiveContinent(continent ?? null);
          setActiveCountryName(countryName);
          setActiveCountrySlug(slug);
          setActiveRegionName(null);
          setActiveRegionEmoji(undefined);

          // Show region card for countries with regions (not USA/Canada — too many states)
          const regions = COUNTRY_REGIONS[slug] ?? [];
          if (regions.length > 0 && slug !== 'usa' && slug !== 'canada') {
            setSelectedRegion({
              name: countryName,
              emoji: COUNTRY_EMOJIS[slug],
              countrySlug: slug,
              countryName,
              items: regions,
              mode: 'regions',
            });
            setSelected(null);
          } else {
            setSelectedRegion(null);
            setSelected(null);
          }
        } else {
          setSelected(null);
        }
        flyTo(e.lngLat.lng, e.lngLat.lat, Math.max(zoom, 5));
      } else {
        setSelected(null);
        setSelectedRegion(null);
      }
    },
    [zoom, flyTo, activeContinent, activeCountrySlug]
  );

  // City pin click
  const handleCityClick = useCallback(
    (dest: (typeof globeDestinations)[0]) => {
      const countrySlug = toSlug(dest.country);
      const sel: SelectedDestination = {
        type: 'city',
        name: dest.name,
        country: dest.country,
        countrySlug,
        citySlug: toSlug(dest.name),
        emoji: dest.emoji,
        description: dest.description,
        lat: dest.lat,
        lng: dest.lng,
      };
      setSelected(sel);
      setSelectedRegion(null);
      trackRecent(sel);

      // Update breadcrumb to reflect this city's country
      if (!activeCountrySlug || activeCountrySlug !== countrySlug) {
        const continent = getContinentByCountry(countrySlug);
        setActiveContinent(continent ?? null);
        setActiveCountryName(dest.country);
        setActiveCountrySlug(countrySlug);
      }

      flyTo(dest.lng, dest.lat, Math.max(zoom, 8), 1200);
    },
    [zoom, flyTo, trackRecent, activeCountrySlug]
  );

  // External city select (from GlobeSearchBar)
  const handleExternalSelect = useCallback(
    (dest: SelectedDestination) => {
      setSelected(dest);
      setSelectedRegion(null);
      trackRecent(dest);
      const continent = getContinentByCountry(dest.countrySlug);
      setActiveContinent(continent ?? null);
      setActiveCountryName(dest.country);
      setActiveCountrySlug(dest.countrySlug);
      setActiveRegionName(null);
      flyTo(dest.lng, dest.lat, Math.max(zoom, 8), 1200);
    },
    [zoom, flyTo, trackRecent]
  );

  useEffect(() => {
    onRegisterCityTrigger?.(handleExternalSelect);
  }, [onRegisterCityTrigger, handleExternalSelect]);

  // Region marker click
  const handleRegionClick = useCallback(
    (region: CountryRegion) => {
      setActiveRegionName(region.name);
      setActiveRegionEmoji(region.emoji);
      setSelected(null);
      flyTo(region.lng, region.lat, Math.max(zoom, 7), 1200);
      if (region.cities?.length) {
        setSelectedRegion({
          name: region.name,
          emoji: region.emoji,
          description: region.description,
          countrySlug: activeCountrySlug ?? '',
          countryName: activeCountryName ?? '',
          items: region.cities!,
          mode: 'cities',
          schengenConsulate: region.schengenConsulate,
        });
      }
    },
    [zoom, flyTo, activeCountrySlug, activeCountryName]
  );

  // Breadcrumb back navigation
  const handleBreadcrumbGlobe = useCallback(() => {
    setActiveContinent(null);
    setActiveCountryName(null);
    setActiveCountrySlug(null);
    setActiveRegionName(null);
    setSelected(null);
    setSelectedRegion(null);
    flyTo(INITIAL_VIEW.longitude, INITIAL_VIEW.latitude, INITIAL_VIEW.zoom, 1800);
  }, [flyTo]);

  const handleBreadcrumbContinent = useCallback(() => {
    if (!activeContinent) return;
    setActiveCountryName(null);
    setActiveCountrySlug(null);
    setActiveRegionName(null);
    setSelected(null);
    setSelectedRegion(null);
    flyTo(activeContinent.center[0], activeContinent.center[1], activeContinent.zoom);
  }, [activeContinent, flyTo]);

  const handleBreadcrumbCountry = useCallback(() => {
    setActiveRegionName(null);
    setSelected(null);
    setSelectedRegion(null);
    // Find a representative city in the country to fly to
    const city = globeDestinations.find((d) => toSlug(d.country) === activeCountrySlug);
    if (city) flyTo(city.lng, city.lat, 5.5);
  }, [activeCountrySlug, flyTo]);

  const visitedSlugs = visited.map((v) => v.country_slug);

  const visibleCities =
    zoom >= CITY_ZOOM_THRESHOLD
      ? globeDestinations
      : globeDestinations.filter((d) => d.tier === 1);

  // Sub-regions for the currently active country
  const activeRegions = activeCountrySlug ? (COUNTRY_REGIONS[activeCountrySlug] ?? []) : [];

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
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        projection={{ name: 'globe' } as any}
        style={{ width: '100%', height: '100%' }}
        onClick={handleMapClick}
        cursor="crosshair"
        fog={{
          color: 'rgb(186, 210, 235)',
          'high-color': 'rgb(100, 140, 200)',
          'horizon-blend': 0.08,
          'space-color': 'rgb(8, 10, 30)',
          'star-intensity': 0.5,
        }}
      >
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
                'fill-color': 'rgba(99, 202, 183, 0.28)',
                'fill-outline-color': 'rgba(99, 202, 183, 0.7)',
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
                'line-color': '#3b82f6',
                'line-width': 2.5,
                'line-dasharray': [2, 2],
                'line-opacity': 0.9,
              }}
            />
          </Source>
        )}

        {/* Continent pill markers — only at low zoom */}
        {zoom < CONTINENT_ZOOM_MAX &&
          CONTINENTS.map((c) => (
            <Marker
              key={c.id}
              longitude={c.center[0]}
              latitude={c.center[1]}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleContinentClick(c);
              }}
            >
              <button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-white text-xs font-bold shadow-xl transition-all hover:scale-105 active:scale-95 select-none"
                style={{
                  background: `${c.color}cc`,
                  borderColor: `${c.color}80`,
                  backdropFilter: 'blur(8px)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  boxShadow: `0 4px 20px ${c.color}40`,
                }}
              >
                <span>{c.emoji}</span>
                <span>{c.name}</span>
              </button>
            </Marker>
          ))}

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

        {/* Sub-region markers — visible at zoom ≥ 5 when a country is active */}
        {zoom >= REGION_ZOOM_THRESHOLD &&
          activeRegions.map((region) => (
            <Marker
              key={`region-${region.slug}`}
              longitude={region.lng}
              latitude={region.lat}
              anchor="center"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                handleRegionClick(region);
              }}
            >
              <div className="flex flex-col items-center cursor-pointer group">
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/90 border border-white/60 shadow-md group-hover:bg-white transition-all group-hover:scale-105"
                  style={{ backdropFilter: 'blur(4px)' }}
                >
                  {region.emoji && <span className="text-sm leading-none">{region.emoji}</span>}
                  <span className="text-gray-800 text-[10px] font-semibold whitespace-nowrap">{region.name}</span>
                </div>
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

        {/* Saved place markers for cities not in the visible list */}
        {saves
          .filter((s) => s.type === 'city' && !visibleCities.find((d) => toSlug(d.name) === s.city_slug))
          .map((s) => (
            <Marker key={`save-${s.id}`} longitude={s.lng} latitude={s.lat} anchor="center">
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-amber-400 border-2 border-amber-300 shadow-lg shadow-amber-500/50" />
                {zoom >= 4 && (
                  <span
                    className="mt-0.5 text-amber-800 text-[9px] font-semibold whitespace-nowrap"
                    style={{ textShadow: '0 1px 4px rgba(255,255,255,0.9)' }}
                  >
                    {s.name}
                  </span>
                )}
              </div>
            </Marker>
          ))}
      </Map>

      {/* Breadcrumb navigation */}
      <GlobeBreadcrumb
        continent={activeContinent}
        countryName={activeCountryName}
        countryEmoji={activeCountrySlug ? COUNTRY_EMOJIS[activeCountrySlug] : undefined}
        regionName={activeRegionName}
        regionEmoji={activeRegionEmoji}
        onClickGlobe={handleBreadcrumbGlobe}
        onClickContinent={handleBreadcrumbContinent}
        onClickCountry={handleBreadcrumbCountry}
      />

      {/* Custom zoom + locate controls */}
      <GlobeControls
        onZoomIn={() => mapRef.current?.zoomIn()}
        onZoomOut={() => mapRef.current?.zoomOut()}
        onLocate={locateUser}
        locating={locating}
      />

      {/* Region / state card */}
      <RegionCard
        region={selectedRegion}
        onClose={() => setSelectedRegion(null)}
        onSelectCity={(dest) => {
          setSelected(dest);
          setSelectedRegion(null);
          trackRecent(dest);
          flyTo(dest.lng, dest.lat, Math.max(zoom, 8), 1200);
        }}
        onDrillDown={(item) => {
          flyTo(item.lng, item.lat, Math.max(zoom, 7), 1200);
          if (item.cities?.length) {
            setSelectedRegion((prev) =>
              prev
                ? {
                    ...prev,
                    items: item.cities!,
                    mode: 'cities',
                    name: item.name,
                    emoji: item.emoji,
                    description: item.description,
                    schengenConsulate: item.schengenConsulate,
                  }
                : null
            );
          } else {
            setSelectedRegion(null);
          }
        }}
      />

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
    : 'border-gray-800/60 bg-white/80 group-hover:bg-white';

  const labelColor = inTrip
    ? 'text-blue-700'
    : saved
    ? 'text-amber-700'
    : selected
    ? 'text-gray-900 font-bold'
    : 'text-gray-900';

  return (
    <div className="flex flex-col items-center cursor-pointer group" style={{ transform: 'translateY(-50%)' }}>
      <div
        className={`rounded-full border-2 transition-all duration-150 shadow-sm ${
          selected ? 'border-gray-800 bg-gray-900 scale-150' : `${dotColor} group-hover:scale-125`
        }`}
        style={{ width: size, height: size }}
      />
      {showLabel && (
        <span
          className={`mt-1 text-[10px] font-semibold whitespace-nowrap leading-none ${labelColor}`}
          style={{ textShadow: '0 1px 3px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.6)' }}
        >
          {name}
        </span>
      )}
    </div>
  );
};

export default MapboxGlobe;
