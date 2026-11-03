import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Transaction, TransactionStatus } from '../../types';
import { 
  Receipt, 
  Search, 
  Filter, 
  Download, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  X,
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const TransactionHistory: React.FC = () => {
  const { transactions, currentRole, setActiveScreen } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesFilter = filterStatus === 'All' || tx.status.toLowerCase() === filterStatus.toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      tx.id.toLowerCase().includes(query) ||
      tx.providerName.toLowerCase().includes(query) ||
      tx.seekerName.toLowerCase().includes(query) ||
      tx.meetingPoint.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
            Escrow Records
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Transaction History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit trail of all physical cash deliveries and simulated settlements.
          </p>
        </div>

        <button
          onClick={() => alert('Simulated CSV: Complete transaction ledger exported.')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Search & Status Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, merchant or spot..."
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
            {['All', 'Completed', 'Pending', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  filterStatus === status
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table / Card List */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map((tx) => {
              const otherParty = currentRole === 'provider' ? tx.seekerName : tx.providerName;
              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="p-5 sm:p-6 hover:bg-indigo-50/30 cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Receipt className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-extrabold text-slate-900">
                          {tx.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            tx.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : tx.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-rose-50 text-rose-700 border-rose-200'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-slate-900">
                        {otherParty}
                      </p>

                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{tx.meetingPoint}</span>
                        <span className="text-slate-300">•</span>
                        <span>{tx.date}, {tx.time}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span className="text-lg font-extrabold text-slate-900">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-500">
                      Fee: <strong className="text-indigo-600">₹{tx.fee}</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            No transactions matched your current search filters.
          </div>
        )}
      </div>

      {/* Transaction Details Drawer/Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setSelectedTx(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-center text-slate-900 mb-0.5">
              Transaction Details
            </h3>
            <p className="text-center font-mono text-xs text-slate-500 mb-6">
              {selectedTx.id}
            </p>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-xs space-y-3 mb-6">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Status</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {selectedTx.status}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Physical Cash Handover</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  ₹{selectedTx.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Platform Service Fee</span>
                <span className="font-bold text-indigo-600">₹{selectedTx.fee}</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Provider Earning (70%)</span>
                <span className="font-bold text-emerald-600">₹{selectedTx.providerEarning}</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Cash Seeker</span>
                <span className="font-semibold text-slate-800">{selectedTx.seekerName}</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Cash Provider</span>
                <span className="font-semibold text-slate-800">{selectedTx.providerName}</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/80">
                <span className="text-slate-500">Meeting Point</span>
                <span className="font-medium text-slate-700">{selectedTx.meetingPoint}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Settlement Method</span>
                <span className="font-medium text-slate-700">{selectedTx.paymentMethod}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => alert(`Simulated receipt invoice downloaded for ${selectedTx.id}`)}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-slate-600" />
                <span>Invoice PDF</span>
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
