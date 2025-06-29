
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const pricingPlans = [
    {
      name: "Visa Only",
      price: "$175",
      description: "Perfect for experienced travelers who just need visa assistance",
      features: [
        "Visa application review",
        "Document checklist",
        "Application submission",
        "Status tracking",
        "Email support"
      ],
      popular: false
    },
    {
      name: "Travel Essential",
      price: "$299",
      description: "Complete travel planning with visa assistance",
      features: [
        "Everything in Visa Only",
        "Flight booking assistance",
        "Hotel recommendations",
        "Travel insurance",
        "24/7 phone support",
        "Itinerary planning"
      ],
      popular: true
    },
    {
      name: "VIP Concierge",
      price: "$599",
      description: "Premium service with dedicated travel expert",
      features: [
        "Everything in Travel Essential",
        "Dedicated travel expert",
        "Priority visa processing",
        "Airport transfers",
        "Restaurant reservations",
        "Emergency assistance",
        "Travel companion services"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Transparent Pricing</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Choose the perfect service level for your travel needs. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600 ml-2">per application</span>
                  </div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
                    onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Additional Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Rush Processing</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">+$99</p>
                <p className="text-gray-600 text-sm">2-3 day processing</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Travel Insurance</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$45</p>
                <p className="text-gray-600 text-sm">Comprehensive coverage</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Document Translation</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$25</p>
                <p className="text-gray-600 text-sm">Per document</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Photo Service</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">$15</p>
                <p className="text-gray-600 text-sm">Compliant passport photos</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Pricing FAQ</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">What's included in the base price?</h3>
                <p className="text-gray-600">Base price includes visa application review, document verification, application submission, and status tracking. Government fees are separate.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Are government fees included?</h3>
                <p className="text-gray-600">No, government visa fees are paid directly to the embassy/consulate and are separate from our service fees. We'll inform you of all applicable fees upfront.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Do you offer refunds?</h3>
                <p className="text-gray-600">Yes, we offer full refunds if we cannot process your application due to our error. Refund policy details are provided at booking.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
