
import { MapPin, Calendar, Users, Star, Heart, ArrowRight, Plane, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  // Determine if this is a multi-country package
  const isMultiCountry = pkg.countries && pkg.countries.length > 1;
  const displayCountry = isMultiCountry ? `${pkg.countries?.length} Countries` : pkg.country;

  return (
    <Card className="overflow-hidden hover-lift group card-hover bg-white shadow-lg">
      <div className="relative">
        <div className="w-full h-64 bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-blue-700 flex items-center justify-center relative overflow-hidden group-hover:from-deep-blue-800 group-hover:to-blue-600 transition-all duration-500">
          <div className="absolute inset-0">
            <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl" />
          </div>
          <div className="relative z-10 text-center text-white">
            <MapPin className="h-12 w-12 mx-auto mb-3 text-yellow-400" />
            <h4 className="text-lg font-bold mb-1">{pkg.country.split(',')[0]}</h4>
            <p className="text-blue-200 text-sm">{pkg.duration}</p>
          </div>
        </div>
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
          <Link to={`/packages/${pkg.id}`}>
            View Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
