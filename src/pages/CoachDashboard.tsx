import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Calendar,
  Users,
  Star,
  Clock,
  TrendingUp,
  Video,
  CheckCircle2,
  Settings,
  MessageSquare,
  BarChart2,
  CalendarDays,
  Plus
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '../context/AppContext';

const EARNINGS_DATA = [
  { month: 'Jan', revenue: 2400 },
  { month: 'Feb', revenue: 3100 },
  { month: 'Mar', revenue: 2800 },
  { month: 'Apr', revenue: 4200 },
  { month: 'May', revenue: 5100 },
  { month: 'Jun', revenue: 6400 },
  { month: 'Jul', revenue: 7850 }
];

const BOOKINGS_ANALYTICS = [
  { day: 'Mon', calls: 4 },
  { day: 'Tue', calls: 6 },
  { day: 'Wed', calls: 8 },
  { day: 'Thu', calls: 5 },
  { day: 'Fri', calls: 9 },
  { day: 'Sat', calls: 7 },
  { day: 'Sun', calls: 3 }
];

export const CoachDashboard: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'availability' | 'bookings' | 'earnings' | 'messages' | 'reviews'>('overview');
  const [availableSlots, setAvailableSlots] = useState(['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']);
  const [newSlotInput, setNewSlotInput] = useState('');

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSlotInput.trim()) {
      setAvailableSlots([...availableSlots, newSlotInput]);
      setNewSlotInput('');
      addToast({
        type: 'success',
        title: 'Availability Slot Added',
        message: 'New time slot published to your public booking profile.'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Coach Portal</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[10px] uppercase">
              Verified Mentor
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Welcome back, Coach Pratik! Here is your revenue, schedule, and client analytics.
          </p>
        </div>

        <button
          onClick={() => addToast({ type: 'info', title: 'Schedule Updated', message: 'Calendar synced with Google Calendar.' })}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg shadow-md flex items-center gap-2"
        >
          <CalendarDays className="w-4 h-4" />
          Sync Google Calendar
        </button>
      </div>

      {/* Grid: Sidebar vs Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            {[
              { id: 'overview', label: 'Overview & Revenue', icon: TrendingUp },
              { id: 'calendar', label: 'Today\'s Schedule', icon: Calendar },
              { id: 'availability', label: 'Manage Availability', icon: Clock },
              { id: 'bookings', label: 'Bookings & Clients', icon: Users, badge: '184' },
              { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
              { id: 'messages', label: 'Client Messages', icon: MessageSquare, badge: '2' },
              { id: 'reviews', label: 'Reviews & Ratings', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${activeTab === tab.id ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Revenue Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Total Earnings</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">$14,850</div>
                  <span className="text-[10px] text-emerald-500 font-bold">+24% vs last month</span>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Completed Calls</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">184 Sessions</div>
                  <span className="text-[10px] text-indigo-500 font-bold">100% completion</span>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Average Rating</div>
                  <div className="text-2xl font-black text-amber-500">4.98 / 5.0</div>
                  <span className="text-[10px] text-slate-400">142 reviews</span>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Hourly Rate</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">$140/50m</div>
                  <span className="text-[10px] text-purple-500 font-bold">Top tier status</span>
                </div>
              </div>

              {/* Monthly Revenue Chart */}
              <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Monthly Revenue ($ USD)</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={EARNINGS_DATA}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#6366F1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Bookings Chart */}
              <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Weekly Sessions Volume</h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={BOOKINGS_ANALYTICS}>
                      <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                      <Bar dataKey="calls" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AVAILABILITY */}
          {activeTab === 'availability' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Publish Available Slots</h3>

              <form onSubmit={handleAddSlot} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="e.g. 05:30 PM"
                  value={newSlotInput}
                  onChange={(e) => setNewSlotInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Add Slot
                </button>
              </form>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Current Active Slots</h4>
                <div className="flex flex-wrap gap-3">
                  {availableSlots.map((slot, i) => (
                    <span key={i} className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200 dark:border-indigo-900 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" />
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2, 4, 5, 6, 7 Fallback Panel */}
          {activeTab !== 'overview' && activeTab !== 'availability' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">{activeTab} Panel</h3>
              <p className="text-xs text-slate-500">Live synchronization with your DateMentor coach profile.</p>
              <button
                onClick={() => addToast({ type: 'success', title: 'Updated', message: 'Coach settings updated successfully!' })}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white gradient-bg"
              >
                Save Changes
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
