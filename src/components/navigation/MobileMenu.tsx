
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { User } from '@supabase/supabase-js';

interface NavLink {
  name: string;
  href: string;
  active: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: NavLink[];
  user: User | null;
  signOut: () => void;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, navLinks, user, signOut, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 glass-effect backdrop-blur-glass border-t border-white/10 shadow-glass">
      <div className="px-4 py-6 space-y-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            onClick={onClose}
            className={cn(
              "block px-4 py-3 rounded-button text-base font-medium transition-all duration-200 ease-tech",
              link.active
                ? "text-tech-cyan-300 bg-white/10"
                : "text-white/90 hover:text-white hover:bg-white/10"
            )}
          >
            {link.name}
          </Link>
        ))}
        
        <div className="pt-4 border-t border-white/10">
          {user ? (
            <div className="space-y-3">
              <Link to="/dashboard" onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => signOut()}
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/auth" onClick={onClose}>
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                  Sign In
                </Button>
              </Link>
              <Link to="/get-started" onClick={onClose}>
                <Button variant="secondary" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
