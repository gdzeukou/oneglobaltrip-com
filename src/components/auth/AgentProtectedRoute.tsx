import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAgent } from '@/hooks/useUserAgent';
import { isDevelopmentMode } from '@/utils/developmentMode';

interface AgentProtectedRouteProps {
  children: React.ReactNode;
}

const AgentProtectedRoute = ({ children }: AgentProtectedRouteProps) => {
  const { user, loading: authLoading } = useAuth();
  const { hasAgent, loading: agentLoading } = useUserAgent();
  const location = useLocation();

  const loading = authLoading || agentLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Development bypass for Lovable environment
  if (isDevelopmentMode()) {
    console.log('Development mode: Bypassing agent authentication checks');
    return <>{children}</>;
  }

  // If no user, redirect to auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If user exists but no agent, redirect to agent creation
  if (!hasAgent) {
    return <Navigate to="/agent/new" replace />;
  }

  return <>{children}</>;
};

export default AgentProtectedRoute;