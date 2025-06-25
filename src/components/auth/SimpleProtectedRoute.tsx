
import React from 'react';
import { useSimpleAuth } from '@/contexts/SimpleAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogIn, Mail } from 'lucide-react';

interface SimpleProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

const SimpleProtectedRoute = ({ children, requireEmailVerification = false }: SimpleProtectedRouteProps) => {
  const { user, isEmailVerified, loading } = useSimpleAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If no user, redirect to auth page
  if (!user) {
    return <Navigate to="/simple-auth" state={{ from: location }} replace />;
  }

  // If email verification is required and email is not verified
  if (requireEmailVerification && !isEmailVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-600">
              Please check your email and click the verification link to access this feature.
            </p>
          </div>
          
          <Alert className="border-blue-200 bg-blue-50 mb-6">
            <Mail className="h-4 w-4" />
            <AlertDescription className="text-blue-800">
              We've sent a verification email to <strong>{user.email}</strong>
            </AlertDescription>
          </Alert>

          <Button asChild variant="outline" className="w-full">
            <Link to="/dashboard">
              <LogIn className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SimpleProtectedRoute;
