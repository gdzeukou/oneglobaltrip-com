
import { LucideIcon, FileText, Clock, Users, MapPin, CreditCard, Shield, Calendar, Briefcase, GraduationCap, Heart, Camera, Plane, Building, Euro, Globe, Home } from 'lucide-react';

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
      'Issued within last 10 years',
      'Clear biographical page copy'
    ],
    mandatory: true
  },
  {
    icon: Shield,
    title: 'Health Insurance',
    description: 'Comprehensive medical coverage',
    details: [
      'Minimum €30,000 coverage',
      'Valid throughout Schengen area',
      'Covers emergency and repatriation',
      'OFII validation required'
    ],
    mandatory: true
  },
  {
    icon: Home,
    title: 'Accommodation Proof',
    description: 'Housing arrangement in France',
    details: [
      'Rental agreement or hotel booking',
      'Property ownership documents',
      'Host family attestation',
      'University housing confirmation'
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
      'Meet ICAO standards'
    ],
    mandatory: true
  }
];

export const franceLongStayRequirements: Record<string, VisaCategoryRequirements> = {
  'Work': {
    name: 'Work Visa (Salarié)',
    icon: Briefcase,
    processingTime: '60-90 days',
    stayDuration: 'Up to 4 years (renewable)',
    fee: '€99',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Work Authorization',
        description: 'DIRECCTE work permit',
        details: [
          'Work permit from DIRECCTE',
          'Employment contract copy',
          'Company registration documents',
          'Labor market test (if required)'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Professional Qualifications',
        description: 'Education and experience',
        details: [
          'Diploma recognition by ENIC-NARIC',
          'Professional certificates',
          'Work experience documentation',
          'CV in French format'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Salary Requirements',
        description: 'Minimum wage compliance',
        details: [
          'Salary above SMIC (€1,747.20/month)',
          'Employment contract details',
          'Tax obligations understanding',
          'Social security registration'
        ],
        mandatory: true
      }
    ]
  },
  'Study': {
    name: 'Student Visa (Étudiant)',
    icon: GraduationCap,
    processingTime: '30-60 days',
    stayDuration: 'Duration of studies',
    fee: '€50',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Campus France Registration',
        description: 'Educational pathway validation',
        details: [
          'Campus France procedure completion',
          'University acceptance letter',
          'Academic transcripts (translated)',
          'Motivation letter in French'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Financial Resources',
        description: 'Proof of sufficient funds',
        details: [
          '€615/month minimum (Paris area)',
          '€540/month (other areas)',
          'Bank statements or guarantees',
          'Scholarship documentation'
        ],
        mandatory: true
      },
      {
        icon: Globe,
        title: 'French Language',
        description: 'Language proficiency proof',
        details: [
          'French B2 level for most programs',
          'TCF/TEF/DELF/DALF certificate',
          'University language requirements',
          'English programs may have exceptions'
        ],
        mandatory: true
      }
    ]
  },
  'Family': {
    name: 'Family Reunion (Regroupement)',
    icon: Heart,
    processingTime: '90-180 days',
    stayDuration: '1 year (renewable)',
    fee: '€99',
    commonRequirements,
    specificRequirements: [
      {
        icon: Heart,
        title: 'Family Relationship',
        description: 'Proven family ties',
        details: [
          'Marriage certificate (apostilled)',
          'Birth certificates for children',
          'OFII family reunion authorization',
          'Relationship duration proof'
        ],
        mandatory: true
      },
      {
        icon: Building,
        title: 'Sponsor Requirements',
        description: 'French resident conditions',
        details: [
          'French residence card/citizenship',
          '18 months residence minimum',
          'Stable employment proof',
          'No criminal record'
        ],
        mandatory: true
      },
      {
        icon: Euro,
        title: 'Financial Stability',
        description: 'Income requirements',
        details: [
          'Monthly income ≥ SMIC',
          'Tax declarations (last 3 years)',
          'Employment contracts',
          'Housing adequacy proof'
        ],
        mandatory: true
      }
    ]
  },
  'Investment': {
    name: 'Investor Visa (Investisseur)',
    icon: Building,
    processingTime: '90-120 days',
    stayDuration: '4 years (renewable)',
    fee: '€99',
    commonRequirements,
    specificRequirements: [
      {
        icon: Euro,
        title: 'Investment Capital',
        description: 'Minimum investment required',
        details: [
          '€30,000 minimum investment',
          'Job creation potential',
          'Economic benefit to France',
          'Business plan validation'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Business Documentation',
        description: 'Company formation proof',
        details: [
          'French company registration',
          'Business plan (in French)',
          'Financial projections',
          'Market analysis report'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Professional Background',
        description: 'Relevant experience',
        details: [
          'Management experience proof',
          'Business qualifications',
          'Previous investment success',
          'Industry expertise documentation'
        ],
        mandatory: true
      }
    ]
  }
};

export const getFranceLongStayRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return franceLongStayRequirements[category] || franceLongStayRequirements['Work'];
};

export const getAllFranceLongStayCategories = (): string[] => {
  return Object.keys(franceLongStayRequirements);
};
