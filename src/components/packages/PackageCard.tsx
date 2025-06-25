
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
    <Card className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        <div className="w-full h-64 bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-blue-700 flex items-center justify-center relative overflow-hidden group-hover:from-deep-blue-800 group-hover:to-blue-600 transition-all duration-500">
          {/* Enhanced background patterns */}
          <div className="absolute inset-0">
            <div className="absolute top-4 right-4 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/5 rounded-full blur-xl" />
          </div>
          
          {/* Enhanced content with better animations */}
          <div className="relative z-10 text-center text-white transform group-hover:scale-110 transition-transform duration-500">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl mb-3 mx-auto w-fit group-hover:bg-white/20 transition-colors duration-300">
              <MapPin className="h-8 w-8 text-amber-300 group-hover:text-amber-200 transition-colors duration-300" />
            </div>
            <h4 className="text-lg font-bold mb-1 group-hover:text-amber-200 transition-colors duration-300">{pkg.country.split(',')[0]}</h4>
            <p className="text-blue-200 text-sm group-hover:text-white/90 transition-colors duration-300">{pkg.duration}</p>
          </div>
        </div>
        
        {/* Enhanced badges */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg group-hover:shadow-amber-500/25 transition-shadow duration-300">
            From ${pkg.price.toLocaleString()}
          </Badge>
        </div>
        
        {pkg.originalPrice && (
          <div className="absolute top-4 right-4 mt-10">
            <Badge variant="outline" className="bg-white/90 text-gray-600 line-through text-xs backdrop-blur-sm">
              ${pkg.originalPrice.toLocaleString()}
            </Badge>
          </div>
        )}
        
        {isMultiCountry && (
          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-2 rounded-full text-xs font-medium flex items-center space-x-2 shadow-lg backdrop-blur-sm">
            <Plane className="h-3 w-3" />
            <Train className="h-3 w-3" />
            <span className="hidden sm:inline">Multi-Country</span>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium shadow-lg">
          {pkg.duration}
        </div>
        
        {/* Enhanced heart button */}
        <button className="absolute top-4 left-4 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl">
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-300" />
        </button>
      </div>
      
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">{pkg.title.split(' | ')[0]}</h3>
          <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-full group-hover:bg-amber-100 transition-colors duration-300">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-amber-700">{pkg.rating}</span>
            <span className="text-sm text-amber-600">({pkg.reviews})</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">{pkg.description}</p>
        
        {/* Enhanced info grid */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
            <div className="p-2 bg-blue-500/10 rounded-full">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-800 uppercase tracking-wide">Duration</p>
              <p className="text-sm font-semibold text-blue-900">{pkg.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl group-hover:from-emerald-100 group-hover:to-teal-100 transition-colors duration-300">
            <div className="p-2 bg-emerald-500/10 rounded-full">
              <MapPin className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-emerald-800 uppercase tracking-wide">Destination</p>
              <p className="text-sm font-semibold text-emerald-900">{displayCountry}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl group-hover:from-purple-100 group-hover:to-pink-100 transition-colors duration-300">
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-purple-800 uppercase tracking-wide">Visas Required</p>
              <p className="text-sm font-semibold text-purple-900">{pkg.visasRequired.join(', ')}</p>
            </div>
          </div>
        </div>
        
        {/* Enhanced highlights section */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-semibold text-gray-900 flex items-center">
            <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-2"></span>
            What's Included
          </p>
          {pkg.highlights.slice(0, 2).map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 bg-green-50/50 rounded-lg group-hover:bg-green-100/50 transition-colors duration-300">
              <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">{highlight}</span>
            </div>
          ))}
          {pkg.specialFeatures.slice(0, 1).map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-2 bg-amber-50/50 rounded-lg group-hover:bg-amber-100/50 transition-colors duration-300">
              <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">★</span>
              </div>
              <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Enhanced CTA button */}
        <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group-hover:shadow-blue-500/25">
          <Link to={`/packages/${pkg.id}`} className="flex items-center justify-center space-x-2">
            <span>Explore Package</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </Button>
        
        {/* Hover Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 pointer-events-none" />
      </CardContent>
    </Card>
  );
};

export default PackageCard;
