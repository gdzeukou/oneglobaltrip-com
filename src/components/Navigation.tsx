import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserAgent } from '@/hooks/useUserAgent';
import { Plane, Bot, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import NavigationAuth from './navigation/NavigationAuth';
import { useAIAgentPreferences } from '@/hooks/useAIAgentPreferences';
import { getDisplayAgentName } from '@/utils/displayAgentName';

const navItems = [
  { name: 'Home', path: '/home' },
  { name: 'Visas', path: '/visas' },
  { name: 'Packages', path: '/packages' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { agent } = useUserAgent();
  const location = useLocation();
  const { preferences } = useAIAgentPreferences();

  const isActive = (path: string) => location.pathname === path;
  const displayAgentName = getDisplayAgentName(agent?.name, preferences?.aiAgentName) || 'AI Travel Agent';

  const renderAgentLink = (mobile = false) =>
    user ? (
      <Link
        to="/ai-chat"
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate ${
          isActive('/ai-chat') ? 'text-primary bg-secondary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {agent?.avatar_url ? (
          <Avatar className="h-5 w-5">
            <AvatarImage src={agent.avatar_url} alt={agent.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
              {agent.name?.[0] || 'A'}
            </AvatarFallback>
          </Avatar>
        ) : (
          <Bot className="h-4 w-4" />
        )}
        <span>Chat with {displayAgentName}</span>
        <Badge variant="secondary" className="bg-verified-green/10 text-verified-green border-0 px-1.5 py-0 text-[10px] font-semibold">Free</Badge>
      </Link>
    ) : (
      <Link
        to="/ai-agent-auth"
        onClick={() => mobile && setIsMobileMenuOpen(false)}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover-elevate"
      >
        <Bot className="h-4 w-4" />
        <span>Create AI Agent</span>
        <Badge variant="secondary" className="bg-verified-green/10 text-verified-green border-0 px-1.5 py-0 text-[10px] font-semibold">Free</Badge>
      </Link>
    );

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 rounded-md px-2 py-1 font-serif text-lg font-semibold tracking-tight text-foreground hover-elevate">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
              <Plane className="h-4 w-4" />
            </span>
            One Global Trip
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover-elevate ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            ))}
            {renderAgentLink()}
          </div>

          {/* Auth cluster */}
          <div className="hidden md:flex items-center gap-2">
            {!user && (
              <Button size="sm" asChild>
                <Link to="/ai-agent-auth">Sign Up Free</Link>
              </Button>
            )}
            <NavigationAuth />
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
            {renderAgentLink(true)}
            <div className="mt-3 border-t border-border pt-3">
              <NavigationAuth />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
