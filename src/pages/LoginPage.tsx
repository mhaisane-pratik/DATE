import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Lock, Mail, ArrowRight, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { setCurrentPage, setUserRole, addToast } = useApp();
  const [email, setEmail] = useState('alex.user@datementor.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Welcome Back!',
      message: 'Logged in successfully.'
    });
    setCurrentPage('user-dashboard');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'user') {
      setEmail('alex.user@datementor.com');
      setCurrentPage('user-dashboard');
    } else if (role === 'coach') {
      setEmail('pratik@datementor.com');
      setCurrentPage('coach-dashboard');
    } else {
      setEmail('admin@datementor.com');
      setCurrentPage('admin-dashboard');
    }
    addToast({
      type: 'success',
      title: `Logged in as ${role.toUpperCase()}`,
      message: `Quick-fill demo account active!`
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20 pt-8">
      <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gradient-bg text-white flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Sign In to DateMentor</h1>
          <p className="text-xs text-slate-500">Access your 1-on-1 sessions, coach chats, and schedule.</p>
        </div>

        {/* 1-Click Quick Demo Presets */}
        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 text-center space-y-2">
          <span className="text-[10px] font-extrabold uppercase text-indigo-600 dark:text-indigo-400">1-Click Quick Demo Sign In</span>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => handleQuickDemoLogin('user')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-transform"
            >
              👤 Client
            </button>
            <button
              onClick={() => handleQuickDemoLogin('coach')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-transform"
            >
              👩‍⚕️ Coach
            </button>
            <button
              onClick={() => handleQuickDemoLogin('admin')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-transform"
            >
              ⚡ Admin
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setCurrentPage('forgot-password')}
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Don't have an account yet?{' '}
          <button onClick={() => setCurrentPage('register')} className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
