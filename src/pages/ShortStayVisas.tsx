
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Info, Star, Shield, Clock, Users, MapPin, Globe } from 'lucide-react';

const ShortStayVisas = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [showSchengenModal, setShowSchengenModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Primary visa cards data
  const primaryVisas = [
    {
      id: 'schengen',
      name: 'Schengen Short-Stay Visa',
      tagline: 'Hop across 27 countries',
      description: 'One visa, endless Euro-city hopping for up to 90 days.',
      price: 193,
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      promo: 'Save $25 this month',
      route: '/visas/schengen-short-stay'
    },
    {
      id: 'uk',
      name: 'UK Short-Stay Visa',
      tagline: 'Fast-track London trip',
      description: 'Be ready for Big Ben & cream tea in as little as 3 weeks.',
      price: 480,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop&crop=center',
      promo: 'Most Popular',
      route: '/visas/uk-short-stay'
    },
    {
      id: 'brazil',
      name: 'Brazil Short-Stay Visa',
      tagline: 'Carnaval ready',
      description: 'Samba through Rio or relax in Bahia—visa sorted.',
      price: 175,
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop&crop=center',
      promo: 'Fast Processing',
      route: '/visas/brazil-short-stay'
    },
    {
      id: 'india',
      name: 'India Visa',
      tagline: 'Spice-route adventure',
      description: 'Witness the Taj, Kerala backwaters & more with zero hassle.',
      price: 180,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop&crop=center',
      promo: 'E-Visa Available',
      route: '/visas/india-short-stay'
    },
    {
      id: 'nigeria',
      name: 'Nigeria Visa (ETA/VFS)',
      tagline: 'Lagos in 10 days',
      description: 'We handle NIS forms & biometrics—just pack.',
      price: 290,
      image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop&crop=center',
      promo: 'Full Service',
      route: '/visas/nigeria-short-stay'
    },
    {
      id: 'uae',
      name: 'UAE Tourist Visa',
      tagline: 'Dubai weekend?',
      description: 'Desert thrills to mall chills—get your e-visa fast.',
      price: 250,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop&crop=center',
      promo: 'Quick Approval',
      route: '/visas/uae-short-stay'
    },
    {
      id: 'canada',
      name: 'Canada Visa Short Stay',
      tagline: 'Maple leaf adventure',
      description: 'From Niagara Falls to Rocky Mountains—visa made simple.',
      price: 300,
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56cd928?w=800&h=600&fit=crop&crop=center',
      promo: 'Expert Support',
      route: '/visas/canada-short-stay'
    }
  ];

  // Secondary Schengen country cards
  const schengenCountries = [
    {
      id: 'france',
      name: 'France Visa – Short Stay',
      tagline: 'Bonjour Paris!',
      description: 'Perfect for fashion week, croissants & Eiffel selfies.',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop&crop=center',
      route: '/visas/france-short-stay'
    },
    {
      id: 'netherlands',
      name: 'Netherlands Visa – Short Stay',
      tagline: 'Canals & cycling',
      description: 'Tulips, tech, and art in one smart visa.',
      image: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=800&h=600&fit=crop&crop=center',
      route: '/visas/netherlands-short-stay'
    },
    {
      id: 'germany',
      name: 'Germany Visa – Short Stay',
      tagline: 'Beer & business',
      description: 'Oktoberfest or trade fairs—visa in record time.',
      image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop&crop=center',
      route: '/visas/germany-short-stay'
    },
    {
      id: 'denmark',
      name: 'Denmark Visa – Short Stay',
      tagline: 'Happiest nation trip',
      description: 'Hygge, design, and pastries await.',
      image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop&crop=center',
      route: '/visas/denmark-short-stay'
    },
    {
      id: 'sweden',
      name: 'Sweden Visa – Short Stay',
      tagline: 'Nordic cool',
      description: 'Lapland lights to Stockholm startups—sorted.',
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=800&h=600&fit=crop&crop=center',
      route: '/visas/sweden-short-stay'
    }
  ];

  const scrollToCards = () => {
    const element = document.getElementById('visa-cards');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqData = [
    {
      question: "How long does visa processing typically take?",
      answer: "Processing times vary by destination: Schengen visas take 10-15 days, UK visas 15-20 days, and e-visas like UAE and India can be processed in 3-5 days. We provide expedited services for urgent travel."
    },
    {
      question: "What documents do I need for a short-stay visa?",
      answer: "Common requirements include a valid passport, completed application form, passport photos, travel insurance, flight bookings, accommodation proof, and financial statements. Our document checker helps ensure you have everything needed."
    },
    {
      question: "Can you help if my visa gets rejected?",
      answer: "Yes! We offer a 100% approval guarantee. If your visa is rejected due to our error, we'll reapply for free. Our expert review process minimizes rejection risks significantly."
    },
    {
      question: "Do I need travel insurance for my visa application?",
      answer: "Most short-stay visas require travel insurance with minimum coverage (usually €30,000 for Schengen). We can help you get compliant insurance as part of our visa package."
    },
    {
      question: "Can I extend my short-stay visa once I'm there?",
      answer: "Short-stay visas generally cannot be extended beyond the maximum allowed duration (usually 90 days). You must exit and reapply. We can advise on the best strategy for longer stays."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated world map background */}
        <div className="absolute inset-0 opacity-5">
          <Globe className="absolute top-20 left-1/4 w-32 h-32 text-blue-600 animate-pulse" />
          <MapPin className="absolute top-40 right-1/3 w-6 h-6 text-blue-500 animate-bounce" />
          <MapPin className="absolute bottom-32 left-1/3 w-8 h-8 text-green-500 animate-bounce" style={{ animationDelay: '1s' }} />
          <MapPin className="absolute bottom-20 right-1/4 w-4 h-4 text-red-500 animate-bounce" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in">
            Short-Stay Visas Made Easy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Get the right visa in one click and start planning the fun part of your trip.
          </p>
          <Button 
            onClick={scrollToCards}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in"
          >
            Compare Visa Options
          </Button>
        </div>
      </section>

      {/* Info Ribbon */}
      <section className="py-4 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="flex-1 max-w-4xl">
              <p className="text-blue-800 text-lg">
                <strong>What's a Schengen visa?</strong> A single short-stay visa that lets you visit 27 European countries for up to 90 days in a 180-day period.
              </p>
            </div>
            <Dialog open={showSchengenModal} onOpenChange={setShowSchengenModal}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                  <Info className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>About Schengen Visas</DialogTitle>
                  <DialogDescription className="space-y-3 text-left">
                    <p>The Schengen Area includes 27 European countries that have abolished passport controls at their mutual borders.</p>
                    <p>With one Schengen visa, you can travel freely between these countries for tourism, business, or visiting family for up to 90 days within any 180-day period.</p>
                    <p>This makes it perfect for European multi-country trips without needing separate visas for each destination.</p>
                    <Button asChild className="w-full mt-4">
                      <a href="/visas/schengen-short-stay" target="_blank">
                        Learn More About Schengen Visas
                      </a>
                    </Button>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Primary Visa Cards Grid */}
      <section id="visa-cards" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Short-Stay Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {primaryVisas.map((visa) => (
              <Card key={visa.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 relative">
                {/* Promo pill */}
                <Badge className="absolute top-4 right-4 z-10 bg-orange-500 text-white">
                  {visa.promo}
                </Badge>
                
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={visa.image}
                    alt={visa.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                
                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{visa.name}</h3>
                  <div className="h-px bg-gray-200 mb-4" />
                  
                  <div className="mb-4">
                    <p className="font-semibold text-orange-600 mb-2">{visa.tagline}</p>
                    <p className="text-gray-600 text-sm mb-4">{visa.description}</p>
                    
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 24/7 AI assistant</li>
                      <li>• Expedited appointments</li>
                      <li>• Document review</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">${visa.price}</span>
                    <span className="text-sm text-gray-500">starting from</span>
                  </div>
                  
                  <Button 
                    className="w-full mb-3 rounded-full"
                    style={{ backgroundColor: '#FF6B35' }}
                    onClick={() => window.location.href = `/checkout?visa=${visa.id}`}
                  >
                    Start Application
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="w-full text-gray-600">
                    Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Schengen Countries */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
              Popular Schengen Countries
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {schengenCountries.map((country) => (
                <Card key={country.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="relative h-32">
                    <img
                      src={country.image}
                      alt={country.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-sm mb-1">{country.name}</h4>
                    <p className="text-xs text-orange-600 font-semibold mb-1">{country.tagline}</p>
                    <p className="text-xs text-gray-600 mb-3">{country.description}</p>
                    <Button size="sm" className="w-full text-xs" onClick={() => window.location.href = country.route}>
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Conversion Booster */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Star className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">⭐ 4.9/5 on Trustpilot</h3>
              <p className="text-gray-600">Thousands of happy travelers</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">2,800+ visas approved</h3>
              <p className="text-gray-600">99% success rate</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">AI-powered document checker</h3>
              <p className="text-gray-600">Reduce errors, save time</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible>
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        {/* Curved top edge */}
        <div className="absolute top-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-12 fill-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0V40c120,30,240,30,360,0s240-30,360,0s240,30,360,0s120-30,120,0V0H0z" />
          </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 mt-8">
          <h2 className="text-3xl font-bold mb-4">
            Still unsure? Book a free 15-minute call with a visa expert.
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get personalized advice for your specific travel situation
          </p>
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full"
            onClick={() => window.open('https://calendly.com/camronm-oneglobaltrip/30min?filter=visa-discovery-call', '_blank')}
          >
            Book Free Consultation
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShortStayVisas;
