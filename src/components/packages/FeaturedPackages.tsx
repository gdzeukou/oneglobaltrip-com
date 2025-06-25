
import { MapPin, Calendar, Users, Star, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';
import OptimizedImage from '@/components/ui/optimized-image';

interface FeaturedPackagesProps {
  packages: Package[];
}

const FeaturedPackages = ({ packages }: FeaturedPackagesProps) => {
  // When packages are available, select the first 4 for featuring
  const featuredPackages = packages.slice(0, 4);

  // Show empty state while waiting for Europe Express packages
  if (packages.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-xl text-gray-600">Europe Express travel packages coming soon...</p>
          </div>
          
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-500 text-lg">Loading authentic European travel experiences...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
          <p className="text-xl text-gray-600">Handpicked European adventures with visa assistance included</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredPackages.map((pkg, index) => (
            <Card key={pkg.id} className="overflow-hidden hover-lift group bg-white shadow-lg card-hover animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
              <div className="relative">
                <OptimizedImage
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 group-hover:scale-110 transition-transform duration-500"
                  overlay
                  overlayColor="bg-black/10"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-yellow-500 text-blue-900 font-bold">
                    From ${pkg.price.toLocaleString()}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                  {pkg.duration}
                </div>
                <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors hover-lift">
                  <Heart className="h-4 w-4 text-gray-600" />
                </button>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{pkg.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{pkg.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{pkg.country}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-3 w-3" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                
                <Button asChild className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 hover-lift">
                  <Link to={`/booking?package=${pkg.id}`}>
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
