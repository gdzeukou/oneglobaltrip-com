import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

/**
 * Floating panel over the globe. A vertical side panel on large screens,
 * a bottom sheet on phones (above the tab bar) that can be folded down to
 * its title so the Earth stays in view.
 */
export default function GlobePanel({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [folded, setFolded] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // A new panel (or new content) always opens unfolded and scrolled to the top.
  useEffect(() => {
    setFolded(false);
    bodyRef.current?.scrollTo({ top: 0 });
  }, [title]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <section
      aria-label={title}
      className="ogt-panel fixed z-30 inset-x-2 bottom-[4.75rem] lg:inset-x-auto lg:bottom-6 lg:top-24 lg:right-6 lg:w-[420px] flex flex-col rounded-2xl bg-[#0b1224]/90 backdrop-blur-xl border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] text-white text-left"
    >
      <header className="flex items-center gap-2 px-4 pt-2 pb-2 lg:pt-4 border-b border-white/10">
        <button
          type="button"
          onClick={() => setFolded((f) => !f)}
          className="lg:hidden absolute left-1/2 -translate-x-1/2 top-1.5 w-10 h-1.5 rounded-full bg-white/25"
          aria-label={folded ? 'Expand panel' : 'Fold panel'}
        />
        <h2 className="flex-1 pt-2 lg:pt-0 font-bold text-base">{title}</h2>
        <button
          type="button"
          onClick={() => setFolded((f) => !f)}
          className="lg:hidden w-8 h-8 grid place-items-center rounded-full hover:bg-white/10 mt-1"
          aria-label={folded ? 'Expand panel' : 'Fold panel'}
        >
          {folded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/10 mt-1 lg:mt-0"
          aria-label="Close panel"
        >
          <X size={18} />
        </button>
      </header>
      <div
        ref={bodyRef}
        className={`overflow-y-auto overscroll-contain px-4 ${folded ? 'hidden' : 'block'} max-h-[46svh] lg:max-h-none lg:flex-1 py-4`}
      >
        {children}
      </div>
    </section>
  );
}
