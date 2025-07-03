
import React from 'react';
import { SkeletonEnhanced } from '../skeleton-enhanced';

const HeroCarouselSkeleton = () => {
  return (
    <div className="relative w-full h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden bg-gray-100">
      {/* Background skeleton */}
      <SkeletonEnhanced className="absolute inset-0 w-full h-full" />
      
      {/* Content skeleton */}
      <div className="absolute inset-0 flex items-end justify-start">
        <div className="w-full p-8 md:p-16 lg:p-24 max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Title skeleton */}
            <SkeletonEnhanced className="h-16 md:h-20 lg:h-24 w-3/4 bg-white/20" />
            
            {/* Subtitle skeleton */}
            <SkeletonEnhanced variant="text" lines={2} className="max-w-4xl [&>div]:bg-white/15" />
            
            {/* Button skeletons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SkeletonEnhanced className="h-14 w-48 bg-white/20" />
              <SkeletonEnhanced className="h-14 w-40 bg-white/15" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation skeleton */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <SkeletonEnhanced className="h-12 w-12 rounded-full bg-white/20" />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <SkeletonEnhanced className="h-12 w-12 rounded-full bg-white/20" />
      </div>

      {/* Indicators skeleton */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonEnhanced key={i} className="w-4 h-4 rounded-full bg-white/30" />
        ))}
      </div>
    </div>
  );
};

export default HeroCarouselSkeleton;
