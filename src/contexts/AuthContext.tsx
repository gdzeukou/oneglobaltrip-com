
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

console.log('AuthContext.tsx: Loading');

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  signOut: () => Promise<void>;
  resendVerification: (userEmail?: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('useAuth must be used within an AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('AuthProvider: Rendering');
  
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const isEmailVerified = user?.email_confirmed_at ? true : false;

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listeners');
    
    try {
      // Get initial session first
      const getInitialSession = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            console.error('AuthProvider: Error getting initial session:', error);
          } else {
            console.log('AuthProvider: Initial session check:', session?.user?.email || 'No session');
            setSession(session);
            setUser(session?.user ?? null);
          }
        } catch (error) {
          console.error('AuthProvider: Error in getSession:', error);
        } finally {
          setLoading(false);
        }
      };

      // Set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log('AuthProvider: Auth state change:', event, session?.user?.email || 'No user');
          
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      // Get initial session
      getInitialSession();

      return () => {
        console.log('AuthProvider: Cleaning up auth subscription');
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('AuthProvider: Error setting up auth:', error);
      setLoading(false);
    }
  }, []);

  // Simplified auth functions
  const handleSignUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error };
    } catch (error) {
      console.error('AuthProvider: Sign up error:', error);
      return { error };
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error('AuthProvider: Sign in error:', error);
      return { error };
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      return { error };
    } catch (error) {
      console.error('AuthProvider: Google sign in error:', error);
      return { error };
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('AuthProvider: Signing out');
      await supabase.auth.signOut();
    } catch (error) {
      console.error('AuthProvider: Error signing out:', error);
    }
  };

  const handleResendVerification = async (userEmail?: string) => {
    try {
      const email = userEmail || user?.email;
      if (!email) return { error: 'No email provided' };
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      return { error };
    } catch (error) {
      console.error('AuthProvider: Resend verification error:', error);
      return { error };
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isEmailVerified,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInWithGoogle: handleSignInWithGoogle,
    signOut: handleSignOut,
    resendVerification: handleResendVerification,
  };

  console.log('AuthProvider: Providing context value', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading,
    userEmail: user?.email
  });

  try {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  } catch (error) {
    console.error('AuthProvider: Error rendering provider:', error);
    throw error;
  }
};
