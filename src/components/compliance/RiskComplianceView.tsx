import React from 'react';
import { 
  ShieldAlert, 
  Scale, 
  Eye, 
  Banknote, 
  Lock, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

export const RiskComplianceView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/60">
          Governance & Protection
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Risk & Compliance Architecture
        </h1>
        <p className="text-sm text-slate-500">
          Planned regulatory safeguards and systemic risk mitigation for physical currency distribution.
        </p>
      </div>

      {/* CRITICAL PROTOTYPE DISCLAIMER BANNER */}
      <div className="bg-amber-50 border-2 border-amber-200/90 rounded-3xl p-6 text-amber-950 flex items-start gap-4 shadow-xs">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h4 className="font-extrabold text-sm text-amber-900">
            Important Compliance Disclosure
          </h4>
          <p className="text-amber-800 leading-relaxed">
            The measures detailed below represent <strong>planned safeguards and proposed architecture</strong> designed for production rollout. AuraCash is currently an academic and startup prototype demonstration. Transactions, settlements, escrow operations, and provider credentials shown in this demo environment are fully simulated.
          </p>
        </div>
      </div>

      {/* 4 CORE SAFEGUARDS */}
      <div className="space-y-6">
        {/* Pillar 1: Regulation */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Pillar 01</span>
              <h3 className="text-lg font-bold text-slate-900">Financial Regulation & Licensing</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-13">
            Prior to commercial launch, AuraCash would secure specialized legal counsel and operate exclusively through partnerships with RBI-licensed scheduled commercial banks, PPI (Prepaid Payment Instrument) issuers, and authorized Business Correspondent (BC) frameworks. Client funds would reside in regulated escrow accounts with no self-custody of float.
          </p>
        </div>

        {/* Pillar 2: Counterfeit Cash */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Pillar 02</span>
              <h3 className="text-lg font-bold text-slate-900">Counterfeit Cash Protection</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-13">
            Cash providers legally guarantee the authenticity and condition of all banknotes provided. Handover instructions explicitly instruct the seeker to count and examine notes before disclosing the OTP. In the event of damaged, suspected, or soiled notes, the seeker rejects the exchange with zero penalty, and the provider faces automated penalties and merchant suspension.
          </p>
        </div>

        {/* Pillar 3: Anti-Money Laundering & Misuse */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Pillar 03</span>
              <h3 className="text-lg font-bold text-slate-900">Money Laundering Prevention (AML)</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-13">
            Strict user authentication (Aadhaar & PAN cross-referencing), velocity checks, and daily volume caps prevent structural smurfing. Automated pattern algorithms flag anomalous repeat transfers, geographical jumps, or frequent split transactions. Complete audit records are preserved for compliance reporting.
          </p>
        </div>

        {/* Pillar 4: Physical Safety Safeguards */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Pillar 04</span>
              <h3 className="text-lg font-bold text-slate-900">Physical Personal Safety</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed pl-13">
            Personal security is fortified through tiered cash limits, restricting handovers to vetted public transit or campus safe points, live location link sharing with guardians, two-way mutual ratings, and instant emergency SOS escalation with local responder dispatch.
          </p>
        </div>
      </div>
    </div>
  );
};
