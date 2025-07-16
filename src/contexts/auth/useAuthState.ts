
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
    console.log('Setting up auth state listener...');
    console.log('Current hostname:', window.location.hostname);
    console.log('isDevelopmentMode():', isDevelopmentMode());
    
    // TEMPORARILY DISABLE DEV MODE to debug forms
    const isLovableDomain = false; // window.location.hostname.includes('lovable');
    
    console.log('TEMP: Dev mode disabled for form debugging');
    console.log('isLovableDomain:', isLovableDomain);
    
    if (isLovableDomain) {
      console.log('Lovable domain detected, creating mock session');
      const mockUser = createMockUser() as User;
      const mockSession = createMockSession() as Session;
      
      console.log('Mock user created:', mockUser);
      console.log('Mock session created:', mockSession);
      
      setUser(mockUser);
      setSession(mockSession);
      setLoading(false);
      setOTPStep(null);
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email || 'No user');
        
        // Prevent race conditions by ensuring we only update state once per event
        setTimeout(() => {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          
          // Clear OTP step on successful auth
          if (event === 'SIGNED_IN' && session?.user) {
            console.log('User signed in successfully, clearing OTP step');
            setOTPStep(null);
            // Clear any pending data
            localStorage.removeItem('pendingSignup');
            localStorage.removeItem('pendingSignin');
          }

          if (event === 'SIGNED_OUT') {
            console.log('User signed out, clearing OTP step');
            setOTPStep(null);
            localStorage.removeItem('pendingSignup');
            localStorage.removeItem('pendingSignin');
          }

          // Handle token refresh
          if (event === 'TOKEN_REFRESHED') {
            console.log('Token refreshed successfully');
          }
        }, 0);
      }
    );

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email || 'No session');
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      subscription.unsubscribe();
    };
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
