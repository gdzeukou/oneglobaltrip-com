
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
  method: 'email' | 'sms';
  purpose: 'signup' | 'signin';
  phoneNumber?: string;
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

    const { email, method, purpose, phoneNumber }: SendOTPRequest = await req.json();

    console.log(`Sending OTP for ${email}, method: ${method}, purpose: ${purpose}`);

    // Check rate limit - fix the logic
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .rpc('check_otp_rate_limit', { _email: email });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      throw new Error('Failed to check rate limit');
    }

    if (!rateLimitData) {
      console.log(`Rate limit exceeded for ${email}`);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait before requesting another code.' }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Generate OTP code
    const { data: otpCode, error: codeError } = await supabase
      .rpc('generate_otp_code');

    if (codeError || !otpCode) {
      console.error('Code generation error:', codeError);
      throw new Error('Failed to generate OTP code');
    }

    console.log(`Generated OTP code: ${otpCode} for ${email}`);

    // Clean up old codes for this email and purpose
    const { error: cleanupError } = await supabase
      .from('otp_codes')
      .delete()
      .eq('user_email', email)
      .eq('purpose', purpose)
      .eq('is_used', false);

    if (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    // Store OTP code in database
    const { error: insertError } = await supabase
      .from('otp_codes')
      .insert({
        user_email: email,
        code: otpCode,
        verification_method: method,
        purpose: purpose,
        phone_number: phoneNumber || null
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(`Failed to store OTP code: ${insertError.message}`);
    }

    if (method === 'email') {
      // Send OTP via email using Resend
      const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
      
      const actionText = purpose === 'signup' ? 'complete your account registration' : 'sign in to your account';
      
      try {
        await resend.emails.send({
          from: "Travel App <onboarding@resend.dev>",
          to: [email],
          subject: `Your verification code: ${otpCode}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Verification Code</h2>
              <p>Your verification code to ${actionText} is:</p>
              <div style="background: #f0f0f0; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px;">
                <h1 style="color: #2563eb; margin: 0; font-size: 36px; letter-spacing: 8px;">${otpCode}</h1>
              </div>
              <p>This code will expire in 10 minutes.</p>
              <p>If you didn't request this code, please ignore this email.</p>
              <p>Best regards,<br>Travel App Team</p>
            </div>
          `,
        });
        console.log(`Email sent successfully to ${email}`);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        throw new Error('Failed to send verification email');
      }
    } else if (method === 'sms') {
      // TODO: Implement SMS sending with Twilio or similar service
      console.log(`SMS OTP would be sent to ${phoneNumber}: ${otpCode}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `OTP sent via ${method}`,
        expiresIn: 600 // 10 minutes in seconds
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );

  } catch (error: any) {
    console.error("Error in send-otp function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
};

serve(handler);
