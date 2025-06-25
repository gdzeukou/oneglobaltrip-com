
import React, { createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useSimpleAuthState } from './auth/useSimpleAuthState';
import {
  performSimpleSignUp,
  performSimpleSignIn,
  performSignOut
} from './auth/simpleAuthService';

interface SimpleAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const SimpleAuthContext = createContext<SimpleAuthContextType>({} as SimpleAuthContextType);

export const useSimpleAuth = () => {
  const context = useContext(SimpleAuthContext);
  if (!context) {
    throw new Error('useSimpleAuth must be used within a SimpleAuthProvider');
  }
  return context;
};

export const SimpleAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    session,
    loading,
    isEmailVerified
  } = useSimpleAuthState();

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    signUp: performSimpleSignUp,
    signIn: performSimpleSignIn,
    signOut: performSignOut
  };

  return <SimpleAuthContext.Provider value={value}>{children}</SimpleAuthContext.Provider>;
};
