
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { OTPStep } from './types';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpStep, setOTPStep] = useState<OTPStep | null>(null);

  const isEmailVerified = user?.email_confirmed_at ? true : false;

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
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
          setOTPStep(null);
          localStorage.removeItem('pendingSignup');
          localStorage.removeItem('pendingSignin');
        }
      }
    );

    // THEN get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email || 'No session');
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
