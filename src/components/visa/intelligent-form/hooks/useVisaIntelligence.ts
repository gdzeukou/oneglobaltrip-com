
import { useState, useEffect } from 'react';
import { ApplicationData } from '../IntelligentVisaForm';
import { supabase } from '@/integrations/supabase/client';
import { checkVisaRequirement, destinationCountries } from '@/data/visaRequirementsDatabase';

export interface VisaType {
  id: string;
  name: string;
  category: 'tourist' | 'business' | 'student' | 'work' | 'family' | 'transit';
  duration: string;
  processingTime: string;
  price: number;
  requirements: string[];
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  required: boolean;
  countrySpecific: boolean;
  templates?: string[];
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  conditions: string[];
  validUntil?: string;
}

export interface DynamicQuestion {
  id: string;
  question: string;
  type: 'text' | 'select' | 'checkbox' | 'date' | 'number';
  options?: string[];
  required: boolean;
  condition?: (data: ApplicationData) => boolean;
}

export const useVisaIntelligence = (formData: ApplicationData) => {
  const [recommendedVisaType, setRecommendedVisaType] = useState<VisaType | null>(null);
  const [requiredDocuments, setRequiredDocuments] = useState<RequiredDocument[]>([]);
  const [biometricRequired, setBiometricRequired] = useState(false);
  const [estimatedProcessingTime, setEstimatedProcessingTime] = useState<string>('');
  const [applicableDeals, setApplicableDeals] = useState<Deal[]>([]);
  const [dynamicQuestions, setDynamicQuestions] = useState<{
    personal: DynamicQuestion[];
    travel: DynamicQuestion[];
    documents: DynamicQuestion[];
  }>({
    personal: [],
    travel: [],
    documents: []
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (formData.nationality && formData.destination) {
      analyzeVisaRequirements();
    }
  }, [formData.nationality, formData.destination, formData.travelPurpose]);

  const analyzeVisaRequirements = async () => {
    setIsLoading(true);
    
    try {
      // Get visa requirements using existing logic
      const visaRequirement = checkVisaRequirement(
        formData.nationality,
        formData.destination,
        formData.travelPurpose
      );

      // Determine recommended visa type
      const recommendedType = determineVisaType(visaRequirement, formData);
      setRecommendedVisaType(recommendedType);

      // Set required documents based on visa type and nationality
      const documents = getRequiredDocuments(formData.nationality, formData.destination, recommendedType);
      setRequiredDocuments(documents);

      // Check if biometric appointment is required
      const biometricNeeded = checkBiometricRequirement(formData.nationality, formData.destination);
      setBiometricRequired(biometricNeeded);

      // Calculate processing time
      const processingTime = calculateProcessingTime(recommendedType, formData.nationality);
      setEstimatedProcessingTime(processingTime);

      // Find applicable deals
      const deals = findApplicableDeals(formData, recommendedType);
      setApplicableDeals(deals);

      // Generate dynamic questions
      const questions = generateDynamicQuestions(formData, recommendedType);
      setDynamicQuestions(questions);

    } catch (error) {
      console.error('Error analyzing visa requirements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const determineVisaType = (visaRequirement: any, data: ApplicationData): VisaType => {
    const destinationInfo = destinationCountries.find(c => c.name === data.destination);
    const isSchengen = destinationInfo?.isSchengen;

    if (visaRequirement.type === 'visa-free') {
      return {
        id: 'visa-free',
        name: 'No Visa Required',
        category: 'tourist',
        duration: 'Up to 90 days',
        processingTime: 'No processing required',
        price: 0,
        requirements: ['Valid passport']
      };
    }

    if (isSchengen || visaRequirement.type === 'schengen-visa') {
      return {
        id: 'schengen',
        name: 'Schengen Short-Stay Visa',
        category: data.travelPurpose as any || 'tourist',
        duration: 'Up to 90 days',
        processingTime: '15-20 business days',
        price: 80,
        requirements: [
          'Valid passport',
          'Completed application form',
          'Passport photos',
          'Travel insurance',
          'Proof of accommodation',
          'Flight reservations'
        ]
      };
    }

    // Default tourist visa
    return {
      id: 'tourist',
      name: `${data.destination} Tourist Visa`,
      category: 'tourist',
      duration: '30-90 days',
      processingTime: '10-15 business days',
      price: 100,
      requirements: [
        'Valid passport',
        'Completed application form',
        'Passport photos',
        'Bank statements',
        'Hotel reservations'
      ]
    };
  };

  const getRequiredDocuments = (nationality: string, destination: string, visaType: VisaType | null): RequiredDocument[] => {
    const baseDocuments: RequiredDocument[] = [
      {
        id: 'passport',
        name: 'Valid Passport',
        description: 'Passport valid for at least 6 months from travel date',
        required: true,
        countrySpecific: false
      },
      {
        id: 'photo',
        name: 'Passport Photos',
        description: 'Recent passport-size photographs (35mm x 45mm)',
        required: true,
        countrySpecific: false
      },
      {
        id: 'application-form',
        name: 'Completed Application Form',
        description: 'Fully completed and signed visa application form',
        required: true,
        countrySpecific: true
      }
    ];

    if (visaType?.category === 'tourist') {
      baseDocuments.push(
        {
          id: 'bank-statement',
          name: 'Bank Statements',
          description: 'Bank statements for the last 3 months',
          required: true,
          countrySpecific: false
        },
        {
          id: 'accommodation',
          name: 'Accommodation Proof',
          description: 'Hotel reservations or invitation letter',
          required: true,
          countrySpecific: false
        },
        {
          id: 'flight-reservation',
          name: 'Flight Reservations',
          description: 'Round-trip flight reservations',
          required: true,
          countrySpecific: false
        }
      );
    }

    if (visaType?.id === 'schengen') {
      baseDocuments.push({
        id: 'travel-insurance',
        name: 'Travel Insurance',
        description: 'Travel insurance covering €30,000 minimum',
        required: true,
        countrySpecific: false
      });
    }

    return baseDocuments;
  };

  const checkBiometricRequirement = (nationality: string, destination: string): boolean => {
    // Countries that typically require biometrics
    const biometricCountries = ['USA', 'United Kingdom', 'Canada', 'Australia'];
    const schengenCountries = destinationCountries.filter(c => c.isSchengen).map(c => c.name);
    
    return biometricCountries.includes(destination) || schengenCountries.includes(destination);
  };

  const calculateProcessingTime = (visaType: VisaType | null, nationality: string): string => {
    if (!visaType) return '10-15 business days';
    
    // Premium processing for certain nationalities
    const premiumNationalities = ['United States', 'Canada', 'Australia', 'United Kingdom'];
    const isPremium = premiumNationalities.includes(nationality);
    
    if (isPremium) {
      return '5-10 business days';
    }
    
    return visaType.processingTime;
  };

  const findApplicableDeals = (data: ApplicationData, visaType: VisaType | null): Deal[] => {
    const deals: Deal[] = [];
    
    // Early bird discount
    if (data.departureDate) {
      const daysUntilTravel = Math.ceil((new Date(data.departureDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntilTravel > 30) {
        deals.push({
          id: 'early-bird',
          title: 'Early Bird Discount',
          description: 'Apply 30+ days in advance and save 15%',
          discount: 15,
          type: 'percentage',
          conditions: ['Application submitted 30+ days before travel']
        });
      }
    }
    
    // Family discount
    if (data.travelPurpose === 'family') {
      deals.push({
        id: 'family-discount',
        title: 'Family Visa Package',
        description: 'Special pricing for family applications',
        discount: 20,
        type: 'percentage',
        conditions: ['Applies to family/spouse visa applications']
      });
    }
    
    return deals;
  };

  const generateDynamicQuestions = (data: ApplicationData, visaType: VisaType | null) => {
    const questions = {
      personal: [] as DynamicQuestion[],
      travel: [] as DynamicQuestion[],
      documents: [] as DynamicQuestion[]
    };

    // Add nationality-specific questions
    if (data.nationality === 'Nigeria') {
      questions.personal.push({
        id: 'bvn',
        question: 'Bank Verification Number (BVN)',
        type: 'text',
        required: true,
        condition: (data) => data.nationality === 'Nigeria'
      });
    }

    // Add destination-specific questions
    if (visaType?.id === 'schengen') {
      questions.travel.push({
        id: 'main-destination',
        question: 'Which Schengen country will you spend the most time in?',
        type: 'select',
        options: destinationCountries.filter(c => c.isSchengen).map(c => c.name),
        required: true,
        condition: (data) => destinationCountries.find(c => c.name === data.destination)?.isSchengen
      });
    }

    // Add business-specific questions
    if (data.travelPurpose === 'business') {
      questions.travel.push({
        id: 'business-invitation',
        question: 'Do you have a business invitation letter?',
        type: 'checkbox',
        required: false,
        condition: (data) => data.travelPurpose === 'business'
      });
    }

    return questions;
  };

  return {
    recommendedVisaType,
    requiredDocuments,
    biometricRequired,
    estimatedProcessingTime,
    applicableDeals,
    dynamicQuestions,
    isLoading
  };
};
