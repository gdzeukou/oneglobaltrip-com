
import { Search, Star, Globe, Award, Plane, Hotel, Ship, Users, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PackagesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PackagesHero = ({ searchTerm, onSearchChange }: PackagesHeroProps) => {
  return (
    <section className="pt-20 relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
      {/* Sophisticated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>
        {/* Refined geometric accents */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-32 left-32 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <div className="absolute top-48 right-40 w-1 h-1 bg-white/60 rotate-45" />
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-emerald-400 rotate-45" />
          <div className="absolute bottom-48 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Premium service indicator */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Globe className="h-5 w-5 text-amber-400 animate-pulse" />
            <span className="text-base font-medium text-amber-300 tracking-wide">Premium Travel Concierge</span>
            <Award className="h-5 w-5 text-amber-400" />
          </div>
        </div>
        
        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="block text-white">Luxury Travel</span>
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text mt-2">
              Packages
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Curated premium travel experiences with complete concierge service. 
            Flights, hotels, cruises, and unforgettable adventures—
            <span className="text-amber-300 font-semibold"> all expertly planned for you</span>.
          </p>
        </div>

        {/* Travel Services Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-amber-500/20 rounded-full">
              <Plane className="h-5 w-5 text-amber-300" />
            </div>
            <span className="font-medium text-white">Premium Flights</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-emerald-500/20 rounded-full">
              <Hotel className="h-5 w-5 text-emerald-300" />
            </div>
            <span className="font-medium text-white">Luxury Hotels</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Ship className="h-5 w-5 text-blue-300" />
            </div>
            <span className="font-medium text-white">Ocean Cruises</span>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <Users className="h-5 w-5 text-purple-300" />
            </div>
            <span className="font-medium text-white">Group Tours</span>
          </div>
        </div>
        
        {/* Enhanced search bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-6 w-6" />
            <Input
              type="text"
              placeholder="Search destinations, cruises, tours, adventures..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-6 py-4 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder:text-white/60 rounded-xl shadow-2xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
            />
          </div>
        </div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-sm text-white/70">Destinations</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">25K+</div>
            <div className="text-sm text-white/70">Happy Travelers</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full">
                <Ship className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-white/70">Cruise Options</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 border border-white/20 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-white/70">Concierge Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;
