
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, MapPin, Calendar, Users, Star } from 'lucide-react';

const SchengenPackages = () => {
  const packages = [
    {
      id: 1,
      name: 'France Explorer Trip',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      price: '$2,899',
      originalPrice: '$3,299',
      duration: '8 Days / 7 Nights',
      destinations: ['Paris', 'Lyon', 'Nice'],
      includes: [
        'Round-trip flights',
        '4-star hotel accommodations', 
        'Daily breakfast',
        'Guided city tours',
        'Schengen visa assistance',
        'Travel insurance'
      ],
      highlights: ['Eiffel Tower skip-the-line', 'Seine River cruise', 'French Riviera day trip'],
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      name: 'Amsterdam City + Tulip Season',
      image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop&crop=center',
      price: '$2,299',
      originalPrice: '$2,699',
      duration: '6 Days / 5 Nights',
      destinations: ['Amsterdam', 'Keukenhof Gardens', 'Zaanse Schans'],
      includes: [
        'Round-trip flights',
        'Boutique hotel in city center',
        'Daily breakfast',
        'Canal cruise',
        'Schengen visa assistance',
        'Bike rental included'
      ],
      highlights: ['Tulip season access', 'Anne Frank House tour', 'Dutch cheese tasting'],
      rating: 4.8,
      reviews: 89,
      badge: 'Seasonal'
    },
    {
      id: 3,
      name: 'Italy Cultural Getaway',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop&crop=center',
      price: '$3,499',
      originalPrice: '$3,999',
      duration: '10 Days / 9 Nights',
      destinations: ['Rome', 'Florence', 'Venice'],
      includes: [
        'Round-trip flights',
        'Historic hotel accommodations',
        'Daily breakfast + 3 dinners',
        'High-speed train tickets',
        'Schengen visa assistance',
        'Professional guide'
      ],
      highlights: ['Vatican private tour', 'Gondola ride in Venice', 'Tuscany wine tasting'],
      rating: 4.9,
      reviews: 156,
      badge: 'Best Seller'
    },
    {
      id: 4,
      name: 'Multi-Country European Adventure',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
      price: '$4,299',
      originalPrice: '$4,899',
      duration: '14 Days / 13 Nights',
      destinations: ['Paris', 'Amsterdam', 'Berlin', 'Prague'],
      includes: [
        'Round-trip flights',
        '3-4 star hotels',
        'Daily breakfast',
        'Inter-city transportation',
        'Schengen visa assistance',
        'City walking tours'
      ],
      highlights: ['4 countries in 2 weeks', 'Eurail pass included', 'Local food experiences'],
      rating: 4.7,
      reviews: 203
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Travel Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete travel experiences with Schengen visa assistance included
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
              {pkg.badge && (
                <Badge className="absolute top-4 right-4 z-10 bg-orange-500 text-white">
                  {pkg.badge}
                </Badge>
              )}
              
              {/* Image */}
              <div className="relative h-64">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              {/* Content */}
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">{pkg.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {pkg.rating} ({pkg.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{pkg.price}</div>
                    <div className="text-sm text-gray-500 line-through">{pkg.originalPrice}</div>
                  </div>
                </div>

                {/* Destinations */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="font-semibold text-gray-800">Destinations:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.destinations.map((dest, index) => (
                      <Badge key={index} variant="outline">{dest}</Badge>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Package Highlights:</h4>
                  <ul className="space-y-1">
                    {pkg.highlights.map((highlight, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Includes */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">What's Included:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {pkg.includes.map((item, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-blue-500 mt-1">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" style={{ backgroundColor: '#FF6B35' }}>
                    <Plane className="h-4 w-4 mr-2" />
                    Request This Trip
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchengenPackages;
