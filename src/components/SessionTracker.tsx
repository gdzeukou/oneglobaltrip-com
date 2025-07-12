import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSessionTracking } from '@/hooks/useSessionTracking';

const SessionTracker: React.FC = () => {
  const { user } = useAuth();
  
  // Use a fallback email for development/demo purposes
  const userEmail = user?.email || 'demo@example.com';
  const userId = user?.id;

  const { sessionId, pageViews, isTracking } = useSessionTracking(userEmail, userId);

  useEffect(() => {
    if (isTracking) {
      console.log('Session tracking active:', { sessionId, pageViews, userEmail });
    }
  }, [sessionId, pageViews, isTracking, userEmail]);

  // This component doesn't render anything visible
  return null;
};

export default SessionTracker;