
import React from 'react';
import PackageSelector from './PackageSelector';
import TravelNeedsSelector from './TravelNeedsSelector';
import PersonalInfoStep from './PersonalInfoStep';
import TravelInfoStep from './TravelInfoStep';
import PreferencesStep from './PreferencesStep';
import ReviewStep from './ReviewStep';

interface StepRendererProps {
  currentStep: number;
  type: 'consultation' | 'visa-application' | 'package-booking';
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onTravelNeedsChange: (need: string, checked: boolean) => void;
  onPackageSelection: (packageId: string, checked: boolean) => void;
}

const StepRenderer = ({
  currentStep,
  type,
  formData,
  onInputChange,
  onTravelNeedsChange,
  onPackageSelection
}: StepRendererProps) => {
  switch (currentStep) {
    case 1:
      return (
        <PersonalInfoStep
          formData={formData}
          onInputChange={onInputChange}
          type={type}
        />
      );

    case 2:
      if (type === 'package-booking') {
        return (
          <div className="space-y-6">
            <PackageSelector
              selectedPackages={formData.selectedPackages}
              onPackageSelection={onPackageSelection}
            />
            
            <TravelNeedsSelector
              selectedNeeds={formData.travelNeeds}
              otherNeeds={formData.otherNeeds}
              onNeedChange={onTravelNeedsChange}
              onOtherNeedsChange={(value) => onInputChange('otherNeeds', value)}
            />
          </div>
        );
      } else {
        return (
          <TravelInfoStep
            formData={formData}
            onInputChange={onInputChange}
          />
        );
      }

    case 3:
      if (type === 'package-booking') {
        return (
          <PreferencesStep
            formData={formData}
            onInputChange={onInputChange}
          />
        );
      } else {
        return (
          <div className="space-y-4">
            <TravelNeedsSelector
              selectedNeeds={formData.travelNeeds}
              otherNeeds={formData.otherNeeds}
              onNeedChange={onTravelNeedsChange}
              onOtherNeedsChange={(value) => onInputChange('otherNeeds', value)}
            />
            <PreferencesStep
              formData={formData}
              onInputChange={onInputChange}
            />
          </div>
        );
      }

    case 4:
      return (
        <ReviewStep
          formData={formData}
          type={type}
        />
      );

    default:
      return null;
  }
};

export default StepRenderer;
