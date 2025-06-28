
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('AuthCallback: Processing authentication callback');
        
        // Get the session after the callback
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          navigate('/auth', { replace: true });
          return;
        }

        console.log('AuthCallback: Session data received:', !!data.session);

        if (data.session) {
          console.log('Auth callback successful, redirecting to dashboard');
          
          // Check if there's a next parameter for redirect
          const urlParams = new URLSearchParams(window.location.search);
          const nextUrl = urlParams.get('next') || '/dashboard';
          
          navigate(nextUrl, { replace: true });
        } else {
          console.log('No session found, redirecting to auth');
          navigate('/auth', { replace: true });
        }
      } catch (error) {
        console.error('Auth callback exception:', error);
        navigate('/auth', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
