
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLink {
  name: string;
  href: string;
  active: boolean;
}

interface NavigationLinksProps {
  navLinks: NavLink[];
}

const NavigationLinks = ({ navLinks }: NavigationLinksProps) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className={cn(
            "relative px-4 py-2 rounded-button text-sm font-medium transition-all duration-200 ease-tech group overflow-hidden",
            link.active
              ? "text-tech-cyan-300 bg-white/10"
              : "text-white/90 hover:text-white hover:bg-white/10 hover:scale-105"
          )}
        >
          {link.name}
          {link.active && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-tech-blue-400 to-tech-cyan-400 animate-neon-underline" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-500 pointer-events-none" />
        </Link>
      ))}
    </div>
  );
};

export default NavigationLinks;
