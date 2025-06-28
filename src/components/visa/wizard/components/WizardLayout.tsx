
import React from 'react';
import { Card } from '@/components/ui/card';
import WizardProgressSteps from './WizardProgressSteps';

interface WizardLayoutProps {
  currentStep: number;
  tripType: string;
  destination: string;
  destinations: string[];
  nationality: string;
  purpose: string;
  duration: string;
  children: React.ReactNode;
}

const WizardLayout = ({
  currentStep,
  tripType,
  destination,
  destinations,
  nationality,
  purpose,
  duration,
  children
}: WizardLayoutProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Progress Steps */}
      <div className="lg:col-span-1">
        <WizardProgressSteps
          currentStep={currentStep}
          tripType={tripType}
          destination={destination}
          destinations={destinations}
          nationality={nationality}
          purpose={purpose}
          duration={duration}
        />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2">
        <Card className="p-8 min-h-[500px]">
          {children}
        </Card>
      </div>
    </div>
  );
};

export default WizardLayout;
