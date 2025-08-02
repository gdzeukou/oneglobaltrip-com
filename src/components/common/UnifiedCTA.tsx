import { ArrowRight, Phone, Calendar, Bot, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface CTAOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceNote?: string;
  image: string;
  alt: string;
  badge?: string;
  badgeColor?: string;
  route: string;
  features: string[];
}

interface UnifiedCTAProps {
  variant: 'main' | 'consultation' | 'footer';
  title: string;
  subtitle?: string;
  description?: string;
  options?: CTAOption[];
  buttonText?: string;
  buttonAction?: () => void;
  className?: string;
  id?: string;
}

const UnifiedCTA = ({
  variant,
  title,
  subtitle,
  description,
  options = [],
  buttonText,
  buttonAction,
  className = '',
  id
}: UnifiedCTAProps) => {
  const navigate = useNavigate();

  const handleConsultation = () => {
    window.open(ROUTES.CALENDLY_CONSULTATION, '_blank');
  };

  if (variant === 'main' && options.length > 0) {
    return (
      <section id={id} className={`py-12 md:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden ${className}`}>
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Passport to Worry-Free Travel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start free with our AI Travel Agent. Upgrade for visa assistance or go premium for unlimited travel support.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
              <CheckCircle className="h-4 w-4 mr-2" />
              No credit card required to start • 98% visa success rate
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Free AI Agent */}
            <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 rounded-lg">
              <div className="text-center pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                    <Bot className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Free AI Travel Agent</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-1">Free</div>
                  <p className="text-sm text-gray-500">Forever</p>
                </div>
              </div>
              
              <div className="px-6 pb-8">
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  Get personalized travel recommendations and basic planning assistance with our AI agent.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personalized itineraries</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited direct purchase through Hotels, Flights, Rentals, Cruises, more...</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Destination Inspiration and Tips</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Access to 180+ countries</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">E-Visa Wizard</span>
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/auth')}
                  className="w-full font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                >
                  Build My Free AI Agent
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Visa Assistance */}
            <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 rounded-lg">
              <div className="text-center pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <Shield className="h-8 w-8" />
                  </div>
                </div>
                 <h3 className="text-xl font-bold mb-2">Visa Assistance</h3>
                 <div className="text-center">
                   <div className="text-4xl font-bold text-gray-900 mb-1">$69</div>
                   <p className="text-sm text-gray-500">per visa</p>
                 </div>
               </div>
               
               <div className="px-6 pb-8">
                 <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                   Expert guidance and document preparation for your visa applications with 98% success rate.
                 </p>
                 
                 <ul className="space-y-3 mb-8">
                   <li className="flex items-start text-sm">
                     <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">AI-Guided Visa Form Filling</span>
                   </li>
                   <li className="flex items-start text-sm">
                     <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">Human Visa Officer Analysis</span>
                   </li>
                   <li className="flex items-start text-sm">
                     <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">Biometrics Appointment assistance</span>
                   </li>
                   <li className="flex items-start text-sm">
                     <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">Real-time embassy alerts</span>
                   </li>
                   <li className="flex items-start text-sm">
                     <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">98% success rate guarantee</span>
                   </li>
                 </ul>
                 
                 <Button 
                   onClick={() => navigate('/visas/short-stay')}
                   className="w-full font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                 >
                   Get Visa Help $69
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Global Explorer */}
            <div className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm hover:scale-105 ring-2 ring-purple-500 scale-105 rounded-lg">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-purple-600 text-white px-4 py-2 text-sm font-bold shadow-lg rounded-full">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center pt-8 pb-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <Sparkles className="h-8 w-8" />
                  </div>
                </div>
                 <h3 className="text-xl font-bold mb-2">Global Explorer</h3>
                 <div className="text-center">
                   <div className="text-4xl font-bold text-gray-900 mb-1">
                     $189<span className="text-lg font-normal text-gray-500">/year</span>
                   </div>
                   <p className="text-sm text-gray-500">30-day free trial</p>
                 </div>
              </div>
              
              <div className="px-6 pb-8">
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  Complete travel solution with unlimited AI assistance, visa support, and exclusive perks.
                </p>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Everything in Free + Visa Assistance</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Unlimited travel planning</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Exclusive travel deals</span>
                  </li>
                </ul>
                
                <Button 
                  onClick={() => navigate('/auth?trial=premium')}
                  className="w-full font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Upgrade to Global Explorer
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 w-full mx-auto shadow-lg border border-gray-100/50 backdrop-blur-sm">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Need Expert Guidance?</h3>
              <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 w-full mx-auto leading-relaxed">
                Our travel experts have successfully processed over <span className="font-bold text-blue-600">10,000</span> visa applications with a <span className="font-bold text-emerald-600">99% success rate</span>.
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base" 
                onClick={handleConsultation}
              >
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3" />
                <span className="hidden sm:inline">Book Free 30-Min Consultation</span>
                <span className="sm:hidden">Free Consultation</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'consultation') {
    return (
      <section id={id} className={`py-12 bg-gray-50 ${className}`}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{title}</h2>
          {description && (
            <p className="text-xl mb-8 text-gray-600">{description}</p>
          )}
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={buttonAction || handleConsultation}
          >
            <Phone className="h-5 w-5 mr-2" />
            {buttonText || 'Book Free Consultation'}
          </Button>
        </div>
      </section>
    );
  }

  if (variant === 'footer') {
    return (
      <section id={id} className={`py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden ${className}`}>
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
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-xl mb-8 text-blue-100">{description}</p>
          )}
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-full"
            onClick={buttonAction || handleConsultation}
          >
            {buttonText || 'Book Free Consultation'}
          </Button>
        </div>
      </section>
    );
  }

  return null;
};

export default UnifiedCTA;
