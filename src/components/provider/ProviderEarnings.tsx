import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  Calendar, 
  Download, 
  Receipt,
  Wallet,
  ArrowUpRight
} from 'lucide-react';

export const ProviderEarnings: React.FC = () => {
  const { setActiveScreen, transactions } = useApp();

  // Weekly bar chart data
  const chartDays = [
    { day: 'Mon', amount: 350, height: '40%' },
    { day: 'Tue', amount: 490, height: '60%' },
    { day: 'Wed', amount: 280, height: '35%' },
    { day: 'Thu', amount: 630, height: '75%' },
    { day: 'Fri', amount: 840, height: '100%' },
    { day: 'Sat', amount: 770, height: '90%' },
    { day: 'Sun (Today)', amount: 420, height: '50%' },
  ];

  const recentPayouts = [
    { id: 'TX-701', amountEarned: 70, requestAmount: 5000, date: '24 Sep, 04:15 PM', seeker: 'Aadhya Sharma' },
    { id: 'TX-702', amountEarned: 140, requestAmount: 10000, date: '22 Sep, 07:45 PM', seeker: 'Suresh Raina' },
    { id: 'TX-703', amountEarned: 35, requestAmount: 2500, date: '20 Sep, 02:00 PM', seeker: 'Rohan Mehra' },
    { id: 'TX-704', amountEarned: 56, requestAmount: 4000, date: '18 Sep, 06:15 PM', seeker: 'Neha Gupta' },
    { id: 'TX-705', amountEarned: 42, requestAmount: 3000, date: '15 Sep, 09:20 PM', seeker: 'Karan Joshi' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setActiveScreen('provider_dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Provider Earnings & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tracking your 70% revenue share across all physical cash distributions.
          </p>
        </div>

        <button
          onClick={() => alert('Simulated Statement: Monthly payout invoice statement downloaded.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Download Statement</span>
        </button>
      </div>

      {/* 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Total Earnings</span>
          <p className="text-3xl font-extrabold text-slate-900">₹4,280</p>
          <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> All-time payouts
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">This Month</span>
          <p className="text-3xl font-extrabold text-violet-700">₹2,840</p>
          <p className="text-xs font-medium text-slate-500 mt-1">September 2026</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Successful Handovers</span>
          <p className="text-3xl font-extrabold text-slate-900">32</p>
          <p className="text-xs font-medium text-emerald-600 mt-1">100% completion rate</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Average Earning</span>
          <p className="text-3xl font-extrabold text-slate-900">₹134</p>
          <p className="text-xs font-medium text-slate-500 mt-1">Per cash delivery</p>
        </div>
      </div>

      {/* VISUAL EARNINGS BAR CHART */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Weekly Earnings Velocity</h3>
            <p className="text-xs text-slate-500">Daily commission income across past 7 days</p>
          </div>
          <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
            Total: ₹3,780 this week
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-56 flex items-end justify-between gap-2 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-100">
          {chartDays.map((bar) => (
            <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-violet-700 opacity-0 group-hover:opacity-100 transition-opacity">
                ₹{bar.amount}
              </span>
              <div
                style={{ height: bar.height }}
                className="w-full max-w-[42px] bg-gradient-to-t from-violet-600 to-indigo-500 rounded-t-xl group-hover:from-violet-700 group-hover:to-indigo-600 transition-all shadow-sm"
              />
              <span className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 truncate">
                {bar.day}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>70% Service Fee Split Model</span>
          <span>Settled to Bank via IMPS instantly</span>
        </div>
      </div>

      {/* RECENT EARNINGS ITEMIZATION */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-slate-900">Recent Cash Handover Commissions</h3>
          <span className="text-xs text-slate-500">Latest 5 payouts</span>
        </div>

        <div className="space-y-3">
          {recentPayouts.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs hover:bg-slate-100/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-extrabold text-sm">
                  +₹{item.amountEarned}
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    ₹{item.amountEarned} earned on ₹{item.requestAmount.toLocaleString('en-IN')} request
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Seeker: {item.seeker} • {item.date}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ✓ Settled
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
