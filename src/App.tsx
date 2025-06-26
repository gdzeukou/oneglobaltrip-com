
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

console.log('App.tsx: Starting to load');

// Test basic component loading first
const Index = lazy(() => {
  console.log('App.tsx: Loading Index page');
  try {
    return import("./pages/Index");
  } catch (error) {
    console.error('App.tsx: Error loading Index page:', error);
    throw error;
  }
});

const Auth = lazy(() => {
  console.log('App.tsx: Loading Auth page');
  try {
    return import("./pages/Auth");
  } catch (error) {
    console.error('App.tsx: Error loading Auth page:', error);
    throw error;
  }
});

const NotFound = lazy(() => {
  console.log('App.tsx: Loading NotFound page');
  try {
    return import("./pages/NotFound");
  } catch (error) {
    console.error('App.tsx: Error loading NotFound page:', error);
    throw error;
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

console.log('App.tsx: QueryClient created');

const LoadingSpinner = () => {
  console.log('App.tsx: LoadingSpinner rendered');
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-tech-cyan-400 mb-4"></div>
        <p className="text-lg font-medium text-white font-space-grotesk">Loading your experience...</p>
      </div>
    </div>
  );
};

const App = () => {
  console.log('App.tsx: App component rendering');
  
  try {
    return (
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <TooltipProvider>
                <div className="w-full">
                  <Toaster />
                  <Sonner />
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </div>
              </TooltipProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('App.tsx: Error in App component:', error);
    throw error;
  }
};

console.log('App.tsx: App component defined');

export default App;
