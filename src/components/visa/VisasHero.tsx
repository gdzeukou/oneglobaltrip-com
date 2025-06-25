
import { Shield, Clock, Users } from 'lucide-react';
import EnhancedImage from '@/components/ui/enhanced-image';

const VisasHero = () => {
  return (
    <section className="pt-20 relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 overflow-hidden">
      {/* Enhanced Background with Professional Travel Photos */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-3 h-full opacity-20">
          <EnhancedImage
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=1200&fit=crop&crop=center"
            alt="Airport travel and documents"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/60"
          />
          <EnhancedImage
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=1200&fit=crop&crop=center"
            alt="Happy travelers with passports"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/60"
          />
          <EnhancedImage
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&h=1200&fit=crop&crop=center"
            alt="International travel experience"
            className="h-full"
            overlay
            overlayColor="bg-blue-900/60"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Visa Services
          <span className="block text-yellow-500 animate-float">For Every Journey</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-up">
          From quick getaways to permanent moves - we make visa applications simple with guaranteed approval and expert guidance
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8 animate-scale-in">
          <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Shield className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">100% Approval Rate</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Clock className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Fast Processing</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Users className="h-5 w-5 text-yellow-500" />
            <span className="font-semibold">Expert Support</span>
          </div>
        </div>

        {/* Success Stories Highlight */}
        <div className="mt-12 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <p className="text-lg text-blue-100 mb-4 italic">
              "Thanks to their expert guidance, my family's Schengen visa was approved in just 5 days. 
              Our European dream vacation became reality!"
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-blue-900 font-bold">
                M
              </div>
              <div className="text-left">
                <div className="font-semibold text-white">Maria Rodriguez</div>
                <div className="text-sm text-blue-200">Family of 4, USA to Europe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisasHero;
