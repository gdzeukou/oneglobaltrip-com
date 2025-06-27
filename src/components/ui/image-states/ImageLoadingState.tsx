
import React from 'react';

interface ImageLoadingStateProps {
  placeholder: 'blur' | 'empty';
  isLoaded: boolean;
  hasError: boolean;
  isInView: boolean;
}

const ImageLoadingState = ({ placeholder, isLoaded, hasError, isInView }: ImageLoadingStateProps) => {
  const shouldShowPlaceholder = !isLoaded && placeholder === 'blur';

  if (!isInView) return null;

  return (
    <>
      {/* Blur placeholder */}
      {shouldShowPlaceholder && (
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
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
    </>
  );
};

export default ImageLoadingState;
