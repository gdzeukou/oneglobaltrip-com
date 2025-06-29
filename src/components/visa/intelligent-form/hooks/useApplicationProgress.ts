
import { useState, useCallback } from 'react';
import { ApplicationData } from '../IntelligentVisaForm';

interface ProgressData {
  formData: ApplicationData;
  currentStep: number;
  lastSaved: string;
  completionPercentage: number;
}

export const useApplicationProgress = (userId?: string) => {
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const saveProgress = useCallback(async (formData: ApplicationData, currentStep: number) => {
    if (!userId) return;

    setIsAutoSaving(true);
    
    try {
      const progressData: ProgressData = {
        formData,
        currentStep,
        lastSaved: new Date().toISOString(),
        completionPercentage: calculateCompletionPercentage(formData, currentStep, 5)
      };

      localStorage.setItem(`visa_application_progress_${userId}`, JSON.stringify(progressData));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error saving progress:', error);
    } finally {
      setIsAutoSaving(false);
    }
  }, [userId]);

  const loadProgress = useCallback((): ProgressData | null => {
    if (!userId) return null;

    try {
      const saved = localStorage.getItem(`visa_application_progress_${userId}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    
    return null;
  }, [userId]);

  const clearProgress = useCallback(() => {
    if (!userId) return;
    localStorage.removeItem(`visa_application_progress_${userId}`);
  }, [userId]);

  const getCompletionPercentage = useCallback((formData: ApplicationData, currentStep: number, totalSteps: number): number => {
    return calculateCompletionPercentage(formData, currentStep, totalSteps);
  }, []);

  return {
    saveProgress,
    loadProgress,
    clearProgress,
    getCompletionPercentage,
    isAutoSaving
  };
};

const calculateCompletionPercentage = (formData: ApplicationData, currentStep: number, totalSteps: number): number => {
  // Base percentage from current step
  const stepPercentage = (currentStep / totalSteps) * 60;
  
  // Additional percentage from filled fields
  const requiredFields = [
    'firstName', 'lastName', 'email', 'phone', 'nationality', 
    'destination', 'travelPurpose', 'departureDate'
  ];
  
  const filledFields = requiredFields.filter(field => {
    const value = formData[field as keyof ApplicationData];
    return value && value.toString().trim() !== '';
  });
  
  const fieldPercentage = (filledFields.length / requiredFields.length) * 40;
  
  return Math.min(Math.round(stepPercentage + fieldPercentage), 100);
};
