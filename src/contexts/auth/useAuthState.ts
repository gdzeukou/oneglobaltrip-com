
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
    // Reduce console logging for performance
    const isLovableDomain = window.location.hostname.includes('lovable');
    
    if (isLovableDomain) {
      const mockUser = createMockUser() as User;
      const mockSession = createMockSession() as Session;
      
      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
      setOTPStep(null);
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Update state directly without setTimeout to reduce delays
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Clear OTP step on successful auth
        if (event === 'SIGNED_IN' && session?.user) {
          setOTPStep(null);
          localStorage.removeItem('pendingSignup');
          localStorage.removeItem('pendingSignin');
        }

        if (event === 'SIGNED_OUT') {
          setOTPStep(null);
          localStorage.removeItem('pendingSignup');
          localStorage.removeItem('pendingSignin');
        }
      }
    );

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

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
