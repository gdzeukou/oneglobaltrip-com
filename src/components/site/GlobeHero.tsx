/**
 * The homepage hero: the Earth, and the line from where you are to where
 * you want to go.
 *
 * The trip bar drives the globe. Type a city to leave from and the home dot
 * moves there; type a destination and the arc flies to it.
 */

import React, { Suspense, lazy, useEffect, useMemo, useRef } from 'react';
import type { GlobeDot, RGB } from '@/components/earth/globe';
import { globeDestinations, type GlobeDestination } from '@/data/globeDestinations';

const WorldGlobe = lazy(() => import('@/components/earth/WorldGlobe'));

const CITY_DOT: RGB = [1.0, 0.7, 0.24];
/** Houston, where One Global Trip is: the view before we know where you are. */
const HOME = { lat: 29.7604, lng: -95.3698, label: 'Houston' };

export default function GlobeHero({
  from,
  to,
  children,
}: {
  from: GlobeDestination | null;
  to: GlobeDestination | null;
  children: React.ReactNode;
}) {
  const stage = useRef<HTMLDivElement>(null);

  const origin = useMemo(() => (from ? { lat: from.lat, lng: from.lng, label: from.name } : HOME), [from]);
  const destination = useMemo(() => (to ? { lat: to.lat, lng: to.lng, label: to.name } : null), [to]);
  const dots: GlobeDot[] = useMemo(
    () => globeDestinations.filter((d) => d.tier === 1).map((d) => ({ lat: d.lat, lng: d.lng, color: CITY_DOT })),
    [],
  );

  // The globe zooms on the wheel. On a page that scrolls, the wheel belongs
  // to the page: only a pinch (ctrl+wheel) reaches the globe.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const guard = (e: WheelEvent) => {
      if (!e.ctrlKey) e.stopPropagation();
    };
    el.addEventListener('wheel', guard, { capture: true, passive: true });
    return () => el.removeEventListener('wheel', guard, { capture: true });
  }, []);

  return (
    <section className="ogt-night ogt-globehero">
      <div className="ogt-night-sky" aria-hidden="true" />
      <div className="ogt-globehero-stage" ref={stage}>
        <div className="ogt-globehero-halo" aria-hidden="true" />
        <Suspense fallback={<div className="aspect-square w-full" />}>
          <WorldGlobe origin={origin} destination={destination} tone="clear" dots={dots} idleScale={0.82} />
        </Suspense>
      </div>
      <div className="ogt-wrap ogt-globehero-grid">
        <div className="ogt-globehero-copy">{children}</div>
      </div>
    </section>
  );
}
