import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  Layers, 
  MapPin, 
  Star, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  AlertTriangle,
  PhoneCall
} from 'lucide-react';

export const SafetyCenter: React.FC = () => {
  const { setSosModalOpen, setActiveScreen } = useApp();

  const safetyCards = [
    {
      title: 'KYC for Everyone',
      desc: 'Both seekers and providers must complete Aadhaar, PAN, and mobile OTP authentication before making or receiving transactions.',
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      tag: 'Mandatory Verification',
      bg: 'bg-indigo-50/60',
    },
    {
      title: 'Held Payment Escrow',
      desc: 'Funds and service fees remain locked in secure escrow until you physically inspect and approve the banknotes using your 4-digit OTP.',
      icon: <Lock className="w-6 h-6 text-emerald-600" />,
      tag: 'Zero Fund Risk',
      bg: 'bg-emerald-50/60',
    },
    {
      title: 'Tiered Limits',
      desc: 'New accounts start with modest limits (₹200 to ₹5,000). Higher limits up to ₹1,00,000 unlock organically as users build verified transaction history.',
      icon: <Layers className="w-6 h-6 text-violet-600" />,
      tag: 'Risk Containment',
      bg: 'bg-violet-50/60',
    },
    {
      title: 'Safe Meeting Spots',
      desc: 'Handovers occur exclusively at well-lit, CCTV-monitored public points — college main gates, metro exits, bank branches, and commercial plazas.',
      icon: <MapPin className="w-6 h-6 text-amber-600" />,
      tag: 'Public Locations',
      bg: 'bg-amber-50/60',
    },
    {
      title: 'Ratings & Reviews',
      desc: 'Both parties rate and review each other after every handover. Low ratings trigger immediate automated review and merchant suspension.',
      icon: <Star className="w-6 h-6 text-purple-600" />,
      tag: 'Community Trust',
      bg: 'bg-purple-50/60',
    },
    {
      title: 'SOS & 24/7 Support',
      desc: 'One-tap emergency alert broadcasts live coordinates to priority supervisors and nearby contacts in case of any security concern or dispute.',
      icon: <ShieldAlert className="w-6 h-6 text-rose-600" />,
      tag: 'Instant Assistance',
      bg: 'bg-rose-50/60',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/60">
          Trust & Protection Engine
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Built on trust and safety
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Exchanging physical cash requires the highest standard of physical, financial, and digital safeguards. AuraCash is engineered around multi-layered protection.
        </p>
      </div>

      {/* 6 Core Safety Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center`}>
                {card.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {card.tag}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Handover Safety Checklist */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Field Guidelines
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Golden Rules for Safe Handover
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm text-white mb-0.5">Always count notes first</strong>
              <p className="text-indigo-200 leading-relaxed">
                Take your time to count and feel the notes in broad daylight or clear lighting before reading out your OTP code.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm text-white mb-0.5">Never meet in secluded alleys</strong>
              <p className="text-indigo-200 leading-relaxed">
                Only meet at suggested public safe zones (e.g., campus main gate, busy markets, bank ATMs). Refuse any request to move to private rooms.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm text-white mb-0.5">Keep OTP private</strong>
              <p className="text-indigo-200 leading-relaxed">
                Your 4-digit code is your signature. Never disclose it over chat, phone calls, or before physical notes are in your hand.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-sm text-white mb-0.5">Use SOS if uncomfortable</strong>
              <p className="text-indigo-200 leading-relaxed">
                If the provider looks suspicious or demands unlisted commissions, trigger SOS or cancel the order without hesitation.
              </p>
            </div>
          </div>
        </div>

        {/* SOS Hotline Trigger Banner */}
        <div className="pt-4 border-t border-indigo-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-indigo-300">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>24/7 Rapid Response hotline available nationwide</span>
          </div>

          <button
            onClick={() => setSosModalOpen(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Test SOS Emergency Modal</span>
          </button>
        </div>
      </div>
    </div>
  );
};
