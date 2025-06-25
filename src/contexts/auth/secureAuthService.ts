
import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/enhancedSecurityUtils';

// Secure authentication service that doesn't store passwords in localStorage
export const sendOTP = async (email: string, purpose: 'signup' | 'signin') => {
  try {
    console.log(`Sending secure OTP to ${email} for ${purpose}`);
    
    const { data, error } = await supabase.functions.invoke('send-otp', {
      body: { email, purpose }
    });

    if (error) {
      console.error('Send OTP error:', error);
      throw error;
    }

    return { error: data?.error ? { message: data.error } : null };
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return { error: { message: error.message || 'Failed to send verification code' } };
  }
};

export const verifyOTP = async (email: string, code: string, purpose: 'signup' | 'signin') => {
  try {
    console.log(`Verifying OTP for ${email}, purpose: ${purpose}`);
    
    const { data, error } = await supabase.functions.invoke('verify-otp', {
      body: { email, code, purpose }
    });

    if (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }

    return { error: data?.error ? { message: data.error } : null };
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return { error: { message: error.message || 'Verification failed' } };
  }
};

// Secure signup that uses server-side credential handling
export const performSecureSignUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  if (password.length < 8) {
    return { error: { message: 'Password must be at least 8 characters long' } };
  }

  // Check password complexity
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return { error: { message: 'Password must contain uppercase, lowercase, numbers, and special characters' } };
  }

  try {
    console.log('Starting secure signup process for:', email);
    
    // Create user account immediately with secure session
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName?.trim(),
          last_name: lastName?.trim()
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      return { error };
    }

    console.log('User account created successfully');
    return { error: null, data };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: { message: 'An unexpected error occurred during sign up' } };
  }
};

// Secure signin with session-based authentication
export const performSecureSignIn = async (email: string, password: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  if (!password) {
    return { error: { message: 'Password is required' } };
  }

  try {
    console.log('Starting secure signin process for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password
    });

    if (error) {
      console.error('Signin error:', error);
      return { error };
    }

    console.log('User signed in successfully');
    return { error: null, data };
  } catch (error: any) {
    console.error('Signin error:', error);
    return { error: { message: 'An unexpected error occurred during sign in' } };
  }
};

export const performSignOut = async () => {
  try {
    console.log('Signing out user');
    await supabase.auth.signOut();
    
    // Clear any sensitive data from localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('pending') || key.includes('auth') || key.includes('session')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
