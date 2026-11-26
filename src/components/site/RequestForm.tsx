/**
 * One request form for every visa service.
 *
 * It saves to `form_submissions`, the table the admin dashboard already
 * reads. Nothing is charged here: the team replies with the document list
 * and the payment step.
 */

import React, { useId, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PASSPORT_COUNTRIES, SCHENGEN } from '@/lib/travelResolve';
import { SCOUTPASS, VISA_SERVICES, priceOf, visaBySlug } from '@/data/visaCatalog';

type Service = 'full' | 'appointment';

export interface RequestDefaults {
  visa?: string;
  passport?: string;
  destination?: string;
  service?: Service;
  date?: string;
  travelers?: string;
  notes?: string;
}

export default function RequestForm({ defaults = {} }: { defaults?: RequestDefaults }) {
  const id = useId();
  const [visa, setVisa] = useState(visaBySlug(defaults.visa)?.slug ?? 'schengen');
  const [service, setService] = useState<Service>(defaults.service ?? 'full');
  const [passport, setPassport] = useState(defaults.passport && PASSPORT_COUNTRIES.includes(defaults.passport) ? defaults.passport : '');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', city: '',
    date: defaults.date ?? '',
    travelers: ['1', '2', '3', '4', '5'].includes(defaults.travelers ?? '') ? defaults.travelers! : defaults.travelers ? '6+' : '1',
    notes: defaults.notes ?? '',
  });
  const [country, setCountry] = useState(defaults.destination && SCHENGEN.has(defaults.destination) ? defaults.destination : '');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'sent-unpaid'>('idle');
  const [error, setError] = useState('');

  const chosen = visaBySlug(visa)!;
  const price = priceOf(chosen.pricing);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // The appointment hunt is paid online, one applicant at a time. Everything
  // else is a request: the team confirms the case and the price first.
  const payNow = service === 'appointment' && form.travelers === '1';
  const needsCountry = service === 'appointment' && chosen.slug === 'schengen';
  const destination = needsCountry ? country : chosen.covers[0] ?? defaults.destination ?? chosen.name;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!passport) {
      setError('Choose the passport you will travel on.');
      return;
    }
    if (needsCountry && !country) {
      setError('Choose the country whose consulate you apply to.');
      return;
    }
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const lastName = rest.join(' ');
    if (payNow && !lastName) {
      setError('Enter your first and last name, as on the passport.');
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
      destination: needsCountry ? country : defaults.destination || chosen.name,
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
    if (!payNow) {
      setState('sent');
      return;
    }

    // The price is set on the server; the browser only says who is applying.
    const { data, error: payError } = await supabase.functions.invoke('create-checkout', {
      body: {
        first_name: firstName,
        last_name: lastName,
        email: form.email.trim(),
        phone: form.phone.trim(),
        nationality: passport,
        destination_country: destination,
        visa_type: chosen.name,
        travel_date_from: form.date || null,
        preferred_cities: form.city.trim() ? [form.city.trim()] : [],
        is_group: false,
      },
    });
    const url = (data as { url?: string } | null)?.url;
    if (payError || !url) {
      setState('sent-unpaid');
      return;
    }
    window.location.assign(url);
  }

  if (state === 'sent-unpaid') {
    return (
      <div className="ogt-panel" role="status">
        <h3 className="ogt-h3">Request saved, payment not opened</h3>
        <p style={{ margin: '0.6rem 0 0' }}>
          Your request is with us, but the payment page did not open and nothing was charged. We will write to{' '}
          <b>{form.email}</b> with a payment link.
        </p>
      </div>
    );
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

        {needsCountry && (
          <div className="ogt-field">
            <label htmlFor={`${id}-country`}>Country whose consulate you apply to</label>
            <select id={`${id}-country`} className="ogt-select" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Choose a country</option>
              {[...SCHENGEN].sort().map((c) => <option key={c}>{c}</option>)}
            </select>
            <p className="ogt-small ogt-muted" style={{ margin: '0.4rem 0 0' }}>The one where you spend the most nights. The planner works it out for you.</p>
          </div>
        )}

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
            <input id={`${id}-city`} className="ogt-input" value={form.city} onChange={set('city')} placeholder="Lagos, Douala, Houston…" autoComplete="address-level2" />
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
            {state === 'sending' ? (payNow ? 'Opening payment' : 'Sending request') : payNow ? `Pay ${SCOUTPASS.price} and start the hunt` : 'Send my request'}
          </button>
          <p className="ogt-small ogt-muted" style={{ margin: '0.7rem 0 0' }}>
            {payNow
              ? `Card payment on Stripe. ${SCOUTPASS.refund}`
              : service === 'appointment'
                ? 'For more than one applicant, send the request and we reply with one payment link for the group.'
                : 'No payment now. We confirm the price and the document list first.'}
          </p>
        </div>
      </div>
    </form>
  );
}
