import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ShieldCheck, Zap, ArrowRight, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const PricingPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter Coaching',
      priceMonthly: 2499,
      priceAnnual: 1999,
      description: 'Ideal for singles looking to optimize their dating profiles and gain clarity.',
      features: [
        '1 Session / month with Associate Coach',
        'AI Dating Profile Audit & Bio Rewrite',
        'Access to Live Group Masterclasses',
        'WhatsApp Community Access'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Relationship Pass',
      priceMonthly: 7499,
      priceAnnual: 5999,
      isPopular: true,
      description: 'Our most popular plan for active dating, confidence building, & pre-marital clarity.',
      features: [
        '3 Sessions / month with Coach Prateek Mhaisane',
        '100% Pre-Dating Background Verification Check',
        'Unlimited AI Profile Rewrites & Chat Strategy',
        'Priority Session Booking & WhatsApp Line',
        'Gottman Attachment Style PDF Report'
      ]
    },
    {
      id: 'elite',
      name: 'VIP Executive & Verification',
      priceMonthly: 19999,
      priceAnnual: 15999,
      description: 'Full-spectrum 1-on-1 coaching, couples therapy, and complete Detective Agency due diligence.',
      features: [
        'Unlimited 1-on-1 Coaching with Prateek Mhaisane',
        'Full Pre-Marital Background & Loyalty Audit',
        'Dedicated Private Investigator assigned',
        'VIP Matchmaking Introductions',
        '24/7 Encrypted WhatsApp Hotline'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      <Breadcrumb items={[{ label: 'Membership Plans & Pricing' }]} />

      <div className="text-center max-w-xl mx-auto space-y-4">
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase border border-indigo-200 dark:border-indigo-800">
          Transparent Indian Rupee (INR) Pricing
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Simple Plans for Every Relationship Goal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Transparent monthly and annual coaching memberships. No hidden fees. Cancel anytime.
        </p>

        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !isAnnual ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md' : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              isAnnual ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'
            }`}
          >
            Annual (Save 20%) <Sparkles className="w-3 h-3 text-amber-300" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border flex flex-col justify-between relative ${
                plan.isPopular ? 'border-2 border-indigo-500 shadow-2xl scale-105' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white font-black text-[10px] uppercase shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.description}</p>

                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    ₹{price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold"> / month</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-6">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setCurrentPage('register')}
                className={`w-full mt-8 py-3.5 rounded-xl text-xs font-bold transition-all ${
                  plan.isPopular
                    ? 'gradient-bg text-white font-black shadow-lg hover:opacity-95'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
                }`}
              >
                Get Started with {plan.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
