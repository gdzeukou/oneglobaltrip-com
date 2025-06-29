
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usaVisaStatuses } from '@/utils/visaEligibilityLogic';
import { AlertTriangle } from 'lucide-react';

interface USAVisaStatusStepProps {
  usaVisaStatus: string;
  onSelect: (status: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const USAVisaStatusStep = ({ usaVisaStatus, onSelect, onNext, onBack }: USAVisaStatusStepProps) => {
  const isB1B2Selected = usaVisaStatus === 'b1-b2';

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">What's your USA status?</h3>
        <p className="text-gray-600">This determines your eligibility to apply from the USA</p>
      </div>

      {isB1B2Selected && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900">Important Notice</h4>
              <p className="text-red-800 text-sm mt-1">
                B1/B2 visa holders cannot apply for Schengen visas from the USA due to immigration regulations. 
                You would need to apply from your home country.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-3 max-w-2xl mx-auto">
        {usaVisaStatuses.map((status) => (
          <Card 
            key={status.value}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              usaVisaStatus === status.value ? 'ring-2 ring-blue-600 shadow-lg' : ''
            } ${status.value === 'b1-b2' ? 'border-red-200' : ''}`}
            onClick={() => onSelect(status.value)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{status.label}</span>
                <div className={`w-4 h-4 rounded-full border-2 ${
                  usaVisaStatus === status.value 
                    ? 'bg-blue-600 border-blue-600' 
                    : 'border-gray-300'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-6 py-3"
        >
          Back
        </Button>
        {usaVisaStatus && (
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default USAVisaStatusStep;
