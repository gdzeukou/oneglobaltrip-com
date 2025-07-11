import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Send, CheckCircle, XCircle, Clock } from 'lucide-react';

const TestEmailDelivery = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    details?: any;
  } | null>(null);

  const testEmailDelivery = async () => {
    if (!email) {
      setResult({
        success: false,
        message: 'Please enter an email address'
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      console.log('Testing email delivery to:', email);

      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: {
          email,
          purpose: 'signin'
        }
      });

      console.log('Test result:', { data, error });

      if (error) {
        setResult({
          success: false,
          message: `Function invoke error: ${error.message}`,
          details: error
        });
      } else if (data?.error) {
        setResult({
          success: false,
          message: `Email delivery error: ${data.error}`,
          details: data
        });
      } else {
        setResult({
          success: true,
          message: 'OTP email sent successfully! Check your inbox and spam folder.',
          details: data
        });
      }
    } catch (error: any) {
      console.error('Test error:', error);
      setResult({
        success: false,
        message: `Unexpected error: ${error.message}`,
        details: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Email Delivery</h1>
          <p className="text-gray-600">
            Use this page to test if OTP emails are being delivered correctly.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Delivery Test
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Email Address</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="Enter email to test delivery"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button 
              onClick={testEmailDelivery} 
              disabled={isLoading || !email}
              className="w-full flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Sending Test Email...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Test OTP Email
                </>
              )}
            </Button>

            {result && (
              <Alert className={result.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <div className="flex items-start gap-2">
                  {result.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <AlertDescription className={result.success ? 'text-green-800' : 'text-red-800'}>
                      {result.message}
                    </AlertDescription>
                    
                    {result.details && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm font-medium">
                          Technical Details
                        </summary>
                        <pre className="mt-2 text-xs bg-white/50 p-2 rounded border overflow-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Troubleshooting Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <p><strong>If emails are not being delivered:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Check if <code>oneglobaltrip.com</code> is verified in your Resend dashboard</li>
                <li>Verify the <code>RESEND_API_KEY</code> is correctly set in Supabase secrets</li>
                <li>Check the spam/junk folder in your email client</li>
                <li>Try using a different email domain (Gmail, Yahoo, etc.)</li>
                <li>Check the edge function logs in Supabase for detailed error messages</li>
              </ul>
              
              <p className="mt-4"><strong>Next steps if this test passes:</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Test the complete signup/signin flow on the auth page</li>
                <li>Configure Google OAuth credentials in Supabase</li>
                <li>Configure Apple Sign-In if needed</li>
                <li>Update site URLs and redirect URLs in Supabase Auth settings</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestEmailDelivery;