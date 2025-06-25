
import { Search, Star, Globe, Award, Plane, Hotel, Ship, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PackagesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PackagesHero = ({ searchTerm, onSearchChange }: PackagesHeroProps) => {
  return (
    <section className="pt-20 relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 md:py-20 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 md:w-96 h-64 md:h-96 bg-amber-400/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-48 md:w-80 h-48 md:h-80 bg-emerald-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 md:w-96 h-72 md:h-96 bg-blue-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-32 left-32 w-4 h-4 bg-amber-400 rounded-full animate-bounce" />
        <div className="absolute top-48 right-40 w-3 h-3 bg-white rotate-45 animate-pulse" />
        <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-emerald-400 rotate-45 animate-bounce" />
        <div className="absolute bottom-48 right-1/3 w-3 h-3 bg-blue-300 rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Globe className="h-6 md:h-8 w-6 md:w-8 text-amber-400 mr-3 animate-pulse" />
          <span className="text-base md:text-lg font-semibold text-amber-300">Premium Travel Concierge</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block text-white">Luxury Travel</span>
          <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
            Packages
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-slate-200 max-w-3xl mx-auto leading-relaxed">
          Curated premium travel experiences with complete concierge service. 
          Flights, hotels, cruises, and unforgettable adventures—all expertly planned for you.
        </p>

        {/* Travel Services Icons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
            <Plane className="h-5 md:h-6 w-5 md:w-6 text-amber-400" />
            <span className="font-medium text-sm md:text-base">Flights</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
            <Hotel className="h-5 md:h-6 w-5 md:w-6 text-emerald-400" />
            <span className="font-medium text-sm md:text-base">Hotels</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
            <Ship className="h-5 md:h-6 w-5 md:w-6 text-blue-400" />
            <span className="font-medium text-sm md:text-base">Cruises</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 md:px-6 py-3 md:py-4 rounded-full border border-white/20 hover:bg-white/15 transition-all">
            <Users className="h-5 md:h-6 w-5 md:w-6 text-purple-400" />
            <span className="font-medium text-sm md:text-base">Group Tours</span>
          </div>
        </div>
        
        {/* Enhanced search bar */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 md:h-6 w-5 md:w-6" />
            <Input
              type="text"
              placeholder="Search destinations, cruises, tours, adventures..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 md:pl-14 pr-6 py-3 md:py-4 text-base md:text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder:text-slate-300 rounded-xl shadow-2xl focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>
        </div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                <Globe className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">150+</div>
            <div className="text-xs md:text-sm text-slate-300">Destinations</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full">
                <Users className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">25K+</div>
            <div className="text-xs md:text-sm text-slate-300">Happy Travelers</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full">
                <Ship className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-xs md:text-sm text-slate-300">Cruise Options</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                <Award className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-white mb-1">24/7</div>
            <div className="text-xs md:text-sm text-slate-300">Concierge Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;
