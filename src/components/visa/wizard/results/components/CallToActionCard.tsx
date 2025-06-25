
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CallToActionCardProps {
  hasVisaRequired: boolean;
  onBookConsultation: () => void;
}

const CallToActionCard = ({ hasVisaRequired, onBookConsultation }: CallToActionCardProps) => {
  if (!hasVisaRequired) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <CardContent className="p-6 text-center">
        <h4 className="text-xl font-bold mb-4">Ready to Start Your Applications?</h4>
        <p className="mb-6">
          Don't let visa requirements delay your multi-destination adventure. 
          Our experts can help coordinate all your applications.
        </p>
        <div className="space-y-3">
          <Button 
            size="lg" 
            className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold"
            onClick={onBookConsultation}
          >
            Get Expert Help for All Visas
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <div className="text-sm text-blue-100">
            ✓ Coordinated applications ✓ Timeline management ✓ Document review
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallToActionCard;
