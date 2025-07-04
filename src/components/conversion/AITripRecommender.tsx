import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Compass, Calendar, DollarSign, Users } from 'lucide-react';

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

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Your Soul's Compass
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your heart's desire and life's rhythm, we'll recommend the journey that calls to you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Mood Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                What does your soul crave?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedMood === mood.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {mood.icon}
                      <span className="font-medium">{mood.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{mood.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Investment in your transformation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedBudget === budget.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{budget.label}</span>
                      <Badge variant="outline">{budget.tier}</Badge>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button
            onClick={generateRecommendation}
            disabled={!selectedMood || !selectedBudget || isGenerating}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 animate-spin" />
                Consulting your soul's compass...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Reveal My Perfect Journey
              </div>
            )}
          </Button>
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={recommendation.image}
                  alt={recommendation.destination}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    {recommendation.tier}
                  </Badge>
                  <Badge variant="outline">{recommendation.mood}</Badge>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {recommendation.destination}
                </h3>
                
                <p className="text-lg text-gray-600 mb-4 italic">
                  {recommendation.description}
                </p>
                
                <p className="text-2xl font-bold text-green-600 mb-6">
                  {recommendation.price}
                </p>
                
                <div className="space-y-2 mb-6">
                  {recommendation.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                  Begin This Transformation
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