
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'I left home a curious traveler. I returned home a storyteller with a soul full of Santorini sunsets.',
      rating: 5,
      transformation: 'From Tourist to Storyteller'
    },
    {
      name: 'Ahmed Hassan',
      location: 'Dubai, UAE',
      text: 'They didn\'t just process our visas—they opened doorways to experiences that changed how our family sees the world.',
      rating: 5,
      transformation: 'From Family Trip to Legacy'
    },
    {
      name: 'Maria Santos',
      location: 'Manila, Philippines',
      text: 'Some agencies book trips. One Global Trip architects awakenings. Every detail was a brushstroke in our perfect masterpiece.',
      rating: 5,
      transformation: 'From Vacation to Awakening'
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stories of Transformation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Every journey changes you. These are the stories of souls who dared to wander.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="mb-2">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
                <div className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full inline-block">
                  {(testimonial as any).transformation}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
