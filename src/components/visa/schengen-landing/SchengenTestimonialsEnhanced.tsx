
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, NY',
    rating: 5,
    text: 'One Global Trip made my European dream come true! The visa process was seamless and their team handled everything. I was approved in just 10 days and had the most amazing trip to Paris and Rome.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    trip: 'Paris & Rome Package'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    rating: 5,
    text: 'The AI document checker caught a mistake in my application that would have caused a rejection. Their attention to detail is incredible. Got my Schengen visa without any issues!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    trip: 'Netherlands Business Visa'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    rating: 5,
    text: 'Outstanding service from start to finish. They even helped me with travel insurance and itinerary planning. The 24/7 support was amazing when I had questions during my trip.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    trip: 'Greece & Italy Tour'
  },
  {
    id: 4,
    name: 'David Thompson',
    location: 'Chicago, IL',
    rating: 5,
    text: 'I was nervous about the visa process, but OGT made it so easy. The priority appointment booking saved me weeks of waiting. Highly recommend their services!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    trip: 'Germany Work Visa'
  },
  {
    id: 5,
    name: 'Lisa Park',
    location: 'Seattle, WA',
    rating: 5,
    text: 'The bundle deal was incredible value. Got my visa and an amazing package to Barcelona and Amsterdam. The trip planning was perfect and everything went smoothly.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    trip: 'Spain & Netherlands Package'
  }
];

const SchengenTestimonialsEnhanced = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-scroll every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600">
            Real stories from travelers who trusted us with their visa journey
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-8 md:inset-12'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Customer Photo */}
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover shadow-lg"
                    />
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex-1 text-center md:text-left">
                    {/* Star Rating */}
                    <div className="flex justify-center md:justify-start space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600">
                        {testimonial.location}
                      </p>
                      <p className="text-blue-600 font-medium text-sm">
                        {testimonial.trip}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden text-center mt-6">
          <p className="text-sm text-gray-500">
            Swipe left or right to see more testimonials
          </p>
        </div>
      </div>
    </div>
  );
};

export default SchengenTestimonialsEnhanced;
