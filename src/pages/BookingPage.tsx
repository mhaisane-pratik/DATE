import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageSquare,
  CreditCard,
  Tag,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { BookingSession } from '../types';

export const BookingPage: React.FC = () => {
  const { bookingDraft, updateBookingDraft, setCurrentPage, addUserSession, addToast } = useApp();
  const coach = bookingDraft.coach;

  const [step, setStep] = useState<1 | 2>(1);
  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!coach) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">No Coach Selected</h2>
        <button onClick={() => setCurrentPage('browse')} className="mt-4 px-4 py-2 gradient-bg text-white font-bold rounded-xl">
          Browse Coaches
        </button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'SOULMATE20') {
      const discount = Math.round(bookingDraft.price * 0.2);
      setDiscountAmount(discount);
      setCouponApplied(true);
      addToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: 'SOULMATE20 coupon applied successfully! 20% discount granted.'
      });
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Coupon',
        message: 'Use coupon code SOULMATE20 for 20% off.'
      });
    }
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Add to user sessions
      const newSession: BookingSession = {
        id: `sess-${Date.now().toString().slice(-4)}`,
        coachId: coach.id,
        coachName: coach.name,
        coachAvatar: coach.avatar,
        coachTitle: coach.title,
        date: bookingDraft.selectedDate,
        timeSlot: bookingDraft.selectedSlot,
        sessionType: bookingDraft.sessionType,
        durationMinutes: bookingDraft.durationMinutes,
        price: bookingDraft.price,
        discount: discountAmount,
        totalPrice: bookingDraft.price - discountAmount,
        status: 'upcoming',
        meetingLink: `https://meet.datementor.com/room-${coach.id}`
      };
      addUserSession(newSession);

      addToast({
        type: 'success',
        title: 'Booking Confirmed!',
        message: 'Your coaching session has been successfully booked.'
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Breadcrumb items={[{ label: 'Browse Coaches', page: 'browse' }, { label: 'Checkout & Booking' }]} />

      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          {isConfirmed ? 'Booking Confirmed! 🎉' : 'Complete Your Booking'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isConfirmed
            ? 'Your calendar invite has been dispatched. Review your room details below.'
            : 'Confirm your session schedule and payment details below.'}
        </p>
      </div>

      {isConfirmed ? (
        /* Confirmed Receipt Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card bg-white dark:bg-slate-800/90 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Session Scheduled</span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              1-on-1 Session with {coach.name}
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300 pt-2">
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-indigo-500" /> {bookingDraft.selectedDate}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-purple-500" /> {bookingDraft.selectedSlot}</span>
              <span className="flex items-center gap-1 capitalize"><Video className="w-4 h-4 text-pink-500" /> {bookingDraft.sessionType} Call</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between text-slate-500">
              <span className="text-slate-500">Base Session Fee</span>
              <span>₹{bookingDraft.price.toLocaleString('en-IN')}</span>
            </div>

            {couponApplied && (
              <div className="flex justify-between text-xs text-emerald-500 font-bold">
                <span>Coupon (SOULMATE20 - 20% Off)</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
              <span>Total Amount</span>
              <span>₹{(bookingDraft.price - discountAmount).toLocaleString('en-IN')} INR</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setCurrentPage('user-dashboard')}
              className="px-8 py-3 rounded-xl text-xs font-bold text-white gradient-bg shadow-lg hover:opacity-95"
            >
              Go to User Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('browse')}
              className="px-8 py-3 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700"
            >
              Browse More Coaches
            </button>
          </div>
        </motion.div>
      ) : (
        /* Booking Step Wizard */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Summary Card */}
          <div className="md:col-span-5 space-y-6">
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Selected Coach</h3>
              
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <img src={coach.avatar} alt={coach.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{coach.name}</h4>
                  <p className="text-xs text-slate-500">{coach.title}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-500" /> Date</span>
                  <span className="font-bold text-slate-900 dark:text-white">{bookingDraft.selectedDate}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-indigo-500" /> Time Slot</span>
                  <span className="font-bold text-slate-900 dark:text-white">{bookingDraft.selectedSlot}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5 capitalize"><Video className="w-4 h-4 text-indigo-500" /> Format</span>
                  <span className="font-bold text-slate-900 dark:text-white capitalize">{bookingDraft.sessionType}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>50-min Session</span>
                  <span>${bookingDraft.price}.00</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount (20%)</span>
                    <span>-${discountAmount}.00</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-slate-900 dark:text-white text-base pt-2">
                  <span>Total Due</span>
                  <span>${bookingDraft.price - discountAmount}.00 USD</span>
                </div>
              </div>
            </div>

            {/* Coupon Code Box */}
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 block flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-indigo-500" /> Promo Code
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try SOULMATE20"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white uppercase font-bold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="md:col-span-7">
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-indigo-500" /> Secure Payment & Confirmation
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    defaultValue="alex.user@datementor.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Card Number</label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 4242"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="09 / 28"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">CVC / CVV</label>
                    <input
                      type="text"
                      defaultValue="888"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-center"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2">
                <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>256-bit SSL encrypted transaction. 100% money back guarantee.</span>
              </div>

              <button
                onClick={handleCompletePayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl text-sm font-extrabold text-white gradient-bg shadow-xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? 'Processing Payment...' : `Pay ₹${(bookingDraft.price - discountAmount).toLocaleString('en-IN')} & Confirm Booking`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
