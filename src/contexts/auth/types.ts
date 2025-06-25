
import { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isEmailVerified: boolean;
  otpStep: {
    isRequired: boolean;
    email: string;
    purpose: 'signup' | 'signin';
  } | null;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendVerification: () => Promise<{ error: any }>;
  sendOTP: (email: string, purpose: 'signup' | 'signin') => Promise<{ error: any }>;
  verifyOTP: (email: string, code: string, purpose: 'signup' | 'signin') => Promise<{ error: any }>;
  clearOTPStep: () => void;
}

export interface OTPStepState {
  isRequired: boolean;
  email: string;
  purpose: 'signup' | 'signin';
}
