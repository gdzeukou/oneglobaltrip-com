

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyOTPRequest {
  email: string;
  code: string;
  purpose: 'signup' | 'signin';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { email, code, purpose }: VerifyOTPRequest = await req.json();

    console.log(`Verifying OTP for ${email}, purpose: ${purpose}, code: ${code}`);

    // Verify the OTP code
    const { data: otpData, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('user_email', email)
      .eq('code', code)
      .eq('purpose', purpose)
      .eq('is_used', false)
      .gte('expires_at', new Date().toISOString())
      .single();

    if (otpError || !otpData) {
      console.error('OTP verification failed:', otpError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired verification code' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark OTP as used
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ is_used: true })
      .eq('id', otpData.id);

    if (updateError) {
      console.error('Error marking OTP as used:', updateError);
    }

    console.log('OTP verification successful for', email);

    // For both signup and signin, we'll use the same approach:
    // Generate a magic link that will redirect to dashboard after authentication
    console.log('Generating magic link for user authentication');
    
    const { data: magicLinkData, error: magicLinkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}.supabase.co/auth/v1/callback?next=${encodeURIComponent('/dashboard')}`
      }
    });

    if (magicLinkError) {
      console.log('Magic link generation failed, attempting to create user:', magicLinkError.message);
      
      // If magic link fails, the user might not exist - create them
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true, // Mark email as confirmed since they verified OTP
        user_metadata: {
          email_verified: true,
          signup_method: 'otp'
        }
      });

      if (createError) {
        console.error('Error creating user:', createError);
        
        // If user creation fails because user already exists, try magic link again
        if (createError.message.includes('already been registered') || createError.message.includes('email_exists')) {
          console.log('User already exists, retrying magic link generation');
          const { data: retryMagicLinkData, error: retryMagicLinkError } = await supabase.auth.admin.generateLink({
            type: 'magiclink',
            email: email,
            options: {
              redirectTo: `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}.supabase.co/auth/v1/callback?next=${encodeURIComponent('/dashboard')}`
            }
          });

          if (retryMagicLinkError) {
            console.error('Retry magic link generation failed:', retryMagicLinkError);
            return new Response(
              JSON.stringify({ error: 'Failed to authenticate user' }),
              { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
            );
          }

          console.log('Magic link generated successfully for existing user');
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'OTP verified successfully',
              authData: {
                actionLink: retryMagicLinkData.properties.action_link
              }
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        } else {
          return new Response(
            JSON.stringify({ error: 'Failed to create user account' }),
            { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
          );
        }
      }

      console.log('User created successfully, generating magic link for new user');

      // Generate a magic link for the new user
      const { data: newUserMagicLinkData, error: newUserMagicLinkError } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: email,
        options: {
          redirectTo: `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '')}.supabase.co/auth/v1/callback?next=${encodeURIComponent('/dashboard')}`
        }
      });

      if (newUserMagicLinkError) {
        console.error('Error generating magic link for new user:', newUserMagicLinkError);
        return new Response(
          JSON.stringify({ error: 'Failed to authenticate user' }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log('Magic link generated successfully for new user');
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Account created and OTP verified successfully',
          authData: {
            actionLink: newUserMagicLinkData.properties.action_link
          }
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } else {
      console.log('Magic link generated successfully for existing user');
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'OTP verified successfully',
          authData: {
            actionLink: magicLinkData.properties.action_link
          }
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

  } catch (error: any) {
    console.error("Error in verify-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

