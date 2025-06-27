
import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoPlayInterval?: number;
  isPlaying?: boolean;
}

export const useCarousel = ({ 
  totalSlides, 
  autoPlayInterval = 4000, 
  isPlaying = true 
}: UseCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setIsTransitioning(false);
    }, 300);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setIsTransitioning(false);
    }, 300);
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, [currentSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying, nextSlide, autoPlayInterval]);

  return {
    currentSlide,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide
  };
};
