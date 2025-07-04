import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Heart, Compass, Calendar, DollarSign, Users, Zap, Brain, Wand2 } from 'lucide-react';

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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Innovative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Floating tech elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-32 left-32 w-4 h-4 bg-orange-400 rounded-full animate-bounce" />
        <div className="absolute top-48 right-40 w-3 h-3 bg-white rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-blue-400 rotate-45 animate-bounce" />
        <div className="absolute bottom-48 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          {/* New AI Soul Compass branding */}
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-4 animate-pulse">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-orange-600 to-red-700 text-white px-6 py-2 text-lg font-bold border-0">
              <Zap className="h-5 w-5 mr-2" />
              NEW AI TECHNOLOGY
            </Badge>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Try Our New{' '}
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
              AI Soul Compass
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            Revolutionary AI technology that reads your heart's desire and life's rhythm to recommend the perfect journey that calls to your soul
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Wand2 className="h-5 w-5 text-orange-400" />
              <span className="text-white font-medium">AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Personalized</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Compass className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">Soul-Matched</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Mood Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 bg-red-500 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                What does your soul crave?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                      selectedMood === mood.id
                        ? 'border-orange-500 bg-orange-500/20 shadow-lg shadow-orange-500/25'
                        : 'border-white/30 bg-white/5 hover:border-white/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${selectedMood === mood.id ? 'bg-orange-500' : 'bg-white/20'}`}>
                        {mood.icon}
                      </div>
                      <span className="font-bold text-white">{mood.label}</span>
                    </div>
                    <p className="text-sm text-slate-300">{mood.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Budget Selection */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 bg-green-500 rounded-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                Investment in your transformation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budgetOptions.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setSelectedBudget(budget.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                      selectedBudget === budget.id
                        ? 'border-green-500 bg-green-500/20 shadow-lg shadow-green-500/25'
                        : 'border-white/30 bg-white/5 hover:border-white/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{budget.label}</span>
                      <Badge 
                        variant="outline" 
                        className={selectedBudget === budget.id ? 'border-green-400 text-green-400' : 'border-white/50 text-white'}
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

        {/* Enhanced Generate Button */}
        <div className="text-center mb-12">
          <Button
            onClick={generateRecommendation}
            disabled={!selectedMood || !selectedBudget || isGenerating}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-12 py-6 text-xl rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105 border-0"
          >
            {isGenerating ? (
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 animate-spin" />
                AI Soul Compass is analyzing your essence...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Compass className="h-6 w-6" />
                <Sparkles className="h-6 w-6" />
                Reveal My Soul's Journey
                <Wand2 className="h-6 w-6" />
              </div>
            )}
          </Button>
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <Card className="overflow-hidden shadow-2xl border-0 bg-white/10 backdrop-blur-md">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img
                  src={recommendation.image}
                  alt={recommendation.destination}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                    {recommendation.tier}
                  </Badge>
                  <Badge variant="outline" className="border-white/50 text-white">
                    {recommendation.mood}
                  </Badge>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-3">
                  {recommendation.destination}
                </h3>
                
                <p className="text-lg text-slate-300 mb-4 italic">
                  {recommendation.description}
                </p>
                
                <p className="text-2xl font-bold text-green-400 mb-6">
                  {recommendation.price}
                </p>
                
                <div className="space-y-2 mb-6">
                  {recommendation.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-orange-400" />
                      <span className="text-slate-300">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 text-lg">
                  Begin This Soul Transformation
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
