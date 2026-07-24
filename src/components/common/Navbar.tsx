import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Sun,
  Moon,
  Search,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  User,
  LogOut,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Award,
  BookOpen,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { MOCK_CATEGORIES } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, userRole, wishlist, setSearchFilter, setCategoryFilter } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [navSearchInput, setNavSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearchInput.trim()) {
      setSearchFilter(navSearchInput);
      setCurrentPage('browse');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div className="text-left">
            <div className="text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              Date<span className="gradient-text">Mentor</span>
            </div>
            <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 -mt-1 tracking-wider uppercase">
              Meet Your Friends
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'home'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Home
          </button>

          {/* Mega Menu Trigger */}
          <div className="relative" onMouseEnter={() => setMegaMenuOpen(true)} onMouseLeave={() => setMegaMenuOpen(false)}>
            <button
              onClick={() => setCurrentPage('browse')}
              className={`px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1 transition-colors ${
                currentPage === 'browse'
                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>Browse Coaches</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${megaMenuOpen ? 'rotate-180 text-indigo-600' : ''}`} />
            </button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {megaMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-[600px] glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-5 grid grid-cols-2 gap-4 z-50"
                >
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Specialties</h4>
                    {MOCK_CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setCategoryFilter(cat.id);
                          setCurrentPage('browse');
                          setMegaMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/50 flex items-center gap-3 transition-colors group/item"
                      >
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover/item:scale-110 transition-transform">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                            {cat.title}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {cat.coachesCount} vetted coaches
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl p-4 flex flex-col justify-between border border-indigo-100 dark:border-indigo-900/30">
                    <div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-indigo-600 text-white mb-3">
                        <Award className="w-3 h-3" /> Certified Guarantee
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
                        Not sure which coach is right for you?
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
                        Take our 2-minute relational assessment to get matched with the top 3 coaches for your exact goals.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setCurrentPage('browse');
                        setMegaMenuOpen(false);
                      }}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white gradient-bg hover:opacity-90 transition-opacity text-center shadow-md"
                    >
                      Find My Coach Match
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setCurrentPage('pricing')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'pricing'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Pricing
          </button>

          <button
            onClick={() => setCurrentPage('about')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'about'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            About
          </button>

          <button
            onClick={() => setCurrentPage('blog')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'blog'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Blog
          </button>

          <button
            onClick={() => setCurrentPage('help')}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
              currentPage === 'help'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            Help
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Nav Search */}
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-44 md:w-56">
            <input
              type="text"
              placeholder="Search coaches..."
              value={navSearchInput}
              onChange={(e) => setNavSearchInput(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-slate-100 transition-all outline-none"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          </form>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            title="Toggle Dark / Light Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* User Saved Wishlist Indicator */}
          <button
            onClick={() => {
              setCurrentPage('user-dashboard');
            }}
            className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors hidden sm:block"
            title="Saved Coaches Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Dynamic Role / Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <img
                src={
                  userRole === 'coach'
                    ? '/images/prateek_user.png'
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
                }
                alt="Profile"
                className="w-7 h-7 rounded-lg object-cover object-top ring-1 ring-indigo-500/40"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline capitalize">
                {userRole}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-2 z-50">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-900 dark:text-white capitalize">
                    Logged in as {userRole}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {userRole === 'user' ? 'alex.user@datementor.com' : userRole === 'coach' ? 'pratik@datementor.com' : 'admin@datementor.com'}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      if (userRole === 'user') setCurrentPage('user-dashboard');
                      else if (userRole === 'coach') setCurrentPage('coach-dashboard');
                      else setCurrentPage('admin-dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    My Dashboard
                  </button>

                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Switch Account / Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Book Now Button */}
          <button
            onClick={() => setCurrentPage('browse')}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg hover:opacity-95 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Book a Session
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-panel bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3"
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search coaches..."
                value={navSearchInput}
                onChange={(e) => setNavSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <button
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentPage('browse'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                Browse Coaches
              </button>
              <button
                onClick={() => { setCurrentPage('pricing'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                Pricing
              </button>
              <button
                onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                About Us
              </button>
              <button
                onClick={() => { setCurrentPage('blog'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                Blog & Articles
              </button>
              <button
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60"
              >
                Contact
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => { setCurrentPage('login'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 text-center"
              >
                Login
              </button>
              <button
                onClick={() => { setCurrentPage('register'); setMobileMenuOpen(false); }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg text-center"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
