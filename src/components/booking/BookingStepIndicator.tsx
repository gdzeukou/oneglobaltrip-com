
import { CheckCircle, Users, Calendar, CreditCard } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface BookingStepIndicatorProps {
  currentStep: number;
}

const BookingStepIndicator = ({ currentStep }: BookingStepIndicatorProps) => {
  const steps: Step[] = [
    { number: 1, title: 'Package Selection', icon: Calendar },
    { number: 2, title: 'Traveler Information', icon: Users },
    { number: 3, title: 'Travel Preferences', icon: CheckCircle },
    { number: 4, title: 'Payment & Confirmation', icon: CreditCard }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= step.number 
                  ? 'bg-blue-900 border-blue-900 text-white' 
                  : 'border-gray-300 text-gray-300'
              }`}>
                {currentStep > step.number ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span className={`ml-2 text-sm font-medium ${
                currentStep >= step.number ? 'text-blue-900' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-12 h-px mx-4 ${
                  currentStep > step.number ? 'bg-blue-900' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepIndicator;
