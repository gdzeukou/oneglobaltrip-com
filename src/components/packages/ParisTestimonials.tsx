
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Emma Richardson',
    location: 'London, UK',
    text: 'The Paris Explore Package exceeded all expectations! The skip-the-line access to the Louvre and Eiffel Tower saved us hours. Our guide was knowledgeable and made history come alive.',
    rating: 5,
    trip: 'September 2024'
  },
  {
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    text: 'Perfect introduction to Paris! The hotel location was ideal - we could walk to most attractions. The Seine cruise at sunset was magical. Highly recommend!',
    rating: 5,
    trip: 'October 2024'
  },
  {
    name: 'Sofia Martinez',
    location: 'Madrid, Spain',
    text: 'One Global Trip made our Parisian dream come true. Every detail was handled professionally. The optional café experience was a delightful addition to our itinerary.',
    rating: 5,
    trip: 'November 2024'
  }
];

const ParisTestimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What Our Paris Travelers Say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real experiences from travelers who've explored the City of Light with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-amber-500 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <div className="font-bold text-slate-900 text-lg">{testimonial.name}</div>
                  <div className="text-slate-600">{testimonial.location}</div>
                  <div className="text-sm text-amber-600 font-medium mt-1">{testimonial.trip}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParisTestimonials;
