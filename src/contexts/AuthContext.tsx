
import React, { createContext, useContext } from 'react';
import { AuthContextType } from './auth/types';
import { useAuthState } from './auth/useAuthState';
import {
  sendOTP,
  verifyOTP,
  performSignUp,
  performSignIn,
  performSignOut,
  performResendVerification,
  signInWithProvider
} from './auth/authService';
import { useProfileCheck } from '@/hooks/useProfileCheck';

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
      return { error: { message: error.message || 'Failed to send verification code' } };
    }
  };

  const handleVerifyOTP = async (email: string, code: string, purpose: 'signup' | 'signin') => {
    try {
      const result = await verifyOTP(email, code, purpose);
      
      const response = result as { error?: any };
      if (!response.error) {
        setOTPStep(null);
        return { error: null };
      } else {
        return { error: response.error };
      }
    } catch (error: any) {
      return { error: { message: error.message || 'Verification failed' } };
    }
  };

  const clearOTPStep = () => {
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

  const handleSignUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      console.log('AuthContext: Starting signup for:', email);
      const result = await performSignUp(email, password, firstName, lastName);
      
      if (!result.error) {
        console.log('AuthContext: Signup OTP sent, setting OTP step');
        setOTPStep({
          isRequired: true,
          email,
          purpose: 'signup'
        });
      }
      
      return result;
    } catch (error: any) {
      console.error('AuthContext: Signup error:', error);
      return { error: { message: error.message || 'Signup failed' } };
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'facebook') => {
    try {
      console.log(`AuthContext: Starting ${provider} sign-in`);
      const result = await signInWithProvider(provider);
      
      if (result.error) {
        console.error(`AuthContext: ${provider} sign-in error:`, result.error);
        return { error: result.error };
      } else {
        console.log(`AuthContext: ${provider} sign-in initiated, user will be redirected`);
        return { error: null };
      }
    } catch (error: any) {
      console.error(`AuthContext: ${provider} sign-in unexpected error:`, error);
      return { error: { message: error.message || `An unexpected error occurred during ${provider} sign-in` } };
    }
  };

  const { data: profileCheck } = useProfileCheck();

  const value = {
    user,
    session,
    loading,
    isEmailVerified,
    otpStep,
    needsProfile: user && !loading && !profileCheck?.hasProfile,
    signUp: handleSignUp,
    signIn: performSignIn, // This will be handled by sendOTP
    signOut: handleSignOut,
    resendVerification: () => performResendVerification(user?.email),
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
    clearOTPStep,
    signInWithGoogle: () => handleSocialAuth('google'),
    signInWithFacebook: () => handleSocialAuth('facebook'),
  };

  // Reduce verbose logging for better performance

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
