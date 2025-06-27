
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageOverlayProps {
  overlay: boolean;
  overlayColor: string;
  isLoaded: boolean;
}

const ImageOverlay = ({ overlay, overlayColor, isLoaded }: ImageOverlayProps) => {
  if (!overlay || !isLoaded) return null;

  return <div className={cn("absolute inset-0", overlayColor)} />;
};

export default ImageOverlay;
