
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Eye, EyeOff, LogIn, UserPlus, Mail, CheckCircle, Smartphone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OTPVerification from '@/components/auth/OTPVerification';

const Auth = () => {
  const { signIn, signUp, user, isEmailVerified, otpStep, verifyOTP, clearOTPStep } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    confirmPassword: '',
    verificationMethod: 'email' as 'email' | 'sms',
  });

  useEffect(() => {
    if (user && isEmailVerified) {
      navigate('/dashboard');
    }
  }, [user, isEmailVerified, navigate]);

  // Show OTP verification if required
  if (otpStep?.isRequired) {
    return (
      <OTPVerification
        email={otpStep.email}
        purpose={otpStep.purpose}
        method={otpStep.method}
        phoneNumber={otpStep.phoneNumber}
        onVerificationSuccess={() => {
          clearOTPStep();
          if (otpStep.purpose === 'signin') {
            navigate('/dashboard');
          } else {
            setSignupSuccess(true);
            setActiveTab('login');
          }
        }}
        onBack={clearOTPStep}
      />
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSignupSuccess(false);

    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (signupData.verificationMethod === 'sms' && !signupData.phoneNumber) {
      setError('Phone number is required for SMS verification');
      setLoading(false);
      return;
    }

    const { error } = await signUp(
      signupData.email,
      signupData.password,
      signupData.firstName,
      signupData.lastName,
      signupData.phoneNumber,
      signupData.verificationMethod
    );
    
    if (error) {
      setError(error.message);
    } else {
      // Clear the form if OTP step is initiated
      setSignupData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        confirmPassword: '',
        verificationMethod: 'email',
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-16">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Access Your Account
              </CardTitle>
              <p className="text-gray-600">
                Sign in to track your applications and manage your trips
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </TabsTrigger>
                </TabsList>

                {error && (
                  <Alert className="mt-4 border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {signupSuccess && (
                  <Alert className="mt-4 border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-green-800">
                      <div className="space-y-2">
                        <p className="font-medium">Account verification completed!</p>
                        <p>You can now sign in to your account using your email and password.</p>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          placeholder="••••••••"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      You'll receive a verification code via email to complete your sign-in.
                    </p>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label>Verification Method</Label>
                      <RadioGroup
                        value={signupData.verificationMethod}
                        onValueChange={(value: 'email' | 'sms') => 
                          setSignupData({...signupData, verificationMethod: value})
                        }
                        className="flex space-x-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email" className="flex items-center space-x-2 cursor-pointer">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sms" id="sms" />
                          <Label htmlFor="sms" className="flex items-center space-x-2 cursor-pointer">
                            <Smartphone className="h-4 w-4" />
                            <span>SMS</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {signupData.verificationMethod === 'sms' && (
                      <div>
                        <Label htmlFor="phone-number">Phone Number</Label>
                        <Input
                          id="phone-number"
                          type="tel"
                          value={signupData.phoneNumber}
                          onChange={(e) => setSignupData({...signupData, phoneNumber: e.target.value})}
                          placeholder="+1234567890"
                          required
                        />
                      </div>
                    )}
                    <div>
                      <Label htmlFor="signup-password">Password (min. 8 characters)</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          type={showPassword ? 'text' : 'password'}
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          placeholder="••••••••"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        value={signupData.confirmPassword}
                        onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-xs text-blue-700">
                        <Mail className="h-3 w-3 inline mr-1" />
                        You'll receive a verification code via {signupData.verificationMethod} to complete your registration.
                      </p>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
