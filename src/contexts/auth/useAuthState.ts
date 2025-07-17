
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
    // Simplified auth initialization for better performance
    const isLovableDomain = window.location.hostname.includes('lovable');
    
    if (isLovableDomain) {
      // Quick mock setup for development
      setUser(createMockUser() as User);
      setSession(createMockSession() as Session);
      setLoading(false);
      return;
    }

    // Simplified auth state management
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

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      // Graceful fallback if auth fails
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
