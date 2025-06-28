
import { Plane, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SchengenBottomCTA = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCTAClick = () => {
    if (user) {
      // User is already signed in, redirect to application
      navigate('/dashboard');
    } else {
      // User needs to sign in first
      navigate('/auth');
    }
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1920&h=600&fit=crop"
          alt="European skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Plane className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Ready to Explore Europe?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust One Global Trip for their European adventures. 
            Your journey starts with a single click.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-4 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span className="mr-3">Sign In & Start Your Application</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white/80 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>97% Approval Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Fast 7-Day Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/70 text-sm mb-4">
            Trusted by over 15,000 travelers worldwide
          </p>
          <div className="flex justify-center space-x-6 opacity-75">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">SSL</span>
              </div>
              <span className="text-white text-xs">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">GDPR</span>
              </div>
              <span className="text-white text-xs">Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">24/7</span>
              </div>
              <span className="text-white text-xs">Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchengenBottomCTA;
