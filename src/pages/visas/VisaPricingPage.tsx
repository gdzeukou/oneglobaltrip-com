
import React from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star, ArrowRight } from 'lucide-react';

const VisaPricingPage = () => {
  const { visaType } = useParams<{ visaType: string }>();

  const visaPackages = {
    'short-stay': [
      {
        name: "Basic Visa",
        price: "$175",
        description: "Essential visa processing service",
        features: [
          "✓ **Application review** with smart AI checklist",
          "✓ **Form completion & VAC submission**",
          "✓ **Real-time tracking portal**",
          "✓ **48 h email SLA** (two-business-day replies)",
          "✓ **Optional 24 h rush review** add-on (+$79)"
        ],
        popular: false
      },
      {
        name: "Standard Visa",
        price: "$299",
        description: "Complete visa service with extras",
        features: [
          "✓ **Everything in Visa Assist**",
          "✓ **Guaranteed 4-star hotel** in prime location",
          "✓ **Premium flight + lounge access***",
          "✓ **OGT TripGift credit** to spend however you like",
          "✓ **Comprehensive travel insurance** deals(medical, baggage, cancellation)",
          "✓ **24/7 WhatsApp & phone support** (12 h SLA)"
        ],
        popular: true
      },
      {
        name: "Premium Visa",
        price: "$449",
        description: "Full-service visa assistance",
        features: [
          "✓ **Everything in Trip Bundle**",
          "✓ **Dedicated human agent of your choice**",
          "✓ **Priority biometric appointment slot hunt**",
          "✓ **Airport transfer service**",
          "✓ **Restaurant / event reservations**",
          "✓ **2 h SLA & 24/7 emergency helpline**"
        ],
        popular: false
      }
    ],
    'long-stay': [
      {
        name: "Residency Basic",
        price: "$599",
        description: "Essential long-stay visa service",
        features: [
          "Visa category assessment",
          "Document preparation",
          "Application submission",
          "Status tracking",
          "Email support"
        ],
        popular: false
      },
      {
        name: "Residency Plus",
        price: "$899",
        description: "Comprehensive residency assistance",
        features: [
          "Everything in Basic",
          "Legal consultation",
          "Document translation",
          "Appointment coordination",
          "Phone support",
          "Relocation guidance"
        ],
        popular: true
      },
      {
        name: "Residency VIP",
        price: "$1299",
        description: "Full-service residency support",
        features: [
          "Everything in Plus",
          "Dedicated case manager",
          "Priority processing",
          "Legal representation",
          "Housing assistance",
          "Integration support"
        ],
        popular: false
      }
    ]
  };

  const currentPackages = visaPackages[visaType as keyof typeof visaPackages] || visaPackages['short-stay'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {visaType ? `${visaType.charAt(0).toUpperCase() + visaType.slice(1).replace('-', ' ')} Visa` : 'Visa'} Pricing
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Transparent pricing with no hidden fees. Choose the service level that fits your needs.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {currentPackages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-2 border-blue-500 shadow-xl' : 'border border-gray-200'}`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-2xl font-bold text-gray-900">{pkg.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-blue-600">{pkg.price}</span>
                    <span className="text-gray-600 ml-2">per application</span>
                  </div>
                  <p className="text-gray-600 mt-4">{pkg.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} text-white`}
                    onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
                  >
                    Choose Plan
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What's Included</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Government Fees</h3>
              <p className="text-gray-600">
                Government visa fees are paid separately directly to the embassy or consulate. 
                These fees vary by country and visa type.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Processing Time</h3>
              <p className="text-gray-600">
                Processing times vary by destination and visa type. We'll provide accurate 
                timelines based on current embassy processing times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VisaPricingPage;
