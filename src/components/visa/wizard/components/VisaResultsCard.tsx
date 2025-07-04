
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  AlertTriangle,
  ExternalLink,
  Phone
} from 'lucide-react';

interface VisaResult {
  required: boolean;
  visaType?: string;
  processingTime?: string;
  documents?: string[];
  message?: string;
  isSchengen?: boolean;
  fallback?: boolean;
}

interface VisaResultsCardProps {
  result: VisaResult;
  nationality: string;
  destination: string;
  purpose: string;
  onApplyNow?: () => void;
  onGetConsultation?: () => void;
}

const VisaResultsCard = ({
  result,
  nationality,
  destination,
  purpose,
  onApplyNow,
  onGetConsultation
}: VisaResultsCardProps) => {
  if (result.fallback) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-yellow-800">Information Not Available</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-yellow-700">
            We couldn't find visa details for this route. You can search the official embassy site, or let us update this section for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-100"
              onClick={() => window.open(`https://www.google.com/search?q=${destination}+embassy+visa+requirements+${nationality}`, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Search Embassy Site
            </Button>
            <Button 
              className="bg-yellow-600 hover:bg-yellow-700"
              onClick={onGetConsultation}
            >
              <Phone className="h-4 w-4 mr-2" />
              Get Expert Help
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`border-2 ${result.required ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          {result.required ? (
            <XCircle className="h-6 w-6 text-red-600" />
          ) : (
            <CheckCircle className="h-6 w-6 text-green-600" />
          )}
          <CardTitle className={result.required ? 'text-red-800' : 'text-green-800'}>
            {result.required ? 'Visa Required' : 'No Visa Required'}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Travel Details</h4>
            <div className="space-y-1 text-sm">
              <p><strong>From:</strong> {nationality}</p>
              <p><strong>To:</strong> {destination}</p>
              <p><strong>Purpose:</strong> {purpose}</p>
            </div>
          </div>
          
          {result.required && (
            <div>
              <h4 className="font-semibold mb-2">Visa Information</h4>
              <div className="space-y-2">
                {result.visaType && (
                  <Badge variant="outline" className="text-xs">
                    {result.visaType}
                  </Badge>
                )}
                {result.processingTime && (
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>{result.processingTime}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {result.message && (
          <div className={`p-3 rounded-md ${result.required ? 'bg-red-100' : 'bg-green-100'}`}>
            <p className={`text-sm ${result.required ? 'text-red-700' : 'text-green-700'}`}>
              {result.message}
            </p>
          </div>
        )}

        {result.required && result.documents && result.documents.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Required Documents
            </h4>
            <ul className="text-sm space-y-1">
              {result.documents.map((doc, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          {result.required ? (
            <>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={onApplyNow}
              >
                Apply Now
              </Button>
              <Button 
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50"
                onClick={onGetConsultation}
              >
                <Phone className="h-4 w-4 mr-2" />
                Get Consultation
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => window.open('/packages', '_blank')}
              >
                Explore Travel Packages
              </Button>
              <Button 
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={onGetConsultation}
              >
                Plan Multi-Country Trip
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisaResultsCard;
