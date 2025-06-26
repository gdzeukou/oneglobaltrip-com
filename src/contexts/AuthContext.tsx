
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './auth/types';
import { useAuthState } from './auth/useAuthState';
import {
  performSignUp,
  performSignIn,
  performSignOut,
  performResendVerification,
  performSignInWithGoogle
} from './auth/authService';

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    user,
    session,
    loading,
    isEmailVerified
  } = useAuthState();

  const handleSignOut = async () => {
    try {
      await performSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
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

  console.log('AuthContext current state:', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
