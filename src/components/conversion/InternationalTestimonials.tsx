import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  text: string;
  rating: number;
  visaType: string;
  processingTime: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Santos',
    country: 'Brazil',
    countryCode: 'BR',
    flag: '🇧🇷',
    text: 'One Global Trip made my Schengen visa process incredibly smooth! Got approved in just 7 days. The document checklist was perfect and their support team answered all my questions instantly.',
    rating: 5,
    visaType: 'Schengen Tourist',
    processingTime: '7 days'
  },
  {
    id: '2',
    name: 'Ahmed Al-Rashid',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    text: 'Exceptional service for my family\'s Canada visa application. They handled everything professionally and we got approved faster than expected. Highly recommend!',
    rating: 5,
    visaType: 'Canada Tourist',
    processingTime: '12 days'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    text: 'Best visa agency I\'ve used! Their AI checker predicted my approval perfectly. The booking process was seamless and I saved so much time.',
    rating: 5,
    visaType: 'UK Business',
    processingTime: '5 days'
  },
  {
    id: '4',
    name: 'Chen Wei',
    country: 'China',
    countryCode: 'CN',
    flag: '🇨🇳',
    text: 'Outstanding experience! They guided me through the entire process and I got my US visa approved on the first try. Their expertise is unmatched.',
    rating: 5,
    visaType: 'US Tourist',
    processingTime: '14 days'
  },
  {
    id: '5',
    name: 'Sophie Dubois',
    country: 'France',
    countryCode: 'FR',
    flag: '🇫🇷',
    text: 'Incredible support for my Australia visa. The team was available 24/7 and made the whole process stress-free. Worth every penny!',
    rating: 5,
    visaType: 'Australia Work',
    processingTime: '9 days'
  },
  {
    id: '6',
    name: 'James Mitchell',
    country: 'USA',
    countryCode: 'US',
    flag: '🇺🇸',
    text: 'Professional service from start to finish. Got my Schengen visa approved quickly and the pricing was transparent. No hidden fees!',
    rating: 5,
    visaType: 'Schengen Business',
    processingTime: '6 days'
  }
];

const InternationalTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Travelers Worldwide 🌍
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our customers from around the globe say about their visa success stories
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => {
              // Handle wrap-around for the carousel
              const actualIndex = (currentIndex + index) % testimonials.length;
              const actualTestimonial = testimonials[actualIndex];
              
              return (
                <Card 
                  key={actualTestimonial.id} 
                  className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                >
                  <CardContent className="p-6">
                    {/* Header with flag and country */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{actualTestimonial.flag}</span>
                        <div>
                          <h3 className="font-bold text-gray-900">{actualTestimonial.name}</h3>
                          <p className="text-sm text-gray-600">{actualTestimonial.country}</p>
                        </div>
                      </div>
                      <Quote className="h-8 w-8 text-blue-500 opacity-60" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(actualTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    {/* Testimonial text */}
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed italic">
                      "{actualTestimonial.text}"
                    </p>

                    {/* Visa details */}
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Visa Type:</span>
                        <span className="font-medium text-blue-600">{actualTestimonial.visaType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Processing Time:</span>
                        <span className="font-medium text-green-600">{actualTestimonial.processingTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrev}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-blue-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Auto-play toggle */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'} Auto-scroll
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalTestimonials;