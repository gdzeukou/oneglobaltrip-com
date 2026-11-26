/**
 * The one header, footer and page frame for One Global Trip.
 *
 * Four things in the menu, because that is what the business sells: visas,
 * the appointment hunt, a price list, and the trip itself.
 */

import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import '@/styles/site.css';
import '@/styles/site-fx.css';
import { useReveal } from '@/components/site/fx';

export const NAV = [
  { to: '/visas', label: 'Visas' },
  { to: '/scoutpass', label: 'Appointments' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/plan', label: 'Plan a trip' },
];

/** Rough, uneven ink for the stamps. Referenced from CSS as url(#ogt-ink). */
function InkFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <filter id="ogt-ink" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="grain" />
        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.3 1.45" result="holes" />
        <feComposite in="SourceGraphic" in2="holes" operator="in" result="worn" />
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" result="warp" />
        <feDisplacementMap in="worn" in2="warp" scale="2.5" />
      </filter>
    </svg>
  );
}

export function SiteHeader() {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="ogt-header">
      <div className="ogt-wrap">
        <div className="ogt-header-row">
          <Link to="/" className="ogt-logo" aria-label="One Global Trip, home">
            <span className="ogt-logo-mark" aria-hidden="true">OGT</span>
            One Global Trip
          </Link>
          <nav className="ogt-nav" aria-label="Main">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to}>{n.label}</NavLink>
            ))}
          </nav>
          <div className="ogt-header-actions">
            <Link to={user ? '/dashboard' : '/auth'} className="ogt-signin">{user ? 'My account' : 'Sign in'}</Link>
            <Link to="/start" className="ogt-btn">Start my visa</Link>
            <button
              type="button"
              className="ogt-menu-btn"
              aria-expanded={open}
              aria-controls="ogt-drawer"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="ogt-drawer" className="ogt-drawer" aria-label="Main, mobile">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to}>{n.label}</Link>
            ))}
            <Link to="/start">Start my visa</Link>
            <Link to={user ? '/dashboard' : '/auth'}>{user ? 'My account' : 'Sign in'}</Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="ogt-footer">
      <div className="ogt-wrap">
        <div className="ogt-footer-grid">
          <div className="ogt-footer-brand">
            <p style={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem', margin: 0 }}>One Global Trip</p>
            <p style={{ margin: '0.5rem 0 0', maxWidth: '22rem' }}>
              Visa files and visa appointments, then the trip. Based in Houston, Texas.
            </p>
          </div>
          <div>
            <h3>Visas</h3>
            <ul>
              <li><Link to="/visas/schengen">Schengen</Link></li>
              <li><Link to="/visas/uk">United Kingdom</Link></li>
              <li><Link to="/visas/canada">Canada</Link></li>
              <li><Link to="/visas">All visas</Link></li>
            </ul>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li><Link to="/scoutpass">Appointment hunt</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/start">Start my visa</Link></li>
            </ul>
          </div>
          <div>
            <h3>Trips</h3>
            <ul>
              <li><Link to="/plan">Route planner</Link></li>
              <li><Link to="/globe">The globe</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/trips">My trip</Link></li>
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy</Link></li>
              <li><Link to="/terms-conditions">Terms</Link></li>
            </ul>
          </div>
        </div>
        <p className="ogt-footer-legal">
          One Global Trip is a private visa assistance company, not a government agency. Consulates alone decide whether a visa is
          granted. Entry rules change, so confirm them with the official consulate before you travel.
        </p>
      </div>
    </footer>
  );
}

export function SitePage({ children, title, tone }: { children: React.ReactNode; title?: string; /** "night": the page opens on a night band, so the header goes dark with it. */ tone?: 'night' }) {
  const { pathname, hash } = useLocation();
  useReveal(pathname);

  useEffect(() => {
    if (title) document.title = `${title} | One Global Trip`;
  }, [title]);

  // A new page starts at the top; a link to a section lands on that section.
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="ogt" data-tone={tone}>
      <InkFilter />
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
