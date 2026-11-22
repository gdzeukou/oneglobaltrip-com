/**
 * The visa check, drawn as a visa sticker.
 *
 * Pick a passport and a destination and the sticker gets stamped with the
 * answer. The answer comes from `visaVerdict`, which only says "no visa"
 * where that is certain and says "we check it" everywhere else.
 */

import React, { useId, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PASSPORT_COUNTRIES, visaVerdict } from '@/lib/travelResolve';
import { CHECK_DESTINATIONS, SCOUTPASS, priceOf, serviceFor } from '@/data/visaCatalog';

/** Overlapping sine waves, the fine-line pattern printed on security paper. */
function Guilloche() {
  const paths = useMemo(() => {
    const out: string[] = [];
    for (let band = 0; band < 3; band++) {
      for (let line = 0; line < 7; line++) {
        const amp = 16 + band * 9;
        const phase = line * 0.42 + band * 1.3;
        const base = 55 + band * 105;
        let d = '';
        for (let x = 0; x <= 600; x += 6) {
          const y = base + Math.sin(x / (38 + band * 11) + phase) * amp + Math.sin(x / 17 + phase * 2) * 3;
          d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
        }
        out.push(d);
      }
    }
    return out;
  }, []);

  return (
    <svg className="ogt-sticker-pattern" viewBox="0 0 600 340" preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={i % 7 === 3 ? '#c9332a' : '#221c7a'} strokeWidth="0.6" opacity={i % 7 === 3 ? 0.22 : 0.13} />
      ))}
    </svg>
  );
}

/** The machine-readable strip at the foot of a visa, filled from the two choices. */
function mrz(passport: string, destination: string, visa: string): string {
  const clean = (s: string) => s.toUpperCase().replace(/[^A-Z]+/g, '<');
  const line = `V<${clean(passport)}<<${clean(destination)}<<${clean(visa)}`;
  return line.padEnd(44, '<').slice(0, 44);
}

type Tone = 'red' | 'green' | 'ink';

export default function VisaCheck({ initialPassport = 'Cameroon', initialDestination = 'France' }: { initialPassport?: string; initialDestination?: string }) {
  const id = useId();
  const [passport, setPassport] = useState(initialPassport);
  const [destination, setDestination] = useState(initialDestination);

  const verdict = visaVerdict(destination, passport);
  const service = serviceFor(destination);
  const price = service ? priceOf(service.pricing) : null;

  const noVisa = !verdict.hunt && verdict.badge !== 'We check it for you';
  const tone: Tone = verdict.hunt ? 'red' : noVisa ? 'green' : 'ink';
  const stamp = verdict.hunt ? ['Visa', 'required'] : noVisa ? ['No visa', 'needed'] : ['We', 'check it'];

  return (
    <div>
      <div className="ogt-sticker">
        <Guilloche />
        <div className="ogt-sticker-body">
          <div className="ogt-sticker-top">
            <strong className="ogt-stampface">Visa check</strong>
            <span className="ogt-small">Free, no account</span>
          </div>

          <div className="ogt-fields ogt-fields-2">
            <div className="ogt-field">
              <label htmlFor={`${id}-passport`}>Your passport</label>
              <select id={`${id}-passport`} className="ogt-select" value={passport} onChange={(e) => setPassport(e.target.value)}>
                {PASSPORT_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="ogt-field">
              <label htmlFor={`${id}-destination`}>Where you are going</label>
              <select id={`${id}-destination`} className="ogt-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                {CHECK_DESTINATIONS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="ogt-verdict" aria-live="polite">
            <div>
              <p className="ogt-verdict-title">{verdict.badge}</p>
              <p className="ogt-small ogt-muted" style={{ marginTop: '0.4rem' }}>{verdict.detail}</p>
            </div>
            {/* The key restarts the stamp animation each time the answer changes. */}
            <div key={`${passport}-${destination}`} className="ogt-stamp ogt-stamp-in ogt-stampface" data-tone={tone} aria-hidden="true">
              <span className="ogt-stamp-big">{stamp[0]}</span>
              <span className="ogt-stamp-big">{stamp[1]}</span>
              <span className="ogt-stamp-small">{destination}</span>
            </div>
          </div>

          {service && price && (
            <div className="ogt-next">
              {verdict.hunt ? (
                <>
                  <div>
                    <p className="ogt-small ogt-muted">Full service, consulate and center fees included</p>
                    <p><span className="ogt-price">{price.totalPrice}</span> <span className="ogt-small ogt-muted">or the appointment alone, {SCOUTPASS.price}</span></p>
                  </div>
                  <Link to={`/start?visa=${service.slug}&passport=${encodeURIComponent(passport)}&to=${encodeURIComponent(destination)}`} className="ogt-btn">Start my visa</Link>
                </>
              ) : (
                <>
                  <p className="ogt-small ogt-muted" style={{ maxWidth: '22rem' }}>
                    {noVisa ? 'Nothing to file. You can go straight to planning the trip.' : `We confirm the rule for your dates. If you need the ${service.name.toLowerCase()}, it is ${price.totalPrice} with fees included.`}
                  </p>
                  {noVisa
                    ? <Link to="/plan" className="ogt-btn ogt-btn-ghost">Plan the trip</Link>
                    : <Link to={`/visas/${service.slug}`} className="ogt-btn ogt-btn-ghost">See this visa</Link>}
                </>
              )}
            </div>
          )}
        </div>
        <div className="ogt-sticker-foot">
          <div className="ogt-mrz" aria-hidden="true">{mrz(passport, destination, service?.slug ?? 'visa')}</div>
        </div>
      </div>
      <p className="ogt-small ogt-muted" style={{ marginTop: '1.4rem', maxWidth: '34rem' }}>
        A first answer, not a consulate decision. We confirm the rule for your exact dates before you pay anything.
      </p>
    </div>
  );
}
