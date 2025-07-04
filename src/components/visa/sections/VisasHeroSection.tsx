
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Clock, Users } from 'lucide-react';
import ParallaxSection from '@/components/ui/parallax-section';
import SmartCTA from '@/components/conversion/SmartCTA';

interface VisasHeroSectionProps {
  onScrollToCTA?: () => void;
}

const VisasHeroSection = ({ onScrollToCTA }: VisasHeroSectionProps) => {
  return (
    <ParallaxSection 
      className="min-h-screen relative overflow-hidden"
      backgroundImage="/lovable-uploads/45e83c7d-c5f3-4a9a-a57e-70cccc8d55d1.png"
      speed={0.3}
    >
      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 opacity-20">
        <Sparkles className="absolute top-20 left-1/4 w-8 h-8 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute bottom-32 left-1/3 w-6 h-6 text-blue-300 animate-pulse" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-1/3 left-1/5 w-4 h-4 text-white animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Left side - Text content */}
            <div className="relative">
              {/* Background panel for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-800/40 backdrop-blur-sm rounded-3xl transform -rotate-1" />
              
              <div className="relative p-8 lg:p-12">
                {/* Badge */}
                <div className="flex items-center mb-6">
                  <Shield className="h-6 w-6 text-yellow-400 mr-3" />
                  <span className="text-yellow-400 font-semibold text-lg tracking-wide">
                    100% Success Rate
                  </span>
                </div>

                {/* Main headline */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                  Where Dreams Get
                  <span className="block text-yellow-400 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    Their Passport
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  You don't just travel, you arrive different. We don't just process visas—we unlock worlds where you belong.
                </p>

                {/* Trust indicators */}
                <div className="flex flex-wrap gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
                  <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Shield className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Guaranteed Approval</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Fast Processing</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                    <Users className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium text-sm">Expert Support</span>
                  </div>
                </div>

                {/* Smart CTA Button */}
                {onScrollToCTA && (
                  <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                    <SmartCTA
                      variant="urgent"
                      size="lg"
                      location="hero"
                      onClick={onScrollToCTA}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Your uploaded image */}
            <div className="relative animate-fade-in-up lg:flex lg:justify-center" style={{ animationDelay: '0.4s' }}>
              <div className="relative max-w-lg w-full">
                {/* Background decorative elements */}
                <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-yellow-400/20 to-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-gradient-to-tr from-blue-400/20 to-purple-500/20 rounded-full blur-3xl" />
                
                {/* Main image container */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm bg-white/10">
                  <img
                    src="/lovable-uploads/cfe6ab35-b147-43d4-a694-ce1b4b67dc7e.png"
                    alt="Happy traveler ready for their journey"
                    className="w-full h-auto object-cover"
                    style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                    onLoad={() => {
                      console.log('✅ Hero image loaded successfully');
                      console.log('Image src:', '/lovable-uploads/cfe6ab35-b147-43d4-a694-ce1b4b67dc7e.png');
                    }}
                    onError={(e) => {
                      console.error('❌ Hero image failed to load:', e);
                      console.log('Failed image src:', '/lovable-uploads/cfe6ab35-b147-43d4-a694-ce1b4b67dc7e.png');
                      console.log('Image element:', e.target);
                    }}
                  />
                  
                  {/* Overlay gradient for better integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" />
                </div>
                
                {/* Floating elements around the image */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/20">
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-sm rounded-full p-2 border border-white/20">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </ParallaxSection>
  );
};

export default VisasHeroSection;
