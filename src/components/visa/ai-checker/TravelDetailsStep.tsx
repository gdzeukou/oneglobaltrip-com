
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { travelPurposes, travelDurations } from '@/utils/visaEligibilityLogic';

interface TravelDetailsStepProps {
  travelPurpose: string;
  duration: string;
  onSelectPurpose: (purpose: string) => void;
  onSelectDuration: (duration: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const TravelDetailsStep = ({ 
  travelPurpose, 
  duration, 
  onSelectPurpose, 
  onSelectDuration, 
  onNext, 
  onBack 
}: TravelDetailsStepProps) => {
  const canContinue = travelPurpose && duration;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Travel Details</h3>
        <p className="text-gray-600">Help us provide accurate visa requirements</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Purpose of Travel */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Purpose of Travel</h4>
          <div className="grid gap-2">
            {travelPurposes.map((purpose) => (
              <Card 
                key={purpose.value}
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                  travelPurpose === purpose.value ? 'ring-2 ring-blue-600 shadow-md' : ''
                }`}
                onClick={() => onSelectPurpose(purpose.value)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{purpose.label}</span>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      travelPurpose === purpose.value 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Planned Duration</h4>
          <div className="grid gap-2">
            {travelDurations.map((dur) => (
              <Card 
                key={dur.value}
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                  duration === dur.value ? 'ring-2 ring-blue-600 shadow-md' : ''
                }`}
                onClick={() => onSelectDuration(dur.value)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900">{dur.label}</span>
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      duration === dur.value 
                        ? 'bg-blue-600 border-blue-600' 
                        : 'border-gray-300'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-6 py-3"
        >
          Back
        </Button>
        {canContinue && (
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Get AI Analysis
          </Button>
        )}
      </div>
    </div>
  );
};

export default TravelDetailsStep;
