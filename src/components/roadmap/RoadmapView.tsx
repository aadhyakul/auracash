import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Rocket, 
  TrendingUp, 
  Building2, 
  ArrowRight
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const { setActiveScreen, switchRole } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/60">
          Strategic Vision
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          AuraCash Product Roadmap
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From a focused university campus pilot to a nationwide decentralized cash liquidity network.
        </p>
      </div>

      {/* 3 PHASES */}
      <div className="space-y-8">
        {/* Phase 1 */}
        <div className="bg-white rounded-3xl p-8 border-2 border-indigo-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-600/30">
                01
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Current Milestone</span>
                <h3 className="text-xl font-extrabold text-slate-900">Phase 1 — Pilot Launch</h3>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start md:self-auto">
              ● Live in Mathura & Campus Clusters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Scope & Limits</strong>
              <p>Confined to 1 city & university campus nodes.</p>
              <p className="font-semibold text-indigo-600">₹200 – ₹5,000 transaction band</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Provider Onboarding</strong>
              <p>Manual in-person KYC verification for 50 local retail merchants & stationery shop owners.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Validation Metrics</strong>
              <p>Testing matching algorithm latency (&lt; 2 min), OTP handover security, and 70/30 fee distribution.</p>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-violet-600/30">
                02
              </div>
              <div>
                <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">Growth Horizon</span>
                <h3 className="text-xl font-extrabold text-slate-900">Phase 2 — Scale & Network Trust</h3>
              </div>
            </div>
            <span className="text-xs font-bold text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200 self-start md:self-auto">
              Upcoming Q4 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Tiered Trust Limits</strong>
              <p>Increase limits up to ₹1,00,000 for users maintaining high trust scores and KYC completion.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Multi-City Expansion</strong>
              <p>Expand to 15 tier-2 university hubs, transit junctions, and market districts.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Incentives & Gamification</strong>
              <p>Cashback bonuses, provider surge pricing during peak festival periods, and referral rewards.</p>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg">
                03
              </div>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ecosystem Vision</span>
                <h3 className="text-xl font-extrabold text-slate-900">Phase 3 — Enterprise & National Grid</h3>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200 self-start md:self-auto">
              Vision 2027+
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Merchant Cash Requirements</strong>
              <p>Bulk cash replenishment and change delivery for retail chains and local bazaars.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Bank & Fintech Integration</strong>
              <p>Direct partnerships with scheduled commercial banks to replace high-cost branch ATM machinery.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <strong className="text-slate-900 font-bold block text-sm">Inter-City Cash Network</strong>
              <p>Unified pan-India cash network serving tourists, transport corridors, and rural financial inclusion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-3xl p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-indigo-950">
          Interested in testing the prototype?
        </h3>
        <p className="text-xs text-indigo-800/80 max-w-md mx-auto">
          Experience the complete seeker request journey or switch into the merchant provider terminal in this live MVP demo.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              switchRole('seeker');
              setActiveScreen('request_flow');
            }}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 shadow-sm"
          >
            Launch Demo Cash Request
          </button>
        </div>
      </div>
    </div>
  );
};
