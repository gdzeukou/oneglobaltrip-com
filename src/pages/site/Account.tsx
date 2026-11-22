/**
 * The signed-in home: one file per visa request.
 *
 * Each file shows how far the request has got and which documents are still
 * missing. Stages are read from the request row the team updates, so the
 * page only shows a step as done when it has been recorded.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { SitePage } from '@/components/site/SiteShell';
import { loadTrip } from '@/data/travelCatalog';
import { visaBySlug, type VisaService } from '@/data/visaCatalog';
import { ALLOWED_DOCUMENT_TYPES, MAX_FILE_SIZE } from '@/utils/validation';

interface Request {
  id: string;
  form_type: string;
  visa_type: string | null;
  destination: string | null;
  travel_date: string | null;
  created_at: string | null;
  lead_status: string | null;
  contacted_at: string | null;
  appointment_booked: boolean | null;
}

interface Doc {
  id: string;
  file_name: string;
  file_path: string;
  document_type: string | null;
}

interface Passport {
  first_name: string | null;
  nationality: string | null;
  passport_expiry: string | null;
}

const day = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

/** Requests the team has not opened yet carry one of these statuses. */
const UNTOUCHED = new Set(['new', 'not_contacted', '', null]);

function stagesOf(r: Request) {
  const confirmed = Boolean(r.contacted_at) || !UNTOUCHED.has(r.lead_status);
  return [
    { label: 'Request received', done: true, note: day(r.created_at) },
    { label: 'Case confirmed', done: confirmed, note: confirmed ? day(r.contacted_at) : 'We are reading it' },
    { label: 'Appointment secured', done: Boolean(r.appointment_booked), note: r.appointment_booked ? '' : 'Not yet' },
  ];
}

/** Months between today and a date, rounded down. */
function monthsUntil(iso: string): number {
  const d = new Date(iso);
  const now = new Date();
  return (d.getFullYear() - now.getFullYear()) * 12 + d.getMonth() - now.getMonth() - (d.getDate() < now.getDate() ? 1 : 0);
}

