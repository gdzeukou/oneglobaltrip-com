/**
 * A drawing of the appointment hunt: a sweep that keeps turning over the
 * visa centers until one of them shows a slot. It is an illustration, not a
 * live feed, and says so underneath.
 */

import React from 'react';
import { SCOUTPASS } from '@/data/visaCatalog';

const BLIPS: { x: string; y: string; d: string; hit?: boolean }[] = [
  { x: '68%', y: '24%', d: '-0.6s' },
  { x: '28%', y: '36%', d: '-1.5s', hit: true },
  { x: '62%', y: '70%', d: '-3.3s' },
];

export default function SlotRadar() {
  return (
    <figure style={{ margin: 0 }}>
      <div className="ogt-radar" aria-hidden="true">
        <div className="ogt-radar-sweep" />
        {SCOUTPASS.centers.map((center, i) => (
          <span
            key={center}
            className="ogt-blip"
            data-hit={BLIPS[i % BLIPS.length].hit ? '' : undefined}
            style={{ '--x': BLIPS[i % BLIPS.length].x, '--y': BLIPS[i % BLIPS.length].y, '--d': BLIPS[i % BLIPS.length].d } as React.CSSProperties}
          >
            {center}{BLIPS[i % BLIPS.length].hit ? ' · slot' : ''}
          </span>
        ))}
        <span className="ogt-radar-core" />
      </div>
      <figcaption className="ogt-caption">Illustration of the hunt, not a live feed</figcaption>
    </figure>
  );
}
