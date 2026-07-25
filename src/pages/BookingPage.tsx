import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  ShieldCheck,
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Smartphone,
  QrCode,
  KeyRound,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_COACHES } from '../data/mockData';
import { Breadcrumb } from '../components/common/Breadcrumb';
import confetti from 'canvas-confetti';

export const BookingPage: React.FC = () => {
  const { selectedCoachId, bookingDraft, setCurrentPage, addToast } = useApp();
  const coach = MOCK_COACHES.find(c => c.id === selectedCoachId) || MOCK_COACHES[0];

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiProvider, setUpiProvider] = useState<'gpay' | 'phonepe' | 'paytm'>('gpay');
  const [upiId, setUpiId] = useState('9737372183@ybl');

  // Form Fields
  const [fullName, setFullName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.user@datementor.com');
  const [phone, setPhone] = useState('+91 9737372183');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('09/28');
  const [cvc, setCvc] = useState('888');

  // Coupon
  const [couponCode, setCouponCode] = useState('SOULMATE20');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpInput, setOtpInput] = useState('123456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const basePrice = bookingDraft.price || coach.hourlyRate || 4999;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SOULMATE20') {
      const discount = Math.round(basePrice * 0.2);
      setDiscountAmount(discount);
      setCouponApplied(true);
      addToast({
        type: 'success',
        title: 'Coupon SOULMATE20 Applied!',
        message: 'You saved 20% on this session!'
      });
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Coupon Code',
        message: 'Please try code SOULMATE20 for 20% discount.'
      });
    }
  };

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOtpModal(true);
  };

  const handleVerifyOtpAndComplete = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOtpModal(false);
      setIsCompleted(true);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      addToast({
        type: 'success',
        title: 'Payment Successful! 🎉',
        message: `Session booked with ${coach.name}. Meeting room link generated.`
      });
    }, 1200);
  };

  const finalTotal = Math.max(0, basePrice - discountAmount);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
      <Breadcrumb items={[{ label: 'Browse Coaches', page: 'browse' }, { label: 'Secure Booking Checkout' }]} />

      {!isCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Selected Mentor</span>

              <div className="flex items-center gap-4">
                <img
                  src={coach.avatar}
                  alt={coach.name}
                  className="w-16 h-16 rounded-2xl object-cover object-top ring-2 ring-indigo-500 shadow-md"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{coach.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{coach.title}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-extrabold mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Vetted Specialist
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    <span>Date</span>
                  </div>
                  <span className="font-bold text-white">{bookingDraft.selectedDate || 'Today, 02:00 PM'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>Time Slot</span>
                  </div>
                  <span className="font-bold text-white">{bookingDraft.selectedSlot || '02:00 PM IST'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Video className="w-4 h-4 text-rose-400" />
                    <span>Format</span>
                  </div>
                  <span className="font-bold text-white capitalize">{bookingDraft.sessionType || 'Video Call'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>50-min Session Rate</span>
                  <span>₹{basePrice.toLocaleString('en-IN')}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>Discount (SOULMATE20 - 20% Off)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-lg font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount Due</span>
                  <span className="text-emerald-400">₹{finalTotal.toLocaleString('en-IN')} INR</span>
                </div>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="glass-card bg-white dark:bg-slate-800/90 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-md">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try SOULMATE20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase font-bold text-slate-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-extrabold text-xs hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Payment Gateways (Google Pay / PhonePe / Card) */}
          <div className="lg:col-span-7">
            <div className="glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">Secure Payment & Checkout</h2>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  256-bit Encrypted
                </span>
              </div>

              {/* Payment Method Switcher (UPI / Card) */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span>Google Pay / PhonePe / UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-500" />
                  <span>Credit / Debit Card</span>
                </button>
              </div>

              <form onSubmit={handleInitiatePayment} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Email & WhatsApp (+91 9737372183)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                {/* UPI OPTIONS TAB */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 p-4 rounded-2xl bg-indigo-50/50 dark:bg-slate-900/60 border border-indigo-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      {(['gpay', 'phonepe', 'paytm'] as const).map((prov) => (
                        <button
                          key={prov}
                          type="button"
                          onClick={() => setUpiProvider(prov)}
                          className={`flex-1 py-2 px-3 rounded-xl font-extrabold uppercase text-[11px] border transition-all ${
                            upiProvider === prov
                              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {prov === 'gpay' ? 'Google Pay 🔵' : prov === 'phonepe' ? 'PhonePe 🟣' : 'Paytm 🔷'}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Enter UPI ID / VPA</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 9737372183@ybl or username@okicici"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                      />
                    </div>
                  </div>
                )}

                {/* CARD OPTIONS TAB */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">CVC / CVV</label>
                        <input
                          type="password"
                          required
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl text-xs font-black text-white gradient-bg shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay ₹{finalTotal.toLocaleString('en-IN')} & Verify OTP</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* CONFIRMATION SUCCESS VIEW */
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto glass-card bg-white dark:bg-slate-800/95 rounded-3xl p-8 sm:p-12 border border-emerald-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-500">Booking & Payment Verified</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">Your Session is Confirmed!</h1>
            <p className="text-xs text-slate-500">
              A calendar invite and encrypted 256-bit video link have been sent to <strong>{email}</strong> and WhatsApp (+91 9737372183).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between text-slate-500">
              <span>Assigned Mentor</span>
              <span className="font-bold text-slate-900 dark:text-white">{coach.name}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Date & Time</span>
              <span className="font-bold text-slate-900 dark:text-white">{bookingDraft.selectedDate || 'Today, 02:00 PM'} ({bookingDraft.selectedSlot || '02:00 PM IST'})</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Total Paid</span>
              <span className="font-bold text-emerald-500">₹{finalTotal.toLocaleString('en-IN')} INR</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-2">
            <button
              onClick={() => setCurrentPage('user-dashboard')}
              className="px-8 py-3.5 rounded-xl text-xs font-black text-white gradient-bg shadow-xl"
            >
              Go to My Dashboard & Join Call
            </button>
          </div>
        </motion.div>
      )}

      {/* SIMULATED OTP VERIFICATION MODAL */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="glass-card bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/40 shadow-2xl max-w-sm w-full space-y-6 relative">
              <button onClick={() => setShowOtpModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">Enter 6-Digit Payment OTP</h3>
                <p className="text-xs text-slate-400">
                  Sent to mobile linked to Google Pay / PhonePe (+91 9737372183).
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase text-indigo-400 mb-1 block text-center">Demo OTP (Pre-filled: 123456)</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full text-center text-2xl font-mono tracking-widest py-3 rounded-2xl bg-slate-800 border border-indigo-500 text-white focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleVerifyOtpAndComplete}
                  className="w-full py-4 rounded-2xl text-xs font-black text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-xl flex items-center justify-center gap-2"
                >
                  {isProcessing ? 'Verifying OTP & Securing Booking...' : 'Submit OTP & Complete Payment (₹' + finalTotal.toLocaleString('en-IN') + ')'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
