import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SessionData {
  email: string;
  userId?: string;
  sessionId: string;
  startTime: Date;
  pageViews: number;
  currentPage: string;
}

export const useSessionTracking = (userEmail?: string, userId?: string) => {
  const sessionRef = useRef<SessionData | null>(null);
  const heartbeatRef = useRef<number | null>(null);
  const pageViewCountRef = useRef(0);

  // Generate session ID
  const generateSessionId = useCallback(() => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Start session
  const startSession = useCallback(async (email: string) => {
    try {
      const sessionId = generateSessionId();
      const startTime = new Date();
      
      sessionRef.current = {
        email,
        userId,
        sessionId,
        startTime,
        pageViews: 1,
        currentPage: window.location.pathname
      };

      // Create session in database
      await supabase
        .from('user_sessions')
        .insert({
          user_id: userId || null,
          email,
          session_id: sessionId,
          started_at: startTime.toISOString(),
          last_activity: startTime.toISOString(),
          ip_address: null, // Will be set by backend if needed
          user_agent: navigator.userAgent,
          location_data: null, // Can be enhanced with geolocation
          pages_visited: 1,
          is_active: true
        });

      console.log('Session started:', sessionId);
    } catch (error) {
      console.error('Error starting session:', error);
    }
  }, [userId, generateSessionId]);

  // Update session
  const updateSession = useCallback(async () => {
    if (!sessionRef.current) return;

    try {
      const now = new Date();
      const duration = Math.floor((now.getTime() - sessionRef.current.startTime.getTime()) / 1000);

      await supabase
        .from('user_sessions')
        .update({
          last_activity: now.toISOString(),
          duration_seconds: duration,
          pages_visited: sessionRef.current.pageViews
        })
        .eq('session_id', sessionRef.current.sessionId);

      // Also update user_activity for compatibility
      await supabase
        .from('user_activity')
        .insert({
          email: sessionRef.current.email,
          user_id: sessionRef.current.userId || null,
          page_visited: sessionRef.current.currentPage,
          action_type: 'page_view',
          session_id: sessionRef.current.sessionId,
          session_duration: duration,
          last_seen: now.toISOString(),
          is_online: true
        });

    } catch (error) {
      console.error('Error updating session:', error);
    }
  }, []);

  // End session
  const endSession = useCallback(async () => {
    if (!sessionRef.current) return;

    try {
      const now = new Date();
      const duration = Math.floor((now.getTime() - sessionRef.current.startTime.getTime()) / 1000);

      await supabase
        .from('user_sessions')
        .update({
          ended_at: now.toISOString(),
          last_activity: now.toISOString(),
          duration_seconds: duration,
          is_active: false
        })
        .eq('session_id', sessionRef.current.sessionId);

      console.log('Session ended:', sessionRef.current.sessionId);
      sessionRef.current = null;
    } catch (error) {
      console.error('Error ending session:', error);
    }
  }, []);

  // Track page view
  const trackPageView = useCallback((page: string) => {
    if (sessionRef.current) {
      sessionRef.current.pageViews++;
      sessionRef.current.currentPage = page;
      pageViewCountRef.current++;
      updateSession();
    }
  }, [updateSession]);

  // Setup heartbeat
  const startHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
    }

    heartbeatRef.current = window.setInterval(() => {
      updateSession();
    }, 30000); // Update every 30 seconds
  }, [updateSession]);

  // Initialize session tracking
  useEffect(() => {
    if (userEmail && !sessionRef.current) {
      startSession(userEmail);
      startHeartbeat();
    }

    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
    };
  }, [userEmail, startSession, startHeartbeat]);

  // Track page changes
  useEffect(() => {
    const currentPage = window.location.pathname;
    if (sessionRef.current && sessionRef.current.currentPage !== currentPage) {
      trackPageView(currentPage);
    }
  }, [trackPageView]);

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      endSession();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        updateSession();
      } else if (sessionRef.current) {
        startHeartbeat();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      endSession();
    };
  }, [endSession, updateSession, startHeartbeat]);

  return {
    sessionId: sessionRef.current?.sessionId,
    pageViews: sessionRef.current?.pageViews || 0,
    trackPageView,
    isTracking: !!sessionRef.current
  };
};