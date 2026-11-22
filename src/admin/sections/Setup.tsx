/**
 * The outside services the business runs on, one click away. Nothing here
 * holds a key: each link opens that service's own dashboard, where you sign
 * in as usual.
 */

import React from 'react';
import { CreditCard, Database, ExternalLink, Globe, HardDrive, Mail, Rocket, ServerCog, ShieldCheck } from 'lucide-react';
import { Panel } from '../ui';

const PROJECT = 'sdeyqojklszwarfrputz';

const LINKS = [
  { icon: CreditCard, title: 'Stripe', text: 'Payments, refunds and payouts', href: 'https://dashboard.stripe.com' },
  { icon: Database, title: 'Database', text: 'Tables in Supabase', href: `https://supabase.com/dashboard/project/${PROJECT}/editor` },
  { icon: ShieldCheck, title: 'Sign-in settings', text: 'Accounts, providers, email templates', href: `https://supabase.com/dashboard/project/${PROJECT}/auth/users` },
  { icon: ServerCog, title: 'Edge functions', text: 'Checkout, webhooks, AI agents', href: `https://supabase.com/dashboard/project/${PROJECT}/functions` },
  { icon: HardDrive, title: 'File storage', text: 'Uploaded documents', href: `https://supabase.com/dashboard/project/${PROJECT}/storage/buckets` },
  { icon: Rocket, title: 'Hosting', text: 'Deployments on Vercel', href: 'https://vercel.com/dashboard' },
  { icon: Mail, title: 'Email', text: 'Resend: sent mail and domains', href: 'https://resend.com/emails' },
  { icon: Globe, title: 'The website', text: 'oneglobaltrip.com', href: 'https://oneglobaltrip.com' },
];

export default function Setup() {
  return (
    <Panel title="Dashboards" description="Each opens in a new tab.">
      <div className="ogc-links">
        {LINKS.map(({ icon: Icon, title, text, href }) => (
          <a key={title} className="ogc-link-card" href={href} target="_blank" rel="noreferrer">
            <Icon />
            <span style={{ flex: 1 }}>
              <b>{title}</b>
              <span>{text}</span>
            </span>
            <ExternalLink style={{ width: 14, height: 14, color: 'var(--muted)' }} />
          </a>
        ))}
      </div>
    </Panel>
  );
}
