
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

// Lazy load pages for better performance
const Index = lazy(() => {
  console.log('App.tsx: Loading Index page');
  return import("./pages/Index");
});
const Visas = lazy(() => {
  console.log('App.tsx: Loading Visas page');
  return import("./pages/Visas");
});
const Packages = lazy(() => {
  console.log('App.tsx: Loading Packages page');
  return import("./pages/Packages");
});
const PackageDetails = lazy(() => {
  console.log('App.tsx: Loading PackageDetails page');
  return import("./pages/PackageDetails");
});
const Booking = lazy(() => {
  console.log('App.tsx: Loading Booking page');
  return import("./pages/Booking");
});
const GetStarted = lazy(() => {
  console.log('App.tsx: Loading GetStarted page');
  return import("./pages/GetStarted");
});
const ShortStayVisas = lazy(() => {
  console.log('App.tsx: Loading ShortStayVisas page');
  return import("./pages/ShortStayVisas");
});
const LongStayVisas = lazy(() => {
  console.log('App.tsx: Loading LongStayVisas page');
  return import("./pages/LongStayVisas");
});
const Auth = lazy(() => {
  console.log('App.tsx: Loading Auth page');
  return import("./pages/Auth");
});
const Dashboard = lazy(() => {
  console.log('App.tsx: Loading Dashboard page');
  return import("./pages/Dashboard");
});
const AdminDashboard = lazy(() => {
  console.log('App.tsx: Loading AdminDashboard page');
  return import("./pages/AdminDashboard");
});
const Admin = lazy(() => {
  console.log('App.tsx: Loading Admin page');
  return import("./pages/Admin");
});
const Concierge = lazy(() => {
  console.log('App.tsx: Loading Concierge page');
  return import("./pages/Concierge");
});
const NotFound = lazy(() => {
  console.log('App.tsx: Loading NotFound page');
  return import("./pages/NotFound");
});

// Visa country pages
const SchengenShortStay = lazy(() => {
  console.log('App.tsx: Loading SchengenShortStay page');
  return import("./pages/visa-countries/SchengenShortStay");
});
const IndiaShortStay = lazy(() => {
  console.log('App.tsx: Loading IndiaShortStay page');
  return import("./pages/visa-countries/IndiaShortStay");
});
const UAEShortStay = lazy(() => {
  console.log('App.tsx: Loading UAEShortStay page');
  return import("./pages/visa-countries/UAEShortStay");
});
const CanadaShortStay = lazy(() => {
  console.log('App.tsx: Loading CanadaShortStay page');
  return import("./pages/visa-countries/CanadaShortStay");
});
const BrazilShortStay = lazy(() => {
  console.log('App.tsx: Loading BrazilShortStay page');
  return import("./pages/visa-countries/BrazilShortStay");
});
const NigeriaShortStay = lazy(() => {
  console.log('App.tsx: Loading NigeriaShortStay page');
  return import("./pages/visa-countries/NigeriaShortStay");
});
const UKShortStay = lazy(() => {
  console.log('App.tsx: Loading UKShortStay page');
  return import("./pages/visa-countries/UKShortStay");
});
const UK5YearShortStay = lazy(() => {
  console.log('App.tsx: Loading UK5YearShortStay page');
  return import("./pages/visa-countries/UK5YearShortStay");
});

// New special country pages
const FranceShortStay = lazy(() => {
  console.log('App.tsx: Loading FranceShortStay page');
  return import("./pages/visa-countries/FranceShortStay");
});
const NetherlandsShortStay = lazy(() => {
  console.log('App.tsx: Loading NetherlandsShortStay page');
  return import("./pages/visa-countries/NetherlandsShortStay");
});
const ItalyShortStay = lazy(() => {
  console.log('App.tsx: Loading ItalyShortStay page');
  return import("./pages/visa-countries/ItalyShortStay");
});
const GreeceShortStay = lazy(() => {
  console.log('App.tsx: Loading GreeceShortStay page');
  return import("./pages/visa-countries/GreeceShortStay");
});

