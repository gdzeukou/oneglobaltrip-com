
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { 
  checkMultiDestinationVisaRequirement, 
  getSchengenConsulateRecommendation,
  schengenCountries,
  SchengenTripData
} from '@/data/visaRequirementsDatabase';
import ConsulateRecommendation from './ConsulateRecommendation';
import MultiDestinationHeader from './components/MultiDestinationHeader';
import SchengenTripPlanningCard from './components/SchengenTripPlanningCard';
import OverallStatusCards from './components/OverallStatusCards';
import SchengenCountriesCard from './components/SchengenCountriesCard';
import NonSchengenCountriesCards from './components/NonSchengenCountriesCards';
import TransitWarningsCard from './components/TransitWarningsCard';
import CallToActionCard from './components/CallToActionCard';

interface Destination {
  country: string;
  purpose: string;
}

interface MultiDestinationResultsProps {
  nationality: string;
  destinations: Destination[];
  onReset: () => void;
}

const MultiDestinationResults = ({ nationality, destinations, onReset }: MultiDestinationResultsProps) => {
  const [schengenTripData, setSchengenTripData] = useState<Partial<SchengenTripData>>({});
  const [showSchengenPlanner, setShowSchengenPlanner] = useState(false);

  const countries = destinations.map(d => d.country);
  const purposes = destinations.map(d => d.purpose);
  const visaCheck = checkMultiDestinationVisaRequirement(nationality, countries, purposes);

  // Separate Schengen and non-Schengen destinations
  const schengenDestinations = destinations.filter(d => 
    schengenCountries.includes(d.country)
  );
  const nonSchengenDestinations = destinations.filter(d => 
    !schengenCountries.includes(d.country)
  );

  const hasMultipleSchengenCountries = schengenDestinations.length > 1;
  const schengenPurpose = schengenDestinations[0]?.purpose || 'tourism';

  // Generate consulate recommendation if we have complete Schengen trip data
  const consulateRecommendation = hasMultipleSchengenCountries && 
    schengenTripData.selectedCountries && 
    schengenTripData.entryPoint
    ? getSchengenConsulateRecommendation({
        selectedCountries: schengenTripData.selectedCountries,
        nightsDistribution: schengenTripData.nightsDistribution || {},
        businessLocation: schengenTripData.businessLocation,
        entryPoint: schengenTripData.entryPoint,
        purpose: schengenPurpose
      })
    : null;

  const handleBookConsultation = () => {
    window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank');
  };

  return (
    <div className="space-y-8">
      <MultiDestinationHeader 
        nationality={nationality} 
        destinations={destinations} 
      />

      <SchengenTripPlanningCard
        schengenDestinations={schengenDestinations}
        showSchengenPlanner={showSchengenPlanner}
        schengenTripData={schengenTripData}
        schengenPurpose={schengenPurpose}
        onShowPlanner={setShowSchengenPlanner}
        onTripDataChange={setSchengenTripData}
      />

      {consulateRecommendation && (
        <ConsulateRecommendation 
          recommendation={consulateRecommendation}
          onBookConsultation={handleBookConsultation}
        />
      )}

      <OverallStatusCards 
        visaCheck={visaCheck} 
        schengenDestinations={schengenDestinations} 
      />

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-gray-900">Visa Requirements by Destination</h4>
        
        <SchengenCountriesCard
          schengenDestinations={schengenDestinations}
          visaCheck={visaCheck}
          consulateRecommendation={consulateRecommendation}
        />

        <NonSchengenCountriesCards
          nonSchengenDestinations={nonSchengenDestinations}
          visaCheck={visaCheck}
        />
      </div>

      <TransitWarningsCard transitWarnings={visaCheck.transitWarnings} />

      <CallToActionCard 
        hasVisaRequired={visaCheck.hasVisaRequired}
        onBookConsultation={handleBookConsultation}
      />

      <div className="text-center pt-6 border-t">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Plan Another Trip</span>
        </Button>
      </div>
    </div>
  );
};

export default MultiDestinationResults;
