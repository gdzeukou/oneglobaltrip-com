
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, Users } from 'lucide-react';
import { Package } from '@/data/packages';

export interface FeaturedPackagesProps {
  packages: Package[];
}

const FeaturedPackages: React.FC<FeaturedPackagesProps> = ({ packages }) => {
  const featuredPackages = packages.filter(pkg => pkg.featured).slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPackages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{pkg.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{pkg.location}</span>
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  <span className="text-sm">{pkg.duration}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-gray-600 text-sm ml-1">per person</span>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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

export default FeaturedPackages;
