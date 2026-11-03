import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQS } from '../../data/mockData';
import { 
  HelpCircle, 
  ChevronDown, 
  MessageSquare, 
  AlertCircle, 
  Phone, 
  Mail, 
  CheckCircle2, 
  X,
  Send,
  Shield
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const { addToast } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportCategory, setReportCategory] = useState('Damaged or soiled currency');
  const [reportDetails, setReportDetails] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    addToast('success', 'Incident Report Filed', 'Ticket #AC-SUP-9102 created. Escalated to operations.');
    setTimeout(() => {
      setReportSubmitted(false);
      setReportModalOpen(false);
      setReportDetails('');
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-200/60">
          Support & Assistance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How can we help you?
        </h1>
        <p className="text-sm text-slate-500">
          Answers to common questions about physical cash requests, verification, and settlement.
        </p>
      </div>

      {/* Two Action CTAs: Contact Support & Report a Problem */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-300 transition-colors">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Direct Support Team</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Connect with an AuraCash operations supervisor for general inquiries, account limits, and partner onboarding.
            </p>
          </div>
          <button
            onClick={() => setContactModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Contact Support
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-rose-300 transition-colors">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Report a Problem / Dispute</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dispute a transaction, report damaged notes, delayed merchants, or suspicious behaviour.
            </p>
          </div>
          <button
            onClick={() => setReportModalOpen(true)}
            className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            Report a Problem
          </button>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>Frequently Asked Questions</span>
        </h2>

        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed pr-6 animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Support Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setContactModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-center text-slate-900 mb-1">
              Contact AuraCash Support
            </h3>
            <p className="text-center text-xs text-slate-500 mb-6">
              Our 24/7 supervisor desk is online to assist you.
            </p>

            <div className="space-y-3 mb-6 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Toll Free Helpline</span>
                  <span className="font-bold text-slate-800">1800-AURA-CASH (1800-287-2227)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Priority Email Desk</span>
                  <span className="font-bold text-slate-800">support@auracash.network</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Average Response Time</span>
                  <span className="font-bold text-emerald-700">&lt; 2 minutes on active trips</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                addToast('success', 'Callback Requested', 'A support specialist will ring your mobile within 60 seconds.');
                setContactModalOpen(false);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              Request Immediate Callback
            </button>
          </div>
        </div>
      )}

      {/* Report a Problem Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setReportModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!reportSubmitted ? (
              <div>
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-center text-slate-900 mb-1">
                  File Dispute / Report Incident
                </h3>
                <p className="text-center text-xs text-slate-500 mb-5">
                  Transactions under review hold escrow funds until resolution.
                </p>

                <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Issue Category
                    </label>
                    <select
                      value={reportCategory}
                      onChange={(e) => setReportCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                    >
                      <option>Damaged or soiled currency notes</option>
                      <option>Provider did not reach designated spot</option>
                      <option>Provider asked for unauthorized commission</option>
                      <option>Incomplete change or wrong denomination</option>
                      <option>Safety concern or unprofessional behavior</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Describe what happened
                    </label>
                    <textarea
                      required
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      rows={3}
                      placeholder="Include transaction ID, provider name, and location..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/30 transition-all"
                  >
                    Submit Report for Investigation
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">
                  Report Logged Successfully
                </h4>
                <p className="text-xs text-slate-500">
                  Case ticket #AC-SUP-9102 created. Escalated to safety panel.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
