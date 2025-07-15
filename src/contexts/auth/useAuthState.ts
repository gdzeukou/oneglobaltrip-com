
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
    
    // Only bypass in true development mode (not during OAuth flows)
    const isRealDevelopment = window.location.hostname === 'localhost' && 
                             !window.location.search.includes('access_token') && 
                             !window.location.hash.includes('access_token');
    
    if (isDevelopmentMode() && isRealDevelopment) {
      console.log('Development mode detected, creating mock session');
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
