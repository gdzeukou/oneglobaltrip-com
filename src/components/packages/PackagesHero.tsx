
import { Search, Star, Globe, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PackagesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PackagesHero = ({ searchTerm, onSearchChange }: PackagesHeroProps) => {
  return (
    <section className="pt-20 relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-16 md:py-20 overflow-hidden animate-gradient">
      {/* Enhanced colorful background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/95 via-teal-600/90 to-cyan-700/95" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-64 md:w-80 h-64 md:h-80 bg-yellow-500/20 rounded-full blur-3xl animate-colorful-float" />
          <div className="absolute bottom-20 left-20 w-48 md:w-64 h-48 md:h-64 bg-purple-400/20 rounded-full blur-3xl animate-colorful-float" style={{ animationDelay: '1s' }} />
        </div>
        {/* Colorful geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-40 left-32 w-6 h-6 bg-pink-400 rounded-full animate-bounce" />
          <div className="absolute top-60 right-40 w-4 h-4 bg-yellow-300 rotate-45 animate-pulse" />
          <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-green-400 rotate-45 animate-bounce" />
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-blue-300 rounded-full animate-pulse" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Globe className="h-6 md:h-8 w-6 md:w-8 text-yellow-400 mr-3 animate-pulse" />
          <span className="text-base md:text-lg font-medium text-yellow-300">Premium Travel Experiences</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up-fade hero-text-mobile">
          Discover Europe
          <span className="block text-gradient-primary animate-colorful-float">Your Way</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
          Curated luxury travel packages with guaranteed visa assistance and unforgettable experiences
        </p>
        
        {/* Enhanced search bar */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12 animate-scale-bounce" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 md:h-6 w-5 md:w-6" />
            <Input
              type="text"
              placeholder="Search destinations, experiences, adventures..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 md:pl-14 pr-6 py-3 md:py-4 text-base md:text-lg glass-colorful border-2 border-white/30 text-gray-800 placeholder:text-gray-500 rounded-xl shadow-2xl backdrop-blur-sm focus:ring-2 focus:ring-yellow-400 transition-all hover-glow"
            />
          </div>
        </div>

        {/* Enhanced stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto animate-slide-up-fade" style={{ animationDelay: '0.6s' }}>
          <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-pink-400 to-red-500 rounded-full">
                <Globe className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gradient-warm mb-1">50+</div>
            <div className="text-xs md:text-sm text-blue-200">Countries</div>
          </div>
          
          <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
                <Award className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gradient-primary mb-1">100%</div>
            <div className="text-xs md:text-sm text-blue-200">Visa Success</div>
          </div>
          
          <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full">
                <Star className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gradient-cool mb-1">24/7</div>
            <div className="text-xs md:text-sm text-blue-200">Support</div>
          </div>
          
          <div className="glass-colorful rounded-xl p-4 md:p-6 hover-lift-colorful border border-white/30 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                <Search className="h-4 md:h-6 w-4 md:w-6 text-white" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gradient-warm mb-1">10K+</div>
            <div className="text-xs md:text-sm text-blue-200">Happy Travelers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;
