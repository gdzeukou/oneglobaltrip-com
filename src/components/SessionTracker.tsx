import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSessionTracking } from '@/hooks/useSessionTracking';

const SessionTracker: React.FC = () => {
  const { user, loading } = useAuth();
  
  // Only track when not loading and we have a user
  const shouldTrack = !loading && !!user;
  const userEmail = user?.email || 'demo@example.com';
  const userId = user?.id;

  const { sessionId, pageViews, isTracking } = useSessionTracking(
    shouldTrack ? userEmail : '', 
    shouldTrack ? userId : undefined
  );

  useEffect(() => {
    if (isTracking && shouldTrack) {
      console.log('Session tracking active:', { sessionId, pageViews, userEmail });
    }
  }, [sessionId, pageViews, isTracking, userEmail, shouldTrack]);

  // This component doesn't render anything visible
  return null;
};

export default SessionTracker;