import { lazy } from 'react';

// Lazy load page components for better performance
export const LazyIndex = lazy(() => import('@/pages/Index'));
export const LazyVisas = lazy(() => import('@/pages/Visas'));
export const LazyShortStayVisas = lazy(() => import('@/pages/ShortStayVisas'));
export const LazyLongStayVisas = lazy(() => import('@/pages/LongStayVisas'));
export const LazyPackages = lazy(() => import('@/pages/Packages'));
export const LazyAuth = lazy(() => import('@/pages/Auth'));
export const LazyDashboard = lazy(() => import('@/pages/Dashboard'));
export const LazyBooking = lazy(() => import('@/pages/Booking'));
export const LazyConcierge = lazy(() => import('@/pages/Concierge'));
export const LazyAdmin = lazy(() => import('@/pages/Admin'));
export const LazyAdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
export const LazyContact = lazy(() => import('@/pages/Contact'));

// Visa country pages
export const LazySchengenShortStay = lazy(() => import('@/pages/visa-countries/SchengenShortStay'));
export const LazySchengenShortStayLanding = lazy(() => import('@/pages/visa-countries/SchengenShortStayLanding'));
export const LazyUKShortStay = lazy(() => import('@/pages/visa-countries/UKShortStay'));
export const LazyUK5YearShortStay = lazy(() => import('@/pages/visa-countries/UK5YearShortStay'));
export const LazyCanadaShortStay = lazy(() => import('@/pages/visa-countries/CanadaShortStay'));
export const LazyBrazilShortStay = lazy(() => import('@/pages/visa-countries/BrazilShortStay'));
export const LazyNigeriaShortStay = lazy(() => import('@/pages/visa-countries/NigeriaShortStay'));
export const LazyUAEShortStay = lazy(() => import('@/pages/visa-countries/UAEShortStay'));
export const LazyIndiaShortStay = lazy(() => import('@/pages/visa-countries/IndiaShortStay'));
export const LazyPortugalLongStay = lazy(() => import('@/pages/visa-countries/PortugalLongStay'));
export const LazyNorwayLongStay = lazy(() => import('@/pages/visa-countries/NorwayLongStay'));
export const LazyDenmarkLongStay = lazy(() => import('@/pages/visa-countries/DenmarkLongStay'));
export const LazyFinlandLongStay = lazy(() => import('@/pages/visa-countries/FinlandLongStay'));
export const LazyGermanyLongStay = lazy(() => import('@/pages/visa-countries/GermanyLongStay'));
export const LazyFranceLongStay = lazy(() => import('@/pages/visa-countries/FranceLongStay'));
export const LazySwitzerlandLongStay = lazy(() => import('@/pages/visa-countries/SwitzerlandLongStay'));
export const LazyNigeriaLongStay = lazy(() => import('@/pages/visa-countries/NigeriaLongStay'));

// Loading component for Suspense fallback
export const LoadingFallback = ({ message = "Loading..." }: { message?: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-white">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-lg font-medium text-gray-700">{message}</p>
      <p className="text-sm text-gray-500 mt-2">Preparing your experience...</p>
    </div>
  </div>
);

// Preload utility for route prefetching
export const preloadComponent = (importFn: () => Promise<any>) => {
  const componentImport = importFn();
  return componentImport;
};

// Route preloading based on user interaction
export const setupRoutePreloading = () => {
  if (typeof window === 'undefined') return;

  // Preload routes on hover
  const addHoverPreloading = () => {
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
      let timeoutId: NodeJS.Timeout;
      
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (!href) return;
        
        // Delay preloading to avoid unnecessary requests
        timeoutId = setTimeout(() => {
          preloadRouteComponent(href);
        }, 100);
      });
      
      link.addEventListener('mouseleave', () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      });
    });
  };

  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addHoverPreloading);
  } else {
    addHoverPreloading();
  }
};

// Map routes to their lazy components
const routeComponentMap: Record<string, () => Promise<any>> = {
  '/': () => import('@/pages/Index'),
  '/visas': () => import('@/pages/Visas'),
  '/visas/short-stay': () => import('@/pages/ShortStayVisas'),
  '/visas/short-stay/schengen': () => import('@/pages/visa-countries/SchengenShortStayLanding'),
  '/visas/long-stay': () => import('@/pages/LongStayVisas'),
  '/packages': () => import('@/pages/Packages'),
  '/auth': () => import('@/pages/Auth'),
  '/dashboard': () => import('@/pages/Dashboard'),
  '/booking': () => import('@/pages/Booking'),
  '/contact': () => import('@/pages/Contact'),
  '/concierge': () => import('@/pages/Concierge'),
  '/admin': () => import('@/pages/Admin'),
  '/admin/dashboard': () => import('@/pages/AdminDashboard'),
};

const preloadRouteComponent = (route: string) => {
  const componentLoader = routeComponentMap[route];
  if (componentLoader) {
    componentLoader().catch(() => {
      // Silently handle preload errors
      console.log(`Failed to preload route: ${route}`);
    });
  }
};

// Progressive loading for images
export const setupProgressiveImageLoading = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Replace data-src with src for lazy loading
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        // Add loaded class for animations
        img.addEventListener('load', () => {
          img.classList.add('loaded');
        });
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all images with data-src
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
};
