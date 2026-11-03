import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProviderItem } from '../../types';
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight,
  Sparkles,
  Users
} from 'lucide-react';

export const MatchingScreen: React.FC = () => {
  const { 
    activeRequest, 
    providers, 
    acceptMatchedProvider, 
    cancelActiveRequest,
    setActiveScreen 
  } = useApp();

  const [isSearching, setIsSearching] = useState(true);
  const [matchedProvider, setMatchedProvider] = useState<ProviderItem | null>(null);
  const [showOtherProviders, setShowOtherProviders] = useState(false);

  // Radar simulated scanning delay
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setIsSearching(false);
      // Default match is Rahul General Store (0.8km away)
      const primary = providers.find((p) => p.id === 'prov_rahul') || providers[0];
      setMatchedProvider(primary);
    }, 2400);

    return () => clearTimeout(timer);
  }, [providers]);

  if (!activeRequest) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-sm text-slate-500 mb-4">No active request to match.</p>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {isSearching ? (
        /* RADAR SEARCHING ANIMATION */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl text-center space-y-8 animate-in fade-in duration-300">
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            {/* Ripple rings */}
            <div className="absolute inset-0 rounded-full border border-indigo-400/40 animate-radar" />
            <div className="absolute inset-0 rounded-full border border-violet-400/30 animate-radar-delayed" />
            <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-radar-delayed-2" />

            {/* Center glowing orb */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 z-10 animate-pulse">
              <Search className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
              Broadcasting to Local Node
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Finding a verified provider nearby...
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Scanning vetted cash holders within 1.5 km of {activeRequest.location} for ₹{activeRequest.amount.toLocaleString('en-IN')}.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Only merchants with 100% KYC and verified cash float are contacted.</span>
          </div>

          {/* Quick fast-track button for impatient testers */}
          <button
            onClick={() => setIsSearching(false)}
            className="text-[11px] text-slate-400 hover:text-indigo-600 underline font-medium"
          >
            Skip animation (Fast-track Demo)
          </button>
        </div>
      ) : matchedProvider ? (
        /* PROVIDER FOUND CARD */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Provider Found
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-2">
              Verified Provider Ready for Handover
            </h2>
            <p className="text-xs text-slate-500">
              Review details and accept match to begin live handover tracking.
            </p>
          </div>

          {/* Primary Matched Provider Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 via-purple-50/30 to-slate-50 border-2 border-indigo-200 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <img
                src={matchedProvider.avatar}
                alt={matchedProvider.businessName}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-600/30 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-slate-900 truncate">
                    {matchedProvider.businessName}
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" /> {matchedProvider.distanceKm} km away
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="font-bold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {matchedProvider.rating} ★
                    <span className="text-slate-400 font-normal">({matchedProvider.totalReviews})</span>
                  </span>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-indigo-100/80 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">Available Cash: </span>
                    <strong className="text-emerald-700">₹{matchedProvider.availableCash.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-indigo-700 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>ETA: {matchedProvider.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Handover Meeting Spot */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3 text-xs">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Meeting Point: {activeRequest.location}</p>
              <p className="text-slate-500 mt-0.5">{activeRequest.meetingPoint}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => acceptMatchedProvider(matchedProvider)}
              className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <span>Accept Match & Track Handover</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowOtherProviders(!showOtherProviders)}
              className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{showOtherProviders ? 'Hide Other Providers' : 'View Other Providers'}</span>
            </button>
          </div>

          {/* Other Alternative Providers Drawer/List */}
          {showOtherProviders && (
            <div className="pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Alternative Nearby Providers
              </h4>
              {providers
                .filter((p) => p.id !== matchedProvider.id)
                .map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-indigo-50/50 border border-slate-200 flex items-center justify-between transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{p.businessName}</p>
                      <p className="text-[11px] text-slate-500">{p.distanceKm} km • {p.rating} ★ • ₹{p.availableCash.toLocaleString('en-IN')} cash</p>
                    </div>
                    <button
                      onClick={() => {
                        setMatchedProvider(p);
                        acceptMatchedProvider(p);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 shrink-0"
                    >
                      Select
                    </button>
                  </div>
                ))}
            </div>
          )}

          <div className="text-center pt-2">
            <span className="text-[11px] text-slate-400">
              Fictional demo providers: Rahul General Store, Amit Cash Services, Sharma Traders.
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
