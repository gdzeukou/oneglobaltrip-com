
import { Button } from '@/components/ui/button';
import { Globe, MapPin } from 'lucide-react';

interface ShortStayHeroProps {
  onScrollToCards: () => void;
}

const ShortStayHero = ({ onScrollToCards }: ShortStayHeroProps) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated world map background */}
      <div className="absolute inset-0 opacity-5">
        <Globe className="absolute top-20 left-1/4 w-32 h-32 text-blue-600 animate-pulse" />
        <MapPin className="absolute top-40 right-1/3 w-6 h-6 text-blue-500 animate-bounce" />
        <MapPin className="absolute bottom-32 left-1/3 w-8 h-8 text-green-500 animate-bounce" style={{ animationDelay: '1s' }} />
        <MapPin className="absolute bottom-20 right-1/4 w-4 h-4 text-red-500 animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in">
          Short-Stay Visas Made Easy
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto animate-slide-up">
          Get the right visa in one click and start planning the fun part of your trip.
        </p>
        <Button 
          onClick={onScrollToCards}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
        >
          Compare Visa Options
        </Button>
      </div>
    </section>
  );
};

export default ShortStayHero;
