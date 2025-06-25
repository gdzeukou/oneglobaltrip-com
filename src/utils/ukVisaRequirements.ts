
import { LucideIcon, FileText, Clock, Users, MapPin, CreditCard, Shield, Calendar, Briefcase, GraduationCap, Heart, Trophy, Church, Plane } from 'lucide-react';

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

// Common requirements for all UK visitor visas
const commonRequirements: RequirementItem[] = [
  {
    icon: FileText,
    title: 'Valid Passport',
    description: 'Must be valid for entire stay duration',
    details: [
      'At least one blank page for visa',
      'Issued within the last 10 years',
      'Original passport plus photocopy',
      'Previous passports if available'
    ],
    mandatory: true
  },
  {
    icon: CreditCard,
    title: 'Financial Evidence',
    description: 'Proof of funds to support your stay',
    details: [
      'Bank statements (last 6 months)',
      'Payslips or employment letter',
      'Tax returns if self-employed',
      'Evidence of other income sources',
      'Minimum £100 per day recommended'
    ],
    mandatory: true
  },
  {
    icon: MapPin,
    title: 'Accommodation Details',
    description: 'Where you will stay in the UK',
    details: [
      'Hotel bookings for entire stay',
      'Invitation letter if staying with friends/family',
      'Address details of all accommodations',
      'Contact information of hosts'
    ],
    mandatory: true
  },
  {
    icon: Plane,
    title: 'Travel History',
    description: 'Previous international travel evidence',
    details: [
      'Previous visa stamps in passport',
      'Flight booking confirmations',
      'Travel insurance documentation',
      'Return ticket confirmation'
    ],
    mandatory: true
  }
];

export const ukVisaRequirements: Record<string, VisaCategoryRequirements> = {
  'Tourism': {
    name: 'Tourism/Leisure',
    icon: MapPin,
    processingTime: '3-8 weeks',
    stayDuration: 'Up to 6 months',
    fee: '£100 (standard), £500 (priority)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Calendar,
        title: 'Travel Itinerary',
        description: 'Detailed UK travel plans',
        details: [
          'Planned tourist activities and attractions',
          'Daily itinerary with dates and locations',
          'Tour bookings and reservations',
          'Transportation arrangements within UK'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Employment Status',
        description: 'Proof of ties to home country',
        details: [
          'Employment letter with leave approval',
          'Business registration if self-employed',
          'Student enrollment if applicable',
          'Retirement documents if applicable'
        ],
        mandatory: true
      }
    ]
  },
  'Family/Friends': {
    name: 'Family/Friends Visit',
    icon: Heart,
    processingTime: '3-8 weeks',
    stayDuration: 'Up to 6 months',
    fee: '£100 (standard), £500 (priority)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Users,
        title: 'Sponsor Documentation',
        description: 'UK sponsor evidence and invitation',
        details: [
          'Invitation letter from UK sponsor',
          'Sponsor\'s passport/ID copy',
          'Proof of sponsor\'s UK status',
          'Sponsor\'s address and contact details'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Relationship Evidence',
        description: 'Proof of relationship with sponsor',
        details: [
          'Family relationship certificates',
          'Marriage/birth certificates',
          'Photos together over time',
          'Communication history (emails, calls)'
        ],
        mandatory: true
      },
      {
        icon: CreditCard,
        title: 'Sponsor\'s Financial Support',
        description: 'UK sponsor\'s ability to support visit',
        details: [
          'Sponsor\'s bank statements (6 months)',
          'Sponsor\'s employment letter',
          'Sponsor\'s accommodation details',
          'Financial undertaking letter'
        ],
        mandatory: false
      }
    ]
  },
  'Business': {
    name: 'Business Visit',
    icon: Briefcase,
    processingTime: '3-8 weeks',
    stayDuration: 'Up to 6 months',
    fee: '£100 (standard), £500 (priority)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Briefcase,
        title: 'Business Invitation',
        description: 'UK business partner invitation',
        details: [
          'Invitation letter from UK company',
          'UK company registration details',
          'Meeting agenda and business purpose',
          'Contact person details in UK'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Company Documentation',
        description: 'Your business/employment proof',
        details: [
          'Employment letter with position details',
          'Company registration documents',
          'Business cards and company profile',
          'Previous business relationship evidence'
        ],
        mandatory: true
      }
    ]
  },
  'Academic': {
    name: 'Academic/Conference',
    icon: GraduationCap,
    processingTime: '3-8 weeks',
    stayDuration: 'Up to 6 months',
    fee: '£100 (standard), £500 (priority)',
    commonRequirements,
    specificRequirements: [
      {
        icon: GraduationCap,
        title: 'Academic Institution Letter',
        description: 'UK institution invitation or conference',
        details: [
          'Official invitation from UK institution',
          'Conference registration confirmation',
          'Academic program details',
          'Institution accreditation proof'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Academic Credentials',
        description: 'Your educational/professional background',
        details: [
          'Degree certificates and transcripts',
          'Professional qualifications',
          'CV with academic/professional experience',
          'Research proposal if applicable'
        ],
        mandatory: true
      }
    ]
  }
};

export const getUKRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return ukVisaRequirements[category] || ukVisaRequirements['Tourism'];
};

export const getAllUKCategories = (): string[] => {
  return Object.keys(ukVisaRequirements);
};
