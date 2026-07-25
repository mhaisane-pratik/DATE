import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Star, DollarSign, Globe, Award, CheckCircle2, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COACHES, MOCK_CATEGORIES } from '../data/mockData';
import { CoachCard } from '../components/common/CoachCard';
import { CoachCardSkeleton } from '../components/common/Skeletons';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { Coach } from '../types';
import { Modal } from '../components/common/Modal';
import { StarRating } from '../components/common/StarRating';

export const BrowseCoaches: React.FC = () => {
  const { searchFilter, setSearchFilter, categoryFilter, setCategoryFilter, setSelectedCoachId, setCurrentPage, updateBookingDraft } = useApp();

  const [priceMax, setPriceMax] = useState<number>(300);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [availableTodayOnly, setAvailableTodayOnly] = useState<boolean>(false);
  const [minExperience, setMinExperience] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-low' | 'price-high' | 'experience'>('recommended');
  
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [previewCoach, setPreviewCoach] = useState<Coach | null>(null);

  // Filter logic
  const filteredCoaches = useMemo(() => {
    return MOCK_COACHES.filter((coach) => {
      // Search query
      if (searchFilter) {
        const query = searchFilter.toLowerCase();
        const matchesName = coach.name.toLowerCase().includes(query);
        const matchesTitle = coach.title.toLowerCase().includes(query);
        const matchesSkills = coach.skills.some(s => s.toLowerCase().includes(query));
        if (!matchesName && !matchesTitle && !matchesSkills) return false;
      }

      // Category filter
      if (categoryFilter !== 'all') {
        if (!coach.categories.includes(categoryFilter)) return false;
      }

      // Price filter
      if (coach.hourlyRate > priceMax) return false;

      // Rating filter
      if (coach.rating < minRating) return false;

      // Language filter
      if (selectedLanguage !== 'all') {
        if (!coach.languages.includes(selectedLanguage)) return false;
      }

      // Availability filter
      if (availableTodayOnly && !coach.isAvailableToday) return false;

      // Experience filter
      if (coach.experienceYears < minExperience) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchFilter, categoryFilter, priceMax, minRating, selectedLanguage, availableTodayOnly, minExperience, sortBy]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 3);
      setIsLoadingMore(false);
    }, 600);
  };

  const resetFilters = () => {
    setSearchFilter('');
    setCategoryFilter('all');
    setPriceMax(300);
    setMinRating(0);
    setSelectedLanguage('all');
    setAvailableTodayOnly(false);
    setMinExperience(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumb items={[{ label: 'Browse Relationship Coaches' }]} />

      {/* Header Banner */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Find Your Relationship Coach
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Explore certified dating experts, psychologists, and marriage counselors. Filter by rate, specialty, and schedule.
        </p>
      </div>

      {/* Main Layout: Filters Sidebar + Coaches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="space-y-6">
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/80">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                Filter Coaches
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-5 pt-4">
              {/* Search Bar */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Search Keyword</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Coach name, skill..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="all">All Specializations</option>
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Max Slider */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Max Session Price</label>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">₹{priceMax.toLocaleString('en-IN')}/hr</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="300"
                  step="10"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              {/* Min Rating */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Minimum Rating</label>
                <div className="grid grid-cols-4 gap-1.5 text-xs">
                  {[0, 4.5, 4.8, 4.9].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`py-1.5 rounded-lg border font-bold text-[11px] transition-colors ${
                        minRating === r
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {r === 0 ? 'Any' : `${r}+★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="all">All Languages</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="Mandarin">Mandarin</option>
                  <option value="German">German</option>
                </select>
              </div>

              {/* Availability Switch */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Available Today</span>
                <input
                  type="checkbox"
                  checked={availableTodayOnly}
                  onChange={(e) => setAvailableTodayOnly(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 space-y-6">
          {/* Controls Bar: Results Count & Sort Dropdown */}
          <div className="glass-card bg-white dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredCoaches.length}</strong> available coaches
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
              >
                <option value="recommended">Recommended & Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="experience">Years of Experience</option>
              </select>
            </div>
          </div>

          {/* Coaches Grid */}
          {filteredCoaches.length === 0 ? (
            <div className="text-center py-16 glass-card bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
              <Filter className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Coaches Match Your Filter</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Try widening your price range or clearing language/category filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCoaches.slice(0, visibleCount).map((coach) => (
                <div key={coach.id} onClick={() => setPreviewCoach(coach)}>
                  <CoachCard coach={coach} />
                </div>
              ))}
              {isLoadingMore && (
                <>
                  <CoachCardSkeleton />
                  <CoachCardSkeleton />
                </>
              )}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredCoaches.length && (
            <div className="text-center pt-6">
              <button
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-md transition-all inline-flex items-center gap-2"
              >
                {isLoadingMore ? <RefreshCw className="w-4 h-4 animate-spin text-indigo-500" /> : 'Load More Coaches'}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Quick Coach Preview Modal */}
      {previewCoach && (
        <Modal isOpen={!!previewCoach} onClose={() => setPreviewCoach(null)} title="Quick Coach Preview">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img src={previewCoach.avatar} alt={previewCoach.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  {previewCoach.name} <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                </h3>
                <p className="text-xs text-slate-500">{previewCoach.title}</p>
                <StarRating rating={previewCoach.rating} count={previewCoach.reviewsCount} />
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
              {previewCoach.bio}
            </p>

            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Certifications</h4>
              <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 list-disc list-inside">
                {previewCoach.certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-lg font-black text-slate-900 dark:text-white">₹{previewCoach.hourlyRate.toLocaleString('en-IN')}/50m</div>
              <button
                onClick={() => {
                  setSelectedCoachId(previewCoach.id);
                  updateBookingDraft({ coach: previewCoach, price: previewCoach.hourlyRate });
                  setCurrentPage('booking');
                  setPreviewCoach(null);
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg"
              >
                Proceed to Book
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
