
import React from 'react';
import CountrySelector from './CountrySelector';
import MultiDestinationCountrySelector from './MultiDestinationCountrySelector';

interface Destination {
  country: string;
  purpose: string;
}

interface StepDestinationProps {
  tripType: string;
  destination: string;
  destinations: Destination[];
  onDestinationChange: (value: string) => void;
  onDestinationsChange: (value: Destination[]) => void;
}

const StepDestination = ({ 
  tripType, 
  destination, 
  destinations, 
  onDestinationChange, 
  onDestinationsChange 
}: StepDestinationProps) => {
  if (tripType === 'single') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Destination</h3>
          <p className="text-gray-600">Where would you like to travel?</p>
        </div>
        
        <CountrySelector
          value={destination}
          onChange={onDestinationChange}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Your Multi-Destination Trip</h3>
        <p className="text-gray-600">Add all the countries you plan to visit</p>
      </div>
      
      <MultiDestinationCountrySelector
        destinations={destinations}
        onChange={onDestinationsChange}
      />
    </div>
  );
};

export default StepDestination;
