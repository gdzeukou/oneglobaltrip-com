import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import RequestForm from '@/components/site/RequestForm';

export default function Start() {
  const [params] = useSearchParams();
  return (
    <SitePage title="Start my visa">
      <section className="ogt-hero">
        <div className="ogt-wrap ogt-hero-grid">
          <div>
            <h1 className="ogt-h1">Start my visa</h1>
            <p className="ogt-lede" style={{ marginTop: '1.5rem' }}>
              Two minutes now. We come back with the visa you need, the document list for your case and the price.
            </p>
            <ul className="ogt-checks" style={{ marginTop: '2rem', maxWidth: '30rem' }}>
              <li>No payment to send a request</li>
              <li>We reply by email with the next step</li>
              <li>You decide after you have seen the price</li>
            </ul>
          </div>
          <RequestForm
            defaults={{
              visa: params.get('visa') ?? undefined,
              passport: params.get('passport') ?? undefined,
              destination: params.get('to') ?? undefined,
              service: params.get('service') === 'appointment' ? 'appointment' : 'full',
              date: params.get('date') ?? undefined,
              travelers: params.get('travelers') ?? undefined,
              notes: params.get('route') ?? undefined,
            }}
          />
        </div>
      </section>
    </SitePage>
  );
}
