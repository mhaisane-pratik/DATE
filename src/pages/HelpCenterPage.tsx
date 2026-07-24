import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, ShieldCheck, ChevronDown, MessageSquare } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { MOCK_FAQ } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const HelpCenterPage: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-10">
      <Breadcrumb items={[{ label: 'Help Center & Knowledge Base' }]} />

      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">How Can We Help You Today?</h1>
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search help articles (e.g. refunds, video room, cancellations)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center space-y-2">
          <BookOpen className="w-8 h-8 text-indigo-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Booking & Rescheduling</h3>
          <p className="text-xs text-slate-500">Learn how to change time slots or request 100% refunds up to 24h prior.</p>
        </div>

        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Privacy & Security</h3>
          <p className="text-xs text-slate-500">256-bit encrypted HD video calls and confidential intake notes.</p>
        </div>

        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 text-center space-y-2">
          <MessageSquare className="w-8 h-8 text-purple-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Coach Verification</h3>
          <p className="text-xs text-slate-500">Our 4-step background check and clinical Gottman credentialing.</p>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">Frequently Asked Questions</h3>
        {MOCK_FAQ.map((item, index) => (
          <div key={index} className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full px-6 py-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center justify-between gap-4"
            >
              <span>{item.question}</span>
              <ChevronDown className={`w-4 h-4 text-indigo-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
            </button>
            {openFaq === index && (
              <div className="px-6 pb-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
