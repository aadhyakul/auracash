import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  CheckCircle2, 
  Star, 
  ArrowLeftRight, 
  Award, 
  FileCheck, 
  UploadCloud, 
  X,
  CreditCard,
  Building
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, currentRole, switchRole, addToast } = useApp();
  const [kycModalOpen, setKycModalOpen] = useState(false);
  const [kycStep, setKycStep] = useState<'form' | 'success'>('form');

  const handleSimulateKyc = (e: React.FormEvent) => {
    e.preventDefault();
    setKycStep('success');
    addToast('success', 'Verification Complete', 'Aadhaar and PAN details verified in simulated KYC sandbox.');
    setTimeout(() => {
      setKycStep('form');
      setKycModalOpen(false);
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-3xl object-cover ring-4 ring-indigo-500/20 shadow-md"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {currentUser.trustScore} Member
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500">
              <span className="capitalize font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                Role: {currentUser.role === 'seeker' ? 'Cash Seeker' : 'Cash Provider'}
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {currentUser.rating} ★ ({currentUser.totalReviews} reviews)
              </span>
              <span>Member since {currentUser.memberSince}</span>
            </div>

            <p className="text-xs text-slate-600 pt-1">
              Primary Location: <strong>{currentUser.location}</strong>
            </p>
          </div>

          <button
            onClick={() => switchRole(currentRole === 'seeker' ? 'provider' : 'seeker')}
            className="px-4 py-2.5 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>Switch Role</span>
          </button>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Mobile Number</span>
              <span className="font-bold text-slate-900">{currentUser.phone}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Email Address</span>
              <span className="font-bold text-slate-900">{currentUser.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification & Trust Tier Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Identity & Trust Verification</h2>
            <p className="text-xs text-slate-500">Government KYC credentials and fraud security checks</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Tier-2 Verified
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Mobile Verified</p>
                <p className="text-[11px] text-slate-500">One-Time Password authenticated via SMS gateway</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Active
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Identity Verified (Aadhaar / PAN)</p>
                <p className="text-[11px] text-slate-500">Cryptographically signed digital KYC match</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">Profile & Handover History Verified</p>
                <p className="text-[11px] text-slate-500">Consistent 4.9★ rating with zero safety disputes</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Verified
            </span>
          </div>
        </div>

        {/* Complete Verification / Re-Verify button */}
        <div className="pt-2">
          <button
            onClick={() => setKycModalOpen(true)}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Complete / Upgrade Verification (Simulate KYC)</span>
          </button>
        </div>
      </div>

      {/* Simulated KYC Modal */}
      {kycModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setKycModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {kycStep === 'form' ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                  <FileCheck className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-center text-slate-900 mb-1">
                  Identity Verification Simulation
                </h3>
                <p className="text-center text-xs text-slate-500 mb-5">
                  Verify government credentials to unlock higher transaction limits (up to ₹1,00,000).
                </p>

                <form onSubmit={handleSimulateKyc} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Aadhaar Number (12 digits)
                    </label>
                    <input
                      type="text"
                      defaultValue="XXXX-XXXX-4819"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      PAN Card Number (10 alphanumeric)
                    </label>
                    <input
                      type="text"
                      defaultValue="ABCDE1234F"
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 font-mono font-bold"
                    />
                  </div>

                  <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50 cursor-pointer hover:bg-slate-100/60">
                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <span className="text-xs font-semibold text-indigo-600 block">
                      Mock Document Attached: Govt_ID_Front.pdf
                    </span>
                    <span className="text-[10px] text-slate-400">Automatic OCR verified</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
                  >
                    Submit & Verify Instantly
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Identity Verified!
                </h4>
                <p className="text-xs text-slate-500">
                  Your Tier-2 trust score is confirmed. Maximum limits unlocked.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
