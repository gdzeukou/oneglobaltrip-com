import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      alert('Please agree to receive updates (GDPR).');
      return;
    }
    // Placeholder: Wire to Supabase later if needed
    console.log('Subscribe:', { email, consent });
    setEmail('');
    setConsent(false);
    alert('Thanks! You are subscribed.');
  };

  return (
    <footer className="relative text-foreground/90 bg-gradient-to-b from-background to-background/95 border-t">
      <div className="mx-auto w-full px-4 md:px-6 lg:px-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-12">
          {/* Brand & Value */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img src="/lovable-uploads/b91448b5-fbc8-45b2-93f4-ed24bfa0d28d.png" alt="One Global Trip logo" className="h-9 w-auto" />
              <span className="font-semibold text-lg">One Global Trip</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Your all-in-one luxury travel planner with guaranteed visa assistance, flights, hotels, and curated experiences.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded-md border">Visa</span>
              <span className="px-2 py-1 rounded-md border">MasterCard</span>
              <span className="px-2 py-1 rounded-md border">AmEx</span>
              <span className="px-2 py-1 rounded-md border">PayPal</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="md:col-span-3">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to={ROUTES.HOME} className="hover:underline">Home</Link></li>
              <li><Link to={ROUTES.PACKAGES} className="hover:underline">Packages</Link></li>
              <li><Link to={ROUTES.VISAS} className="hover:underline">Visas</Link></li>
              <li><Link to="/offers" className="hover:underline">Seasonal Offers</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog / Travel Tips</Link></li>
              <li><Link to={ROUTES.CONTACT} className="hover:underline">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to={ROUTES.SCHENGEN_SHORT_STAY_LANDING} className="hover:underline">Schengen Visa Pack</Link></li>
              <li><Link to={ROUTES.UK_SHORT_STAY} className="hover:underline">UK Visa Pass</Link></li>
              <li><Link to={ROUTES.BRAZIL_SHORT_STAY} className="hover:underline">Brazil eVisa</Link></li>
              <li><Link to="/passport-renewal" className="hover:underline">Passport Renewal</Link></li>
              <li><Link to="/custom-itineraries" className="hover:underline">Custom Itineraries</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+1 (877) 622-7278</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>booking@oneglobaltrip.com</span></div>
              <a href="https://maps.google.com?q=San+Francisco,+CA" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><MapPin className="h-4 w-4" /><span>San Francisco, CA</span></a>
            </div>
            <div className="mt-5 flex items-center gap-3 text-muted-foreground">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:opacity-80"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="hover:opacity-80"><Facebook className="h-5 w-5" /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:opacity-80"><Linkedin className="h-5 w-5" /></a>
              <a href="https://wa.me/18776227278" aria-label="WhatsApp chat" className="ml-2 px-2 py-1 rounded-md border text-xs inline-flex items-center gap-1">Chat with Us <Send className="h-3 w-3" /></a>
            </div>
          </div>
        </div>

        {/* Lead Capture Bar */}
        <div className="border-t py-6">
          <form onSubmit={onSubmit} className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4">
            <p className="md:flex-1 text-sm md:text-base text-muted-foreground">
              Get Free Travel Tips & Visa Updates — Join 3,000+ Subscribers
            </p>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full md:max-w-sm rounded-md border bg-background px-3 py-2"
                aria-label="Email address"
              />
              <button type="submit" className="rounded-md bg-primary text-primary-foreground px-4 py-2 hover:opacity-90 transition">Subscribe Now</button>
            </div>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
              I agree to receive updates (GDPR)
            </label>
          </form>
        </div>

        {/* Trust Row */}
        <div className="border-t py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded border">Airline Partner</span>
            <span className="px-2 py-1 rounded border">Booking.com</span>
            <span className="px-2 py-1 rounded border">Hotels.com</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded border">SSL Secure</span>
            <span className="px-2 py-1 rounded border">Verified Visa Assistance</span>
            <span className="px-2 py-1 rounded-full border">98% Success Rate</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} One Global Trip. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
