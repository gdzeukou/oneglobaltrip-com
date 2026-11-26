/**
 * Everything One Global Trip does, as one row of doors.
 *
 * The visa is one part of a trip. The same place books the flight, the bed,
 * the car and the rest, and keeps them in one trip with one total.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, CalendarClock, Car, Compass, Luggage, Plane, Ship, Stamp } from 'lucide-react';
import { SCOUTPASS } from '@/data/visaCatalog';

export const DOORS = [
  { to: '/visas', label: 'Visas', note: 'File, fees and follow-up', Icon: Stamp },
  { to: '/scoutpass', label: 'Appointments', note: `The hunt, ${SCOUTPASS.price}`, Icon: CalendarClock },
  { to: '/flights', label: 'Flights', note: 'From your airport', Icon: Plane },
  { to: '/stays', label: 'Stays', note: 'Hotels and apartments', Icon: BedDouble },
  { to: '/cars', label: 'Cars', note: 'Pick up where you land', Icon: Car },
  { to: '/cruises', label: 'Cruises', note: 'Sea and river', Icon: Ship },
  { to: '/activities', label: 'Activities', note: 'Tours and day trips', Icon: Compass },
  { to: '/packages', label: 'Packages', note: 'Ready-made trips', Icon: Luggage },
];

export default function TravelDeck({ skip = [] }: { skip?: string[] }) {
  return (
    <ul className="ogt-deck" data-reveal data-reveal-group>
      {DOORS.filter((d) => !skip.includes(d.to)).map(({ to, label, note, Icon }) => (
        <li key={to}>
          <Link to={to} className="ogt-door">
            <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
            <span className="ogt-door-name">{label}</span>
            <span className="ogt-door-note">{note}</span>
            <ArrowRight size={16} className="ogt-btn-arrow ogt-door-go" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
