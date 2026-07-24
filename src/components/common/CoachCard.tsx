import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Globe, Heart, Calendar } from 'lucide-react';
import { Coach } from '../../types';
import { StarRating } from './StarRating';
import { useApp } from '../../context/AppContext';

interface CoachCardProps {
  coach: Coach;
}

export const CoachCard: React.FC<CoachCardProps> = ({ coach }) => {
  const { setCurrentPage, setSelectedCoachId, wishlist, toggleWishlist, updateBookingDraft } = useApp();
  const isSaved = wishlist.includes(coach.id);

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCoachId(coach.id);
    updateBookingDraft({ coach, price: coach.hourlyRate });
    setCurrentPage('booking');
  };

  const handleCardClick = () => {
    setSelectedCoachId(coach.id);
    setCurrentPage('coach-profile');
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      onClick={handleCardClick}
      className="group cursor-pointer glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:border-indigo-400/50 dark:hover:border-indigo-500/50 flex flex-col justify-between relative overflow-hidden"
    >
      {/* Featured ribbon if applicable */}
      {coach.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md z-10">
          Featured Top Coach
        </div>
      )}

      <div>
        {/* Top Header: Image, Status, Wishlist */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="relative">
            <img
              src={coach.avatar}
              alt={coach.name}
              className="w-16 h-16 rounded-full object-cover object-top ring-2 ring-indigo-500/20 group-hover:ring-indigo-500 transition-all shadow-md"
            />
            {coach.isAvailableToday && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full" title="Available Today" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(coach.id);
              }}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-700/60 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Coach Details */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
              {coach.name}
            </h3>
            {coach.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
            {coach.title}
          </p>

          <StarRating rating={coach.rating} count={coach.reviewsCount} />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 mb-3 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            <span>{coach.experienceYears} yrs exp.</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Globe className="w-3.5 h-3.5 text-purple-500" />
            <span className="truncate">{coach.languages.join(', ')}</span>
          </div>
        </div>

        {/* Categories Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {coach.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40"
            >
              {cat.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Price & Book Button */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Session Rate</span>
          <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            ${coach.hourlyRate}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/50m</span>
          </div>
        </div>

        <button
          onClick={handleBookNow}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
        >
          <Calendar className="w-3.5 h-3.5" />
          Book Session
        </button>
      </div>
    </motion.div>
  );
};
