// Performance optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  
  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Lazy load images with IntersectionObserver
  initializeLazyLoading(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // Preload critical routes
  preloadCriticalRoutes(): void {
    if (typeof window === 'undefined') return;

    const criticalRoutes = ['/visas', '/packages', '/get-started'];
    
    criticalRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }

  // Optimize font loading
  optimizeFontLoading(): void {
    if (typeof window === 'undefined') return;

    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
  }

  // Monitor Core Web Vitals
  monitorWebVitals(): void {
    if (typeof window === 'undefined') return;

    // LCP (Largest Contentful Paint)
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  // Add new performance optimization methods

  // Enhanced lazy loading with blur-up technique
  initializeAdvancedLazyLoading(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Blur-up loading
          if (img.dataset.src) {
            const placeholder = new Image();
            placeholder.onload = () => {
              img.src = img.dataset.src!;
              img.classList.add('loaded');
              img.removeAttribute('data-src');
            };
            placeholder.src = img.dataset.blurSrc || img.dataset.src;
          }
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // 3D transforms optimization
  optimize3DTransforms(): void {
    if (typeof window === 'undefined') return;

    // Enable hardware acceleration for 3D elements
    const elements3D = document.querySelectorAll('[data-3d]');
    elements3D.forEach(element => {
      (element as HTMLElement).style.willChange = 'transform';
      (element as HTMLElement).style.transform = 'translateZ(0)';
    });
  }

  // Parallax performance optimization
  optimizeParallax(): void {
    if (typeof window === 'undefined') return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
      (element as HTMLElement).style.willChange = 'transform';
    });
  }

  // Enhanced bundle splitting
  implementCodeSplitting(): void {
    if (typeof window === 'undefined') return;

    // Preload critical components
    const criticalComponents = [
      '/components/home/HeroCarousel',
      '/components/Navigation',
      '/components/ui/button'
    ];

    criticalComponents.forEach(component => {
      const link = document.createElement('link');
      link.rel = 'modulepreload';
      link.href = component;
      document.head.appendChild(link);
    });
  }

  // Initialize all new optimizations
  initializeAdvancedOptimizations(): void {
    this.initializeAdvancedLazyLoading();
    this.optimize3DTransforms();
    this.optimizeParallax();
    this.implementCodeSplitting();
    this.initializeLazyLoading();
    this.preloadCriticalRoutes();
    this.optimizeFontLoading();
    this.monitorWebVitals();
  }

  // Bundle size optimization
  initializeOptimizations(): void {
    this.initializeLazyLoading();
    this.preloadCriticalRoutes();
    this.optimizeFontLoading();
    this.monitorWebVitals();
  }
}

// Initialize on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    PerformanceOptimizer.getInstance().initializeOptimizations();
  });
}

// Export utility functions
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
