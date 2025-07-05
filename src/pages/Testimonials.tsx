import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, MapPin, Calendar } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      country: 'Schengen Visa',
      rating: 5,
      date: 'December 2024',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?auto=format&fit=crop&w=150&q=80',
      text: 'One Global Trip made my European vacation possible! The team handled everything from document preparation to embassy appointments. I received my Schengen visa in just 10 days. Highly recommend their professional service!',
      trip: 'Paris & Rome Adventure'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      country: 'UK Visa',
      rating: 5,
      date: 'November 2024',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      text: 'Exceptional service! The team guided me through the complex UK visa process with expertise and patience. They even helped me prepare for the interview. Got my visa approved on the first try!',
      trip: 'London Business Trip'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Los Angeles, USA',
      country: 'Student Visa',
      rating: 5,
      date: 'October 2024',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
      text: 'As a student applying for a German study visa, I was overwhelmed by the requirements. One Global Trip simplified everything and ensured I had all documents ready. Now I\'m studying in Berlin!',
      trip: 'Study in Germany'
    },
    {
      id: 4,
      name: 'David Kumar',
      location: 'Mumbai, India',
      country: 'Schengen Visa',
      rating: 5,
      date: 'November 2024',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      text: 'Outstanding support throughout the entire process. The team was available 24/7 to answer my questions and provided regular updates. My family and I had an amazing time in Europe!',
      trip: 'Family European Tour'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      location: 'Sydney, Australia',
      country: 'UAE Visa',
      rating: 5,
      date: 'December 2024',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=150&q=80',
      text: 'Professional, efficient, and reliable. One Global Trip handled my Dubai visa application flawlessly. The entire process was stress-free, and I received my visa within a week. Excellent service!',
      trip: 'Dubai Shopping Festival'
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'London, UK',
      country: 'US Visa',
      rating: 5,
      date: 'October 2024',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      text: 'After being rejected twice for a US visa, One Global Trip helped me understand what went wrong and prepared a perfect application. Third time was the charm - approved! Their expertise is unmatched.',
      trip: 'New York Business Conference'
    },
    {
      id: 7,
      name: 'Maria Santos',
      location: 'São Paulo, Brazil',
      country: 'Canada Visa',
      rating: 5,
      date: 'September 2024',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      text: 'The team at One Global Trip went above and beyond to help me with my Canadian tourist visa. Their attention to detail and personalized service made all the difference. Canada, here I come!',
      trip: 'Canadian Rockies Adventure'
    },
    {
      id: 8,
      name: 'Ahmed Hassan',
      location: 'Cairo, Egypt',
      country: 'Schengen Visa',
      rating: 5,
      date: 'November 2024',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      text: 'Fantastic service from start to finish. The team made the Schengen visa application process so simple and transparent. I appreciated the regular updates and clear communication throughout.',
      trip: 'Mediterranean Cruise'
    },
    {
      id: 9,
      name: 'Anna Kowalski',
      location: 'Warsaw, Poland',
      country: 'UK Visa',
      rating: 5,
      date: 'October 2024',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=150&q=80',
      text: 'I was nervous about applying for a UK visa, but One Global Trip made it incredibly easy. Their team reviewed every document and provided valuable feedback. Approved without any issues!',
      trip: 'London Theatre Weekend'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '99%', label: 'Approval Rate' },
    { number: '50+', label: 'Countries Served' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <PageHeader
        title="Customer Testimonials"
        subtitle="Real stories from thousands of satisfied travelers"
        description="Discover why travelers worldwide trust One Global Trip with their visa applications and travel dreams."
        backgroundGradient="bg-gradient-to-br from-accent/20 via-background to-primary/10"
      />

      {/* Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read authentic reviews from travelers who trusted us with their visa applications and travel plans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                    <Quote className="h-8 w-8 text-primary/20" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Badge variant="secondary">
                      {testimonial.country}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {testimonial.date}
                    </div>
                  </div>

                  {/* Trip */}
                  {testimonial.trip && (
                    <div className="mt-3 text-sm text-primary font-medium">
                      Trip: {testimonial.trip}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-foreground">Video Testimonials</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Hear directly from our customers about their experience with One Global Trip.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Sarah\'s European Adventure',
                description: 'How we helped Sarah get her Schengen visa for a 3-week European tour',
                thumbnail: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Michael\'s Business Success',
                description: 'UK visa approval for important business meetings in London',
                thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80'
              },
              {
                title: 'Family Reunion in Canada',
                description: 'Helping Maria reunite with family in Toronto',
                thumbnail: 'https://images.unsplash.com/photo-1519832064115-ffe08b5b3085?auto=format&fit=crop&w=400&q=80'
              }
            ].map((video, index) => (
              <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[16px] border-l-primary border-y-[10px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 text-foreground">{video.title}</h3>
                  <p className="text-sm text-muted-foreground">{video.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Ready to Join Our Success Stories?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let us help you create your own success story with expert visa services and personalized support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-semibold transition-colors">
              Start Your Application
            </button>
            <button className="border border-border hover:bg-muted px-8 py-3 rounded-md font-semibold transition-colors">
              Read More Reviews
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Testimonials;