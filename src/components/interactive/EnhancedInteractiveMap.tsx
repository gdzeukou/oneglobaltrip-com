
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Search, Globe, Plane, Clock, DollarSign } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  description: string;
  route: string;
}

const visaLocations: MapLocation[] = [
  { 
    id: '1', 
    country: 'Portugal', 
    city: 'Lisbon', 
    lat: 38.7223, 
    lng: -9.1393, 
    visaRequired: true, 
    difficulty: 'easy', 
    processingTime: '30-60 days', 
    price: 899, 
    flag: '🇵🇹',
    description: 'Golden Visa program with real estate investment options',
    route: '/visas/long-stay/portugal'
  },
  { 
    id: '2', 
    country: 'Germany', 
    city: 'Berlin', 
    lat: 52.5200, 
    lng: 13.4050, 
    visaRequired: true, 
    difficulty: 'medium', 
    processingTime: '60-90 days', 
    price: 1299, 
    flag: '🇩🇪',
    description: 'EU Blue Card and work visa opportunities',
    route: '/visas/long-stay/germany'
  },
  { 
    id: '3', 
    country: 'Canada', 
    city: 'Toronto', 
    lat: 43.6532, 
    lng: -79.3832, 
    visaRequired: true, 
    difficulty: 'easy', 
    processingTime: '5-10 days', 
    price: 249, 
    flag: '🇨🇦',
    description: 'Tourist and business visa processing',
    route: '/visas/short-stay/canada'
  },
  { 
    id: '4', 
    country: 'United Kingdom', 
    city: 'London', 
    lat: 51.5074, 
    lng: -0.1278, 
    visaRequired: true, 
    difficulty: 'medium', 
    processingTime: '10-15 days', 
    price: 399, 
    flag: '🇬🇧',
    description: 'Standard visitor and business visas',
    route: '/visas/short-stay/uk'
  },
  { 
    id: '5', 
    country: 'France', 
    city: 'Paris', 
    lat: 48.8566, 
    lng: 2.3522, 
    visaRequired: true, 
    difficulty: 'medium', 
    processingTime: '7-14 days', 
    price: 299, 
    flag: '🇫🇷',
    description: 'Schengen visa for EU travel',
    route: '/visas/short-stay/schengen'
  },
  { 
    id: '6', 
    country: 'United Arab Emirates', 
    city: 'Dubai', 
    lat: 25.2048, 
    lng: 55.2708, 
    visaRequired: true, 
    difficulty: 'easy', 
    processingTime: '3-5 days', 
    price: 199, 
    flag: '🇦🇪',
    description: 'Fast tourist visa processing',
    route: '/visas/short-stay/uae'
  },
  { 
    id: '7', 
    country: 'India', 
    city: 'Mumbai', 
    lat: 19.0760, 
    lng: 72.8777, 
    visaRequired: true, 
    difficulty: 'easy', 
    processingTime: '2-4 days', 
    price: 149, 
    flag: '🇮🇳',
    description: 'e-Visa and traditional visa options',
    route: '/visas/short-stay/india'
  },
  { 
    id: '8', 
    country: 'Norway', 
    city: 'Oslo', 
    lat: 59.9139, 
    lng: 10.7522, 
    visaRequired: true, 
    difficulty: 'medium', 
    processingTime: '45-90 days', 
    price: 1199, 
    flag: '🇳🇴',
    description: 'Work and residence permits',
    route: '/visas/long-stay/norway'
  }
];

export const EnhancedInteractiveMap = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState(visaLocations);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  useEffect(() => {
    const filtered = visaLocations.filter(loc => 
      loc.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-700 bg-green-100 border-green-200';
      case 'medium': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'hard': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getPointColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500 shadow-green-500/50';
      case 'medium': return 'bg-yellow-500 shadow-yellow-500/50';
      case 'hard': return 'bg-red-500 shadow-red-500/50';
      default: return 'bg-gray-500 shadow-gray-500/50';
    }
  };

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const handleApplyNow = () => {
    if (selectedLocation) {
      navigate(selectedLocation.route);
    }
  };

  return (
    <AnimatedSection className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Globe className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Explore Global Visa Destinations</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Interactive map showing visa requirements, processing times, and expert guidance for destinations worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Map Container */}
          <div className="lg:col-span-2">
            <GlassCard className="p-6 h-[500px]">
              <div className="relative w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 rounded-lg overflow-hidden">
                {/* Search Bar */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search destinations, countries, or visa types..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/95 backdrop-blur-sm rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                    />
                  </div>
                </div>

                {/* World Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 1000 500" className="w-full h-full">
                    <path
                      d="M100,200 Q150,150 200,200 T300,200 Q350,180 400,200 T500,200 Q550,220 600,200 T700,200 Q750,180 800,200 T900,200"
                      stroke="#1e40af"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                {/* Map Points */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-4xl">
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
                        whileHover={{ scale: 1.3 }}
                        onClick={() => handleLocationClick(location)}
                        onMouseEnter={() => setHoveredLocation(location.id)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`relative`}>
                          <div className={`w-4 h-4 rounded-full ${getPointColor(location.difficulty)} shadow-lg animate-pulse`}>
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg">
                              {location.flag}
                            </div>
                            {hoveredLocation === location.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border min-w-32 text-center"
                              >
                                <div className="text-xs font-semibold text-gray-900">{location.country}</div>
                                <div className="text-xs text-gray-600">${location.price}</div>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Enhanced Legend */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Processing Difficulty</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2 shadow-sm"></div>
                      <span>Easy (Quick processing)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 shadow-sm"></div>
                      <span>Medium (Standard processing)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2 shadow-sm"></div>
                      <span>Complex (Extended processing)</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Enhanced Location Details */}
          <div className="space-y-4">
            {selectedLocation ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                key={selectedLocation.id}
              >
                <GlassCard className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-2">{selectedLocation.flag}</div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedLocation.country}</h3>
                    <p className="text-gray-600">{selectedLocation.city}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{selectedLocation.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <Clock className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Processing</div>
                        <div className="font-semibold text-sm">{selectedLocation.processingTime}</div>
                      </div>
                      <div className="text-center">
                        <DollarSign className="h-5 w-5 text-gray-600 mx-auto mb-1" />
                        <div className="text-xs text-gray-600">Starting Price</div>
                        <div className="font-bold text-blue-600">${selectedLocation.price}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedLocation.difficulty)}`}>
                        {selectedLocation.difficulty.toUpperCase()} PROCESS
                      </span>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-white/20">
                      <Button 
                        onClick={handleApplyNow} 
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Plane className="h-4 w-4 mr-2" />
                        Start Application
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/get-started')}
                      >
                        <Navigation className="h-4 w-4 mr-2" />
                        Get Free Consultation
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="p-6 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Explore Destinations</h3>
                <p className="text-gray-600 mb-4">
                  Click on any point on the map to see detailed visa requirements, processing times, and pricing information.
                </p>
                <div className="text-sm text-gray-500">
                  Use the search bar to find specific countries or visa types.
                </div>
              </GlassCard>
            )}

            {/* Enhanced Quick Stats */}
            <GlassCard className="p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                Quick Stats
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Destinations:</span>
                  <span className="font-medium">{filteredLocations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quick Processing:</span>
                  <span className="font-medium text-green-600">
                    {filteredLocations.filter(l => l.difficulty === 'easy').length} countries
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Price:</span>
                  <span className="font-medium">
                    ${Math.round(filteredLocations.reduce((acc, l) => acc + l.price, 0) / filteredLocations.length)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate:</span>
                  <span className="font-medium text-green-600">98.7%</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default EnhancedInteractiveMap;
