import React, { useState } from 'react';
import { Menu, X, Map, FileText, Globe, Settings, LogOut, LogIn, UserPlus, Bookmark, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserGlobeData } from '@/hooks/useUserGlobeData';

const FloatingMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { saves, visited, recent } = useUserGlobeData();

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

              {/* Globe stats strip */}
              <div className="mx-4 mb-3 grid grid-cols-3 gap-2">
                <StatChip label="Saved" count={saves.length} color="text-amber-400" />
                <StatChip label="Visited" count={visited.length} color="text-emerald-400" />
                <StatChip label="Recent" count={recent.length} color="text-blue-400" />
              </div>

              <div className="px-3 space-y-1">
                <MenuItem
                  icon={<Bookmark size={17} />}
                  label="Saved Places"
                  badge={saves.length}
                  onClick={() => go('/dashboard?tab=saved')}
                />
                <MenuItem
                  icon={<Globe size={17} />}
                  label="Countries Visited"
                  badge={visited.length}
                  onClick={() => go('/dashboard?tab=visited')}
                />
                <MenuItem
                  icon={<Clock size={17} />}
                  label="Recently Viewed"
                  badge={recent.length}
                  onClick={() => go('/dashboard?tab=recent')}
                />
                <MenuItem
                  icon={<FileText size={17} />}
                  label="Applications"
                  onClick={() => go('/dashboard?tab=applications')}
                />
                <MenuItem
                  icon={<Map size={17} />}
                  label="My Trips"
                  onClick={() => go('/dashboard')}
                />
                <MenuItem
                  icon={<Settings size={17} />}
                  label="Settings"
                  onClick={() => go('/settings')}
                />
              </div>

              {/* Recently viewed quick list */}
              {recent.length > 0 && (
                <div className="mx-4 mt-4 pt-4 border-t border-white/10">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-2 px-1">Recently Viewed</p>
                  <div className="space-y-1">
                    {recent.slice(0, 5).map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setOpen(false);
                          navigate(
                            r.city_slug
                              ? `/destination/${r.country_slug}/${r.city_slug}`
                              : `/destination/${r.country_slug}`
                          );
                        }}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/8 transition-colors text-left"
                      >
                        {r.emoji && <span className="text-base leading-none">{r.emoji}</span>}
                        <div className="min-w-0">
                          <p className="text-white/80 text-xs font-medium truncate">{r.name}</p>
                          {r.type === 'city' && (
                            <p className="text-white/30 text-[10px] truncate">{r.country}</p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

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
              <p className="text-white/25 text-xs text-center pt-3 px-3 leading-relaxed">
                Sign in to save destinations, track visited countries, and see your travel history on the globe
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-white/20 text-xs text-center">Plan your world · OneGlobalTrip</p>
        </div>
      </div>
    </>
  );
};

const StatChip = ({ label, count, color }: { label: string; count: number; color: string }) => (
  <div className="flex flex-col items-center py-2 rounded-xl bg-white/5 border border-white/8">
    <span className={`text-lg font-bold leading-none ${color}`}>{count}</span>
    <span className="text-white/40 text-[10px] mt-0.5">{label}</span>
  </div>
);

const MenuItem = ({
  icon,
  label,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors text-sm"
  >
    <span className="text-white/50">{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {badge !== undefined && badge > 0 && (
      <span className="text-white/40 text-xs bg-white/10 rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
        {badge}
      </span>
    )}
  </button>
);

export default FloatingMenu;
