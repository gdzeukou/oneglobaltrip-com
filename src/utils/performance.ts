
export interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  constructor() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.initializeMetrics();
    }
  }

  private initializeMetrics(): void {
    // Basic timing metrics
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
    });

    // Core Web Vitals
    this.observeLCP();
    this.observeFCP();
    this.observeCLS();
    this.observeFID();
  }

  private observeLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  private observeFCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  private observeCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        this.metrics.cumulativeLayoutShift = clsValue;
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  private observeFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  logMetrics(): void {
    console.group('🚀 Performance Metrics');
    console.log('Load Time:', this.metrics.loadTime?.toFixed(2) + 'ms');
    console.log('DOM Content Loaded:', this.metrics.domContentLoaded?.toFixed(2) + 'ms');
    console.log('First Contentful Paint:', this.metrics.firstContentfulPaint?.toFixed(2) + 'ms');
    console.log('Largest Contentful Paint:', this.metrics.largestContentfulPaint?.toFixed(2) + 'ms');
    console.log('Cumulative Layout Shift:', this.metrics.cumulativeLayoutShift?.toFixed(4));
    console.log('First Input Delay:', this.metrics.firstInputDelay?.toFixed(2) + 'ms');
    console.groupEnd();
  }

  getPageSpeedScore(): number {
    const lcp = this.metrics.largestContentfulPaint || 0;
    const fid = this.metrics.firstInputDelay || 0;
    const cls = this.metrics.cumulativeLayoutShift || 0;

    let score = 100;
    
    // LCP scoring (0-4s = good, 4-2.5s = needs improvement, >2.5s = poor)
    if (lcp > 4000) score -= 40;
    else if (lcp > 2500) score -= 20;
    
    // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
    if (fid > 300) score -= 30;
    else if (fid > 100) score -= 15;
    
    // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
    if (cls > 0.25) score -= 30;
    else if (cls > 0.1) score -= 15;

    return Math.max(0, score);
  }

  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Utility functions
export const trackPageView = (pageName: string): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href,
    });
  }
};

export const trackUserInteraction = (action: string, element: string): void => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', action, {
      event_category: 'User Interaction',
      event_label: element,
    });
  }
};

export const preloadRoute = (routePath: string): void => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
  }
};

export const optimizeImages = (): void => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
};
