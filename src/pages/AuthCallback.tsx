
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback: Processing authentication callback');
        console.log('Current URL:', window.location.href);
        console.log('Search params:', Object.fromEntries(searchParams.entries()));
        
        // Extract tokens from URL hash if present
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('AuthCallback: Hash tokens found:', { 
          hasAccessToken: !!accessToken, 
          hasRefreshToken: !!refreshToken 
        });

        // Also check URL search params for tokens
        const urlAccessToken = searchParams.get('access_token');
        const urlRefreshToken = searchParams.get('refresh_token');
        
        console.log('AuthCallback: URL tokens found:', { 
          hasUrlAccessToken: !!urlAccessToken, 
          hasUrlRefreshToken: !!urlRefreshToken 
        });

        // Use tokens from either source
        const finalAccessToken = accessToken || urlAccessToken;
        const finalRefreshToken = refreshToken || urlRefreshToken;

        // If we have tokens, set the session
        if (finalAccessToken && finalRefreshToken) {
          console.log('AuthCallback: Setting session from tokens');
          const { data, error } = await supabase.auth.setSession({
            access_token: finalAccessToken,
            refresh_token: finalRefreshToken
          });

          if (error) {
            console.error('AuthCallback: Error setting session:', error);
            setError('Failed to authenticate. Please try signing in again.');
            setTimeout(() => navigate('/auth', { replace: true }), 3000);
            return;
          }

          console.log('AuthCallback: Session set successfully:', !!data.session);
          console.log('AuthCallback: User authenticated:', data.session?.user?.email);
          
          // Clear any pending auth data
          localStorage.removeItem('pendingSignup');
          localStorage.removeItem('pendingSignin');
          
          // Redirect to dashboard after successful authentication
          console.log('AuthCallback: Redirecting to dashboard');
          navigate('/dashboard', { replace: true });
          return;
        }

        // Check for error parameters
        const errorParam = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');
        
        if (errorParam) {
          console.error('AuthCallback: URL contains error:', errorParam, errorDescription);
          setError(errorDescription || errorParam);
          setTimeout(() => navigate('/auth', { replace: true }), 3000);
          return;
        }

        // Fallback: try to get existing session
        console.log('AuthCallback: No tokens found, checking for existing session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthCallback: Error getting session:', error);
          setError('Authentication failed. Please try again.');
          setTimeout(() => navigate('/auth', { replace: true }), 3000);
          return;
        }

        console.log('AuthCallback: Session check result:', !!data.session);
        console.log('AuthCallback: User from session:', data.session?.user?.email);

        if (data.session) {
          console.log('AuthCallback: Existing session found, redirecting to dashboard');
          navigate('/dashboard', { replace: true });
        } else {
          console.log('AuthCallback: No session found, redirecting to auth');
          setError('No authentication session found. Please sign in again.');
          setTimeout(() => navigate('/auth', { replace: true }), 3000);
        }
      } catch (error) {
        console.error('AuthCallback: Exception occurred:', error);
        setError('An unexpected error occurred during authentication.');
        setTimeout(() => navigate('/auth', { replace: true }), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-600 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting you back to sign in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we log you in</p>
      </div>
    </div>
  );
};

export default AuthCallback;
