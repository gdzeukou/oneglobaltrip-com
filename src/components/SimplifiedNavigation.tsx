import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUnifiedAIAgent } from '@/hooks/useUnifiedAIAgent';
import { Menu, X, User, LogOut, Bot, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { getDisplayAgentName } from '@/utils/displayAgentName';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import LocalizationProvider from '@/components/localization/LocalizationProvider';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Plan Trip', path: '/startmytrip' },
  { name: 'Visas', path: '/visas' },
  { name: 'Packages', path: '/packages' },
  { name: 'Pricing', path: '/pricing' },
];

const SimplifiedNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { agent, hasAgent } = useUnifiedAIAgent();
  const { preferences } = useAIAgentPreferences();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getUserDisplayName = () => {
    if (user?.user_metadata?.first_name) return user.user_metadata.first_name;
    if (user?.email) return user.email.split('@')[0];
    return 'Account';
  };

  const displayAgentName = getDisplayAgentName(agent?.name, preferences?.aiAgentName);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-foreground hover-elevate rounded-md px-2 py-1">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Plane className="h-4 w-4" />
            </span>
            One Global Trip
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate ${
                  isActive(item.path)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1">
              <LocalizationProvider />
              <DarkModeToggle />
            </div>

            {/* Auth section */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  {hasAgent && (
                    <Button variant="outline" size="sm" asChild className="gap-2">
                      <Link to="/ai-chat">
                        <Bot className="h-4 w-4" />
                        <span className="max-w-[8rem] truncate">{displayAgentName}</span>
                      </Link>
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <User className="h-4 w-4" />
                        <span>{getUserDisplayName()}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild><Link to="/dashboard">Dashboard</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link to="/bookings">My Bookings</Link></DropdownMenuItem>
                      <DropdownMenuItem onClick={() => signOut()}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/auth">Sign In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/startmytrip">Start Planning</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="space-y-1 px-3 py-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium hover-elevate ${
                  isActive(item.path) ? 'text-primary bg-secondary' : 'text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              <LocalizationProvider />
              <DarkModeToggle />
            </div>

            {user ? (
              <div className="mt-3 space-y-1 border-t border-border pt-3">
                {hasAgent && (
                  <Link
                    to="/ai-chat"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-foreground hover-elevate"
                  >
                    <Bot className="h-4 w-4" />
                    <span>Chat with {displayAgentName}</span>
                  </Link>
                )}
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover-elevate">Dashboard</Link>
                <Link to="/profile"   onClick={() => setIsMobileMenuOpen(false)} className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover-elevate">Profile</Link>
                <button
                  onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-base font-medium text-foreground hover-elevate"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Button variant="outline" asChild>
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/startmytrip" onClick={() => setIsMobileMenuOpen(false)}>Start Planning</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SimplifiedNavigation;
