
import { Shield, Clock, Users, Sparkles, CheckCircle, Award } from 'lucide-react';

const VisasHero = () => {
  return (
    <section className="pt-20 relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-20 overflow-hidden">
      {/* Sophisticated background with subtle patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95" />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
        </div>
        {/* Refined geometric accents */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-32 left-32 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
          <div className="absolute top-48 right-40 w-1 h-1 bg-white/60 rotate-45" />
          <div className="absolute bottom-32 left-1/3 w-1.5 h-1.5 bg-amber-400 rotate-45" />
          <div className="absolute bottom-48 right-1/3 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Premium service indicator */}
        <div className="flex items-center justify-center mb-8 animate-fade-in">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
            <span className="text-base font-medium text-amber-300 tracking-wide">Premium Visa Services</span>
            <Award className="h-5 w-5 text-amber-400" />
          </div>
        </div>
        
        {/* Main heading with better hierarchy */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <span className="block text-white">Visa Services</span>
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text mt-2">
              For Every Journey
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.4s' }}>
            From quick getaways to permanent moves—we make visa applications simple with 
            <span className="text-amber-300 font-semibold"> guaranteed approval</span> and expert guidance every step of the way.
          </p>
        </div>
        
        {/* Enhanced trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-scale-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-green-500/20 rounded-full">
              <Shield className="h-5 w-5 text-green-300" />
            </div>
            <div>
              <div className="font-semibold text-white">100% Success Rate</div>
              <div className="text-xs text-white/70">Guaranteed approval</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Clock className="h-5 w-5 text-blue-300" />
            </div>
            <div>
              <div className="font-semibold text-white">Fast Processing</div>
              <div className="text-xs text-white/70">Express service available</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/15 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <Users className="h-5 w-5 text-purple-300" />
            </div>
            <div>
              <div className="font-semibold text-white">Expert Support</div>
              <div className="text-xs text-white/70">24/7 assistance</div>
            </div>
          </div>
        </div>

        {/* Enhanced testimonial section */}
        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/12 transition-all duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <CheckCircle key={i} className="h-5 w-5 text-amber-400 fill-current" />
                ))}
              </div>
            </div>
            <blockquote className="text-lg md:text-xl text-white/95 mb-6 italic leading-relaxed text-center">
              "Thanks to their expert guidance, my family's Schengen visa was approved in just 5 days. 
              Our European dream vacation became reality without any stress or complications!"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                M
              </div>
              <div className="text-center">
                <div className="font-semibold text-white">Maria Rodriguez</div>
                <div className="text-sm text-white/70">Family of 4 • USA to Europe</div>
              </div>
            </div>
          </div>
        </div>

        {/* Success metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '1s' }}>
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-sm text-white/70">Visas Processed</div>
          </div>
          
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">180+</div>
            <div className="text-sm text-white/70">Countries Covered</div>
          </div>
          
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">15+</div>
            <div className="text-sm text-white/70">Years Experience</div>
          </div>
          
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-white/70">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisasHero;
