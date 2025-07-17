import { useEffect, useCallback, useRef } from 'react';
import { PerformanceMonitor } from '@/utils/performance';

export const usePerformanceOptimization = () => {
  const performanceMonitor = useRef<PerformanceMonitor | null>(null);

  useEffect(() => {
    performanceMonitor.current = PerformanceMonitor.getInstance();
    
    return () => {
      performanceMonitor.current?.cleanup();
    };
  }, []);

  const trackPageView = useCallback((pageName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: pageName,
        page_location: window.location.href,
      });
    }
  }, []);

  const preloadRoute = useCallback((routePath: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
  }, []);

  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        { rootMargin: '50px 0px' }
      );

      images.forEach((img) => imageObserver.observe(img));
    }
  }, []);

  const measurePageSpeed = useCallback(() => {
    return performanceMonitor.current?.getPageSpeedScore() || 0;
  }, []);

  return {
    trackPageView,
    preloadRoute,
    optimizeImages,
    measurePageSpeed,
  };
};

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, []);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(callback, {
        rootMargin: '50px 0px',
        threshold: 0.1,
        ...options,
      });
    }

    return () => {
      disconnect();
    };
  }, [callback, disconnect, options]);

  return { observe, unobserve, disconnect };
};