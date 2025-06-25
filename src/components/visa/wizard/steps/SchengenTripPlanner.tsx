
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { destinationCountries, schengenCountries, SchengenTripData } from '@/data/visaRequirementsDatabase';
import { MapPin, Calendar, Briefcase, Plane } from 'lucide-react';

interface SchengenTripPlannerProps {
  selectedCountries: string[];
  tripData: Partial<SchengenTripData>;
  purpose: string;
  onChange: (tripData: SchengenTripData) => void;
}

const SchengenTripPlanner = ({ selectedCountries, tripData, purpose, onChange }: SchengenTripPlannerProps) => {
  const [nightsDistribution, setNightsDistribution] = useState<{ [key: string]: number }>(
    tripData.nightsDistribution || {}
  );
  const [businessLocation, setBusinessLocation] = useState(tripData.businessLocation || '');
  const [entryPoint, setEntryPoint] = useState(tripData.entryPoint || '');

  // Filter only Schengen countries from selected
  const schengenDestinations = selectedCountries.filter(country => 
    schengenCountries.includes(country)
  );

  const isBusiness = purpose === 'business' || purpose === 'conference';

  useEffect(() => {
    // Update parent when data changes
    const updatedTripData: SchengenTripData = {
      selectedCountries: schengenDestinations,
      nightsDistribution,
      businessLocation: isBusiness ? businessLocation : undefined,
      entryPoint: entryPoint || schengenDestinations[0] || '',
      purpose
    };
    onChange(updatedTripData);
  }, [nightsDistribution, businessLocation, entryPoint, schengenDestinations, purpose, isBusiness, onChange]);

  const updateNights = (country: string, nights: number) => {
    setNightsDistribution(prev => ({
      ...prev,
      [country]: nights
    }));
  };

  const getTotalNights = () => {
    return Object.values(nightsDistribution).reduce((sum, nights) => sum + nights, 0);
  };

  const getCountryInfo = (countryCode: string) => {
    return destinationCountries.find(c => c.code === countryCode);
  };

  if (schengenDestinations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h4 className="text-xl font-bold text-gray-900 mb-2">
          Plan Your Schengen Trip
        </h4>
        <p className="text-gray-600">
          Help us determine the correct consulate for your visa application
        </p>
      </div>

      {/* Nights Distribution */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <Label className="text-lg font-semibold">Nights in Each Country</Label>
          </div>
          <div className="space-y-4">
            {schengenDestinations.map((country) => {
              const countryInfo = getCountryInfo(country);
              return (
                <div key={country} className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 flex-1">
                    <span className="text-xl">{countryInfo?.flag}</span>
                    <span className="font-medium">{countryInfo?.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="0"
                      max="90"
                      value={nightsDistribution[country] || ''}
                      onChange={(e) => updateNights(country, parseInt(e.target.value) || 0)}
                      className="w-20"
                      placeholder="0"
                    />
                    <span className="text-sm text-gray-500">nights</span>
                  </div>
                </div>
              );
            })}
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Nights:</span>
                <span className="font-bold text-blue-600">{getTotalNights()} nights</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entry Point */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Plane className="w-5 h-5 text-blue-600" />
            <Label className="text-lg font-semibold">First Entry Point</Label>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Which Schengen country will you enter first?
          </p>
          <Select value={entryPoint} onValueChange={setEntryPoint}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your first entry point..." />
            </SelectTrigger>
            <SelectContent>
              {schengenDestinations.map((country) => {
                const countryInfo = getCountryInfo(country);
                return (
                  <SelectItem key={country} value={country}>
                    <div className="flex items-center space-x-2">
                      <span>{countryInfo?.flag}</span>
                      <span>{countryInfo?.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Business Location (if applicable) */}
      {isBusiness && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <Label className="text-lg font-semibold">Primary Business Location</Label>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Where will your main business activities take place?
            </p>
            <Select value={businessLocation} onValueChange={setBusinessLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Choose business location..." />
              </SelectTrigger>
              <SelectContent>
                {schengenDestinations.map((country) => {
                  const countryInfo = getCountryInfo(country);
                  return (
                    <SelectItem key={country} value={country}>
                      <div className="flex items-center space-x-2">
                        <span>{countryInfo?.flag}</span>
                        <span>{countryInfo?.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* Helpful Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">💡 Consulate Selection Tips</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Most nights:</strong> Apply where you'll spend the longest time</li>
          <li>• <strong>Tied nights:</strong> Apply at your first entry point</li>
          {isBusiness && (
            <li>• <strong>Business trips:</strong> Apply where your business activities occur</li>
          )}
          <li>• <strong>Complex itineraries:</strong> Our experts can help you choose</li>
        </ul>
      </div>
    </div>
  );
};

export default SchengenTripPlanner;
