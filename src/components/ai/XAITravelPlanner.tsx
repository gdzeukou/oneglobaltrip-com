import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Heart, 
  Sparkles,
  Clock,
  FileText,
  Plane,
  Loader2
} from 'lucide-react';
import { 
  useXAITravelPlanning, 
  TravelDestination, 
  TravelItinerary,
  TravelPlanningRequest 
} from '@/hooks/useXAITravelPlanning';

interface XAITravelPlannerProps {
  className?: string;
}

export const XAITravelPlanner = ({ className = "" }: XAITravelPlannerProps) => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [preferences, setPreferences] = useState<TravelPlanningRequest>({
    budget: '',
    duration: '',
    interests: [],
    travelStyle: 'mid-range',
    travelers: { adults: 2, children: 0 }
  });
  const [destinations, setDestinations] = useState<TravelDestination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [itinerary, setItinerary] = useState<TravelItinerary | null>(null);
  const [newInterest, setNewInterest] = useState('');

  const {
    getDestinationRecommendations,
    generateTravelItinerary,
    loading,
    error
  } = useXAITravelPlanning();

  const handleGetRecommendations = async () => {
    try {
      const recommendations = await getDestinationRecommendations(preferences);
      setDestinations(recommendations);
      setActiveTab('destinations');
    } catch (err) {
      console.error('Failed to get recommendations:', err);
    }
  };

  const handleGenerateItinerary = async (destination: string) => {
    try {
      setSelectedDestination(destination);
      const generatedItinerary = await generateTravelItinerary(destination, preferences);
      setItinerary(generatedItinerary);
      setActiveTab('itinerary');
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !preferences.interests?.includes(newInterest.trim())) {
      setPreferences(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests?.filter(i => i !== interest) || []
    }));
  };

  return (
    <Card className={`w-full max-w-6xl mx-auto ${className}`}>
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardTitle className="flex items-center space-x-2">
          <div className="relative">
            <Plane className="h-6 w-6" />
            <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <span>xAI-Powered Travel Planner</span>
        </CardTitle>
        <p className="text-purple-100">
          Get intelligent travel recommendations and detailed itineraries powered by xAI Grok
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preferences">Travel Preferences</TabsTrigger>
            <TabsTrigger value="destinations" disabled={destinations.length === 0}>
              Destinations
            </TabsTrigger>
            <TabsTrigger value="itinerary" disabled={!itinerary}>
              Itinerary
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budget" className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Budget Range</span>
                  </Label>
                  <Input
                    id="budget"
                    placeholder="e.g., $2000-3000, Budget-friendly, Luxury"
                    value={preferences.budget}
                    onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="duration" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Trip Duration</span>
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 1 week, 10 days, 2 weeks"
                    value={preferences.duration}
                    onChange={(e) => setPreferences(prev => ({ ...prev, duration: e.target.value }))}
                  />
                </div>

                <div>
                  <Label className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Travelers</span>
                  </Label>
                  <div className="flex space-x-4 mt-2">
                    <div>
                      <Label htmlFor="adults" className="text-sm">Adults</Label>
                      <Input
                        id="adults"
                        type="number"
                        min="1"
                        max="10"
                        value={preferences.travelers?.adults || 2}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          travelers: { ...prev.travelers, adults: parseInt(e.target.value) || 2, children: prev.travelers?.children || 0 }
                        }))}
                        className="w-20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="children" className="text-sm">Children</Label>
                      <Input
                        id="children"
                        type="number"
                        min="0"
                        max="10"
                        value={preferences.travelers?.children || 0}
                        onChange={(e) => setPreferences(prev => ({
                          ...prev,
                          travelers: { adults: prev.travelers?.adults || 2, children: parseInt(e.target.value) || 0 }
                        }))}
                        className="w-20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Travel Style</span>
                  </Label>
                  <div className="flex space-x-2 mt-2">
                    {['budget', 'mid-range', 'luxury'].map((style) => (
                      <Button
                        key={style}
                        variant={preferences.travelStyle === style ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style as any }))}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1).replace('-', ' ')}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="interests" className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Interests & Activities</span>
                  </Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      id="interests"
                      placeholder="Add interest (e.g., museums, beaches)"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Button onClick={addInterest} size="sm">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {preferences.interests?.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeInterest(interest)}
                      >
                        {interest} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={handleGetRecommendations}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    xAI is analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Get AI Recommendations
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </TabsContent>

          <TabsContent value="destinations" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map((destination, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-lg">{destination.name}</span>
                      <Badge variant="outline">{destination.country}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">Best time:</span>
                        <span>{destination.bestTimeToVisit}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">Cost:</span>
                        <span>{destination.estimatedCost}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">Visa:</span>
                        <span className="text-xs">{destination.visaRequirements}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-sm font-medium">Highlights:</span>
                      <div className="flex flex-wrap gap-1">
                        {destination.highlights.slice(0, 3).map((highlight, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleGenerateItinerary(destination.name)}
                      disabled={loading}
                      className="w-full mt-4"
                    >
                      {loading && selectedDestination === destination.name ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating Itinerary...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 mr-2" />
                          Create Itinerary
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="mt-6">
            {itinerary && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {itinerary.destination} - {itinerary.duration}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Total Cost: {itinerary.totalEstimatedCost}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">
                        Visa: {itinerary.visaInfo.required ? 'Required' : 'Not Required'}
                      </span>
                    </div>
                    {itinerary.visaInfo.required && (
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <span className="font-medium">
                          Processing: {itinerary.visaInfo.processingTime}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold text-gray-900">Daily Itinerary</h3>
                    {itinerary.activities.map((activity, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-bold">Day {activity.day}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{activity.title}</h4>
                              <p className="text-gray-600 mt-1">{activity.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{activity.location}</span>
                                </div>
                                {activity.estimatedCost && (
                                  <div className="flex items-center space-x-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span>{activity.estimatedCost}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Travel Tips</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {itinerary.travelTips.map((tip, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-purple-600 mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {itinerary.visaInfo.required && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Visa Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <span className="font-medium">Type:</span>
                            <span className="ml-2">{itinerary.visaInfo.type}</span>
                          </div>
                          <div>
                            <span className="font-medium">Processing Time:</span>
                            <span className="ml-2">{itinerary.visaInfo.processingTime}</span>
                          </div>
                          {itinerary.visaInfo.requirements && (
                            <div>
                              <span className="font-medium">Requirements:</span>
                              <ul className="mt-2 space-y-1 text-sm">
                                {itinerary.visaInfo.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start space-x-2">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};