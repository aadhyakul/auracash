import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Lock, 
  Zap, 
  Store, 
  Wallet, 
  TrendingUp, 
  Users, 
  PhoneCall,
  Search,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { switchRole, setActiveScreen, providers } = useApp();

  const handleGetCash = () => {
    switchRole('seeker');
    setActiveScreen('request_flow');
  };

  const handleProvideCash = () => {
    switchRole('provider');
    setActiveScreen('provider_dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live verified status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-xs text-xs font-semibold text-indigo-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AuraCash Network Live</span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-600 font-bold">4 Verified Providers Nearby</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Cash when you need it.{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                From someone nearby.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              AuraCash connects you with verified cash providers nearby — quickly, securely and transparently.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={handleGetCash}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center justify-center gap-2.5"
              >
                <Wallet className="w-5 h-5" />
                <span>Get Cash</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleProvideCash}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5"
              >
                <Store className="w-5 h-5 text-indigo-600" />
                <span>Provide Cash</span>
              </button>

              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 px-3 py-2 transition-colors"
              >
                How It Works ↓
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Govt ID Verified Handlers</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>OTP-Protected Escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Avg. Meeting &lt; 8 Mins</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Product Mockup Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-[32px] bg-gradient-to-b from-white to-slate-50 p-5 shadow-2xl shadow-indigo-950/10 border border-slate-200/90">
              {/* Top notch simulation */}
              <div className="flex items-center justify-between pb-4 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-800">GLA Campus Radar</span>
                </div>
                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Live Match
                </span>
              </div>

              {/* Active Match Card inside Mockup */}
              <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-5 rounded-2xl mb-4 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-15">
                  <Wallet className="w-24 h-24" />
                </div>
                <p className="text-[11px] font-semibold tracking-wider uppercase text-indigo-300">
                  Cash Request Demo
                </p>
                <div className="flex items-baseline gap-1 my-2">
                  <span className="text-3xl font-extrabold">₹5,000</span>
                  <span className="text-xs text-indigo-200 font-normal">in crisp notes</span>
                </div>
                <div className="flex items-center justify-between text-xs text-indigo-200 pt-3 border-t border-indigo-800/60">
                  <span>Fee: ₹100</span>
                  <span className="text-emerald-400 font-bold">● Provider 0.8 km away</span>
                </div>
              </div>

              {/* Provider Preview Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                    alt="Provider"
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">Rahul General Store</h4>
                      <span className="text-[11px] font-bold text-amber-500 flex items-center">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 4.8
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-indigo-600" />
                      GLA University Main Gate (0.8 km)
                    </p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">
                      ✓ Available: ₹8,000 cash ready
                    </p>
                  </div>
                </div>

                {/* Handover OTP Simulator Preview */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-medium">Handover OTP</span>
                    <span className="font-mono text-sm font-extrabold tracking-widest text-indigo-600">
                      7 4 1 2
                    </span>
                  </div>
                  <button
                    onClick={handleGetCash}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 shadow-xs"
                  >
                    Test Flow
                  </button>
                </div>
              </div>

              <div className="text-center">
                <span className="text-[11px] text-slate-400 font-medium">
                  Secondary Tagline: <em>"Cash as easy as a cab ride."</em>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-20 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/60">
              The Real Problem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              Cash is needed. Cash isn't always near.
            </h2>
            <p className="text-base text-slate-600">
              Despite digital UPI revolution, millions of daily situations strictly require hard cash. But access to physical currency remains broken.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Problem Card 1 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/90 hover:border-indigo-300 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                ATMs can be unavailable
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                ATMs may be empty, out of order, miles away, or closed — especially late at night, on national holidays, university campuses, and in Tier-2/3 towns.
              </p>
            </div>

            {/* Problem Card 2 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/90 hover:border-indigo-300 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Emergencies don't wait
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Hospital admissions, sudden vehicle breakdowns, tolls, emergency travel, and spot repairs often demand immediate physical banknotes on the spot.
              </p>
            </div>

            {/* Problem Card 3 */}
            <div className="bg-slate-50/80 rounded-3xl p-8 border border-slate-200/90 hover:border-indigo-300 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Cash is still important
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Thousands of small vendors, local vegetable markets, auto rickshaws, and informal services operate purely on physical cash notes.
              </p>
            </div>
          </div>

          {/* Intended range callout */}
          <div className="bg-gradient-to-r from-indigo-900 via-violet-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white text-center shadow-xl">
            <span className="text-xs uppercase tracking-widest text-indigo-300 font-bold">
              Target Transaction Band
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold my-3 text-white">
              ₹200 – ₹1,00,000
            </h3>
            <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
              From small emergency change for rickshaw fare to large medical or business purchases, matched securely with tiered trust limits.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/60">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            How AuraCash Works
          </h2>
          <p className="text-base text-slate-600">
            A frictionless peer-to-merchant experience inspired by modern ride-hailing apps:
          </p>
        </div>

        {/* 4 Steps Flow with connecting graphics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm relative hover:shadow-md transition-shadow">
            <div className="text-3xl font-extrabold text-indigo-600/40 mb-3">01</div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Wallet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Request Cash</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your required amount (₹200–₹1L) and select your current location or designated campus safe spot.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm relative hover:shadow-md transition-shadow">
            <div className="text-3xl font-extrabold text-indigo-600/40 mb-3">02</div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Get Matched</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our proximity engine matches you with a verified shopkeeper or cash provider within walking distance.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm relative hover:shadow-md transition-shadow">
            <div className="text-3xl font-extrabold text-indigo-600/40 mb-3">03</div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Meet & Verify</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meet at the public designated spot. Physically inspect the notes and confirm the handover using your 4-digit OTP.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm relative hover:shadow-md transition-shadow">
            <div className="text-3xl font-extrabold text-indigo-600/40 mb-3">04</div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Pay & Settle</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Once OTP is entered, funds and transparent service fee settle automatically from held escrow.
            </p>
          </div>
        </div>
      </section>

      {/* 4. TWO-SIDED MARKETPLACE SECTION */}
      <section className="py-20 bg-slate-100/70 border-t border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-white rounded-full border border-indigo-200/60">
              Two-Sided Liquidity Network
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
              A Platform Built for Both Sides
            </h2>
            <p className="text-base text-slate-600">
              Connecting individuals in urgent need with local shops and liquid agents holding idle physical cash.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: Cash Seekers */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                  <Wallet className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Cash Seekers</h3>
                  <p className="text-xs font-semibold text-indigo-600">People who need cash right now</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Request amounts between ₹200 – ₹1 Lakh</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Find verified nearby providers within 5–10 mins</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent flat ~2% fee with zero hidden charges</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Track handover progress in real time with SOS safety</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>OTP-confirmed handover — zero risk of money loss</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Rate your provider to cultivate community trust</span>
                </li>
              </ul>

              <button
                onClick={handleGetCash}
                className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Get Cash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Cash Providers */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-lg shadow-violet-600/20">
                  <Store className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Cash Providers</h3>
                  <p className="text-xs font-semibold text-violet-600">Shopkeepers, agents and people with spare cash</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-8 text-sm text-slate-700">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>See nearby incoming cash requests on demand</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Toggle online availability and preferred business hours</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Set your own maximum cash limits (e.g. ₹18,000)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accept or decline requests with a single tap</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Earn 70% of the service fee on successful handovers</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time earnings analytics and daily payouts</span>
                </li>
              </ul>

              <button
                onClick={handleProvideCash}
                className="w-full py-4 px-6 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-md shadow-violet-600/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Provide Cash</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-[36px] p-10 sm:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-indigo-300 px-3.5 py-1 bg-white/10 rounded-full backdrop-blur-md">
              The Next Evolution of Local Fintech
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Cash as easy as a cab ride.
            </h2>

            <p className="text-base sm:text-lg text-indigo-200 leading-relaxed">
              Start small. Build trust. Create a network where cash can move when people need it.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={handleGetCash}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-indigo-900 font-bold text-sm hover:bg-indigo-50 shadow-lg transition-transform hover:scale-105"
              >
                Get Cash
              </button>
              <button
                onClick={handleProvideCash}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-700/70 hover:bg-indigo-700 text-white font-bold text-sm border border-indigo-500/30 transition-transform hover:scale-105"
              >
                Become a Provider
              </button>
            </div>

            <div className="pt-8 border-t border-indigo-800/80">
              <p className="text-xs text-indigo-300 font-medium">
                AuraCash is currently a prototype. Transactions, verification, payments and locations shown in this demo are simulated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg bg-gradient-to-r from-indigo-600 to-violet-700 bg-clip-text text-transparent">
              AuraCash
            </span>
            <span className="text-xs text-slate-400">© 2026 AuraCash Prototype. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-500">
            <button onClick={() => setActiveScreen('safety')} className="hover:text-indigo-600">
              Safety Center
            </button>
            <button onClick={() => setActiveScreen('roadmap')} className="hover:text-indigo-600">
              Roadmap
            </button>
            <button onClick={() => setActiveScreen('compliance')} className="hover:text-indigo-600">
              Risk & Compliance
            </button>
            <button onClick={() => setActiveScreen('support')} className="hover:text-indigo-600">
              Support & FAQ
            </button>
            <button onClick={() => setActiveScreen('admin')} className="hover:text-amber-600">
              Admin Portal
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
