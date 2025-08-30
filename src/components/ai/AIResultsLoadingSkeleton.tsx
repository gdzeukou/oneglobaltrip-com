import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SkeletonEnhanced } from '@/components/ui/skeleton-enhanced';

const AIResultsLoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 mt-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <SkeletonEnhanced className="h-8 w-48" />
        <SkeletonEnhanced className="h-10 w-32" />
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="card-luxury">
            <CardContent className="p-6">
              {/* Header Skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <SkeletonEnhanced variant="avatar" className="w-12 h-12" />
                  <div className="space-y-2">
                    <SkeletonEnhanced className="h-6 w-32" />
                    <SkeletonEnhanced className="h-4 w-16" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <SkeletonEnhanced className="h-8 w-24" />
                  <SkeletonEnhanced className="h-6 w-20" />
                </div>
              </div>

              {/* Timeline Skeleton */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <SkeletonEnhanced className="h-8 w-16 mb-2" />
                    <SkeletonEnhanced className="h-4 w-12" />
                  </div>
                  <SkeletonEnhanced className="h-2 w-32 flex-1 mx-4" />
                  <div className="text-center">
                    <SkeletonEnhanced className="h-8 w-16 mb-2" />
                    <SkeletonEnhanced className="h-4 w-12" />
                  </div>
                </div>
              </div>

              {/* Details Grid Skeleton */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-xl">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex flex-col items-center space-y-2">
                    <SkeletonEnhanced variant="avatar" className="w-5 h-5" />
                    <SkeletonEnhanced className="h-4 w-12" />
                    <SkeletonEnhanced className="h-3 w-16" />
                  </div>
                ))}
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex space-x-3">
                <SkeletonEnhanced variant="button" className="flex-1 h-12" />
                <SkeletonEnhanced variant="button" className="w-24 h-12" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AIResultsLoadingSkeleton;