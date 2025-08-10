import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAgent } from '@/hooks/useUserAgent';
import { supabase } from '@/integrations/supabase/client';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Bot, 
  Camera, 
  Plus, 
  X, 
  Globe, 
  Utensils, 
  Accessibility,
  Sparkles,
  Heart,
  Plane,
  MapPin
} from 'lucide-react';

const AIAgentSettings = () => {
  const { user } = useAuth();
  const { agent, updateAgent, loading: agentLoading } = useUserAgent();
  const { preferences, updatePreferences, loading: preferencesLoading } = useAIAgentPreferences();
  const { toast } = useToast();
  
  // Local state for form
  const [agentName, setAgentName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [dreamDestinations, setDreamDestinations] = useState<string[]>([]);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [accessibilityNeeds, setAccessibilityNeeds] = useState<string[]>([]);
  const [visaAssistance, setVisaAssistance] = useState(true);
  const [personalityTraits, setPersonalityTraits] = useState({
    helpful: true,
    friendly: true,
    professional: true,
    funny: false,
    knowledgeable: true
  });
  
  // Input states for adding new items
  const [newDestination, setNewDestination] = useState('');
  const [newDietaryPref, setNewDietaryPref] = useState('');
  const [newAccessibilityNeed, setNewAccessibilityNeed] = useState('');
  
  // Loading state
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (agent) {
      setAgentName(agent.name || '');
      setAvatarUrl(agent.avatar_url || '');
    }
  }, [agent]);

  useEffect(() => {
    if (preferences) {
      setAgentName(preferences.aiAgentName || '');
      setTravelStyle(preferences.aiAgentTravelStyle || '');
      setDreamDestinations(preferences.aiAgentDreamDestinations || []);
      setDietaryPreferences(preferences.aiAgentDietaryPreferences || []);
      setAccessibilityNeeds(preferences.aiAgentAccessibilityNeeds || []);
      setVisaAssistance(preferences.aiAgentVisaAssistance ?? true);
      setPersonalityTraits({
        helpful: preferences.aiAgentPersonalityTraits?.helpful ?? true,
        friendly: preferences.aiAgentPersonalityTraits?.friendly ?? true,
        professional: preferences.aiAgentPersonalityTraits?.professional ?? true,
        funny: preferences.aiAgentPersonalityTraits?.funny ?? false,
        knowledgeable: preferences.aiAgentPersonalityTraits?.knowledgeable ?? true
      });
    }
  }, [preferences]);

  const handleSave = async () => {
    if (!agentName.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for your AI travel agent.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    try {
      // Update user_agents table (if exists)
      if (agent) {
        await updateAgent({
          name: agentName.trim(),
          avatar_url: avatarUrl.trim() || null
        });
      }

      // Update user_preferences table
      await updatePreferences({
        aiAgentName: agentName.trim(),
        aiAgentTravelStyle: travelStyle.trim() || null,
        aiAgentDreamDestinations: dreamDestinations,
        aiAgentDietaryPreferences: dietaryPreferences,
        aiAgentAccessibilityNeeds: accessibilityNeeds,
        aiAgentVisaAssistance: visaAssistance,
        aiAgentPersonalityTraits: personalityTraits
      });

      toast({
        title: "Settings Saved",
        description: `${agentName}'s settings have been updated successfully!`,
      });
    } catch (error: any) {
      console.error('Error saving AI agent settings:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save settings. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addDestination = () => {
    if (newDestination.trim() && !dreamDestinations.includes(newDestination.trim())) {
      setDreamDestinations([...dreamDestinations, newDestination.trim()]);
      setNewDestination('');
    }
  };

  const removeDestination = (destination: string) => {
    setDreamDestinations(dreamDestinations.filter(d => d !== destination));
  };

  const addDietaryPreference = () => {
    if (newDietaryPref.trim() && !dietaryPreferences.includes(newDietaryPref.trim())) {
      setDietaryPreferences([...dietaryPreferences, newDietaryPref.trim()]);
      setNewDietaryPref('');
    }
  };

  const removeDietaryPreference = (pref: string) => {
    setDietaryPreferences(dietaryPreferences.filter(p => p !== pref));
  };

  const addAccessibilityNeed = () => {
    if (newAccessibilityNeed.trim() && !accessibilityNeeds.includes(newAccessibilityNeed.trim())) {
      setAccessibilityNeeds([...accessibilityNeeds, newAccessibilityNeed.trim()]);
      setNewAccessibilityNeed('');
    }
  };

  const removeAccessibilityNeed = (need: string) => {
    setAccessibilityNeeds(accessibilityNeeds.filter(n => n !== need));
  };

  const triggerAvatarSelect = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setUploadingAvatar(true);
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      setAvatarUrl(publicUrl);

      if (agent) {
        await updateAgent({ avatar_url: publicUrl });
      }

      toast({ title: 'Avatar updated', description: 'Your agent avatar has been updated.' });
    } catch (err: any) {
      console.error('Avatar upload failed', err);
      toast({
        title: 'Avatar upload failed',
        description: err.message || 'Please ensure the avatars bucket exists and is public.',
        variant: 'destructive',
      });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  if (agentLoading || preferencesLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="ml-2">Loading AI agent settings...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Agent Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Travel Agent</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent Avatar and Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="h-20 w-20 cursor-pointer" onClick={triggerAvatarSelect}>
                <AvatarImage src={avatarUrl} alt={agentName} />
                <AvatarFallback className="text-lg">
                  {agentName.split(' ').map(n => n[0]).join('').toUpperCase() || 'AI'}
                </AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
              />
              <Button variant="outline" size="sm" className="text-xs" onClick={triggerAvatarSelect} disabled={uploadingAvatar}>
                <Camera className="h-3 w-3 mr-1" />
                {uploadingAvatar ? 'Uploading...' : 'Change'}
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="agent_name">Agent Name</Label>
                <Input
                  id="agent_name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g., Danielle, Alex, Sarah..."
                  className="max-w-md"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar_url">Avatar URL (optional)</Label>
                <Input
                  id="avatar_url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="max-w-md"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plane className="h-5 w-5" />
            <span>Travel Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="travel_style">Travel Style</Label>
            <Input
              id="travel_style"
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              placeholder="e.g., Adventure, Luxury, Budget, Cultural..."
            />
          </div>

          {/* Dream Destinations */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Dream Destinations</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {dreamDestinations.map((destination, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{destination}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeDestination(destination)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newDestination}
                onChange={(e) => setNewDestination(e.target.value)}
                placeholder="Add a destination..."
                onKeyDown={(e) => e.key === 'Enter' && addDestination()}
              />
              <Button onClick={addDestination} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Visa Assistance */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Visa Assistance</p>
                <p className="text-xs text-muted-foreground">Help with visa requirements and applications</p>
              </div>
            </div>
            <Switch
              checked={visaAssistance}
              onCheckedChange={setVisaAssistance}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dietary & Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5" />
            <span>Personal Needs</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dietary Preferences */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Utensils className="h-4 w-4" />
              <span>Dietary Preferences</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {dietaryPreferences.map((pref, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{pref}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeDietaryPreference(pref)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newDietaryPref}
                onChange={(e) => setNewDietaryPref(e.target.value)}
                placeholder="e.g., Vegetarian, Halal, Gluten-free..."
                onKeyDown={(e) => e.key === 'Enter' && addDietaryPreference()}
              />
              <Button onClick={addDietaryPreference} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Accessibility Needs */}
          <div className="space-y-3">
            <Label className="flex items-center space-x-2">
              <Accessibility className="h-4 w-4" />
              <span>Accessibility Needs</span>
            </Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {accessibilityNeeds.map((need, index) => (
                <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                  <span>{need}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeAccessibilityNeed(need)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={newAccessibilityNeed}
                onChange={(e) => setNewAccessibilityNeed(e.target.value)}
                placeholder="e.g., Wheelchair access, Sign language..."
                onKeyDown={(e) => e.key === 'Enter' && addAccessibilityNeed()}
              />
              <Button onClick={addAccessibilityNeed} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personality Traits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" />
            <span>Personality Traits</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Choose how you'd like your AI travel agent to communicate with you.
          </p>
          
          {Object.entries(personalityTraits).map(([trait, enabled]) => (
            <div key={trait} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium capitalize">{trait}</p>
                <p className="text-xs text-muted-foreground">
                  {trait === 'helpful' && 'Provides detailed assistance and suggestions'}
                  {trait === 'friendly' && 'Uses warm and approachable language'}
                  {trait === 'professional' && 'Maintains formal and business-like tone'}
                  {trait === 'funny' && 'Adds humor and light-hearted comments'}
                  {trait === 'knowledgeable' && 'Shares interesting facts and insights'}
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={(checked) => 
                  setPersonalityTraits(prev => ({ ...prev, [trait]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} className="px-8">
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Save Agent Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AIAgentSettings;