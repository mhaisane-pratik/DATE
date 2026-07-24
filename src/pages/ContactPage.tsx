import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquareHeart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Message Sent!',
      message: 'Thank you for reaching out. Our support team will reply within 2 hours.'
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Get in Touch with DateMentor</h1>
        <p className="text-xs text-slate-500">Have questions about booking, coach onboarding, or custom enterprise plans?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Contact Information</h3>
            
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <Mail className="w-4 h-4 text-indigo-500" />
              <span>prateek@datementor.com</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 text-indigo-500" />
              <span>+91 9737372183 (Direct Call & WhatsApp)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
              <MapPin className="w-4 h-4 text-indigo-500" />
              <span>Prateek Mhaisane HQ / Online Worldwide</span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Your Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>

            <button type="submit" className="w-full py-3 rounded-xl text-xs font-bold text-white gradient-bg flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
