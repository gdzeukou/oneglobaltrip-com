import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Plane, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const OGTNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Trips', path: '/trips' },
    { name: 'Discover', path: '/discover' },
    { name: 'Booking', path: '/booking' },
    { name: 'Visa', path: '/visa/wizard' },
    { name: 'Wallet', path: '/wallet' },
    { name: 'AI', path: '/ai-chat' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 smooth-transition hover:opacity-80">
            <Plane className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
              OneGlobalTrip
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 text-sm font-medium text-foreground/80 rounded-lg smooth-transition hover:bg-secondary hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Ask AI & Profile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button
              onClick={() => navigate('/ai-chat')}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Ask AI
            </Button>
            
            {user ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-white text-sm font-semibold">
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
            ) : (
              <Button onClick={() => navigate('/login')} variant="default" size="sm">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary smooth-transition"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-base font-medium text-foreground/80 rounded-lg smooth-transition hover:bg-secondary hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
            <div className="px-4 pt-4 border-t mt-4 space-y-2">
              <Button
                onClick={() => {
                  navigate('/ai-chat');
                  setMobileMenuOpen(false);
                }}
                variant="outline"
                size="sm"
                className="w-full gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                Ask AI
              </Button>
              {!user && (
                <Button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default OGTNavbar;
