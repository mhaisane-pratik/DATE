import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ForgotPasswordPage: React.FC = () => {
  const { setCurrentPage, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSent(true);
      addToast({
        type: 'success',
        title: 'Reset Link Sent',
        message: 'Password reset link dispatched to your inbox.'
      });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 pb-20 pt-8">
      <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
        <button
          onClick={() => setCurrentPage('login')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
        </button>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Reset Your Password</h1>
          <p className="text-xs text-slate-500">Enter your registered email address to receive a secure recovery link.</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 space-y-2">
            <div className="font-bold text-sm">Check Your Inbox!</div>
            <p>We've sent a password reset link to <strong>{email}</strong>.</p>
            <button
              onClick={() => setCurrentPage('login')}
              className="mt-2 text-indigo-600 font-bold hover:underline"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
