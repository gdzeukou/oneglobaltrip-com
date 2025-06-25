
import React from 'react';
import { Card } from '@/components/ui/card';
import { Globe, Users, Calendar, MapPin, Route } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<any>;
  completed: boolean;
}

interface WizardProgressStepsProps {
  currentStep: number;
  tripType: string;
  destination: string;
  destinations: Array<{ country: string; purpose: string }>;
  nationality: string;
  purpose: string;
  duration: string;
}

const WizardProgressSteps = ({ 
  currentStep, 
  tripType, 
  destination, 
  destinations, 
  nationality, 
  purpose, 
  duration 
}: WizardProgressStepsProps) => {
  const getSteps = (): Step[] => {
    const baseSteps = [
      { number: 1, title: 'Trip Type', icon: Route, completed: tripType !== '' },
    ];

    if (tripType === 'multiple') {
      return [
        ...baseSteps,
        { number: 2, title: 'Destinations', icon: MapPin, completed: destinations.length > 0 && destinations.every(d => d.country && d.purpose) },
        { number: 3, title: 'Nationality', icon: Globe, completed: nationality !== '' },
      ];
    }

    return [
      ...baseSteps,
      { number: 2, title: 'Destination', icon: MapPin, completed: destination !== '' },
      { number: 3, title: 'Nationality', icon: Globe, completed: nationality !== '' },
      { number: 4, title: 'Purpose', icon: Users, completed: purpose !== '' },
      { number: 5, title: 'Duration', icon: Calendar, completed: duration !== '' },
    ];
  };

  const steps = getSteps();

  return (
    <Card className="p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-6">Your Progress</h3>
      <div className="space-y-4">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = step.number === currentStep;
          const isCompleted = step.completed;
          
          return (
            <div
              key={step.number}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-100 border-2 border-blue-500' 
                  : isCompleted 
                    ? 'bg-green-50 border border-green-200'
                    : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold
                ${isActive 
                  ? 'bg-blue-500 text-white' 
                  : isCompleted 
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }
              `}>
                {isCompleted && !isActive ? '✓' : step.number}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${
                  isActive ? 'text-blue-900' : isCompleted ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {step.title}
                </div>
              </div>
              <StepIcon className={`w-4 h-4 ${
                isActive ? 'text-blue-500' : isCompleted ? 'text-green-500' : 'text-gray-400'
              }`} />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default WizardProgressSteps;
