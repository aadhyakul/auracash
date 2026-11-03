import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  Sliders, 
  Save, 
  Clock, 
  Wallet, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const ProviderSettings: React.FC = () => {
  const { providerSettings, updateProviderSettings, setActiveScreen } = useApp();

  const [isAvailable, setIsAvailable] = useState(providerSettings.isAvailable);
  const [maxCash, setMaxCash] = useState(providerSettings.maxCashAvailable);
  const [minRequest, setMinRequest] = useState(providerSettings.minRequestAmount);
  const [startTime, setStartTime] = useState(providerSettings.preferredStartTime);
  const [endTime, setEndTime] = useState(providerSettings.preferredEndTime);
  const [denominations, setDenominations] = useState(providerSettings.denominations);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProviderSettings({
      isAvailable,
      maxCashAvailable: maxCash,
      minRequestAmount: minRequest,
      preferredStartTime: startTime,
      preferredEndTime: endTime,
      denominations,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveScreen('provider_dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-semibold text-slate-400">
          Partner Preferences
        </span>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Provider Availability & Cash Limits
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize your operating float, preferred hours, and denominations.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Availability Toggle */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Current Availability</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Turn off if your shop is temporarily closed or float is depleted.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
              isAvailable ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                isAvailable ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Cash Limits Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-violet-600" />
            <span>Cash Float Thresholds</span>
          </h3>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
              <span>Maximum Cash Float Available</span>
              <span className="text-violet-700 text-sm font-extrabold">₹{maxCash.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={2000}
              max={50000}
              step={1000}
              value={maxCash}
              onChange={(e) => setMaxCash(Number(e.target.value))}
              className="w-full accent-violet-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Requests above this amount will not be routed to you.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Minimum Request Size
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-500">₹</span>
              <input
                type="number"
                min={200}
                max={2000}
                step={100}
                value={minRequest}
                onChange={(e) => setMinRequest(Number(e.target.value))}
                className="w-40 text-xs p-2.5 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-600" />
            <span>Preferred Business Hours</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Denominations ready */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Banknote className="w-4 h-4 text-violet-600" />
            <span>Ready Banknote Denominations</span>
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'notes500', label: '₹500 Notes' },
              { key: 'notes200', label: '₹200 Notes' },
              { key: 'notes100', label: '₹100 Notes' },
            ].map((denom) => (
              <label
                key={denom.key}
                className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-semibold text-slate-800 hover:bg-slate-100"
              >
                <input
                  type="checkbox"
                  checked={denominations[denom.key as keyof typeof denominations]}
                  onChange={(e) =>
                    setDenominations({
                      ...denominations,
                      [denom.key]: e.target.checked,
                    })
                  }
                  className="rounded text-violet-600 focus:ring-violet-500 accent-violet-600"
                />
                <span>{denom.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className="w-full py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-extrabold text-sm shadow-md shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Operating Preferences</span>
        </button>
      </form>
    </div>
  );
};
