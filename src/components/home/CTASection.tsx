import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { User, MapPin, ArrowRight } from 'lucide-react';
import UnifiedTravelForm from '@/components/forms/UnifiedTravelForm';

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormComplete = () => {
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        {user ? (
          // Signed-in user CTA
          <>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Continue Your Journey, {user.email?.split('@')[0]}!
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Your next adventure is just a click away. Access your personalized dashboard 
              or explore exclusive travel packages curated just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/dashboard')}
              >
                <User className="h-5 w-5 mr-2" />
                View My Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-3 bg-white/10 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/packages')}
              >
                <MapPin className="h-5 w-5 mr-2" />
                Explore Premium Deals
              </Button>
            </div>
          </>
        ) : (
          // Non-signed-in user CTA (keep existing)
          <>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of satisfied travelers who trust us with their adventures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
                  >
                    Start My Trip
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
                  <UnifiedTravelForm 
                    type="consultation"
                    onComplete={handleFormComplete}
                  />
                </DialogContent>
              </Dialog>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-3"
                onClick={() => navigate('/packages')}
              >
                Explore Deals
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CTASection;
