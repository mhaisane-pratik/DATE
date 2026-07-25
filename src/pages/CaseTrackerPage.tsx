import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, CheckCircle2, Lock, FileText, Download, PhoneCall, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const CaseTrackerPage: React.FC = () => {
  const { addToast } = useApp();
  const [caseIdInput, setCaseIdInput] = useState('');
  const [caseData, setCaseData] = useState<any>(null);

  const handleTrackCase = (e: React.FormEvent) => {
    e.preventDefault();
    setCaseData({
      id: caseIdInput || 'DM-DET-8842',
      clientAlias: 'Client #8842',
      serviceType: 'Pre-Marital Background & Due Diligence Audit',
      investigator: 'Prateek Mhaisane & Senior Detective Vikramaditya',
      status: 'In Progress (85% Complete)',
      estimatedCompletion: 'Today, 06:00 PM',
      steps: [
        { title: 'Identity & Address Verification', status: 'completed', time: 'Yesterday, 11:00 AM' },
        { title: 'Court & Criminal Record Scan', status: 'completed', time: 'Yesterday, 04:30 PM' },
        { title: 'Financial Standing & Asset Due Diligence', status: 'completed', time: 'Today, 09:15 AM' },
        { title: 'Social & Digital Profile Verification', status: 'in-progress', time: 'Est. 04:00 PM' },
        { title: 'Final Confidential Encrypted PDF Report', status: 'pending', time: 'Est. 06:00 PM' }
      ]
    });
    addToast({
      type: 'info',
      title: 'Case Record Found',
      message: 'Viewing real-time investigation progress.'
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      <Breadcrumb items={[{ label: 'Detective Agency Case Tracker' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase border border-amber-500/30">
          🔒 100% Encrypted & Confidential Portal
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Private Investigation Case Tracker</h1>
        <p className="text-xs text-slate-500">Enter your confidential Case Reference ID to view real-time investigation milestones.</p>
      </div>

      <div className="glass-card bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6">
        <form onSubmit={handleTrackCase} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 mb-1 block">Enter Case Reference ID (e.g. DM-DET-8842)</label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="DM-DET-XXXX"
                value={caseIdInput}
                onChange={(e) => setCaseIdInput(e.target.value)}
                className="flex-1 px-4 py-3 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md flex items-center gap-1.5"
              >
                <Search className="w-4 h-4" /> Track Status
              </button>
            </div>
          </div>
        </form>

        {caseData && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-slate-800">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Case Reference</span>
                <div className="text-base font-black text-amber-400">{caseData.id}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Service Type</span>
                <div className="font-bold text-white">{caseData.serviceType}</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Assigned Lead</span>
                <div className="font-bold text-white">{caseData.investigator}</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Real-Time Investigation Timeline</h4>
              <div className="space-y-3">
                {caseData.steps.map((step: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold shrink-0 ${
                      step.status === 'completed' ? 'bg-emerald-500 text-slate-950' : step.status === 'in-progress' ? 'bg-amber-500 text-slate-950 animate-pulse' : 'bg-slate-700 text-slate-400'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white">{step.title}</div>
                      <div className="text-[10px] text-slate-400">{step.time}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      step.status === 'completed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : step.status === 'in-progress' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {step.status}
                    </span>
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
