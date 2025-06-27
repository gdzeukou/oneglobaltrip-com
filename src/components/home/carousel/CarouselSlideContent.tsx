
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CarouselSlide } from '@/data/heroSlides';

interface CarouselSlideContentProps {
  slide: CarouselSlide;
  isTransitioning: boolean;
}

const CarouselSlideContent = ({ slide, isTransitioning }: CarouselSlideContentProps) => {
  return (
    <div className="absolute inset-0 flex items-end justify-start">
      <div className="w-full p-6 md:p-12 lg:p-16">
        <div 
          className={`transition-all duration-600 ease-out ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            {slide.destination}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 drop-shadow-md font-light">
            {slide.teaser}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FF6F61] to-[#ff8a7a] hover:from-[#e55a4d] hover:to-[#ff6f61] text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105"
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
  );
};

export default CarouselSlideContent;