// Long-stay visa pages
const FranceLongStay = lazy(() => {
  console.log('App.tsx: Loading FranceLongStay page');
  return import("./pages/visa-countries/FranceLongStay");
});
const GermanyLongStay = lazy(() => {
  console.log('App.tsx: Loading GermanyLongStay page');
  return import("./pages/visa-countries/GermanyLongStay");
});
const PortugalLongStay = lazy(() => {
  console.log('App.tsx: Loading PortugalLongStay page');
  return import("./pages/visa-countries/PortugalLongStay");
});
const DenmarkLongStay = lazy(() => {
  console.log('App.tsx: Loading DenmarkLongStay page');
  return import("./pages/visa-countries/DenmarkLongStay");
});
const FinlandLongStay = lazy(() => {
  console.log('App.tsx: Loading FinlandLongStay page');
  return import("./pages/visa-countries/FinlandLongStay");
});
const NorwayLongStay = lazy(() => {
  console.log('App.tsx: Loading NorwayLongStay page');
  return import("./pages/visa-countries/NorwayLongStay");
});
const SwitzerlandLongStay = lazy(() => {
  console.log('App.tsx: Loading SwitzerlandLongStay page');
  return import("./pages/visa-countries/SwitzerlandLongStay");
});
const NigeriaLongStay = lazy(() => {
  console.log('App.tsx: Loading NigeriaLongStay page');
  return import("./pages/visa-countries/NigeriaLongStay");
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
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <TooltipProvider>
              <div className="w-full">
                <Toaster />
                <Sonner />
                <Suspense fallback={<LoadingSpinner />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/visas" element={<Visas />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/packages/:id" element={<PackageDetails />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="/visas/short-stay" element={<ShortStayVisas />} />
                    <Route path="/visas/long-stay" element={<LongStayVisas />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin-v2" element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } />
                    <Route path="/concierge" element={
                      <ProtectedRoute>
                        <Concierge />
                      </ProtectedRoute>
                    } />
                    
                    {/* Short-stay visa country routes */}
                    <Route path="/visas/short-stay/schengen" element={<SchengenShortStay />} />
                    <Route path="/visas/short-stay/france" element={<FranceShortStay />} />
                    <Route path="/visas/short-stay/netherlands" element={<NetherlandsShortStay />} />
                    <Route path="/visas/short-stay/italy" element={<ItalyShortStay />} />
                    <Route path="/visas/short-stay/greece" element={<GreeceShortStay />} />
                    <Route path="/visas/short-stay/india" element={<IndiaShortStay />} />
                    <Route path="/visas/short-stay/uae" element={<UAEShortStay />} />
                    <Route path="/visas/short-stay/canada" element={<CanadaShortStay />} />
                    <Route path="/visas/short-stay/brazil" element={<BrazilShortStay />} />
                    <Route path="/visas/short-stay/nigeria" element={<NigeriaShortStay />} />
                    <Route path="/visas/short-stay/uk" element={<UKShortStay />} />
                    <Route path="/visas/short-stay/uk-5-year" element={<UK5YearShortStay />} />
                    
                    {/* Legacy routes for compatibility */}
                    <Route path="/visa-countries/IndiaShortStay" element={<IndiaShortStay />} />
                    <Route path="/visa-countries/UAEShortStay" element={<UAEShortStay />} />
                    <Route path="/visa-countries/CanadaShortStay" element={<CanadaShortStay />} />
                    <Route path="/visa-countries/BrazilShortStay" element={<BrazilShortStay />} />
                    <Route path="/visa-countries/NigeriaShortStay" element={<NigeriaShortStay />} />
                    
                    {/* Long-stay visa routes */}
                    <Route path="/visas/long-stay/france" element={<FranceLongStay />} />
                    <Route path="/visas/long-stay/germany" element={<GermanyLongStay />} />
                    <Route path="/visas/long-stay/portugal" element={<PortugalLongStay />} />
                    <Route path="/visas/long-stay/denmark" element={<DenmarkLongStay />} />
                    <Route path="/visas/long-stay/finland" element={<FinlandLongStay />} />
                    <Route path="/visas/long-stay/norway" element={<NorwayLongStay />} />
                    <Route path="/visas/long-stay/switzerland" element={<SwitzerlandLongStay />} />
                    <Route path="/visa-countries/NigeriaLongStay" element={<NigeriaLongStay />} />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
            </TooltipProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

console.log('App.tsx: App component defined');

export default App;
