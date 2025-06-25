
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight, Package, AlertCircle } from 'lucide-react';
import { checkMultiDestinationVisaRequirement, destinationCountries } from '@/data/visaRequirementsDatabase';
import { Link } from 'react-router-dom';

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
  const countries = destinations.map(d => d.country);
  const purposes = destinations.map(d => d.purpose);
  const visaCheck = checkMultiDestinationVisaRequirement(nationality, countries, purposes);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Multi-Destination Visa Requirements
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge variant="outline">Nationality: {nationality}</Badge>
          <Badge variant="outline">{visaCheck.totalDestinations} Destinations</Badge>
        </div>
      </div>

      {/* Individual Destination Results */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">Visa Requirements by Destination:</h4>
        {visaCheck.destinations.map((result, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{result.flag}</span>
                <div>
                  <h5 className="font-semibold text-gray-900">{result.destinationName}</h5>
                  <p className="text-sm text-gray-600">Purpose: {destinations[index].purpose}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!result.required ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <Badge className="bg-green-100 text-green-800">No Visa Required</Badge>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <Badge className="bg-orange-100 text-orange-800">Visa Required</Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transit Warnings */}
      {visaCheck.transitWarnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h5 className="font-semibold text-yellow-800 mb-2">Transit Visa Considerations</h5>
              {visaCheck.transitWarnings.map((warning, index) => (
                <p key={index} className="text-sm text-yellow-700 mb-1">
                  • {warning.message}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Overall Results */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
        {visaCheck.allVisaFree ? (
          // All Visa-Free
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-green-800 mb-2">
                🎉 Amazing! No Visas Required!
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                You can travel to all {visaCheck.totalDestinations} destinations without any visas for your planned trip purposes.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-green-800 mb-2">What you need to know:</h5>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Ensure your passport is valid for at least 6 months for each destination</li>
                  <li>• Check entry/exit requirements between countries</li>
                  <li>• Consider travel insurance for multi-destination coverage</li>
                  <li>• Verify any health requirements (vaccinations) for each country</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h5 className="text-xl font-bold text-blue-900 mb-4 flex items-center justify-center">
                <Package className="w-5 h-5 mr-2" />
                Multi-Destination Travel Packages
              </h5>
              <p className="text-blue-800 mb-4">
                Perfect for visa-free travel! Explore our curated multi-destination packages.
              </p>
              <Link to="/packages">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Explore Multi-Destination Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Some Visas Required
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-orange-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-orange-800 mb-2">
                ⚠️ Complex Visa Requirements Detected
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                Your multi-destination trip requires {visaCheck.destinations.filter(d => d.required).length} visa(s) 
                out of {visaCheck.totalDestinations} destinations.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-red-800 mb-2">⏰ Important for Multi-Destination Trips:</h5>
                <ul className="text-sm text-red-700 space-y-1 text-left">
                  <li>• Start applications early - some destinations have longer processing times</li>
                  <li>• Consider the order of your travel - some visas require proof of onward travel</li>
                  <li>• Account for passport submission periods when planning your timeline</li>
                  <li>• Some countries require visas to be used within specific timeframes</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
              <h5 className="text-xl font-bold mb-4">Expert Multi-Destination Visa Planning</h5>
              <p className="mb-4">
                Complex itineraries need expert guidance. Our specialists will coordinate all your visa applications 
                and ensure optimal timing for your multi-destination trip.
              </p>
              <div className="space-y-3">
                <Link to="/get-started">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                    Get Expert Multi-Destination Planning
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <div className="text-sm text-blue-100">
                  ✓ Coordinated applications ✓ Timeline optimization ✓ Transit visa guidance
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
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
