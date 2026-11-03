import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, PlusCircle, History, User, Store, Shield } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentRole, activeScreen, setActiveScreen } = useApp();

  // Only show inside app views (or if user wants quick navigation)
  if (activeScreen === 'landing') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 py-1.5 px-3 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Home / Dashboard */}
        <button
          onClick={() => setActiveScreen(currentRole === 'provider' ? 'provider_dashboard' : 'dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeScreen === 'dashboard' || activeScreen === 'provider_dashboard'
              ? 'text-indigo-600 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Primary Action Button (Prominent Request Cash for Seeker, Requests for Provider) */}
        {currentRole === 'seeker' ? (
          <button
            onClick={() => setActiveScreen('request_flow')}
            className={`flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95`}
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/35 border-4 border-white">
              <PlusCircle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="text-[10px] font-bold text-indigo-700 mt-1">Request Cash</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveScreen('provider_requests')}
            className={`flex flex-col items-center justify-center -mt-5 transition-transform active:scale-95`}
          >
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-violet-600 to-purple-500 text-white flex items-center justify-center shadow-lg shadow-violet-600/35 border-4 border-white">
              <Store className="w-6 h-6 stroke-[2.2]" />
            </div>
            <span className="text-[10px] font-bold text-violet-700 mt-1">Requests</span>
          </button>
        )}

        {/* Transactions / Activity */}
        <button
          onClick={() => setActiveScreen('transactions')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeScreen === 'transactions'
              ? 'text-indigo-600 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">History</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => setActiveScreen('profile')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeScreen === 'profile'
              ? 'text-indigo-600 font-semibold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>
    </div>
  );
};
