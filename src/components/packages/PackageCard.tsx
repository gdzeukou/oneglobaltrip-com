
import { MapPin, Calendar, Users, Star, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift group">
      <div className="relative">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-500 text-blue-900 font-bold">
            From ${pkg.price.toLocaleString()}
          </Badge>
        </div>
        <button className="absolute top-4 left-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
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
            <span>{pkg.country}</span>
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
        
        <Button asChild className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
          <Link to={`/booking?package=${pkg.id}`}>
            Book This Package
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
