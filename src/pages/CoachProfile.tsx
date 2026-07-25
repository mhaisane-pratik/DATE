import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Globe,
  Award,
  Star,
  Video,
  Phone,
  MessageSquare,
  Heart,
  Share2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { StarRating } from '../components/common/StarRating';
import { MOCK_REVIEWS } from '../data/mockData';

export const CoachProfile: React.FC = () => {
  const { selectedCoach, setCurrentPage, wishlist, toggleWishlist, updateBookingDraft, addToast } = useApp();
  const coach = selectedCoach;

  const [selectedDate, setSelectedDate] = useState<string>(coach.availableSlots[0]?.date || '2026-07-25');
  const [selectedSlot, setSelectedSlot] = useState<string>(coach.availableSlots[0]?.slots[0] || '02:00 PM');
  const [sessionType, setSessionType] = useState<'video' | 'audio' | 'chat'>('video');

  const isSaved = wishlist.includes(coach.id);

  const handleBookSession = () => {
    updateBookingDraft({
      coach,
      selectedDate,
      selectedSlot,
      sessionType,
      price: coach.hourlyRate
    });
    setCurrentPage('booking');
  };

  const handleShare = () => {
    addToast({
      type: 'info',
      title: 'Profile Link Copied',
      message: `Direct profile link for ${coach.name} copied to clipboard!`
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumb items={[{ label: 'Browse Coaches', page: 'browse' }, { label: coach.name }]} />

      {/* Cover Image & Profile Header Card */}
      <div className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden shadow-xl mb-8">
        {/* Cover Banner */}
        <div className="h-48 sm:h-64 relative overflow-hidden bg-slate-900">
          <img src={coach.coverImage} alt="Cover" className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors"
              title="Share Coach Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(coach.id)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors"
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Profile Avatar & Info Bar */}
        <div className="px-6 pb-6 relative pt-0 -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <div className="relative">
              <img
                src={coach.avatar}
                alt={coach.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover object-top ring-4 ring-white dark:ring-slate-800 shadow-2xl"
              />
              {coach.isAvailableToday && (
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] uppercase shadow-md">
                  Available Today
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {coach.name}
                </h1>
                {coach.isVerified && <CheckCircle2 className="w-6 h-6 text-indigo-500" />}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                {coach.title}
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <StarRating rating={coach.rating} count={coach.reviewsCount} />
                <span>•</span>
                <span>{coach.experienceYears} Years Experience</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {coach.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Rate</span>
              <div className="text-xl font-black text-slate-900 dark:text-white">₹{coach.hourlyRate.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-400">/50m</span></div>
            </div>
            <button
              onClick={handleBookSession}
              className="px-6 py-3 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-lg hover:opacity-95 transition-opacity"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Biography & Tabs vs Interactive Booking Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Details, Certifications, Reviews */}
        <div className="lg:col-span-7 space-y-8">
          {/* Biography */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" /> Biography & Philosophy
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {coach.bio}
            </p>
          </div>

          {/* Skills & Specialties */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Core Skills & Specializations</h3>
            <div className="flex flex-wrap gap-2">
              {coach.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-900/40"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" /> Credentials & Certifications
            </h3>
            <ul className="space-y-2">
              {coach.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reviews & Client Feedback */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Client Reviews & Ratings</h3>
              <StarRating rating={coach.rating} count={coach.reviewsCount} />
            </div>

            <div className="space-y-4 pt-2">
              {MOCK_REVIEWS.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={rev.userAvatar} alt={rev.userName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</div>
                        <div className="text-[10px] text-slate-400">{rev.date}</div>
                      </div>
                    </div>
                    <StarRating rating={rev.rating} showText={false} size={12} />
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Schedule & Slot Selector */}
        <div className="lg:col-span-5">
          <div className="glass-card bg-white dark:bg-slate-800/95 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Schedule 1-on-1 Session</h3>
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">${coach.hourlyRate} USD</span>
            </div>

            {/* Step 1: Session Format Choice */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Choose Session Format</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSessionType('video')}
                  className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    sessionType === 'video'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>HD Video</span>
                </button>
                <button
                  onClick={() => setSessionType('audio')}
                  className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    sessionType === 'audio'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Audio Call</span>
                </button>
                <button
                  onClick={() => setSessionType('chat')}
                  className={`p-3 rounded-xl border text-center font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                    sessionType === 'chat'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Deep Chat</span>
                </button>
              </div>
            </div>

            {/* Step 2: Date Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Select Date</label>
              <div className="grid grid-cols-3 gap-2">
                {coach.availableSlots.map((item) => (
                  <button
                    key={item.date}
                    onClick={() => {
                      setSelectedDate(item.date);
                      setSelectedSlot(item.slots[0]);
                    }}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      selectedDate === item.date
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.date}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Available Slots */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block">Available Time Slots</label>
              <div className="grid grid-cols-2 gap-2">
                {(coach.availableSlots.find((s) => s.date === selectedDate)?.slots || ['10:00 AM', '02:00 PM']).map(
                  (slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                        selectedSlot === slot
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Book Trigger Button */}
            <button
              onClick={handleBookSession}
              className="w-full py-3.5 rounded-xl text-sm font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Continue to Payment (${coach.hourlyRate})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
