
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaneTakeoff, Sparkles, Users, MapPin, Heart, MessageCircle } from 'lucide-react';
import StartTripModal from '@/components/trip-planning/StartTripModal';
import { useAuth } from '@/contexts/AuthContext';

const StartMyTrip = () => {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Planning",
      description: "Your personal travel agent creates custom itineraries based on your preferences"
    },
    {
      icon: MapPin,
      title: "Expert Destination Knowledge",
      description: "Get insider tips and hidden gems from our comprehensive travel database"
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Every recommendation is tailored to your travel style and interests"
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description: "Your AI agent is always available to help with questions and adjustments"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      location: "New York",
      text: "The AI agent created the perfect 2-week Europe itinerary for us. Every detail was spot-on!",
      rating: 5
    },
    {
      name: "James L.",
      location: "California", 
      text: "Amazing experience! The personalized recommendations saved us hours of research.",
      rating: 5
    },
    {
      name: "Emily R.",
      location: "Texas",
      text: "Our AI travel agent felt like having a personal concierge. Highly recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                  <PlaneTakeoff className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Let's Plan Your 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Dream Trip</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Meet your personal AI Travel Agent who will create a customized travel experience 
                tailored exactly to your preferences, budget, and dreams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  size="lg"
                  onClick={() => setModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Sparkles className="h-6 w-6 mr-3" />
                  {user ? 'Start Planning My Trip' : 'Get Started Free'}
                </Button>
                
                {!user && (
                  <div className="flex items-center text-green-600 font-semibold">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span>$0 Down • Free Consultation</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-yellow-400 fill-current">⭐</div>
                ))}
                <span className="ml-2 text-gray-600 font-medium">Trusted by 10,000+ travelers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our AI Travel Agent?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience the future of travel planning with personalized AI assistance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Get your personalized travel plan in just a few simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Your Dreams</h3>
                <p className="text-gray-600">Tell us about your ideal trip through our interactive questionnaire</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Creates Your Plan</h3>
                <p className="text-gray-600">Your personal AI agent analyzes your preferences and creates custom recommendations</p>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Refine & Book</h3>
                <p className="text-gray-600">Chat with your AI agent to perfect your itinerary and get booking assistance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Travelers Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="w-5 h-5 text-yellow-400 fill-current">⭐</div>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered their perfect trips with our AI travel agents.
            </p>
            
            <Button 
              size="lg"
              onClick={() => setModalOpen(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="h-6 w-6 mr-3" />
              Start My Trip Planning
            </Button>

            <div className="mt-6 flex items-center justify-center text-blue-100">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span>No credit card required • Get started in 2 minutes</span>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Trip Planning Modal */}
      <StartTripModal 
        open={modalOpen} 
        onOpenChange={setModalOpen}
      />
    </div>
  );
};

export default StartMyTrip;
