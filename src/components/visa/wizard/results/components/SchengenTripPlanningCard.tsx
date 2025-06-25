
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SchengenTripData } from '@/data/visaRequirementsDatabase';
import SchengenTripPlanner from '../../steps/SchengenTripPlanner';

interface Destination {
  country: string;
  purpose: string;
}

interface SchengenTripPlanningCardProps {
  schengenDestinations: Destination[];
  showSchengenPlanner: boolean;
  schengenTripData: Partial<SchengenTripData>;
  schengenPurpose: string;
  onShowPlanner: (show: boolean) => void;
  onTripDataChange: (data: Partial<SchengenTripData>) => void;
}

const SchengenTripPlanningCard = ({
  schengenDestinations,
  showSchengenPlanner,
  schengenTripData,
  schengenPurpose,
  onShowPlanner,
  onTripDataChange
}: SchengenTripPlanningCardProps) => {
  const hasMultipleSchengenCountries = schengenDestinations.length > 1;

  if (!hasMultipleSchengenCountries) {
    return null;
  }

  return (
    <Card className="border-2 border-blue-200 bg-blue-50">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-blue-900 mb-2">
            🇪🇺 Multiple Schengen Countries Detected
          </h4>
          <p className="text-blue-700">
            You need only one Schengen visa, but we need to determine the correct consulate for your application.
          </p>
        </div>

        {!showSchengenPlanner ? (
          <div className="text-center">
            <Button 
              onClick={() => onShowPlanner(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Plan Your Schengen Trip
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <SchengenTripPlanner
            selectedCountries={schengenDestinations.map(d => d.country)}
            tripData={schengenTripData}
            purpose={schengenPurpose}
            onChange={onTripDataChange}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default SchengenTripPlanningCard;
