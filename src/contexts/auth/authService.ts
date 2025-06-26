
import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/validation';

export const performSignInWithGoogle = async () => {
  try {
    console.log('Starting Google OAuth sign-in process');
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error('Google OAuth error:', error);
      return { error };
    }

    console.log('Google OAuth initiated successfully');
    return { data, error: null };
  } catch (error: any) {
    console.error('Google OAuth error:', error);
    return { error: { message: error.message || 'Failed to sign in with Google' } };
  }
};

export const performSignUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  if (password.length < 8) {
    return { error: { message: 'Password must be at least 8 characters long' } };
  }

  try {
    console.log('Starting signup process for:', email);
    
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
      return { error };
    }

    console.log('Signup successful:', data);
    return { data, error: null };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: { message: error.message || 'An unexpected error occurred during sign up' } };
  }
};

export const performSignIn = async (email: string, password: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  try {
    console.log('Starting signin process for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password
    });

    if (error) {
      console.error('Signin error:', error);
      return { error };
    }

    console.log('Signin successful:', data);
    return { data, error: null };
  } catch (error: any) {
    console.error('Signin error:', error);
    return { error: { message: error.message || 'An unexpected error occurred during sign in' } };
  }
};

export const performSignOut = async () => {
  try {
    console.log('Signing out user');
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export const performResendVerification = async (userEmail?: string) => {
  if (!userEmail) {
    return { error: { message: 'No user email found' } };
  }

  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: userEmail,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { error };
  } catch (error) {
    return { error: { message: 'Failed to resend verification email' } };
  }
};
