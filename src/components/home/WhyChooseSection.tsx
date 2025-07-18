import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Users, Star, ArrowRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose One Global Trip?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Customize your AI for any trip, get visa help, and tap real travel agents for local tips—like Spain's best nightlife
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI That Learns Your Style
                </h3>
                <p className="text-gray-600">
                  Your personalized AI remembers your preferences—whether you're into foodie tours, adventure hikes, or discovering local nightlife scenes.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex-shrink-0">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  98% Visa Success Rate
                </h3>
                <p className="text-gray-600">
                  AI-guided visa applications with real-time embassy updates and document verification. From $15 per application.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg flex-shrink-0">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert Connect Calls
                </h3>
                <p className="text-gray-600">
                  Need insider tips? Connect with real travel agents for $20 calls to discover hidden gems like Barcelona's secret rooftop bars.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Mock-up */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Your AI Travel Agent</h4>
                  <p className="text-sm text-gray-500">Personalized for nightlife</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    "I found 5 amazing rooftop bars in Barcelona's Gothic Quarter with sunset views and craft cocktails!"
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    "Would you like me to book reservations or connect you with our local expert for more insider tips?"
                  </p>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  size="sm" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Book Now
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex items-center space-x-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>Expert Call $20</span>
                </Button>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              AI + Human
            </div>
            <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
              180+ Countries
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            asChild
          >
            <Link to="/ai-agent-auth">
              Start Free or Go Premium
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
          <p className="text-gray-500 mt-4">
            Join thousands of travelers who've discovered smarter planning
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;