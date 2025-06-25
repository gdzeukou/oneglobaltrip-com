
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(priority);

  // Generate optimized URLs
  const generateOptimizedUrl = (originalSrc: string, width?: number, format?: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      if (quality) params.set('q', quality.toString());
      if (format) params.set('fm', format);
      params.set('fit', 'crop');
      params.set('crop', 'faces,center');
      return `${baseUrl}?${params.toString()}`;
    }
    return originalSrc;
  };

  // Generate responsive srcSet
  const generateSrcSet = (baseSrc: string, format?: string) => {
    const breakpoints = [320, 640, 768, 1024, 1280, 1920];
    return breakpoints
      .map(bp => `${generateOptimizedUrl(baseSrc, bp, format)} ${bp}w`)
      .join(', ');
  };

  // Check WebP support
  const supportsWebP = () => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || typeof window === 'undefined') {
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
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    const currentImg = imgRef.current;
    if (currentImg) {
      observer.observe(currentImg);
    }

    return () => {
      if (currentImg) {
        observer.unobserve(currentImg);
      }
    };
  }, [priority]);

  // Set appropriate source based on browser support and loading state
  useEffect(() => {
    if (!isInView) return;

    const webpSupported = supportsWebP();
    const optimizedSrc = webpSupported 
      ? generateOptimizedUrl(src, width, 'webp')
      : generateOptimizedUrl(src, width);
    
    setCurrentSrc(optimizedSrc);
  }, [isInView, src, width]);

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

  const shouldShowPlaceholder = !isLoaded && placeholder === 'blur';

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ aspectRatio }}>
      {/* Blur placeholder */}
      {shouldShowPlaceholder && (
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}
      
      {/* Main image */}
      {isInView && (
        <picture>
          {/* WebP sources for modern browsers */}
          {supportsWebP() && (
            <source
              srcSet={generateSrcSet(src, 'webp')}
              sizes={sizes}
              type="image/webp"
            />
          )}
          
          {/* Fallback sources */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            type="image/jpeg"
          />
          
          <img
            ref={imgRef}
            src={currentSrc || '/placeholder.svg'}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-all duration-500 ease-out",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
              hasError && "object-contain"
            )}
            style={{
              filter: isLoaded ? 'none' : 'blur(0px)',
            }}
            {...props}
          />
        </picture>
      )}
      
      {/* Overlay */}
      {overlay && isLoaded && (
        <div className={cn("absolute inset-0", overlayColor)} />
      )}
      
      {/* Loading indicator for slow connections */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs text-gray-500">Loading...</span>
          </div>
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedImage;
