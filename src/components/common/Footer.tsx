import React, { useState } from 'react';
import { Heart, Send, ShieldCheck, Star, Award, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast({
        type: 'success',
        title: 'Subscribed to Relational Weekly',
        message: 'Thank you! Check your inbox for exclusive coaching guides and discounts.'
      });
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="text-xl font-black text-white">
                  Date<span className="gradient-text">Mentor</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                  Meet Your Friends
                </div>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              DateMentor connects ambitious singles and couples with certified relationship psychologists, dating strategists, and Gottman educators for transformative 1-on-1 coaching.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Join Relational Weekly Newsletter
              </h5>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:border-indigo-500 focus:outline-none flex-1"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg hover:opacity-90 transition-opacity flex items-center gap-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Col 1: Platform */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home Page</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('browse')} className="hover:text-white transition-colors">Browse Coaches</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('pricing')} className="hover:text-white transition-colors">Pricing Plans</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('booking')} className="hover:text-white transition-colors">Book a Session</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('register')} className="hover:text-white transition-colors">Become a Coach</button>
              </li>
            </ul>
          </div>

          {/* Col 2: Dashboards & Roles */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Dashboards</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('user-dashboard')} className="hover:text-white transition-colors">User Dashboard</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('coach-dashboard')} className="hover:text-white transition-colors">Coach Portal</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin-dashboard')} className="hover:text-white transition-colors">Admin Console</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('blog')} className="hover:text-white transition-colors">Articles & Blog</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('help')} className="hover:text-white transition-colors">Help & FAQ</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Auth */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact Support</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('terms')} className="hover:text-white transition-colors">Terms of Service</button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('login')} className="hover:text-white transition-colors">Account Login</button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-400" /> 256-bit Encrypted SSL</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Gottman Certified</span>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-400" /> Top Rated 2026</span>
          </div>

          <p>© {new Date().getFullYear()} DateMentor Inc. All rights reserved. Meet Your Friends Platform.</p>
        </div>
      </div>
    </footer>
  );
};
