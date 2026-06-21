import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Globe from 'react-globe.gl';
import { GlobeDestination, globeDestinations } from '@/data/globeDestinations';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, X, MapPin, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ZOOM_ALTITUDE = 0.8;
const DEFAULT_ALTITUDE = 2.5;
const FLY_MS = 1400;

// Altitude thresholds for tier visibility (like Apple/Google Maps zoom levels)
const TIER2_THRESHOLD = 1.8; // below this, show tier 1 + tier 2
const TIER3_THRESHOLD = 0.9; // below this, show all tiers

const InteractiveGlobe: React.FC = () => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef<(d: GlobeDestination) => void>(() => {});
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const [selected, setSelected] = useState<GlobeDestination | null>(null);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [altitude, setAltitude] = useState(DEFAULT_ALTITUDE);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const rafRef = useRef<number>(0);

  // Measure container
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Track altitude from camera changes → triggers tier-aware label updates
  useEffect(() => {
    if (!isReady || !globeRef.current) return;
    const controls = globeRef.current.controls();
    if (!controls) return;

    const handleChange = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (globeRef.current) {
          const pov = globeRef.current.pointOfView();
          if (pov?.altitude !== undefined) {
            setAltitude(pov.altitude);
          }
        }
      });
    };

    controls.addEventListener('change', handleChange);
    return () => {
      controls.removeEventListener('change', handleChange);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isReady]);

  const flyTo = useCallback((dest: GlobeDestination) => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView(
      { lat: dest.lat, lng: dest.lng, altitude: ZOOM_ALTITUDE },
      FLY_MS
    );
    const controls = globeRef.current.controls();
    if (controls) controls.autoRotate = false;
  }, []);

  const selectDest = useCallback(
    (dest: GlobeDestination) => {
      setSelected(dest);
      flyTo(dest);
      setQuery('');
      setSearchOpen(false);
    },
    [flyTo]
  );

  const clearSelected = useCallback(() => {
    setSelected(null);
    if (globeRef.current) {
      globeRef.current.pointOfView({ altitude: DEFAULT_ALTITUDE }, FLY_MS);
      const controls = globeRef.current.controls();
      if (controls) controls.autoRotate = true;
    }
  }, []);

  // Keep ref current so HTML elements can call latest handler
  onSelectRef.current = selectDest;

  const handleGlobeReady = useCallback(() => {
    setIsReady(true);
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.35;
      controls.enableZoom = true;
      controls.minDistance = 101;
      controls.maxDistance = 700;
      controls.enablePan = false;
      controls.zoomSpeed = 1.2;
    }
    globeRef.current.pointOfView({ altitude: DEFAULT_ALTITUDE }, 0);
  }, []);

  // Tier 1-only destinations for arcs (stable reference)
  const tier1Destinations = useMemo(
    () => globeDestinations.filter((d) => d.tier === 1),
    []
  );

  // Arcs data using tier-1 cities only
  const arcsData = useMemo(
    () =>
      tier1Destinations.slice(0, 10).map((d, i) => ({
        sLat: d.lat,
        sLng: d.lng,
        eLat: tier1Destinations[(i + 7) % tier1Destinations.length].lat,
        eLng: tier1Destinations[(i + 7) % tier1Destinations.length].lng,
      })),
    [tier1Destinations]
  );

  // Zoom-aware visible destinations (like Apple/Google Maps revealing detail as you zoom)
  const visibleDestinations = useMemo(() => {
    if (altitude >= TIER2_THRESHOLD) return globeDestinations.filter((d) => d.tier === 1);
    if (altitude >= TIER3_THRESHOLD) return globeDestinations.filter((d) => d.tier <= 2);
    return globeDestinations;
  }, [altitude]);

  // Build HTML label element per city — size varies by tier
  const getHtmlElement = useCallback((d: object) => {
    const dest = d as GlobeDestination;
    const isT1 = dest.tier === 1;
    const isT2 = dest.tier === 2;

    const dotSize = isT1 ? 9 : isT2 ? 7 : 5;
    const fontSize = isT1 ? '11.5px' : isT2 ? '10px' : '9px';
    const fontWeight = isT1 ? '600' : '500';
    const opacity = isT1 ? '1' : isT2 ? '0.85' : '0.7';

    const wrap = document.createElement('div');
    wrap.style.cssText = `display:flex;align-items:center;gap:${isT1 ? 5 : 3}px;cursor:pointer;pointer-events:all;user-select:none;opacity:${opacity};`;

    const dot = document.createElement('div');
    dot.style.cssText = `
      width:${dotSize}px;height:${dotSize}px;border-radius:50%;flex-shrink:0;
      background:white;
      box-shadow:0 0 0 2px rgba(255,255,255,0.3),0 0 ${isT1 ? 10 : 6}px rgba(255,255,255,${isT1 ? 0.6 : 0.3});
      transition:transform 0.15s;
    `;

    const label = document.createElement('span');
    label.textContent = dest.name;
    label.style.cssText = `
      color:white;font-size:${fontSize};font-weight:${fontWeight};
      font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      text-shadow:0 1px 4px rgba(0,0,0,0.9),0 0 8px rgba(0,0,0,0.7);
      white-space:nowrap;letter-spacing:0.01em;
    `;

    wrap.appendChild(dot);
    wrap.appendChild(label);

    wrap.addEventListener('mouseenter', () => {
      dot.style.transform = 'scale(1.5)';
      dot.style.boxShadow = `0 0 0 3px rgba(255,255,255,0.5),0 0 18px rgba(255,255,255,0.9)`;
      label.style.color = '#93c5fd';
    });
    wrap.addEventListener('mouseleave', () => {
      dot.style.transform = 'scale(1)';
      dot.style.boxShadow = `0 0 0 2px rgba(255,255,255,0.3),0 0 ${isT1 ? 10 : 6}px rgba(255,255,255,${isT1 ? 0.6 : 0.3})`;
      label.style.color = 'white';
    });
    wrap.addEventListener('click', () => onSelectRef.current(dest));

    return wrap;
  }, []);

  // Search results — sorted by tier (most prominent first), then by name match quality
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return globeDestinations.slice().sort((a, b) => a.tier - b.tier);

    return globeDestinations
      .filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        // Exact name match first
        const aExact = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bExact = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        if (aExact !== bExact) return aExact - bExact;
        // Then by tier
        return a.tier - b.tier;
      });
  }, [query]);

  const zoomLabel =
    altitude >= TIER2_THRESHOLD
      ? 'Zoom in to see more cities'
      : altitude >= TIER3_THRESHOLD
      ? 'Zoom in further for all cities'
      : null;

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black overflow-hidden">
      {/* Globe */}
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#1a56db"
          atmosphereAltitude={0.2}
          // City labels filtered by zoom level (Apple/Google Maps style)
          htmlElementsData={visibleDestinations}
          htmlElement={getHtmlElement}
          htmlAltitude={0.01}
          // Animated arcs between tier-1 cities
          arcsData={arcsData}
          arcStartLat={(d: object) => (d as any).sLat}
          arcStartLng={(d: object) => (d as any).sLng}
          arcEndLat={(d: object) => (d as any).eLat}
          arcEndLng={(d: object) => (d as any).eLng}
          arcColor={() => ['rgba(100,160,255,0.4)', 'rgba(100,160,255,0.05)']}
          arcDashLength={0.3}
          arcDashGap={0.7}
          arcDashAnimateTime={3500}
          arcAltitudeAutoScale={0.3}
          arcStroke={0.3}
          onGlobeReady={handleGlobeReady}
        />
      )}

      {/* ── Search bar overlay ── */}
      <div
        ref={searchRef}
        className="absolute top-5 left-1/2 -translate-x-1/2 z-30 w-[min(92vw,480px)]"
      >
        <div
          className={`flex items-center gap-3 bg-black/60 backdrop-blur-xl border rounded-2xl px-4 py-3 shadow-2xl transition-all duration-200 ${
            searchOpen
              ? 'border-white/30 shadow-white/5'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <Search className="h-4 w-4 text-white/50 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={() => setSearchOpen(true)}
            placeholder="Search cities, countries, regions…"
            className="flex-1 bg-transparent text-white text-sm placeholder:text-white/35 outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <ChevronDown
            className={`h-4 w-4 text-white/30 transition-transform duration-200 ${
              searchOpen ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Dropdown */}
        {searchOpen && (
          <div className="mt-2 bg-black/75 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-72 overflow-y-auto">
            {searchResults.length === 0 ? (
              <p className="text-white/40 text-sm text-center py-6">No destinations found</p>
            ) : (
              searchResults.slice(0, 40).map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => selectDest(dest)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/8 transition-colors text-left group"
                >
                  <span className="text-lg w-6 text-center">{dest.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-semibold leading-tight">{dest.name}</div>
                    <div className="text-white/45 text-xs mt-0.5">
                      {dest.country} · {dest.region}
                    </div>
                  </div>
                  <MapPin className="h-3.5 w-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Zoom-level indicator ── */}
      {isReady && !selected && zoomLabel && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm text-white/50 text-xs px-3 py-1 rounded-full border border-white/10 whitespace-nowrap">
            {zoomLabel}
          </div>
        </div>
      )}

      {/* ── Destination popup card (Apple Maps style bottom sheet) ── */}
      {selected && (
        <div className="absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-6 px-4 pointer-events-none">
          <div
            className="pointer-events-auto w-full max-w-md bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-6 fade-in duration-400"
          >
            {/* Header image area */}
            <div className="relative h-36 bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 flex items-center justify-center">
              <span className="text-6xl opacity-60 select-none">{selected.emoji}</span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button
                onClick={clearSelected}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white/70 text-xs px-2.5 py-1 rounded-full border border-white/10">
                {selected.region}
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="flex items-start gap-3 mb-2">
                <div>
                  <h2 className="text-white text-xl font-bold leading-tight">{selected.name}</h2>
                  <p className="text-white/50 text-sm flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {selected.country}
                  </p>
                </div>
              </div>
              <p className="text-white/70 text-sm italic mb-4 leading-relaxed">
                "{selected.description}"
              </p>
              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl h-10 text-sm"
                >
                  <Link to={selected.ctaLink}>
                    Plan My Trip
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-xl h-10 text-sm"
                >
                  <Link to="/packages">View Packages</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Hint (shown when globe is ready and nothing selected) ── */}
      {isReady && !selected && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm text-white/40 text-xs px-4 py-1.5 rounded-full border border-white/10 whitespace-nowrap">
            Click any city · Drag to rotate · Scroll to zoom
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveGlobe;
