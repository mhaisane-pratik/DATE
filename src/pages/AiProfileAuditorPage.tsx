import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Upload, CheckCircle2, Zap, ArrowRight, RefreshCw, MessageSquare, Copy, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const AiProfileAuditorPage: React.FC = () => {
  const { setCurrentPage, setSelectedCoachId, addToast } = useApp();
  const [bioInput, setBioInput] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        score: 88,
        photoFeedback: 'Great lighting, but try adding an active hobby photo instead of solo selfies.',
        redFlags: ['Generic "I like coffee and travel" prompt response', 'Eyeglasses in photo #1 reduces trust'],
        bioOptions: [
          'Design lead by day, weekend mountain hiker. Looking for someone who can debate the best sourdough in town and isn\'t afraid of spontaneous weekend road trips.',
          'Passionate about architectural design, jazz vinyls, and cooking authentic cacio e pepe. Searching for a partner with ambitious goals and a warm sense of humor.',
          'High energy, curious mind, and zero patience for boring conversations. Let\'s grab coffee and skip the small talk.'
        ]
      });
      addToast({
        type: 'success',
        title: 'AI Audit Complete!',
        message: 'Your profile score and bio rewrites are ready!'
      });
    }, 1200);
  };

  const handleCopyBio = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast({
      type: 'info',
      title: 'Copied to Clipboard!',
      message: 'Bio rewrite copied. Paste it into your Tinder/Hinge profile!'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      <Breadcrumb items={[{ label: 'AI Dating Profile Auditor' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Powered by Prateek Mhaisane's AI Engine
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Dating Profile & Bio Auditor</h1>
        <p className="text-xs text-slate-500">Paste your bio or upload profile prompts to get an instant score and high-converting rewrites.</p>
      </div>

      <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
        <form onSubmit={handleAudit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
              Paste Your Current Bio / Dating Prompts
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Just a simple guy who loves coffee, dogs, travel, and Netflix. Looking for someone genuine..."
              value={bioInput}
              onChange={(e) => setBioInput(e.target.value)}
              className="w-full px-4 py-3 text-xs rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isAuditing}
            className="w-full py-4 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 flex items-center justify-center gap-2"
          >
            {isAuditing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isAuditing ? 'Auditing Your Bio & Profile...' : 'Analyze Profile & Generate Bio Rewrites'}
          </button>
        </form>

        {auditResult && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900">
              <div>
                <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">Attraction Score</span>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{auditResult.score} / 100</div>
              </div>
              <button
                onClick={() => {
                  setSelectedCoachId('coach-prateek');
                  setCurrentPage('coach-profile');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg"
              >
                Book 1-on-1 Audit with Prateek
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">3 High-Converting Bio Rewrites by Coach Prateek</h4>
              <div className="space-y-3">
                {auditResult.bioOptions.map((bio: string, idx: number) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs text-slate-800 dark:text-slate-200">
                    <p className="leading-relaxed font-medium">"{bio}"</p>
                    <button
                      onClick={() => handleCopyBio(bio)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-[10px] shrink-0 flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Copy
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
