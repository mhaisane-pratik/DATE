import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Search,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Star,
  Sparkles,
  CheckCircle2,
  Lock,
  PhoneCall,
  UserCheck,
  MessageSquare,
  ChevronRight,
  Award,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COACHES, MOCK_CATEGORIES, MOCK_TESTIMONIALS } from '../data/mockData';
import { CoachCard } from '../components/common/CoachCard';

export const Home: React.FC = () => {
  const { setCurrentPage, setSelectedCoachId, setCategoryFilter, setSearchFilter } = useApp();
  const [heroSearch, setHeroSearch] = useState('');

  const leadCoach = MOCK_COACHES.find(c => c.id === 'coach-prateek') || MOCK_COACHES[0];

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchFilter(heroSearch);
      setCurrentPage('browse');
    }
  };

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* HERO SECTION - Minimal, Elegant, High Whitespace */}
      <section className="relative pt-6 pb-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card bg-indigo-50/80 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-300 text-xs font-black uppercase tracking-wider shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              <span>Founded by Prateek Mhaisane (+91 9737372183)</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              Master Your Dating Life with <span className="gradient-text">Absolute Clarity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              1-on-1 Dating Strategy, Gottman Couples Therapy, and 100% Confidential Pre-Marital Background Verification overseen by Lead Coach <strong>Prateek Mhaisane</strong>.
            </motion.p>

            {/* Quick Action Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => {
                  setSelectedCoachId('coach-prateek');
                  setCurrentPage('booking');
                }}
                className="px-6 py-3.5 rounded-2xl text-xs font-black text-white gradient-bg hover:opacity-95 shadow-xl shadow-indigo-500/25 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <Heart className="w-4 h-4 fill-white" />
                Book 1-on-1 Session (₹4,999)
              </button>

              <button
                onClick={() => setCurrentPage('detective-agency')}
                className="px-6 py-3.5 rounded-2xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-amber-500"
              >
                <ShieldAlert className="w-4 h-4 text-slate-950" />
                Detective Agency 🕵️‍♂️
              </button>

              <button
                onClick={() => setCurrentPage('ai-auditor')}
                className="px-6 py-3.5 rounded-2xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-500" />
                AI Profile Audit 🤖
              </button>
            </motion.div>

            {/* Simple Search Input */}
            <form onSubmit={handleHeroSearchSubmit} className="relative max-w-md mx-auto lg:mx-0 pt-2">
              <input
                type="text"
                placeholder="Search topics (e.g. Attachment, Pre-Marital Check, Confidence)..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                className="w-full pl-11 pr-28 py-3.5 text-xs rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Column - Founder Spotlight Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card bg-white/90 dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-5 max-w-md mx-auto">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md">
                <img
                  src="/images/prateek_user.png"
                  alt="Prateek Mhaisane"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-xs">5.0 Star Rating (348 Reviews)</span>
                  </div>
                  <h3 className="text-xl font-black">{leadCoach.name}</h3>
                  <p className="text-xs text-slate-300 font-semibold">{leadCoach.title}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Direct Rate</span>
                  <div className="text-lg font-black text-slate-900 dark:text-white">₹4,999 <span className="text-xs font-normal text-slate-400">/ 50m</span></div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCoachId('coach-prateek');
                    setCurrentPage('coach-profile');
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-md hover:opacity-90"
                >
                  View Founder Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 CORE PILLARS SECTION - 3D Illustrative Clean Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Our 3 Core Pillars
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Everything You Need for Relationship Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: 1-on-1 Coaching */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-5 hover:scale-105 transition-all">
            <div className="w-20 h-20 rounded-2xl bg-pink-100 dark:bg-pink-950/60 p-2 shadow-inner mx-auto overflow-hidden">
              <img src="/images/3d_coaching.jpg" alt="Coaching" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">1-on-1 Dating Strategy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Personalized confidence coaching, approach anxiety elimination, and high-converting dating advice by Coach Prateek Mhaisane.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('browse')}
              className="w-full py-3 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 flex items-center justify-center gap-1.5"
            >
              <span>Explore 1-on-1 Coaches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 2: Detective Agency */}
          <div className="glass-card bg-slate-950 text-white rounded-3xl p-8 border border-amber-500/40 shadow-2xl space-y-5 hover:scale-105 transition-all relative overflow-hidden">
            <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] uppercase">
              100% Confidential
            </span>
            <div className="w-20 h-20 rounded-2xl bg-amber-950/80 p-2 shadow-inner mx-auto overflow-hidden border border-amber-500/40">
              <img src="/images/3d_detective.jpg" alt="Detective Agency" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Detective Agency & Audits</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-marital due diligence, criminal record scans, financial verification, and discreet partner loyalty audits.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('detective-agency')}
              className="w-full py-3 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 flex items-center justify-center gap-1.5 shadow-lg"
            >
              <span>View Detective Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pillar 3: AI Profile Audit */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-5 hover:scale-105 transition-all">
            <div className="w-20 h-20 rounded-2xl bg-purple-100 dark:bg-purple-950/60 p-2 shadow-inner mx-auto overflow-hidden">
              <img src="/images/3d_ai.jpg" alt="AI Profile Audit" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Profile Auditor & Quiz</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant profile attraction score (0-100), red flag warnings, bio rewrites, and 2-minute relational assessment.
              </p>
            </div>
            <button
              onClick={() => setCurrentPage('ai-auditor')}
              className="w-full py-3 rounded-xl text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 flex items-center justify-center gap-1.5"
            >
              <span>Start Free AI Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Simple 3-Step Clear Path */}
      <section className="glass-card bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-14 max-w-7xl mx-auto border border-indigo-500/30 shadow-2xl">
        <div className="max-w-xl mx-auto text-center space-y-2 mb-12">
          <span className="text-xs font-extrabold uppercase text-amber-400">Simple 3-Step Process</span>
          <h2 className="text-3xl font-black">How DateMentor Delivers Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg">
              1
            </div>
            <h4 className="text-base font-bold">Select Your Service</h4>
            <p className="text-xs text-slate-300">Choose between 1-on-1 coaching, couples counseling, or confidential background checks.</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-lg">
              2
            </div>
            <h4 className="text-base font-bold">Book Date or Confidential Enquiry</h4>
            <p className="text-xs text-slate-300">Pick an available time slot on Coach Prateek's calendar or file an encrypted audit request.</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center mx-auto shadow-lg">
              3
            </div>
            <h4 className="text-base font-bold">Achieve Complete Peace of Mind</h4>
            <p className="text-xs text-slate-300">Receive 256-bit encrypted PDF reports and actionable coaching guidance.</p>
          </div>
        </div>
      </section>

      {/* FEATURED COACHES SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Top Vetted Mentors</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Featured Coaches & Investigators</h2>
          </div>

          <button
            onClick={() => setCurrentPage('browse')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View All Vetted Coaches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_COACHES.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-md mx-auto space-y-1">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Verified Stories</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Loved by Clients & Couples</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{t.name}</div>
                  <div className="text-[10px] text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
