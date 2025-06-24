
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/validation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<{ error: any }>;
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

  const isEmailVerified = user?.email_confirmed_at ? true : false;

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email_confirmed_at);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
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

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    // Validate inputs
    if (!validateEmail(email)) {
      return { error: { message: 'Please enter a valid email address' } };
    }

    if (password.length < 8) {
      return { error: { message: 'Password must be at least 8 characters long' } };
    }

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error, data } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName?.trim(),
            last_name: lastName?.trim(),
          }
        }
      });

      // If signup was successful, immediately sign out the user
      // This prevents the confusing state where they're logged in but unverified
      if (!error && data.user) {
        console.log('Signup successful, signing out user to enforce email verification');
        await supabase.auth.signOut();
      }

      return { error };
    } catch (error) {
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
      const { error, data } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase().trim(),
        password,
      });

      // Check for specific email verification errors
      if (error) {
        console.log('Sign in error:', error);
        
        // Handle different types of authentication errors
        if (error.message.includes('Email not confirmed') || 
            error.message.includes('email_not_confirmed') ||
            error.message.includes('signup_disabled')) {
          return { error: { message: 'Please verify your email address before signing in. Check your inbox for a verification link.' } };
        }
        
        if (error.message.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        }
      }

      // If sign in was successful but email is not verified, sign them out
      if (!error && data.user && !data.user.email_confirmed_at) {
        console.log('User signed in but email not verified, signing out');
        await supabase.auth.signOut();
        return { error: { message: 'Please verify your email address before signing in. Check your inbox for a verification link.' } };
      }

      return { error };
    } catch (error) {
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
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
    signUp,
    signIn,
    signOut,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
