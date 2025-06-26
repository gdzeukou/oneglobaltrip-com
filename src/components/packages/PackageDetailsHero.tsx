
import { Calendar, MapPin, Users, Star, Plane, Train } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package } from '@/types/package';

interface PackageDetailsHeroProps {
  packageData: Package;
}

const PackageDetailsHero = ({ packageData }: PackageDetailsHeroProps) => {
  const isMultiCountry = packageData.countries && packageData.countries.length > 1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
      <div className="relative">
        <div className="w-full h-64 sm:h-80 lg:h-96 rounded-lg bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 flex items-center justify-center relative overflow-hidden">
          {/* Background patterns */}
          <div className="absolute inset-0">
            <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-400/10 rounded-full blur-xl" />
          </div>
          {isMultiCountry && (
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1 sm:space-x-2">
              <Plane className="h-3 w-3 sm:h-4 sm:w-4" />
              <Train className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Multi-Country</span>
            </div>
          )}
          <div className="relative z-10 text-center text-white">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-xl font-bold">{packageData.country}</h3>
            <p className="text-blue-200">{packageData.duration}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-500 text-blue-900 font-bold text-sm sm:text-lg px-2 sm:px-4 py-1 sm:py-2">
            From ${packageData.price.toLocaleString()}
          </Badge>
        </div>
        {packageData.originalPrice && (
          <div className="absolute top-4 right-4 mt-8 sm:mt-12">
            <Badge variant="outline" className="bg-white/90 text-gray-600 line-through text-xs sm:text-sm">
              ${packageData.originalPrice.toLocaleString()}
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-4 lg:space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{packageData.title}</h1>
        <p className="text-lg sm:text-xl text-gray-600">{packageData.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm sm:text-base">Duration</p>
              <p className="text-gray-600 text-sm sm:text-base">{packageData.duration}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm sm:text-base">Countries</p>
              <p className="text-gray-600 text-sm sm:text-base">{isMultiCountry ? `${packageData.countries?.length} Countries` : packageData.country}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm sm:text-base">Ideal For</p>
              <p className="text-gray-600 text-sm sm:text-base">Couples, First-Time Europe</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm sm:text-base">Rating</p>
              <p className="text-gray-600 text-sm sm:text-base">{packageData.rating}/5 ({packageData.reviews} reviews)</p>
            </div>
          </div>
        </div>

        <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
          <Link to={`/booking?package=${packageData.id}`}>
            Start Planning Your Trip
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PackageDetailsHero;
