
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Passport,
  Plane,
  Hotel,
  MapPin,
  Star,
  Users,
  Calendar,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  User
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const features = [
    {
      icon: <Passport className="h-6 w-6" />,
      name: 'Visa Services',
      description: 'Expert visa processing for 180+ countries',
    },
    {
      icon: <Plane className="h-6 w-6" />,
      name: 'Flight Deals',
      description: 'Best prices on international flights',
    },
    {
      icon: <Hotel className="h-6 w-6" />,
      name: 'Hotel Bookings',
      description: 'Handpicked accommodations worldwide',
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      name: 'Travel Planning',
      description: 'Custom itineraries and local experiences',
    },
  ];

  const stats = [
    { number: '25,000+', label: 'Happy Travelers' },
    { number: '180+', label: 'Countries Served' },
    { number: '98%', label: 'Visa Success Rate' },
    { number: '24/7', label: 'Support Available' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'One Global Trip made my European visa process so smooth! Got approved in just 5 days.',
      rating: 5,
    },
    {
      name: 'Ahmed Hassan',
      location: 'Dubai, UAE',
      text: 'Excellent service for my family\'s Canada visa. Professional and reliable.',
      rating: 5,
    },
    {
      name: 'Maria Santos',
      location: 'Manila, Philippines',
      text: 'Best travel agency! They handled everything from visa to hotel bookings.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Gateway to
            <span className="block text-yellow-500">Global Adventures</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Visa processing, flight deals, hotel bookings, and travel planning - all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
                onClick={() => navigate('/dashboard')}
              >
                <User className="mr-2 h-5 w-5" />
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
                  onClick={() => navigate('/auth')}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-3"
                  onClick={() => navigate('/visas')}
                >
                  Explore Visas
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-blue-900">{stat.number}</div>
                <div className="text-blue-800 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Travel</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From visa approval to your dream destination - we handle it all
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <div className="text-blue-600">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose One Global Trip</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">98% Success Rate</h3>
              <p className="text-gray-600">Highest visa approval rates in the industry</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-600">Quick turnaround times for all services</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">Your documents and data are always safe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
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
                  <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied travelers who trust us with their adventures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
                onClick={() => navigate('/dashboard')}
              >
                View My Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
                  onClick={() => navigate('/auth')}
                >
                  Create Free Account
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-3"
                  onClick={() => navigate('/get-started')}
                >
                  Get Free Consultation
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
