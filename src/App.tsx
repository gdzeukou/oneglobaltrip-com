
import React, { Suspense, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimpleAuthProvider } from "@/contexts/SimpleAuthContext";
import SimpleProtectedRoute from "@/components/auth/SimpleProtectedRoute";
import NotFound from "./pages/NotFound";
import { PerformanceMonitor } from "@/utils/performance";
import { setupRoutePreloading, setupProgressiveImageLoading } from "@/utils/lazyImports";
import LoadingFallback from "@/components/ui/loading-fallback";

// Lazy imports for better performance
import {
  LazyIndex,
  LazyAuth,
  LazyDashboard,
  LazyPackages,
  LazyBooking,
  LazyGetStarted,
  LazyAdmin,
  LazyAdminDashboard,
  LazyVisas,
  LazyShortStayVisas,
  LazyLongStayVisas,
  LazyConcierge,
  LazySchengenShortStay,
  LazyUKShortStay,
  LazyUK5YearShortStay,
  LazyCanadaShortStay,
  LazyBrazilShortStay,
  LazyNigeriaShortStay,
  LazyUAEShortStay,
  LazyIndiaShortStay,
  LazyPortugalLongStay,
  LazyNorwayLongStay,
  LazyDenmarkLongStay,
  LazyFinlandLongStay,
  LazyGermanyLongStay,
  LazyFranceLongStay,
  LazySwitzerlandLongStay,
  LazyNigeriaLongStay,
  LazySimpleAuth,
} from "@/utils/lazyImports";

// Enhanced Query Client with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      },
    },
  },
});

const App = () => {
  useEffect(() => {
    // Initialize performance monitoring
    const performanceMonitor = PerformanceMonitor.getInstance();
    
    // Log performance metrics after page load
    setTimeout(() => {
      performanceMonitor.logMetrics();
      const score = performanceMonitor.getPageSpeedScore();
      console.log(`📊 Page Speed Score: ${score}/100`);
    }, 3000);

    // Setup progressive enhancements
    setupRoutePreloading();
    setupProgressiveImageLoading();

    // Cleanup on unmount
    return () => {
      performanceMonitor.cleanup();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SimpleAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen w-full optimize-performance">
              <Suspense fallback={<LoadingFallback message="Loading One Global Trip..." />}>
                <Routes>
                  <Route path="/" element={<LazyIndex />} />
                  <Route path="/auth" element={<LazyAuth />} />
                  <Route path="/simple-auth" element={
                    <Suspense fallback={<LoadingFallback message="Loading Authentication..." />}>
                      <LazySimpleAuth />
                    </Suspense>
                  } />
                  <Route path="/dashboard" element={
                    <SimpleProtectedRoute>
                      <Suspense fallback={<LoadingFallback message="Loading Dashboard..." />}>
                        <LazyDashboard />
                      </Suspense>
                    </SimpleProtectedRoute>
                  } />
                  <Route path="/packages" element={<LazyPackages />} />
                  <Route path="/booking" element={<LazyBooking />} />
                  <Route path="/get-started" element={<LazyGetStarted />} />
                  <Route path="/concierge" element={<LazyConcierge />} />
                  <Route path="/admin" element={<LazyAdmin />} />
                  <Route path="/admin/dashboard" element={<LazyAdminDashboard />} />
                  
                  {/* Visa Routes */}
                  <Route path="/visas" element={<LazyVisas />} />
                  <Route path="/visas/short-stay" element={<LazyShortStayVisas />} />
                  <Route path="/visas/long-stay" element={<LazyLongStayVisas />} />
                  
                  {/* Short-stay visa country routes */}
                  <Route path="/visas/short-stay/schengen" element={
                    <Suspense fallback={<LoadingFallback message="Loading Schengen Visa Info..." />}>
                      <LazySchengenShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/uk" element={
                    <Suspense fallback={<LoadingFallback message="Loading UK Visa Info..." />}>
                      <LazyUKShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/uk-5year" element={
                    <Suspense fallback={<LoadingFallback message="Loading UK 5-Year Visa Info..." />}>
                      <LazyUK5YearShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/canada" element={
                    <Suspense fallback={<LoadingFallback message="Loading Canada Visa Info..." />}>
                      <LazyCanadaShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/brazil" element={
                    <Suspense fallback={<LoadingFallback message="Loading Brazil Visa Info..." />}>
                      <LazyBrazilShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/nigeria" element={
                    <Suspense fallback={<LoadingFallback message="Loading Nigeria Visa Info..." />}>
                      <LazyNigeriaShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/uae" element={
                    <Suspense fallback={<LoadingFallback message="Loading UAE Visa Info..." />}>
                      <LazyUAEShortStay />
                    </Suspense>
                  } />
                  <Route path="/visas/short-stay/india" element={
                    <Suspense fallback={<LoadingFallback message="Loading India Visa Info..." />}>
                      <LazyIndiaShortStay />
                    </Suspense>
                  } />
                  
                  {/* Long-stay visa country routes */}
                  <Route path="/visas/long-stay/portugal" element={
                    <Suspense fallback={<LoadingFallback message="Loading Portugal Visa Info..." />}>
                      <LazyPortugalLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/norway" element={
                    <Suspense fallback={<LoadingFallback message="Loading Norway Visa Info..." />}>
                      <LazyNorwayLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/denmark" element={
                    <Suspense fallback={<LoadingFallback message="Loading Denmark Visa Info..." />}>
                      <LazyDenmarkLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/finland" element={
                    <Suspense fallback={<LoadingFallback message="Loading Finland Visa Info..." />}>
                      <LazyFinlandLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/germany" element={
                    <Suspense fallback={<LoadingFallback message="Loading Germany Visa Info..." />}>
                      <LazyGermanyLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/france" element={
                    <Suspense fallback={<LoadingFallback message="Loading France Visa Info..." />}>
                      <LazyFranceLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/switzerland" element={
                    <Suspense fallback={<LoadingFallback message="Loading Switzerland Visa Info..." />}>
                      <LazySwitzerlandLongStay />
                    </Suspense>
                  } />
                  <Route path="/visas/long-stay/nigeria" element={
                    <Suspense fallback={<LoadingFallback message="Loading Nigeria Long-Stay Visa Info..." />}>
                      <LazyNigeriaLongStay />
                    </Suspense>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </SimpleAuthProvider>
    </QueryClientProvider>
  );
};

export default App;
