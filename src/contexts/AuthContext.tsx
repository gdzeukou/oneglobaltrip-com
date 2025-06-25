
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './auth/types';
import { useAuthState } from './auth/useAuthState';
import {
  sendOTP,
  verifyOTP,
  performSignUp,
  performSignIn,
  performSignOut,
  performResendVerification
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
    isEmailVerified,
    otpStep,
    setOTPStep
  } = useAuthState();

  const handleSendOTP = async (email: string, purpose: 'signup' | 'signin') => {
    try {
      const result = await sendOTP(email, purpose);
      if (!result.error) {
        setOTPStep({
          isRequired: true,
          email,
          purpose
        });
      }
      return result;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return { error: { message: error.message || 'Failed to send verification code' } };
    }
  };

  const handleVerifyOTP = async (email: string, code: string, purpose: 'signup' | 'signin') => {
    try {
      const result = await verifyOTP(email, code, purpose);
      if (!result.error) {
        setOTPStep(null);
      }
      return result;
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      return { error: { message: error.message || 'Verification failed' } };
    }
  };

  const clearOTPStep = () => {
    console.log('Clearing OTP step');
    setOTPStep(null);
    localStorage.removeItem('pendingSignup');
    localStorage.removeItem('pendingSignin');
  };

  const handleSignOut = async () => {
    try {
      await performSignOut();
      setOTPStep(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    otpStep,
    signUp: performSignUp,
    signIn: performSignIn,
    signOut: handleSignOut,
    resendVerification: () => performResendVerification(user?.email),
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
    clearOTPStep,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
