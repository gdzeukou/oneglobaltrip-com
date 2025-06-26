
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
      console.log(`Handling send OTP for ${email}, purpose: ${purpose}`);
      const result = await sendOTP(email, purpose);
      console.log('Send OTP result:', result);
      
      if (!result.error) {
        console.log('Setting OTP step state');
        setOTPStep({
          isRequired: true,
          email,
          purpose
        });
      } else {
        console.error('Send OTP failed:', result.error);
      }
      return result;
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      return { error: { message: error.message || 'Failed to send verification code' } };
    }
  };

  const handleVerifyOTP = async (email: string, code: string, purpose: 'signup' | 'signin') => {
    try {
      console.log(`Handling verify OTP for ${email}, purpose: ${purpose}`);
      const result = await verifyOTP(email, code, purpose);
      console.log('Verify OTP result:', result);
      
      if (!result.error) {
        console.log('OTP verified successfully, clearing OTP step');
        setOTPStep(null);
      } else {
        console.error('Verify OTP failed:', result.error);
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

  // Simplified sign-in that only requires email
  const handleSignIn = async (email: string) => {
    return await performSignIn(email);
  };

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    otpStep,
    signUp: performSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    resendVerification: () => performResendVerification(user?.email),
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
    clearOTPStep,
  };

  console.log('AuthContext current state:', { 
    hasUser: !!user, 
    hasSession: !!session, 
    loading, 
    otpStep: otpStep ? `${otpStep.purpose} for ${otpStep.email}` : 'none' 
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
