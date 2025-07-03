
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase,
  Plane
} from 'lucide-react';

interface SmartRouterProps {
  onClose?: () => void;
}

type UserIntent = 'visa-only' | 'package-with-visa' | 'package-only' | 'consultation';

const SmartApplicationRouter = ({ onClose }: SmartRouterProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState<{
    intent: UserIntent | null;
    destination: string;
    timeframe: string;
    travelers: string;
  }>({
    intent: null,
    destination: '',
    timeframe: '',
    travelers: ''
  });
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleIntentSelection = (intent: UserIntent) => {
    setUserProfile(prev => ({ ...prev, intent }));
    setCurrentStep(2);
  };

  const handleProfileComplete = (data: Partial<typeof userProfile>) => {
    const updatedProfile = { ...userProfile, ...data };
    setUserProfile(updatedProfile);
    routeUser(updatedProfile);
  };

  const routeUser = (profile: typeof userProfile) => {
    // Store user intent for personalized experience
    sessionStorage.setItem('user_application_intent', JSON.stringify({
      ...profile,
      timestamp: Date.now(),
      source: 'smart_router'
    }));

    // Route based on intent and authentication status
    if (!user) {
      sessionStorage.setItem('redirect_after_auth', getDestinationRoute(profile));
      navigate('/auth');
      return;
    }

    navigate(getDestinationRoute(profile));
    onClose?.();
  };

  const getDestinationRoute = (profile: typeof userProfile): string => {
    switch (profile.intent) {
      case 'visa-only':
        return '/apply';
      case 'package-with-visa':
        return profile.destination ? `/packages?destination=${profile.destination}` : '/packages';
      case 'package-only':
        return '/packages';
      case 'consultation':
        return '/contact';
      default:
        return '/apply';
    }
  };

  if (currentStep === 1) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-2xl">What brings you here today?</CardTitle>
          </div>
          <p className="text-gray-600">Let us guide you to exactly what you need</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="h-auto p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleIntentSelection('visa-only')}
            >
              <div className="flex items-start space-x-4 w-full">
                <Briefcase className="h-6 w-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">I need a visa</h3>
                  <p className="text-gray-600 text-sm">Get expert visa assistance with guaranteed approval</p>
                  <Badge variant="secondary" className="mt-2">99.2% Success Rate</Badge>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleIntentSelection('package-with-visa')}
            >
              <div className="flex items-start space-x-4 w-full">
                <Plane className="h-6 w-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">I want a complete travel package</h3>
                  <p className="text-gray-600 text-sm">Luxury packages with visa handling included</p>
                  <Badge variant="secondary" className="mt-2">Most Popular</Badge>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleIntentSelection('package-only')}
            >
              <div className="flex items-start space-x-4 w-full">
                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">I have my visa, need travel planning</h3>
                  <p className="text-gray-600 text-sm">Curated experiences and luxury accommodations</p>
                  <Badge variant="secondary" className="mt-2">Premium Service</Badge>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto p-6 text-left hover:border-blue-500 hover:bg-blue-50 transition-all"
              onClick={() => handleIntentSelection('consultation')}
            >
              <div className="flex items-start space-x-4 w-full">
                <Users className="h-6 w-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">I need expert consultation</h3>
                  <p className="text-gray-600 text-sm">Speak with our travel specialists first</p>
                  <Badge variant="secondary" className="mt-2">Free 30min Call</Badge>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Tell us more about your trip</CardTitle>
        <p className="text-gray-600">This helps us personalize your experience</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Where are you planning to travel?</label>
          <div className="grid grid-cols-2 gap-2">
            {['Europe', 'North America', 'Asia', 'Other'].map((dest) => (
              <Button
                key={dest}
                variant={userProfile.destination === dest ? "default" : "outline"}
                onClick={() => handleProfileComplete({ destination: dest })}
                className="justify-start"
              >
                {dest}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setCurrentStep(1)}>
            Back
          </Button>
          <Button 
            onClick={() => routeUser(userProfile)}
            disabled={!userProfile.destination}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartApplicationRouter;
