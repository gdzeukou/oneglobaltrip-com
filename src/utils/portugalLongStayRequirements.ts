
import { LucideIcon, FileText, Shield, Euro, Camera, Briefcase, GraduationCap, Heart, Building, Globe, Home, TrendingUp } from 'lucide-react';

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
      'Valid for intended stay duration',
      'At least 2 blank pages',
      'Issued within last 10 years',
      'Clear biographical page copy'
    ],
    mandatory: true
  },
  {
    icon: Shield,
    title: 'Health Insurance',
    description: 'EU-compliant coverage',
    details: [
      'Minimum €30,000 coverage',
      'Emergency repatriation included',
      'Valid throughout EU/Schengen',
      'Mental health coverage included'
    ],
    mandatory: true
  },
  {
    icon: Euro,
    title: 'Financial Proof',
    description: 'Sufficient funds evidence',
    details: [
      'Bank statements (last 3 months)',
      'Income documentation',
      'Sponsorship letters if applicable',
      'Living expenses coverage'
    ],
    mandatory: true
  },
  {
    icon: Camera,
    title: 'Biometric Photos',
    description: 'Recent photographs',
    details: [
      '35mm x 45mm size',
      'White background',
      'Taken within 6 months',
      'Biometric standards compliance'
    ],
    mandatory: true
  }
];

export const portugalLongStayRequirements: Record<string, VisaCategoryRequirements> = {
  'Work': {
    name: 'Work Visa (D2)',
    icon: Briefcase,
    processingTime: '60-90 days',
    stayDuration: 'Up to 2 years',
    fee: '€90',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Employment Contract',
        description: 'Valid job agreement',
        details: [
          'Signed contract with Portuguese employer',
          'Job description and duties',
          'Salary and working conditions',
          'Employment duration'
        ],
        mandatory: true
      },
      {
        icon: Shield,
        title: 'Work Authorization',
        description: 'IEFP pre-authorization',
        details: [
          'IEFP approval from employer',
          'Labor market test results',
          'Qualification recognition',
          'Professional credentials'
        ],
        mandatory: true
      }
    ]
  },
  'Study': {
    name: 'Student Visa (D4)',
    icon: GraduationCap,
    processingTime: '30-60 days',
    stayDuration: 'Duration of studies',
    fee: '€90',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Study Acceptance',
        description: 'Educational admission',
        details: [
          'Acceptance from Portuguese institution',
          'Course enrollment confirmation',
          'Academic transcripts',
          'Previous education certificates'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Financial Means',
        description: 'Study funding proof',
        details: [
          '€760/month for living expenses',
          'Bank statements or guarantees',
          'Scholarship documentation',
          'Parental support if applicable'
        ],
        mandatory: true
      }
    ]
  },
  'Investment': {
    name: 'D7 Visa (Passive Income)',
    icon: TrendingUp,
    processingTime: '90-120 days',
    stayDuration: '1 year (renewable)',
    fee: '€90',
    commonRequirements,
    specificRequirements: [
      {
        icon: Euro,
        title: 'Passive Income',
        description: 'Regular income proof',
        details: [
          'Minimum €760/month income',
          'Pension statements',
          'Investment income proof',
          'Rental income documentation'
        ],
        mandatory: true
      },
      {
        icon: Home,
        title: 'Accommodation',
        description: 'Portuguese housing proof',
        details: [
          'Rental agreement or property deed',
          'Accommodation certificate',
          'Habitability conditions',
          'Municipal registration'
        ],
        mandatory: true
      }
    ]
  },
  'Family': {
    name: 'Family Reunification (D6)',
    icon: Heart,
    processingTime: '90-180 days',
    stayDuration: '1 year (renewable)',
    fee: '€90',
    commonRequirements,
    specificRequirements: [
      {
        icon: Heart,
        title: 'Family Relationship',
        description: 'Proven family connection',
        details: [
          'Marriage/partnership certificate',
          'Birth certificates for children',
          'Relationship duration proof',
          'Cohabitation evidence'
        ],
        mandatory: true
      },
      {
        icon: Building,
        title: 'Portuguese Sponsor',
        description: 'Sponsor requirements',
        details: [
          'Portuguese citizenship/residence',
          'Adequate income and housing',
          'No criminal background',
          'Integration commitment'
        ],
        mandatory: true
      }
    ]
  }
};

export const getPortugalLongStayRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return portugalLongStayRequirements[category] || portugalLongStayRequirements['Work'];
};

export const getAllPortugalLongStayCategories = (): string[] => {
  return Object.keys(portugalLongStayRequirements);
};
