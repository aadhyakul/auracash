import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { ShieldCheck, ArrowRight, Lock, Mail, Phone, User, CheckCircle2, X, Wallet, Store } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

type AuthStep = 'credentials' | 'otp' | 'role_select';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
}) => {
  const { switchRole, setActiveScreen, addToast } = useApp();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [step, setStep] = useState<AuthStep>('credentials');

  // Form fields
  const [fullName, setFullName] = useState('Aadhya Sharma');
  const [mobile, setMobile] = useState('+91 98765 43210');
  const [email, setEmail] = useState('aadhya.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [otpInput, setOtpInput] = useState(['4', '8', '2', '1']);
  const [selectedRole, setSelectedRole] = useState<UserRole>('seeker');

  if (!isOpen) return null;

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signup') {
      setStep('otp');
      addToast('info', 'Mock OTP Sent', 'Use demo code 4821 or any 4 digits.');
    } else {
      // Direct login
      switchRole(selectedRole);
      setActiveScreen(selectedRole === 'provider' ? 'provider_dashboard' : 'dashboard');
      onClose();
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('role_select');
    addToast('success', 'Mobile Number Verified', 'Choose your AuraCash primary account role.');
  };

  const handleRoleConfirm = () => {
    switchRole(selectedRole);
    setActiveScreen(selectedRole === 'provider' ? 'provider_dashboard' : 'dashboard');
    addToast('success', `Welcome to AuraCash!`, `Signed up as ${selectedRole === 'seeker' ? 'Cash Seeker' : 'Cash Provider'}.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: CREDENTIALS (LOGIN / SIGNUP) */}
        {step === 'credentials' && (
          <div>
            {/* Mode Switcher */}
            <div className="flex p-1 bg-slate-100 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  mode === 'login'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Log In
              </button>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">
                {mode === 'signup' ? 'Join AuraCash' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'signup'
                  ? 'Connect with verified cash providers in your area'
                  : 'Enter your credentials to access your dashboard'}
              </p>
            </div>

            <form onSubmit={handleCredentialsSubmit} className="space-y-3.5">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Aadhya Sharma"
                      className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.01] mt-2 flex items-center justify-center gap-1.5"
              >
                <span>{mode === 'signup' ? 'Continue with Phone Verification' : 'Log In to AuraCash'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                Demo Quick Preset: Pre-filled with presentation credentials.
              </span>
            </div>
          </div>
        )}

        {/* STEP 2: MOCK OTP VERIFICATION */}
        {step === 'otp' && (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <h3 className="text-xl font-bold text-center text-slate-900 mb-1">
              Verify Mobile Number
            </h3>
            <p className="text-center text-xs text-slate-500 mb-6">
              Enter the 4-digit code sent to <span className="font-semibold text-slate-800">{mobile}</span>
            </p>

            <form onSubmit={handleOtpVerify}>
              <div className="flex justify-center gap-3 mb-6">
                {otpInput.map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={val}
                    onChange={(e) => {
                      const newArr = [...otpInput];
                      newArr[idx] = e.target.value;
                      setOtpInput(newArr);
                    }}
                    className="w-12 h-12 text-center text-lg font-bold text-slate-900 bg-slate-50 border-2 border-indigo-200 rounded-xl focus:border-indigo-600 focus:bg-white focus:outline-none"
                  />
                ))}
              </div>

              <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 text-center mb-6">
                <span className="text-xs text-indigo-900 font-medium">
                  Mock OTP: <strong>4 8 2 1</strong> (Auto-filled for smooth demo)
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
              >
                Verify & Select Role
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: ROLE SELECTION */}
        {step === 'role_select' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">
                How do you want to use AuraCash?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose your default role. You can easily switch between roles at any time.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3.5 mb-6">
              {/* Card 1: I Need Cash */}
              <div
                onClick={() => setSelectedRole('seeker')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'seeker'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 hover:border-indigo-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">I Need Cash</h4>
                      {selectedRole === 'seeker' && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-indigo-600 mt-0.5">Become a Cash Seeker</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Request ₹200 to ₹1 Lakh physical cash when ATMs fail or emergencies occur. Meet verified providers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: I Have Cash */}
              <div
                onClick={() => setSelectedRole('provider')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedRole === 'provider'
                    ? 'border-violet-600 bg-violet-50/50 shadow-md ring-2 ring-violet-500/20'
                    : 'border-slate-200 hover:border-violet-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">I Have Cash</h4>
                      {selectedRole === 'provider' && (
                        <CheckCircle2 className="w-4 h-4 text-violet-600" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-violet-600 mt-0.5">Become a Cash Provider</p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Shopkeepers & verified local agents. Provide physical cash, fulfill nearby requests, and earn 70% of service fees.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleRoleConfirm}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started with AuraCash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
