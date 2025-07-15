
import { useState } from 'react';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate: string;
  duration: string;
  travelers: string;
  budget: string;
  selectedPackages: string[];
  travelNeeds: string[];
  otherNeeds: string;
  specialRequests: string;
  nationality: string;
  visaType: string;
  travelPurpose: string;
  departureDate: string;
  returnDate: string;
}

export const useFormState = (
  type: 'consultation' | 'visa-application' | 'package-booking',
  preSelectedPackage?: string
) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    destination: '',
    travelDate: '',
    duration: '',
    travelers: '',
    budget: '',
    selectedPackages: preSelectedPackage ? [preSelectedPackage] : [],
    travelNeeds: [],
    otherNeeds: '',
    specialRequests: '',
    nationality: '',
    visaType: '',
    travelPurpose: '',
    departureDate: '',
    returnDate: ''
  });

  // Save form data to localStorage for recovery
  const saveFormData = (data: Partial<FormData>) => {
    try {
      const updatedData = { ...formData, ...data };
      setFormData(updatedData);
      localStorage.setItem(`form_data_${type}`, JSON.stringify(updatedData));
      console.log('Form data saved:', updatedData);
    } catch (error) {
      console.warn('Failed to save form data to localStorage:', error);
    }
  };

  // Load form data from localStorage on init
  const loadFormData = () => {
    try {
      const saved = localStorage.getItem(`form_data_${type}`);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
        console.log('Form data loaded from localStorage:', parsedData);
      }
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error);
    }
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    console.log('Input change:', field, value);
    saveFormData({ [field]: value });
  };

  const handleTravelNeedsChange = (need: string, checked: boolean) => {
    console.log('Travel needs change:', need, checked);
    const updatedNeeds = checked
      ? [...formData.travelNeeds, need]
      : formData.travelNeeds.filter(n => n !== need);
    saveFormData({ travelNeeds: updatedNeeds });
  };

  const handlePackageSelection = (packageId: string, checked: boolean) => {
    console.log('Package selection change:', packageId, checked);
    const updatedPackages = checked
      ? [...formData.selectedPackages, packageId]
      : formData.selectedPackages.filter(p => p !== packageId);
    saveFormData({ selectedPackages: updatedPackages });
  };

  const getTotalSteps = () => {
    switch (type) {
      case 'consultation':
        return 3;
      case 'visa-application':
        return 3;
      case 'package-booking':
        return 4;
      default:
        return 3;
    }
  };

  const handleNext = () => {
    const nextStep = Math.min(currentStep + 1, getTotalSteps());
    console.log('Moving to next step:', nextStep);
    setCurrentStep(nextStep);
  };

  const handlePrev = () => {
    const prevStep = Math.max(currentStep - 1, 1);
    console.log('Moving to previous step:', prevStep);
    setCurrentStep(prevStep);
  };

  return {
    currentStep,
    setCurrentStep,
    isSubmitting,
    setIsSubmitting,
    formData,
    totalSteps: getTotalSteps(),
    handleInputChange,
    handleTravelNeedsChange,
    handlePackageSelection,
    handleNext,
    handlePrev,
    loadFormData,
    saveFormData
  };
};
