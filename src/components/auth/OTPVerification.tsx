
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, ArrowLeft, RefreshCw } from 'lucide-react';

interface OTPVerificationProps {
  email: string;
  purpose: 'signup' | 'signin';
  onVerificationSuccess: () => void;
  onBack: () => void;
}

const OTPVerification = ({ 
  email, 
  purpose, 
  onVerificationSuccess, 
  onBack 
}: OTPVerificationProps) => {
  const { verifyOTP, sendOTP } = useAuth();
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    console.log('OTP Verification component mounted for:', email, purpose);
    
    // Timer for expiration
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Timer for resend availability (30 seconds)
    const resendTimer = setTimeout(() => {
      setCanResend(true);
    }, 30000);

    // Focus on the first input
    const firstInput = document.querySelector('input[inputmode="numeric"]') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
    }

    return () => {
      clearInterval(timer);
      clearTimeout(resendTimer);
    };
  }, [email, purpose]);

  // Handle paste events for the entire code
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = e.clipboardData?.getData('text');
      if (pastedData && /^\d{6}$/.test(pastedData)) {
        setOtp(pastedData);
        // Auto-verify after a short delay
        setTimeout(() => handleVerify(pastedData), 100);
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleVerify = async (code?: string) => {
    const codeToVerify = code || otp;
    
    if (codeToVerify.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    console.log('Verifying OTP:', codeToVerify, 'for email:', email);
    setIsVerifying(true);
    setError('');

    try {
      const { error } = await verifyOTP(email, codeToVerify, purpose);
      
      if (error) {
        console.error('OTP verification failed:', error);
        if (error.message.includes('expired')) {
          setError('This code has expired. Please request a new one.');
        } else if (error.message.includes('Invalid')) {
          setError('Invalid code. Please check and try again.');
        } else if (error.message.includes('Maximum')) {
          setError('Too many attempts. Please request a new code.');
        } else {
          setError(error.message);
        }
        setOtp(''); // Clear invalid code
      } else {
        console.log('OTP verification successful');
        onVerificationSuccess();
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      setError(error.message || 'Verification failed. Please try again.');
      setOtp(''); // Clear on error
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    console.log('Resending OTP for:', email, purpose);
    setIsResending(true);
    setError('');
    setCanResend(false);

    try {
      const { error } = await sendOTP(email, purpose);
      
      if (error) {
        console.error('Resend OTP failed:', error);
        setError(error.message);
      } else {
        console.log('OTP resent successfully');
        setTimeLeft(600); // Reset timer
        setOtp(''); // Clear current OTP
        
        // Reset resend availability after 30 seconds
        setTimeout(() => {
          setCanResend(true);
        }, 30000);
      }
    } catch (error: any) {
      console.error('Resend OTP error:', error);
      setError(error.message || 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <Card className="max-w-md w-full glass-colorful border-2 border-white/30 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold gradient-text-primary">
            Enter Verification Code
          </CardTitle>
          <p className="text-gray-600">
            We've sent a 6-digit code to <span className="font-semibold text-purple-700">{email}</span>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  console.log('OTP input changed:', value);
                  setOtp(value);
                  setError(''); // Clear error on input
                  if (value.length === 6) {
                    // Auto-verify when 6 digits are entered
                    setTimeout(() => handleVerify(value), 100);
                  }
                }}
                disabled={isVerifying}
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
                Code expires in <span className="font-mono font-semibold text-purple-700">{formatTime(timeLeft)}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                You can paste the entire code at once
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
              onClick={() => handleVerify()} 
              disabled={isVerifying || otp.length !== 6}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {isVerifying ? 'Verifying...' : 'Verify Code'}
            </Button>

            <div className="flex justify-between items-center">
              <Button
                variant="ghost"
                onClick={onBack}
                className="flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50"
                disabled={isVerifying}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={isResending || !canResend}
                className="flex items-center gap-2 text-purple-700 hover:text-purple-900 hover:bg-purple-50"
              >
                {isResending ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {canResend ? 'Resend Code' : 'Resend (30s)'}
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
