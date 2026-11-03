import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  MapPin, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Star
} from 'lucide-react';

export const SeekerDashboard: React.FC = () => {
  const { 
    currentUser, 
    activeRequest, 
    setActiveScreen, 
    providers, 
    transactions,
    setSosModalOpen
  } = useApp();

  const availableProvidersCount = providers.filter((p) => p.isAvailable).length;
  const recentTransactions = transactions.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP GREETING & STATUS BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
              Cash Seeker Dashboard
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Member
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good afternoon, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>Campus Location: <strong>GLA University Main Gate & Vicinity</strong></span>
          </p>
        </div>

        {/* Primary CTA button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveScreen('request_flow')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>Request Cash Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. ACTIVE REQUEST ALERT (IF ANY) */}
      {activeRequest && activeRequest.status !== 'completed' && activeRequest.status !== 'cancelled' && (
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Active Cash Request • {activeRequest.id}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold">
                ₹{activeRequest.amount.toLocaleString('en-IN')}
              </h3>
              <p className="text-xs text-indigo-200">
                Status: <strong className="text-white capitalize">{activeRequest.status.replace('_', ' ')}</strong> • Spot: {activeRequest.meetingPoint}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (activeRequest.status === 'matching') setActiveScreen('matching');
                  else if (activeRequest.status === 'otp_pending') setActiveScreen('otp');
                  else setActiveScreen('tracking');
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Track Handover</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Active Request */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Request</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {activeRequest && activeRequest.status !== 'completed' && activeRequest.status !== 'cancelled'
              ? `₹${activeRequest.amount.toLocaleString('en-IN')}`
              : 'None'}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Status:{' '}
            <span className="text-indigo-600 font-semibold">
              {activeRequest && activeRequest.status !== 'completed' && activeRequest.status !== 'cancelled'
                ? activeRequest.status === 'matching' ? 'Finding Provider' : 'In Progress'
                : 'Ready for new request'}
            </span>
          </p>
        </div>

        {/* Card 2: Nearby Providers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nearby Providers</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {availableProvidersCount} available
          </p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Within <span className="text-emerald-600 font-semibold">&lt; 1.5 km radius</span>
          </p>
        </div>

        {/* Card 3: Completed Transactions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Transactions</span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            {currentUser.completedTransactionsCount}
          </p>
          <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 100% Handover Success
          </p>
        </div>

        {/* Card 4: Trust Score */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trust Score</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-extrabold text-slate-900">{currentUser.trustScore}</p>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
              Tier-2 Limit
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Max limit unlocked: <strong className="text-slate-800">₹1,00,000</strong>
          </p>
        </div>
      </div>

      {/* 4. MAIN PROMO CTA CARD */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Cash Delivery</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need cash?
          </h2>
          <p className="text-sm text-indigo-100 max-w-lg">
            Find a verified cash provider near you. Meet safely at public spots, verify the notes, and settle via OTP.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('request_flow')}
          className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-extrabold text-sm hover:bg-indigo-50 shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0"
        >
          Request Cash
        </button>
      </div>

      {/* 5. LIVE RADAR / NEARBY PROVIDERS LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Nearby Verified Providers (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Nearby Cash Providers</h3>
              <p className="text-xs text-slate-500">Verified merchants ready for handover</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ● Active Radar
            </span>
          </div>

          <div className="space-y-3.5">
            {providers.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/40 border border-slate-200/80 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={p.avatar}
                    alt={p.businessName}
                    className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {p.businessName}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    </div>
                    <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{p.address} ({p.distanceKm} km)</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-amber-500 flex items-center">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> {p.rating}
                      </span>
                      <span className="text-[11px] text-slate-400">•</span>
                      <span className="text-[11px] font-semibold text-emerald-600">
                        ₹{p.availableCash.toLocaleString('en-IN')} available
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveScreen('request_flow')}
                  className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-xs border border-indigo-200 shadow-xs transition-colors shrink-0 ml-2"
                >
                  Request
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Table (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
              <button
                onClick={() => setActiveScreen('transactions')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  onClick={() => setActiveScreen('transactions')}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-800">{tx.providerName}</span>
                    <span className="text-xs font-extrabold text-slate-900">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{tx.date} • {tx.time}</span>
                    <span className={`font-semibold ${
                      tx.status === 'Completed' ? 'text-emerald-600' : 'text-slate-400'
                    }`}>
                      ✓ {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 flex items-center justify-between">
            <div>
              <p className="font-bold">Need assistance?</p>
              <p className="text-[11px] text-indigo-800">24/7 Safety & Dispute Hotline</p>
            </div>
            <button
              onClick={() => setActiveScreen('support')}
              className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 font-bold text-xs shadow-xs hover:bg-indigo-100"
            >
              Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
