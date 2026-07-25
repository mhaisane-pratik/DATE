import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PageId, UserRole } from '../../types';
import { Layers, ChevronDown, Sparkles } from 'lucide-react';

export const QuickPageSwitcher: React.FC = () => {
  const { currentPage, setCurrentPage, userRole, setUserRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const pages: { id: PageId; label: string; group: string }[] = [
    { id: 'home', label: '1. Home Page', group: 'Main' },
    { id: 'browse', label: '2. Browse Coaches', group: 'Main' },
    { id: 'detective-agency', label: '3. Detective Agency 🕵️‍♂️', group: 'Specialty' },
    { id: 'case-tracker', label: '4. Case Tracker 🔒', group: 'Specialty' },
    { id: 'ai-auditor', label: '5. AI Profile Auditor 🤖', group: 'Tools' },
    { id: 'workshops', label: '6. Live Masterclasses 🎟️', group: 'Events' },
    { id: 'attachment-test', label: '7. Attachment Quiz 💖', group: 'Tools' },
    { id: 'couples-counseling', label: '8. Couples Therapy 💑', group: 'Specialty' },
    { id: 'quiz', label: '9. Match Quiz 🎯', group: 'Tools' },
    { id: 'coach-profile', label: '10. Coach Profile', group: 'Main' },
    { id: 'booking', label: '11. Booking Wizard', group: 'Main' },
    { id: 'user-dashboard', label: '12. User Dashboard', group: 'Dashboards' },
    { id: 'coach-dashboard', label: '13. Coach Dashboard', group: 'Dashboards' },
    { id: 'admin-dashboard', label: '14. Admin Dashboard', group: 'Dashboards' },
    { id: 'pricing', label: '15. Pricing Page', group: 'Information' },
    { id: 'about', label: '16. About Us', group: 'Information' },
    { id: 'contact', label: '17. Contact Us', group: 'Information' },
    { id: 'blog', label: '18. Blog & Articles', group: 'Content' },
    { id: 'help', label: '19. Help Center', group: 'Content' },
    { id: 'login', label: '20. Login Page', group: 'Auth' }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-1.5 px-3 sm:px-4 border-b border-indigo-500/20 sticky top-0 z-50 shadow-md w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-extrabold tracking-wide text-indigo-200 uppercase text-[9px] sm:text-[10px]">
            Demo Navigator (24 Pages)
          </span>
        </div>

        {/* Center: Dropdown */}
        <div className="relative flex-1 max-w-[200px] sm:max-w-xs">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between gap-1 px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800/80 border border-indigo-500/30 text-indigo-100 text-[11px] sm:text-xs font-semibold transition-all truncate"
          >
            <div className="flex items-center gap-1 truncate">
              <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">Page: <strong className="text-white capitalize">{currentPage.replace('-', ' ')}</strong></span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 sm:right-auto sm:w-64 max-h-80 overflow-y-auto glass-card bg-slate-900/95 border border-indigo-500/40 rounded-xl shadow-2xl p-2 z-50">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 border-b border-slate-800">
                Jump to Any Page
              </div>
              <div className="py-1">
                {pages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setCurrentPage(p.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-md text-xs transition-colors flex items-center justify-between ${
                      currentPage === p.id
                        ? 'bg-indigo-600 font-bold text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{p.label}</span>
                    {currentPage === p.id && <Sparkles className="w-3 h-3 text-amber-300" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Role Switcher */}
        <div className="flex items-center gap-1 shrink-0">
          {(['user', 'coach', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => {
                setUserRole(r);
                if (r === 'user') setCurrentPage('user-dashboard');
                if (r === 'coach') setCurrentPage('coach-dashboard');
                if (r === 'admin') setCurrentPage('admin-dashboard');
              }}
              className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold capitalize transition-colors ${
                userRole === r
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
