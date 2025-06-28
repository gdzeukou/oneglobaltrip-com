
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCarousel } from '@/hooks/useCarousel';
import { Star, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

const SchengenReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      date: 'March 2024',
      trip: 'France Explorer Trip',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      review: "One Global Trip made my Schengen visa process incredibly smooth! I was worried about the documentation, but their expert guidance helped me get approved in just 10 days. The France trip was absolutely magical - Paris, Lyon, and Nice exceeded all expectations!",
      highlights: ['10-day approval', 'Expert guidance', 'Amazing trip experience']
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'San Francisco, USA',
      rating: 5,
      date: 'February 2024',
      trip: 'Multi-Country European Adventure',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      review: "I can't thank the team enough! As a first-time visa applicant, I was completely lost. They handled everything from document preparation to appointment booking. Got my visa approved and visited 4 countries in 2 weeks. Best travel experience ever!",
      highlights: ['First-time success', 'Complete service', '4 countries visited']
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Miami, USA',
      rating: 5,
      date: 'January 2024',
      trip: 'Amsterdam Tulip Season',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      review: "The tulip season package was perfectly timed! Not only did they get my visa approved quickly, but the entire Amsterdam experience was curated beautifully. The canal cruise and Keukenhof Gardens were breathtaking. Worth every penny!",
      highlights: ['Perfect timing', 'Quick approval', 'Curated experience']
    },
    {
      id: 4,
      name: 'David Kim',
      location: 'Los Angeles, USA',
      rating: 5,
      date: 'December 2023',
      trip: 'Italy Cultural Getaway',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      review: "Had my visa rejected twice before finding One Global Trip. Their team identified exactly what was wrong with my previous applications and fixed everything. Rome, Florence, and Venice were incredible. Professional service from start to finish!",
      highlights: ['Rejection recovery', 'Problem solving', 'Professional service']
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      location: 'Chicago, USA',
      rating: 5,
      date: 'November 2023',
      trip: 'Custom Schengen Package',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      review: "As a business traveler, I needed a visa fast. Their VIP service got me approved in 5 days! The 24/7 support was incredibly helpful when I had questions. Now I recommend them to all my colleagues. Simply the best in the business!",
      highlights: ['5-day approval', 'VIP service', 'Business travel expert']
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'Boston, USA',
      rating: 5,
      date: 'October 2023',
      trip: 'Switzerland & Austria Package',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      review: "The Swiss Alps were a dream come true! The visa process was handled so professionally - they even helped me with travel insurance. The attention to detail in both visa assistance and trip planning was outstanding. Highly recommended!",
      highlights: ['Dream destination', 'Professional handling', 'Attention to detail']
    }
  ];

  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel({
    totalSlides: reviews.length,
    autoPlayInterval: 6000,
    isPlaying: true
  });

  const stats = [
    { number: '4.9', label: 'Average Rating', sublabel: 'Based on 500+ reviews' },
    { number: '99%', label: 'Approval Rate', sublabel: 'Visa success rate' },
    { number: '2,800+', label: 'Happy Travelers', sublabel: 'Visas approved' },
    { number: '24/7', label: 'Support Available', sublabel: 'Always here to help' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 text-yellow-500 fill-current" />
            ))}
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Travelers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from customers who successfully got their Schengen visas and amazing trips
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.sublabel}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-4">
                  <Card className="max-w-4xl mx-auto">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Profile */}
                        <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 flex-shrink-0">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-16 h-16 md:w-24 md:h-24 rounded-full object-cover"
                          />
                          <div className="text-center md:text-left">
                            <h4 className="font-bold text-lg">{review.name}</h4>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <MapPin className="h-3 w-3" />
                              {review.location}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                              <Calendar className="h-3 w-3" />
                              {review.date}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {review.trip}
                            </Badge>
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                            ))}
                          </div>
                          
                          <p className="text-gray-700 text-lg leading-relaxed mb-4">
                            "{review.review}"
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {review.highlights.map((highlight, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800">
                                ✓ {highlight}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Previous review"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Next review"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Join Our Happy Travelers?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" style={{ backgroundColor: '#FF6B35' }}>
              Start Your Application
            </Button>
            <Button size="lg" variant="outline">
              Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchengenReviews;
