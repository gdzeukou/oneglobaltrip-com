import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Apple, Facebook } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';


interface BookingStepAuthProps {
  onComplete: (data: any) => void;
}

const BookingStepAuth = ({ onComplete }: BookingStepAuthProps) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'otp'>('signin');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const { toast } = useToast();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords don't match",
            variant: "destructive"
          });
          return;
        }

        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (error) throw error;

        toast({
          title: "Account Created",
          description: "Please check your email to verify your account"
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) throw error;

        onComplete({});
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple' | 'facebook') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handlePhoneAuth = async () => {
    if (!otpSent) {
      setLoading(true);
      try {
        // In production, this would integrate with Twilio or similar
        // For now, we'll use Supabase's phone auth (if configured)
        toast({
          title: "OTP Sent",
          description: "Check your phone for the verification code"
        });
        setOtpSent(true);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Verify OTP
      setLoading(true);
      try {
        // OTP verification logic would go here
        onComplete({});
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-[Inter]">
            {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Verify Phone'}
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === 'signin' 
              ? 'Sign in to continue your booking' 
              : mode === 'signup'
              ? 'Create an account to get started'
              : 'Enter the code sent to your phone'
            }
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {mode === 'otp' ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={otpSent}
                />
              </div>
              
              {otpSent && (
                <div>
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    maxLength={6}
                  />
                </div>
              )}

              <Button 
                onClick={handlePhoneAuth}
                disabled={loading || (!otpSent && !formData.phone) || (otpSent && otpCode.length !== 6)}
                className="w-full"
              >
                <Phone className="h-4 w-4 mr-2" />
                {loading ? 'Processing...' : otpSent ? 'Verify Code' : 'Send Code'}
              </Button>

              <Button 
                variant="ghost" 
                onClick={() => setMode('signin')}
                className="w-full"
              >
                Back to Sign In
              </Button>
            </div>
          ) : (
            <>
              {/* Social Auth Buttons */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('google')}
                  className="w-full"
                >
                  <FcGoogle className="h-5 w-5 mr-2" />
                  Continue with Google
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('apple')}
                  className="w-full"
                >
                  <Apple className="h-5 w-5 mr-2" />
                  Continue with Apple
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleSocialAuth('facebook')}
                  className="w-full"
                >
                  <Facebook className="h-5 w-5 mr-2" />
                  Continue with Facebook
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setMode('otp')}
                  className="w-full"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Continue with Phone
                </Button>
              </div>

              <div className="relative">
                <Separator />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-background px-2 text-muted-foreground text-sm">
                    or continue with email
                  </span>
                </div>
              </div>

              {/* Email Auth Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                {mode === 'signup' && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                )}

                <Button type="submit" disabled={loading} className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  {loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-sm"
                >
                  {mode === 'signin' 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Sign in'
                  }
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStepAuth;