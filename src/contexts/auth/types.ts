
import { User, Session } from '@supabase/supabase-js';

export interface OTPStep {
  isRequired: boolean;
  email: string;
  purpose: 'signup' | 'signin';
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  otpStep: OTPStep | null;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<{ error: any }>;
  sendOTP: (email: string, purpose: 'signup' | 'signin') => Promise<{ error: any }>;
  verifyOTP: (email: string, code: string, purpose: 'signup' | 'signin') => Promise<{ error: any }>;
  clearOTPStep: () => void;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithFacebook: () => Promise<{ error: any }>;
}
