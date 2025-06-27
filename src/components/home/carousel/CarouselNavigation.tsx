
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselNavigationProps {
  onPrevSlide: () => void;
  onNextSlide: () => void;
}

const CarouselNavigation = ({ onPrevSlide, onNextSlide }: CarouselNavigationProps) => {
  return (
    <>
      <button
        onClick={onPrevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      <button
        onClick={onNextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </>
  );
};

export default CarouselNavigation;
