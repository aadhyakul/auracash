import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  TrendingUp, 
  CheckCircle2, 
  Star, 
  Wallet, 
  ArrowRight, 
  Clock, 
  Sliders, 
  Users, 
  MapPin,
  Bell
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const { 
    currentUser, 
    providerSettings, 
    updateProviderSettings, 
    setActiveScreen, 
    incomingRequests,
    transactions
  } = useApp();

  const handleToggleAvailability = () => {
    updateProviderSettings({ isAvailable: !providerSettings.isAvailable });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. TOP GREETING & AVAILABILITY TOGGLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-full border border-violet-200/60">
              Cash Provider Partner
            </span>
            <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Merchant Verified
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good afternoon, {currentUser.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Storefront: <strong className="text-slate-800">Rahul General Store</strong> • GLA University Main Gate
          </p>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center gap-4 bg-slate-50 p-2.5 rounded-2xl border border-slate-200/80">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-900">
              {providerSettings.isAvailable ? '🟢 Available' : '🔴 Offline'}
            </p>
            <p className="text-[10px] text-slate-500">
              {providerSettings.isAvailable ? 'Receiving local requests' : 'Requests paused'}
            </p>
          </div>
          <button
            onClick={handleToggleAvailability}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              providerSettings.isAvailable ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                providerSettings.isAvailable ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Today's Earnings */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Earnings</span>
            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">₹420</p>
          <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +₹140 vs yesterday
          </p>
        </div>

        {/* Successful Handovers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Successful Handovers</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">6</p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Total lifetime: <strong className="text-slate-800">32</strong>
          </p>
        </div>

        {/* Available Cash */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Cash</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900">
            ₹{providerSettings.maxCashAvailable.toLocaleString('en-IN')}
          </p>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Limit set by store
          </p>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rating</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Star className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <p className="text-2xl font-extrabold text-slate-900">4.8 ★</p>
            <span className="text-xs text-slate-500 font-medium">(48 reviews)</span>
          </div>
          <p className="text-xs font-medium text-emerald-600 mt-1">
            Top Rated Merchant Badge
          </p>
        </div>
      </div>

      {/* 3. MAIN ACTION BANNER */}
      <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
            <Bell className="w-3.5 h-3.5" />
            <span>{incomingRequests.length} Pending Cash Requests</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to fulfill cash requests?
          </h2>
          <p className="text-sm text-violet-100 max-w-lg">
            Review incoming requests from students and locals nearby. Earn 70% of the service fee per successful handover.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('provider_requests')}
          className="px-8 py-4 rounded-2xl bg-white text-violet-950 font-extrabold text-sm hover:bg-violet-50 shadow-lg transition-transform hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2"
        >
          <span>View Cash Requests</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4. INCOMING REQUESTS PREVIEW & RECENT EARNINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Incoming Requests Queue (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Incoming Cash Requests</h3>
              <p className="text-xs text-slate-500">Live requests matching your cash float</p>
            </div>
            <button
              onClick={() => setActiveScreen('provider_requests')}
              className="text-xs font-bold text-violet-600 hover:text-violet-800"
            >
              See All ({incomingRequests.length})
            </button>
          </div>

          {incomingRequests.length > 0 ? (
            <div className="space-y-4">
              {incomingRequests.slice(0, 2).map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-violet-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                        {req.createdAt}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 mt-1">{req.seekerName}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-violet-600" />
                        <span>{req.location} • {req.meetingPoint}</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Cash Needed</span>
                      <span className="text-xl font-extrabold text-slate-900">
                        ₹{req.amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500">Your Earning: </span>
                      <strong className="text-emerald-600 font-extrabold text-sm">₹{req.providerEarning}</strong>
                      <span className="text-[10px] text-slate-400 ml-1">(70% split)</span>
                    </div>

                    <button
                      onClick={() => setActiveScreen('provider_requests')}
                      className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs shadow-xs"
                    >
                      Review & Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-xs">
              No pending cash requests in your immediate area right now.
            </div>
          )}
        </div>

        {/* Quick Settings & Hours (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Operating Preferences</h3>
              <button
                onClick={() => setActiveScreen('provider_settings')}
                className="text-xs font-semibold text-violet-600 hover:text-violet-800 flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-600">Operating Hours</span>
                <span className="font-bold text-slate-900">{providerSettings.preferredStartTime} – {providerSettings.preferredEndTime}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-600">Max Cash per Request</span>
                <span className="font-bold text-slate-900">₹{providerSettings.maxCashAvailable.toLocaleString('en-IN')}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between items-center">
                <span className="text-slate-600">Available Denominations</span>
                <span className="font-bold text-emerald-700">₹500, ₹200, ₹100 Notes</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800">Earnings Dashboard</p>
              <p className="text-[11px] text-slate-400">View payout history & charts</p>
            </div>
            <button
              onClick={() => setActiveScreen('provider_earnings')}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
            >
              Earnings →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
