
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

export const createMockUser = () => ({
  id: '00000000-0000-0000-0000-000000000000',
  email: 'dev@lovable.app',
  email_confirmed_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {
    first_name: 'Dev',
    last_name: 'User'
  },
  aud: 'authenticated',
  role: 'authenticated'
});

export const createMockSession = () => ({
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: createMockUser()
});
