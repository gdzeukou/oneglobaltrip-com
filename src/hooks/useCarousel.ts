
import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoPlayInterval?: number;
  isPlaying?: boolean;
}

export const useCarousel = ({ 
  totalSlides, 
  autoPlayInterval = 5000, 
  isPlaying = true 
}: UseCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 100);
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 100);
  }, [totalSlides, isTransitioning]);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 100);
  }, [currentSlide, isTransitioning]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || isTransitioning) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, isTransitioning, nextSlide, autoPlayInterval]);

  return {
    currentSlide,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide
  };
};
