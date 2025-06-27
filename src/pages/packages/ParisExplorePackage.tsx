
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import OptionalAddOns from '@/components/packages/OptionalAddOns';
import ParisSlideshow from '@/components/packages/ParisSlideshow';
import ParisTestimonials from '@/components/packages/ParisTestimonials';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, Star, Check, X, Phone, Mail } from 'lucide-react';

const ParisExplorePackage = () => {
  const included = [
    "4 nights accommodation in 4-star hotel in central Paris location",
    "Daily breakfast buffet",
    "Skip-the-line Eiffel Tower tickets",
    "Louvre Museum guided tour with skip-the-line access and professional guide",
    "Seine River cruise",
    "Metro travel card (3 days)",
    "Professional English-speaking guide",
    "24/7 customer support"
  ];

  const notIncluded = [
    "Personal expenses and shopping",
    "Gratuities for guides and drivers",
    "Optional activities not mentioned in the package",
    "Airport transfers (can be added upon request)",
    "Additional meals beyond breakfast (customizable dining options available)",
    "Spa services and room service"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Background Image */}
      <section className="relative pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-16 overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80"
            alt="Beautiful romantic Paris evening with Eiffel Tower lights"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="flex items-center mb-6">
            <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-white to-red-600 rounded mr-4"></div>
            <span className="text-lg font-semibold text-blue-200">Paris • Single City Trip</span>
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
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg">
              Book Now - $1,299 per person
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-4">
              View Detailed Itinerary
            </Button>
          </div>
        </div>
      </section>

      {/* Paris Slideshow */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Experience the Magic of Paris
            </h2>
            <p className="text-xl text-slate-600">
              From iconic landmarks to charming neighborhoods, discover what makes Paris unforgettable
            </p>
          </div>
          <ParisSlideshow />
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="py-16 bg-white">
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
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    💡 <strong>Available Upon Request:</strong> International flights and travel insurance can be added upon request.
                  </p>
                </div>
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
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    💡 <strong>Note:</strong> If you want the items that are not included, you can always request them.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Optional Add-Ons Section */}
      <OptionalAddOns />

      {/* Testimonials Section */}
      <ParisTestimonials />

      {/* Enhanced Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Fall in Love with Paris?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied travelers who've discovered the magic of Paris with One Global Trip. 
            Book now and create memories that will last a lifetime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 text-lg">
              Book Your Paris Adventure Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4">
              Get Free Consultation
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-blue-100">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>24/7 Customer Support</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>Free Trip Planning</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              <span>5-Star Service Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParisExplorePackage;
