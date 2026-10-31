import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check, Loader2, MapPin, Plus, Sparkles } from 'lucide-react';
import type { GlobeDestination } from '@/data/globeDestinations';
import { addToTrip } from '@/data/travelCatalog';
import { fetchSights, type Place } from '@/lib/places';

/**
 * The reason to go. A hero image of the city, then the things in it worth
 * crossing an ocean for, each one a card you can drop straight into a trip.
 *
 * Photos come from Wikipedia. When that is unreachable the deck still has to
 * sell the place, so the hero falls back to the destination's own colour and
 * the copy OGT already holds, and nothing jumps around.
 */

function Frame({
  photo,
  alt,
  color,
  emoji,
  className = '',
}: {
  photo: string | null;
  alt: string;
  color: string;
  emoji: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const show = photo && !failed;
  return (
    <div
      className={`relative overflow-hidden bg-zinc-900 ${className}`}
      style={show ? undefined : { background: `linear-gradient(145deg, ${color}44, #0b1224 72%)` }}
    >
      {show ? (
        <img
          src={photo}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center text-4xl opacity-70" aria-hidden="true">
          {emoji}
        </span>
      )}
    </div>
  );
}

function SightCard({
  place,
  dest,
  onAsk,
}: {
  place: Place;
  dest: GlobeDestination;
  onAsk: (q: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const add = () => {
    addToTrip({
      id: `sight-${place.id}`,
      kind: 'activities',
      title: place.title,
      detail: `${place.kind ?? 'Worth seeing'} · ${dest.name}, ${dest.country}`,
      price: 0,
    });
    setAdded(true);
  };

  return (
    <li className="rounded-2xl overflow-hidden bg-white/5 border border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full text-left flex gap-3 p-2.5 hover:bg-white/5"
      >
        <Frame
          photo={place.photo}
          alt=""
          color={dest.color}
          emoji={dest.emoji}
          className="w-20 h-20 rounded-xl shrink-0"
        />
        <span className="min-w-0 flex-1 py-0.5">
          <span className="block font-semibold text-sm leading-snug">{place.title}</span>
          {place.kind && (
            <span className="mt-0.5 block text-xs text-amber-300/80 truncate first-letter:uppercase">{place.kind}</span>
          )}
          <span className="mt-1 block text-[11px] text-white/45">
            <MapPin size={10} className="inline -mt-0.5" />{' '}
            {place.distanceKm < 1
              ? `${Math.round(place.distanceKm * 1000)} m from the centre`
              : `${place.distanceKm.toFixed(1)} km from the centre`}
          </span>
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 space-y-3">
          {place.blurb && <p className="text-sm text-white/75 leading-relaxed">{place.blurb}</p>}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={add}
              disabled={added}
              className={`flex-1 min-w-[140px] py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 ${
                added ? 'bg-emerald-400/20 text-emerald-200' : 'bg-amber-300 text-[#030712] hover:bg-amber-200'
              }`}
            >
              {added ? <><Check size={15} /> In your trip</> : <><Plus size={15} /> Add to trip</>}
            </button>
            <button
              type="button"
              onClick={() => onAsk(`Tell me about ${place.title} in ${dest.name} — is it worth a visit?`)}
              className="px-3 py-2.5 rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/10 flex items-center gap-1.5"
            >
              <Sparkles size={14} /> Ask
            </button>
            <a
              href={place.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2.5 rounded-lg border border-white/20 text-sm font-semibold hover:bg-white/10 flex items-center gap-1"
              aria-label={`Read about ${place.title} on Wikipedia`}
            >
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      )}
    </li>
  );
}

export default function SightCards({
  dest,
  onAsk,
  onFlyTo,
}: {
  dest: GlobeDestination;
  onAsk: (q: string) => void;
  onFlyTo?: (at: { lat: number; lng: number }) => void;
}) {
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [loading, setLoading] = useState(true);
  const reqId = useRef(0);

  useEffect(() => {
    const id = ++reqId.current;
    setLoading(true);
    setPlaces(null);
    fetchSights(dest.lat, dest.lng).then((found) => {
      if (id !== reqId.current) return;
      setPlaces(found);
      setLoading(false);
    });
  }, [dest.lat, dest.lng]);

  const hero = useMemo(() => places?.find((p) => p.photo) ?? null, [places]);
  const rest = useMemo(
    () => (places ?? []).filter((p) => p.id !== hero?.id).slice(0, 8),
    [places, hero],
  );

  return (
    <section className="space-y-3">
      <div className="rounded-2xl overflow-hidden border border-white/10">
        <Frame
          photo={hero?.photo ?? null}
          alt={hero ? `${hero.title}, ${dest.name}` : ''}
          color={dest.color}
          emoji={dest.emoji}
          className="h-44"
        />
        <div className="relative -mt-16 bg-gradient-to-t from-[#0b1224] via-[#0b1224]/90 to-transparent pt-12 px-4 pb-4">
          <h3 className="font-black text-2xl leading-none">{dest.name}</h3>
          <p className="mt-1 text-xs text-white/55">
            {dest.country} · {dest.region}
          </p>
          <p className="mt-2 text-sm text-white/80 leading-relaxed">{dest.description}</p>
          {hero && (
            <p className="mt-2 text-[11px] text-white/35">Photo: {hero.title}, via Wikipedia</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
          Worth the trip
        </h4>
        {loading && <Loader2 size={14} className="animate-spin text-white/40" />}
      </div>

      {loading ? (
        <ul className="space-y-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-24 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
          ))}
        </ul>
      ) : rest.length > 0 ? (
        <ul className="space-y-2">
          {rest.map((p) => (
            <SightCard key={p.id} place={p} dest={dest} onAsk={onAsk} />
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/20 p-4 space-y-3">
          <p className="text-sm text-white/70 leading-relaxed">
            We could not pull the sights for {dest.name} just now. Ask and we will tell you what is
            worth your days there.
          </p>
          <button
            type="button"
            onClick={() => onAsk(`What is worth seeing in ${dest.name}, ${dest.country}?`)}
            className="w-full bg-amber-300 text-[#030712] font-bold py-2.5 rounded-lg text-sm flex items-center justify-center gap-1.5"
          >
            <Sparkles size={15} /> What is worth seeing in {dest.name}?
          </button>
        </div>
      )}

      {onFlyTo && hero && (
        <button
          type="button"
          onClick={() => onFlyTo({ lat: hero.lat, lng: hero.lng })}
          className="w-full text-sm font-semibold text-amber-300 py-2 hover:underline"
        >
          Fly down over {hero.title}
        </button>
      )}
    </section>
  );
}
