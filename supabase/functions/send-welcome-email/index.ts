
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  name: string;
  email: string;
  formType: string;
  destination?: string;
  travelNeeds?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, formType, destination, travelNeeds }: WelcomeEmailRequest = await req.json();

    console.log('Sending welcome email to:', { name, email, formType });

    // Extract first name from full name
    const firstName = name.split(' ')[0];

    // Create travel needs list for email
    const travelNeedsList = travelNeeds && travelNeeds.length > 0 
      ? travelNeeds.map(need => `• ${need}`).join('\n')
      : '';

    const emailResponse = await resend.emails.send({
      from: "One Global Trip <hello@oneglobaltrip.com>",
      to: [email],
      subject: "✈️ We've Got Your Trip Covered — Next Steps Inside!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #2563eb;">Hi ${firstName},</h2>
          
          <p>Thank you for reaching out to <strong>One Global Trip LLC</strong>—we're thrilled to help you plan your next adventure (and make the visa process a breeze).</p>
          
          <h3 style="color: #2563eb;">🚀 What happens now?</h3>
          
          <p>A dedicated Travel & Visa Specialist will review your request and get in touch within the next <strong>24 business hours</strong>. If you'd rather lock in a time right away, feel free to <strong>book a 15-minute call on our Calendly</strong>:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://calendly.com/oneglobaltrip/intro" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">📅 Pick My Call Slot</a>
          </div>
          
          <h3 style="color: #2563eb;">✨ A quick look at what we can do for you</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f8fafc;">
                <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Popular Service</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Perfect For</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #e2e8f0;">Why Travelers Love It</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Schengen Full Pack</strong></td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Europe vacations & business trips</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">End-to-end visa guidance, priority appointments, 24/7 AI chat</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>UK Visa Pass</strong></td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">London getaways, study & work visits</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Form fill, document check, express biometrics</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Brazil e-Visa Fast-Track</strong></td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Rio carnivals & Amazon tours</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Paperwork simplified + insider tips for 2025 rule changes</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Custom Trip Packages</strong></td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Honeymoons, family reunions, solo escapes</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">"Pay $0 upfront" planning—flights, hotels, tours bundled</td>
              </tr>
              <tr>
                <td style="padding: 12px; border: 1px solid #e2e8f0;"><strong>Travel Medical Insurance</strong></td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">All international travelers</td>
                <td style="padding: 12px; border: 1px solid #e2e8f0;">Low-cost coverage accepted by embassies & airlines</td>
              </tr>
            </tbody>
          </table>
          
          ${destination ? `<p><strong>Your destination:</strong> ${destination}</p>` : ''}
          ${travelNeedsList ? `<p><strong>Your travel needs:</strong><br>${travelNeedsList}</p>` : ''}
          
          <h3 style="color: #2563eb;">📞 How to stay in touch</h3>
          
          <ul>
            <li><strong>Reply to this email</strong> – we answer lightning-fast.</li>
            <li><strong>WhatsApp/Text</strong> – +1 (555) 555-0130 for real-time chat.</li>
            <li><strong>Phone</strong> – Call us at +1 (555) 555-0100 (Mon-Fri, 9 AM–6 PM CT).</li>
            <li><strong>Instagram & TikTok</strong> – @OneGlobalTrip for travel hacks and flash deals.</li>
          </ul>
          
          <div style="background-color: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0;"><strong>💡 Pro tip:</strong> New clients who book a call this week get <strong>$25 off</strong> any visa service or <strong>free airport lounge access</strong> on select flight packages.</p>
          </div>
          
          <p>We're here to make every step—form filling, flights, hotels, even last-minute seat upgrades—seamless and stress-free. Expect a friendly hello from your specialist soon!</p>
          
          <p>Safe travels,<br>
          <strong>The One Global Trip Team</strong><br>
          Your passport to easy visas & unforgettable journeys 🌍✈️</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
          
          <p style="font-size: 12px; color: #666; text-align: center;"><em>If you submitted this request by mistake or no longer need assistance, simply reply "Cancel" and we'll remove your info.</em></p>
        </div>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
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
