
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Mail, Smartphone, RefreshCw, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface OTPVerificationProps {
  email: string;
  purpose: 'signup' | 'signin';
  method: 'email' | 'sms';
  phoneNumber?: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  purpose,
  method,
  phoneNumber,
  onVerificationSuccess,
  onBack
}) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: {
          email,
          code,
          purpose
        }
      });

      if (error) throw error;

      if (data?.success) {
        setSuccess('Verification successful!');
        setTimeout(() => {
          onVerificationSuccess();
        }, 1000);
      } else {
        setError(data?.error || 'Verification failed');
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    setIsResending(true);
    setError('');
    setSuccess('');

    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: {
          email,
          method,
          purpose,
          phoneNumber
        }
      });

      if (error) throw error;

      if (data?.success) {
        setSuccess('New verification code sent!');
        setResendCooldown(60);
        setTimeLeft(600);
        setCode('');
      } else {
        setError(data?.error || 'Failed to resend code');
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      setError(error.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  const actionText = purpose === 'signup' ? 'complete your registration' : 'sign in';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              {method === 'email' ? (
                <Mail className="h-12 w-12 text-blue-600" />
              ) : (
                <Smartphone className="h-12 w-12 text-blue-600" />
              )}
              <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-1">
                <Clock className="h-3 w-3 text-white" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Enter Verification Code
          </CardTitle>
          <p className="text-gray-600">
            We've sent a 6-digit code to {method === 'email' ? email : phoneNumber} to {actionText}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => {
                setCode(value);
                setError('');
              }}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              Code expires in: <span className="font-medium text-red-600">{formatTime(timeLeft)}</span>
            </p>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button
              onClick={handleVerify}
              disabled={isVerifying || code.length !== 6}
              className="w-full"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>

            <Button
              onClick={handleResend}
              disabled={isResending || resendCooldown > 0}
              variant="outline"
              className="w-full"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : resendCooldown > 0 ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Resend in {resendCooldown}s
                </>
              ) : (
                <>
                  {method === 'email' ? <Mail className="h-4 w-4 mr-2" /> : <Smartphone className="h-4 w-4 mr-2" />}
                  Resend Code
                </>
              )}
            </Button>

            <Button
              onClick={onBack}
              variant="ghost"
              className="w-full"
            >
              Back to {purpose === 'signup' ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-xs text-gray-500">
              Didn't receive the code? Check your {method === 'email' ? 'spam folder' : 'messages'} or try resending.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
