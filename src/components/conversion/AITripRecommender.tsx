
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Compass, Calendar, DollarSign, Users, Zap, Brain, Wand2, RefreshCw } from 'lucide-react';

interface MoodOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface Recommendation {
  destination: string;
  tier: 'Explore' | 'Elevate' | 'Escape';
  mood: string;
  description: string;
  price: string;
  image: string;
  highlights: string[];
}

const AITripRecommender = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const moods: MoodOption[] = [
    {
      id: 'adventure',
      label: 'Adventurous',
      icon: <Compass className="h-5 w-5" />,
      description: 'Seeking thrills and new experiences'
    },
    {
      id: 'romantic',
      label: 'Romantic',
      icon: <Heart className="h-5 w-5" />,
      description: 'Looking for intimacy and connection'
    },
    {
      id: 'cultural',
      label: 'Cultural',
      icon: <Users className="h-5 w-5" />,
      description: 'Eager to learn and immerse'
    },
    {
      id: 'relaxation',
      label: 'Tranquil',
      icon: <Sparkles className="h-5 w-5" />,
      description: 'Craving peace and restoration'
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
        description: 'Where fire meets ice and your courage finds its voice',
        price: 'From $2,400',
        image: 'https://images.unsplash.com/photo-1539066033336-9ed2c8a5eb51?w=800&h=600&fit=crop',
        highlights: ['Northern Lights Hunting', 'Glacier Hiking', 'Geothermal Hot Springs']
      },
      elevate: {
        destination: 'New Zealand',
        tier: 'Elevate',
        mood: 'Adventurous',
        description: 'Where Middle Earth becomes your playground',
        price: 'From $4,200',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        highlights: ['Private Helicopter Tours', 'Luxury Lodge Stays', 'Exclusive Access Adventures']
      },
      escape: {
        destination: 'Antarctic Peninsula',
        tier: 'Escape',
        mood: 'Adventurous',
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
        description: 'Where cobblestones whisper love stories',
        price: 'From $1,800',
        image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop',
        highlights: ['Castle Dinners', 'River Cruises', 'Historic Hotels']
      },
      elevate: {
        destination: 'Santorini',
        tier: 'Elevate',
        mood: 'Romantic',
        description: 'Where Greek gods chose to watch the world end',
        price: 'From $3,800',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
        highlights: ['Private Sunset Sailing', 'Caldera View Suites', 'Wine Cave Tastings']
      },
      escape: {
        destination: 'Bora Bora',
        tier: 'Escape',
        mood: 'Romantic',
        description: 'Where paradise was perfected just for two',
        price: 'From $7,200',
        image: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=800&h=600&fit=crop',
        highlights: ['Overwater Bungalows', 'Private Beach Picnics', 'Helicopter Proposals']
      }
    }
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
    setRecommendation(null);
    setIsGenerating(false);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background elements - made smaller */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100" />
      
      {/* Smaller geometric elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-40 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-40 left-40 w-32 h-32 bg-gray-50 rounded-full blur-2xl opacity-30" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          {/* Clean AI branding */}
          <div className="flex items-center justify-center mb-8">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mr-6 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-blue-600 text-white px-6 py-3 text-base font-semibold border-0 rounded-full">
              <Zap className="h-4 w-4 mr-2" />
              AI POWERED
            </Badge>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Introducing{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Soul Compass
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Advanced intelligence that understands your unique travel preferences and curates perfectly matched journeys
          </p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-gray-700 font-medium">Intelligent Matching</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-700 font-medium">Personalized Results</span>
            </div>
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-gray-700 font-medium">Instant Recommendations</span>
            </div>
          </div>

          {/* Refresh button */}
          {(selectedMood || selectedBudget || recommendation) && (
            <div className="mb-8">
              <Button
                onClick={resetSelections}
                variant="outline"
                className="bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 px-6 py-3 rounded-full transition-all duration-300"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mood Selection */}
          <Card className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-4 text-gray-900">
                <div className="p-3 bg-blue-600 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                What inspires your journey?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                      selectedMood === mood.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-xl ${selectedMood === mood.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                        {mood.icon}
                      </div>
                      <span className="font-semibold text-gray-900">{mood.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{mood.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Selection */}
          <Card className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <CardTitle className="flex items-center gap-4 text-gray-900">
                <div className="p-3 bg-green-600 rounded-xl">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                Investment in experiences
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`w-full p-6 rounded-2xl border-2 transition-all text-left hover:shadow-lg ${
                      selectedBudget === budget.id
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{budget.label}</span>
                      <Badge 
                        className={`rounded-full ${selectedBudget === budget.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}
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

        {/* Generate Button */}
        <div className="text-center mb-16">
          <Button
            onClick={generateRecommendation}
            disabled={!selectedMood || !selectedBudget || isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0"
          >
            {isGenerating ? (
              <div className="flex items-center gap-4">
                <Brain className="h-6 w-6 animate-spin" />
                AI is analyzing your preferences...
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Compass className="h-6 w-6" />
                Get My Perfect Match
                <Sparkles className="h-6 w-6" />
              </div>
            )}
          </Button>
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <Card className="overflow-hidden shadow-2xl border-0 bg-white rounded-3xl">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img
                  src={recommendation.image}
                  alt={recommendation.destination}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="md:w-1/2 p-12">
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-blue-600 text-white rounded-full px-4 py-2">
                    {recommendation.tier}
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-700 rounded-full px-4 py-2">
                    {recommendation.mood}
                  </Badge>
                </div>
                
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  {recommendation.destination}
                </h3>
                
                <p className="text-lg text-gray-600 mb-6 italic leading-relaxed">
                  {recommendation.description}
                </p>
                
                <p className="text-3xl font-bold text-green-600 mb-8">
                  {recommendation.price}
                </p>
                
                <div className="space-y-3 mb-8">
                  {recommendation.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg rounded-2xl shadow-lg">
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
