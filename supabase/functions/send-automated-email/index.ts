
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  template_id: string;
  lead_id: string;
  variables?: Record<string, string>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { template_id, lead_id, variables = {} }: EmailRequest = await req.json();

    // Fetch email template
    const { data: template, error: templateError } = await supabaseClient
      .from('email_templates')
      .select('*')
      .eq('id', template_id)
      .single();

    if (templateError) throw templateError;

    // Fetch lead data
    const { data: lead, error: leadError } = await supabaseClient
      .from('form_submissions')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (leadError) throw leadError;

    // Replace template variables
    let emailContent = template.content;
    let emailSubject = template.subject;

    const templateVars = {
      name: lead.name,
      email: lead.email,
      visa_country: lead.destination || 'Your Destination',
      travel_date: lead.travel_date || 'TBD',
      nationality: lead.nationality || 'Unknown',
      ...variables
    };

    // Replace variables in content and subject
    Object.entries(templateVars).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      emailContent = emailContent.replace(regex, value);
      emailSubject = emailSubject.replace(regex, value);
    });

    // Generate tracking pixel URL
    const trackingId = crypto.randomUUID();
    const trackingPixelUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/email-tracking?id=${trackingId}`;
    
    // Add tracking pixel to email content
    emailContent += `<img src="${trackingPixelUrl}" width="1" height="1" style="display:none;" />`;

    // Create email tracking record
    const { error: trackingError } = await supabaseClient
      .from('email_tracking')
      .insert([{
        lead_id,
        email_template_id: template_id,
        tracking_pixel_url: trackingPixelUrl
      }]);

    if (trackingError) {
      console.error('Error creating tracking record:', trackingError);
    }

    // TODO: Send actual email using Resend or other service
    // For now, we'll just log the email content
    console.log('Email would be sent:', {
      to: lead.email,
      subject: emailSubject,
      content: emailContent
    });

    // Update lead status if this is first contact
    if (lead.lead_status === 'not_contacted') {
      await supabaseClient
        .from('form_submissions')
        .update({ 
          lead_status: 'contacted',
          contacted_at: new Date().toISOString()
        })
        .eq('id', lead_id);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        tracking_id: trackingId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in send-automated-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
};

serve(handler);
