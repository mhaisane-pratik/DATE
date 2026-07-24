import React, { useState } from 'react';
import { Heart, User, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const { setCurrentPage, setUserRole, addToast } = useApp();
  const [roleChoice, setRoleChoice] = useState<'user' | 'coach'>('user');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(roleChoice);
    addToast({
      type: 'success',
      title: 'Account Created!',
      message: `Welcome to DateMentor as a ${roleChoice === 'coach' ? 'Coach' : 'Client'}.`
    });
    if (roleChoice === 'coach') setCurrentPage('coach-dashboard');
    else setCurrentPage('browse');
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20 pt-8">
      <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-bg text-white flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Join DateMentor Today</h1>
          <p className="text-xs text-slate-500">Connect with top coaches or offer certified coaching services.</p>
        </div>

        {/* Role Choice Toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setRoleChoice('user')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              roleChoice === 'user' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Seeking Coaching
          </button>
          <button
            onClick={() => setRoleChoice('coach')}
            className={`py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              roleChoice === 'coach' ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            Become a Coach
          </button>
        </div>

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Email Address</label>
            <input
              type="email"
              required
              placeholder="alex@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Password</label>
            <input
              type="password"
              required
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Already have an account?{' '}
          <button onClick={() => setCurrentPage('login')} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
