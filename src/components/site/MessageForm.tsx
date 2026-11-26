/**
 * The form behind "talk to us" and "lock in this trip".
 *
 * It saves to `form_submissions`, the table the admin console reads, so a
 * message sent here shows up with the visa requests. Nothing is charged.
 */

import React, { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export interface MessageFormProps {
  /** How the admin console labels it, such as "contact" or "trip-request". */
  formType: string;
  heading: string;
  submitLabel: string;
  /** Lines added to the message for the team: the trip items, the topic. */
  context?: string[];
  destination?: string;
  /** Estimate total of the trip, saved as the lead's value. */
  value?: number;
  messageLabel?: string;
  messagePlaceholder?: string;
  messageRequired?: boolean;
  /** Ask for the departure city, the date and the group size. */
  tripFields?: boolean;
  onSent?: () => void;
}

export default function MessageForm({
  formType,
  heading,
  submitLabel,
  context = [],
  destination,
  value,
  messageLabel = 'Your message',
  messagePlaceholder = 'Where are you going, when, and what do you need?',
  messageRequired = true,
  tripFields = false,
  onSent,
}: MessageFormProps) {
  const id = useId();
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', date: '', travelers: '1', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setState('sending');
    const { data: auth } = await supabase.auth.getUser();
    const { error: dbError } = await supabase.from('form_submissions').insert([{
      form_type: formType,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      destination: destination ?? null,
      travel_date: tripFields && form.date ? form.date : null,
      travelers: tripFields ? form.travelers : null,
      sales_value: value ?? null,
      special_requests: [
        tripFields && form.city && `Leaving from: ${form.city}`,
        ...context,
        form.message.trim(),
      ].filter(Boolean).join('\n') || null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      user_id: auth?.user?.id ?? null,
    }]);
    if (dbError) {
      setState('idle');
      setError('The message was not sent. Check your connection and send it again.');
      return;
    }
    setState('sent');
    onSent?.();
  }

  if (state === 'sent') {
    return (
      <div className="ogt-panel" role="status">
        <h2 className="ogt-h3">Received. A person reads it next.</h2>
        <p className="ogt-muted" style={{ margin: '0.6rem 0 0' }}>
          We reply to {form.email.trim()} with the next step. Nothing has been charged.
        </p>
        <p style={{ margin: '1.25rem 0 0', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link to="/visas" className="ogt-btn ogt-btn-ghost">Check a visa meanwhile</Link>
          <Link to="/" className="ogt-btn ogt-btn-ghost">Back to the globe</Link>
        </p>
      </div>
    );
  }

  return (
    <form className="ogt-panel" onSubmit={submit}>
      <h2 className="ogt-h3">{heading}</h2>
      <div className="ogt-fields" style={{ marginTop: '1.1rem' }}>
        <div className="ogt-field">
          <label htmlFor={`${id}-name`}>Full name</label>
          <input id={`${id}-name`} className="ogt-input" value={form.name} onChange={set('name')} required autoComplete="name" />
        </div>
        <div className="ogt-fields ogt-fields-2">
          <div className="ogt-field">
            <label htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} type="email" className="ogt-input" value={form.email} onChange={set('email')} required autoComplete="email" />
          </div>
          <div className="ogt-field">
            <label htmlFor={`${id}-phone`}>Phone or WhatsApp, with country code</label>
            <input id={`${id}-phone`} type="tel" className="ogt-input" value={form.phone} onChange={set('phone')} autoComplete="tel" placeholder="+237…, +234…, +1…" />
          </div>
        </div>
        {tripFields && (
          <>
            <div className="ogt-fields ogt-fields-2">
              <div className="ogt-field">
                <label htmlFor={`${id}-city`}>City you leave from</label>
                <input id={`${id}-city`} className="ogt-input" value={form.city} onChange={set('city')} placeholder="Lagos, Douala, Houston…" autoComplete="address-level2" />
              </div>
              <div className="ogt-field">
                <label htmlFor={`${id}-date`}>Departure date, if you have one</label>
                <input id={`${id}-date`} type="date" className="ogt-input" value={form.date} onChange={set('date')} />
              </div>
            </div>
            <div className="ogt-field">
              <label htmlFor={`${id}-pax`}>Travelers</label>
              <select id={`${id}-pax`} className="ogt-select" value={form.travelers} onChange={set('travelers')}>
                {['1', '2', '3', '4', '5', '6+'].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
          </>
        )}
        <div className="ogt-field">
          <label htmlFor={`${id}-msg`}>{messageLabel}</label>
          <textarea id={`${id}-msg`} className="ogt-textarea" value={form.message} onChange={set('message')} required={messageRequired} placeholder={messagePlaceholder} />
        </div>
      </div>
      {error && <p className="ogt-alert" role="alert" style={{ marginTop: '1rem' }}>{error}</p>}
      <button type="submit" className="ogt-btn ogt-btn-hot ogt-btn-big" style={{ marginTop: '1.25rem', width: '100%' }} disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : submitLabel}
      </button>
      <p className="ogt-small ogt-muted" style={{ margin: '0.9rem 0 0' }}>Free to send. We reply by email, and nothing is charged until you have seen the price.</p>
    </form>
  );
}
