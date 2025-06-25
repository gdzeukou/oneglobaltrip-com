
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, Globe } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedSection } from '@/components/ui/animated-section';

interface MapLocation {
  id: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  visaRequired: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  processingTime: string;
  price: number;
  flag: string;
}

const mockLocations: MapLocation[] = [
  { id: '1', country: 'Portugal', city: 'Lisbon', lat: 38.7223, lng: -9.1393, visaRequired: true, difficulty: 'easy', processingTime: '30-60 days', price: 899, flag: '🇵🇹' },
  { id: '2', country: 'Germany', city: 'Berlin', lat: 52.5200, lng: 13.4050, visaRequired: true, difficulty: 'medium', processingTime: '60-90 days', price: 1299, flag: '🇩🇪' },
  { id: '3', country: 'Canada', city: 'Toronto', lat: 43.6532, lng: -79.3832, visaRequired: true, difficulty: 'easy', processingTime: '5-10 days', price: 249, flag: '🇨🇦' },
  { id: '4', country: 'United Kingdom', city: 'London', lat: 51.5074, lng: -0.1278, visaRequired: true, difficulty: 'medium', processingTime: '10-15 days', price: 399, flag: '🇬🇧' },
  { id: '5', country: 'France', city: 'Paris', lat: 48.8566, lng: 2.3522, visaRequired: true, difficulty: 'medium', processingTime: '7-14 days', price: 299, flag: '🇫🇷' },
];

export const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);

  useEffect(() => {
    const filtered = mockLocations.filter(loc => 
      loc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <AnimatedSection className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Explore Visa Destinations</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive map showing visa requirements and processing times worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 h-96">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
                {/* Search Bar */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Map Points */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-2xl">
                    {filteredLocations.map((location, index) => (
                      <motion.div
                        key={location.id}
                        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                          selectedLocation?.id === location.id ? 'z-20' : 'z-10'
                        }`}
                        style={{
                          left: `${((location.lng + 180) / 360) * 100}%`,
                          top: `${((90 - location.lat) / 180) * 100}%`,
                        }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setSelectedLocation(location)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`w-4 h-4 rounded-full ${
                          location.difficulty === 'easy' ? 'bg-green-500' :
                          location.difficulty === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                        } shadow-lg pulse`}>
                          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap">
                            {location.flag}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Easy (Quick processing)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Medium (Standard processing)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span>Hard (Complex requirements)</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Location Details */}
          <div className="space-y-4">
            {selectedLocation ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <GlassCard className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{selectedLocation.flag}</div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedLocation.country}</h3>
                    <p className="text-gray-600">{selectedLocation.city}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedLocation.difficulty)}`}>
                        {selectedLocation.difficulty.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Processing Time:</span>
                      <span className="font-semibold">{selectedLocation.processingTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Starting Price:</span>
                      <span className="font-bold text-lg text-blue-600">${selectedLocation.price}</span>
                    </div>

                    <div className="pt-4 border-t border-white/20">
                      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Start Application
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="p-6 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Destination</h3>
                <p className="text-gray-600">Click on any point on the map to see visa requirements and pricing</p>
              </GlassCard>
            )}

            {/* Quick Stats */}
            <GlassCard className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Destinations:</span>
                  <span className="font-medium">{filteredLocations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Easy Processing:</span>
                  <span className="font-medium text-green-600">
                    {filteredLocations.filter(l => l.difficulty === 'easy').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Price:</span>
                  <span className="font-medium">
                    ${Math.round(filteredLocations.reduce((acc, l) => acc + l.price, 0) / filteredLocations.length)}
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default InteractiveMap;
