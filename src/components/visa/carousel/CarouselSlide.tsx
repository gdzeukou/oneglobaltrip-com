
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnhancedImage from '@/components/ui/enhanced-image-refactored';
import { VisaSlide } from '@/data/visaCarouselSlides';

interface CarouselSlideProps {
  slide: VisaSlide;
  isActive: boolean;
  isTransitioning: boolean;
  priority?: boolean;
}

const CarouselSlide = ({ slide, isActive, isTransitioning, priority = false }: CarouselSlideProps) => {
  return (
    <figure 
      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
      }`}
    >
      <EnhancedImage
        src={slide.image}
        alt={slide.alt}
        className="w-full h-full"
        priority={priority}
        sizes="100vw"
        aspectRatio="16/9"
      />
      
      {/* Enhanced gradient overlay with luxury feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      
      {/* Animated sparkle effects */}
      <div className="absolute top-8 right-8 text-amber-300 opacity-70 animate-pulse">
        <Sparkles className="h-6 w-6" />
      </div>
      <div className="absolute top-16 right-20 text-amber-200 opacity-50 animate-pulse delay-500">
        <Sparkles className="h-4 w-4" />
      </div>
      
      {/* Content overlay with luxury styling */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-8 md:p-12 lg:p-16 pr-20 md:pr-24 pl-16 md:pl-20">
          <div 
            className={`transition-all duration-800 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            {/* Luxury badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 backdrop-blur-sm rounded-full border border-amber-300/30 mb-4">
              <Sparkles className="h-4 w-4 text-amber-300 mr-2" />
              <span className="text-amber-100 text-sm font-semibold tracking-wide uppercase">Premium Service</span>
            </div>
            
            {/* Enhanced title with luxury font styling */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-gradient-to-r from-white via-amber-50 to-amber-100 bg-clip-text mb-4 drop-shadow-2xl tracking-tight leading-tight animate-fade-in">
              {slide.title}
            </h2>
            
            {/* Enhanced description */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-3 drop-shadow-lg font-light leading-relaxed tracking-wide">
              {slide.description}
            </p>
            
            {/* Processing time with luxury styling */}
            <div className="flex items-center mb-8">
              <div className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-400/20 backdrop-blur-sm rounded-lg border border-emerald-300/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-emerald-100 font-semibold text-lg tracking-wide">
                  Processing: {slide.processingTime}
                </span>
              </div>
            </div>
            
            {/* Luxury CTA button */}
            <Button
              size="lg"
              className="group bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 text-black font-bold text-xl px-10 py-7 rounded-2xl shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 hover:scale-110 hover:-translate-y-2 border-2 border-amber-300/50 backdrop-blur-sm transform-gpu"
              asChild
            >
              <Link to={slide.ctaLink}>
                <span className="mr-3 tracking-wide">{slide.ctaText}</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Luxury corner accent */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-tl-full"></div>
    </figure>
  );
};

export default CarouselSlide;
