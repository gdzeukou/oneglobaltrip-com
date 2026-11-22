/**
 * One request form for every visa service.
 *
 * It saves to `form_submissions`, the table the admin dashboard already
 * reads. Nothing is charged here: the team replies with the document list
 * and the payment step.
 */

import React, { useId, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PASSPORT_COUNTRIES } from '@/lib/travelResolve';
import { SCOUTPASS, VISA_SERVICES, priceOf, visaBySlug } from '@/data/visaCatalog';

type Service = 'full' | 'appointment';

export interface RequestDefaults {
  visa?: string;
  passport?: string;
  destination?: string;
  service?: Service;
}

export default function RequestForm({ defaults = {} }: { defaults?: RequestDefaults }) {
  const id = useId();
  const [visa, setVisa] = useState(visaBySlug(defaults.visa)?.slug ?? 'schengen');
  const [service, setService] = useState<Service>(defaults.service ?? 'full');
  const [passport, setPassport] = useState(defaults.passport && PASSPORT_COUNTRIES.includes(defaults.passport) ? defaults.passport : '');
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', date: '', travelers: '1', notes: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const chosen = visaBySlug(visa)!;
  const price = priceOf(chosen.pricing);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!passport) {
      setError('Choose the passport you will travel on.');
      return;
    }
    setState('sending');
    const { data: auth } = await supabase.auth.getUser();
    const { error: dbError } = await supabase.from('form_submissions').insert([{
      form_type: service === 'appointment' ? 'visa-appointment-hunt' : 'visa-application',
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      nationality: passport,
      destination: defaults.destination || chosen.name,
      visa_type: chosen.slug,
      travel_date: form.date || null,
      travelers: form.travelers,
      special_requests: [form.city && `Applying from: ${form.city}`, form.notes].filter(Boolean).join('\n') || null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
      user_id: auth?.user?.id ?? null,
    }]);
    if (dbError) {
      setState('idle');
      setError('The request was not sent. Check your connection and send it again.');
      return;
    }
    setState('sent');
  }

  if (state === 'sent') {
    return (
      <div className="ogt-panel" role="status">
        <h3 className="ogt-h3">Request received</h3>
        <p style={{ margin: '0.6rem 0 0' }}>
          We will write to <b>{form.email}</b> with your document list and the next step. You pay nothing until you have
          confirmed the price with us.
        </p>
      </div>
    );
  }

  return (
    <form className="ogt-panel" onSubmit={submit} noValidate={false}>
      <div className="ogt-fields">
        <div className="ogt-field">
          <label htmlFor={`${id}-visa`}>Visa</label>
          <select id={`${id}-visa`} className="ogt-select" value={visa} onChange={(e) => setVisa(e.target.value)}>
            {VISA_SERVICES.map((v) => <option key={v.slug} value={v.slug}>{v.name}</option>)}
          </select>
        </div>

        <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
          <legend className="ogt-label" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '0.3rem' }}>What you need</legend>
          <div className="ogt-tabs" style={{ display: 'flex' }}>
            <button type="button" style={{ flex: 1 }} aria-pressed={service === 'full'} onClick={() => setService('full')}>
              Full service, {price.totalPrice}
            </button>
            <button type="button" style={{ flex: 1 }} aria-pressed={service === 'appointment'} onClick={() => setService('appointment')}>
              Appointment only, {SCOUTPASS.price}
            </button>
          </div>
          <p className="ogt-small ogt-muted" style={{ margin: '0.5rem 0 0' }}>
            {service === 'full'
              ? 'We prepare the file, review your documents and book the appointment. Consulate and center fees are included.'
              : `We hunt the appointment, you prepare your own file. ${SCOUTPASS.refund}`}
          </p>
        </fieldset>

        <div className="ogt-fields ogt-fields-2">
          <div className="ogt-field">
            <label htmlFor={`${id}-passport`}>Passport</label>
            <select id={`${id}-passport`} className="ogt-select" value={passport} onChange={(e) => setPassport(e.target.value)} required>
              <option value="">Choose a country</option>
              {PASSPORT_COUNTRIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="ogt-field">
            <label htmlFor={`${id}-city`}>City you apply from</label>
            <input id={`${id}-city`} className="ogt-input" value={form.city} onChange={set('city')} placeholder="Houston, TX" autoComplete="address-level2" />
          </div>
          <div className="ogt-field">
            <label htmlFor={`${id}-date`}>Travel date, if you have one</label>
            <input id={`${id}-date`} type="date" className="ogt-input" value={form.date} onChange={set('date')} />
          </div>
          <div className="ogt-field">
            <label htmlFor={`${id}-travelers`}>Applicants</label>
            <select id={`${id}-travelers`} className="ogt-select" value={form.travelers} onChange={set('travelers')}>
              {['1', '2', '3', '4', '5', '6+'].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="ogt-field">
          <label htmlFor={`${id}-name`}>Full name, as on the passport</label>
          <input id={`${id}-name`} className="ogt-input" value={form.name} onChange={set('name')} required autoComplete="name" />
        </div>
        <div className="ogt-fields ogt-fields-2">
          <div className="ogt-field">
            <label htmlFor={`${id}-email`}>Email</label>
            <input id={`${id}-email`} type="email" className="ogt-input" value={form.email} onChange={set('email')} required autoComplete="email" />
          </div>
          <div className="ogt-field">
            <label htmlFor={`${id}-phone`}>Phone or WhatsApp</label>
            <input id={`${id}-phone`} type="tel" className="ogt-input" value={form.phone} onChange={set('phone')} required autoComplete="tel" />
          </div>
        </div>
        <div className="ogt-field">
          <label htmlFor={`${id}-notes`}>Anything we should know</label>
          <textarea id={`${id}-notes`} className="ogt-textarea" value={form.notes} onChange={set('notes')} placeholder="A past refusal, a fixed event date, travelling with children..." />
        </div>

        {error && <p className="ogt-alert" role="alert">{error}</p>}

        <div>
          <button type="submit" className="ogt-btn" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending request' : 'Send my request'}
          </button>
          <p className="ogt-small ogt-muted" style={{ margin: '0.7rem 0 0' }}>No payment now. We confirm the price and the document list first.</p>
        </div>
      </div>
    </form>
  );
}
