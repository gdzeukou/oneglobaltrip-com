
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback: Processing authentication callback');
        console.log('Current URL:', window.location.href);
        console.log('Search params:', Object.fromEntries(searchParams.entries()));
        
        // Extract tokens from URL if present
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        console.log('AuthCallback: Tokens found:', { 
          hasAccessToken: !!accessToken, 
          hasRefreshToken: !!refreshToken 
        });

        // If we have tokens in the URL, set the session
        if (accessToken && refreshToken) {
          console.log('AuthCallback: Setting session from URL tokens');
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          });

          if (error) {
            console.error('AuthCallback: Error setting session:', error);
            navigate('/auth', { replace: true });
            return;
          }

          console.log('AuthCallback: Session set successfully:', !!data.session);
          console.log('AuthCallback: User authenticated:', data.session?.user?.email);
          
          // Always redirect to dashboard after successful authentication
          console.log('AuthCallback: Redirecting to dashboard');
          navigate('/dashboard', { replace: true });
          return;
        }

        // Fallback: try to get existing session
        console.log('AuthCallback: No tokens in URL, checking for existing session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthCallback: Error getting session:', error);
          navigate('/auth', { replace: true });
          return;
        }

        console.log('AuthCallback: Session check result:', !!data.session);
        console.log('AuthCallback: User from session:', data.session?.user?.email);

        if (data.session) {
          console.log('AuthCallback: Existing session found, redirecting to dashboard');
          navigate('/dashboard', { replace: true });
        } else {
          console.log('AuthCallback: No session found, redirecting to auth');
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('AuthCallback: Exception occurred:', error);
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate, searchParams]);

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
