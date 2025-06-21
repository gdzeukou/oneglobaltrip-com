
import { useState } from 'react';
import { Search, MapPin, Calendar, Users, Plane, Camera, Mountain, Waves, Building, Star, Heart, ArrowRight, FileText, Clock, CheckCircle, Shield, Award, Headphones, ChevronDown, ChevronUp, Play, Phone, Mail, MapPin as Location, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Index = () => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    travelDates: '',
    interests: ''
  });

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
      name: "Sarah & Mike Johnson",
      location: "Austin, TX",
      rating: 5,
      text: "One Global Trip made our European honeymoon absolutely perfect. The visa process was seamless and every detail was handled beautifully.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
    },
    {
      name: "Jennifer Chen",
      location: "San Francisco, CA", 
      rating: 5,
      text: "I was stressed about getting my Schengen visa, but their team guided me through everything. Highly recommend their services!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      name: "David Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "The $0 down payment option was exactly what we needed. Professional service from start to finish.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    }
  ];

  const faqs = [
    {
      question: "How does the $0 down payment work?",
      answer: "You can reserve your trip today with no upfront payment. We'll contact you within 24 hours to confirm details and discuss a payment plan that works for you."
    },
    {
      question: "What if my visa gets rejected?",
      answer: "We offer a 100% visa guarantee. If your visa is rejected despite following our guidance, we provide a full refund of visa fees."
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking 2-3 months in advance for optimal visa processing time and better flight/hotel availability."
    },
    {
      question: "Do you handle group bookings?",
      answer: "Yes! We specialize in group travel and offer special rates for groups of 6 or more travelers."
    },
    {
      question: "What's included in your packages?",
      answer: "Our packages include accommodations, guided tours, visa assistance, travel insurance, and 24/7 support throughout your trip."
    }
  ];

  const packages = [
    {
      title: "Paris + Santorini Escape",
      description: "Romance meets Mediterranean beauty",
      price: "From $2,499",
      image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop",
      duration: "7 days"
    },
    {
      title: "London-Amsterdam Rail Adventure", 
      description: "Two iconic cities, scenic rail journey",
      price: "From $3,299",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
      duration: "10 days"
    },
    {
      title: "Swiss Alps Luxury Retreat",
      description: "Ultimate alpine luxury experience",
      price: "From $4,299", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      duration: "5 days"
    },
    {
      title: "Mediterranean Coast Explorer",
      description: "Multi-country coastal adventure",
      price: "From $3,899",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop", 
      duration: "14 days"
    }
  ];

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would submit to Supabase
    console.log('Lead form submitted:', leadForm);
    setShowLeadModal(false);
    alert('Thank you! We\'ll send your free visa checklist within 1 hour.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop" alt="European mountain landscape" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 hero-text animate-fade-in">
            Travel Europe the
            <span className="block text-yellow-500">Visa-Friendly Way</span>
            <span className="block text-2xl md:text-3xl mt-4 font-normal">Pay $0 Down</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto animate-slide-up">
            Luxury itineraries + guaranteed-guidance visas. Book now, pay when everything's confirmed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-scale-in">
            <Button 
              size="lg" 
              asChild
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold px-8 py-4 text-lg pulse-glow"
            >
              <Link to="/packages">
                Plan My Trip
                <Plane className="h-5 w-5 ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold px-8 py-4 text-lg"
              onClick={() => setShowLeadModal(true)}
            >
              FREE VISA CHECKLIST
              <FileText className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-12 opacity-60">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">IATA Certified</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">ASTA Member</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Allianz Partner</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Fora Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why One Global Trip */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why One Global Trip?</h2>
            <p className="text-xl text-gray-600">Three pillars of worry-free European travel</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover-lift card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visa-Safe Itineraries</h3>
              <p className="text-gray-600 leading-relaxed">Every destination pre-approved, every document double-checked. No visa surprises, ever.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover-lift card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Concierge Trip Design</h3>
              <p className="text-gray-600 leading-relaxed">Handcrafted itineraries tailored to your style, budget, and travel dreams.</p>
            </div>
            
            <div className="text-center p-8 bg-white rounded-lg shadow-sm hover-lift card-hover">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Zero-Risk Booking</h3>
              <p className="text-gray-600 leading-relaxed">$0 down, visa guarantee, and 24/7 support. Your peace of mind is our priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Talk to an Agent CTA Row */}
      <section className="bg-gradient-to-r from-blue-50 to-yellow-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <MessageCircle className="h-8 w-8 text-blue-900" />
            <h3 className="text-2xl font-bold text-gray-900">Questions? Talk to an Agent now.</h3>
          </div>
          <Button size="lg" asChild className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white font-bold px-8 py-4 text-lg">
            <Link to="/get-started">
              TALK TO AN AGENT
              <Phone className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-xl text-gray-600">Handpicked European adventures with visa assistance included</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className="overflow-hidden hover-lift card-hover group">
                <div className="relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-yellow-500 text-blue-900 px-3 py-1 rounded-full text-sm font-bold">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
                    {pkg.duration}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                  <p className="text-gray-600 mb-4">{pkg.description}</p>
                  <Button asChild className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                    <Link to="/packages">
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold px-8 py-4">
              <Link to="/packages">
                View All Packages
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Visa Services Spotlight */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Visa Services Spotlight</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Schengen Full Pack</h4>
                    <p className="text-gray-600">Access 27 European countries with expert guidance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">UK Visa Pass</h4>
                    <p className="text-gray-600">Streamlined UK visitor visa processing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Brazil eVisa</h4>
                    <p className="text-gray-600">Quick electronic visa for South American adventures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Passport Renewal Help</h4>
                    <p className="text-gray-600">Expedited passport services when you need them</p>
                  </div>
                </div>
              </div>
              <Button size="lg" asChild className="mt-8 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700">
                <Link to="/visas">
                  Check My Eligibility
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="text-gray-700">Document Review & Preparation</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="text-gray-700">Application Submission</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="text-gray-700">Status Tracking</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">✓</div>
                  <span className="text-gray-700">Guaranteed Approval</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-500 text-blue-900 rounded-full flex items-center justify-center text-sm font-bold">★</div>
                  <span className="text-gray-700 font-semibold">100% Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Journey with Us</h2>
            <p className="text-xl text-gray-600">Simple steps to your dream European vacation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { icon: MessageCircle, title: "Consult", desc: "Free 15-min call to understand your needs" },
              { icon: Building, title: "Design", desc: "Custom itinerary crafted just for you" },
              { icon: FileText, title: "Visa", desc: "We handle all visa requirements" },
              { icon: Plane, title: "Travel", desc: "Enjoy your worry-free European adventure" },
              { icon: Headphones, title: "Support", desc: "24/7 assistance throughout your trip" }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-900 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-gray-600">Real stories from real adventures</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover-lift">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency / Offer Strip */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-4">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-blue-900 font-bold text-lg">
            ✈️ Summer slots filling fast — reserve today for $0 down.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about our $0 down guarantee</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Lead Modal */}
      <Dialog open={showLeadModal} onOpenChange={setShowLeadModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900">Get Your Free Visa Checklist</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={leadForm.name}
                onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="travel-dates">Travel Dates (optional)</Label>
              <Input
                id="travel-dates"
                placeholder="e.g., Summer 2024"
                value={leadForm.travelDates}
                onChange={(e) => setLeadForm({...leadForm, travelDates: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="interests">Interested Destinations</Label>
              <Textarea
                id="interests"
                placeholder="Tell us where you'd like to go..."
                value={leadForm.interests}
                onChange={(e) => setLeadForm({...leadForm, interests: e.target.value})}
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold">
              Send My Free Checklist
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
