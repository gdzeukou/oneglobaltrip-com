import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Compass, Calendar, DollarSign, Users, Zap, Brain, Wand2, RefreshCw, UtensilsCrossed, Mountain, Leaf, Camera, Music, Dumbbell } from 'lucide-react';

interface MoodOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface ActivityOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface Recommendation {
  destination: string;
  tier: 'Explore' | 'Elevate' | 'Escape';
  mood: string;
  activities?: string[];
  description: string;
  price: string;
  image: string;
  highlights: string[];
}

const AITripRecommender = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const moods: MoodOption[] = [
    {
      id: 'adventure',
      label: 'Adventurous',
      icon: <Compass className="h-4 w-4" />,
      description: 'Seeking thrills and new experiences'
    },
    {
      id: 'romantic',
      label: 'Romantic',
      icon: <Heart className="h-4 w-4" />,
      description: 'Looking for intimacy and connection'
    },
    {
      id: 'cultural',
      label: 'Cultural',
      icon: <Users className="h-4 w-4" />,
      description: 'Eager to learn and immerse'
    },
    {
      id: 'relaxation',
      label: 'Tranquil',
      icon: <Sparkles className="h-4 w-4" />,
      description: 'Craving peace and restoration'
    }
  ];

  const activities: ActivityOption[] = [
    {
      id: 'culinary',
      label: 'Culinary',
      icon: <UtensilsCrossed className="h-3 w-3" />,
      description: 'Food experiences & local cuisine'
    },
    {
      id: 'outdoor',
      label: 'Outdoor',
      icon: <Mountain className="h-3 w-3" />,
      description: 'Hiking, nature & adventure sports'
    },
    {
      id: 'wellness',
      label: 'Wellness',
      icon: <Leaf className="h-3 w-3" />,
      description: 'Spa, yoga & mindful experiences'
    },
    {
      id: 'photography',
      label: 'Photography',
      icon: <Camera className="h-3 w-3" />,
      description: 'Scenic views & Instagram-worthy spots'
    },
    {
      id: 'nightlife',
      label: 'Nightlife',
      icon: <Music className="h-3 w-3" />,
      description: 'Entertainment & vibrant city life'
    },
    {
      id: 'fitness',
      label: 'Active',
      icon: <Dumbbell className="h-3 w-3" />,
      description: 'Sports, fitness & physical activities'
    }
  ];

  const budgetOptions = [
    { id: 'explore', label: 'Explore ($1,500-3,000)', tier: 'Explore' },
    { id: 'elevate', label: 'Elevate ($3,000-6,000)', tier: 'Elevate' },
    { id: 'escape', label: 'Escape ($6,000+)', tier: 'Escape' }
  ];

  const recommendations: Record<string, Record<string, Recommendation>> = {
    adventure: {
      explore: {
        destination: 'Iceland',
        tier: 'Explore',
        mood: 'Adventurous',
        activities: ['outdoor', 'photography'],
        description: 'Where fire meets ice and your courage finds its voice',
        price: 'From $2,400',
        image: 'https://images.unsplash.com/photo-1539066033336-9ed2c8a5eb51?w=800&h=600&fit=crop',
        highlights: ['Northern Lights Hunting', 'Glacier Hiking', 'Geothermal Hot Springs']
      },
      elevate: {
        destination: 'New Zealand',
        tier: 'Elevate',
        mood: 'Adventurous',
        activities: ['outdoor', 'photography'],
        description: 'Where Middle Earth becomes your playground',
        price: 'From $4,200',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        highlights: ['Private Helicopter Tours', 'Luxury Lodge Stays', 'Exclusive Access Adventures']
      },
      escape: {
        destination: 'Antarctic Peninsula',
        tier: 'Escape',
        mood: 'Adventurous',
        activities: ['outdoor', 'photography'],
        description: 'The last untouched frontier awaits your footsteps',
        price: 'From $8,500',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
        highlights: ['Private Expedition Ship', 'Wildlife Photography', 'Polar Plunge Ceremony']
      }
    },
    romantic: {
      explore: {
        destination: 'Prague',
        tier: 'Explore',
        mood: 'Romantic',
        activities: ['culinary', 'cultural'],
        description: 'Where cobblestones whisper love stories',
        price: 'From $1,800',
        image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop',
        highlights: ['Castle Dinners', 'River Cruises', 'Historic Hotels']
      },
      elevate: {
        destination: 'Santorini',
        tier: 'Elevate',
        mood: 'Romantic',
        activities: ['culinary', 'wellness'],
        description: 'Where Greek gods chose to watch the world end',
        price: 'From $3,800',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
        highlights: ['Private Sunset Sailing', 'Caldera View Suites', 'Wine Cave Tastings']
      },
      escape: {
        destination: 'Bora Bora',
        tier: 'Escape',
        mood: 'Romantic',
        activities: ['wellness', 'photography'],
        description: 'Where paradise was perfected just for two',
        price: 'From $7,200',
        image: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&h=600&fit=crop',
        highlights: ['Overwater Bungalows', 'Private Beach Picnics', 'Helicopter Proposals']
      }
    }
  };

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const generateRecommendation = () => {
    if (!selectedMood || !selectedBudget) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      const rec = recommendations[selectedMood]?.[selectedBudget] || 
                 recommendations.adventure.explore;
      setRecommendation(rec);
      setIsGenerating(false);
    }, 2000);
  };

  const resetSelections = () => {
    setSelectedMood('');
    setSelectedBudget('');
    setSelectedActivities([]);
    setRecommendation(null);
    setIsGenerating(false);
  };

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      {/* Smaller background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100" />
      
      {/* Much smaller geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-15" />
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-gray-50 rounded-full blur-xl opacity-20" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          {/* Compact AI branding */}
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl mr-4 shadow-md">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold border-0 rounded-full">
              <Zap className="h-3 w-3 mr-2" />
              AI POWERED
            </Badge>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Introducing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Soul Compass
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Advanced intelligence that understands your unique travel preferences and curates perfectly matched journeys
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-700 text-sm font-medium">Intelligent Matching</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-700 text-sm font-medium">Personalized Results</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-gray-700 text-sm font-medium">Instant Recommendations</span>
            </div>
          </div>

          {/* Compact refresh button */}
          {(selectedMood || selectedBudget || selectedActivities.length > 0 || recommendation) && (
            <div className="mb-6">
              <Button
                onClick={resetSelections}
                variant="outline"
                size="sm"
                className="bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-full transition-all duration-300"
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Start Over
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Compact Mood Selection */}
          <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
              <CardTitle className="flex items-center gap-3 text-gray-900 text-base">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                What inspires your journey?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                      selectedMood === mood.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg ${selectedMood === mood.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {mood.icon}
                      </div>
                      <span className="font-semibold text-sm text-gray-900">{mood.label}</span>
                    </div>
                    <p className="text-xs text-gray-600">{mood.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Compact Activities & Themes Selection */}
          <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
              <CardTitle className="flex items-center gap-3 text-gray-900 text-base">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                Activities & Themes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 gap-2">
                {activities.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => handleActivityToggle(activity.id)}
                    className={`p-2 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                      selectedActivities.includes(activity.id)
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className={`p-1 rounded-md ${selectedActivities.includes(activity.id) ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {activity.icon}
                      </div>
                      <span className="font-semibold text-xs text-gray-900">{activity.label}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-tight">{activity.description}</p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-3 text-center">Select multiple themes that interest you</p>
            </CardContent>
          </Card>

          {/* Compact Budget Selection */}
          <Card className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
              <CardTitle className="flex items-center gap-3 text-gray-900 text-base">
                <div className="p-2 bg-green-600 rounded-lg">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                Investment in experiences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`w-full p-3 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                      selectedBudget === budget.id
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-gray-900">{budget.label}</span>
                      <Badge 
                        className={`text-xs rounded-full ${selectedBudget === budget.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {budget.tier}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compact Generate Button */}
        <div className="text-center mb-10">
          <Button
            onClick={generateRecommendation}
            disabled={!selectedMood || !selectedBudget || isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 animate-spin" />
                AI is analyzing your preferences...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5" />
                Get My Perfect Match
                <Sparkles className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>

        {/* Compact Recommendation Result */}
        {recommendation && (
          <Card className="overflow-hidden shadow-xl border-0 bg-white rounded-2xl">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img
                  src={recommendation.image}
                  alt={recommendation.destination}
                  className="w-full h-48 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-blue-600 text-white rounded-full px-3 py-1 text-xs">
                    {recommendation.tier}
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs">
                    {recommendation.mood}
                  </Badge>
                  {recommendation.activities && recommendation.activities.length > 0 && (
                    <Badge className="bg-purple-100 text-purple-700 rounded-full px-3 py-1 text-xs">
                      {selectedActivities.length} themes matched
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {recommendation.destination}
                </h3>
                
                <p className="text-base text-gray-600 mb-4 italic leading-relaxed">
                  {recommendation.description}
                </p>
                
                <p className="text-2xl font-bold text-green-600 mb-6">
                  {recommendation.price}
                </p>
                
                <div className="space-y-2 mb-6">
                  {recommendation.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 text-base rounded-xl shadow-md">
                  Begin Your Journey
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};

export default AITripRecommender;
