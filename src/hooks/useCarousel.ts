
import { useState, useEffect, useCallback } from 'react';

interface UseCarouselProps {
  totalSlides: number;
  autoPlayInterval?: number;
  isPlaying?: boolean;
}

type Direction = 'next' | 'prev';

export const useCarousel = ({
  totalSlides,
  autoPlayInterval = 5500,
  isPlaying = true,
}: UseCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('next');
    setPreviousSlide((prev) => (prev === null ? currentSlide : currentSlide));
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [totalSlides, isTransitioning, currentSlide]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection('prev');
    setPreviousSlide((prev) => (prev === null ? currentSlide : currentSlide));
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [totalSlides, isTransitioning, currentSlide]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || isTransitioning) return;
      setIsTransitioning(true);
      setDirection(index > currentSlide ? 'next' : 'prev');
      setPreviousSlide(currentSlide);
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [currentSlide, isTransitioning]
  );

  // Auto-play functionality (pauses when not playing or when manually paused)
  useEffect(() => {
    if (!isPlaying || isTransitioning || isPaused) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, isTransitioning, isPaused, nextSlide, autoPlayInterval]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return {
    currentSlide,
    previousSlide,
    direction,
    isTransitioning,
    nextSlide,
    prevSlide,
    goToSlide,
    pause,
    resume,
  };
};
