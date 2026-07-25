import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, FileText, ArrowRight, Download, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const AttachmentTestPage: React.FC = () => {
  const { setCurrentPage, setSelectedCoachId, addToast } = useApp();
  const [step, setStep] = useState(1);
  const [scores, setScores] = useState({ anxious: 0, avoidant: 0, secure: 0 });

  const questions = [
    {
      q: 'When your partner or match takes hours to reply to a text, how do you usually feel?',
      opts: [
        { label: 'Anxious, checking phone constantly, worrying they lost interest.', type: 'anxious' },
        { label: 'Indifferent or relieved, I prefer having space.', type: 'avoidant' },
        { label: 'Calm, assuming they are busy with work.', type: 'secure' }
      ]
    },
    {
      q: 'When conflict arises in a relationship, what is your instinct?',
      opts: [
        { label: 'Seek immediate reassurance and demand to talk it out right now.', type: 'anxious' },
        { label: 'Withdraw, shut down, or walk away until things cool off.', type: 'avoidant' },
        { label: 'Express feelings openly while respecting boundaries.', type: 'secure' }
      ]
    }
  ];

  const handleSelectOption = (type: string) => {
    setScores(prev => ({ ...prev, [type as keyof typeof prev]: prev[type as keyof typeof prev] + 1 }));
    if (step < questions.length) {
      setStep(step + 1);
    } else {
      setStep(3);
    }
  };

  const handleDownloadPDF = () => {
    addToast({
      type: 'success',
      title: 'Attachment Report Downloaded',
      message: 'Confidential Attachment PDF Report saved to your downloads!'
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumb items={[{ label: 'Attachment Style Diagnostic Test' }]} />

      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-extrabold uppercase">
          Clinical Attachment Quiz
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Discover Your Relational Attachment Style</h1>
        <p className="text-xs text-slate-500">Based on Gottman & Bowlby Attachment Theory. Guided by Founder Prateek Mhaisane.</p>
      </div>

      <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
        {step <= questions.length ? (
          <div className="space-y-4">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Question {step} of {questions.length}</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{questions[step - 1].q}</h3>
            <div className="space-y-2">
              {questions[step - 1].opts.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.type)}
                  className="w-full text-left p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 font-bold text-xs text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-purple-500" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase">Diagnostic Breakdown</span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Primary Style: Anxious-Preoccupied Attachment</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                You tend to crave high emotional intimacy but fear abandonment or sudden distance. Coach Prateek Mhaisane specializes in shifting towards Secure Attachment.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download PDF Report
              </button>

              <button
                onClick={() => {
                  setSelectedCoachId('coach-prateek');
                  setCurrentPage('booking');
                }}
                className="px-6 py-3 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-md"
              >
                Book Attachment Session with Prateek
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
