import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Heart,
  Bell,
  CreditCard,
  Settings,
  Video,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Search,
  Send,
  User,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COACHES, MOCK_USER_SESSIONS } from '../data/mockData';
import { CoachCard } from '../components/common/CoachCard';
import { Modal } from '../components/common/Modal';

export const UserDashboard: React.FC = () => {
  const { userSessions, wishlist, setCurrentPage, setSelectedCoachId, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'messages' | 'wishlist' | 'notifications' | 'payments' | 'settings'>('overview');
  
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoSession, setActiveVideoSession] = useState<any>(null);

  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Elena Vance', text: 'Hi Alex! Excited for our session tomorrow. Please complete the quick pre-session goals form.', time: '10:30 AM' },
    { sender: 'You', text: 'Hi Dr. Vance! Will do. Main goal is working on communication boundaries.', time: '10:35 AM' }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim()) {
      setChatMessages([...chatMessages, { sender: 'You', text: messageInput, time: 'Just now' }]);
      setMessageInput('');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'Dr. Elena Vance', text: 'Got it! See you in the video room.', time: 'Just now' }]);
      }, 1000);
    }
  };

  const savedCoaches = MOCK_COACHES.filter(c => wishlist.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">User Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage your upcoming sessions, coach messages, wishlist, and relational progress.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('browse')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-bg shadow-md"
        >
          Book New Session
        </button>
      </div>

      {/* Main Grid: Sidebar vs Active Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'sessions', label: 'My Sessions', icon: Calendar, badge: userSessions.length },
              { id: 'messages', label: 'Messages', icon: MessageSquare, badge: '1' },
              { id: 'wishlist', label: 'Wishlist & Saved', icon: Heart, badge: wishlist.length },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'payments', label: 'Payments & Receipts', icon: CreditCard },
              { id: 'settings', label: 'Account Settings', icon: Settings }
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
              {/* Widgets Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex justify-between items-center text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase">Upcoming Calls</span>
                    <Calendar className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">1 Session</div>
                  <div className="text-[11px] text-emerald-500 font-bold mt-1">Tomorrow @ 02:00 PM</div>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex justify-between items-center text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase">Completed</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">5 Hours</div>
                  <div className="text-[11px] text-slate-500 mt-1">Logged with 2 coaches</div>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="flex justify-between items-center text-slate-500 mb-2">
                    <span className="text-xs font-bold uppercase">Goal Progress</span>
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">85% Achieved</div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 mt-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1.5 rounded-full w-[85%]" />
                  </div>
                </div>
              </div>

              {/* Upcoming Session Highlight Card */}
              <div className="glass-card bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 border border-indigo-500/30 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-500 text-white">
                      Next Upcoming Video Session
                    </span>
                    <h3 className="text-xl font-black">Session with {MOCK_COACHES[0].name}</h3>
                    <p className="text-xs text-indigo-200">
                      Scheduled for Tomorrow, 02:00 PM • Topic: Communication & Attachment Boundaries
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveVideoSession(MOCK_COACHES[0]);
                      setVideoModalOpen(true);
                    }}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg shrink-0 flex items-center gap-2"
                  >
                    <Video className="w-4 h-4 text-indigo-600" />
                    Enter Video Room
                  </button>
                </div>
              </div>

              {/* Recommended Coaches */}
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">Recommended Coaches For You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_COACHES.slice(1, 3).map((coach) => (
                    <CoachCard key={coach.id} coach={coach} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">All Booked Sessions</h3>

              <div className="space-y-3">
                {userSessions.map((sess) => (
                  <div key={sess.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={sess.coachAvatar} alt={sess.coachName} className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sess.coachName}</h4>
                        <p className="text-xs text-slate-500">{sess.date} ({sess.timeSlot})</p>
                        <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 capitalize">{sess.sessionType} Session</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${sess.status === 'upcoming' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-slate-200 text-slate-600'}`}>
                        {sess.status}
                      </span>
                      {sess.status === 'upcoming' && (
                        <button
                          onClick={() => {
                            setActiveVideoSession(sess);
                            setVideoModalOpen(true);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg"
                        >
                          Join Call
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden flex flex-col h-[500px]">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <img src={MOCK_COACHES[0].avatar} alt="Dr. Vance" className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{MOCK_COACHES[0].name}</h4>
                  <span className="text-[10px] text-emerald-500 font-semibold">• Active Now</span>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-900/40">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-xs p-3 rounded-2xl text-xs ${msg.sender === 'You' ? 'gradient-bg text-white rounded-br-none' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border-none focus:outline-none"
                />
                <button type="submit" className="p-2.5 rounded-xl gradient-bg text-white">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Saved Coaches</h3>
              {savedCoaches.length === 0 ? (
                <p className="text-xs text-slate-500">No coaches saved to wishlist yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedCoaches.map((c) => (
                    <CoachCard key={c.id} coach={c} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5, 6, 7: Settings/Payments */}
          {(activeTab === 'notifications' || activeTab === 'payments' || activeTab === 'settings') && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">{activeTab} Details</h3>
              <p>Your user profile and payment preferences are stored securely with DateMentor.</p>
              <button
                onClick={() => addToast({ type: 'success', title: 'Settings Saved', message: 'User settings updated!' })}
                className="px-5 py-2.5 rounded-xl gradient-bg text-white font-bold"
              >
                Save Preferences
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Video Call Modal */}
      <Modal isOpen={videoModalOpen} onClose={() => setVideoModalOpen(false)} title="Encrypted Video Call Room">
        <div className="space-y-4 text-center">
          <div className="h-64 bg-slate-900 rounded-2xl relative flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop"
              alt="Coach Video"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-4 left-4 bg-slate-900/80 px-3 py-1 rounded-lg text-white text-xs font-bold">
              Dr. Elena Vance (HD Video Active)
            </div>
            <div className="absolute bottom-4 right-4 w-24 h-16 bg-slate-800 rounded-lg ring-2 ring-indigo-500 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="You" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300">
              Mute Mic
            </button>
            <button className="p-3 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300">
              Pause Video
            </button>
            <button onClick={() => setVideoModalOpen(false)} className="px-6 py-3 rounded-full bg-rose-600 text-white font-bold text-xs">
              End Call
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
