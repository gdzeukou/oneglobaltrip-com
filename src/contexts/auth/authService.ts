import { supabase } from '@/integrations/supabase/client';
import { validateEmail } from '@/utils/validation';

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

    if (data?.success) {
      console.log('OTP verification successful');
      
      if (purpose === 'signup') {
        // For signup, create the user account after OTP verification
        const pendingSignup = localStorage.getItem('pendingSignup');
        if (pendingSignup) {
          const signupData = JSON.parse(pendingSignup);
          console.log('Creating user account after OTP verification');
          
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: signupData.email,
            password: signupData.password,
            options: {
              emailRedirectTo: `${window.location.origin}/`,
              data: {
                first_name: signupData.firstName,
                last_name: signupData.lastName
              }
            }
          });

          localStorage.removeItem('pendingSignup');
          
          if (authError) {
            console.error('Signup error after OTP:', authError);
            return { error: authError };
          }

          console.log('User account created successfully');
        }
      } else {
        // For signin, we need to create a session without using Supabase's OTP verification
        // Since we've already verified the OTP through our custom system, we'll use a passwordless approach
        console.log('Completing signin after OTP verification');
        
        // First, check if user exists by trying to get user data
        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(email);
        
        if (userError) {
          console.error('Error checking user existence:', userError);
          // If we can't use admin.getUserById, try alternative approach
          try {
            // Generate a magic link for signin
            const { error: magicLinkError } = await supabase.auth.signInWithOtp({
              email,
              options: {
                emailRedirectTo: `${window.location.origin}/`
              }
            });
            
            if (magicLinkError) {
              console.error('Magic link signin error:', magicLinkError);
              return { error: { message: 'Authentication failed. Please try again.' } };
            }
            
            console.log('Magic link sent for signin');
          } catch (fallbackError) {
            console.error('Fallback signin error:', fallbackError);
            return { error: { message: 'Authentication failed. Please try again.' } };
          }
        } else if (userData?.user) {
          console.log('User found, creating session');
          // Generate a magic link for signin
          const { error: magicLinkError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/`
            }
          });
          
          if (magicLinkError) {
            console.error('Magic link signin error:', magicLinkError);
            return { error: { message: 'Authentication failed. Please try again.' } };
          }
          
          console.log('Magic link sent for signin');
        } else {
          console.error('User not found for signin');
          return { error: { message: 'User not found. Please sign up first.' } };
        }
        
        // Since we've verified the OTP, we can consider the user authenticated
        // The session will be established through the magic link flow
        console.log('Signin process initiated successfully');
      }
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
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    return { error };
  } catch (error) {
    return { error: { message: 'Failed to resend verification email' } };
  }
};
