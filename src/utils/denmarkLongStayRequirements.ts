
import { LucideIcon, FileText, Clock, Users, MapPin, CreditCard, Shield, Calendar, Briefcase, GraduationCap, Heart, Camera, Plane, Building, Crown, Globe, Home } from 'lucide-react';

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
      'Valid for entire intended stay period',
      'At least 2 blank pages available',
      'Issued within last 10 years',
      'Clear scan of biographical page'
    ],
    mandatory: true
  },
  {
    icon: Shield,
    title: 'Health Insurance',
    description: 'Comprehensive medical coverage',
    details: [
      'Minimum DKK 300,000 coverage',
      'Mental health coverage included',
      'EU/EEA compliant insurance',
      'Valid throughout Schengen'
    ],
    mandatory: true
  },
  {
    icon: Home,
    title: 'Accommodation',
    description: 'Housing arrangement proof',
    details: [
      'Rental agreement or property deed',
      'Hotel booking confirmation',
      'Host family attestation',
      'University housing guarantee'
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
      'Taken within last 6 months',
      'Biometric quality standards'
    ],
    mandatory: true
  }
];

export const denmarkLongStayRequirements: Record<string, VisaCategoryRequirements> = {
  'Work': {
    name: 'Work and Residence Permit',
    icon: Briefcase,
    processingTime: '60-90 days',
    stayDuration: 'Up to 4 years',
    fee: 'DKK 3,140',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Employment Contract',
        description: 'Signed job agreement',
        details: [
          'Contract from Danish employer',
          'Job description and responsibilities',
          'Salary and working conditions',
          'Employment duration specified'
        ],
        mandatory: true
      },
      {
        icon: Crown,
        title: 'Salary Requirements',
        description: 'Minimum wage thresholds',
        details: [
          'DKK 448,000 annually (regular)',
          'DKK 375,000 (recent graduates)',
          'Collective agreement compliance',
          'Danish working conditions'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Educational Qualifications',
        description: 'Relevant education proof',
        details: [
          'University degree or equivalent',
          'Professional qualifications',
          'Danish recognition if required',
          'Work experience documentation'
        ],
        mandatory: true
      }
    ]
  },
  'Study': {
    name: 'Study Residence Permit',
    icon: GraduationCap,
    processingTime: '30-60 days',
    stayDuration: 'Duration of studies',
    fee: 'DKK 1,570',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Educational Institution',
        description: 'Admission confirmation',
        details: [
          'Acceptance letter from Danish institution',
          'Course enrollment verification',
          'Academic transcripts',
          'Previous education certificates'
        ],
        mandatory: true
      },
      {
        icon: Crown,
        title: 'Financial Support',
        description: 'Funding documentation',
        details: [
          'DKK 100,000+ annually for living',
          'Bank statements or guarantees',
          'Scholarship documentation',
          'Parental support letters'
        ],
        mandatory: true
      },
      {
        icon: Globe,
        title: 'Language Requirements',
        description: 'Language proficiency',
        details: [
          'English B2 for English programs',
          'Danish language for Danish programs',
          'IELTS/TOEFL certificates',
          'University-specific requirements'
        ],
        mandatory: true
      }
    ]
  },
  'Family': {
    name: 'Family Reunification',
    icon: Heart,
    processingTime: '90-180 days',
    stayDuration: '1 year (renewable)',
    fee: 'DKK 6,280',
    commonRequirements,
    specificRequirements: [
      {
        icon: Heart,
        title: 'Family Relationship',
        description: 'Proven family connection',
        details: [
          'Marriage certificate (apostilled)',
          'Birth certificates for children',
          'Relationship duration proof',
          'Cohabitation evidence'
        ],
        mandatory: true
      },
      {
        icon: Building,
        title: 'Danish Reference',
        description: 'Sponsor requirements',
        details: [
          'Danish citizenship or residence',
          '3+ years in Denmark',
          'Stable employment',
          'No social benefits dependency'
        ],
        mandatory: true
      },
      {
        icon: Crown,
        title: 'Financial Requirements',
        description: 'Income and housing',
        details: [
          'DKK 291,180 annual income',
          'Adequate housing size',
          'No public debt',
          'Integration contract signing'
        ],
        mandatory: true
      }
    ]
  },
  'Research': {
    name: 'Researcher Residence Permit',
    icon: GraduationCap,
    processingTime: '60-90 days',
    stayDuration: 'Duration of research',
    fee: 'DKK 1,570',
    commonRequirements,
    specificRequirements: [
      {
        icon: Building,
        title: 'Research Agreement',
        description: 'Institution hosting agreement',
        details: [
          'Hosting agreement with Danish institution',
          'Research project description',
          'Supervision arrangements',
          'Funding confirmation'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Academic Qualifications',
        description: 'Research credentials',
        details: [
          'PhD or equivalent qualification',
          'Research experience documentation',
          'Publications and references',
          'Academic CV'
        ],
        mandatory: true
      },
      {
        icon: Crown,
        title: 'Research Funding',
        description: 'Financial support proof',
        details: [
          'Research grant documentation',
          'Institutional funding guarantee',
          'Personal financial resources',
          'Living expenses coverage'
        ],
        mandatory: true
      }
    ]
  }
};

export const getDenmarkLongStayRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return denmarkLongStayRequirements[category] || denmarkLongStayRequirements['Work'];
};

export const getAllDenmarkLongStayCategories = (): string[] => {
  return Object.keys(denmarkLongStayRequirements);
};
