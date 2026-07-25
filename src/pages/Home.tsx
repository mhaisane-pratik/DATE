import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  MessageSquare,
  CheckCircle2,
  ChevronDown,
  Star,
  Zap,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COACHES, MOCK_CATEGORIES, MOCK_TESTIMONIALS, MOCK_FAQ } from '../data/mockData';
import { CoachCard } from '../components/common/CoachCard';
import { StarRating } from '../components/common/StarRating';

export const Home: React.FC = () => {
  const { setCurrentPage, setSearchFilter, setCategoryFilter, setSelectedCoachId, updateBookingDraft } = useApp();
  const [heroSearch, setHeroSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilter(heroSearch);
    setCurrentPage('browse');
  };

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Decorative Blurred Gradient Spheres */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prateek Mhaisane's Relationship Coaching Platform</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
              >
                Find the Right <br />
                <span className="gradient-text">Relationship Coach</span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
              >
                Transform your dating confidence & emotional intimacy with Founder & Lead Coach <strong>Prateek Mhaisane</strong> (+91 9737372183) and his team of certified experts.
              </motion.p>

              {/* Search Bar Widget */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onSubmit={handleHeroSearch}
                className="glass-card bg-white/90 dark:bg-slate-800/90 rounded-2xl p-2.5 shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto lg:mx-0"
              >
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="Search by topic (e.g. Attachment, Confidence, Marriage)..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white gradient-bg hover:opacity-95 shadow-lg shadow-indigo-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  Search Coaches
                </button>
              </motion.form>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2"
              >
                <button
                  onClick={() => setCurrentPage('browse')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md transition-all flex items-center gap-2"
                >
                  Book a Session
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentPage('detective-agency')}
                  className="px-6 py-3 rounded-xl text-sm font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg transition-all flex items-center gap-2 border border-amber-500"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Detective Agency 🕵️‍♂️
                </button>

                <button
                  onClick={() => setCurrentPage('register')}
                  className="px-6 py-3 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all flex items-center gap-2"
                >
                  Become a Coach
                </button>
              </motion.div>

              {/* Social Proof Avatars */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" alt="User" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="User" />
                </div>
                <div>
                  <StarRating rating={4.9} showText={false} size={14} />
                  <span className="font-medium text-slate-700 dark:text-slate-300">Over 15,000+ sessions completed</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card Stack */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Main Hero Featured Coach Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="glass-card bg-white/95 dark:bg-slate-800/95 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-700/80 relative z-20"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={MOCK_COACHES[0].avatar}
                      alt={MOCK_COACHES[0].name}
                      className="w-16 h-16 rounded-2xl object-cover object-top ring-2 ring-indigo-500 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{MOCK_COACHES[0].name}</h3>
                        <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{MOCK_COACHES[0].title}</p>
                      <StarRating rating={MOCK_COACHES[0].rating} count={MOCK_COACHES[0].reviewsCount} />
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic mb-4 bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    "{MOCK_COACHES[0].bio}"
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">Session Rate</span>
                      <div className="text-lg font-black text-slate-900 dark:text-white">${MOCK_COACHES[0].hourlyRate}/hr</div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCoachId(MOCK_COACHES[0].id);
                        updateBookingDraft({ coach: MOCK_COACHES[0], price: MOCK_COACHES[0].hourlyRate });
                        setCurrentPage('booking');
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg shadow-md hover:opacity-90 transition-opacity"
                    >
                      Book 1-on-1 Call
                    </button>
                  </div>
                </motion.div>



                {/* Floating Glass Widget 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -right-8 glass-panel bg-white/90 dark:bg-slate-900/90 p-3.5 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 z-30 hidden sm:flex"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">98.4% Client Satisfaction</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">From 4,200+ Verified Ratings</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 rounded-3xl p-8 sm:p-12 text-white border border-indigo-500/20 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-black gradient-text">250+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">Certified Coaches</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">15,400+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">Sessions Completed</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">98%</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">Success & Match Rate</div>
            </div>
            <div className="p-2">
              <div className="text-3xl sm:text-4xl font-black text-pink-400">4.96/5</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">Average Client Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COACHES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Vetted Experts
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Featured Relationship Coaches
            </h2>
          </div>
          <button
            onClick={() => setCurrentPage('browse')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            Explore All 250+ Coaches <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COACHES.slice(0, 3).map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            How DateMentor Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
            Transform your dating mindset and relationship dynamics with personalized 1-on-1 guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative text-center">
            <div className="w-14 h-14 rounded-2xl gradient-bg text-white font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/20">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Browse & Filter Experts
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Filter coaches by specialty (Attachment, Confidence, Gottman Marriage), hourly rates, languages, and availability.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/20">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Select Date & Session Type
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pick a slot that fits your calendar. Choose between HD Video, Voice, or messaging deep-dives.
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 relative text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-black text-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-500/20">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Achieve Breakthroughs
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive structured action plans, boundary frameworks, and personalized relationship roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Tailored Specializations
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Explore Coaching Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id);
                setCurrentPage('browse');
              }}
              className="group cursor-pointer glass-card bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-500/50 transition-all card-hover"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <span>{cat.coachesCount} Coaches</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS & SUCCESS STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-400">
                Real Client Transformations
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Success Stories & Testimonials
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_TESTIMONIALS.map((t) => (
                <div key={t.id} className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 flex flex-col justify-between">
                  <div>
                    <StarRating rating={t.rating} showText={false} />
                    <p className="text-xs text-slate-300 italic mt-3 leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-700/60">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500" />
                    <div>
                      <h4 className="text-xs font-bold text-white">{t.name}</h4>
                      <p className="text-[10px] text-slate-400">{t.role}</p>
                      <span className="text-[10px] text-indigo-400 font-semibold">Coach: {t.coachName}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {MOCK_FAQ.map((item, index) => (
            <div
              key={index}
              className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{item.question}</span>
                <ChevronDown className={`w-4 h-4 text-indigo-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-bg rounded-3xl p-10 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Transform Your Love Life?
            </h2>
            <p className="text-sm sm:text-base text-indigo-100">
              Join thousands of clients who found emotional clarity, romantic success, and long-term partnership with DateMentor coaches.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentPage('browse')}
                className="px-8 py-3.5 rounded-xl text-sm font-extrabold text-slate-900 bg-white hover:bg-slate-100 shadow-xl active:scale-95 transition-all"
              >
                Find Your Coach Now
              </button>
              <button
                onClick={() => setCurrentPage('register')}
                className="px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/40 transition-all"
              >
                Become a Coach
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
