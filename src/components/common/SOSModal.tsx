import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldAlert, AlertTriangle, PhoneCall, CheckCircle2, X } from 'lucide-react';

export const SOSModal: React.FC = () => {
  const { sosModalOpen, setSosModalOpen, activeRequest, currentUser, addToast } = useApp();
  const [isNotified, setIsNotified] = useState(false);

  if (!sosModalOpen) return null;

  const handleTriggerHelp = () => {
    setIsNotified(true);
    addToast('error', 'SOS Activated', 'AuraCash 24/7 Rapid Response team notified with your live coordinates.');
  };

  const handleClose = () => {
    setSosModalOpen(false);
    setIsNotified(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-rose-100 relative overflow-hidden">
        {/* Decorative alert ambient gradient */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isNotified ? (
          <div>
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            </div>

            <h3 className="text-xl font-bold text-center text-slate-900 mb-2">
              Emergency Assistance
            </h3>
            
            <p className="text-center text-sm font-semibold text-rose-600 mb-3">
              Are you sure you need emergency assistance?
            </p>

            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-4 text-xs text-rose-950 space-y-2 mb-6">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p>
                  Pressing <strong>Get Help</strong> will instantly notify AuraCash Safety Operations, broadcast your location to trusted contacts, and prioritize your live request.
                </p>
              </div>
              {activeRequest && (
                <div className="pt-2 border-t border-rose-200/60 text-[11px] text-rose-800">
                  <p><strong>Active Session:</strong> {activeRequest.id}</p>
                  <p><strong>Meeting Spot:</strong> {activeRequest.meetingPoint}</p>
                </div>
              )}
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleTriggerHelp}
                className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                Get Help
              </button>

              <button
                onClick={handleClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-400 mt-4">
              Demo Simulation: In production, local authorities & emergency responders are dispatched.
            </p>
          </div>
        ) : (
          <div className="text-center py-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Support has been notified.
            </h3>

            <p className="text-sm text-slate-600 mb-5 leading-relaxed">
              Your safety alert was logged. An AuraCash priority supervisor has received your location ({activeRequest?.location || currentUser.location}).
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 mb-6 text-left space-y-1">
              <p>✓ Emergency response agent assigned</p>
              <p>✓ Recorded timestamp: {new Date().toLocaleTimeString()}</p>
              <p>✓ GPS coordinate packet locked</p>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
            >
              Return to Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
