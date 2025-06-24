
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

    // Find the OTP code
    const { data: otpData, error: fetchError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('user_email', email)
      .eq('code', code)
      .eq('purpose', purpose)
      .eq('is_used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpData) {
      console.log(`Invalid or expired OTP for ${email}: ${fetchError?.message}`);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired verification code' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if max attempts exceeded
    if (otpData.attempts >= otpData.max_attempts) {
      console.log(`Max attempts exceeded for ${email}`);
      return new Response(
        JSON.stringify({ error: 'Maximum verification attempts exceeded' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Mark code as used and verified
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({
        is_used: true,
        verified_at: new Date().toISOString(),
        attempts: otpData.attempts + 1
      })
      .eq('id', otpData.id);

    if (updateError) {
      console.error('Update error:', updateError);
      throw new Error(`Failed to update OTP code: ${updateError.message}`);
    }

    // Clean up old codes for this email
    const { error: cleanupError } = await supabase
      .from('otp_codes')
      .delete()
      .eq('user_email', email)
      .neq('id', otpData.id);

    if (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }

    console.log(`OTP verification successful for ${email}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Verification successful',
        verificationMethod: otpData.verification_method
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );

  } catch (error: any) {
    console.error("Error in verify-otp function:", error);
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
