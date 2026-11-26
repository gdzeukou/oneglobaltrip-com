import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import VisaCheck from '@/components/site/VisaCheck';
import TravelDeck from '@/components/site/TravelDeck';
import { HotLink, StickyCta } from '@/components/site/fx';
import { SCOUTPASS, VISA_SERVICES, priceOf, type VisaService } from '@/data/visaCatalog';

const online = (v: VisaService) => /no appointment/i.test(v.route);

const FILTERS: { id: string; label: string; test: (v: VisaService) => boolean }[] = [
  { id: 'all', label: 'All visas', test: () => true },
  { id: 'short-stay', label: 'Short stays', test: (v) => v.kind === 'short' },
  { id: 'long-stay', label: 'Long stays', test: (v) => v.kind === 'long' },
  { id: 'online', label: 'Online, no appointment', test: online },
  { id: 'appointment', label: 'Needs an appointment', test: (v) => !online(v) },
];

function VisaCard({ visa }: { visa: VisaService }) {
  const price = priceOf(visa.pricing);
  return (
    <Link to={`/visas/${visa.slug}`} className="ogt-card ogt-visa">
      <p className="ogt-card-tag">{visa.kind === 'short' ? 'Short stay' : 'Long stay'} · {online(visa) ? 'Online' : 'Appointment'}</p>
      <h3 className="ogt-h3">{visa.name}</h3>
      <p>{visa.summary}</p>
      <dl className="ogt-facts">
        <div><dt>Stay</dt><dd>{visa.stay}</dd></div>
        <div><dt>Decision</dt><dd>{visa.timing}</dd></div>
      </dl>
      <div className="ogt-card-foot">
        <span><span className="ogt-price" style={{ fontSize: '1.6rem' }}>{price.totalPrice}</span> <small className="ogt-muted">fees included</small></span>
        <span>See <ArrowRight size={16} className="ogt-btn-arrow" aria-hidden="true" /></span>
      </div>
    </Link>
  );
}

export default function Visas() {
  // Old links land on #short-stay and #long-stay: open on that filter.
  const [filter, setFilter] = useState(() => {
    const hash = typeof window === 'undefined' ? '' : window.location.hash.slice(1);
    return FILTERS.some((f) => f.id === hash) ? hash : 'all';
  });
  const shown = useMemo(() => VISA_SERVICES.filter(FILTERS.find((f) => f.id === filter)!.test), [filter]);

  return (
    <SitePage title="All visas" tone="night">
      <section className="ogt-hero ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <p className="ogt-eyebrow">{VISA_SERVICES.length} visas, every fee shown</p>
            <h1 className="ogt-h1">Whatever your passport, <em>we know the way in.</em></h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              Not sure which visa applies to you? Run the check. It takes your passport and your destination and tells
              you what stands between you and the trip.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.75rem' }}>
              <HotLink to="/start" className="ogt-btn-big">Start my visa</HotLink>
              <a href="#catalog" className="ogt-btn ogt-btn-glass ogt-btn-big">See the list</a>
            </div>
          </div>
          <VisaCheck footnote={false} />
        </div>
      </section>

      <section className="ogt-section" id="catalog">
        <span id="short-stay" /><span id="long-stay" />
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Pick a visa</h2>
          <p className="ogt-muted" style={{ margin: '0.9rem 0 0', maxWidth: '38rem' }} data-reveal>
            Each price is a total for one applicant: the consulate fee, the visa center fee and our service.
          </p>
          <ul className="ogt-chips ogt-chips-paper" style={{ marginTop: '1.75rem' }} aria-label="Filter the visas">
            {FILTERS.map((f) => (
              <li key={f.id}>
                <button type="button" className="ogt-chip" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label} <small>{VISA_SERVICES.filter(f.test).length}</small>
                </button>
              </li>
            ))}
          </ul>
          <ul className="ogt-cards ogt-cards-3" style={{ marginTop: '1.75rem' }} aria-live="polite">
            {shown.map((v) => <li key={v.slug}><VisaCard visa={v} /></li>)}
          </ul>
        </div>
      </section>

      <section className="ogt-section ogt-band-ink">
        <div className="ogt-wrap">
          <div data-reveal>
            <p className="ogt-eyebrow">Two ways to work with us</p>
            <h2 className="ogt-h2" style={{ maxWidth: '44rem' }}>We do all of it, or only the part you are stuck on.</h2>
          </div>
          <div className="ogt-versus" style={{ marginTop: '2.25rem' }} data-reveal>
            <div>
              <h3 className="ogt-h3">Full service</h3>
              <p className="ogt-muted" style={{ margin: '0.5rem 0 0', color: 'var(--muted)' }}>Forms, document review, the appointment, and every official fee in one price.</p>
              <p style={{ margin: '1.25rem 0 0' }}><Link to="/start" className="ogt-btn ogt-btn-shine">Start my visa</Link></p>
            </div>
            <div data-side="us">
              <h3 className="ogt-h3">Appointment only</h3>
              <p style={{ margin: '0.5rem 0 0' }}>Your file is ready. We hunt the slot, {SCOUTPASS.price} {SCOUTPASS.unit}. {SCOUTPASS.refund}</p>
              <p style={{ margin: '1.25rem 0 0' }}><HotLink to="/start?service=appointment">Hunt my appointment</HotLink></p>
            </div>
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <p className="ogt-eyebrow" data-reveal>After the visa</p>
          <h2 className="ogt-h2" style={{ maxWidth: '40rem' }} data-reveal>Book the rest of the trip in the same place.</h2>
          <div style={{ marginTop: '2.25rem' }}><TravelDeck skip={['/visas', '/scoutpass']} /></div>
        </div>
      </section>

      <section className="ogt-night ogt-finale">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap" data-reveal>
          <p className="ogt-eyebrow">A visa that is not on this list?</p>
          <h2 className="ogt-h1">Name the country. <em>We tell you if we can take it.</em></h2>
          <p className="ogt-lede">Tell us the destination, your passport and where you apply from. Asking costs nothing.</p>
          <div className="ogt-finale-actions">
            <HotLink to="/contact" className="ogt-btn-big">Ask us</HotLink>
            <Link to="/pricing" className="ogt-btn ogt-btn-glass ogt-btn-big">See every price</Link>
          </div>
        </div>
      </section>

      <StickyCta to="/start" label="Start my visa" note="Free to ask. Pay after the quote." />
    </SitePage>
  );
}
