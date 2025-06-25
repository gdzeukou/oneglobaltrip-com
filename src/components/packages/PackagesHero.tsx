
import { Search, Star, Globe, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface PackagesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PackagesHero = ({ searchTerm, onSearchChange }: PackagesHeroProps) => {
  return (
    <section className="pt-20 relative bg-gradient-to-br from-deep-blue-900 via-deep-blue-800 to-deep-blue-900 text-white py-20 overflow-hidden">
      {/* Modern clean background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-deep-blue-900/95 via-deep-blue-800/90 to-deep-blue-900/95" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        {/* Professional geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-32 w-6 h-6 bg-yellow-400 rounded-full" />
          <div className="absolute top-60 right-40 w-4 h-4 bg-white/40 rotate-45" />
          <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-yellow-400 rotate-45" />
          <div className="absolute bottom-60 right-1/3 w-5 h-5 bg-white/30 rounded-full" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Globe className="h-8 w-8 text-yellow-500 mr-3" />
          <span className="text-lg font-medium text-yellow-400">Premium Travel Experiences</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in hero-text">
          Discover Europe
          <span className="block text-yellow-400 animate-float">Your Way</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
          Curated luxury travel packages with guaranteed visa assistance and unforgettable experiences
        </p>
        
        {/* Modern search bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
            <Input
              type="text"
              placeholder="Search destinations, experiences, adventures..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-14 pr-6 py-4 text-lg bg-white/95 border-0 text-gray-800 placeholder:text-gray-500 rounded-xl shadow-xl backdrop-blur-sm focus:ring-2 focus:ring-yellow-400 transition-all"
            />
          </div>
        </div>

        {/* Professional stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Globe className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">50+</div>
            <div className="text-sm text-blue-200">Countries</div>
          </div>
          
          <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">100%</div>
            <div className="text-sm text-blue-200">Visa Success</div>
          </div>
          
          <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">24/7</div>
            <div className="text-sm text-blue-200">Support</div>
          </div>
          
          <div className="glass-modern rounded-xl p-6 hover-lift border border-white/20 shadow-xl">
            <div className="flex items-center justify-center mb-3">
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Search className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-400 mb-1">10K+</div>
            <div className="text-sm text-blue-200">Happy Travelers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;
