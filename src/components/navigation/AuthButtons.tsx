
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  email?: string;
}

interface AuthButtonsProps {
  user: User | null;
  signOut: () => void;
}

const AuthButtons = ({ user, signOut }: AuthButtonsProps) => {
  return (
    <div className="hidden md:flex items-center space-x-3">
      {user ? (
        <div className="flex items-center space-x-3">
          <Link to="/dashboard">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-tech-cyan-300 hover:bg-white/10"
            >
              Dashboard
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => signOut()}
            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link to="/auth">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:text-tech-cyan-300 hover:bg-white/10"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/get-started">
            <Button 
              variant="secondary" 
              size="sm"
              className="font-semibold"
            >
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
