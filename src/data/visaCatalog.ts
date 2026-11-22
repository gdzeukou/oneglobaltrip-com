/**
 * Every visa One Global Trip sells, in one list.
 *
 * Prices are not repeated here: each entry points at its row in
 * `visaPricing.ts`, so the catalogue, the detail pages and the pricing table
 * can never disagree. Document lists are the standard ones; the consulate
 * sets the final list for each case.
 */

import { visaPricingData, type VisaPricingData, type VisaPricingKey } from '@/data/visaPricing';
import { SCHENGEN } from '@/lib/travelResolve';

export type VisaKind = 'short' | 'long';

export interface VisaService {
  slug: string;
  kind: VisaKind;
  name: string;
  /** One line on what it lets the traveler do. */
  summary: string;
  stay: string;
  /** How long a decision usually takes, in plain words. */
  timing: string;
  /** How the application is made. */
  route: string;
  pricing: VisaPricingKey;
  /** A second price for the same visa, such as a longer validity. */
  variant?: { label: string; pricing: VisaPricingKey };
  documents: string[];
  /** Destination countries this visa covers, for the visa check. */
  covers: string[];
}

const LONG_STAY_DOCUMENTS = [
  'Passport valid for the whole stay, with blank pages',
  'National (type D) visa application form',
  'Proof of the reason for the stay: work contract, university admission, family tie or proof of income',
  'Proof of funds for the stay',
  'Proof of accommodation',
  'Health insurance valid in the country',
  'Criminal record certificate, where the consulate asks for one',
];

const longStay = (country: string, pricing: VisaPricingKey): VisaService => ({
  slug: `${country.toLowerCase()}-long-stay`,
  kind: 'long',
  name: `${country} long-stay visa`,
  summary: `Live, work or study in ${country} for more than 90 days.`,
  stay: 'More than 90 days',
  timing: 'Several weeks to a few months, depending on the reason for the stay',
  route: 'In person at the consulate or its visa center',
  pricing,
  documents: LONG_STAY_DOCUMENTS,
  covers: [],
});

