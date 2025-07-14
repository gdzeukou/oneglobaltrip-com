
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
        name: "Ultimate Visa Assist",
        price: "$129",
        description: "Professional visa application support with AI-powered accuracy checks",
        features: [
          "Smart AI application review and validation",
          "Biometric/Fingerprint Appointment Hunter",
          "Complete form preparation and submission",
          "Real-time application tracking portal",
          "Document checklist and requirements guide",
          "24/7 AI Travel Agent"
        ],
        popular: false,
        badge: "Essential",
        badgeColor: "bg-blue-500"
      },
      {
        name: "Trip Bundle",
        price: "$249",
        description: "Full travel experience with visa, accommodation, and flight arrangements",
        features: [
          "All Visa Assist services included",
          "Guaranteed 4-star hotel in prime location",
          "Premium flight booking with lounge access",
          "OGT TripGift credit for activities",
          "Comprehensive Travel Insurance Picks"
        ],
        popular: true,
        badge: "Most Popular",
        badgeColor: "bg-orange-500"
      },
      {
        name: "OGT Elite",
        price: "$479",
        description: "White-glove service with dedicated personal travel agent and VIP treatment",
        features: [
          "All Trip Bundle services included",
          "Dedicated Human Certified Travel Advisor",
          "Priority biometric appointment booking",
          "Airport transfer and VIP assistance",
          "Restaurant and event reservations"
        ],
        popular: false,
        badge: "Premium",
        badgeColor: "bg-purple-600"
      }
    ],
    'long-stay': [
      {
        name: "Residency Basic",
        price: "$599",
        description: "Essential long-stay visa service with comprehensive support",
        features: [
          "Visa category assessment and consultation",
          "Complete document preparation guidance",
          "Application submission assistance",
          "Real-time status tracking portal",
          "Email support with 48h response time"
        ],
        popular: false,
        badge: "Basic",
        badgeColor: "bg-green-500"
      },
      {
        name: "Residency Plus",
        price: "$899",
        description: "Comprehensive residency assistance with legal support",
        features: [
          "Everything in Residency Basic",
          "Professional legal consultation",
          "Certified document translation service",
          "Priority appointment coordination",
          "24/7 phone & WhatsApp support",
          "Relocation guidance and city orientation"
        ],
        popular: true,
        badge: "Most Popular",
        badgeColor: "bg-orange-500"
      },
      {
        name: "Residency VIP",
        price: "$1299",
        description: "Full-service residency support with concierge service",
        features: [
          "Everything in Residency Plus",
          "Dedicated personal case manager",
          "Priority processing with government offices",
          "Legal representation when required",
          "Housing assistance and property tours",
          "Complete integration support package"
        ],
        popular: false,
        badge: "VIP",
        badgeColor: "bg-purple-600"
      }
    ]
  };

  const currentPackages = visaPackages[visaType as keyof typeof visaPackages] || visaPackages['short-stay'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {visaType ? `${visaType.charAt(0).toUpperCase() + visaType.slice(1).replace('-', ' ')} Visa` : 'Visa'} Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Choose the perfect service level for your visa needs. Transparent pricing, exceptional support.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {currentPackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`group relative transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden bg-white/90 backdrop-blur-sm ${
                  pkg.popular 
                    ? 'border-2 border-accent shadow-xl ring-2 ring-accent/20' 
                    : 'border border-gray-200 hover:border-accent/50'
                } animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`${pkg.badgeColor} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg animate-pulse`}>
                      <Star className="h-4 w-4 mr-1" />
                      {pkg.badge}
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8 pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                    {pkg.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {pkg.price}
                    </span>
                    <span className="text-gray-600 ml-2">per application</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed px-2">{pkg.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0 pb-8 px-6">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3 text-center justify-center">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-center">
                    <Button 
                      className={`w-full font-semibold transition-all duration-300 ${
                        pkg.popular 
                          ? 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl' 
                          : 'bg-primary hover:bg-primary/90 text-white'
                      } group-hover:scale-105`}
                      onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min', '_blank')}
                    >
                      Choose This Plan
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
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
