
import React from 'react';
import { cn } from '@/lib/utils';
import { useImageOptimization } from '@/hooks/useImageOptimization';

interface OptimizedPictureProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  isLoaded: boolean;
  hasError: boolean;
  currentSrc: string;
  onLoad: () => void;
  onError: () => void;
  imgRef: React.RefObject<HTMLImageElement>;
}

const OptimizedPicture = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '100vw',
  isLoaded,
  hasError,
  currentSrc,
  onLoad,
  onError,
  imgRef,
  ...props
}: OptimizedPictureProps) => {
  const { supportsWebP, generateSrcSet } = useImageOptimization();

  return (
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
        onLoad={onLoad}
        onError={onError}
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
  );
};

export default OptimizedPicture;
