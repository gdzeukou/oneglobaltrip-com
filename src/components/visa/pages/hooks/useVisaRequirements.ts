
import { useMemo } from 'react';
import { VisaPageContext } from './useVisaPageContext';

export interface VisaRequirement {
  id: string;
  title: string;
  description: string;
  required: boolean;
  category: 'document' | 'biometric' | 'interview' | 'fee';
}

export interface FeeBreakdown {
  description: string;
  amount: number;
  currency: string;
  optional?: boolean;
}

export interface VisaRequirements {
  documents: VisaRequirement[];
  fees: FeeBreakdown[];
  processingTime: string;
  bookingUrl?: string;
  additionalRequirements: VisaRequirement[];
}

const requirementsDatabase: Record<string, VisaRequirements> = {
  // Schengen Short-Stay Examples
  'short-stay_france': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Must be valid for at least 3 months beyond intended stay', required: true, category: 'document' },
      { id: 'photo', title: 'Passport Photos', description: '2 recent passport-sized photos (35mm x 45mm)', required: true, category: 'document' },
      { id: 'application', title: 'Visa Application Form', description: 'Completed and signed Schengen visa application', required: true, category: 'document' },
      { id: 'insurance', title: 'Travel Insurance', description: 'Minimum €30,000 coverage valid in Schengen area', required: true, category: 'document' },
      { id: 'funds', title: 'Proof of Financial Means', description: 'Bank statements for last 3 months', required: true, category: 'document' },
      { id: 'accommodation', title: 'Accommodation Proof', description: 'Hotel bookings or invitation letter', required: true, category: 'document' },
      { id: 'itinerary', title: 'Travel Itinerary', description: 'Round-trip flight reservations', required: true, category: 'document' }
    ],
    fees: [
      { description: 'Visa Application Fee', amount: 80, currency: 'EUR' },
      { description: 'Service Fee', amount: 25, currency: 'USD', optional: true }
    ],
    processingTime: '15-20 business days',
    bookingUrl: 'https://france-visas.gouv.fr/',
    additionalRequirements: [
      { id: 'biometrics', title: 'Biometric Data', description: 'Fingerprints and photo at visa center', required: true, category: 'biometric' }
    ]
  },
  'short-stay_germany': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Must be valid for at least 3 months beyond intended stay', required: true, category: 'document' },
      { id: 'photo', title: 'Passport Photos', description: '2 recent passport-sized photos (35mm x 45mm)', required: true, category: 'document' },
      { id: 'application', title: 'Visa Application Form', description: 'Completed Schengen visa application', required: true, category: 'document' },
      { id: 'insurance', title: 'Travel Insurance', description: 'Minimum €30,000 coverage', required: true, category: 'document' },
      { id: 'funds', title: 'Financial Proof', description: 'Bank statements and employment letter', required: true, category: 'document' },
      { id: 'accommodation', title: 'Accommodation Proof', description: 'Hotel bookings or Verpflichtungserklärung', required: true, category: 'document' }
    ],
    fees: [
      { description: 'Visa Fee', amount: 80, currency: 'EUR' },
      { description: 'VFS Service Fee', amount: 30, currency: 'USD', optional: true }
    ],
    processingTime: '15-20 business days',
    bookingUrl: 'https://www.germany.travel/en/ms/german-missions/visa-info.html',
    additionalRequirements: [
      { id: 'biometrics', title: 'Biometric Enrollment', description: 'Required at German consulate', required: true, category: 'biometric' }
    ]
  },
  // Non-Schengen Examples
  'short-stay_uk': {
    documents: [
      { id: 'passport', title: 'Current Passport', description: 'Valid for entire stay', required: true, category: 'document' },
      { id: 'application', title: 'Online Application', description: 'Completed UK visitor visa application', required: true, category: 'document' },
      { id: 'photo', title: 'Digital Photo', description: 'Digital photo meeting UK standards', required: true, category: 'document' },
      { id: 'funds', title: 'Financial Evidence', description: 'Bank statements for 6 months', required: true, category: 'document' },
      { id: 'accommodation', title: 'Accommodation Details', description: 'Hotel bookings or sponsor letter', required: true, category: 'document' }
    ],
    fees: [
      { description: 'Standard Visitor Visa', amount: 100, currency: 'GBP' },
      { description: 'Priority Service', amount: 500, currency: 'GBP', optional: true }
    ],
    processingTime: '3 weeks',
    bookingUrl: 'https://www.gov.uk/standard-visitor-visa',
    additionalRequirements: [
      { id: 'biometrics', title: 'Biometric Information', description: 'At UK Visa Application Centre', required: true, category: 'biometric' }
    ]
  },
  'short-stay_canada': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Valid for duration of stay', required: true, category: 'document' },
      { id: 'application', title: 'Visitor Visa Application', description: 'IMM 5257 form completed online', required: true, category: 'document' },
      { id: 'photo', title: 'Passport Photos', description: 'According to Canadian photo specifications', required: true, category: 'document' },
      { id: 'funds', title: 'Proof of Funds', description: 'Bank statements and financial support', required: true, category: 'document' },
      { id: 'purpose', title: 'Purpose of Visit', description: 'Invitation letter or travel itinerary', required: true, category: 'document' }
    ],
    fees: [
      { description: 'Visitor Visa', amount: 100, currency: 'CAD' },
      { description: 'Biometrics Fee', amount: 85, currency: 'CAD' }
    ],
    processingTime: '2-4 weeks',
    bookingUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
    additionalRequirements: [
      { id: 'biometrics', title: 'Biometrics', description: 'Fingerprints and photo required', required: true, category: 'biometric' }
    ]
  },
  'short-stay_india': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Must be valid for at least 6 months', required: true, category: 'document' },
      { id: 'photo', title: 'Digital Photograph', description: 'Recent colored photograph in JPEG format', required: true, category: 'document' },
      { id: 'application', title: 'e-Visa Application', description: 'Completed online e-visa application form', required: true, category: 'document' },
      { id: 'travel', title: 'Travel Details', description: 'Flight and accommodation information', required: true, category: 'document' },
      { id: 'purpose', title: 'Purpose Documentation', description: 'Tourism/business related documents', required: true, category: 'document' }
    ],
    fees: [
      { description: 'e-Tourist Visa', amount: 25, currency: 'USD' },
      { description: 'e-Business Visa', amount: 25, currency: 'USD' },
      { description: 'Service Fee', amount: 2, currency: 'USD' }
    ],
    processingTime: '3-5 business days',
    bookingUrl: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
    additionalRequirements: [
      { id: 'arrival', title: 'Port of Arrival', description: 'Entry only through designated airports/seaports', required: true, category: 'document' }
    ]
  },
  'short-stay_uae': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Must be valid for at least 6 months', required: true, category: 'document' },
      { id: 'photo', title: 'Passport Photo', description: 'Recent colored photograph 4.3cm x 5.5cm', required: true, category: 'document' },
      { id: 'flight', title: 'Flight Booking', description: 'Round-trip flight reservation', required: true, category: 'document' },
      { id: 'accommodation', title: 'Hotel Booking', description: 'Confirmed accommodation in UAE', required: true, category: 'document' },
      { id: 'financial', title: 'Financial Proof', description: 'Bank statements and income proof', required: true, category: 'document' },
      { id: 'insurance', title: 'Travel Insurance', description: 'Medical coverage for UAE stay', required: true, category: 'document' }
    ],
    fees: [
      { description: '30-Day Tourist Visa', amount: 100, currency: 'USD' },
      { description: '90-Day Tourist Visa', amount: 350, currency: 'USD' },
      { description: 'Service Fee', amount: 25, currency: 'USD', optional: true }
    ],
    processingTime: '3-5 working days',
    bookingUrl: 'https://www.vfsvisaservices.com/ae/en/uae-visa',
    additionalRequirements: []
  },
  'short-stay_brazil': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Valid for at least 6 months', required: true, category: 'document' },
      { id: 'photo', title: 'Passport Photo', description: '2 recent passport-sized photos', required: true, category: 'document' },
      { id: 'application', title: 'Visa Application Form', description: 'Completed Brazilian visa application', required: true, category: 'document' },
      { id: 'itinerary', title: 'Travel Itinerary', description: 'Flight reservations and travel plan', required: true, category: 'document' },
      { id: 'accommodation', title: 'Accommodation Proof', description: 'Hotel reservations or invitation letter', required: true, category: 'document' },
      { id: 'financial', title: 'Financial Proof', description: 'Bank statements for last 3 months', required: true, category: 'document' },
      { id: 'vaccine', title: 'Yellow Fever Certificate', description: 'Required if coming from endemic areas', required: false, category: 'document' }
    ],
    fees: [
      { description: 'Tourist Visa', amount: 40, currency: 'USD' },
      { description: 'Business Visa', amount: 40, currency: 'USD' },
      { description: 'Consular Fee', amount: 20, currency: 'USD' }
    ],
    processingTime: '5-10 business days',
    bookingUrl: 'https://www.vfsglobal.com/brazil/usa/',
    additionalRequirements: [
      { id: 'interview', title: 'Consular Interview', description: 'May be required for certain applicants', required: false, category: 'interview' }
    ]
  },
  'short-stay_nigeria': {
    documents: [
      { id: 'passport', title: 'Valid Passport', description: 'Must be valid for at least 6 months', required: true, category: 'document' },
      { id: 'photo', title: 'Passport Photos', description: '2 recent passport-sized photos', required: true, category: 'document' },
      { id: 'application', title: 'e-Visa Application', description: 'Completed online e-visa application', required: true, category: 'document' },
      { id: 'invitation', title: 'Invitation Letter', description: 'From Nigerian host or business partner', required: true, category: 'document' },
      { id: 'accommodation', title: 'Accommodation Proof', description: 'Hotel bookings or host address', required: true, category: 'document' },
      { id: 'financial', title: 'Financial Documents', description: 'Bank statements and employment letter', required: true, category: 'document' },
      { id: 'vaccine', title: 'Yellow Fever Certificate', description: 'Mandatory vaccination certificate', required: true, category: 'document' }
    ],
    fees: [
      { description: 'Single Entry Visa', amount: 160, currency: 'USD' },
      { description: 'Multiple Entry Visa', amount: 230, currency: 'USD' },
      { description: 'Processing Fee', amount: 15, currency: 'USD' }
    ],
    processingTime: '7-14 business days',
    bookingUrl: 'https://portal.immigration.gov.ng/',
    additionalRequirements: [
      { id: 'health', title: 'Health Requirements', description: 'Medical certificate and vaccination records', required: true, category: 'document' }
    ]
  }
};

export const useVisaRequirements = (context: VisaPageContext): VisaRequirements | null => {
  return useMemo(() => {
    const key = context.visaType;
    return requirementsDatabase[key] || null;
  }, [context.visaType]);
};
