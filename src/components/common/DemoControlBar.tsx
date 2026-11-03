import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, RotateCcw, ShieldCheck, Store, UserCheck, AlertTriangle } from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const { 
    currentRole, 
    switchRole, 
    resetDemoData, 
    startQuickDemoWalkthrough,
    activeScreen,
    setActiveScreen
  } = useApp();

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-3 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Prototype status note */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300 hidden sm:inline">Prototype Demo:</span>
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700">
            Simulated Data & Transactions
          </span>
        </div>

        {/* Role Quick Switchers & Actions */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <span className="text-slate-400 mr-1 hidden md:inline">Demo Switch:</span>

          {/* Seeker Button */}
          <button
            onClick={() => switchRole('seeker')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentRole === 'seeker' && activeScreen !== 'landing'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-300" />
            <span>Seeker (Aadhya)</span>
          </button>

          {/* Provider Button */}
          <button
            onClick={() => switchRole('provider')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentRole === 'provider'
                ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/30'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Store className="w-3.5 h-3.5 text-violet-300" />
            <span>Provider (Rahul Store)</span>
          </button>

          {/* Admin Button */}
          <button
            onClick={() => switchRole('admin')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              currentRole === 'admin'
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Admin</span>
          </button>

          {/* 1-Click Guided Demo */}
          <button
            onClick={startQuickDemoWalkthrough}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold transition-all shadow-sm shadow-emerald-500/20"
            title="Fast-track to ₹5,000 cash request flow"
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden sm:inline">1-Click</span> Demo Flow
          </button>

          {/* Landing shortcut */}
          <button
            onClick={() => setActiveScreen('landing')}
            className={`px-2 py-1 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors ${activeScreen === 'landing' ? 'text-indigo-400 font-bold' : ''}`}
            title="View Public Landing Page"
          >
            Landing
          </button>

          {/* Reset State Button */}
          <button
            onClick={resetDemoData}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
            title="Reset all demo data back to default"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden lg:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
