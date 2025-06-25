
import { LucideIcon, FileText, Clock, Users, MapPin, CreditCard, Shield, Calendar, Briefcase, GraduationCap, Heart, Camera, Plane } from 'lucide-react';

export interface RequirementItem {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[];
  mandatory: boolean;
}

export interface VisaCategoryRequirements {
  name: string;
  icon: LucideIcon;
  processingTime: string;
  stayDuration: string;
  fee: string;
  commonRequirements: RequirementItem[];
  specificRequirements: RequirementItem[];
}

const commonRequirements: RequirementItem[] = [
  {
    icon: FileText,
    title: 'Valid Passport',
    description: 'Must be valid for at least 6 months',
    details: [
      'At least 2 blank pages available',
      'Clear color copy of biographical page',
      'Previous UAE visas if applicable',
      'Must not be damaged or altered'
    ],
    mandatory: true
  },
  {
    icon: Camera,
    title: 'Passport Photo',
    description: 'Recent colored photograph',
    details: [
      'White background, 4.3cm x 5.5cm',
      'Clear facial features, no glasses',
      'Taken within last 6 months',
      'JPEG format for online applications'
    ],
    mandatory: true
  },
  {
    icon: Plane,
    title: 'Flight Booking',
    description: 'Round-trip flight reservation',
    details: [
      'Confirmed return flight booking',
      'Flight itinerary with dates',
      'Valid for entire stay duration',
      'From recognized airlines'
    ],
    mandatory: true
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Medical coverage for UAE stay',
    details: [
      'Minimum $100,000 coverage',
      'Valid for entire UAE stay',
      'Covers medical emergencies',
      'COVID-19 coverage included'
    ],
    mandatory: true
  }
];

export const uaeVisaRequirements: Record<string, VisaCategoryRequirements> = {
  'Tourist-30': {
    name: '30-Day Tourist Visa',
    icon: MapPin,
    processingTime: '3-5 working days',
    stayDuration: '30 days (single entry)',
    fee: '$100-$150 (varies by nationality)',
    commonRequirements,
    specificRequirements: [
      {
        icon: MapPin,
        title: 'Hotel Booking',
        description: 'Confirmed accommodation in UAE',
        details: [
          'Hotel reservation for entire stay',
          '4-star or above hotel preferred',
          'Booking confirmation with dates',
          'Contact details of accommodation'
        ],
        mandatory: true
      },
      {
        icon: CreditCard,
        title: 'Financial Proof',
        description: 'Bank statements and income',
        details: [
          'Bank statements (last 3 months)',
          'Minimum $4,000 balance',
          'Salary certificate or employment letter',
          'Credit card statements if applicable'
        ],
        mandatory: true
      }
    ]
  },
  'Tourist-90': {
    name: '90-Day Tourist Visa',
    icon: MapPin,
    processingTime: '3-5 working days',
    stayDuration: '90 days (multiple entry)',
    fee: '$350-$500 (varies by nationality)',
    commonRequirements,
    specificRequirements: [
      {
        icon: MapPin,
        title: 'Extended Accommodation',
        description: 'Long-term accommodation proof',
        details: [
          'Hotel bookings or rental agreements',
          'Accommodation for entire 90-day period',
          'Multiple location bookings if traveling',
          'Contact information for all accommodations'
        ],
        mandatory: true
      },
      {
        icon: CreditCard,
        title: 'Enhanced Financial Proof',
        description: 'Higher financial requirements',
        details: [
          'Bank statements (last 6 months)',
          'Minimum $10,000 balance',
          'Income tax returns',
          'Property ownership documents'
        ],
        mandatory: true
      }
    ]
  },
  'Business': {
    name: 'Business Visa',
    icon: Briefcase,
    processingTime: '5-7 working days',
    stayDuration: '30-90 days (multiple entry)',
    fee: '$200-$400 (varies by duration)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Briefcase,
        title: 'Business Invitation',
        description: 'UAE company invitation letter',
        details: [
          'Invitation from UAE registered company',
          'Company trade license copy',
          'Business meeting agenda',
          'Sponsor company contact details'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Company Documents',
        description: 'Your business credentials',
        details: [
          'Company registration certificate',
          'Business license and permits',
          'Employment letter with designation',
          'Previous business visa history'
        ],
        mandatory: true
      },
      {
        icon: Shield,
        title: 'Business Insurance',
        description: 'Commercial travel insurance',
        details: [
          'Business travel insurance policy',
          'Coverage for business activities',
          'Liability coverage included',
          'Valid for entire business stay'
        ],
        mandatory: true
      }
    ]
  },
  'Transit': {
    name: 'Transit Visa',
    icon: Plane,
    processingTime: '2-3 working days',
    stayDuration: '96 hours (4 days)',
    fee: '$60-$100',
    commonRequirements,
    specificRequirements: [
      {
        icon: Plane,
        title: 'Onward Journey',
        description: 'Confirmed connecting flight',
        details: [
          'Connecting flight booking confirmation',
          'Maximum 96-hour layover',
          'Valid visa for final destination',
          'Same airline or codeshare preferred'
        ],
        mandatory: true
      },
      {
        icon: MapPin,
        title: 'Dubai Transit',
        description: 'Transit through Dubai Airport',
        details: [
          'Must transit through Dubai International Airport',
          'Cannot leave Dubai emirate',
          'Airport hotel booking if staying overnight',
          'Return to airport for departure'
        ],
        mandatory: true
      }
    ]
  }
};

export const getUAERequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return uaeVisaRequirements[category] || uaeVisaRequirements['Tourist-30'];
};

export const getAllUAECategories = (): string[] => {
  return Object.keys(uaeVisaRequirements);
};
