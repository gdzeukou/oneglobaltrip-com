
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight, Package } from 'lucide-react';
import { checkVisaRequirement, getDestinationPackages, destinationCountries } from '@/data/visaRequirementsDatabase';
import { Link } from 'react-router-dom';

interface VisaResultsProps {
  wizardData: {
    destination: string;
    nationality: string;
    purpose: string;
    duration: string;
  };
  onReset: () => void;
}

const VisaResults = ({ wizardData, onReset }: VisaResultsProps) => {
  const visaCheck = checkVisaRequirement(wizardData.nationality, wizardData.destination, wizardData.purpose);
  const destinationName = destinationCountries.find(c => c.code === wizardData.destination)?.name || wizardData.destination;
  const destinationFlag = destinationCountries.find(c => c.code === wizardData.destination)?.flag || '🌍';
  const packages = getDestinationPackages(wizardData.destination);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="text-4xl mb-4">{destinationFlag}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Your Visa Requirements for {destinationName}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge variant="outline">Nationality: {wizardData.nationality}</Badge>
          <Badge variant="outline">Purpose: {wizardData.purpose}</Badge>
          <Badge variant="outline">Duration: {wizardData.duration}</Badge>
        </div>
      </div>

      {/* Results */}
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
        {!visaCheck.required ? (
          // No Visa Required
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-green-800 mb-2">
                🎉 Great News! No Visa Required!
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                You can travel to <strong>{destinationName}</strong> without a visa for your planned trip.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-green-800 mb-2">What you need to know:</h5>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                  <li>• Ensure your passport is valid for at least 6 months</li>
                  <li>• Check if you need proof of return/onward travel</li>
                  <li>• Verify any health requirements (vaccinations)</li>
                  <li>• Consider travel insurance for your protection</li>
                </ul>
              </div>
            </div>

            {/* Package Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h5 className="text-xl font-bold text-blue-900 mb-4 flex items-center justify-center">
                <Package className="w-5 h-5 mr-2" />
                Recommended {destinationName} Packages
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {packages.slice(0, 3).map((pkg, index) => (
                  <div key={index} className="bg-white border border-blue-200 rounded-lg p-4 text-center">
                    <div className="font-semibold text-blue-900 mb-2">{pkg}</div>
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
              <Link to="/packages">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Explore All {destinationName} Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Visa Required
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <AlertTriangle className="w-16 h-16 text-orange-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-orange-800 mb-2">
                ⚠️ Visa Required for {destinationName}
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                You need a visa to travel to <strong>{destinationName}</strong> for your planned trip.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h5 className="font-semibold text-red-800 mb-2">⏰ Important Deadlines:</h5>
                <ul className="text-sm text-red-700 space-y-1 text-left">
                  <li>• Processing times are limited - apply as soon as possible</li>
                  <li>• Standard processing: 15-30 business days</li>
                  <li>• Rush processing may be available for additional fees</li>
                  <li>• Peak seasons may have longer processing times</li>
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
              <h5 className="text-xl font-bold mb-4">Start Your Visa Application Now</h5>
              <p className="mb-4">
                Don't let visa requirements delay your travel plans. Our experts will handle your application from start to finish.
              </p>
              <div className="space-y-3">
                <Link to="/visas/short-stay">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                    Start Visa Application
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <div className="text-sm text-blue-100">
                  ✓ Expert guidance ✓ Fast processing ✓ High approval rate
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h6 className="font-semibold text-gray-900 mb-2">📋 Document Checklist</h6>
                <p className="text-sm text-gray-600">Get a personalized list of required documents</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h6 className="font-semibold text-gray-900 mb-2">📞 Expert Consultation</h6>
                <p className="text-sm text-gray-600">Speak with our visa specialists</p>
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
          <span>Check Another Destination</span>
        </Button>
      </div>
    </div>
  );
};

export default VisaResults;
