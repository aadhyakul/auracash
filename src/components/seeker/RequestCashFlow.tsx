import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_LOCATIONS } from '../../data/mockData';
import { 
  ArrowLeft, 
  ArrowRight, 
  Wallet, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Info,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const RequestCashFlow: React.FC = () => {
  const { createCashRequest, setActiveScreen } = useApp();

  // Current sub-step (1: Amount, 2: Location, 3: Fee Breakdown, 4: Confirm)
  const [step, setStep] = useState<number>(1);

  // Form values
  const [amount, setAmount] = useState<number>(5000);
  const [locationType, setLocationType] = useState<'demo' | 'manual'>('demo');
  const [selectedDemoLoc, setSelectedDemoLoc] = useState(DEMO_LOCATIONS[0].name);
  const [manualLoc, setManualLoc] = useState('');
  const [meetingPointDetail, setMeetingPointDetail] = useState('Outside Main Security Booth (Gate #1)');

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  // Fee calculation (flat 2%, min ₹20)
  const serviceFee = Math.max(20, Math.round(amount * 0.02));
  const totalAmount = amount + serviceFee;

  const resolvedLocation = locationType === 'demo' ? selectedDemoLoc : (manualLoc || 'GLA University Gate');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Step 4 -> trigger creation and matching
      createCashRequest(amount, resolvedLocation, meetingPointDetail);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      setActiveScreen('dashboard');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back button & Stepper header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{step === 1 ? 'Cancel Request' : 'Back'}</span>
        </button>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step
                  ? 'w-8 bg-indigo-600'
                  : s < step
                  ? 'w-4 bg-indigo-300'
                  : 'w-4 bg-slate-200'
              }`}
            />
          ))}
          <span className="text-xs font-semibold text-slate-500 ml-1">
            Step {step} of 4
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/90 shadow-xl relative overflow-hidden">
        {/* STEP 1: AMOUNT */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                Step 01 — Amount
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                How much cash do you need?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Enter any amount between ₹200 and ₹1,00,000.
              </p>
            </div>

            {/* Big Currency Input */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80 text-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Requested Cash Note Value
              </span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-indigo-600">₹</span>
                <input
                  type="number"
                  min={200}
                  max={100000}
                  step={100}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="text-3xl sm:text-4xl font-extrabold text-slate-900 bg-transparent border-none focus:outline-none w-52 text-center"
                />
              </div>
              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-2">
                <span>Minimum: ₹200</span>
                <span>•</span>
                <span>Maximum: ₹1,00,000</span>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                Quick Select Preset:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-3 px-2 rounded-2xl text-xs font-extrabold transition-all border ${
                      amount === amt
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 scale-105'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            {/* Range slider for smooth adjustment */}
            <div>
              <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                <span>Adjust amount</span>
                <span className="font-bold text-indigo-600">₹{amount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={200}
                max={25000}
                step={100}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* STEP 2: LOCATION */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                Step 02 — Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Where do you need the cash?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                For demo testing, select a simulated campus spot or type your address.
              </p>
            </div>

            {/* Prototype notice */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Prototype Notice:</strong> AuraCash does not ask for real device GPS permissions. Use the preset demo locations below for immediate testing.
              </span>
            </div>

            {/* Toggle demo vs manual */}
            <div className="flex p-1 bg-slate-100 rounded-2xl">
              <button
                type="button"
                onClick={() => setLocationType('demo')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  locationType === 'demo'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Use Demo Location
              </button>
              <button
                type="button"
                onClick={() => setLocationType('manual')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  locationType === 'manual'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Enter Location Manually
              </button>
            </div>

            {locationType === 'demo' ? (
              <div className="space-y-2.5">
                {DEMO_LOCATIONS.map((loc) => (
                  <div
                    key={loc.name}
                    onClick={() => {
                      setSelectedDemoLoc(loc.name);
                      setMeetingPointDetail(loc.landmark);
                    }}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                      selectedDemoLoc === loc.name
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200 hover:border-indigo-200 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl ${
                        selectedDemoLoc === loc.name ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{loc.name}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{loc.subtext}</p>
                        <p className="text-[11px] text-indigo-700 font-semibold mt-1">
                          Meeting Spot: {loc.landmark}
                        </p>
                      </div>
                    </div>
                    {selectedDemoLoc === loc.name && (
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-1" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Street / Area Location
                  </label>
                  <input
                    type="text"
                    value={manualLoc}
                    onChange={(e) => setManualLoc(e.target.value)}
                    placeholder="e.g. GLA University Gate #2, Mathura"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specific Public Safe Meeting Spot
                  </label>
                  <input
                    type="text"
                    value={meetingPointDetail}
                    onChange={(e) => setMeetingPointDetail(e.target.value)}
                    placeholder="e.g. In front of security guard cabin / canteen"
                    className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: FEE BREAKDOWN */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                Step 03 — Transparent Pricing
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Fee & Settlement Breakdown
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Zero hidden charges. Pay safely via escrow only when physical cash is received.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-600">Cash requested</span>
                <span className="text-sm font-bold text-slate-900">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-xs text-slate-600">Service fee (~2%)</span>
                  <p className="text-[10px] text-slate-400">Includes provider fee + safety network guarantee</p>
                </div>
                <span className="text-sm font-bold text-indigo-600">
                  ₹{serviceFee.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-sm font-extrabold text-slate-900">Total Settlement</span>
                  <p className="text-[11px] text-emerald-600 font-semibold">Held securely in simulated escrow</p>
                </div>
                <span className="text-2xl font-extrabold text-slate-900">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 text-center">
              <span className="text-xs font-semibold text-indigo-900">
                ★ Illustrative demo pricing (70% paid to provider, 30% to platform safety)
              </span>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRM & FIND PROVIDER */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                Step 04 — Review & Search
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Confirm your request
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We will match you with the closest verified cash provider.
              </p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Amount to Receive:</span>
                <span className="text-xl font-extrabold text-slate-900">
                  ₹{amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-start pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Handover Location:</span>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-800">{resolvedLocation}</p>
                  <p className="text-[11px] text-slate-500">{meetingPointDetail}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                <span className="text-xs text-slate-500">Service Fee:</span>
                <span className="text-xs font-bold text-indigo-600">
                  ₹{serviceFee.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Estimated Matching Time:</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 1–3 mins
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Simulated Payment: Escrow will hold ₹{totalAmount.toLocaleString('en-IN')} until you verify the physical banknotes via OTP.</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {step === 4 ? 'Ready to broadcast' : 'Press Continue to proceed'}
          </span>

          <button
            onClick={handleNext}
            className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.99] flex items-center gap-2"
          >
            <span>{step === 4 ? 'Find Provider' : 'Continue'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
