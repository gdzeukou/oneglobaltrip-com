
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface VisasHeroSectionProps {
  onScrollToCTA?: () => void;
}

const VisasHeroSection = ({ onScrollToCTA }: VisasHeroSectionProps) => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Sparkles className="absolute top-20 left-1/4 w-8 h-8 text-blue-500 animate-pulse" />
        <Sparkles className="absolute bottom-32 right-1/3 w-6 h-6 text-purple-500 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in">
          Visa Services That Actually Work
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto animate-slide-up">
          Skip the embassy queues and paperwork nightmares. We handle your visa so you can focus on planning your adventure.
        </p>
        {onScrollToCTA && (
          <Button 
            onClick={onScrollToCTA}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default VisasHeroSection;
