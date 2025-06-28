
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

const CarouselControls = ({ onPrevious, onNext }: CarouselControlsProps) => {
  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 hover:from-amber-400/30 hover:to-yellow-300/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-amber-400/50 z-20 border border-amber-300/30 shadow-xl hover:shadow-amber-500/25 group"
        aria-label="Previous visa service"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500/20 to-yellow-400/20 hover:from-amber-400/30 hover:to-yellow-300/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-all duration-300 hover:scale-125 focus:outline-none focus:ring-2 focus:ring-amber-400/50 z-20 border border-amber-300/30 shadow-xl hover:shadow-amber-500/25 group"
        aria-label="Next visa service"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </>
  );
};

export default CarouselControls;
