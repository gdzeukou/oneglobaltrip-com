
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import EmailVerification from './EmailVerification';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireEmailVerification?: boolean;
}

const ProtectedRoute = ({ children, requireEmailVerification = true }: ProtectedRouteProps) => {
  const { user, isEmailVerified, loading, otpStep } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If OTP verification is required, redirect to auth page
  if (otpStep?.isRequired) {
    return <Navigate to="/auth" replace />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireEmailVerification && !isEmailVerified) {
    return <EmailVerification />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
