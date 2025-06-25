
import { LucideIcon, FileText, Clock, Users, MapPin, CreditCard, Shield, Calendar, Briefcase, GraduationCap, Heart, Trophy, Church } from 'lucide-react';

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

// Common requirements for all Schengen visas
const commonRequirements: RequirementItem[] = [
  {
    icon: FileText,
    title: 'Valid Passport',
    description: 'Must be valid for at least 3 months beyond intended stay',
    details: [
      'Issued within the last 10 years',
      'At least 2 blank pages for visa sticker',
      'Original passport plus photocopy'
    ],
    mandatory: true
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Minimum €30,000 coverage for medical emergencies',
    details: [
      'Valid for entire Schengen area',
      'Covers emergency medical treatment',
      'Covers repatriation costs',
      'Original policy document required'
    ],
    mandatory: true
  },
  {
    icon: CreditCard,
    title: 'Financial Proof',
    description: 'Evidence of sufficient funds for the stay',
    details: [
      'Bank statements (last 3 months)',
      'Minimum €65 per day recommended',
      'Salary certificate or employment letter',
      'Tax returns if self-employed'
    ],
    mandatory: true
  },
  {
    icon: MapPin,
    title: 'Accommodation Proof',
    description: 'Documentation of where you will stay',
    details: [
      'Hotel reservations for entire stay',
      'Invitation letter if staying with friends/family',
      'Rental agreements if applicable',
      'Address details of all accommodations'
    ],
    mandatory: true
  }
];

export const schengenRequirements: Record<string, VisaCategoryRequirements> = {
  'Tourism': {
    name: 'Tourism',
    icon: MapPin,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Calendar,
        title: 'Travel Itinerary',
        description: 'Detailed plan of your tourist activities',
        details: [
          'Flight reservations (round-trip)',
          'Planned tourist activities and attractions',
          'Daily itinerary with dates and locations',
          'Tour bookings if applicable'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Employment Letter',
        description: 'Proof of employment and leave approval',
        details: [
          'Letter from employer confirming employment',
          'Approved leave dates',
          'Salary information',
          'Company registration if self-employed'
        ],
        mandatory: true
      }
    ]
  },
  'Family/Friends': {
    name: 'Family/Friends Visit',
    icon: Heart,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Users,
        title: 'Invitation Letter',
        description: 'Official invitation from host in Schengen area',
        details: [
          'Letter from host with their signature',
          'Host\'s identity document copy',
          'Proof of host\'s legal status in Schengen area',
          'Host\'s address and contact information'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Relationship Proof',
        description: 'Evidence of relationship with host',
        details: [
          'Family relationship certificates',
          'Marriage certificates if applicable',
          'Photos together',
          'Communication history (emails, messages)'
        ],
        mandatory: true
      },
      {
        icon: Shield,
        title: 'Host\'s Financial Guarantee',
        description: 'Host\'s commitment to cover expenses',
        details: [
          'Host\'s bank statements (3 months)',
          'Host\'s employment certificate',
          'Formal declaration of financial support',
          'Host\'s tax returns'
        ],
        mandatory: false
      }
    ]
  },
  'Work/Business': {
    name: 'Business/Work',
    icon: Briefcase,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Briefcase,
        title: 'Business Invitation',
        description: 'Invitation from European business partner',
        details: [
          'Official invitation letter from EU company',
          'Company registration documents',
          'Details of business meetings/activities',
          'Contact person information'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Employment Proof',
        description: 'Documentation from your employer',
        details: [
          'Employment certificate with position',
          'Company registration documents',
          'Business license if self-employed',
          'Previous business trip records'
        ],
        mandatory: true
      },
      {
        icon: CreditCard,
        title: 'Business Expenses Coverage',
        description: 'Proof of who covers business expenses',
        details: [
          'Letter stating expense responsibility',
          'Company bank statements',
          'Travel expense policy',
          'Previous business relationship proof'
        ],
        mandatory: true
      }
    ]
  },
  'Academic Trip': {
    name: 'Academic/Educational',
    icon: GraduationCap,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: GraduationCap,
        title: 'Educational Institution Letter',
        description: 'Invitation from European educational institution',
        details: [
          'Official invitation from EU institution',
          'Program details and duration',
          'Academic credentials verification',
          'Institution accreditation proof'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Academic Records',
        description: 'Your educational background documentation',
        details: [
          'Diploma/degree certificates',
          'Academic transcripts',
          'Enrollment certificate from home institution',
          'Research proposal if applicable'
        ],
        mandatory: true
      },
      {
        icon: CreditCard,
        title: 'Funding Proof',
        description: 'Evidence of financial support for studies',
        details: [
          'Scholarship letters',
          'Bank statements showing funds',
          'Sponsor financial guarantee',
          'Grant documentation'
        ],
        mandatory: true
      }
    ]
  },
  'Conference': {
    name: 'Conference/Event',
    icon: Users,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Calendar,
        title: 'Conference Registration',
        description: 'Proof of conference registration and invitation',
        details: [
          'Conference registration confirmation',
          'Official invitation from organizers',
          'Conference program and schedule',
          'Payment receipt for registration'
        ],
        mandatory: true
      },
      {
        icon: Briefcase,
        title: 'Professional Credentials',
        description: 'Evidence of professional relevance',
        details: [
          'Professional license or certification',
          'CV/resume with relevant experience',
          'Employer letter confirming relevance',
          'Previous conference attendance records'
        ],
        mandatory: true
      }
    ]
  },
  'Religious': {
    name: 'Religious Purpose',
    icon: Church,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Church,
        title: 'Religious Organization Letter',
        description: 'Invitation from religious institution',
        details: [
          'Official invitation from religious organization',
          'Organization registration documents',
          'Event or ceremony details',
          'Religious leader contact information'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Religious Affiliation Proof',
        description: 'Evidence of your religious connection',
        details: [
          'Religious membership certificate',
          'Letter from home religious institution',
          'Religious leader recommendation',
          'Previous religious pilgrimage records'
        ],
        mandatory: false
      }
    ]
  },
  'Athletic Event': {
    name: 'Sports/Athletic Event',
    icon: Trophy,
    processingTime: '15-20 business days',
    stayDuration: 'Up to 90 days in 180-day period',
    fee: '€80 (adults), €40 (children 6-12)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Trophy,
        title: 'Sports Event Registration',
        description: 'Proof of participation in sporting event',
        details: [
          'Event registration confirmation',
          'Official invitation from sports organization',
          'Competition schedule and venue details',
          'Team or individual participant confirmation'
        ],
        mandatory: true
      },
      {
        icon: Shield,
        title: 'Sports Insurance',
        description: 'Additional sports-specific insurance coverage',
        details: [
          'Sports accident insurance',
          'Competition liability coverage',
          'Medical coverage for sports injuries',
          'Equipment insurance if applicable'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Athletic Credentials',
        description: 'Proof of athletic qualification',
        details: [
          'Sports federation membership',
          'Athletic achievement records',
          'Coach or federation recommendation',
          'Previous competition history'
        ],
        mandatory: true
      }
    ]
  }
};

export const getRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return schengenRequirements[category] || schengenRequirements['Tourism'];
};

export const getAllCategories = (): string[] => {
  return Object.keys(schengenRequirements);
};
