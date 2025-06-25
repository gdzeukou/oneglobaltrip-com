
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
      'At least 2 blank pages for stamping',
      'Issued within the last 10 years',
      'Color scan of biographical page',
      'Must not be diplomatic/official passport'
    ],
    mandatory: true
  },
  {
    icon: Camera,
    title: 'Digital Photograph',
    description: 'Recent colored photograph',
    details: [
      'JPEG format, minimum 10KB, maximum 1MB',
      '2 inches x 2 inches square size',
      'White background, no glasses',
      'Taken within last 3 months'
    ],
    mandatory: true
  },
  {
    icon: CreditCard,
    title: 'Payment Method',
    description: 'Online payment for visa fee',
    details: [
      'Credit/Debit card (Visa, Mastercard, American Express)',
      'Net banking for Indian banks',
      'UPI payment accepted',
      'No cash payments accepted'
    ],
    mandatory: true
  },
  {
    icon: Plane,
    title: 'Travel Details',
    description: 'Flight and accommodation information',
    details: [
      'Return flight booking confirmation',
      'Hotel reservation or accommodation proof',
      'Detailed travel itinerary',
      'Port of arrival in India'
    ],
    mandatory: true
  }
];

export const indiaVisaRequirements: Record<string, VisaCategoryRequirements> = {
  'e-Tourist': {
    name: 'e-Tourist Visa',
    icon: MapPin,
    processingTime: '3-5 business days',
    stayDuration: '90 days (double entry)',
    fee: '$25-$100 (varies by nationality)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Calendar,
        title: 'Tourism Purpose Only',
        description: 'Strictly for leisure and sightseeing',
        details: [
          'Tourism and recreation activities',
          'Visiting friends and relatives',
          'Short duration yoga programs',
          'No business activities allowed'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Supporting Documents',
        description: 'Additional tourism-related documents',
        details: [
          'Hotel bookings or accommodation proof',
          'Travel itinerary with tourist attractions',
          'Return flight tickets',
          'Travel insurance (recommended)'
        ],
        mandatory: true
      }
    ]
  },
  'e-Business': {
    name: 'e-Business Visa',
    icon: Briefcase,
    processingTime: '3-5 business days',
    stayDuration: '180 days (multiple entry)',
    fee: '$25-$100 (varies by nationality)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Briefcase,
        title: 'Business Purpose',
        description: 'Commercial and business activities',
        details: [
          'Business meetings and conferences',
          'Trade and commercial activities',
          'Industry exhibitions participation',
          'No employment activities allowed'
        ],
        mandatory: true
      },
      {
        icon: FileText,
        title: 'Business Documentation',
        description: 'Company and invitation letters',
        details: [
          'Invitation letter from Indian company',
          'Business card and company profile',
          'Indian company registration details',
          'Previous business relationship proof'
        ],
        mandatory: true
      }
    ]
  },
  'e-Medical': {
    name: 'e-Medical Visa',
    icon: Heart,
    processingTime: '3-5 business days',
    stayDuration: '60 days (triple entry)',
    fee: '$25-$100 (varies by nationality)',
    commonRequirements,
    specificRequirements: [
      {
        icon: FileText,
        title: 'Medical Documentation',
        description: 'Hospital and treatment letters',
        details: [
          'Letter from recognized Indian hospital',
          'Medical diagnosis and treatment plan',
          'Doctor\'s recommendation for treatment',
          'Hospital registration and accreditation'
        ],
        mandatory: true
      },
      {
        icon: CreditCard,
        title: 'Financial Capability',
        description: 'Proof of funds for medical treatment',
        details: [
          'Bank statements showing sufficient funds',
          'Medical insurance coverage',
          'Treatment cost estimates',
          'Financial guarantee from sponsor'
        ],
        mandatory: true
      }
    ]
  },
  'e-Conference': {
    name: 'e-Conference Visa',
    icon: Users,
    processingTime: '3-5 business days',
    stayDuration: '120 days (single entry)',
    fee: '$25-$100 (varies by nationality)',
    commonRequirements,
    specificRequirements: [
      {
        icon: Calendar,
        title: 'Conference Registration',
        description: 'Official conference participation proof',
        details: [
          'Conference registration confirmation',
          'Invitation from conference organizers',
          'Conference agenda and schedule',
          'Ministry of External Affairs approval'
        ],
        mandatory: true
      },
      {
        icon: GraduationCap,
        title: 'Professional Credentials',
        description: 'Relevant professional background',
        details: [
          'Professional qualification certificates',
          'Employment letter with designation',
          'CV highlighting relevant experience',
          'Previous conference participation records'
        ],
        mandatory: true
      }
    ]
  }
};

export const getIndiaRequirementsByCategory = (category: string): VisaCategoryRequirements => {
  return indiaVisaRequirements[category] || indiaVisaRequirements['e-Tourist'];
};

export const getAllIndiaCategories = (): string[] => {
  return Object.keys(indiaVisaRequirements);
};
