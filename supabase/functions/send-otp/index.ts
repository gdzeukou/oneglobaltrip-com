
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SendOTPRequest {
  email: string;
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

    const { email, purpose }: SendOTPRequest = await req.json();

    console.log(`Sending email OTP for ${email}, purpose: ${purpose}`);

    // Check rate limit
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
        verification_method: 'email',
        purpose: purpose,
        phone_number: null
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error(`Failed to store OTP code: ${insertError.message}`);
    }

    // Get user's first name for personalization
    let firstName = 'Traveler';
    
    // Try to get first name from profiles table using email lookup
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('id', (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === email)?.id)
      .single();
    
    if (profile?.first_name) {
      firstName = profile.first_name;
    }

    // Send OTP via email using Resend
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    try {
      await resend.emails.send({
        from: "One Global Trip 🌍 <booking@oneglobaltrip.com>",
        to: [email],
        subject: "Your One Global Trip Verification Code",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your One Global Trip Verification Code</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f8fafc;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 32px;">
              
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="color: #1e293b; font-size: 28px; font-weight: 700; margin: 0; line-height: 1.2;">
                  Welcome back to One Global Trip!
                </h1>
              </div>

              <!-- Greeting -->
              <div style="margin-bottom: 32px;">
                <p style="color: #475569; font-size: 16px; line-height: 1.5; margin: 0;">
                  Hi ${firstName},
                </p>
              </div>

              <!-- Main Content -->
              <div style="margin-bottom: 32px;">
                <p style="color: #475569; font-size: 16px; line-height: 1.5; margin: 0 0 24px 0;">
                  Here's your secure login code:
                </p>
                
                <!-- Verification Code -->
                <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 24px; text-align: center; border-radius: 12px; margin: 24px 0; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);">
                  <div style="color: #ffffff; font-size: 36px; font-weight: 700; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                    ${otpCode}
                  </div>
                </div>
                
                <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 16px 0; text-align: center;">
                  This code is valid for the next 10 minutes.
                </p>
              </div>

              <!-- Security Notice -->
              <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 32px;">
                <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                  If you didn't request this login, no worries — just ignore this message.
                </p>
                <p style="color: #475569; font-size: 14px; line-height: 1.5; margin: 0;">
                  If anything feels off, we recommend logging into your account to review activity or update your password as a precaution.
                </p>
              </div>

              <!-- Footer -->
              <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; text-align: center;">
                <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0 0 8px 0;">
                  We're always here to support your next adventure.
                </p>
                <p style="color: #64748b; font-size: 14px; line-height: 1.5; margin: 0 0 16px 0;">
                  — The One Global Trip Team
                </p>
                <a href="https://oneglobaltrip.com" style="color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 500;">
                  🌍 https://oneglobaltrip.com
                </a>
              </div>

            </div>
          </body>
          </html>
        `,
      });
      console.log(`Email sent successfully to ${email}`);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      throw new Error('Failed to send verification email');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent via email',
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
