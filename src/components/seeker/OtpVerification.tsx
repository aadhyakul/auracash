import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight,
  RotateCcw,
  Store,
  Info
} from 'lucide-react';

export const OtpVerification: React.FC = () => {
  const { 
    activeRequest, 
    verifyOtp, 
    setActiveScreen, 
    completeTransactionFlow 
  } = useApp();

  const [enteredOtp, setEnteredOtp] = useState(['', '', '', '']);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!activeRequest) {
    return (
      <div className="max-w-md mx-auto py-16 text-center">
        <p className="text-sm text-slate-500 mb-4">No active request pending OTP verification.</p>
        <button
          onClick={() => setActiveScreen('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(activeRequest.otp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...enteredOtp];
    newOtp[index] = val;
    setEnteredOtp(newOtp);
    setErrorMessage('');

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !enteredOtp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleTestAutoFill = (type: 'correct' | 'wrong') => {
    if (type === 'correct') {
      const digits = activeRequest.otp.split('');
      setEnteredOtp(digits);
      setErrorMessage('');
    } else {
      setEnteredOtp(['9', '9', '9', '9']);
      setErrorMessage('');
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = enteredOtp.join('');
    if (fullOtp.length < 4) {
      setErrorMessage('Please enter all 4 digits of the handover OTP.');
      return;
    }

    setIsVerifying(true);
    setErrorMessage('');

    setTimeout(() => {
      setIsVerifying(false);
      const res = verifyOtp(fullOtp);
      if (res.success) {
        setIsConfirmed(true);
      } else {
        setErrorMessage(res.message);
      }
    }, 700);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60 inline-flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          Secure Handover Protocol
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
          Confirm Cash Handover
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Physical cash verification at {activeRequest.location}
        </p>
      </div>

      {/* ADVISORY MESSAGE (HIGH SECURITY CALLOUT) */}
      <div className="bg-amber-50 border-2 border-amber-200/90 rounded-3xl p-5 text-amber-950 flex items-start gap-3.5 shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <p className="font-extrabold text-amber-900 text-sm mb-0.5">
            CRITICAL SAFETY INSTRUCTION:
          </p>
          <blockquote className="italic font-medium text-amber-800">
            "Only share the OTP after you have physically received and checked the cash."
          </blockquote>
          <p className="text-[11px] text-amber-700 mt-1">
            Count the ₹{activeRequest.amount.toLocaleString('en-IN')} cash notes and check their quality before providing the code below to {activeRequest.providerName}.
          </p>
        </div>
      </div>

      {!isConfirmed ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl space-y-6">
          {/* SEEKER'S SECURE 4-DIGIT OTP DISPLAY */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white text-center shadow-lg relative overflow-hidden">
            <span className="text-[11px] uppercase tracking-widest text-indigo-300 font-semibold block mb-2">
              Your Secret Handover OTP (Show to Provider)
            </span>
            <div className="flex items-center justify-center gap-3 my-2">
              {activeRequest.otp.split('').map((digit, i) => (
                <div
                  key={i}
                  className="w-12 h-14 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl font-black text-white font-mono tracking-wider shadow-inner"
                >
                  {digit}
                </div>
              ))}
            </div>

            <button
              onClick={handleCopyOtp}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs text-indigo-200 font-medium transition-colors mt-2"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied code' : 'Copy code'}</span>
            </button>
          </div>

          {/* SIMULATED PROVIDER INPUT KEYPAD */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-indigo-600" />
                <span>Provider Terminal Simulation (Enter OTP)</span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleTestAutoFill('correct')}
                  className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded hover:bg-indigo-100"
                >
                  Fill Correct
                </button>
                <button
                  type="button"
                  onClick={() => handleTestAutoFill('wrong')}
                  className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded hover:bg-rose-100"
                >
                  Fill Wrong
                </button>
              </div>
            </div>

            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div className="flex justify-center gap-3">
                {[0, 1, 2, 3].map((index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={enteredOtp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-13 h-14 text-center text-2xl font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                  />
                ))}
              </div>

              {/* Error state */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold text-center flex items-center justify-center gap-2 animate-in fade-in duration-150">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <span>Verifying Cryptographic Escrow...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Handover & Settle Payment</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Demonstration mode: Entering correct code completes simulated UPI settlement.</span>
          </div>
        </div>
      ) : (
        /* HANDOVER CONFIRMED ANIMATION STATE */
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Escrow Released
          </span>

          <h2 className="text-2xl font-extrabold text-slate-900">
            Handover Confirmed ✓
          </h2>

          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            OTP match validated. ₹{activeRequest.amount.toLocaleString('en-IN')} physical cash received. Moving to transaction receipt...
          </p>

          <button
            onClick={() => setActiveScreen('success')}
            className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md transition-colors"
          >
            View Receipt Now
          </button>
        </div>
      )}
    </div>
  );
};
