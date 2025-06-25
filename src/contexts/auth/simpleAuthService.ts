
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
        emailRedirectTo: `${window.location.origin}/`,
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

    console.log('User signup successful:', data.user?.email);
    return { error: null };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: { message: 'An unexpected error occurred during sign up' } };
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
      return { error };
    }

    console.log('User signin successful:', data.user?.email);
    return { error: null };
  } catch (error: any) {
    console.error('Signin error:', error);
    return { error: { message: 'An unexpected error occurred during sign in' } };
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
    return { error: { message: 'Failed to sign out' } };
  }
};
