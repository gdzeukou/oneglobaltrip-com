
import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Camera, Mountain, Waves, Building, Star, Heart, ArrowRight, FileText, Clock, CheckCircle, Shield, Award, Headphones, ChevronDown, ChevronUp, Play, Phone, Mail, MapPin as Location } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const featuredPackages = [
    {
      id: 1,
      name: 'Paris + Santorini Escape',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
      price: 'From $2,499',
      duration: '10 Days',
      description: 'Romance in the City of Light, then Greek island bliss'
    },
    {
      id: 2,
      name: 'London-Amsterdam Rail Adventure',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      price: 'From $1,899',
      duration: '8 Days',
      description: 'Royal London meets Dutch charm via scenic railways'
    },
    {
      id: 3,
      name: 'Mediterranean Grand Tour',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      price: 'From $3,299',
      duration: '14 Days',
      description: 'Spain, France, Italy - the ultimate coastal journey'
    },
    {
      id: 4,
      name: 'Swiss Alps & Bavaria',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      price: 'From $2,799',
      duration: '12 Days',
      description: 'Mountain peaks, fairy-tale castles, alpine luxury'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      location: 'Dallas, TX',
      rating: 5,
      text: 'One Global Trip made our Schengen visa process seamless. The $0 down payment gave us peace of mind to plan without stress!',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Michael & Jennifer R.',
      location: 'Austin, TX',
      rating: 5,
      text: 'Our London-Paris trip was flawless. Camron and Zuku handled every detail - we just showed up and enjoyed!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'David L.',
      location: 'Houston, TX',
      rating: 5,
      text: 'Best travel investment ever. The visa guarantee saved us from a nightmare, and the trip exceeded expectations.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    }
  ];

  const faqs = [
    {
      id: 'payment',
      question: 'How does the $0 down payment work?',
      answer: 'You reserve your trip and visa services with no upfront payment. We only collect payment once your visa is approved and travel arrangements are confirmed. This eliminates your financial risk.'
    },
    {
      id: 'visa-guarantee',
      question: 'What if my visa gets denied?',
      answer: 'Our visa guarantee means if your application is denied due to our guidance, we provide a full refund of all fees paid. We have a 98% approval rate for properly prepared applications.'
    },
    {
      id: 'timeline',
      question: 'How far in advance should I book?',
      answer: 'We recommend booking 3-4 months ahead for optimal visa processing time and best travel rates. However, we can accommodate shorter timelines with expedited services.'
    },
    {
      id: 'included',
      question: "What's included in the package price?",
      answer: 'All packages include accommodations, transportation, visa assistance, 24/7 concierge support, and detailed itineraries. Meals and activities vary by package.'
    },
    {
      id: 'changes',
      question: 'Can I modify my trip after booking?',
      answer: 'Yes! We offer flexible modifications up to 60 days before departure. Changes may affect pricing and visa requirements, which we\'ll handle for you.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/b3a89cf1-b7be-4c8e-be8f-774de3f62929.png" 
                alt="One Global Trip" 
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-gray-900">
                One Global Trip
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Home</a>
              <a href="#packages" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Packages</a>
              <a href="#visas" className="text-gray-700 hover:text-blue-900 transition-colors font-medium">Visas</a>
              <Button className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-semibold">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-blue-800/40 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&h=900&fit=crop')] bg-cover bg-center"></div>
        
        <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
            Travel Europe the 
            <span className="block text-yellow-400">Visa-Friendly Way</span>
            <span className="block text-3xl md:text-4xl mt-4 font-semibold">Pay $0 Down</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/90 animate-fade-in max-w-3xl mx-auto leading-relaxed">
            Luxury itineraries + guaranteed-guidance visas. Book now, pay when everything's confirmed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold px-8 py-4 text-lg">
              Plan My Trip
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold"
              onClick={() => setShowLeadModal(true)}
            >
              Free Visa Checklist
              <FileText className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-gray-600">IATA</div>
            <div className="text-2xl font-bold text-gray-600">ASTA</div>
            <div className="text-2xl font-bold text-gray-600">Allianz Travel</div>
            <div className="text-2xl font-bold text-gray-600">Fora Travel</div>
          </div>
        </div>
      </section>

      {/* Why One Global Trip */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why One Global Trip?</h2>
            <p className="text-xl text-gray-600">Three pillars of worry-free European travel</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visa-Safe Itineraries</h3>
              <p className="text-gray-600 leading-relaxed">Every trip is designed with visa requirements in mind. No surprises, no rejections, just seamless approval.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Concierge Trip Design</h3>
              <p className="text-gray-600 leading-relaxed">Personalized itineraries crafted by travel experts who know Europe inside and out.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Headphones className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zero-Risk Booking</h3>
              <p className="text-gray-600 leading-relaxed">$0 down, visa guarantee, and 24/7 support. Your peace of mind is our priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section id="packages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Europe Packages</h2>
            <p className="text-xl text-gray-600">Our most popular visa-included journeys</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPackages.map((pkg) => (
              <Card key={pkg.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white">
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                  <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Services Spotlight */}
      <section id="visas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Visa Services That Actually Work</h2>
              <p className="text-xl text-gray-600 mb-8">98% approval rate with our proven process</p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Schengen Full Pack</h3>
                    <p className="text-gray-600">26 countries, one application. We handle everything.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">UK Visa Pass</h3>
                    <p className="text-gray-600">Fast-track British visa processing with premium support.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Brazil eVisa</h3>
                    <p className="text-gray-600">Electronic visa processing in 5-10 business days.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Passport Renewal Help</h3>
                    <p className="text-gray-600">Expedited passport services and renewal assistance.</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="mt-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                Check My Eligibility
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-yellow-50 p-8 rounded-2xl">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Consult</h4>
                    <p className="text-sm text-gray-600">15-min call to assess your needs</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Design</h4>
                    <p className="text-sm text-gray-600">Custom itinerary with visa strategy</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Visa</h4>
                    <p className="text-sm text-gray-600">We handle all paperwork and applications</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Travel</h4>
                    <p className="text-sm text-gray-600">Enjoy your worry-free European adventure</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Support</h4>
                    <p className="text-sm text-gray-600">24/7 concierge during your trip</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-white border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            ✈️ Summer slots filling fast — reserve today for $0 down
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our $0 down guarantee</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/b3a89cf1-b7be-4c8e-be8f-774de3f62929.png" 
                alt="One Global Trip" 
                className="h-8 w-8 brightness-0 invert"
              />
              <span className="text-xl font-bold">One Global Trip</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              U.S.-based, travel-obsessed founders helping Americans explore Europe with confidence.
            </p>
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" 
                alt="Camron" 
                className="w-12 h-12 rounded-full"
              />
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop" 
                alt="Zuku" 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Camron & Zuku</p>
                <p className="text-sm text-gray-400">Co-Founders</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Visa Services</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@oneglobaltrip.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Location className="h-4 w-4 mt-1" />
                <span>Austin, Texas<br />United States</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 One Global Trip. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>

      {/* Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Visa Checklist</h3>
            <p className="text-gray-600 mb-6">Get our comprehensive visa preparation guide delivered to your inbox.</p>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Email Address" />
              <Input placeholder="Phone Number" />
              <Button className="w-full bg-gradient-to-r from-blue-900 to-blue-800">
                Send My Checklist
              </Button>
            </form>
            <Button 
              variant="ghost" 
              className="w-full mt-4"
              onClick={() => setShowLeadModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
