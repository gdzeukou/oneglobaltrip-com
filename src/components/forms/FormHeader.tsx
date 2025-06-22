
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface FormHeaderProps {
  type: 'consultation' | 'visa-application' | 'package-booking';
  title?: string;
  currentStep: number;
  totalSteps: number;
}

const FormHeader = ({ type, title, currentStep, totalSteps }: FormHeaderProps) => {
  const getFormTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'consultation':
        return 'Get Your Free Travel Consultation';
      case 'visa-application':
        return 'Start My Visa Application';
      case 'package-booking':
        return 'Start My Personalized Package Right Now';
      default:
        return 'Travel Request Form';
    }
  };

  const getStepTitle = () => {
    if (type === 'package-booking') {
      switch (currentStep) {
        case 1: return 'Personal Information';
        case 2: return 'Package Selection & Travel Needs';
        case 3: return 'Additional Preferences';
        case 4: return 'Payment & Confirmation';
        default: return '';
      }
    } else {
      switch (currentStep) {
        case 1: return 'Personal Information';
        case 2: return 'Travel Information';
        case 3: return 'Travel Preferences';
        default: return '';
      }
    }
  };

  return (
    <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
      <div className="text-center">
        <CardTitle className="text-2xl mb-2">{getFormTitle()}</CardTitle>
        {type === 'consultation' && (
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-blue-100">Trusted by 10,000+ travelers</span>
          </div>
        )}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full ${
                i + 1 <= currentStep ? 'bg-yellow-400' : 'bg-blue-400'
              }`}
            />
          ))}
        </div>
        <p className="text-blue-100 mt-2">{getStepTitle()}</p>
      </div>
    </CardHeader>
  );
};

export default FormHeader;
