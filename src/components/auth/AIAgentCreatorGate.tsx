import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Sparkles, Bot, Plane, Shield, Star, Users, CheckCircle, Mail, Lock, UserPlus, 
  ArrowRight, ArrowLeft, Wand2, MapPin, Heart, Utensils, Accessibility, CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

const AIAgentCreatorGate = () => {
  const { signUp, sendOTP, verifyOTP, otpStep } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Onboarding state
  const [currentStep, setCurrentStep] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [dreamDestinations, setDreamDestinations] = useState<string[]>([]);
  const [visaAssistance, setVisaAssistance] = useState(true);
  const [airlineAccounts, setAirlineAccounts] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [accessibilityNeeds, setAccessibilityNeeds] = useState<string[]>([]);

  const popularAgentNames = ['Leo', 'Zara', 'Sky', 'Nova', 'Aria', 'Kai', 'Luna', 'Max'];
  const travelStyles = [
    { value: 'Budget', icon: '💰', description: 'Smart savings and value-focused travel' },
    { value: 'Business', icon: '💼', description: 'Efficient, premium business travel' },
    { value: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Kid-friendly and family-oriented trips' },
    { value: 'Luxury', icon: '✨', description: 'High-end, premium travel experiences' },
    { value: 'Adventure', icon: '🏔️', description: 'Exciting outdoor and adventure travel' }
  ];
  const popularDestinations = [
    'Paris, France', 'Tokyo, Japan', 'New York, USA', 'London, UK', 'Dubai, UAE',
    'Rome, Italy', 'Barcelona, Spain', 'Sydney, Australia', 'Singapore', 'Amsterdam, Netherlands',
    'Istanbul, Turkey', 'Bangkok, Thailand', 'Cairo, Egypt', 'Rio de Janeiro, Brazil', 'Cape Town, South Africa'
  ];
  const airlines = [
    'Emirates', 'Qatar Airways', 'Singapore Airlines', 'Lufthansa', 'British Airways',
    'Delta Air Lines', 'American Airlines', 'KLM', 'Air France', 'Turkish Airlines'
  ];
  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free', 'Dairy-Free', 'Nut Allergies', 'Diabetic'
  ];
  const accessibilityOptions = [
    'Wheelchair Access', 'Mobility Assistance', 'Visual Impairment', 'Hearing Impairment', 
    'Special Seating', 'Medical Equipment', 'Service Animal', 'Cognitive Support'
  ];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error('Please accept the Terms & Conditions');
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, firstName, lastName);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Verification code sent to your email!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await sendOTP(email, 'signin');
      if (result.error) {
        toast.error(result.error.message);
      } else {
        toast.success('Verification code sent to your email!');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await verifyOTP(otpStep!.email, otpCode, otpStep!.purpose);
      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (otpStep!.purpose === 'signup') {
          toast.success('Welcome! Let\'s create your AI Travel Agent!');
          setShowOnboarding(true);
        } else {
          toast.success('Welcome back! Accessing your AI Travel Agent...');
          // For existing users, they should go directly to the app
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDestinationToggle = (destination: string) => {
    if (dreamDestinations.includes(destination)) {
      setDreamDestinations(dreamDestinations.filter(d => d !== destination));
    } else if (dreamDestinations.length < 3) {
      setDreamDestinations([...dreamDestinations, destination]);
    } else {
      toast.error('You can select up to 3 dream destinations');
    }
  };

  const handleArrayToggle = (item: string, array: string[], setter: (arr: string[]) => void) => {
    if (array.includes(item)) {
      setter(array.filter(i => i !== item));
    } else {
      setter([...array, item]);
    }
  };

  const handleCompleteOnboarding = async () => {
    // This would be implemented with the actual save preferences functionality
    try {
      setLoading(true);
      toast.success(`🎉 ${agentName} is ready to help you explore the world!`);
      // The actual implementation would save to database and redirect
      window.location.href = '/ai-chat';
    } catch (error) {
      toast.error('Failed to save preferences. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (otpStep && !showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Check Your Email</CardTitle>
              <CardDescription>
                We've sent a verification code to {otpStep.email}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div>
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    className="text-center text-lg tracking-widest"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={loading}>
                  {loading ? 'Verifying...' : otpStep.purpose === 'signup' ? 'Create My AI Agent' : 'Access My AI Agent'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div key={step} className={`w-3 h-3 rounded-full ${currentStep >= step ? 'bg-blue-600' : 'bg-gray-300'}`} />
              ))}
            </div>
            <p className="text-sm text-gray-600">Step {currentStep} of 6</p>
          </div>

          <Card className="shadow-xl border-0">
            {/* Step 1: Agent Name */}
            {currentStep === 1 && (
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Wand2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                  <h2 className="text-3xl font-bold mb-2">🎉 Create Your Personal AI Travel Agent — For Free!</h2>
                  <p className="text-gray-600">Book smarter, travel smoother, and never stress over visas again. ✈️🌍</p>
                </div>
                
                <div className="max-w-md mx-auto">
                  <Label htmlFor="agentName" className="text-lg font-semibold">What would you like to name your AI agent?</Label>
                  <Input
                    id="agentName"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Enter a name..."
                    className="mt-2 mb-4"
                  />
                  
                  <p className="text-sm text-gray-600 mb-4">Or choose from popular names:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {popularAgentNames.map((name) => (
                      <Badge
                        key={name}
                        variant={agentName === name ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setAgentName(name)}
                      >
                        {name}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={() => setCurrentStep(2)} 
                    disabled={!agentName}
                    className="w-full"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            )}

            {/* Step 2: Travel Style */}
            {currentStep === 2 && (
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">What's your travel style?</h2>
                  <p className="text-gray-600">This helps {agentName} give you personalized recommendations</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6">
                  {travelStyles.map((style) => (
                    <div
                      key={style.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        travelStyle === style.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setTravelStyle(style.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{style.icon}</span>
                        <div>
                          <h3 className="font-semibold">{style.value}</h3>
                          <p className="text-sm text-gray-600">{style.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} disabled={!travelStyle}>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            )}

            {/* Step 3: Dream Destinations */}
            {currentStep === 3 && (
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h2 className="text-2xl font-bold mb-2">Choose your top 3 dream destinations</h2>
                  <p className="text-gray-600">{agentName} will prioritize these in recommendations</p>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-6">
                  {popularDestinations.map((destination) => (
                    <Badge
                      key={destination}
                      variant={dreamDestinations.includes(destination) ? "default" : "outline"}
                      className="cursor-pointer p-2 text-center justify-center"
                      onClick={() => handleDestinationToggle(destination)}
                    >
                      {destination}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">Selected: {dreamDestinations.length}/3</p>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} disabled={dreamDestinations.length === 0}>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            )}

            {/* Step 4: Visa & Passport */}
            {currentStep === 4 && (
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h2 className="text-2xl font-bold mb-2">Visa assistance preferences</h2>
                  <p className="text-gray-600">Help {agentName} understand your travel documentation needs</p>
                </div>
                
                <div className="max-w-md mx-auto space-y-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="visaAssistance"
                      checked={visaAssistance}
                      onCheckedChange={(checked) => setVisaAssistance(checked as boolean)}
                    />
                    <Label htmlFor="visaAssistance" className="font-medium">
                      I want help with visa applications and requirements
                    </Label>
                  </div>
                  
                  {visaAssistance && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✅ Great! {agentName} will help you with visa requirements, application processes, and document checklists for your destinations.
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button onClick={() => setCurrentStep(5)}>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            )}

            {/* Step 5: Airlines & Preferences */}
            {currentStep === 5 && (
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <Plane className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h2 className="text-2xl font-bold mb-2">Airline preferences & special needs</h2>
                  <p className="text-gray-600">Optional: Help {agentName} personalize your travel experience</p>
                </div>
                
                <div className="max-w-2xl mx-auto space-y-6">
                  <div>
                    <Label className="text-base font-semibold flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Preferred Airlines (Optional)
                    </Label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
                      {airlines.map((airline) => (
                        <Badge
                          key={airline}
                          variant={airlineAccounts.includes(airline) ? "default" : "outline"}
                          className="cursor-pointer p-2 text-center justify-center text-xs"
                          onClick={() => handleArrayToggle(airline, airlineAccounts, setAirlineAccounts)}
                        >
                          {airline}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-semibold flex items-center">
                      <Utensils className="w-4 h-4 mr-2" />
                      Dietary Preferences (Optional)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                      {dietaryOptions.map((option) => (
                        <Badge
                          key={option}
                          variant={dietaryPreferences.includes(option) ? "default" : "outline"}
                          className="cursor-pointer p-2 text-center justify-center text-xs"
                          onClick={() => handleArrayToggle(option, dietaryPreferences, setDietaryPreferences)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-base font-semibold flex items-center">
                      <Accessibility className="w-4 h-4 mr-2" />
                      Accessibility Needs (Optional)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                      {accessibilityOptions.map((option) => (
                        <Badge
                          key={option}
                          variant={accessibilityNeeds.includes(option) ? "default" : "outline"}
                          className="cursor-pointer p-2 text-center justify-center text-xs"
                          onClick={() => handleArrayToggle(option, accessibilityNeeds, setAccessibilityNeeds)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4 mt-8">
                  <Button variant="outline" onClick={() => setCurrentStep(4)}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button onClick={() => setCurrentStep(6)}>
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            )}

            {/* Step 6: Completion */}
            {currentStep === 6 && (
              <CardContent className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4">
                    🎉 Meet {agentName}!
                  </h2>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                    <p className="text-lg font-semibold mb-4">Your AI Travel Agent is ready!</p>
                    <div className="text-left space-y-2">
                      <p><strong>Style:</strong> {travelStyle} traveler</p>
                      <p><strong>Dream destinations:</strong> {dreamDestinations.join(', ')}</p>
                      <p><strong>Visa assistance:</strong> {visaAssistance ? 'Enabled' : 'Disabled'}</p>
                      {airlineAccounts.length > 0 && <p><strong>Preferred airlines:</strong> {airlineAccounts.slice(0, 3).join(', ')}</p>}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    {agentName} will remember your preferences and provide personalized recommendations for all your travel needs.
                  </p>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleCompleteOnboarding}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={loading}
                    >
                      {loading ? 'Setting up...' : `Start Traveling with ${agentName}`}
                    </Button>
                    
                    <Button variant="outline" onClick={() => setCurrentStep(5)} className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back to edit preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                  <Bot className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              🎉 Create Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Personal AI Travel Agent</span> — For Free!
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book smarter, travel smoother, and never stress over visas again. ✈️🌍
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                <Plane className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">Real-time Flights</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium">Personalized Just for You</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wand2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Your Own AI Agent</h3>
            <p className="text-gray-600">Create a personalized AI assistant that learns your preferences and travel style</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Recommendations</h3>
            <p className="text-gray-600">Get personalized suggestions based on your travel style, preferences, and dream destinations</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Complete Travel Support</h3>
            <p className="text-gray-600">From flight booking to visa assistance, your agent handles everything</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white"></div>
              ))}
            </div>
            <Users className="w-5 h-5 text-gray-400" />
          </div>
          <p className="text-gray-600">Join thousands of travelers with their own AI travel agents</p>
          <div className="flex justify-center mt-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Authentication Form */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Your AI Travel Agent</CardTitle>
              <CardDescription>
                Start your personalized travel journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Agent
                  </TabsTrigger>
                  <TabsTrigger value="signin" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Access Agent
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a strong password"
                        required
                      />
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{' '}
                        <a href="/terms-conditions" className="text-blue-600 hover:underline">
                          Terms & Conditions
                        </a>{' '}
                        and{' '}
                        <a href="/privacy-policy" className="text-blue-600 hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={loading || !termsAccepted}>
                      {loading ? 'Creating Account...' : '🎉 Create My Free AI Agent'}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signin" className="space-y-4 mt-6">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input
                        id="signin-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" disabled={loading}>
                      {loading ? 'Sending Code...' : 'Access My AI Agent'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAgentCreatorGate;