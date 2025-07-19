
import React from 'react';

interface StartTripProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StartTripProgress = ({ currentStep, totalSteps }: StartTripProgressProps) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Welcome',
    'Trip Vision',
    'Destinations & Budget',
    'Interests',
    'Final Touches'
  ];

  return (
    <div className="space-y-3">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {stepTitles.map((title, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center space-y-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StartTripProgress;
