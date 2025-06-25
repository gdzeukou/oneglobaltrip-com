
import { Calendar, MapPin, Users, Star, Plane, Train, Award, Shield } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Enhanced Image Section */}
      <div className="relative group">
        <div className="w-full h-80 lg:h-96 rounded-2xl bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 flex items-center justify-center relative overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500">
          {/* Enhanced background patterns */}
          <div className="absolute inset-0">
            <div className="absolute top-8 right-8 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-8 left-8 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-xl" />
          </div>
          
          {/* Premium badge */}
          {isMultiCountry && (
            <div className="absolute bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg backdrop-blur-sm">
              <Plane className="h-4 w-4" />
              <Train className="h-4 w-4" />
              <span>Multi-Country Experience</span>
            </div>
          )}
          
          {/* Main content */}
          <div className="relative z-10 text-center text-white group-hover:scale-105 transition-transform duration-500">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-3xl mb-6 mx-auto w-fit group-hover:bg-white/20 transition-colors duration-300">
              <MapPin className="h-12 w-12 text-amber-300 group-hover:text-amber-200 transition-colors duration-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-200 transition-colors duration-300">{packageData.country}</h3>
            <p className="text-blue-200 text-lg group-hover:text-white/90 transition-colors duration-300">{packageData.duration}</p>
          </div>
        </div>
        
        {/* Enhanced price badges */}
        <div className="absolute top-6 right-6 space-y-2">
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg px-6 py-3 shadow-lg hover:shadow-amber-500/25 transition-shadow duration-300">
            From ${packageData.price.toLocaleString()}
          </Badge>
          {packageData.originalPrice && (
            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-gray-600 line-through text-sm px-4 py-2 block">
              ${packageData.originalPrice.toLocaleString()}
            </Badge>
          )}
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{packageData.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed">{packageData.description}</p>
        </div>
        
        {/* Enhanced info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors duration-300">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <p className="font-semibold text-blue-900">Duration</p>
            </div>
            <p className="text-blue-700 font-medium">{packageData.duration}</p>
          </div>
          
          <div className="group p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors duration-300">
                <MapPin className="h-5 w-5 text-emerald-600" />
              </div>
              <p className="font-semibold text-emerald-900">Countries</p>
            </div>
            <p className="text-emerald-700 font-medium">{isMultiCountry ? `${packageData.countries?.length} Countries` : packageData.country}</p>
          </div>
          
          <div className="group p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors duration-300">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-semibold text-purple-900">Ideal For</p>
            </div>
            <p className="text-purple-700 font-medium">Couples, First-Time Europe</p>
          </div>
          
          <div className="group p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 hover:from-amber-100 hover:to-orange-100 transition-all duration-300 hover:scale-105">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-amber-500/10 rounded-full group-hover:bg-amber-500/20 transition-colors duration-300">
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <p className="font-semibold text-amber-900">Rating</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-amber-700 font-medium">{packageData.rating}/5 ({packageData.reviews} reviews)</span>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
            <Shield className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">100% Secure Booking</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-200">
            <Award className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Premium Experience</span>
          </div>
        </div>

        {/* Enhanced CTA */}
        <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xl py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <Link to={`/booking?package=${packageData.id}`} className="flex items-center justify-center space-x-3">
            <Calendar className="h-6 w-6" />
            <span>Start Planning Your Dream Trip</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PackageDetailsHero;
