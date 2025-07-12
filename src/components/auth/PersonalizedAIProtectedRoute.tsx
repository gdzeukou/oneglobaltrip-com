import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { Navigate, useLocation } from 'react-router-dom';
import EmailVerification from './EmailVerification';
import AIAgentCreatorGate from './AIAgentCreatorGate';
import { isDevelopmentMode } from '@/utils/developmentMode';

interface PersonalizedAIProtectedRouteProps {
  children: React.ReactNode;
}

const PersonalizedAIProtectedRoute = ({ children }: PersonalizedAIProtectedRouteProps) => {
  const { user, isEmailVerified, loading, otpStep } = useAuth();
  const { preferences, loading: preferencesLoading } = useAIAgentPreferences();
  const location = useLocation();

  if (loading || preferencesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Development bypass for Lovable environment
  if (isDevelopmentMode()) {
    console.log('Development mode: Bypassing AI agent authentication checks');
    return <>{children}</>;
  }

  // If OTP verification is required, redirect to AI agent auth gate
  if (otpStep?.isRequired) {
    return <Navigate to="/ai-agent-auth" state={{ from: location }} replace />;
  }

  // If no user, redirect to AI agent auth gate
  if (!user) {
    return <Navigate to="/ai-agent-auth" state={{ from: location }} replace />;
  }

  // If email verification is required, show verification component
  if (!isEmailVerified) {
    return <EmailVerification />;
  }

  // If AI agent setup is not completed, show the onboarding flow
  if (!preferences.aiAgentSetupCompleted) {
    return <AIAgentCreatorGate />;
  }

  return <>{children}</>;
};

export default PersonalizedAIProtectedRoute;