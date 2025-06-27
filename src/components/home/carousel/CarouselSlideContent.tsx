
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PlaneTakeoff } from 'lucide-react';
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
            className="bg-gradient-to-r from-[#CC4500] to-[#FF4500] hover:from-[#B83A00] hover:to-[#E63E00] text-white font-bold text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-premium-hover transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-105 border-2 border-white/20 backdrop-blur-sm"
            asChild
          >
            <Link to={slide.ctaLink}>
              {slide.ctaText}
              <PlaneTakeoff className="h-6 w-6 ml-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarouselSlideContent;
