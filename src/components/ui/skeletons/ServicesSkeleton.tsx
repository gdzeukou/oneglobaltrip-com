
import React from 'react';
import { SkeletonEnhanced } from '../skeleton-enhanced';

const ServicesSkeleton = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <SkeletonEnhanced className="h-12 w-96 mx-auto mb-4" />
          <SkeletonEnhanced variant="text" lines={2} className="max-w-2xl mx-auto" />
        </div>

        {/* Services grid skeleton */}
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="group">
              <div className="bg-white rounded-2xl shadow-luxury hover:shadow-luxury-lg transition-all duration-500 p-8 border border-gray-100">
                {/* Icon skeleton */}
                <SkeletonEnhanced className="h-16 w-16 rounded-full mb-6" />
                
                {/* Title skeleton */}
                <SkeletonEnhanced className="h-8 w-3/4 mb-4" />
                
                {/* Description skeleton */}
                <SkeletonEnhanced variant="text" lines={3} className="mb-6" />
                
                {/* Features skeleton */}
                <div className="space-y-3 mb-8">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <SkeletonEnhanced className="h-4 w-4 rounded-full" />
                      <SkeletonEnhanced className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
                
                {/* Button skeleton */}
                <SkeletonEnhanced variant="button" className="h-12 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSkeleton;
