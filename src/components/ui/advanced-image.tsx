
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdvancedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: string;
  sizes?: string;
  blurDataURL?: string;
  dominantColor?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const AdvancedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  aspectRatio,
  sizes = '100vw',
  blurDataURL,
  dominantColor = '#f3f4f6',
  onLoad,
  onError,
  ...props
}: AdvancedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate low-quality placeholder from source
  const generateBlurDataURL = (originalSrc: string) => {
    if (blurDataURL) return blurDataURL;
    if (originalSrc.includes('unsplash.com')) {
      return `${originalSrc}&w=10&q=10&blur=50`;
    }
    return '';
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const blurUrl = generateBlurDataURL(src);

  return (
    <div 
      className={cn("relative overflow-hidden", className)} 
      style={{ aspectRatio }}
      ref={imgRef}
    >
      {/* Dominant color background */}
      <div 
        className="absolute inset-0" 
        style={{ backgroundColor: dominantColor }}
      />

      {/* Blur placeholder */}
      {blurUrl && !isLoaded && isInView && (
        <img
          src={blurUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Loading animation */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      )}

      {/* Main image */}
      {isInView && (
        <img
          src={hasError ? '/placeholder.svg' : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-out",
            isLoaded 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105",
            hasError && "object-contain"
          )}
          sizes={sizes}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default AdvancedImage;
