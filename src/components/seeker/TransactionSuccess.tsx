import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RatingModal } from '../common/RatingModal';
import confetti from 'canvas-confetti';
import { 
  CheckCircle, 
  Star, 
  Receipt, 
  ArrowRight, 
  Home, 
  Download, 
  ShieldCheck, 
  MapPin,
  Clock
} from 'lucide-react';

export const TransactionSuccess: React.FC = () => {
  const { 
    activeRequest, 
    setActiveScreen, 
    submitRating, 
    transactions 
  } = useApp();

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  const latestTx = transactions[0];
  const displayAmount = activeRequest?.amount || latestTx?.amount || 5000;
  const displayFee = activeRequest?.serviceFee || latestTx?.fee || 100;
  const displayId = activeRequest?.id || latestTx?.id || 'AC-2026-9281';
  const displayProvider = activeRequest?.providerName || latestTx?.providerName || 'Rahul General Store';

  const handleRatingSubmit = (rating: number, review?: string) => {
    submitRating(rating, review);
    setHasRated(true);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
        {/* Large Success Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-emerald-400/25 blur-xl animate-pulse" />
          <div className="relative w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30">
            <CheckCircle className="w-11 h-11" />
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Settlement Successful
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Cash received successfully
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Handover completed and simulated escrow settled.
          </p>
        </div>

        {/* Big Amount Badge */}
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Total Cash Handover Received
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold text-slate-900">
            ₹{displayAmount.toLocaleString('en-IN')}
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
            ✓ Physical Currency Verified
          </span>
        </div>

        {/* Breakdown Card */}
        <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200/80 text-xs space-y-3 text-left">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
            <span className="text-slate-500">Cash:</span>
            <span className="font-bold text-slate-900">₹{displayAmount.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
            <span className="text-slate-500">Service Fee:</span>
            <span className="font-semibold text-indigo-600">₹{displayFee.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
            <span className="text-slate-500">Transaction ID:</span>
            <span className="font-mono font-bold text-slate-800">{displayId}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500">Provider:</span>
            <span className="font-bold text-slate-900">{displayProvider}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {!hasRated ? (
            <button
              onClick={() => setRatingModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md shadow-amber-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 fill-white" />
              <span>Rate Provider ({displayProvider})</span>
            </button>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Thank you for rating your provider!</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveScreen('transactions')}
              className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Receipt className="w-4 h-4 text-indigo-600" />
              <span>View Transaction</span>
            </button>

            <button
              onClick={() => setActiveScreen('dashboard')}
              className="py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-indigo-600/20"
            >
              <Home className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={ratingModalOpen}
        onClose={() => setRatingModalOpen(false)}
        onSubmit={handleRatingSubmit}
        providerName={displayProvider}
      />
    </div>
  );
};
