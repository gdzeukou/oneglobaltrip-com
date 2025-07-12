import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Sparkles, Globe, Heart, Star, Plane, Building, Clock, Languages, DollarSign, CheckCircle } from 'lucide-react';
import { useUserAgent } from '@/hooks/useUserAgent';
import { useToast } from '@/hooks/use-toast';

const AgentCreator = () => {
  const navigate = useNavigate();
  const { createAgent } = useUserAgent();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar_url: '',
    preferences: {
      travel_style: [] as string[],
      languages: [] as string[],
      budget_range: '',
      flight_comfort: 50,
      hotel_rating: 3,
      pace: 50,
      allow_data_access: false
    }
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const travelStyles = [
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'luxury', label: 'Luxury', icon: '✨' },
    { id: 'budget', label: 'Budget', icon: '💰' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'romance', label: 'Romance', icon: '💕' },
    { id: 'party', label: 'Party', icon: '🎉' },
    { id: 'wellness', label: 'Wellness', icon: '🧘‍♀️' },
    { id: 'cultural', label: 'Cultural', icon: '🏛️' }
  ];

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Spanish' },
    { id: 'fr', label: 'French' },
    { id: 'de', label: 'German' },
    { id: 'it', label: 'Italian' },
    { id: 'pt', label: 'Portuguese' },
    { id: 'ja', label: 'Japanese' },
    { id: 'ko', label: 'Korean' },
    { id: 'zh', label: 'Chinese' },
    { id: 'ar', label: 'Arabic' }
  ];

  const budgetRanges = [
    { id: 'under-1000', label: 'Under $1,000' },
    { id: '1000-3000', label: '$1,000 - $3,000' },
    { id: '3000-5000', label: '$3,000 - $5,000' },
    { id: '5000-10000', label: '$5,000 - $10,000' },
    { id: 'over-10000', label: 'Over $10,000' }
  ];

  const defaultAvatars = [
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg', 
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg',
    '/placeholder.svg'
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStyleToggle = (styleId: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        travel_style: prev.preferences.travel_style.includes(styleId)
          ? prev.preferences.travel_style.filter(s => s !== styleId)
          : [...prev.preferences.travel_style, styleId]
      }
    }));
  };

  const handleLanguageToggle = (langId: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        languages: prev.preferences.languages.includes(langId)
          ? prev.preferences.languages.filter(l => l !== langId)
          : [...prev.preferences.languages, langId]
      }
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a name for your AI agent.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await createAgent(formData);
      
      if (error) {
        throw error;
      }

      toast({
        title: "Success!",
        description: `Your AI agent "${formData.name}" has been created successfully.`
      });

      navigate('/dashboard');
    } catch (error: any) {
      console.error('Error creating agent:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create your AI agent. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Name Your AI Travel Agent</h2>
              <p className="text-muted-foreground">Choose a name that feels personal to you</p>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input
                id="agent-name"
                placeholder="Enter your agent's name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                maxLength={25}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">
                {formData.name.length}/25 characters
              </p>
            </div>

            {formData.name && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-lg">
                  Hi, I'm <strong>{formData.name}</strong>, your personal travel expert.
                </p>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Choose an Avatar</h2>
              <p className="text-muted-foreground">Select an avatar that represents your agent</p>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {defaultAvatars.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setFormData(prev => ({ ...prev, avatar_url: avatar }))}
                  className={`aspect-square rounded-lg border-2 transition-all ${
                    formData.avatar_url === avatar ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full rounded-lg object-cover" />
                </button>
              ))}
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Want something custom? You can upload your own image or generate one with AI later.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Travel Style & Preferences</h2>
              <p className="text-muted-foreground">What type of travel experiences do you love?</p>
            </div>
            
            <div className="space-y-4">
              <Label>Travel Styles (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {travelStyles.map((style) => (
                  <Badge
                    key={style.id}
                    variant={formData.preferences.travel_style.includes(style.id) ? "default" : "outline"}
                    className="cursor-pointer p-3 justify-start hover:bg-primary hover:text-primary-foreground"
                    onClick={() => handleStyleToggle(style.id)}
                  >
                    <span className="mr-2">{style.icon}</span>
                    {style.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Comfort & Quality Preferences</h2>
              <p className="text-muted-foreground">Help us understand your priorities</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Plane className="h-4 w-4" />
                  Flight Comfort vs Price
                </Label>
                <Slider
                  value={[formData.preferences.flight_comfort]}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, flight_comfort: value[0] }
                  }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Price Priority</span>
                  <span>Comfort Priority</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Hotel Star Rating
                </Label>
                <Slider
                  value={[formData.preferences.hotel_rating]}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, hotel_rating: value[0] }
                  }))}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Budget Hotels (1-2★)</span>
                  <span>Luxury Hotels (4-5★)</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Travel Pace
                </Label>
                <Slider
                  value={[formData.preferences.pace]}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, pace: value[0] }
                  }))}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Relaxed & Slow</span>
                  <span>Fast & Packed</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Languages className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Languages & Budget</h2>
              <p className="text-muted-foreground">Final preferences for your agent</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Preferred Languages</Label>
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <Badge
                      key={lang.id}
                      variant={formData.preferences.languages.includes(lang.id) ? "default" : "outline"}
                      className="cursor-pointer p-3 justify-center hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleLanguageToggle(lang.id)}
                    >
                      {lang.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Annual Travel Budget
                </Label>
                <div className="grid grid-cols-1 gap-3">
                  {budgetRanges.map((budget) => (
                    <Badge
                      key={budget.id}
                      variant={formData.preferences.budget_range === budget.id ? "default" : "outline"}
                      className="cursor-pointer p-3 justify-center hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, budget_range: budget.id }
                      }))}
                    >
                      {budget.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Privacy & Data Use</h2>
              <p className="text-muted-foreground">How can your agent help you better?</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="data-access"
                  checked={formData.preferences.allow_data_access}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    preferences: { ...prev.preferences, allow_data_access: !!checked }
                  }))}
                />
                <div className="space-y-1">
                  <Label htmlFor="data-access" className="text-base font-medium">
                    Allow my agent to access past bookings & visa data
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    This helps your agent provide personalized recommendations based on your travel history and preferences. You can change this anytime in your settings.
                  </p>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Agent Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Travel Styles:</strong> {formData.preferences.travel_style.join(', ') || 'None selected'}</p>
                  <p><strong>Languages:</strong> {formData.preferences.languages.map(l => languages.find(lang => lang.id === l)?.label).join(', ') || 'None selected'}</p>
                  <p><strong>Budget Range:</strong> {budgetRanges.find(b => b.id === formData.preferences.budget_range)?.label || 'Not specified'}</p>
                  <p><strong>Data Access:</strong> {formData.preferences.allow_data_access ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                By creating your AI agent, you agree to our{' '}
                <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>{' '}
                and{' '}
                <a href="/terms" className="underline hover:text-primary">Terms of Service</a>.
                Your data is processed in compliance with GDPR regulations.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle>Create Your AI Travel Agent</CardTitle>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent>
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={currentStep === 1 && !formData.name.trim()}
                className="flex items-center gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !formData.name.trim()}
                className="flex items-center gap-2"
              >
                {isLoading ? 'Creating...' : 'Create Agent'}
                <Sparkles className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCreator;