
import React, { createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useAuthState } from './auth/useAuthState';
import {
  performSignUp,
  performSignIn,
  performSignOut,
  performResendVerification,
  performSignInWithGoogle
} from './auth/authService';

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
  
  const {
    user,
    session,
    loading,
    isEmailVerified
  } = useAuthState();

  console.log('AuthProvider: Auth state', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading,
    userEmail: user?.email
  });

  const handleSignOut = async () => {
    try {
      console.log('AuthProvider: Signing out');
      await performSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    isEmailVerified,
    signUp: performSignUp,
    signIn: performSignIn,
    signInWithGoogle: performSignInWithGoogle,
    signOut: handleSignOut,
    resendVerification: () => performResendVerification(user?.email),
  };

  console.log('AuthProvider: Providing context value');

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
