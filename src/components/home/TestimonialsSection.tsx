
import React from 'react';
import { Star, Quote, Users, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah & Michael Chen',
      location: 'San Francisco, USA',
      trip: 'Mediterranean Cruise & European Tour',
      rating: 5,
      text: 'From our Mediterranean cruise to the African safari, every detail was perfect. Their team handled everything—flights, visas, accommodations. Pure luxury!',
      image: 'S',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50',
    },
    {
      name: 'Maria Rodriguez',
      location: 'Miami, USA',
      trip: 'Family European Adventure',
      rating: 5,
      text: 'Thanks to their expert guidance, my family\'s Schengen visa was approved in just 5 days. Our European dream vacation became reality without any stress!',
      image: 'M',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50',
    },
    {
      name: 'David & Emma Thompson',
      location: 'London, UK',
      trip: 'Asian Cultural Discovery',
      rating: 5,
      text: 'The attention to detail was incredible. From traditional ryokans in Japan to luxury hotels in Singapore, every moment was carefully curated.',
      image: 'D',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'from-amber-50 to-orange-50',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-3 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-3 rounded-full border border-amber-200/50">
              <Quote className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700 tracking-wide">Customer Stories</span>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-slate-900">What Our Travelers</span>
            <span className="block text-transparent bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text mt-2">
              Are Saying
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real travelers who trusted us with their dream journeys
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <Quote className="h-12 w-12 text-slate-400" />
                </div>
                
                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg text-slate-700 mb-8 leading-relaxed italic group-hover:text-slate-800 transition-colors duration-300">
                  "{testimonial.text}"
                </blockquote>
                
                {/* Customer Info */}
                <div className="flex items-start space-x-4">
                  <div className={`w-14 h-14 bg-gradient-to-r ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {testimonial.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-slate-800 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Calendar className="h-3 w-3" />
                        <span>{testimonial.trip}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Trip Badge */}
                <div className={`absolute bottom-6 right-6 bg-gradient-to-r ${testimonial.bgColor} px-3 py-1 rounded-full border border-current/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="text-xs font-medium text-current">Verified Traveler</span>
                </div>
                
                {/* Hover Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Join 50,000+ Happy Travelers</h3>
            <p className="text-slate-600 mb-6">Experience the difference of premium travel planning</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-500">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>50K+ Customers</span>
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div>4.9/5 Average Rating</div>
              <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
              <div>15+ Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
