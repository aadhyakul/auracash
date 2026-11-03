import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Check, 
  X, 
  MapPin, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  User, 
  Info,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

export const ProviderRequests: React.FC = () => {
  const { 
    incomingRequests, 
    providerAcceptRequest, 
    providerDeclineRequest, 
    setActiveScreen,
    providerSettings 
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('provider_dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
          {incomingRequests.length} Live Requests Nearby
        </span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Incoming Cash Requests
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Cash seekers in your immediate zone waiting for handover confirmation.
        </p>
      </div>

      {/* Illustrative fee split disclaimer card */}
      <div className="bg-indigo-50 border border-indigo-200/80 rounded-2xl p-4 text-xs text-indigo-950 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-indigo-900">
            Illustrative prototype fee split (70/30 Model):
          </p>
          <p className="text-indigo-800/80 text-[11px] mt-0.5">
            You receive 70% of the total service fee immediately upon OTP confirmation. AuraCash retains 30% to cover safety infrastructure, platform escrow, and insurance.
          </p>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {incomingRequests.length > 0 ? (
          incomingRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-5"
            >
              {/* Top Details & Amount */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                      {req.id}
                    </span>
                    <span className="text-xs text-slate-400">• {req.createdAt}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    {req.seekerName}
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ KYC Verified
                    </span>
                  </h3>

                  <p className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span><strong>{req.location}</strong> — {req.meetingPoint}</span>
                  </p>

                  {req.notes && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
                      "{req.notes}"
                    </p>
                  )}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-right sm:min-w-44">
                  <span className="text-xs text-slate-400 block mb-0.5">Cash Requested</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ₹{req.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[11px] text-slate-500 mt-1">
                    Distance: <strong>0.8 km</strong>
                  </span>
                </div>
              </div>

              {/* Fee Breakdown: 70/30 Split Card */}
              <div className="p-4 bg-violet-50/60 border border-violet-100 rounded-2xl grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Service Fee</span>
                  <span className="font-bold text-slate-900 text-sm">₹{req.serviceFee}</span>
                </div>
                <div className="border-x border-violet-200/60">
                  <span className="text-violet-700 font-semibold block text-[11px]">Your Earning (70%)</span>
                  <span className="font-extrabold text-emerald-600 text-base">₹{req.providerEarning}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">AuraCash (30%)</span>
                  <span className="font-semibold text-slate-700 text-sm">₹{req.platformFee}</span>
                </div>
              </div>

              {/* Action Buttons: Accept / Decline */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => providerDeclineRequest(req.id)}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                  <span>Decline</span>
                </button>

                <button
                  onClick={() => providerAcceptRequest(req.id)}
                  className="py-3 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-violet-600/20 hover:scale-[1.01]"
                >
                  <Check className="w-4 h-4" />
                  <span>Accept Cash Handover</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-slate-200/90 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">All requests handled</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You're currently all caught up. Keep your availability set to 🟢 Available to receive new alerts as students request cash.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
