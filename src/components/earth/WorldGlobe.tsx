/**
 * WorldGlobe — the photoreal Earth on the OGT homepage.
 *
 * WebGL2, no 3D library and no API token, so it renders wherever WebGL2
 * does. Satellite imagery with a live day/night line, city lights, drifting
 * clouds, sun glint and an atmosphere. One dot per destination; picking a
 * destination flies an arc from the traveler's origin to it.
 *
 *   - engine and textures load when the globe nears the viewport
 *   - the frame loop only runs while the globe is on screen
 *   - prefers-reduced-motion: no idle spin, no drift, instant turns
 *   - no WebGL2, or a texture fails: a static fallback is shown instead
 *
 * Imagery: Solar System Scope (CC BY 4.0), from NASA Blue Marble and Black
 * Marble data. See src/assets/earth/README.md.
 */

import { useEffect, useRef, useState, type MutableRefObject } from 'react';
import { Minus, Plus } from 'lucide-react';
import type { DestinationTone, EarthGlobe, GlobeDot, LatLng } from './globe';
import dayUrl from '@/assets/earth/day-2k.webp';
import day4kUrl from '@/assets/earth/day-4k.webp';
import lightsUrl from '@/assets/earth/lights-2k.webp';
import cloudsUrl from '@/assets/earth/clouds-2k.webp';
import reliefUrl from '@/assets/earth/relief-2k.webp';
import waterUrl from '@/assets/earth/water-1k.webp';

export type GlobePlace = LatLng & { label: string };
export type GlobeApi = { zoomBy: (factor: number) => void };

function webgl2Available(): boolean {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    // Free the probe context right away; browsers cap live contexts.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return !!gl;
  } catch {
    return false;
  }
}

export default function WorldGlobe({
  origin,
  destination,
  tone,
  dots,
  onPick,
  apiRef,
  chrome = true,
  className = '',
}: {
  origin: GlobePlace;
  destination: GlobePlace | null;
  tone: DestinationTone;
  dots: GlobeDot[];
  /** Tap or click on the planet, with the point under the finger. */
  onPick?: (at: LatLng) => void;
  /** Imperative handle, for zoom buttons rendered outside the globe. */
  apiRef?: MutableRefObject<GlobeApi | null>;
  /**
   * Draw the zoom buttons and the imagery credit inside the globe box.
   * Pass false only if the page renders both itself: the credit is required
   * by the imagery licence.
   */
  chrome?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const homeLabelRef = useRef<HTMLSpanElement>(null);
  const destLabelRef = useRef<HTMLSpanElement>(null);
  const globeRef = useRef<EarthGlobe | null>(null);
  const [supported, setSupported] = useState(true);
  const [ready, setReady] = useState(false);

  // Latest props for the async create() and the engine callbacks.
  const latest = useRef({ origin, destination, tone, dots, onPick });
  latest.current = { origin, destination, tone, dots, onPick };

  useEffect(() => {
    globeRef.current?.setHome(origin);
  }, [origin.lat, origin.lng]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    globeRef.current?.setDestination(destination, destination ? tone : null);
  }, [destination?.lat, destination?.lng, tone]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    globeRef.current?.setDots(dots);
  }, [dots]);

  useEffect(() => {
    if (!apiRef) return;
    apiRef.current = { zoomBy: (f) => globeRef.current?.zoomBy(f) };
    return () => {
      apiRef.current = null;
    };
  }, [apiRef]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !host || !canvas) return;
    if (!webgl2Available()) {
      setSupported(false);
      return;
    }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMedia = () => globeRef.current?.setReduced(media.matches);
    media.addEventListener('change', onMedia);

    let visible = false;
    let disposed = false;
    let loading = false;

    const create = async () => {
      if (globeRef.current || loading) return;
      loading = true;
      const { EarthGlobe } = await import('./globe');
      if (disposed) return;
      const now = latest.current;
      const globe = new EarthGlobe({
        canvas,
        input: host,
        textures: {
          day: dayUrl,
          day4k: day4kUrl,
          lights: lightsUrl,
          clouds: cloudsUrl,
          relief: reliefUrl,
          water: waterUrl,
        },
        home: { lat: now.origin.lat, lng: now.origin.lng },
        dots: now.dots,
        reduced: media.matches,
        labels: { home: () => homeLabelRef.current, dest: () => destLabelRef.current },
        onReady: () => setReady(true),
        onFail: () => setSupported(false),
        onPick: (at) => latest.current.onPick?.(at),
      });
      globeRef.current = globe;
      globe.setDestination(now.destination, now.destination ? now.tone : null);
      if (visible) globe.start();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (!globeRef.current) void create();
          else globeRef.current.start();
        } else {
          globeRef.current?.stop();
        }
      },
      { rootMargin: '300px 0px' },
    );
    io.observe(wrap);

    return () => {
      disposed = true;
      io.disconnect();
      media.removeEventListener('change', onMedia);
      globeRef.current?.destroy();
      globeRef.current = null;
    };
  }, []);

  if (!supported) {
    return (
      <div className={`ogt-globe-fallback relative aspect-square w-full ${className}`} aria-hidden="true">
        <div className="absolute inset-[10%] rounded-full ogt-globe-fallback-disc" />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={`ogt-globe relative aspect-square w-full ${className}`}
      data-ready={ready ? '' : undefined}
    >
      <div
        ref={hostRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="block h-full w-full"
          style={{ contain: 'layout paint size' }}
        />
      </div>
      <span ref={homeLabelRef} className="ogt-globe-label ogt-globe-label--home" aria-hidden="true">
        {origin.label}
      </span>
      {destination && (
        <span ref={destLabelRef} className={`ogt-globe-label ogt-globe-label--${tone}`} aria-hidden="true">
          {destination.label}
        </span>
      )}
      {chrome && (
      <>
      <div className="absolute right-[6%] bottom-[12%] flex flex-col gap-1.5">
        <button
          type="button"
          onClick={() => globeRef.current?.zoomBy(1.25)}
          className="ogt-globe-btn"
          aria-label="Zoom in on the globe"
        >
          <Plus size={16} />
        </button>
        <button
          type="button"
          onClick={() => globeRef.current?.zoomBy(0.8)}
          className="ogt-globe-btn"
          aria-label="Zoom out of the globe"
        >
          <Minus size={16} />
        </button>
      </div>
      <a
        href="https://www.solarsystemscope.com/textures/"
        target="_blank"
        rel="noopener noreferrer"
        className="ogt-globe-credit"
      >
        Imagery: Solar System Scope / NASA, CC BY 4.0
      </a>
      </>
      )}
    </div>
  );
}
