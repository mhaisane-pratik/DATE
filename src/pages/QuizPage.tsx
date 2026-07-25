import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const QuizPage: React.FC = () => {
  const { setCurrentPage, setSelectedCoachId, setCategoryFilter } = useApp();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    relationshipStatus: '',
    primaryChallenge: ''
  });

  const handleComplete = (recommendedCategory: string) => {
    setCategoryFilter(recommendedCategory);
    setSelectedCoachId('coach-prateek');
    setCurrentPage('browse');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumb items={[{ label: 'Relational & Match Assessment Quiz' }]} />

      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase">
          2-Minute Assessment
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Find Your Ideal Coaching Path</h1>
        <p className="text-xs text-slate-500">Answer 3 quick questions to get matched with Founder Prateek Mhaisane & Team.</p>
      </div>

      <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 1: What is your primary goal right now?</h3>
            <div className="space-y-2">
              {[
                { label: 'Build Dating Confidence & Improve Matches', cat: 'dating-mindset' },
                { label: 'Pre-Marital Background Verification & Due Diligence', cat: 'detective-verification' },
                { label: 'Heal Anxious / Avoidant Attachment Cycle', cat: 'attachment-styles' },
                { label: 'Save Marriage or Reignite Romance', cat: 'marriage-longterm' }
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAnswers({ ...answers, goal: opt.label });
                    setStep(2);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Step 2: What best describes your current relationship status?</h3>
            <div className="space-y-2">
              {[
                'Single & Actively Dating',
                'In a Relationship / Getting Serious',
                'Engaged / Planning Marriage',
                'Married'
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setAnswers({ ...answers, relationshipStatus: opt });
                    setStep(3);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>{opt}</span>
                  <ArrowRight className="w-4 h-4 text-indigo-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Match Result</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Recommended: 1-on-1 Strategy with Prateek Mhaisane</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Based on your answers, Founder Prateek Mhaisane's personalized dating & verification framework is the ideal match for your goals.
              </p>
            </div>

            <button
              onClick={() => handleComplete('dating-mindset')}
              className="px-8 py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl"
            >
              See Recommended Coaches & Plans
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
