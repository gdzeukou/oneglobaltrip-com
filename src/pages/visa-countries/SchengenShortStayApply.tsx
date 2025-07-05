import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedSchengenForm from '@/components/visa/enhanced/EnhancedSchengenForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const SchengenShortStayApply = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/auth', { 
        state: { 
          redirectTo: location.pathname,
          message: 'Please sign in to start your Schengen visa application'
        }
      });
    }
  }, [user, navigate, location.pathname]);

  const handleSubmit = (formData: any) => {
    console.log('Schengen application submitted:', formData);
    // Navigate to dashboard after successful submission
    navigate('/dashboard', { 
      state: { 
        message: 'Your Schengen visa application has been saved successfully!' 
      }
    });
  };

  const handleCancel = () => {
    navigate('/visas/short-stay/schengen');
  };

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Schengen Info
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Schengen Visa Application
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Complete your short-stay visa application for European travel
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Auto-save enabled - Your progress is automatically saved
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-card rounded-xl shadow-lg border border-border p-6 md:p-8">
            <EnhancedSchengenForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              fullPage={true}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchengenShortStayApply;