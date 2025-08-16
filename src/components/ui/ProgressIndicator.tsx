import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressIndicator = ({ currentStep, totalSteps, className }: ProgressIndicatorProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Progress Bar */}
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between items-center">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300",
                  isCompleted && "bg-primary text-white scale-110",
                  isCurrent && "bg-accent text-white scale-110 animate-glow",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span 
                className={cn(
                  "text-xs font-medium transition-colors duration-300",
                  (isCompleted || isCurrent) ? "text-primary" : "text-muted-foreground"
                )}
              >
                Step {stepNumber}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Step <span className="font-semibold text-primary">{currentStep}</span> of{' '}
          <span className="font-semibold">{totalSteps}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {Math.round(progress)}% Complete
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;