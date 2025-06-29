import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';

export interface PackagesGridProps {
  packages: Package[];
  onClearFilters: () => void;
}

const PackagesGrid: React.FC<PackagesGridProps> = ({ packages, onClearFilters }) => {
  if (packages.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-gray-50 rounded-lg p-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all packages.
            </p>
            <Button onClick={onClearFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            All Packages ({packages.length})
          </h2>
          {packages.length > 0 && (
            <Button variant="outline" onClick={onClearFilters}>
              Reset Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">
                    {pkg.category}
                  </Badge>
                </div>
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
                {pkg.featured && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-yellow-500 text-black">
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{pkg.title}</h3>
                  <div className="flex items-center ml-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{pkg.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{pkg.location}</span>
                  <Clock className="h-4 w-4 ml-4 mr-1" />
                  <span>{pkg.duration}</span>
                </div>

                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{pkg.description}</p>
                
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {pkg.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{pkg.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold text-blue-600">${pkg.price}</span>
                      <span className="text-gray-600 text-sm ml-1">per person</span>
                    </div>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Link to={`/packages/${pkg.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t text-xs text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>{pkg.reviews} reviews</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesGrid;
