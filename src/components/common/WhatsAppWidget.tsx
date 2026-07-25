import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, PhoneCall, Sparkles } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(quickMsg || 'Hi Coach Prateek Mhaisane! I would like to enquire about 1-on-1 dating coaching and background verification.');
    window.open(`https://wa.me/919737372183?text=${text}`, '_blank');
    setIsOpen(false);
    setQuickMsg('');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-card bg-slate-900 text-white rounded-3xl p-5 border border-emerald-500/40 shadow-2xl w-80 mb-3 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src="/images/prateek_user.png" alt="Prateek Mhaisane" className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-emerald-500" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Prateek Mhaisane</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">• Online on WhatsApp</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-2xl text-xs text-slate-300 space-y-1">
              <p className="font-semibold text-white">Need instant dating guidance or background check enquiry?</p>
              <p className="text-[10px] text-slate-400">Direct WhatsApp line to Founder Prateek Mhaisane (+91 9737372183).</p>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={quickMsg}
                onChange={(e) => setQuickMsg(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" /> Start WhatsApp Chat
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-2xl shadow-emerald-500/40 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp (+91 9737372183)</span>
      </button>
    </div>
  );
};
