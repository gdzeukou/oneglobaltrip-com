
import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/validation';
import { Provider } from '@supabase/supabase-js';

// Social Authentication
export const signInWithProvider = async (provider: Provider) => {
  try {
    console.log(`Initiating ${provider} OAuth sign-in`);
    
    const redirectUrl = `${window.location.origin}/auth/callback`;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      console.error(`${provider} OAuth error:`, error);
      return { error: { message: error.message } };
    }

    console.log(`${provider} OAuth initiated successfully`);
    return { error: null, data };
  } catch (error: any) {
    console.error(`${provider} sign-in error:`, error);
    return { error: { message: error.message || `${provider} sign-in failed` } };
  }
};

export const sendOTP = async (email: string, purpose: 'signup' | 'signin') => {
  try {
    console.log(`Sending email OTP to ${email} for ${purpose}`);
    
    const { data, error } = await supabase.functions.invoke('send-otp', {
      body: {
        email,
        purpose
      }
    });

    if (error) {
      console.error('Send OTP error:', error);
      throw error;
    }

    console.log('OTP send response:', data);
    return { error: data?.error ? { message: data.error } : null };
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return { error: { message: error.message || 'Failed to send verification code' } };
  }
};

export const verifyOTP = async (email: string, code: string, purpose: 'signup' | 'signin') => {
  try {
    console.log(`Verifying OTP for ${email}, purpose: ${purpose}, code: ${code}`);
    
    // First verify the OTP with our backend
    const { data, error } = await supabase.functions.invoke('verify-otp', {
      body: {
        email,
        code,
        purpose
      }
    });

    if (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }

    console.log('OTP verify response:', data);

    if (data?.success && data?.authData?.actionLink) {
      console.log('OTP verification successful, processing magic link authentication');
      
      // Process the magic link directly by navigating to it
      // This will trigger Supabase's authentication flow and redirect to our AuthCallback
      const magicLinkUrl = data.authData.actionLink;
      console.log('Navigating to magic link for authentication:', magicLinkUrl);
      
      // Navigate to the magic link - this will redirect and establish the session
      window.location.href = magicLinkUrl;
      
      // Return success immediately since we're redirecting
      return { error: null };
    }

    return { error: data?.error ? { message: data.error } : null };
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return { error: { message: error.message || 'Verification failed' } };
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
    
    // Store signup data for after OTP verification
    localStorage.setItem('pendingSignup', JSON.stringify({
      email: email.toLowerCase().trim(),
      password,
      firstName: firstName?.trim(),
      lastName: lastName?.trim()
    }));

    // Send OTP
    const result = await sendOTP(email.toLowerCase().trim(), 'signup');
    console.log('Signup OTP result:', result);
    return result;
  } catch (error) {
    console.error('Signup error:', error);
    localStorage.removeItem('pendingSignup');
    return { error: { message: 'An unexpected error occurred during sign up' } };
  }
};

export const performSignIn = async (email: string) => {
  // Validate inputs
  if (!validateEmail(email)) {
    return { error: { message: 'Please enter a valid email address' } };
  }

  try {
    console.log('Starting signin process for:', email);
    
    // Store signin email for after OTP verification
    localStorage.setItem('pendingSignin', JSON.stringify({
      email: email.toLowerCase().trim()
    }));
    
    // Send OTP directly - no password needed for OTP signin
    const result = await sendOTP(email.toLowerCase().trim(), 'signin');
    console.log('Signin OTP result:', result);
    return result;
  } catch (error) {
    console.error('Signin error:', error);
    return { error: { message: 'An unexpected error occurred during sign in' } };
  }
};

export const performSignOut = async () => {
  try {
    console.log('Signing out user');
    await supabase.auth.signOut();
    localStorage.removeItem('pendingSignup');
    localStorage.removeItem('pendingSignin');
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
