
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
              emailRedirectTo: `${window.location.origin}/dashboard`,
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
        // For signin, we need to create a proper session
        console.log('Completing signin after OTP verification');
        
        // Use signInWithOtp to create a proper session
        const { data: authData, error: signinError } = await supabase.auth.signInWithOtp({
          email: email,
          type: 'email'
        });
        
        if (signinError) {
          console.error('Signin error after OTP:', signinError);
          // If that doesn't work, try alternative approach
          // Since we've verified the OTP, we can try to get existing user session
          const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            console.error('Session retrieval error:', sessionError);
            return { error: { message: 'Failed to establish session after verification' } };
          }
          
          if (!sessionData.session) {
            // Last resort: force a session refresh
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
            if (refreshError) {
              console.error('Session refresh error:', refreshError);
              return { error: { message: 'Unable to establish user session' } };
            }
          }
        } else {
          console.log('Signin session created successfully');
        }
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
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });
    return { error };
  } catch (error) {
    return { error: { message: 'Failed to resend verification email' } };
  }
};
