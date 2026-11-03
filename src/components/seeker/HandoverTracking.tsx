import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CallChatModal } from '../common/CallChatModal';
import { LocationShareModal } from '../common/LocationShareModal';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Share2, 
  ShieldAlert, 
  ArrowRight, 
  Lock, 
  Store, 
  Star, 
  ShieldCheck, 
  AlertTriangle,
  XCircle
} from 'lucide-react';

export const HandoverTracking: React.FC = () => {
  const { 
    activeRequest, 
    setActiveScreen, 
    setSosModalOpen, 
    cancelActiveRequest 
  } = useApp();

  const [callChatOpen, setCallChatOpen] = useState(false);
  const [shareLocationOpen, setShareLocationOpen] = useState(false);

  if (!activeRequest) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-sm text-slate-500 mb-4">No active request being tracked.</p>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // 6-step visual timeline
  const timelineSteps = [
    { title: 'Request Created', status: 'completed', time: '1 min ago' },
    { title: 'Provider Accepted', status: 'completed', time: 'Just now' },
    { title: 'Meeting Confirmed', status: 'active', time: 'In progress' },
    { title: 'OTP Verification', status: 'pending', time: 'Next' },
    { title: 'Cash Received', status: 'pending', time: 'Pending' },
    { title: 'Settlement Complete', status: 'pending', time: 'Final' },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
            Live Handover Tracking
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Cash Handover
          </h1>
          <p className="text-xs text-slate-500">
            Transaction ID: <span className="font-mono font-bold text-slate-800">{activeRequest.id}</span>
          </p>
        </div>

        {/* SOS Emergency button */}
        <button
          onClick={() => setSosModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all shadow-xs"
        >
          <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>SOS Emergency</span>
        </button>
      </div>

      {/* 1. VISUAL 6-STEP TIMELINE */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          Handover Status Pipeline
        </h3>

        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {timelineSteps.map((s, idx) => (
            <div key={idx} className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Node icon */}
                <div
                  className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all ${
                    s.status === 'completed'
                      ? 'bg-emerald-600 ring-4 ring-emerald-100'
                      : s.status === 'active'
                      ? 'bg-indigo-600 ring-4 ring-indigo-100 animate-pulse'
                      : 'bg-slate-200 text-slate-400 ring-4 ring-slate-50'
                  }`}
                >
                  {s.status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : s.status === 'active' ? (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  )}
                </div>

                <div>
                  <p
                    className={`text-xs sm:text-sm font-bold ${
                      s.status === 'completed'
                        ? 'text-emerald-950'
                        : s.status === 'active'
                        ? 'text-indigo-900 font-extrabold'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.title}
                  </p>
                  <p className="text-[10px] text-slate-400">{s.time}</p>
                </div>
              </div>

              {s.status === 'active' && (
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                  En Route (5–10 min)
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. PROVIDER & TRANSACTION DETAILS CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
        {/* Provider Profile Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <img
              src={activeRequest.providerAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'}
              alt={activeRequest.providerName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-slate-900">{activeRequest.providerName}</h3>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-700">{activeRequest.providerRating || 4.8} ★</span>
                <span className="text-slate-300">•</span>
                <span>Verified Cash Merchant</span>
              </p>
              <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                Distance: {activeRequest.providerDistance || 0.8} km away
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Cash Amount</span>
            <span className="text-xl font-extrabold text-slate-900">
              ₹{activeRequest.amount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Meeting Point & Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-slate-400 block mb-1">Public Meeting Point</span>
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
              {activeRequest.location}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 pl-5">
              {activeRequest.meetingPoint}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <span className="text-slate-400 block mb-1">Settlement Details</span>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Service Fee:</span>
                <span className="font-semibold text-slate-800">₹{activeRequest.serviceFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Escrow:</span>
                <span className="font-bold text-indigo-600">₹{activeRequest.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Simulated Payment:</span>
                <span className="text-emerald-600 font-semibold">Held Safely</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Action Buttons: Contact Provider, Share Location, SOS */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setCallChatOpen(true)}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-indigo-600" />
            <span>Contact Provider</span>
          </button>

          <button
            onClick={() => setShareLocationOpen(true)}
            className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4 text-indigo-600" />
            <span>Share Location</span>
          </button>
        </div>

        {/* MAIN STEP CTA: Move to OTP Verification */}
        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => setActiveScreen('otp')}
            className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>I Have Met the Provider — Verify OTP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Cancel request option */}
        <div className="text-center pt-1">
          <button
            onClick={cancelActiveRequest}
            className="text-xs text-slate-400 hover:text-rose-600 font-medium transition-colors"
          >
            Cancel this request (No penalty)
          </button>
        </div>
      </div>

      {/* Modals */}
      <CallChatModal
        isOpen={callChatOpen}
        onClose={() => setCallChatOpen(false)}
        providerName={activeRequest.providerName || 'Rahul General Store'}
        providerPhone={activeRequest.providerPhone || '+91 98112 34567'}
      />

      <LocationShareModal
        isOpen={shareLocationOpen}
        onClose={() => setShareLocationOpen(false)}
        meetingPoint={activeRequest.meetingPoint}
        transactionId={activeRequest.id}
      />
    </div>
  );
};
