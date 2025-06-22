
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, CheckCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConsultationInfo: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">What to Expect</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">15-Minute Call</h4>
                <p className="text-gray-600 text-sm">Quick, focused discussion about your travel goals</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Personalized Recommendations</h4>
                <p className="text-gray-600 text-sm">Custom itinerary suggestions based on your preferences</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-yellow-500 mt-1" />
              <div>
                <h4 className="font-semibold">Visa Guidance</h4>
                <p className="text-gray-600 text-sm">Clear explanation of visa requirements and process</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Schedule Directly</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-4">
              Ready to get started? Book your free consultation instantly
            </p>
            <Button
              onClick={() => window.open('https://calendly.com/admin-oneglobaltrip/planmytrip', '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Book Free Consultation
            </Button>
            <p className="text-sm text-gray-500">
              15-minute call • No commitment required
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationInfo;
