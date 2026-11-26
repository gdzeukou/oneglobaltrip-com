/**
 * Motion for the site pages: scroll reveals, the departure-board ticker, the
 * pointer-following foil on the visa sticker and the mobile action bar.
 *
 * All of it is decoration. With reduced motion, or without JavaScript
 * observers, every element is simply visible and still.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/**
 * Reveal every `[data-reveal]` under the page as it scrolls into view.
 * Children of `[data-reveal-group]` come in one after another.
 */
export function useReveal(dep: unknown) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.ogt [data-reveal]'));
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach((n) => n.setAttribute('data-in', ''));
      return;
    }
    document.querySelectorAll<HTMLElement>('.ogt [data-reveal-group]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty('--reveal-i', String(i));
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-in', '');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [dep]);
}

/** A line of text that runs sideways forever, like a departure board. */
export function Ticker({ items, label }: { items: React.ReactNode[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul className="ogt-ticker-row" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
  return (
    <div className="ogt-ticker" role="group" aria-label={label}>
      {row(false)}
      {row(true)}
    </div>
  );
}

/**
 * Tilt and foil for a card: writes the pointer position to CSS variables and
 * lets the stylesheet do the rest.
 */
export function useFoil<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', x.toFixed(3));
        el.style.setProperty('--my', y.toFixed(3));
        el.setAttribute('data-foil', '');
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      el.removeAttribute('data-foil');
      el.style.setProperty('--mx', '0.5');
      el.style.setProperty('--my', '0.5');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);
  return ref;
}

/** The main action, with an arrow that leans forward on hover. */
export function HotLink({ to, children, className = '' }: { to: string; children: React.ReactNode; className?: string }) {
  return (
    <Link to={to} className={`ogt-btn ogt-btn-hot ${className}`}>
      <span>{children}</span>
      <ArrowRight size={18} aria-hidden="true" className="ogt-btn-arrow" />
    </Link>
  );
}

/** On phones, the main action follows the reader once the hero is behind them. */
export function StickyCta({ to, label, note }: { to: string; label: string; note: string }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const nearEnd = window.scrollY + window.innerHeight > doc.scrollHeight - 420;
      setShown(window.scrollY > 640 && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="ogt-sticky-cta" data-shown={shown ? '' : undefined} aria-hidden={!shown}>
      <span className="ogt-small">{note}</span>
      <Link to={to} className="ogt-btn ogt-btn-hot" tabIndex={shown ? 0 : -1}>
        <span>{label}</span>
        <ArrowRight size={16} aria-hidden="true" className="ogt-btn-arrow" />
      </Link>
    </div>
  );
}