function DocumentRow({ label, docKey, doc, userId, onChange }: { label: string; docKey: string; doc?: Doc; userId: string; onChange: () => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(file: File) {
    setError('');
    if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
      setError('Use a PDF, a JPG or PNG image, or a Word file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('This file is over 10 MB. Send a smaller one.');
      return;
    }
    setBusy(true);
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const up = await supabase.storage.from('user-documents').upload(path, file, { upsert: false });
    if (up.error) {
      setBusy(false);
      setError('The file was not uploaded. Try again.');
      return;
    }
    const row = await supabase.from('user_documents').insert({
      user_id: userId,
      file_name: file.name.slice(0, 200),
      file_path: path,
      file_size: file.size,
      mime_type: file.type,
      document_type: docKey,
    });
    if (row.error) {
      await supabase.storage.from('user-documents').remove([path]);
      setError('The file was not saved. Try again.');
    }
    setBusy(false);
    onChange();
  }

  async function remove() {
    if (!doc) return;
    setBusy(true);
    await supabase.storage.from('user-documents').remove([doc.file_path]);
    await supabase.from('user_documents').delete().eq('id', doc.id);
    setBusy(false);
    onChange();
  }

  return (
    <li className="ogt-doc" data-ready={Boolean(doc)}>
      <span className="ogt-doc-box" aria-hidden="true">{doc && <Check size={14} strokeWidth={3} />}</span>
      <span>{label}</span>
      {(doc || error) && (
        <span className="ogt-doc-file" style={error ? { color: 'var(--red)', whiteSpace: 'normal' } : undefined} role={error ? 'alert' : undefined}>
          {error || doc?.file_name}
        </span>
      )}
      <span className="ogt-doc-action">
        <input ref={input} type="file" hidden accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={(e) => { const f = e.target.files?.[0]; if (f) void upload(f); e.target.value = ''; }} />
        {doc
          ? <button type="button" className="ogt-btn ogt-btn-ghost ogt-btn-small" disabled={busy} onClick={remove} aria-label={`Remove file for: ${label}`}>Remove</button>
          : <button type="button" className="ogt-btn ogt-btn-small" disabled={busy} onClick={() => input.current?.click()} aria-label={`Add file for: ${label}`}>{busy ? 'Uploading' : 'Add file'}</button>}
      </span>
    </li>
  );
}

function RequestFile({ request, visa, docs, userId, onChange }: { request: Request; visa: VisaService; docs: Doc[]; userId: string; onChange: () => void }) {
  const stages = stagesOf(request);
  const appointmentOnly = request.form_type === 'visa-appointment-hunt';
  const keyOf = (i: number) => `${visa.slug}-${i}`;
  const ready = visa.documents.filter((_, i) => docs.some((d) => d.document_type === keyOf(i))).length;

  return (
    <article className="ogt-file">
      <header className="ogt-file-head">
        <h2 className="ogt-h3" style={{ fontSize: '1.4rem' }}>{visa.name}</h2>
        <p className="ogt-small ogt-muted" style={{ margin: 0 }}>
          {appointmentOnly ? 'Appointment only' : 'Full service'}
          {request.travel_date ? `, travelling ${day(request.travel_date)}` : ''}
        </p>
      </header>
      <div className="ogt-file-body">
        <ol className="ogt-stages">
          {stages.map((s) => (
            <li key={s.label} className="ogt-stage" data-done={s.done}>
              <span className={`ogt-stage-mark ${s.done ? 'ogt-stampface' : ''}`} aria-hidden="true">{s.done ? 'Done' : ''}</span>
              <span>{s.label}<br /><span className="ogt-small" style={{ fontWeight: 400 }}>{s.note}</span></span>
            </li>
          ))}
        </ol>

        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
            <h3 className="ogt-h3">Your documents</h3>
            <p className="ogt-small ogt-muted" style={{ margin: 0 }}>{ready} of {visa.documents.length} added</p>
          </div>
          <div className="ogt-meter" style={{ margin: '0.7rem 0 0.4rem' }} role="img" aria-label={`${ready} of ${visa.documents.length} documents added`}>
            <span style={{ width: `${(ready / visa.documents.length) * 100}%` }} />
          </div>
          <ul className="ogt-docs" style={{ marginTop: '1rem' }}>
            {visa.documents.map((label, i) => (
              <DocumentRow key={label} label={label} docKey={keyOf(i)} doc={docs.find((d) => d.document_type === keyOf(i))} userId={userId} onChange={onChange} />
            ))}
          </ul>
          <p className="ogt-small ogt-muted" style={{ margin: '0.9rem 0 0' }}>
            PDF, JPG, PNG or Word, up to 10 MB each. Only you and the One Global Trip team can open them.
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Account() {
  const { user, signOut } = useAuth();
  const [requests, setRequests] = useState<Request[] | null>(null);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [passport, setPassport] = useState<Passport | null>(null);
  const [failed, setFailed] = useState(false);
  const tripCount = loadTrip().length;

  const loadDocs = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from('user_documents').select('id, file_name, file_path, document_type').eq('user_id', user.id);
    setDocs((data as Doc[] | null) ?? []);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const [req, prof] = await Promise.all([
        supabase.from('form_submissions')
          .select('id, form_type, visa_type, destination, travel_date, created_at, lead_status, contacted_at, appointment_booked')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase.from('profiles').select('first_name, nationality, passport_expiry').eq('id', user.id).maybeSingle(),
      ]);
      if (req.error) setFailed(true);
      setRequests((req.data as Request[] | null) ?? []);
      setPassport((prof.data as Passport | null) ?? null);
    })();
    void loadDocs();
  }, [user, loadDocs]);

  const files = (requests ?? [])
    .map((r) => ({ request: r, visa: visaBySlug(r.visa_type ?? undefined) }))
    .filter((f): f is { request: Request; visa: VisaService } => Boolean(f.visa));
  const name = passport?.first_name || (user?.user_metadata?.first_name as string | undefined);
  const months = passport?.passport_expiry ? monthsUntil(passport.passport_expiry) : null;

  return (
    <SitePage title="My account">
      <section className="ogt-hero" style={{ paddingBottom: '1.5rem' }}>
        <div className="ogt-wrap">
          <h1 className="ogt-h1">{name ? `${name}, here is your file.` : 'Here is your file.'}</h1>
        </div>
      </section>

      <section className="ogt-section-tight" style={{ paddingBottom: 'clamp(3.5rem, 8vw, 6rem)' }}>
        <div className="ogt-wrap ogt-split ogt-split-wide-left">
          <div>
            {failed && <p className="ogt-alert" role="alert">Your requests did not load. Reload the page to try again.</p>}
            {requests === null && !failed && <p className="ogt-muted">Loading your requests</p>}
            {requests !== null && files.length === 0 && !failed && (
              <div className="ogt-panel">
                <h2 className="ogt-h3">No visa request yet</h2>
                <p style={{ margin: '0.6rem 0 1.25rem', maxWidth: '32rem' }}>
                  Send one while you are signed in and it appears here, with its steps and the documents to add.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Link to="/start" className="ogt-btn">Start my visa</Link>
                  <Link to="/" className="ogt-btn ogt-btn-ghost">Check if I need one</Link>
                </div>
              </div>
            )}
            {user && files.map(({ request, visa }) => (
              <RequestFile key={request.id} request={request} visa={visa} docs={docs} userId={user.id} onChange={loadDocs} />
            ))}
          </div>

          <aside style={{ display: 'grid', gap: '1.75rem' }}>
            <div className="ogt-panel">
              <h2 className="ogt-h3">Passport</h2>
              <dl className="ogt-kv" style={{ marginTop: '1rem' }}>
                <div><dt>Country</dt><dd>{passport?.nationality || 'Not set'}</dd></div>
                <div><dt>Expires</dt><dd>{passport?.passport_expiry ? day(passport.passport_expiry) : 'Not set'}</dd></div>
              </dl>
              {months !== null && months < 6 && (
                <p className="ogt-alert" style={{ marginTop: '1rem' }}>
                  {months < 0 ? 'This passport has expired.' : `This passport expires in ${months} month${months === 1 ? '' : 's'}.`} Many
                  countries ask for 3 to 6 months of validity after your trip. Renew it before you apply.
                </p>
              )}
              <p style={{ margin: '1rem 0 0' }}><Link to="/profile" className="ogt-link">Edit passport details</Link></p>
            </div>

            <div className="ogt-panel">
              <h2 className="ogt-h3">The trip</h2>
              <p className="ogt-muted" style={{ margin: '0.5rem 0 1rem' }}>
                {tripCount > 0 ? `${tripCount} item${tripCount === 1 ? '' : 's'} saved in your trip.` : 'Nothing saved yet. Build the route while the visa is in progress.'}
              </p>
              <Link to={tripCount > 0 ? '/trips' : '/plan'} className="ogt-btn ogt-btn-ghost">{tripCount > 0 ? 'Open my trip' : 'Plan the trip'}</Link>
              <p style={{ margin: '1rem 0 0' }}><Link to="/file" className="ogt-link">Write my cover letter and travel plan</Link></p>
            </div>

            <div>
              <p className="ogt-small ogt-muted" style={{ margin: 0 }}>Signed in as {user?.email}</p>
              <p style={{ margin: '0.4rem 0 0', display: 'flex', gap: '1.25rem' }}>
                <Link to="/contact" className="ogt-link">Contact us</Link>
                <button type="button" className="ogt-link" style={{ background: 'none', border: 0, padding: 0, font: 'inherit', cursor: 'pointer' }} onClick={() => void signOut()}>Sign out</button>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </SitePage>
  );
}
