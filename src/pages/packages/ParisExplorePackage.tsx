
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptionalAddOns from '@/components/packages/OptionalAddOns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Star, Check, X } from 'lucide-react';

const ParisExplorePackage = () => {
  const included = [
    "4 nights accommodation in 4-star hotel",
    "Daily breakfast buffet",
    "Skip-the-line Eiffel Tower tickets",
    "Louvre Museum guided tour",
    "Seine River cruise",
    "Metro travel card (3 days)",
    "Professional English-speaking guide",
    "24/7 customer support"
  ];

  const notIncluded = [
    "International flights",
    "Lunch and dinner (except breakfast)",
    "Personal expenses and shopping",
    "Travel insurance",
    "Gratuities for guides and drivers",
    "Optional activities not mentioned"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-white to-red-600 rounded mr-4"></div>
            <span className="text-lg font-semibold text-blue-200">France • Single Country Trip</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Paris Explore Package
            <span className="block text-transparent bg-gradient-to-r from-amber-400 to-pink-400 bg-clip-text">
              City of Light Adventure
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-slate-200 max-w-3xl">
            Discover the magic of Paris with our comprehensive 5-day package. 
            From iconic landmarks to hidden gems, experience the best of French culture and cuisine.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              5 Days / 4 Nights
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              2-8 People
            </Badge>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              Premium Experience
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4">
              Book Now - $1,299 per person
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-4">
              View Detailed Itinerary
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What's Included / Not Included
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about your Paris package
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What's Included */}
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800 flex items-center">
                  <Check className="h-6 w-6 mr-3" />
                  What's Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {included.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* What's Not Included */}
            <Card className="border-red-200 bg-red-50/50">
              <CardHeader>
                <CardTitle className="text-2xl text-red-800 flex items-center">
                  <X className="h-6 w-6 mr-3" />
                  What's Not Included
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {notIncluded.map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-lg text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optional Add-Ons Section */}
      <OptionalAddOns />

      <Footer />
    </div>
  );
};

export default ParisExplorePackage;
