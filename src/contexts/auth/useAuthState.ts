
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { OTPStep } from './types';
import { isDevelopmentMode, createMockUser, createMockSession } from '@/utils/developmentMode';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpStep, setOTPStep] = useState<OTPStep | null>(null);

  const isEmailVerified = user?.email_confirmed_at ? true : false;

  useEffect(() => {
    // First, try to get the real session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession) {
          // Real authenticated user found
          setSession(currentSession);
          setUser(currentSession.user);
          setLoading(false);
          return;
        }
        
        // Only use mock auth if no real session exists and we're in development
        const isLovableDomain = window.location.hostname.includes('lovable');
        if (isLovableDomain && isDevelopmentMode()) {
          setUser(createMockUser() as User);
          setSession(createMockSession() as Session);
          setLoading(false);
          return;
        }
        
        // No session found, continue with normal auth flow
        setLoading(false);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (event === 'SIGNED_IN' && session?.user) {
          setOTPStep(null);
        }
        if (event === 'SIGNED_OUT') {
          setOTPStep(null);
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    session,
    loading,
    isEmailVerified,
    otpStep,
    setOTPStep
  };
};
