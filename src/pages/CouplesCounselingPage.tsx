import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, Calendar, ShieldCheck, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { MOCK_COACHES } from '../data/mockData';
import { CoachCard } from '../components/common/CoachCard';

export const CouplesCounselingPage: React.FC = () => {
  const { setCurrentPage, setSelectedCoachId } = useApp();
  const couplesCoaches = MOCK_COACHES.filter(c => c.categories.includes('marriage-longterm') || c.categories.includes('communication'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumb items={[{ label: 'Marriage & Couples Counseling' }]} />

      {/* Hero */}
      <div className="glass-card bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-extrabold uppercase border border-purple-500/40">
            <Sparkles className="w-3.5 h-3.5" /> Gottman Certified Marriage & Intimacy Coaching
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Reignite Romance & Build <span className="gradient-text">Unshakable Intimacy</span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Coached by <strong>Prateek Mhaisane</strong> and Gottman-certified associate psychologists. Overcome chronic arguments, rebuild trust after infidelity, and restore joyful communication.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                setSelectedCoachId('coach-prateek');
                setCurrentPage('booking');
              }}
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl"
            >
              Book Joint Couples Session ($150)
            </button>
          </div>
        </div>
      </div>

      {/* Certified Counselors List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Certified Marriage & Relationship Counselors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {couplesCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </div>
  );
};
