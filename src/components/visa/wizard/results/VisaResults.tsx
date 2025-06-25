
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
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl -z-10"></div>
        <div className="text-4xl mb-4">{destinationFlag}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Your Visa Requirements for {destinationName}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-blue-200">
            Nationality: {wizardData.nationality}
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-purple-200">
            Purpose: {wizardData.purpose}
          </Badge>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-green-200">
            Duration: {wizardData.duration}
          </Badge>
        </div>
      </div>

      {/* Results */}
      <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-2 border-dashed border-gray-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {!visaCheck.required ? (
          // No Visa Required
          <div className="text-center space-y-6 relative z-10">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-green-800 mb-2">
                🎉 Great News! No Visa Required!
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                You can travel to <strong>{destinationName}</strong> without a visa for your planned trip.
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-6 mb-6 shadow-inner">
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-2xl p-6 shadow-inner">
              <h5 className="text-xl font-bold text-blue-900 mb-4 flex items-center justify-center">
                <Package className="w-5 h-5 mr-2" />
                Recommended {destinationName} Packages
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {packages.slice(0, 3).map((pkg, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm border-2 border-blue-200/50 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                    <div className="font-semibold text-blue-900 mb-2">{pkg}</div>
                    <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
              <Link to="/packages">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Explore All {destinationName} Packages
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          // Visa Required
          <div className="text-center space-y-6 relative z-10">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-orange-800 mb-2">
                ⚠️ Visa Required for {destinationName}
              </h4>
              <p className="text-lg text-gray-700 mb-4">
                You need a visa to travel to <strong>{destinationName}</strong> for your planned trip.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200/50 rounded-2xl p-6 mb-6 shadow-inner">
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
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
              <h5 className="text-xl font-bold mb-4">Start Your Visa Application Now</h5>
              <p className="mb-4">
                Don't let visa requirements delay your travel plans. Our experts will handle your application from start to finish.
              </p>
              <div className="space-y-3">
                <Link to="/visas/short-stay">
                  <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-2 border-gray-200/50 rounded-xl p-4 shadow-inner">
                <h6 className="font-semibold text-gray-900 mb-2">📋 Document Checklist</h6>
                <p className="text-sm text-gray-600">Get a personalized list of required documents</p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 border-2 border-gray-200/50 rounded-xl p-4 shadow-inner">
                <h6 className="font-semibold text-gray-900 mb-2">📞 Expert Consultation</h6>
                <p className="text-sm text-gray-600">Speak with our visa specialists</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
      <div className="text-center pt-6 border-t border-gray-200/50">
        <Button 
          variant="outline" 
          onClick={onReset}
          className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Check Another Destination</span>
        </Button>
      </div>
    </div>
  );
};

export default VisaResults;
