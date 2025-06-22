
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MarketingEmailRequest {
  recipients: string[];
  subject: string;
  content: string;
  campaignName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipients, subject, content, campaignName }: MarketingEmailRequest = await req.json();

    console.log('Sending marketing email to:', recipients.length, 'recipients');

    const emailPromises = recipients.map(async (email) => {
      try {
        const emailResponse = await resend.emails.send({
          from: "One Global Trip <hello@oneglobaltrip.com>",
          to: [email],
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              ${content}
              
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
              
              <div style="text-align: center; margin-top: 20px;">
                <p style="font-size: 12px; color: #666;">
                  <strong>One Global Trip LLC</strong><br>
                  Your passport to easy visas & unforgettable journeys 🌍✈️
                </p>
                <p style="font-size: 10px; color: #999;">
                  <a href="#" style="color: #999;">Unsubscribe</a> | 
                  <a href="#" style="color: #999;">Update Preferences</a>
                </p>
              </div>
            </div>
          `,
        });

        return { email, success: true, response: emailResponse };
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        return { email, success: false, error: error.message };
      }
    });

    const results = await Promise.all(emailPromises);
    
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`Marketing email campaign completed: ${successful} sent, ${failed} failed`);

    return new Response(JSON.stringify({
      campaignName,
      totalRecipients: recipients.length,
      successful,
      failed,
      results
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-marketing-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
