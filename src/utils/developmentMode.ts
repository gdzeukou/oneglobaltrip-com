// Development mode detection for Lovable
export const isDevelopmentMode = (): boolean => {
  // Check if we're in Lovable development environment
  const isLovableDev = window.location.hostname === 'lovable.app' || 
                       window.location.hostname.includes('lovable.dev') ||
                       window.location.hostname.includes('lovable.app') ||
                       window.location.hostname === 'localhost' ||
                       window.location.hostname === '127.0.0.1';
  
  // Check if we're in development based on various indicators
  const isDev = process.env.NODE_ENV === 'development' || 
                isLovableDev ||
                window.location.port === '5173' || // Vite default port
                window.location.port === '3000';   // Common dev port
  
  return isDev;
};

export const shouldBypassAuth = (route: string): boolean => {
  // Only bypass auth for admin route in development
  return isDevelopmentMode() && route === '/admin';
};