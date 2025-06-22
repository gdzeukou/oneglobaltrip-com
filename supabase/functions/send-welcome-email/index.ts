

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { Resend } from 'npm:resend@2.0.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface WelcomeEmailRequest {
  name: string
  email: string
  formType: string
  destination?: string
  travelNeeds?: string[]
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestData: WelcomeEmailRequest = await req.json()
    console.log('Sending welcome email to:', requestData)

    // Validate required fields
    if (!requestData.name || !requestData.email || !requestData.formType) {
      throw new Error('Missing required fields: name, email, or formType')
    }

    // Validate API key exists
    const apiKey = Deno.env.get('RESEND_API_KEY')
    if (!apiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Email template based on form type
    let subject = 'Thank you for your inquiry!'
    let htmlContent = ''

    if (requestData.formType.includes('visa')) {
      subject = 'Your Visa Application Has Been Started!'
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">🎉 Your Visa Application Has Been Started!</h1>
          <p>Hi ${requestData.name},</p>
          <p>Thank you for starting your visa application with One Global Trip! We've received your information and our visa experts are ready to help you.</p>
          
          ${requestData.destination ? `<p><strong>Destination:</strong> ${requestData.destination}</p>` : ''}
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">What's Next?</h2>
            <ul>
              <li>Our visa experts will review your application within 24 hours</li>
              <li>We'll contact you to schedule a FREE consultation</li>
              <li>We'll guide you through every step of the visa process</li>
              <li>You pay $0 upfront - we only charge after approval</li>
            </ul>
          </div>
          
          <p>Questions? Simply reply to this email or call us at your convenience.</p>
          
          <p>Best regards,<br>
          <strong>The One Global Trip Team</strong><br>
          Your trusted visa & travel partners</p>
          
          <hr style="margin: 30px 0;">
          <p style="font-size: 12px; color: #666;">
            This email was sent because you submitted a visa application at oneglobaltrip.com
          </p>
        </div>
      `
    } else if (requestData.formType === 'consultation') {
      subject = 'Your Free Travel Consultation Request'
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">✈️ Thank You for Your Travel Consultation Request!</h1>
          <p>Hi ${requestData.name},</p>
          <p>We're excited to help you plan your perfect trip! Our travel experts have received your consultation request.</p>
          
          ${requestData.destination ? `<p><strong>Destination Interest:</strong> ${requestData.destination}</p>` : ''}
          
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">What Happens Next?</h2>
            <ul>
              <li>We'll contact you within 24 hours to schedule your FREE consultation</li>
              <li>Our travel experts will create a personalized itinerary for you</li>
              <li>We'll handle all bookings and arrangements</li>
              <li>Pay nothing upfront - we work on your timeline</li>
            </ul>
          </div>
          
          <p>Get ready for an amazing travel experience!</p>
          
          <p>Best regards,<br>
          <strong>The One Global Trip Team</strong></p>
        </div>
      `
    } else {
      // Default template for other form types
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">Thank You for Contacting One Global Trip!</h1>
          <p>Hi ${requestData.name},</p>
          <p>We've received your inquiry and our team will get back to you within 24 hours.</p>
          
          <p>Thank you for choosing One Global Trip for your travel needs!</p>
          
          <p>Best regards,<br>
          <strong>The One Global Trip Team</strong></p>
        </div>
      `
    }

    console.log('Attempting to send email with Resend...')

    const emailResponse = await resend.emails.send({
      from: 'One Global Trip <hello@oneglobaltrip.com>',
      to: [requestData.email],
      subject: subject,
      html: htmlContent,
    })

    console.log('Email response from Resend:', emailResponse)

    if (emailResponse.error) {
      console.error('Resend API error:', emailResponse.error)
      throw new Error(`Email sending failed: ${emailResponse.error.message || 'Unknown error'}`)
    }

    console.log('Welcome email sent successfully:', emailResponse.data)

    return new Response(JSON.stringify({
      success: true,
      data: emailResponse.data
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    console.error('Error in send-welcome-email function:', error)
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

