
import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/validation';

export const performSimpleSignUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  if (password.length < 8) {
    return { error: { message: 'Password must be at least 8 characters long' } };
  }

  try {
    console.log('Starting simple signup process for:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          first_name: firstName?.trim(),
          last_name: lastName?.trim()
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      
      // Provide user-friendly error messages
      if (error.message.includes('already registered')) {
        return { error: { message: 'An account with this email already exists. Please sign in instead.' } };
      }
      if (error.message.includes('invalid email')) {
        return { error: { message: 'Please enter a valid email address.' } };
      }
      if (error.message.includes('weak password')) {
        return { error: { message: 'Password is too weak. Please use at least 8 characters with letters and numbers.' } };
      }
      
      return { error };
    }

    console.log('User signup successful:', data.user?.email);
    return { error: null };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: { message: 'An unexpected error occurred during sign up. Please try again.' } };
  }
};

export const performSimpleSignIn = async (email: string, password: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  if (!password) {
    return { error: { message: 'Password is required' } };
  }

  try {
    console.log('Starting simple signin process for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password
    });

    if (error) {
      console.error('Signin error:', error);
      
      // Provide user-friendly error messages
      if (error.message.includes('Invalid login credentials')) {
        return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
      }
      if (error.message.includes('Email not confirmed')) {
        return { error: { message: 'Please check your email and click the confirmation link before signing in.' } };
      }
      if (error.message.includes('too many requests')) {
        return { error: { message: 'Too many login attempts. Please wait a few minutes before trying again.' } };
      }
      
      return { error };
    }

    console.log('User signin successful:', data.user?.email);
    return { error: null };
  } catch (error: any) {
    console.error('Signin error:', error);
    return { error: { message: 'An unexpected error occurred during sign in. Please try again.' } };
  }
};

export const performSignOut = async () => {
  try {
    console.log('Signing out user');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      return { error };
    }
    return { error: null };
  } catch (error: any) {
    console.error('Error signing out:', error);
    return { error: { message: 'Failed to sign out. Please try again.' } };
  }
};
