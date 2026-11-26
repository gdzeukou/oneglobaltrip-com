/**
 * The homepage hero: the Earth as your passport sees it.
 *
 * The visa check on the left drives the globe on the right. Change the
 * passport and the departure point moves; change the destination and an arc
 * flies there, red where a visa stands in the way and gold where none does.
 * Every dot is a major city, coloured by the same rule.
 */

import React, { Suspense, lazy, useEffect, useMemo, useRef } from 'react';
import type { GlobeDot, RGB } from '@/components/earth/globe';
import { globeDestinations } from '@/data/globeDestinations';
import { originFor, visaVerdict } from '@/lib/travelResolve';
import VisaCheck, { type VisaCheckValue } from '@/components/site/VisaCheck';

const WorldGlobe = lazy(() => import('@/components/earth/WorldGlobe'));

const HUB_DOT: RGB = [1.0, 0.7, 0.24];
const VISA_DOT: RGB = [1.0, 0.26, 0.2];
const OPEN_DOT: RGB = [0.25, 0.95, 0.55];

export default function GlobeHero({
  value,
  onChange,
  children,
}: {
  value: VisaCheckValue;
  onChange: (next: VisaCheckValue) => void;
  /** Headline, lede and actions. */
  children: React.ReactNode;
}) {
  const { passport, destination } = value;
  const stage = useRef<HTMLDivElement>(null);

  const origin = useMemo(() => originFor(passport), [passport]);
  const target = useMemo(() => {
    const city = originFor(destination);
    return city.country === destination ? { lat: city.lat, lng: city.lng, label: city.label } : null;
  }, [destination]);
  const verdict = visaVerdict(destination, passport);

  const dots: GlobeDot[] = useMemo(
    () =>
      globeDestinations
        .filter((d) => d.tier === 1)
        .map((d) => {
          const v = visaVerdict(d.country, passport);
          const color = v.hunt ? VISA_DOT : v.badge === 'We check it for you' ? HUB_DOT : OPEN_DOT;
          return { lat: d.lat, lng: d.lng, color };
        }),
    [passport],
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
          <WorldGlobe
            origin={origin}
            destination={target}
            tone={verdict.hunt ? 'visa' : 'clear'}
            dots={dots}
            idleScale={0.82}
          />
        </Suspense>
      </div>

      <div className="ogt-wrap ogt-globehero-grid">
        <div className="ogt-globehero-copy">
          {children}
          <div className="ogt-globehero-check">
            <VisaCheck value={value} onChange={onChange} footnote={false} />
          </div>
        </div>
        <div className="ogt-globehero-side">
          <ul className="ogt-legend" aria-label="What the dots on the globe mean">
            <li><i data-tone="visa" />Visa first on a {passport} passport</li>
            <li><i data-tone="open" />No visa for a short stay</li>
            <li><i data-tone="check" />We confirm the rule</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
