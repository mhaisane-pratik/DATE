import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Search,
  Lock,
  CheckCircle2,
  FileText,
  Eye,
  UserCheck,
  PhoneCall,
  Sparkles,
  Send,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { MOCK_DETECTIVE_PACKAGES } from '../data/mockData';

export const DetectiveAgencyPage: React.FC = () => {
  const { setCurrentPage, addToast, setSelectedCoachId, updateBookingDraft } = useApp();
  const [activeTab, setActiveTab] = useState<'packages' | 'enquiry'>('packages');
  
  const [enquiryForm, setEnquiryForm] = useState({
    name: '',
    phone: '',
    serviceType: 'Pre-Marital Background Verification',
    details: '',
    isUrgent: false
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: '100% Confidential Enquiry Received',
      message: 'Founder Prateek Mhaisane & Senior Investigator Vikramaditya will contact you discreetly within 2 hours.'
    });
    setEnquiryForm({
      name: '',
      phone: '',
      serviceType: 'Pre-Marital Background Verification',
      details: '',
      isUrgent: false
    });
  };

  const handleSelectPackage = (pkg: any) => {
    setSelectedCoachId('coach-detective-vikram');
    updateBookingDraft({
      price: pkg.price,
      sessionType: 'video'
    });
    addToast({
      type: 'info',
      title: `${pkg.title} Selected`,
      message: 'Proceeding to confidential consultation checkout.'
    });
    setCurrentPage('booking');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
      <Breadcrumb items={[{ label: 'Detective & Verification Agency' }]} />

      {/* Hero Banner */}
      <div className="glass-card bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-14 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold uppercase">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>100% Confidential Pre-Marital & Partner Verification</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            DateMentor <span className="gradient-text">Detective & Verification</span> Agency
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Founded by <strong>Prateek Mhaisane</strong> (+91 9737372183). We provide high-discreet background checks, pre-wedding due diligence, secret online profile discovery, and loyalty verification with complete legal protection and NDA.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('enquiry')}
              className="px-6 py-3.5 rounded-xl text-xs font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              File Confidential Enquiry
            </button>
            <a
              href="tel:+919737372183"
              className="px-6 py-3.5 rounded-xl text-xs font-bold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Direct Hotline: +91 9737372183
            </a>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Pre-Marital Background Checks</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Verify legal marital status, past court records, employment standing, and family background before marriage.
          </p>
        </div>

        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Digital & Social Profile Audits</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Uncover secret dating app accounts, hidden social media profiles, and digital footprint discrepancies.
          </p>
        </div>

        <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Infidelity & Loyalty Verification</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Discreet field investigation and forensic evidence collection for suspected marital breach or infidelity.
          </p>
        </div>
      </div>

      {/* Investigation Packages */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-500">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
            Verification Packages & Audits
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_DETECTIVE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border flex flex-col justify-between relative ${
                pkg.isPopular ? 'border-2 border-amber-500 shadow-2xl' : 'border-slate-200 dark:border-slate-700'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] uppercase shadow-md">
                  Most Requested Audit
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{pkg.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{pkg.description}</p>

                <div className="my-6">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">${pkg.price}</span>
                  <span className="text-xs text-slate-400 font-semibold"> / one-time audit</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-6">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPackage(pkg)}
                className={`w-full mt-8 py-3.5 rounded-xl text-xs font-bold transition-all ${
                  pkg.isPopular
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg hover:bg-amber-300'
                    : 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90'
                }`}
              >
                Book Confidential Audit (${pkg.price})
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Confidential Enquiry Form Section */}
      <div className="glass-card bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Discreet & Encrypted</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">File a Private Investigation Request</h2>
            <p className="text-xs text-slate-400">
              Directly routed to Prateek Mhaisane & Senior Detective Vikramaditya under strict Non-Disclosure Agreement.
            </p>
          </div>

          <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-300 mb-1 block">Your Name (Alias allowed)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anonymous Client"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 mb-1 block">Phone / WhatsApp (+91 9737372183)</label>
                <input
                  type="text"
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-300 mb-1 block">Service Required</label>
              <select
                value={enquiryForm.serviceType}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, serviceType: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              >
                <option value="Pre-Marital Background Verification">Pre-Marital Background Verification</option>
                <option value="Dating App & Social Profile Audit">Dating App & Social Profile Audit</option>
                <option value="Partner Loyalty Investigation">Partner Loyalty Investigation</option>
                <option value="Legal & Court Record Search">Legal & Court Record Search</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 mb-1 block">Brief Case Details (Encrypted)</label>
              <textarea
                rows={4}
                required
                placeholder="Describe your case or background check requirements..."
                value={enquiryForm.details}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, details: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Encrypted Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
