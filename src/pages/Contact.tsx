import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SitePage } from '@/components/site/SiteShell';
import MessageForm from '@/components/site/MessageForm';

const TOPICS: { id: string; label: string; hint: string }[] = [
  { id: 'visa', label: 'A visa', hint: 'Your passport, the country you are going to, where you apply from and your dates.' },
  { id: 'trip', label: 'A trip', hint: 'Where, when, how many people and a budget if you have one.' },
  { id: 'refusal', label: 'After a refusal', hint: 'Which visa was refused, when, and what the refusal letter says.' },
  { id: 'family', label: 'A family or a group', hint: 'How many travelers, their passports, and whether you apply together.' },
  { id: 'business', label: 'A team or an employer', hint: 'How many people travel, on which passports, and how often.' },
  { id: 'other', label: 'Something else', hint: 'Tell us what you need.' },
];

export default function Contact() {
  const [params] = useSearchParams();
  const [topic, setTopic] = useState(() => (TOPICS.some((t) => t.id === params.get('topic')) ? params.get('topic')! : 'visa'));
  const chosen = TOPICS.find((t) => t.id === topic)!;

  return (
    <SitePage title="Contact" tone="night">
      <section className="ogt-hero ogt-night">
        <div className="ogt-night-sky" aria-hidden="true" />
        <div className="ogt-wrap ogt-hero-grid" style={{ alignItems: 'start' }}>
          <div>
            <p className="ogt-eyebrow">Contact</p>
            <h1 className="ogt-h1">Ask a person. <em>Get a straight answer.</em></h1>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>
              A visa that is not on our list, a trip with five borders, a refusal you want to turn around. Write it
              the way you would say it.
            </p>
            <p className="ogt-eyebrow" style={{ margin: '2.25rem 0 0.9rem' }}>What is it about?</p>
            <ul className="ogt-chips">
              {TOPICS.map((t) => (
                <li key={t.id}><button type="button" className="ogt-chip" aria-pressed={topic === t.id} onClick={() => setTopic(t.id)}>{t.label}</button></li>
              ))}
            </ul>
            <ul className="ogt-checks" style={{ marginTop: '2.25rem', maxWidth: '30rem' }}>
              <li>Free to ask, from any country</li>
              <li>We reply by email, or on WhatsApp if you leave a number</li>
              <li>You see the price before you pay anything</li>
            </ul>
          </div>
          <MessageForm
            key={topic}
            formType="contact"
            heading={`Message about ${chosen.label.toLowerCase()}`}
            submitLabel="Send my message"
            context={[`Topic: ${chosen.label}`]}
            messagePlaceholder={chosen.hint}
          />
        </div>
      </section>

      <section className="ogt-section">
        <div className="ogt-wrap ogt-split">
          <div data-reveal>
            <h2 className="ogt-h2">Already know what you need?</h2>
            <p className="ogt-lede" style={{ marginTop: '1.25rem' }}>These go straight to the right form, with the price next to it.</p>
          </div>
          <ul className="ogt-rows" data-reveal>
            <li><Link to="/start" className="ogt-row"><span className="ogt-row-name">Start my visa</span><span className="ogt-row-meta">Full service, fees included</span></Link></li>
            <li><Link to="/scoutpass" className="ogt-row"><span className="ogt-row-name">Hunt my appointment</span><span className="ogt-row-meta">Your file is ready, the calendar is full</span></Link></li>
            <li><Link to="/startmytrip" className="ogt-row"><span className="ogt-row-name">Start my trip</span><span className="ogt-row-meta">Flights, stays, cars and the rest</span></Link></li>
            <li><Link to="/pricing" className="ogt-row"><span className="ogt-row-name">See every price</span><span className="ogt-row-meta">With a calculator for groups</span></Link></li>
          </ul>
        </div>
      </section>
    </SitePage>
  );
}
