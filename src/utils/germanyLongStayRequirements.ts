
import { LucideIcon, FileText, Clock, Users, MapPin, CreditCard, Shield, Calendar, Briefcase, GraduationCap, Heart, Camera, Plane, Building, Euro, Globe } from 'lucide-react';

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
    description: 'Must be valid for entire stay',
    details: [
      'Valid for entire intended stay duration',
      'At least 2 blank pages for visa',
      'Not older than 10 years',
      'Clear biographical page copy'
    ],
    mandatory: true
  },
  {
    icon: Shield,
    title: 'German Health Insurance',
    description: 'Comprehensive medical coverage',
    details: [
      'Minimum €30,000 coverage',
      'Compatible with German system',
      'Valid for entire stay duration',
      'Covers emergency and routine care'
    ],
    mandatory: true
  },
  {
    icon: Euro,
    title: 'Financial Proof',
    description: 'Sufficient funds demonstration',
    details: [
      'Blocked account or income proof',
      'Bank statements (last 3 months)',
      'Sponsorship letter if applicable',
      'Tax returns or salary certificates'
    ],
    mandatory: true
  },
  {
    icon: Camera,
    title: 'Biometric Photos',
    description: 'Recent biometric photographs',
    details: [
      '35mm x 45mm size',
      'White background',
      'Taken within last 6 months',
      'Meet biometric standards'
    ],
    mandatory: true
  }
];

export const germanyLongStayRequirements: Record<string, VisaCategoryRequirements> = {
  'Work': {
    name: 'Work Visa (Employment)',
    icon: Briefcase,
    processingTime: '60-120 days',
    stayDuration: 'Up to 4 years (renewable)',
    fee: '€100-€150',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Employment Contract',
        description: 'Signed employment agreement',
        details: [
          'Contract from German employer',
          'Detailed job description',
          'Salary and benefits information',
          'Duration of employment'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Qualification Recognition',
        description: 'Educational credentials',
        details: [
          'University degree certificates',
          'Professional qualification recognition',
          'Apostilled documents',
          'German translations'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Minimum Salary Threshold',
        description: 'Salary requirements met',
        details: [
          '€56,400 annually (general)',
          '€43,992 (shortage occupations)',
          'Salary certificate from employer',
          'Compliance with German standards'
        ],
        mandatory: true
      }
    ]
  },
  'Study': {
    name: 'Student Visa',
    icon: GraduationCap,
    processingTime: '60-90 days',
    stayDuration: 'Duration of studies + 18 months',
    fee: '€75',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'University Admission',
        description: 'Acceptance letter required',
        details: [
          'Admission letter from German university',
          'Course enrollment confirmation',
          'Academic transcripts',
          'Language proficiency certificate'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Blocked Account',
        description: 'Financial guarantee',
        details: [
          '€11,208 annually (minimum)',
          'Blocked account with German bank',
          'Scholarship documentation',
          'Parental income proof'
        ],
        mandatory: true
      },
      {
        icon: Globe,
        title: 'German Language',
        description: 'Language proficiency proof',
        details: [
          'German B2 level or higher',
          'TestDaF or DSH certificate',
          'IELTS for English programs',
          'University language requirements'
        ],
        mandatory: true
      }
    ]
  },
  'Family': {
    name: 'Family Reunion Visa',
    icon: Heart,
    processingTime: '90-180 days',
    stayDuration: 'Initially 1 year (renewable)',
    fee: '€75',
    commonRequirements,
    specificRequirements: [
      {
        icon: Heart,
        title: 'Relationship Proof',
        description: 'Family relationship evidence',
        details: [
          'Marriage certificate (apostilled)',
          'Birth certificates for children',
          'Family registration documents',
          'Photos and correspondence'
        ],
        mandatory: true
      },
      {
        icon: Building,
        title: 'Sponsor Requirements',
        description: 'German resident sponsor',
        details: [
          'German residence permit/citizenship',
          'Adequate housing proof',
          'Financial stability evidence',
          'Health insurance coverage'
        ],
        mandatory: true
      },
      {
        icon: Globe,
        title: 'Basic German',
        description: 'Language requirement',
        details: [
          'German A1 level certificate',
          'Integration course completion',
          'Exemptions for certain countries',
          'Age-based exemptions apply'
        ],
        mandatory: false
      }
    ]
  },
  'Business': {
    name: 'Self-Employment Visa',
    icon: Building,
    processingTime: '90-150 days',
    stayDuration: '3 years (renewable)',
    fee: '€100',
    commonRequirements,
    specificRequirements: [
      {
        icon: FileText,
        title: 'Business Plan',
        description: 'Comprehensive business proposal',
        details: [
          'Detailed business plan',
          'Market analysis and projections',
          'Financial planning documents',
          'Economic benefit to Germany'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Investment Capital',
        description: 'Minimum investment required',
        details: [
          '€25,000 minimum investment',
          'Proof of funds availability',
          'Bank guarantees',
          'Financial sustainability proof'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Professional Experience',
        description: 'Relevant business experience',
        details: [
          'Minimum 3 years experience',
          'Professional qualifications',
          'Previous business success',
          'Industry expertise proof'
        ],
        mandatory: true
      }
    ]
  }
};

export const getGermanyLongStayRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return germanyLongStayRequirements[category] || germanyLongStayRequirements['Work'];
};

export const getAllGermanyLongStayCategories = (): string[] => {
  return Object.keys(germanyLongStayRequirements);
};
