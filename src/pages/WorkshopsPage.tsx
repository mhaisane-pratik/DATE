import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, Users, Video, Ticket, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';

export const WorkshopsPage: React.FC = () => {
  const { addToast } = useApp();

  const workshops = [
    {
      id: 'ws-1',
      title: 'Mastering First Dates & Overcoming Dating Burnout',
      speaker: 'Prateek Mhaisane (Founder & Master Coach)',
      speakerAvatar: '/images/prateek_user.png',
      date: 'Sunday, August 2, 2026',
      time: '06:00 PM - 08:00 PM IST',
      price: 1499,
      attendees: 142,
      maxSeats: 200,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
      topics: [
        'How to transition from small talk to deep emotional chemistry',
        'Body language signals & frame control on first dates',
        'Overcoming dating app fatigue & ghosting resilience'
      ]
    },
    {
      id: 'ws-2',
      title: 'Gottman 7 Principles for Long-Term Relationship Harmony',
      speaker: 'Dr. Elena Vance & Prateek Mhaisane',
      speakerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
      date: 'Saturday, August 8, 2026',
      time: '05:00 PM - 07:30 PM IST',
      price: 2499,
      attendees: 98,
      maxSeats: 150,
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
      topics: [
        'The 4 Horsemen of Relationship Breakdown & How to Neutralize Them',
        'Rebuilding Trust After Betrayal or Severe Arguments',
        'Creating Shared Meaning & Intimacy Rituals'
      ]
    }
  ];

  const handleBookTicket = (ws: any) => {
    addToast({
      type: 'success',
      title: `Ticket Reserved for ${ws.title}`,
      message: 'Access link and calendar invite sent to your email!'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
      <Breadcrumb items={[{ label: 'Live Masterclasses & Workshops' }]} />

      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-extrabold uppercase border border-indigo-200 dark:border-indigo-800">
          Live Interactive Masterclasses
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Upcoming Group Coaching Masterclasses</h1>
        <p className="text-xs text-slate-500">Join live interactive video workshops with Founder Prateek Mhaisane and expert guest speakers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {workshops.map((ws) => (
          <div key={ws.id} className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img src={ws.image} alt={ws.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white font-black text-xs">
                  ₹{ws.price.toLocaleString('en-IN')} / Seat
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{ws.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>{ws.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>{ws.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <img src={ws.speakerAvatar} alt={ws.speaker} className="w-10 h-10 rounded-full object-cover object-top ring-2 ring-indigo-500" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{ws.speaker}</div>
                  <div className="text-[10px] text-slate-500">Host & Facilitator</div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">What You Will Learn:</h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  {ws.topics.map((top, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{top}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => handleBookTicket(ws)}
              className="w-full py-3.5 rounded-xl text-xs font-extrabold text-white gradient-bg shadow-lg flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" /> Reserve Live Seat (₹{ws.price.toLocaleString('en-IN')})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
