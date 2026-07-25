import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldAlert,
  Users,
  Award,
  DollarSign,
  Calendar,
  CheckCircle2,
  XCircle,
  FileText,
  Tag,
  HelpCircle,
  TrendingUp,
  Search,
  Plus,
  Trash2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { useApp } from '../context/AppContext';
import { MOCK_COACHES } from '../data/mockData';

const USER_GROWTH_DATA = [
  { month: 'Jan', users: 1200, coaches: 45 },
  { month: 'Feb', users: 2100, coaches: 78 },
  { month: 'Mar', users: 3800, coaches: 110 },
  { month: 'Apr', users: 5400, coaches: 155 },
  { month: 'May', users: 7900, coaches: 190 },
  { month: 'Jun', users: 11200, coaches: 225 },
  { month: 'Jul', users: 15400, coaches: 250 }
];

export const AdminDashboard: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'coaches' | 'sessions' | 'payments' | 'cms' | 'coupons' | 'tickets'>('analytics');
  
  const [coachesList, setCoachesList] = useState(MOCK_COACHES);
  const [coupons, setCoupons] = useState([
    { code: 'SOULMATE20', discount: '20%', uses: 342, status: 'Active' },
    { code: 'LOVE50', discount: '$50 Off', uses: 120, status: 'Active' }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');

  const toggleVerifyCoach = (coachId: string) => {
    setCoachesList(prev =>
      prev.map(c => (c.id === coachId ? { ...c, isVerified: !c.isVerified } : c))
    );
    addToast({
      type: 'info',
      title: 'Verification Status Changed',
      message: `Coach status toggled.`
    });
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCouponCode.trim()) {
      setCoupons([...coupons, { code: newCouponCode.toUpperCase(), discount: '15%', uses: 0, status: 'Active' }]);
      setNewCouponCode('');
      addToast({
        type: 'success',
        title: 'Coupon Created',
        message: 'New promotional coupon activated.'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Admin Console</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[10px] uppercase">
              System Superadmin
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global analytics, coach verification queue, user management, and CMS coupons.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => addToast({ type: 'success', title: 'System Healthy', message: 'All database and video servers operating at 99.99% uptime.' })}
            className="px-4 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900"
          >
            System Status: 100% Healthy
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
            {[
              { id: 'analytics', label: 'Platform Analytics', icon: TrendingUp },
              { id: 'coaches', label: 'Coaches Verification', icon: Award, badge: '2 Pending' },
              { id: 'users', label: 'Users Management', icon: Users, badge: '15.4k' },
              { id: 'sessions', label: 'Global Sessions', icon: Calendar },
              { id: 'payments', label: 'Payouts & Revenue', icon: DollarSign },
              { id: 'coupons', label: 'Coupons & CMS', icon: Tag },
              { id: 'tickets', label: 'Support Tickets', icon: HelpCircle, badge: '3' }
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
          {/* TAB 1: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Gross Marketplace GMV</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">₹4,825,000</div>
                  <span className="text-[10px] text-emerald-500 font-bold">+31% YOY Growth</span>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Total Active Users</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">15,420</div>
                  <span className="text-[10px] text-indigo-500 font-bold">98% retention</span>
                </div>

                <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">Total Vetted Coaches</div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">250 Coaches</div>
                  <span className="text-[10px] text-purple-500 font-bold">12 pending review</span>
                </div>
              </div>

              {/* User Growth Chart */}
              <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Platform User Growth Trajectory</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={USER_GROWTH_DATA}>
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
                      <Line type="monotone" dataKey="users" stroke="#6366F1" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="coaches" stroke="#EC4899" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COACHES VERIFICATION */}
          {activeTab === 'coaches' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Coach Verification & Moderation</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    <tr>
                      <th className="pb-3">Coach Name</th>
                      <th className="pb-3">Specialty</th>
                      <th className="pb-3">Hourly Rate</th>
                      <th className="pb-3">Verification</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {coachesList.map((coach) => (
                      <tr key={coach.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                        <td className="py-3 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <img src={coach.avatar} alt={coach.name} className="w-8 h-8 rounded-full object-cover" />
                          <span>{coach.name}</span>
                        </td>
                        <td className="py-3 text-slate-500">{coach.title}</td>
                        <td className="py-3 font-bold">₹{coach.hourlyRate.toLocaleString('en-IN')}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${coach.isVerified ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' : 'bg-amber-100 text-amber-700'}`}>
                            {coach.isVerified ? 'Verified' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => toggleVerifyCoach(coach.id)}
                            className="px-3 py-1 rounded-lg text-[10px] font-bold text-white gradient-bg"
                          >
                            Toggle Verification
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Coupon & Promo Code Manager</h3>

              <form onSubmit={handleAddCoupon} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="New code (e.g. SUMMER30)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="flex-1 px-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase font-bold text-slate-900 dark:text-white"
                />
                <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg flex items-center gap-1">
                  <Plus className="w-4 h-4" /> Create Coupon
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coupons.map((cp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">{cp.code}</div>
                      <div className="text-xs text-slate-500">{cp.discount} • {cp.uses} Redemptions</div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px] uppercase">
                      {cp.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3, 4, 5, 7 Fallback */}
          {activeTab !== 'analytics' && activeTab !== 'coaches' && activeTab !== 'coupons' && (
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white capitalize">{activeTab} Console</h3>
              <p className="text-xs text-slate-500">Administrative tools active and running.</p>
              <button
                onClick={() => addToast({ type: 'info', title: 'Action Executed', message: 'Admin audit log saved.' })}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white gradient-bg"
              >
                Execute Action
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
