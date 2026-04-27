import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Send, ShieldCheck, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Please agree to receive updates (GDPR).');
      return;
    }
    console.log('Subscribe:', { email, consent });
    setEmail('');
    setConsent(false);
    alert('Thanks! You are subscribed.');
  };

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
                <Plane className="h-4 w-4" />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight">One Global Trip</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Your all-in-one travel planner with verified visa assistance, flights, hotels, and curated experiences — built for travelers who want it done right.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {['Visa', 'MasterCard', 'AmEx', 'PayPal'].map((label) => (
                <span key={label} className="rounded-md border border-border px-2 py-1 text-xs font-medium text-muted-foreground">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <nav className="md:col-span-3">
            <h4 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wide text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={ROUTES.HOME} className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to={ROUTES.PACKAGES} className="hover:text-foreground transition-colors">Packages</Link></li>
              <li><Link to={ROUTES.VISAS} className="hover:text-foreground transition-colors">Visas</Link></li>
              <li><Link to="/offers" className="hover:text-foreground transition-colors">Seasonal Offers</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog / Travel Tips</Link></li>
              <li><Link to={ROUTES.CONTACT} className="hover:text-foreground transition-colors">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wide text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to={ROUTES.SCHENGEN_SHORT_STAY_LANDING} className="hover:text-foreground transition-colors">Schengen Visa Pack</Link></li>
              <li><Link to={ROUTES.UK_SHORT_STAY} className="hover:text-foreground transition-colors">UK Visa Pass</Link></li>
              <li><Link to={ROUTES.BRAZIL_SHORT_STAY} className="hover:text-foreground transition-colors">Brazil eVisa</Link></li>
              <li><Link to="/passport-renewal" className="hover:text-foreground transition-colors">Passport Renewal</Link></li>
              <li><Link to="/custom-itineraries" className="hover:text-foreground transition-colors">Custom Itineraries</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h4 className="mb-4 font-serif text-sm font-semibold uppercase tracking-wide text-foreground">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /><span>+1 (877) 622-7278</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /><span>booking@oneglobaltrip.com</span></div>
              <a href="https://maps.google.com?q=San+Francisco,+CA" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <MapPin className="h-4 w-4 text-primary" /><span>San Francisco, CA</span>
              </a>
            </div>
            <div className="mt-5 flex items-center gap-3 text-muted-foreground">
              <a href="https://instagram.com" aria-label="Instagram" className="rounded-md p-1 hover-elevate"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook"  className="rounded-md p-1 hover-elevate"><Facebook className="h-5 w-5" /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn"  className="rounded-md p-1 hover-elevate"><Linkedin className="h-5 w-5" /></a>
              <a href="https://wa.me/18776227278" aria-label="WhatsApp chat" className="ml-1 inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs hover-elevate">
                Chat <Send className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Lead capture */}
        <div className="rounded-lg border border-border bg-card p-6">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <p className="font-serif text-base font-semibold text-foreground">Travel updates, in your inbox</p>
              <p className="text-sm text-muted-foreground">Free travel tips & visa updates — join 3,000+ subscribers.</p>
            </div>
            <div className="md:col-span-5 flex items-center gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
              />
              <Button type="submit">Subscribe</Button>
            </div>
            <label className="md:col-span-2 flex items-start gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
              <span>I agree to receive updates (GDPR)</span>
            </label>
          </form>
        </div>

        {/* Trust row */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            {['Airline Partner', 'Booking.com', 'Hotels.com'].map((label) => (
              <span key={label} className="rounded-md border border-border px-2 py-1">{label}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1 border-0 bg-verified-green/10 text-verified-green">
              <ShieldCheck className="h-3 w-3" /> SSL Secure
            </Badge>
            <Badge variant="secondary" className="gap-1 border-0 bg-verified-green/10 text-verified-green">
              <ShieldCheck className="h-3 w-3" /> Verified Visa Assistance
            </Badge>
            <Badge variant="secondary" className="border-0 bg-secondary text-foreground">98% Success Rate</Badge>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
          © {year} One Global Trip. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
