import React, { useState } from 'react';
import { Menu, X, User, Map, FileText, Globe, Settings, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const FloatingMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white hover:bg-black/80 transition-all shadow-lg"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-black/90 backdrop-blur-2xl border-l border-white/10 flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-white font-semibold tracking-wide">OneGlobalTrip</span>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {user ? (
            <>
              {/* User info */}
              <div className="px-6 py-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.email?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium truncate max-w-[160px]">
                      {user.email}
                    </p>
                    <p className="text-white/40 text-xs">Traveler</p>
                  </div>
                </div>
              </div>

              <div className="px-3 space-y-1">
                <MenuItem icon={<Map size={17} />} label="My Trips" onClick={() => go('/dashboard')} />
                <MenuItem icon={<Globe size={17} />} label="Countries Visited" onClick={() => go('/dashboard?tab=visited')} />
                <MenuItem icon={<FileText size={17} />} label="Applications" onClick={() => go('/dashboard?tab=applications')} />
                <MenuItem icon={<User size={17} />} label="Profile" onClick={() => go('/profile')} />
                <MenuItem icon={<Settings size={17} />} label="Settings" onClick={() => go('/settings')} />
              </div>

              <div className="mx-3 mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm"
                >
                  <LogOut size={17} />
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="px-3 space-y-2">
              <p className="text-white/40 text-xs uppercase tracking-widest px-3 pb-2">Account</p>
              <button
                onClick={() => go('/auth')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors text-sm font-medium"
              >
                <LogIn size={17} />
                Sign In
              </button>
              <button
                onClick={() => go('/auth?mode=signup')}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors text-sm"
              >
                <UserPlus size={17} />
                Create Account
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-white/20 text-xs text-center">
            Plan your world · OneGlobalTrip
          </p>
        </div>
      </div>
    </>
  );
};

const MenuItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
  >
    <span className="text-white/50">{icon}</span>
    {label}
  </button>
);

export default FloatingMenu;
