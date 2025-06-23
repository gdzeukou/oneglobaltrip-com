
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Bot, Sparkles, Clock, Users } from 'lucide-react';

const Concierge = () => {
  useEffect(() => {
    // Add page-specific context for Agentive
    const script = document.createElement('script');
    script.innerHTML = `
      if (window.agentive) {
        window.agentive.setContext({
          page: 'concierge',
          context: 'concierge',
          services: ['full_planning', 'packages', 'visas', 'itinerary', 'consultation']
        });
      }
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Bot className="h-12 w-12 text-yellow-500 mr-4" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Meet Camron, Your AI Travel Concierge
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Your personal AI assistant for planning the perfect trip. Get instant answers, 
              personalized recommendations, and expert guidance 24/7.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-blue-800/50 rounded-lg p-6 text-center">
              <Sparkles className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Instant Recommendations</h3>
              <p className="text-blue-200 text-sm">Get personalized travel packages and visa guidance in seconds</p>
            </div>
            <div className="bg-blue-800/50 rounded-lg p-6 text-center">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">24/7 Availability</h3>
              <p className="text-blue-200 text-sm">Always available to help with your travel planning needs</p>
            </div>
            <div className="bg-blue-800/50 rounded-lg p-6 text-center">
              <Users className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Expert Knowledge</h3>
              <p className="text-blue-200 text-sm">Trained on our extensive travel and visa expertise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Information Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Planning Your Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Click the orange chat bubble in the bottom-right corner to start chatting with Camron. 
              Ask anything about travel packages, visa requirements, destinations, or let him help you 
              create the perfect itinerary.
            </p>
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 inline-block">
              <p className="text-orange-800 font-medium">
                💬 Look for the orange bubble → It's available on every page!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">What Camron Can Help You With</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Visa Requirements', desc: 'Get detailed visa info for any destination' },
              { title: 'Package Recommendations', desc: 'Find perfect travel packages for your needs' },
              { title: 'Itinerary Planning', desc: 'Create detailed day-by-day travel plans' },
              { title: 'Budget Optimization', desc: 'Find the best value for your travel budget' },
              { title: 'Document Guidance', desc: 'Learn what documents you need for travel' },
              { title: 'Booking Assistance', desc: 'Help with reservations and scheduling' },
              { title: 'Emergency Support', desc: 'Get urgent travel assistance' },
              { title: 'Expert Connections', desc: 'Connect with human travel specialists' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Concierge;
