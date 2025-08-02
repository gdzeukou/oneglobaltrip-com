import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, X } from 'lucide-react';
import { BOOKING_PLANS } from '@/data/bookingPlans';
import BookingModal from '@/components/booking/BookingModal';
import { BookingPlan } from '@/types/booking';

const ReadyToBookCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<BookingPlan | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollProgress = scrolled / (documentHeight - windowHeight);

      // Show CTA when 80% scrolled or near footer
      if (scrollProgress > 0.8 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handlePlanSelect = (plan: BookingPlan) => {
    setSelectedPlan(plan);
    setShowBookingModal(true);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-sm">
        <Card className="shadow-xl border-2 border-accent/20">
          <CardContent className="p-4">
            {!isExpanded ? (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">Ready to Book?</h3>
                  <p className="text-sm text-muted-foreground">Starting from $69</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setIsExpanded(true)}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsVisible(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Choose Your Plan</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsVisible(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {BOOKING_PLANS.map((plan) => (
                    <Button
                      key={plan.id}
                      variant="outline"
                      className="w-full justify-between h-auto p-3"
                      onClick={() => handlePlanSelect(plan)}
                    >
                      <div className="text-left">
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-xs text-muted-foreground">{plan.sla}</div>
                      </div>
                      <div className="font-bold">${plan.price}</div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showBookingModal && selectedPlan && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          selectedPlan={selectedPlan}
        />
      )}
    </>
  );
};

export default ReadyToBookCTA;