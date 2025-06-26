
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
  const isMultiCountry = pkg.countries && pkg.countries.length > 1;
  const displayCountry = isMultiCountry ? `${pkg.countries?.length} Countries` : pkg.country;

  return (
    <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="relative">
        {/* Simple header with icon and country info */}
        <div className="w-full h-48 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center relative overflow-hidden">
          <div className="text-center text-white">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-3 mx-auto w-fit">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-bold mb-1">{pkg.country.split(',')[0]}</h4>
            <p className="text-slate-200 text-sm">{pkg.duration}</p>
          </div>
        </div>
        
        {/* Simple badges */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-white text-slate-900 font-bold shadow-lg">
            From ${pkg.price.toLocaleString()}
          </Badge>
        </div>
        
        {pkg.originalPrice && (
          <div className="absolute top-4 right-4 mt-10">
            <Badge variant="outline" className="bg-white/90 text-gray-600 line-through text-xs">
              ${pkg.originalPrice.toLocaleString()}
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium shadow-lg">
          {pkg.duration}
        </div>
        
        <button className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-300" />
        </button>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{pkg.title.split(' | ')[0]}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-600">{pkg.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{pkg.description}</p>
        
        {/* Clean info sections */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{pkg.duration}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{displayCountry}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{pkg.visasRequired.join(', ')}</span>
          </div>
        </div>
        
        {/* Simple highlights */}
        <div className="space-y-2 mb-6">
          {pkg.highlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{highlight}</span>
            </div>
          ))}
        </div>
        
        {/* Simple CTA button */}
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link to={`/packages/${pkg.id}`} className="flex items-center justify-center space-x-2">
            <span>Explore Package</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
