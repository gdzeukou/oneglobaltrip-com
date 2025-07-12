
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import EmailVerification from './EmailVerification';
import { isDevelopmentMode } from '@/utils/developmentMode';

interface MayaProtectedRouteProps {
  children: React.ReactNode;
}

const MayaProtectedRoute = ({ children }: MayaProtectedRouteProps) => {
  const { user, isEmailVerified, loading, otpStep } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Development bypass for Lovable environment
  if (isDevelopmentMode()) {
    console.log('Development mode: Bypassing AI Travel Agent authentication checks');
    return <>{children}</>;
  }

  // If OTP verification is required, redirect to AI Travel Agent auth gate
  if (otpStep?.isRequired) {
    return <Navigate to="/maya-auth" state={{ from: location }} replace />;
  }

  // If no user, redirect to AI Travel Agent auth gate instead of general auth
  if (!user) {
    return <Navigate to="/maya-auth" state={{ from: location }} replace />;
  }

  // If email verification is required, show verification component
  if (!isEmailVerified) {
    return <EmailVerification />;
  }

  return <>{children}</>;
};

export default MayaProtectedRoute;
