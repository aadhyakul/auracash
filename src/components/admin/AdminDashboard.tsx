import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_ADMIN_USERS_LIST, DEMO_DISPUTES } from '../../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  Activity, 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  Search, 
  AlertTriangle, 
  Eye, 
  Ban, 
  Check, 
  ArrowLeft,
  X,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { transactions, incomingRequests, addToast, setActiveScreen } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'requests' | 'transactions' | 'disputes'>('users');
  const [usersList, setUsersList] = useState(DEMO_ADMIN_USERS_LIST);
  const [disputesList, setDisputesList] = useState(DEMO_DISPUTES);
  const [userModalItem, setUserModalItem] = useState<any | null>(null);

  const handleVerifyUser = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === id ? { ...u, verification: 'Verified' } : u))
    );
    addToast('success', 'User KYC Approved', `User ${id} has been marked Verified.`);
  };

  const handleSuspendUser = (id: string) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === 'Suspended' ? 'Active' : 'Suspended' }
          : u
      )
    );
    addToast('warning', 'Status Toggled', `User account status updated.`);
  };

  const handleResolveDispute = (id: string) => {
    setDisputesList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'Resolved' } : d))
    );
    addToast('success', 'Dispute Resolved', `Dispute ${id} marked Resolved.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Operations Control
            </span>
            <span className="text-xs text-slate-400">Live Mock Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Demo Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Network oversight, liquidity health, verification approval, and dispute resolution.
          </p>
        </div>

        <button
          onClick={() => setActiveScreen('dashboard')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs self-start sm:self-auto"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Seeker View</span>
        </button>
      </div>

      {/* 6 ADMIN KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Total Users</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">1,248</p>
          <span className="text-[10px] text-emerald-600 font-semibold">+18 today</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Verified</span>
          <p className="text-xl sm:text-2xl font-extrabold text-emerald-600">1,086</p>
          <span className="text-[10px] text-slate-400">87% KYC rate</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Requests</span>
          <p className="text-xl sm:text-2xl font-extrabold text-indigo-600">24</p>
          <span className="text-[10px] text-indigo-600 font-semibold">In matching pool</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Completed</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">3,482</p>
          <span className="text-[10px] text-emerald-600 font-semibold">99.4% success</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Transaction Vol</span>
          <p className="text-xl sm:text-2xl font-extrabold text-slate-900">₹18.4L</p>
          <span className="text-[10px] text-slate-400">GMV Disbursed</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">AuraCash Revenue</span>
          <p className="text-xl sm:text-2xl font-extrabold text-amber-600">₹1.2L</p>
          <span className="text-[10px] text-amber-700 font-semibold">30% Net Take</span>
        </div>
      </div>

      {/* ADMIN TABS NAVIGATION */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50/60 overflow-x-auto">
          {[
            { id: 'users', label: 'Registered Users & KYC' },
            { id: 'requests', label: 'Cash Requests Pipeline' },
            { id: 'transactions', label: 'Transactions Ledger' },
            { id: 'disputes', label: 'Disputes & Incident Desk' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-6 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: USERS TABLE */}
        {activeTab === 'users' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Name</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Verification</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Transactions</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usersList.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      <div>{user.name}</div>
                      <span className="text-[11px] text-slate-400 font-normal">{user.phone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        user.role === 'Provider' ? 'bg-violet-50 text-violet-700' : 'bg-indigo-50 text-indigo-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-semibold ${
                        user.verification === 'Verified' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {user.verification === 'Verified' ? '✓ ' : '● '}
                        {user.verification}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-semibold">{user.transactions}</td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      {user.verification !== 'Verified' && (
                        <button
                          onClick={() => handleVerifyUser(user.id)}
                          className="px-2.5 py-1 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px]"
                        >
                          Verify
                        </button>
                      )}
                      <button
                        onClick={() => handleSuspendUser(user.id)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-[11px]"
                      >
                        {user.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                      </button>
                      <button
                        onClick={() => setUserModalItem(user)}
                        className="px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: CASH REQUESTS */}
        {activeTab === 'requests' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Request ID</th>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {incomingRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900">{req.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{req.seekerName}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{req.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-slate-600">{req.location}</td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold text-[10px] border border-amber-200">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: TRANSACTIONS */}
        {activeTab === 'transactions' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Transaction ID</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Fee</th>
                  <th className="py-3.5 px-4">Provider</th>
                  <th className="py-3.5 px-4">Seeker</th>
                  <th className="py-3.5 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.slice(0, 8).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900">{tx.id}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{tx.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4 text-indigo-600 font-bold">₹{tx.fee}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">{tx.providerName}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium">{tx.seekerName}</td>
                    <td className="py-3.5 px-6 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: DISPUTES */}
        {activeTab === 'disputes' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6">Case ID</th>
                  <th className="py-3.5 px-4">Reported By</th>
                  <th className="py-3.5 px-4">Reason / Notes</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {disputesList.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70">
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900">{d.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{d.reportedBy} ({d.userRole})</td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{d.reason}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">₹{d.amount.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                        d.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      {d.status !== 'Resolved' && (
                        <button
                          onClick={() => handleResolveDispute(d.id)}
                          className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                        >
                          Resolve & Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Modal Details */}
      {userModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setUserModalItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base font-bold text-slate-900 mb-2">Member Audit Log</h3>
            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 mb-4">
              <p><strong>Name:</strong> {userModalItem.name}</p>
              <p><strong>Phone:</strong> {userModalItem.phone}</p>
              <p><strong>Role:</strong> {userModalItem.role}</p>
              <p><strong>Verification:</strong> {userModalItem.verification}</p>
              <p><strong>Joined Date:</strong> {userModalItem.joined}</p>
              <p><strong>Total Handovers:</strong> {userModalItem.transactions}</p>
            </div>
            <button
              onClick={() => setUserModalItem(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
