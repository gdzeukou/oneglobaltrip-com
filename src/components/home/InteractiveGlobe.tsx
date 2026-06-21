import React, { useRef, useEffect, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { GlobeDestination, globeDestinations } from '@/data/globeDestinations';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TooltipState {
  destination: GlobeDestination;
  x: number;
  y: number;
}

const InteractiveGlobe: React.FC = () => {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selected, setSelected] = useState<GlobeDestination | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [isReady, setIsReady] = useState(false);
  const autoRotateRef = useRef<boolean>(true);

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

  // Globe ready — configure camera and start auto-rotation
  const handleGlobeReady = useCallback(() => {
    setIsReady(true);
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
      controls.enablePan = false;
    }
    globeRef.current.pointOfView({ altitude: 2.2 }, 0);
  }, []);

  // Pause auto-rotate when destination is selected
  useEffect(() => {
    if (!globeRef.current || !isReady) return;
    const controls = globeRef.current.controls();
    if (!controls) return;
    if (selected) {
      controls.autoRotate = false;
      autoRotateRef.current = false;
      globeRef.current.pointOfView(
        { lat: selected.lat, lng: selected.lng, altitude: 1.8 },
        800
      );
    } else {
      controls.autoRotate = true;
      autoRotateRef.current = true;
      globeRef.current.pointOfView({ altitude: 2.2 }, 800);
    }
  }, [selected, isReady]);

  const handlePointClick = useCallback((point: object) => {
    const dest = point as GlobeDestination;
    setSelected(prev => (prev?.id === dest.id ? null : dest));
    setTooltip(null);
  }, []);

  const handlePointHover = useCallback((point: object | null, _prevPoint: object | null, event?: MouseEvent) => {
    if (!point) {
      setTooltip(null);
      return;
    }
    const dest = point as GlobeDestination;
    if (event && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltip({
        destination: dest,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  }, []);

  // Arc data: arcs between destinations for visual effect
  const arcsData = globeDestinations.slice(0, 6).map((dest, i) => ({
    startLat: dest.lat,
    startLng: dest.lng,
    endLat: globeDestinations[(i + 3) % globeDestinations.length].lat,
    endLng: globeDestinations[(i + 3) % globeDestinations.length].lng,
    color: [dest.color, globeDestinations[(i + 3) % globeDestinations.length].color],
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" ref={containerRef}>
      {/* Globe */}
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#1d4ed8"
          atmosphereAltitude={0.18}
          // Points for destinations
          pointsData={globeDestinations}
          pointLat={(d: object) => (d as GlobeDestination).lat}
          pointLng={(d: object) => (d as GlobeDestination).lng}
          pointColor={(d: object) => {
            const dest = d as GlobeDestination;
            return selected?.id === dest.id ? '#ffffff' : dest.color;
          }}
          pointAltitude={0.02}
          pointRadius={(d: object) => {
            const dest = d as GlobeDestination;
            return selected?.id === dest.id ? 0.7 : 0.45;
          }}
          pointResolution={12}
          pointLabel={(d: object) => {
            const dest = d as GlobeDestination;
            return `<div style="background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:6px;font-size:13px;font-family:sans-serif;">${dest.name}, ${dest.country}</div>`;
          }}
          onPointClick={handlePointClick}
          onPointHover={handlePointHover}
          // Arcs
          arcsData={arcsData}
          arcStartLat={(d: object) => (d as any).startLat}
          arcStartLng={(d: object) => (d as any).startLng}
          arcEndLat={(d: object) => (d as any).endLat}
          arcEndLng={(d: object) => (d as any).endLng}
          arcColor={(d: object) => (d as any).color}
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2500}
          arcAltitudeAutoScale={0.35}
          arcStroke={0.4}
          onGlobeReady={handleGlobeReady}
        />
      )}

      {/* Hover tooltip */}
      {tooltip && !selected && (
        <div
          className="pointer-events-none absolute z-20 bg-black/75 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap"
          style={{ left: tooltip.x + 12, top: tooltip.y - 16 }}
        >
          <MapPin className="inline h-3 w-3 mr-1 mb-0.5" />
          {tooltip.destination.name}, {tooltip.destination.country}
        </div>
      )}

      {/* Selected destination card */}
      {selected && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[min(90vw,420px)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {selected.image && (
              <div className="relative h-40 overflow-hidden">
                <img
                  src={selected.image}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-white font-bold text-xl leading-tight">{selected.name}</h3>
                  <p className="text-white/60 text-sm flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selected.country}
                  </p>
                </div>
                {!selected.image && (
                  <button
                    onClick={() => setSelected(null)}
                    className="text-white/50 hover:text-white transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <p className="text-white/80 text-sm mt-2 mb-4 italic">"{selected.description}"</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Link to={selected.ctaLink}>
                  Explore {selected.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hint label */}
      {!selected && isReady && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 text-xs text-center pointer-events-none select-none">
          <span className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            Click a destination to explore
          </span>
        </div>
      )}
    </div>
  );
};

export default InteractiveGlobe;
