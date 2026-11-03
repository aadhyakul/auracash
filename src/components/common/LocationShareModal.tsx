import React, { useState } from 'react';
import { MapPin, Share2, Copy, Check, Shield, X } from 'lucide-react';

interface LocationShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  meetingPoint: string;
  transactionId: string;
}

export const LocationShareModal: React.FC<LocationShareModalProps> = ({
  isOpen,
  onClose,
  meetingPoint,
  transactionId,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const mockLiveLink = `https://auracash.app/track/live-${transactionId.toLowerCase()}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(mockLiveLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
          <Share2 className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-center text-slate-900 mb-1">
          Share Live Handover Trip
        </h3>
        <p className="text-center text-xs text-slate-500 mb-5">
          Share your real-time verified meeting coordinates with friends or family.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 space-y-2">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-800">Public Meeting Spot</p>
              <p className="text-xs text-slate-600">{meetingPoint}</p>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>Security ID: {transactionId}</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" /> Live Escrow Active
            </span>
          </div>
        </div>

        {/* Shareable Link Box */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Live Guardian Link
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={mockLiveLink}
              className="flex-1 text-xs px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-mono text-slate-600 truncate focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
