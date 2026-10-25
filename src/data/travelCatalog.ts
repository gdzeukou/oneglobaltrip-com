import { globeDestinations } from '@/data/globeDestinations';
import { packages } from '@/data/packages';

export type TravelKind = 'flights' | 'stays' | 'cars' | 'cruises' | 'activities';

export interface CatalogItem {
  id: string;
  kind: TravelKind;
  title: string;
  city: string;
  country: string;
  region: string;
  detail: string;
  tag: string;
  fromPrice: number;
  priceLabel: string;
}

const TOP = globeDestinations.filter((d) => d.tier === 1).slice(0, 18);

function flightPrice(region: string) {
  if (region.includes('Asia')) return 980;
  if (region.includes('Africa') || region.includes('Middle East')) return 820;
  if (region.includes('Americas') || region === 'North America') return 420;
  return 720;
}

function stayPrice(region: string, kind: string) {
  const base = region.includes('Asia') ? 95 : region.includes('Europe') ? 145 : 120;
  return kind === 'BnB' ? Math.round(base * 0.75) : base;
}

export const CATALOG: CatalogItem[] = TOP.flatMap((d) => {
  const region = d.region.split('/')[0].trim();
  return [
    { id: `flight-${d.id}`, kind: 'flights', title: `Houston → ${d.name}`, city: d.name, country: d.country, region, detail: `Round trip to ${d.name}, ${d.country}. Typical route, final live fare confirmed before you pay.`, tag: 'Flight', fromPrice: flightPrice(region), priceLabel: 'from, round trip' },
    { id: `stay-hotel-${d.id}`, kind: 'stays', title: `Hotel in ${d.name}`, city: d.name, country: d.country, region, detail: `Central hotel in ${d.name}. Free cancellation options shown at confirmation.`, tag: 'Hotel', fromPrice: stayPrice(region, 'Hotel'), priceLabel: 'from, per night' },
    { id: `stay-bnb-${d.id}`, kind: 'stays', title: `BnB / apartment in ${d.name}`, city: d.name, country: d.country, region, detail: `Apartment-style stay in ${d.name}, kitchen and local host. Good for longer trips and families.`, tag: 'BnB', fromPrice: stayPrice(region, 'BnB'), priceLabel: 'from, per night' },
    { id: `car-${d.id}`, kind: 'cars', title: `Rental car in ${d.name}`, city: d.name, country: d.country, region, detail: `Economy to SUV, pickup in ${d.name}. Insurance and mileage confirmed before you pay.`, tag: 'Rental', fromPrice: 48, priceLabel: 'from, per day' },
    { id: `act-${d.id}`, kind: 'activities', title: `${d.name} city experience`, city: d.name, country: d.country, region, detail: d.description, tag: 'Activity', fromPrice: 65, priceLabel: 'from, per person' },
  ];
});

export const CRUISES: CatalogItem[] = [
  { id: 'cruise-med', kind: 'cruises', title: '7-night Mediterranean cruise', city: 'Barcelona', country: 'Spain', region: 'Europe', detail: 'Barcelona, Rome, Naples and the Mediterranean coast. Cabin and sailing dates confirmed before you pay.', tag: 'Cruise', fromPrice: 899, priceLabel: 'from, per person' },
  { id: 'cruise-carib', kind: 'cruises', title: '7-night Caribbean cruise', city: 'Miami', country: 'United States', region: 'Americas', detail: 'Caribbean islands, onboard dining and activities. Cabin and sailing dates confirmed before you pay.', tag: 'Cruise', fromPrice: 749, priceLabel: 'from, per person' },
  { id: 'cruise-nile', kind: 'cruises', title: 'Nile cruise, Egypt', city: 'Cairo', country: 'Egypt', region: 'Africa', detail: 'Cairo to Luxor on the Nile, guided temples and history. Cabin and sailing dates confirmed before you pay.', tag: 'Cruise', fromPrice: 1099, priceLabel: 'from, per person' },
  { id: 'cruise-alaska', kind: 'cruises', title: 'Alaska cruise', city: 'Seattle', country: 'United States', region: 'Americas', detail: 'Glaciers, fjords and wildlife. Cabin and sailing dates confirmed before you pay.', tag: 'Cruise', fromPrice: 1199, priceLabel: 'from, per person' },
];

export const ALL_ITEMS: CatalogItem[] = [...CATALOG, ...CRUISES];

export const REAL_PACKAGES = packages.slice(0, 6);

export interface TripItem {
  id: string;
  kind: string;
  title: string;
  detail: string;
  price: number;
}

const KEY = 'ogt-trip-v1';

export function loadTrip(): TripItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as TripItem[]) : [];
  } catch {
    return [];
  }
}

export function addToTrip(item: TripItem) {
  const current = loadTrip();
  if (current.some((t) => t.id === item.id)) return current;
  const next = [...current, item];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('ogt-trip-changed'));
  return next;
}

export function removeFromTrip(id: string) {
  const next = loadTrip().filter((t) => t.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event('ogt-trip-changed'));
  return next;
}

export function clearTrip() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event('ogt-trip-changed'));
}