export const VISA_SERVICES: VisaService[] = [
  {
    slug: 'schengen',
    kind: 'short',
    name: 'Schengen short-stay visa',
    summary: 'One visa for 29 European countries, for tourism, family visits or business.',
    stay: 'Up to 90 days in any 180',
    timing: 'Usually 15 days after the appointment, up to 45',
    route: 'In person at VFS Global, TLScontact or BLS, by appointment',
    pricing: 'schengenShortStay',
    documents: [
      'Passport issued in the last 10 years, valid 3 months past your return, with 2 blank pages',
      'Schengen application form, completed and signed',
      'One recent photo, 35 × 45 mm',
      'Travel medical insurance covering at least €30,000',
      'Round-trip flight itinerary',
      'Proof of accommodation for every night',
      'Bank statements for the last 3 months',
      'Proof of legal residence where you apply, such as a green card or a valid US visa',
      'Letter from your employer or school',
    ],
    covers: [...SCHENGEN],
  },
  {
    slug: 'uk',
    kind: 'short',
    name: 'UK visitor visa',
    summary: 'Visit England, Scotland, Wales and Northern Ireland for tourism, family or business.',
    stay: 'Up to 6 months',
    timing: 'Usually about 3 weeks after biometrics',
    route: 'Online application, then a biometrics appointment',
    pricing: 'ukVisa6Month',
    variant: { label: '5-year visa', pricing: 'ukVisa5Year' },
    documents: [
      'Valid passport',
      'Online application on GOV.UK',
      'Bank statements and proof of income',
      'Employment or study details',
      'Travel plan and where you will stay',
      'Biometrics appointment confirmation',
    ],
    covers: ['United Kingdom'],
  },
  {
    slug: 'canada',
    kind: 'short',
    name: 'Canada visitor visa or eTA',
    summary: 'Enter Canada as a visitor. Depending on your passport, that is a visitor visa or an eTA.',
    stay: 'Up to 6 months',
    timing: 'Varies by country of residence',
    route: 'Online application, then biometrics where required',
    pricing: 'canadaEntry',
    documents: [
      'Valid passport',
      'Online application with Immigration, Refugees and Citizenship Canada',
      'Proof of funds for the visit',
      'Purpose of the trip, with an invitation letter if you are visiting someone',
      'Proof of ties to your country of residence',
      'Biometrics, where required',
    ],
    covers: ['Canada'],
  },
  {
    slug: 'uae',
    kind: 'short',
    name: 'UAE tourist visa',
    summary: 'Visit Dubai, Abu Dhabi and the rest of the Emirates.',
    stay: '30 or 60 days',
    timing: 'Typically a few working days',
    route: 'Online, no appointment',
    pricing: 'uaeVisa',
    documents: [
      'Passport valid for at least 6 months',
      'Recent passport photo',
      'Confirmed return ticket',
      'Hotel booking or host details',
    ],
    covers: ['UAE'],
  },
  {
    slug: 'india',
    kind: 'short',
    name: 'India e-Visa',
    summary: 'Tourism, business or medical visits to India, applied for online.',
    stay: '30 days to 5 years, depending on the e-Visa',
    timing: 'Typically about 72 hours',
    route: 'Online, no appointment',
    pricing: 'indiaVisa',
    documents: [
      'Passport valid for at least 6 months, with 2 blank pages',
      'Scan of the passport photo page',
      'Recent photo on a white background',
      'Return or onward ticket',
    ],
    covers: ['India'],
  },
  {
    slug: 'brazil',
    kind: 'short',
    name: 'Brazil eVisa',
    summary: 'Electronic visitor visa for Brazil, applied for online.',
    stay: 'Up to 90 days',
    timing: 'Typically about 5 working days',
    route: 'Online, no appointment',
    pricing: 'brazilEVisa',
    documents: [
      'Valid passport',
      'Recent photo on a white background',
      'Return ticket or travel itinerary',
      'Recent bank statement or proof of income',
    ],
    covers: ['Brazil'],
  },
  {
    slug: 'nigeria',
    kind: 'short',
    name: 'Nigeria visa',
    summary: 'Tourist, business or family visit visa for Nigeria.',
    stay: 'Set by the visa issued',
    timing: 'Varies by application center',
    route: 'Online application, then an appointment at the visa center',
    pricing: 'nigeriaVisa',
    documents: [
      'Passport valid for at least 6 months',
      'Online application and payment receipt',
      'Two recent passport photos',
      'Invitation letter or hotel booking',
      'Return ticket',
    ],
    covers: ['Nigeria'],
  },
  longStay('Portugal', 'portugalLongStay'),
  longStay('Germany', 'germanyLongStay'),
  longStay('France', 'franceLongStay'),
  longStay('Denmark', 'denmarkLongStay'),
  longStay('Finland', 'finlandLongStay'),
  longStay('Norway', 'norwayLongStay'),
  longStay('Switzerland', 'switzerlandLongStay'),
];

export const SHORT_STAY = VISA_SERVICES.filter((v) => v.kind === 'short');
export const LONG_STAY = VISA_SERVICES.filter((v) => v.kind === 'long');

export function visaBySlug(slug: string | undefined): VisaService | undefined {
  return VISA_SERVICES.find((v) => v.slug === slug);
}

export function priceOf(key: VisaPricingKey): VisaPricingData {
  return visaPricingData[key];
}

/** The service that covers a destination country, if we sell one. */
export function serviceFor(country: string): VisaService | undefined {
  return SHORT_STAY.find((v) => v.covers.includes(country));
}

/** Destinations offered in the visa check: every country a short-stay service covers. */
export const CHECK_DESTINATIONS: string[] = Array.from(
  new Set(SHORT_STAY.flatMap((v) => v.covers)),
).sort((a, b) => a.localeCompare(b));

/** "€189" → 189. Prices are stored as display strings. */
export function amount(price: string): number {
  return Number(price.replace(/[^\d.]/g, '')) || 0;
}

/** Appointment hunt: the one price that is the same for every visa. */
export const SCOUTPASS = {
  price: '$67',
  unit: 'per applicant',
  refund: 'Refunded in full if we cannot secure an appointment.',
  centers: ['VFS Global', 'TLScontact', 'BLS'],
};
