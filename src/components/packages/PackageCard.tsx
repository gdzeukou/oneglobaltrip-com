
import { MapPin, Calendar, Users, Star, Heart, ArrowRight, Plane, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';
import OptimizedImage from '@/components/ui/optimized-image';

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  // Enhanced destination-specific images
  const getDestinationImage = (countryName: string, originalImage: string) => {
    const countryImages = {
      'France': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      'Italy': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop&crop=center',
      'Spain': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&h=600&fit=crop&crop=center',
      'Germany': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&crop=center',
      'Netherlands': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop&crop=center',
      'United Kingdom': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
      'Switzerland': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center',
      'Austria': 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop&crop=center',
      'Portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop&crop=center',
      'Greece': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop&crop=center'
    };
    
    return countryImages[countryName as keyof typeof countryImages] || originalImage;
  };

  // Determine if this is a multi-country package
  const isMultiCountry = pkg.countries && pkg.countries.length > 1;
  const displayCountry = isMultiCountry ? `${pkg.countries?.length} Countries` : pkg.country;

  return (
    <Card className="overflow-hidden hover-lift group card-hover bg-white shadow-lg">
      <div className="relative">
        <OptimizedImage
          src={getDestinationImage(pkg.country.split(',')[0], pkg.image)}
          alt={pkg.title}
          className="w-full h-64 group-hover:scale-110 transition-transform duration-500"
          overlay
          overlayColor="bg-black/10"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-500 text-blue-900 font-bold">
            From ${pkg.price.toLocaleString()}
          </Badge>
        </div>
        {pkg.originalPrice && (
          <div className="absolute top-4 right-4 mt-8">
            <Badge variant="outline" className="bg-white/90 text-gray-600 line-through text-xs">
              ${pkg.originalPrice.toLocaleString()}
            </Badge>
          </div>
        )}
        {isMultiCountry && (
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Plane className="h-3 w-3" />
            <Train className="h-3 w-3" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
          {pkg.duration}
        </div>
        <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors hover-lift">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900">{pkg.title.split(' | ')[0]}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{pkg.rating}</span>
            <span className="text-sm text-gray-500">({pkg.reviews})</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{displayCountry}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Visas: {pkg.visasRequired.join(', ')}</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <p className="text-sm font-medium text-gray-900">Included:</p>
          {pkg.highlights.slice(0, 2).map((highlight, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-green-600 font-bold">✓</span>
              <span>{highlight}</span>
            </div>
          ))}
          {pkg.specialFeatures.slice(0, 1).map((feature, index) => (
            <div key={index} className="flex items-start space-x-2 text-sm text-gray-600">
              <span className="text-yellow-500 font-bold">★</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        <Button asChild className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 hover-lift">
          <Link to={`/booking?package=${pkg.id}`}>
            Start Planning
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
