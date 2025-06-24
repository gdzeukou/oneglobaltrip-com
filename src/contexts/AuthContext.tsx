
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/validation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  otpStep: {
    isRequired: boolean;
    email: string;
    purpose: 'signup' | 'signin';
    method: 'email' | 'sms';
    phoneNumber?: string;
  } | null;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, phoneNumber?: string, verificationMethod?: 'email' | 'sms') => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<{ error: any }>;
  sendOTP: (email: string, method: 'email' | 'sms', purpose: 'signup' | 'signin', phoneNumber?: string) => Promise<{ error: any }>;
  verifyOTP: (email: string, code: string, purpose: 'signup' | 'signin') => Promise<{ error: any }>;
  clearOTPStep: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [otpStep, setOTPStep] = useState<{
    isRequired: boolean;
    email: string;
    purpose: 'signup' | 'signin';
    method: 'email' | 'sms';
    phoneNumber?: string;
  } | null>(null);

  const isEmailVerified = user?.email_confirmed_at ? true : false;

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
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

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendOTP = async (email: string, method: 'email' | 'sms', purpose: 'signup' | 'signin', phoneNumber?: string) => {
    try {
      console.log(`Sending OTP to ${email} via ${method} for ${purpose}`);
      
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: {
          email,
          method,
          purpose,
          phoneNumber
        }
      });

      if (error) {
        console.error('Send OTP error:', error);
        throw error;
      }

      if (data?.success) {
        console.log('OTP sent successfully');
        setOTPStep({
          isRequired: true,
          email,
          purpose,
          method,
          phoneNumber
        });
      }

      return { error: data?.error ? { message: data.error } : null };
    } catch (error: any) {
      console.error('Send OTP error:', error);
      return { error: { message: error.message || 'Failed to send verification code' } };
    }
  };

  const verifyOTP = async (email: string, code: string, purpose: 'signup' | 'signin') => {
    try {
      console.log(`Verifying OTP for ${email}, purpose: ${purpose}`);
      
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: {
          email,
          code,
          purpose
        }
      });

      if (error) {
        console.error('Verify OTP error:', error);
        throw error;
      }

      if (data?.success) {
        console.log('OTP verification successful');
        
        if (purpose === 'signup') {
          // For signup, create the user account
          const pendingSignup = localStorage.getItem('pendingSignup');
          if (pendingSignup) {
            const signupData = JSON.parse(pendingSignup);
            console.log('Creating user account after OTP verification');
            
            const { data: authData, error: authError } = await supabase.auth.signUp({
              email: signupData.email,
              password: signupData.password,
              options: {
                data: {
                  first_name: signupData.firstName,
                  last_name: signupData.lastName,
                  phone_number: signupData.phoneNumber
                }
              }
            });

            localStorage.removeItem('pendingSignup');
            
            if (authError) {
              console.error('Signup error after OTP:', authError);
              return { error: authError };
            }

            console.log('User account created successfully');
          }
        } else {
          // For signin, authenticate the user
          const pendingSignin = localStorage.getItem('pendingSignin');
          if (pendingSignin) {
            const signinData = JSON.parse(pendingSignin);
            console.log('Signing in user after OTP verification');
            
            const { error: authError } = await supabase.auth.signInWithPassword({
              email: signinData.email,
              password: signinData.password
            });

            localStorage.removeItem('pendingSignin');
            
            if (authError) {
              console.error('Signin error after OTP:', authError);
              return { error: authError };
            }

            console.log('User signed in successfully');
          }
        }
        
        // Clear OTP step - the auth state change will handle the rest
        setOTPStep(null);
      }

      return { error: data?.error ? { message: data.error } : null };
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      return { error: { message: error.message || 'Verification failed' } };
    }
  };

  const clearOTPStep = () => {
    console.log('Clearing OTP step');
    setOTPStep(null);
    localStorage.removeItem('pendingSignup');
    localStorage.removeItem('pendingSignin');
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string, phoneNumber?: string, verificationMethod: 'email' | 'sms' = 'email') => {
    // Validate inputs
    if (!validateEmail(email)) {
      return { error: { message: 'Please enter a valid email address' } };
    }

    if (password.length < 8) {
      return { error: { message: 'Password must be at least 8 characters long' } };
    }

    if (verificationMethod === 'sms' && !phoneNumber) {
      return { error: { message: 'Phone number is required for SMS verification' } };
    }

    try {
      console.log('Starting signup process for:', email);
      
      // Store signup data for after OTP verification
      localStorage.setItem('pendingSignup', JSON.stringify({
        email: email.toLowerCase().trim(),
        password,
        firstName: firstName?.trim(),
        lastName: lastName?.trim(),
        phoneNumber: phoneNumber?.trim()
      }));

      // Send OTP instead of creating account immediately
      return await sendOTP(email.toLowerCase().trim(), verificationMethod, 'signup', phoneNumber?.trim());
    } catch (error) {
      console.error('Signup error:', error);
      localStorage.removeItem('pendingSignup');
      return { error: { message: 'An unexpected error occurred during sign up' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    // Validate inputs
    if (!validateEmail(email)) {
      return { error: { message: 'Please enter a valid email address' } };
    }

    if (!password) {
      return { error: { message: 'Password is required' } };
    }

    try {
      console.log('Starting signin process for:', email);
      
      // Store signin data for after OTP verification
      localStorage.setItem('pendingSignin', JSON.stringify({
        email: email.toLowerCase().trim(),
        password
      }));

      // Send OTP instead of signing in immediately
      return await sendOTP(email.toLowerCase().trim(), 'email', 'signin');
    } catch (error) {
      console.error('Signin error:', error);
      localStorage.removeItem('pendingSignin');
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      await supabase.auth.signOut();
      setOTPStep(null);
      localStorage.removeItem('pendingSignup');
      localStorage.removeItem('pendingSignin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const resendVerification = async () => {
    if (!user?.email) {
      return { error: { message: 'No user email found' } };
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      return { error };
    } catch (error) {
      return { error: { message: 'Failed to resend verification email' } };
    }
  };

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    otpStep,
    signUp,
    signIn,
    signOut,
    resendVerification,
    sendOTP,
    verifyOTP,
    clearOTPStep,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
