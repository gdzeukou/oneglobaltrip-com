import React from 'react';
import SimplifiedNavigation from '@/components/SimplifiedNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Globe, Shield, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const SimplifiedHome = () => {
  const features = [
    {
      icon: Globe,
      title: "Smart Trip Planning",
      description: "AI-powered recommendations tailored to your preferences and budget"
    },
    {
      icon: Shield,
      title: "Visa Support",
      description: "Expert guidance through visa applications with 98% success rate"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "From planning to booking, we handle the complexity so you don't have to"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "Made planning my Europe trip so easy! The AI suggestions were perfect.",
      location: "New York"
    },
    {
      name: "James L.",
      text: "Visa process was stress-free. Approved in just 2 weeks!",
      location: "California"
    },
    {
      name: "Emily R.",
      text: "Best travel planning experience I've ever had. Highly recommend!",
      location: "Texas"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SimplifiedNavigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Plan Your Perfect Trip with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Assistance
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From destination recommendations to visa support, we make travel planning simple, 
              fast, and stress-free. Join thousands of happy travelers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="text-lg px-8 py-4">
                <Link to="/startmytrip">
                  Start Planning My Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Free to start • No credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose One Global Trip?
            </h2>
            <p className="text-xl text-gray-600">Everything you need for seamless travel planning</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Visa Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">180+</div>
              <div className="text-gray-600">Countries Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="text-yellow-400 text-lg">⭐</div>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of travelers who trust us with their dream trips.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
            <Link to="/startmytrip">
              <Heart className="mr-2 h-5 w-5" />
              Plan My Perfect Trip
            </Link>
          </Button>
          <div className="mt-6 text-blue-100">
            <CheckCircle className="inline h-4 w-4 mr-2" />
            No commitment • Start planning in 2 minutes
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SimplifiedHome;