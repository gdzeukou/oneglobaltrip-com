
import { lazy } from 'react';

// Lazy loaded pages for better performance
export const LazyIndex = lazy(() => import('../pages/Index'));
export const LazyAuth = lazy(() => import('../pages/Auth'));
export const LazySimpleAuth = lazy(() => import('../pages/SimpleAuth'));
export const LazyDashboard = lazy(() => import('../pages/Dashboard'));
export const LazyPackages = lazy(() => import('../pages/Packages'));
export const LazyBooking = lazy(() => import('../pages/Booking'));
export const LazyGetStarted = lazy(() => import('../pages/GetStarted'));
export const LazyAdmin = lazy(() => import('../pages/Admin'));
export const LazyAdminDashboard = lazy(() => import('../pages/AdminDashboard'));
export const LazyVisas = lazy(() => import('../pages/Visas'));
export const LazyShortStayVisas = lazy(() => import('../pages/ShortStayVisas'));
export const LazyLongStayVisas = lazy(() => import('../pages/LongStayVisas'));
export const LazyConcierge = lazy(() => import('../pages/Concierge'));

// Visa country pages
export const LazySchengenShortStay = lazy(() => import('../pages/visa-countries/SchengenShortStay'));
export const LazyUKShortStay = lazy(() => import('../pages/visa-countries/UKShortStay'));
export const LazyUK5YearShortStay = lazy(() => import('../pages/visa-countries/UK5YearShortStay'));
export const LazyCanadaShortStay = lazy(() => import('../pages/visa-countries/CanadaShortStay'));
export const LazyBrazilShortStay = lazy(() => import('../pages/visa-countries/BrazilShortStay'));
export const LazyNigeriaShortStay = lazy(() => import('../pages/visa-countries/NigeriaShortStay'));
export const LazyUAEShortStay = lazy(() => import('../pages/visa-countries/UAEShortStay'));
export const LazyIndiaShortStay = lazy(() => import('../pages/visa-countries/IndiaShortStay'));

export const LazyPortugalLongStay = lazy(() => import('../pages/visa-countries/PortugalLongStay'));
export const LazyNorwayLongStay = lazy(() => import('../pages/visa-countries/NorwayLongStay'));
export const LazyDenmarkLongStay = lazy(() => import('../pages/visa-countries/DenmarkLongStay'));
export const LazyFinlandLongStay = lazy(() => import('../pages/visa-countries/FinlandLongStay'));
export const LazyGermanyLongStay = lazy(() => import('../pages/visa-countries/GermanyLongStay'));
export const LazyFranceLongStay = lazy(() => import('../pages/visa-countries/FranceLongStay'));
export const LazySwitzerlandLongStay = lazy(() => import('../pages/visa-countries/SwitzerlandLongStay'));
export const LazyNigeriaLongStay = lazy(() => import('../pages/visa-countries/NigeriaLongStay'));

// Performance optimization utilities
export const setupRoutePreloading = () => {
  // Preload critical routes on hover
  const preloadRoutes = [
    { path: '/packages', component: LazyPackages },
    { path: '/visas', component: LazyVisas },
    { path: '/simple-auth', component: LazySimpleAuth },
    { path: '/dashboard', component: LazyDashboard },
  ];

  preloadRoutes.forEach(({ path, component }) => {
    const links = document.querySelectorAll(`a[href="${path}"]`);
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        // Trigger lazy loading by calling the lazy component function
        import(`../pages/${component.name.replace('Lazy', '')}`);
      }, { once: true });
    });
  });
};

export const setupProgressiveImageLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};
