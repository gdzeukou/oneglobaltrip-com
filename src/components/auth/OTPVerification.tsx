
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Smartphone, ArrowLeft, RefreshCw } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  purpose: 'signup' | 'signin';
  method: 'email' | 'sms';
  phoneNumber?: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const OTPVerification = ({ 
  email, 
  purpose, 
  method, 
  phoneNumber, 
  onVerificationSuccess, 
  onBack 
}: OTPVerificationProps) => {
  const { verifyOTP, resendOTP } = useAuth();
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const { error } = await verifyOTP(email, otp, purpose);
      
      if (error) {
        setError(error.message);
      } else {
        onVerificationSuccess();
      }
    } catch (error: any) {
      setError(error.message || 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');

    try {
      const { error } = await resendOTP(email, method, purpose, phoneNumber);
      
      if (error) {
        setError(error.message);
      } else {
        setTimeLeft(600); // Reset timer
        setOtp(''); // Clear current OTP
      }
    } catch (error: any) {
      setError(error.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {method === 'email' ? (
              <Mail className="h-6 w-6 text-blue-600" />
            ) : (
              <Smartphone className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Enter Verification Code
          </CardTitle>
          <p className="text-gray-600">
            We've sent a 6-digit code to {method === 'email' ? email : phoneNumber}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                onComplete={handleVerify}
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
              <p className="text-sm text-gray-600">
                Code expires in <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
              </p>
            </div>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying || otp.length !== 6}
              className="w-full"
            >
              {isVerifying ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResending || timeLeft > 540} // Allow resend after 1 minute
                className="flex items-center gap-2"
              >
                {isResending ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Resend Code
              </Button>
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-xs text-gray-500">
              Having trouble? Make sure to check your spam folder or contact our One Global Trip support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
