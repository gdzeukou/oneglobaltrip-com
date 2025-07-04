import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Snowflake, Sun, Leaf, TreePine, Plane, Shield } from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  visa: 'required' | 'visa-free' | 'visa-on-arrival';
  visaProcessTime: string;
  bestSeason: 'spring' | 'summer' | 'autumn' | 'winter' | 'year-round';
  mood: 'adventure' | 'romantic' | 'cultural' | 'relaxation';
  image: string;
  description: string;
  temperature: string;
  highlights: string[];
}

const InteractiveWorldMap = () => {
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedVisa, setSelectedVisa] = useState<string>('all');
  const [selectedMood, setSelectedMood] = useState<string>('all');

  const destinations: Destination[] = [
    {
      id: 'santorini',
      name: 'Santorini',
      country: 'Greece',
      continent: 'Europe',
      visa: 'required',
      visaProcessTime: '5-7 days',
      bestSeason: 'summer',
      mood: 'romantic',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
      description: 'Where Greek gods chose to watch the world end',
      temperature: '24-28°C',
      highlights: ['Iconic Blue Domes', 'Sunset Views', 'Wine Tastings']
    },
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonesia',
      continent: 'Asia',
      visa: 'visa-on-arrival',
      visaProcessTime: 'On arrival',
      bestSeason: 'summer',
      mood: 'relaxation',
      image: 'https://images.unsplash.com/photo-1544550285-f813152fb2fd?w=400&h=300&fit=crop',
      description: 'Where ancient wisdom meets tropical paradise',
      temperature: '26-30°C',
      highlights: ['Temple Visits', 'Beach Resorts', 'Yoga Retreats']
    },
    {
      id: 'iceland',
      name: 'Reykjavik',
      country: 'Iceland',
      continent: 'Europe',
      visa: 'required',
      visaProcessTime: '7-10 days',
      bestSeason: 'winter',
      mood: 'adventure',
      image: 'https://images.unsplash.com/photo-1539066033336-9ed2c8a5eb51?w=400&h=300&fit=crop',
      description: 'Where fire meets ice and courage finds its voice',
      temperature: '-2-4°C',
      highlights: ['Northern Lights', 'Glacier Tours', 'Hot Springs']
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      continent: 'Asia',
      visa: 'required',
      visaProcessTime: '3-5 days',
      bestSeason: 'spring',
      mood: 'cultural',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      description: 'Where ancient wisdom meets tomorrow\'s dreams',
      temperature: '15-22°C',
      highlights: ['Cherry Blossoms', 'Temple Visits', 'Modern Culture']
    },
    {
      id: 'machu-picchu',
      name: 'Machu Picchu',
      country: 'Peru',
      continent: 'South America',
      visa: 'visa-free',
      visaProcessTime: 'Not required',
      bestSeason: 'autumn',
      mood: 'adventure',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400&h=300&fit=crop',
      description: 'Where ancient civilizations whisper their secrets',
      temperature: '12-18°C',
      highlights: ['Inca Trail', 'Ancient Ruins', 'Mountain Views']
    },
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      continent: 'Europe',
      visa: 'required',
      visaProcessTime: '5-7 days',
      bestSeason: 'spring',
      mood: 'romantic',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
      description: 'Fall in love with the city that invented romance',
      temperature: '15-20°C',
      highlights: ['Eiffel Tower', 'Art Museums', 'Café Culture']
    }
  ];

  const seasons = [
    { id: 'spring', label: 'Spring', icon: <Leaf className="h-4 w-4" />, color: 'text-green-600' },
    { id: 'summer', label: 'Summer', icon: <Sun className="h-4 w-4" />, color: 'text-yellow-600' },
    { id: 'autumn', label: 'Autumn', icon: <TreePine className="h-4 w-4" />, color: 'text-orange-600' },
    { id: 'winter', label: 'Winter', icon: <Snowflake className="h-4 w-4" />, color: 'text-blue-600' }
  ];

  const visaTypes = [
    { id: 'visa-free', label: 'Visa Free', color: 'bg-green-100 text-green-800' },
    { id: 'visa-on-arrival', label: 'Visa on Arrival', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'required', label: 'Visa Required', color: 'bg-red-100 text-red-800' }
  ];

  const moods = [
    { id: 'adventure', label: 'Adventure', color: 'bg-orange-100 text-orange-800' },
    { id: 'romantic', label: 'Romantic', color: 'bg-pink-100 text-pink-800' },
    { id: 'cultural', label: 'Cultural', color: 'bg-purple-100 text-purple-800' },
    { id: 'relaxation', label: 'Relaxation', color: 'bg-blue-100 text-blue-800' }
  ];

  const continents = ['Europe', 'Asia', 'South America', 'North America', 'Africa', 'Oceania'];

  const filteredDestinations = destinations.filter(dest => {
    return (
      (selectedContinent === 'all' || dest.continent === selectedContinent) &&
      (selectedSeason === 'all' || dest.bestSeason === selectedSeason) &&
      (selectedVisa === 'all' || dest.visa === selectedVisa) &&
      (selectedMood === 'all' || dest.mood === selectedMood)
    );
  });

  const getVisaColor = (visa: string) => {
    const type = visaTypes.find(v => v.id === visa);
    return type?.color || 'bg-gray-100 text-gray-800';
  };

  const getMoodColor = (mood: string) => {
    const moodType = moods.find(m => m.id === mood);
    return moodType?.color || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Your Next Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover destinations that speak to your soul, filtered by season, visa requirements, and the mood you seek
          </p>
        </div>

        <Tabs defaultValue="filter" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="filter">Discover by Filters</TabsTrigger>
            <TabsTrigger value="season">Explore by Season</TabsTrigger>
          </TabsList>

          <TabsContent value="filter">
            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Continent</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <select
                    value={selectedContinent}
                    onChange={(e) => setSelectedContinent(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Continents</option>
                    {continents.map(continent => (
                      <option key={continent} value={continent}>{continent}</option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Best Season</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Seasons</option>
                    {seasons.map(season => (
                      <option key={season.id} value={season.id}>{season.label}</option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Visa Status</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <select
                    value={selectedVisa}
                    onChange={(e) => setSelectedVisa(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Visa Types</option>
                    {visaTypes.map(visa => (
                      <option key={visa.id} value={visa.id}>{visa.label}</option>
                    ))}
                  </select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Travel Mood</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <select
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Moods</option>
                    {moods.map(mood => (
                      <option key={mood.id} value={mood.id}>{mood.label}</option>
                    ))}
                  </select>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <Card key={destination.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getVisaColor(destination.visa)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {destination.visa === 'visa-free' ? 'Visa Free' : 
                         destination.visa === 'visa-on-arrival' ? 'On Arrival' : 'Visa Required'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                      <Badge className={getMoodColor(destination.mood)}>
                        {destination.mood}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4 italic">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{destination.country}, {destination.continent}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>Visa: {destination.visaProcessTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Sun className="h-4 w-4 text-gray-500" />
                        <span>{destination.temperature}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="text-sm text-gray-600">• {highlight}</div>
                      ))}
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Plane className="h-4 w-4 mr-2" />
                      Plan This Journey
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="season">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {seasons.map((season) => {
                const seasonDestinations = destinations.filter(d => d.bestSeason === season.id);
                return (
                  <Card key={season.id} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <CardTitle className="flex items-center gap-2">
                        <span className={season.color}>{season.icon}</span>
                        {season.label}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {seasonDestinations.map((dest) => (
                          <div key={dest.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                            <div className="font-medium">{dest.name}</div>
                            <div className="text-sm text-gray-600">{dest.country}</div>
                            <div className="text-xs text-gray-500 mt-1">{dest.temperature}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default InteractiveWorldMap;