
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useImageOptimization } from '@/hooks/useImageOptimization';
import { useImageLazyLoading } from '@/hooks/useImageLazyLoading';
import ImageLoadingState from './image-states/ImageLoadingState';
import ImageOverlay from './image-states/ImageOverlay';
import OptimizedPicture from './image-states/OptimizedPicture';

interface EnhancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: string;
  overlay?: boolean;
  overlayColor?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const EnhancedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  aspectRatio,
  overlay = false,
  overlayColor = 'bg-black/20',
  quality = 80,
  placeholder = 'blur',
  sizes = '100vw',
  onLoad,
  onError,
  ...props
}: EnhancedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  
  const { isInView, imgRef } = useImageLazyLoading(priority);
  const { supportsWebP, generateOptimizedUrl } = useImageOptimization();

  // Set appropriate source based on browser support and loading state
  useEffect(() => {
    if (!isInView) return;

    const webpSupported = supportsWebP();
    const optimizedSrc = webpSupported 
      ? generateOptimizedUrl(src, width, 'webp')
      : generateOptimizedUrl(src, width);
    
    setCurrentSrc(optimizedSrc);
  }, [isInView, src, width, supportsWebP, generateOptimizedUrl]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    setCurrentSrc('/placeholder.svg');
    onError?.();
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }}>
      <ImageLoadingState 
        placeholder={placeholder}
        isLoaded={isLoaded}
        hasError={hasError}
        isInView={isInView}
      />
      
      {/* Main image */}
      {isInView && (
        <OptimizedPicture
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          isLoaded={isLoaded}
          hasError={hasError}
          currentSrc={currentSrc}
          onLoad={handleLoad}
          onError={handleError}
          imgRef={imgRef}
          {...props}
        />
      )}
      
      <ImageOverlay 
        overlay={overlay}
        overlayColor={overlayColor}
        isLoaded={isLoaded}
      />
    </div>
  );
};

export default EnhancedImage;
