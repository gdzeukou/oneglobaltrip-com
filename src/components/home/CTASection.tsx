
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of satisfied travelers who trust us with their adventures
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
              onClick={() => navigate('/dashboard')}
            >
              View My Dashboard
            </Button>
          ) : (
            <>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3"
                onClick={() => navigate('/auth')}
              >
                Create Free Account
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-900 font-bold text-lg px-8 py-3"
                onClick={() => navigate('/get-started')}
              >
                Get Free Consultation
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
