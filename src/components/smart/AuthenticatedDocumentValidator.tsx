
import React from 'react';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { LogIn, FileText, Shield } from 'lucide-react';
import DocumentValidator from './DocumentValidator';

export const AuthenticatedDocumentValidator = () => {
  const { user, loading } = useSimpleAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Secure Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Please sign in to access our AI-powered document validation service. 
            Your documents will be securely stored and validated with advanced technology.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What you'll get:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• AI-powered document validation</li>
              <li>• Secure encrypted storage</li>
              <li>• Instant feedback and suggestions</li>
              <li>• Progress tracking for your applications</li>
            </ul>
          </div>
          <Button asChild className="w-full" size="lg">
            <Link to="/simple-auth">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In to Upload Documents
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <DocumentValidator />;
};

export default AuthenticatedDocumentValidator;
