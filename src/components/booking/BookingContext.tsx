import React, { createContext, useContext, useState, useCallback } from 'react';
import { BookingFormData, TripDetails, BookingPlan, BookingAddOn } from '@/types/booking';

interface BookingContextType {
  formData: Partial<BookingFormData>;
  updateFormData: (data: Partial<BookingFormData>) => void;
  isValid: (step: number) => boolean;
  errors: Record<string, string>;
  clearErrors: () => void;
  validateStep: (step: number) => boolean;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    selectedAddOns: [],
    totalAmount: 0,
    addonsTotal: 0
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = useCallback((data: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    // Clear relevant errors when data is updated
    if (data.contact) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.name;
        delete newErrors.email;
        delete newErrors.phone;
        return newErrors;
      });
    }
    
    if (data.trip) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.nationality;
        delete newErrors.destination;
        delete newErrors.departureDate;
        return newErrors;
      });
    }
  }, []);

  const validateStep = useCallback((step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1: // Contact
        if (!formData.contact?.name?.trim()) {
          newErrors.name = 'Name is required';
        }
        if (!formData.contact?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.contact?.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        break;
        
      case 2: // Trip
        if (!formData.trip?.nationality) {
          newErrors.nationality = 'Please select your nationality';
        }
        if (!formData.trip?.destination) {
          newErrors.destination = 'Please select your destination';
        }
        if (!formData.trip?.departureDate) {
          newErrors.departureDate = 'Please select departure date';
        } else {
          const departure = new Date(formData.trip.departureDate);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          if (departure < today) {
            newErrors.departureDate = 'Departure date cannot be in the past';
          }
        }
        if (!formData.trip?.travelers || formData.trip.travelers < 1) {
          newErrors.travelers = 'At least 1 traveler is required';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const isValid = useCallback((step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.contact?.name && formData.contact?.email && formData.contact?.phone);
      case 2:
        return !!(formData.trip?.nationality && formData.trip?.destination && formData.trip?.departureDate && formData.trip?.travelers);
      default:
        return true;
    }
  }, [formData]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return (
    <BookingContext.Provider value={{
      formData,
      updateFormData,
      isValid,
      errors,
      clearErrors,
      validateStep
    }}>
      {children}
    </BookingContext.Provider>
  );
};