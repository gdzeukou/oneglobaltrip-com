
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EnhancedImage from '@/components/ui/enhanced-image';

interface PackagesHeroProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const PackagesHero = ({ searchTerm, onSearchChange }: PackagesHeroProps) => {
  return (
    <section className="pt-20 relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 overflow-hidden">
      {/* Enhanced Background with Travel Action Photos */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-2 h-full opacity-25">
          <EnhancedImage
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&h=800&fit=crop&crop=center"
            alt="European travel adventure"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/70"
          />
          <EnhancedImage
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&h=800&fit=crop&crop=center"
            alt="Luxury European destinations"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/70"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Discover Europe
          <span className="block text-yellow-500 animate-float">Your Way</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
          Curated luxury travel packages with guaranteed visa assistance and unforgettable experiences
        </p>
        
        <div className="max-w-2xl mx-auto animate-scale-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search destinations, experiences, adventures..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 py-4 text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-300 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Add floating stats */}
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">50+</div>
            <div className="text-sm text-blue-200">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">100%</div>
            <div className="text-sm text-blue-200">Visa Success</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">24/7</div>
            <div className="text-sm text-blue-200">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesHero;
