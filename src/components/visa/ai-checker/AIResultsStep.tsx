
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, Clock, FileText, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AIResultsStepProps {
  result: any;
  loading: boolean;
  onBack: () => void;
  onStartOver: () => void;
}

const AIResultsStep = ({ result, loading, onBack, onStartOver }: AIResultsStepProps) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-4 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-blue-900 font-medium">AI analyzing your eligibility...</span>
        </div>
        <p className="text-gray-600 mt-4">Please wait while we process your information</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Failed</h3>
        <p className="text-gray-600 mb-6">We couldn't process your request. Please try again.</p>
        <Button onClick={onStartOver} variant="outline">
          Start Over
        </Button>
      </div>
    );
  }

  // Handle error status
  if (result.status === 'error') {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title || 'Analysis Failed'}</h3>
        <p className="text-gray-600 mb-6">{result.reason || 'An error occurred while processing your request.'}</p>
        <div className="space-y-3">
          <Button onClick={onStartOver} className="bg-blue-600 hover:bg-blue-700 text-white">
            Try Again
          </Button>
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (result.status === 'eligible') return <CheckCircle className="h-8 w-8 text-green-500" />;
    if (result.status === 'not-eligible') return <XCircle className="h-8 w-8 text-red-500" />;
    return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
  };

  const getStatusColor = () => {
    if (result.status === 'eligible') return 'green';
    if (result.status === 'not-eligible') return 'red';
    return 'yellow';
  };

  const statusColor = getStatusColor();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getStatusIcon()}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.title}</h3>
        {result.reason && (
          <p className="text-gray-600">{result.reason}</p>
        )}
      </div>

      {result.aiAnalysis && (
        <Card className={`border-${statusColor}-200 bg-${statusColor}-50`}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Lightbulb className={`h-5 w-5 text-${statusColor}-600 mt-1`} />
              <h4 className={`font-semibold text-${statusColor}-900`}>AI Analysis</h4>
            </div>
            <div className={`text-${statusColor}-800 whitespace-pre-line`}>
              {result.aiAnalysis}
            </div>
          </CardContent>
        </Card>
      )}

      {result.processingTime && result.status === 'eligible' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Processing Time</h4>
            </div>
            <p className="text-gray-700">{result.processingTime}</p>
          </CardContent>
        </Card>
      )}

      {result.successTips && result.successTips.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-5 w-5 text-green-600" />
              <h4 className="font-semibold text-gray-900">Success Tips</h4>
            </div>
            <ul className="space-y-2">
              {result.successTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {result.alternative && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-semibold text-yellow-900 mb-2">Alternative Option</h4>
                <p className="text-yellow-800">{result.alternative}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="px-6 py-3"
        >
          Back
        </Button>
        <Button 
          variant="outline" 
          onClick={onStartOver}
          className="px-6 py-3"
        >
          Check Another Scenario
        </Button>
        {result.status === 'eligible' && (
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            <Link to="/visas/short-stay/schengen">
              Start Application
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default AIResultsStep;
