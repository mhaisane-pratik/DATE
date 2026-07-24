import React from 'react';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumb items={[{ label: 'Terms & Conditions' }]} />

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms & Conditions</h1>
        <p className="text-xs text-slate-500">Effective Date: July 2026</p>
      </div>

      <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Marketplace Agreement</h2>
          <p>
            By accessing DateMentor, you agree to comply with our Terms of Service. DateMentor functions as a marketplace facilitating connections between clients seeking coaching and independent certified relationship professionals.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. Cancellation & Refund Policy</h2>
          <p>
            Clients may reschedule or cancel any booked coaching session up to 24 hours prior to the scheduled start time for a 100% refund. Cancellations made within 24 hours of session start may be subject to a 50% coach reservation fee.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">3. Professional Disclaimer</h2>
          <p>
            Relationship coaching provided through DateMentor is designed for goal achievement, attachment clarity, and communication growth. Coaching is not psychiatric emergency treatment or clinical therapy.
          </p>
        </section>
      </div>
    </div>
  );
};
