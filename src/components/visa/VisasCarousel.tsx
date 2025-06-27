import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import EnhancedImage from '@/components/ui/enhanced-image-refactored';

interface VisaSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  processingTime: string;
  ctaText: string;
  ctaLink: string;
  alt: string;
}

const visaSlides: VisaSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?auto=format&fit=crop&w=1920&q=80',
    title: 'Schengen Visa Services',
    description: 'Travel freely across 27 European countries with our expert assistance',
    processingTime: '5-15 business days',
    ctaText: 'Learn More',
    ctaLink: '/visas/schengen',
    alt: 'European landmarks including Eiffel Tower representing Schengen area'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1520986606214-8b456906c813?auto=format&fit=crop&w=1920&q=80',
    title: 'UK Visa Application',
    description: 'Business, tourism, and study visas for the United Kingdom',
    processingTime: '3-8 weeks',
    ctaText: 'Learn More',
    ctaLink: '/visas/uk',
    alt: 'Big Ben and London skyline representing UK visa services'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1920&q=80',
    title: 'Japan Visa Processing',
    description: 'Tourist and business visas for Japan with streamlined application',
    processingTime: '4-7 business days',
    ctaText: 'Learn More',
    ctaLink: '/visas/japan',
    alt: 'Tokyo cityscape at night representing Japan visa services'
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1920&q=80',
    title: 'Brazil Visa Services',
    description: 'Tourist and business visas for Brazil with expert guidance',
    processingTime: '5-10 business days',
    ctaText: 'Learn More',
    ctaLink: '/visas/brazil',
    alt: 'Christ the Redeemer and Rio de Janeiro representing Brazil visa services'
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
    title: 'India Visa Application',
    description: 'Tourist, business, and medical visas for India made simple',
    processingTime: '3-5 business days',
    ctaText: 'Learn More',
    ctaLink: '/visas/india',
    alt: 'Indian landmarks and architecture representing India visa services'
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80',
    title: 'UAE Visa Processing',
    description: 'Dubai and UAE visas with fast-track processing options',
    processingTime: '2-4 business days',
    ctaText: 'Learn More',
    ctaLink: '/visas/uae',
    alt: 'Dubai skyline and Burj Khalifa representing UAE visa services'
  }
];

const VisasCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying]);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % visaSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + visaSlides.length) % visaSlides.length);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index === currentSlide) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  }, [currentSlide]);

  const currentSlideData = visaSlides[currentSlide];

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden rounded-lg shadow-premium mb-8"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      role="region"
      aria-label="Visa services carousel"
      aria-live="polite"
    >
      {/* Background slides */}
      <div className="absolute inset-0">
        {visaSlides.map((slide, index) => (
          <figure 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-600 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <EnhancedImage
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full"
              priority={index === 0}
              sizes="100vw"
              aspectRatio="16/9"
            />
          </figure>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-6 md:p-8 lg:p-12">
          <div 
            className={`transition-all duration-600 ease-out ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
              {currentSlideData.title}
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-2 drop-shadow-md font-light">
              {currentSlideData.description}
            </p>
            <p className="text-lg md:text-xl text-white/80 font-medium mb-6 drop-shadow-md">
              Processing: {currentSlideData.processingTime}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#0052CC] to-[#0066FF] hover:from-[#0041A3] hover:to-[#0052CC] text-white font-semibold text-lg px-8 py-6 rounded-lg shadow-premium hover:shadow-premium-hover transition-all duration-300 hover:scale-105"
              asChild
            >
              <Link to={currentSlideData.ctaLink}>
                {currentSlideData.ctaText}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous visa service"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next visa service"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {visaSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              index === currentSlide
                ? 'bg-white shadow-lg scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to visa service ${index + 1}: ${visaSlides[index].title}`}
          />
        ))}
      </div>
    </section>
  );
};

export default VisasCarousel;
