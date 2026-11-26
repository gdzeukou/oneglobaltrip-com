import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { SitePage } from '@/components/site/SiteShell';
import AiPlanner from '@/components/ogt/AiPlanner';
import MessageForm from '@/components/site/MessageForm';
import TravelDeck from '@/components/site/TravelDeck';
import { clearTrip, loadTrip, removeFromTrip, type TripItem } from '@/data/travelCatalog';

export default function StartMyTrip() {
  const [trip, setTrip] = useState<TripItem[]>([]);
  const sync = useCallback(() => setTrip(loadTrip()), []);

  useEffect(() => {
    sync();
    window.addEventListener('ogt-trip-changed', sync);
    return () => window.removeEventListener('ogt-trip-changed', sync);
  }, [sync]);

  const total = trip.reduce((s, t) => s + t.price, 0);
  const context = trip.length
    ? ['Trip items (estimates):', ...trip.map((t) => `- ${t.kind}: ${t.title}, $${t.price.toLocaleString()}`), `Estimate total: $${total.toLocaleString()}`]
    : [];

  return (
    <SitePage title="Start my trip" tone="night">
      <section className="ogt-night ogt-book-hero">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap">
          <p className="ogt-eyebrow">Start my trip</p>
          <h1 className="ogt-h1" style={{ maxWidth: '50rem' }}>Tell us the trip. <em>A person locks it in.</em></h1>
          <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
            Draft it in one sentence or build it piece by piece. Send it, and we come back with live prices, the visa
            you need if there is one, and a total. You pay after that.
          </p>
          <ol className="ogt-stepline">
            <li>Draft or build</li>
            <li>Send it to us</li>
            <li>We confirm prices</li>
            <li>You pay and go</li>
          </ol>
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <AiPlanner onAdded={sync} />

            <div className="ogt-panel">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
                <h2 className="ogt-h3">In your trip</h2>
                {trip.length > 0 && (
                  <button type="button" className="ogt-link" style={{ background: 'none', border: 0, cursor: 'pointer' }} onClick={() => { clearTrip(); sync(); }}>Clear</button>
                )}
              </div>
              {trip.length === 0 ? (
                <p className="ogt-muted" style={{ margin: '0.6rem 0 0' }}>
                  Nothing yet. Draft above, or add a <Link to="/flights" className="ogt-link">flight</Link>, a{' '}
                  <Link to="/stays" className="ogt-link">stay</Link> or a <Link to="/packages" className="ogt-link">package</Link>.
                  You can also send the form with only a message.
                </p>
              ) : (
                <>
                  <ul className="ogt-rows" style={{ marginTop: '0.5rem' }}>
                    {trip.map((t) => (
                      <li key={t.id} className="ogt-row" style={{ alignItems: 'center' }}>
                        <span className="ogt-row-name">{t.title}</span>
                        <span className="ogt-row-meta">{t.kind} · estimate</span>
                        <span className="ogt-row-price">
                          ${t.price.toLocaleString()}
                          <button type="button" className="ogt-icon-btn" aria-label={`Remove ${t.title}`} onClick={() => { removeFromTrip(t.id); sync(); }}><Trash2 size={16} /></button>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ margin: '1.1rem 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="ogt-muted">Estimate total</span><span className="ogt-price">${total.toLocaleString()}</span>
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="ogt-sticky-col">
            <MessageForm
              formType="trip-request"
              heading={trip.length ? `Send this trip, ${trip.length} item${trip.length === 1 ? '' : 's'}` : 'Send us the trip'}
              submitLabel="Lock in my trip"
              context={context}
              destination={trip[0]?.title}
              value={total || undefined}
              tripFields
              messageRequired={trip.length === 0}
              messageLabel={trip.length ? 'Anything to add or change' : 'The trip, in your own words'}
              messagePlaceholder="Dates that can move, who is traveling, a budget, a passport that needs a visa…"
            />
          </div>
        </div>
      </section>

      <section className="ogt-section ogt-band-sheet">
        <div className="ogt-wrap">
          <h2 className="ogt-h2" data-reveal>Or build it piece by piece</h2>
          <div style={{ marginTop: '2rem' }}><TravelDeck /></div>
        </div>
      </section>
    </SitePage>
  );
}
