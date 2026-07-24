import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Award, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setCurrentPage, setSelectedCoachId, updateBookingDraft } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumb items={[{ label: 'About Coach Pratik & DateMentor' }]} />

      {/* Founder Hero */}
      <div className="glass-card bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-indigo-500/30 shadow-2xl overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-5 relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
              alt="Coach Pratik"
              className="w-64 h-64 sm:w-80 sm:h-80 rounded-3xl object-cover ring-4 ring-indigo-500/50 shadow-2xl mx-auto"
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white font-extrabold text-xs uppercase shadow-md">
              Founder & Lead Coach
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-extrabold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Founder's Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Meet Coach <span className="gradient-text">Pratik</span>
            </h1>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              "I built DateMentor to give singles and couples a safe, evidence-based, and highly actionable platform to transform their love lives. Relationship confidence isn't luck—it's a skill you can master with the right guidance."
            </p>
            <p className="text-xs text-slate-400">
              Over the last 10+ years, Pratik has logged over 4,800 coaching hours, helped 1,250+ clients, and built a handpicked team of certified associate Gottman psychologists.
            </p>

            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-4">
              <button
                onClick={() => {
                  setSelectedCoachId('coach-pratik');
                  setCurrentPage('coach-profile');
                }}
                className="px-6 py-3 rounded-xl text-xs font-extrabold text-slate-900 bg-white hover:bg-slate-100 shadow-lg"
              >
                Book 1-on-1 Session with Pratik
              </button>
              <button
                onClick={() => setCurrentPage('browse')}
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20"
              >
                Explore Associate Coaches
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Pratik's Scientific Methodology</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Combining Gottman couples research, NLP mindset rewiring, and attachment theory for fast, permanent results.
          </p>
        </div>

        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">100% Tailored Confidentiality</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every call with Pratik and his associates takes place in our 256-bit encrypted HD video room.
          </p>
        </div>

        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Guaranteed Action Plan</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You leave every session with customized boundary scripts, dating profile improvements, and homework.
          </p>
        </div>
      </div>
    </div>
  );
};
