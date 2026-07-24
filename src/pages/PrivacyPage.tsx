import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Last updated: July 2026</p>
      </div>

      <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Collect</h2>
          <p>
            At DateMentor ("Platform", "We"), we take client confidentiality and relational privacy with utmost seriousness. We collect personal information you provide when creating an account, filling out pre-session intake questionnaires, or scheduling 1-on-1 coaching calls.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Video Session Encryption</h2>
          <p>
            All video calls and audio communications hosted through DateMentor's WebRTC infrastructure are protected using end-to-end 256-bit SSL encryption. We do not record or archive private video session feeds.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. How We Use Data</h2>
          <p>
            Your information is strictly utilized to match you with compatible relationship coaches, process billing transactions, and improve platform recommendations. We never sell your personal or relational data to third-party advertisers.
          </p>
        </section>
      </div>
    </div>
  );
};
