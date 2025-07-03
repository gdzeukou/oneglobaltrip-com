
import React from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import SmartApplicationRouter from './SmartApplicationRouter';

interface SmartApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartApplyModal = ({ isOpen, onClose }: SmartApplyModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <h2>Smart Application Router</h2>
        </DialogHeader>
        <SmartApplicationRouter onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default SmartApplyModal;
