
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ConsulateRecommendation as ConsulateRecommendationType } from '@/data/visaRequirementsDatabase';
import { MapPin, Clock, ExternalLink, Phone, AlertTriangle } from 'lucide-react';

interface ConsulateRecommendationProps {
  recommendation: ConsulateRecommendationType;
  onBookConsultation?: () => void;
}

const ConsulateRecommendation = ({ recommendation, onBookConsultation }: ConsulateRecommendationProps) => {
  const { primaryConsulate, alternatives, expertConsultationNeeded } = recommendation;

  return (
    <div className="space-y-6">
      {/* Primary Recommendation */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold text-green-800 mb-2">
                Recommended Consulate
              </h4>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Best Match
              </Badge>
            </div>
            <MapPin className="w-6 h-6 text-green-600" />
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h5 className="font-bold text-lg text-gray-900 mb-2">
                {primaryConsulate.countryName} Embassy/Consulate
              </h5>
              <p className="text-gray-700 mb-3">
                <strong>Why this consulate:</strong> {primaryConsulate.reasoning}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Processing:</strong> {primaryConsulate.processingTime}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>Location:</strong> Multiple cities available
                  </span>
                </div>
              </div>

              {primaryConsulate.bookingUrl && (
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => window.open(primaryConsulate.bookingUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alternative Options */}
      {alternatives && alternatives.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Alternative Options
            </h4>
            <div className="space-y-3">
              {alternatives.map((alt, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <h6 className="font-medium text-gray-900">{alt.countryName}</h6>
                  <p className="text-sm text-gray-600">{alt.reasoning}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Expert Consultation Needed */}
      {expertConsultationNeeded && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-orange-800 mb-2">
                  Expert Consultation Recommended
                </h4>
                <p className="text-orange-700 mb-4">
                  Your itinerary is complex and may benefit from personalized guidance. 
                  Our visa experts can help ensure you apply at the correct consulate.
                </p>
                <Button 
                  onClick={onBookConsultation}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Expert Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Important Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h5 className="font-semibold text-blue-800 mb-2">📋 Important Reminders</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Book your appointment as early as possible</li>
          <li>• Bring all required documents to your appointment</li>
          <li>• Processing times may vary during peak seasons</li>
          <li>• Consider expedited processing if your travel date is soon</li>
          <li>• One Schengen visa allows travel to all Schengen countries</li>
        </ul>
      </div>
    </div>
  );
};

export default ConsulateRecommendation;
