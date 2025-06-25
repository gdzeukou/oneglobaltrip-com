
import { LucideIcon, FileText, Shield, Euro, Camera, Briefcase, GraduationCap, Heart, Building, Globe, Home } from 'lucide-react';

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
      'Mental health coverage included',
      'Valid throughout EU/Schengen',
      'Emergency repatriation included'
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

export const finlandLongStayRequirements: Record<string, VisaCategoryRequirements> = {
  'Work': {
    name: 'Employee Residence Permit',
    icon: Briefcase,
    processingTime: '60-90 days',
    stayDuration: 'Up to 4 years',
    fee: '€450',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Employment Contract',
        description: 'Valid job agreement',
        details: [
          'Signed contract with Finnish employer',
          'Job description and duties',
          'Salary and working conditions',
          'Employment duration'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Salary Requirements',
        description: 'Minimum income thresholds',
        details: [
          'Adequate salary for living',
          'Compliance with collective agreements',
          'Social security contributions',
          'Tax obligations understanding'
        ],
        mandatory: true
      }
    ]
  },
  'Study': {
    name: 'Student Residence Permit',
    icon: GraduationCap,
    processingTime: '30-60 days',
    stayDuration: 'Duration of studies',
    fee: '€300',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Study Place',
        description: 'Educational admission',
        details: [
          'Acceptance from Finnish institution',
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
          '€560/month for living expenses',
          'Bank statements or guarantees',
          'Scholarship documentation',
          'Parental support if applicable'
        ],
        mandatory: true
      }
    ]
  },
  'Family': {
    name: 'Family Ties Residence Permit',
    icon: Heart,
    processingTime: '90-180 days',
    stayDuration: '1 year (renewable)',
    fee: '€450',
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
        title: 'Finnish Reference',
        description: 'Sponsor requirements',
        details: [
          'Finnish citizenship/residence',
          'Adequate income and housing',
          'No criminal background',
          'Integration commitment'
        ],
        mandatory: true
      }
    ]
  }
};

export const getFinlandLongStayRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return finlandLongStayRequirements[category] || finlandLongStayRequirements['Work'];
};

export const getAllFinlandLongStayCategories = (): string[] => {
  return Object.keys(finlandLongStayRequirements);
};
