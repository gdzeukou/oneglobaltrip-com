import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { BookingPlan } from '@/types/booking';
import BookingSteps from './BookingSteps';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: BookingPlan;
}

const BookingModal = ({ isOpen, onClose, selectedPlan }: BookingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 gap-0">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground font-[Inter]">
              Book {selectedPlan.name}
            </h2>
            <p className="text-muted-foreground">
              Complete your booking in just a few steps
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <BookingSteps selectedPlan={selectedPlan} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;