
import React from 'react';
import { ArrowRight } from 'lucide-react';
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
      className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
        isActive ? 'opacity-100' : 'opacity-0'
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
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-6 md:p-8 lg:p-12 pr-16 md:pr-20 pl-16 md:pl-20">
          <div 
            className={`transition-all duration-600 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-2 drop-shadow-md font-light">
              {slide.description}
            </p>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-6 drop-shadow-md">
              Processing: {slide.processingTime}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0052CC] to-[#0066FF] hover:from-[#0041A3] hover:to-[#0052CC] text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to={slide.ctaLink}>
                {slide.ctaText}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default CarouselSlide;
