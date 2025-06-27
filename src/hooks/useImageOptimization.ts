
import { useState, useEffect } from 'react';

export const useImageOptimization = () => {
  // Check WebP support
  const supportsWebP = () => {
    if (typeof window === 'undefined') return false;
    
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Generate optimized URLs
  const generateOptimizedUrl = (originalSrc: string, width?: number, format?: string) => {
    if (originalSrc.includes('unsplash.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const params = new URLSearchParams();
      if (width) params.set('w', width.toString());
      params.set('q', '80'); // Default quality
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

  return {
    supportsWebP,
    generateOptimizedUrl,
    generateSrcSet
  };
};
