import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import FeeBreakdown from '@/components/site/FeeBreakdown';
import { HotLink, StickyCta } from '@/components/site/fx';
import { LONG_STAY, SCOUTPASS, SHORT_STAY, VISA_SERVICES, amount, priceOf, type VisaService } from '@/data/visaCatalog';
import type { VisaPricingData } from '@/data/visaPricing';

type Option = { key: string; label: string; slug: string; price: VisaPricingData };

/** Every price we sell, with the variants (a longer UK visa) as their own line. */
const OPTIONS: Option[] = VISA_SERVICES.flatMap((v) => [
  { key: v.slug, label: v.name, slug: v.slug, price: priceOf(v.pricing) },
  ...(v.variant ? [{ key: `${v.slug}-variant`, label: `${v.name}, ${v.variant.label.toLowerCase()}`, slug: v.slug, price: priceOf(v.variant.pricing) }] : []),
]);

/** "€189" × 3 → "€567". Prices are display strings in the visa's own currency. */
function times(price: string, n: number): string {
  const symbol = price.replace(/[\d.,\s]/g, '') || '$';
  return `${symbol}${(amount(price) * n).toLocaleString('en-US')}`;
}

function Calculator() {
  const [key, setKey] = useState(OPTIONS[0].key);
  const [people, setPeople] = useState(1);
  const [huntOnly, setHuntOnly] = useState(false);
  const option = OPTIONS.find((o) => o.key === key) ?? OPTIONS[0];
  const unit = huntOnly ? SCOUTPASS.price : option.price.totalPrice;
  const total = times(unit, people);
  const start = `/start?visa=${option.slug}&travelers=${people}${huntOnly ? '&service=appointment' : ''}`;

  return (
    <div className="ogt-calc">
      <div className="ogt-calc-form">
        <div className="ogt-field">
          <label htmlFor="calc-visa">Visa</label>
          <select id="calc-visa" className="ogt-select" value={key} onChange={(e) => setKey(e.target.value)}>
            {OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
          </select>
        </div>
        <div className="ogt-field">
          <span className="ogt-label" id="calc-people">Applicants</span>
          <div className="ogt-stepper" role="group" aria-labelledby="calc-people">
            <button type="button" onClick={() => setPeople((n) => Math.max(1, n - 1))} disabled={people === 1} aria-label="One applicant fewer"><Minus size={18} /></button>
            <output aria-live="polite">{people}</output>
            <button type="button" onClick={() => setPeople((n) => Math.min(12, n + 1))} disabled={people === 12} aria-label="One applicant more"><Plus size={18} /></button>
          </div>
        </div>
        <div className="ogt-field">
          <span className="ogt-label" id="calc-service">What you need</span>
          <div className="ogt-toggle" role="group" aria-labelledby="calc-service">
            <button type="button" aria-pressed={!huntOnly} onClick={() => setHuntOnly(false)}>Full service</button>
            <button type="button" aria-pressed={huntOnly} onClick={() => setHuntOnly(true)}>Appointment only</button>
          </div>
        </div>
      </div>

      <div className="ogt-calc-out" aria-live="polite">
        <p className="ogt-small" style={{ margin: 0 }}>{people} × {unit}{huntOnly ? ', the hunt alone' : ', fees included'}</p>
        <p className="ogt-calc-total" key={`${key}-${people}-${huntOnly}`}>{total}</p>
        {huntOnly ? (
          <p className="ogt-small" style={{ margin: '0.75rem 0 0' }}>{SCOUTPASS.refund} Consulate and center fees are paid separately when you apply.</p>
        ) : (
          <div className="ogt-calc-fees"><FeeBreakdown price={option.price} /></div>
        )}
        <p style={{ margin: '1.5rem 0 0' }}><HotLink to={start}>Start with {people === 1 ? 'this' : `these ${people}`}</HotLink></p>
        <p className="ogt-small" style={{ margin: '0.9rem 0 0', opacity: 0.8 }}>Nothing to pay now. We confirm the visa, the documents and this price first.</p>
      </div>
    </div>
  );
}

function PriceTable({ items, caption }: { items: VisaService[]; caption: string }) {
  const rows = OPTIONS.filter((o) => items.some((v) => v.slug === o.slug));
  return (
    <div className="ogt-table-scroll" data-reveal>
      <table className="ogt-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr><th scope="col">Visa</th><th scope="col">Consulate</th><th scope="col">Visa center</th><th scope="col">Our fee</th><th scope="col">Total</th></tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td><Link to={`/visas/${r.slug}`}>{r.label}</Link></td>
              <td>{r.price.consularFee}</td>
              <td>{r.price.centerFee}</td>
              <td>{r.price.serviceFee}</td>
              <td>{r.price.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const PRICE_FAQ: [string, string][] = [
  ['Is the price per person?', 'Yes. Every total is for one applicant. Use the calculator for a family or a group.'],
  ['When do I pay?', 'After we have confirmed the visa you need, the document list and the price. Sending a request costs nothing.'],
  ['What if a consulate changes its fee?', 'Consulates and visa centers change their fees. If one has moved by the time you apply, we tell you before you pay.'],
  ['Why are some prices in euros and others in dollars?', 'Each total follows the currency the consulate charges in, so the official fee you see is the official fee you pay.'],
  ['Do flights and hotels have a fee?', 'Flights, stays, cars and the rest show a starting estimate. We confirm the live price before you pay anything.'],
];

export default function Pricing() {
  const cheapest = useMemo(() => [...SHORT_STAY].sort((a, b) => amount(priceOf(a.pricing).totalPrice) - amount(priceOf(b.pricing).totalPrice))[0], []);

  return (
    <SitePage title="Pricing" tone="night">
      <section className="ogt-hero ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">No hidden fee, no surprise at the counter</p>
          <h1 className="ogt-h1" style={{ maxWidth: '56rem' }}>One price per visa. <em>Every fee shown.</em></h1>
          <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
            Each total covers the consulate fee, the visa center fee and our service. Pick a visa and count your
            travelers: you see the total before you send anything.
          </p>
          <div style={{ marginTop: '2.5rem' }}><Calculator /></div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Two ways to pay for a visa</h2>
          <div className="ogt-versus" style={{ marginTop: '2.25rem' }} data-reveal>
            <div>
              <p className="ogt-card-tag">You have the file</p>
              <h3 className="ogt-h3">ScoutPass appointment hunt</h3>
              <p style={{ margin: '0.9rem 0 0' }}><span className="ogt-price" style={{ fontSize: '3rem' }}>{SCOUTPASS.price}</span> <span className="ogt-muted">{SCOUTPASS.unit}</span></p>
              <ul className="ogt-checks" style={{ marginTop: '1.25rem' }}>
                <li>We watch {SCOUTPASS.centers.join(', ')} for your city and dates</li>
                <li>We secure the slot and send the confirmation</li>
                <li>{SCOUTPASS.refund}</li>
              </ul>
              <p className="ogt-small ogt-muted" style={{ margin: '1rem 0 0' }}>Consulate and center fees are separate.</p>
              <p style={{ margin: '1.5rem 0 0' }}><Link to="/start?service=appointment" className="ogt-btn ogt-btn-shine">Hunt my appointment</Link></p>
            </div>
            <div data-side="us">
              <p className="ogt-card-tag" style={{ color: 'var(--amber)' }}>We do all of it</p>
              <h3 className="ogt-h3">Full visa service</h3>
              <p style={{ margin: '0.9rem 0 0' }}><span className="ogt-small">from</span> <span className="ogt-price" style={{ fontSize: '3rem', color: '#fff' }}>{priceOf(cheapest.pricing).totalPrice}</span> <span className="ogt-small">{SCOUTPASS.unit}, official fees inside</span></p>
              <ul style={{ marginTop: '1.25rem' }}>
                <li>The exact document list for your case</li>
                <li>Forms completed with you, every document reviewed</li>
                <li>The appointment hunted and booked</li>
                <li>Consulate and visa center fees paid for you</li>
              </ul>
              <p style={{ margin: '1.5rem 0 0' }}><HotLink to="/start">Start my visa</HotLink></p>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Short stays, line by line</h2>
          <div style={{ marginTop: '1.5rem' }}><PriceTable items={SHORT_STAY} caption="Short-stay visa prices" /></div>
          <h2 className="ogt-h2" style={{ marginTop: 'clamp(2.5rem, 6vw, 4rem)' }} data-reveal>Long stays, line by line</h2>
          <div style={{ marginTop: '1.5rem' }}><PriceTable items={LONG_STAY} caption="Long-stay visa prices" /></div>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>About the money</h2>
          <div className="ogt-faq" style={{ marginTop: '2rem', maxWidth: '52rem' }} data-reveal>
            {PRICE_FAQ.map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="ogt-night ogt-finale">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap" data-reveal>
          <p className="ogt-eyebrow">Free to ask</p>
          <h2 className="ogt-h1">See your price. <em>Then decide.</em></h2>
          <p className="ogt-lede">Send the request in two minutes. You pay only after we confirm the visa, the documents and the total.</p>
          <div className="ogt-finale-actions">
            <HotLink to="/start" className="ogt-btn-big">Start my visa</HotLink>
            <Link to="/visas" className="ogt-btn ogt-btn-glass ogt-btn-big">Browse the visas</Link>
          </div>
        </div>
      </section>

      <StickyCta to="/start" label="Start my visa" note="Pay after the quote." />
    </SitePage>
  );
}
