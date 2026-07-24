import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const PricingPage: React.FC = () => {
  const { setCurrentPage, addToast } = useApp();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleSelectPlan = (planName: string) => {
    addToast({
      type: 'success',
      title: `${planName} Plan Selected`,
      message: `You selected the ${planName} membership plan. Proceeding to coach selection.`
    });
    setCurrentPage('browse');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumb items={[{ label: 'Pricing Plans' }]} />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase">
          <Sparkles className="w-3.5 h-3.5" /> Transparent Membership Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
          Invest in Your <span className="gradient-text">Relational Future</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Select a membership tier or pay per 1-on-1 coaching session. All memberships include direct messaging & 24/7 video room access.
        </p>

        {/* Monthly vs Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-indigo-600 p-1 relative transition-colors"
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
          <span className={`text-xs font-bold flex items-center gap-1 ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[9px] uppercase">
              Save 20%
            </span>
          </span>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Starter Plan */}
        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter</h3>
            <p className="text-xs text-slate-500 mt-1">Perfect for singles taking their first step into coaching.</p>
            
            <div className="my-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                ${isAnnual ? '29' : '39'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/month</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>1 Coaching Session / Month Included</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Access to All Verified Coaches</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Standard Chat Support</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Starter')}
            className="w-full mt-8 py-3 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors"
          >
            Select Starter Plan
          </button>
        </div>

        {/* Premium Plan (POPULAR) */}
        <div className="glass-card bg-slate-900 text-white rounded-3xl p-8 border-2 border-indigo-500 shadow-2xl relative flex flex-col justify-between">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
            Most Popular Choice
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">Premium</h3>
            <p className="text-xs text-slate-400 mt-1">Ideal for active dating, relationship building, & couples.</p>
            
            <div className="my-6">
              <span className="text-4xl font-black text-white">
                ${isAnnual ? '79' : '99'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/month</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 border-t border-slate-800 pt-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span><strong>3 Sessions / Month</strong> Included</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Priority HD Video Room Bandwidth</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Direct 24/7 Chat with Your Coach</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Dating Profile Audit & Rewrite</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Premium')}
            className="w-full mt-8 py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 transition-opacity"
          >
            Get Premium Access
          </button>
        </div>

        {/* Elite Plan */}
        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Elite VIP</h3>
            <p className="text-xs text-slate-500 mt-1">Unlimited executive coaching & emergency relational guidance.</p>
            
            <div className="my-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                ${isAnnual ? '199' : '249'}
              </span>
              <span className="text-xs text-slate-400 font-semibold">/month</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span><strong>Unlimited Monthly 1-on-1 Sessions</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Co-Coaching Duo for Couples</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Same-Day Emergency Calling Slot</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Dedicated Relationship Concierge</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('Elite')}
            className="w-full mt-8 py-3 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 transition-colors"
          >
            Join Elite VIP
          </button>
        </div>
      </div>
    </div>
  );
};
