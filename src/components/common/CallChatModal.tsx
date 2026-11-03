import React, { useState } from 'react';
import { Phone, MessageSquare, Send, CheckCheck, X, Shield } from 'lucide-react';

interface CallChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  providerName: string;
  providerPhone: string;
}

export const CallChatModal: React.FC<CallChatModalProps> = ({
  isOpen,
  onClose,
  providerName,
  providerPhone,
}) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'call'>('chat');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'provider'; text: string; time: string }>>([
    { sender: 'provider', text: `Hi! I have accepted your cash handover request. Heading towards the meeting spot now.`, time: '1 min ago' },
    { sender: 'user', text: `Great, I am waiting right next to the security booth at the main gate.`, time: 'Just now' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: inputMsg.trim(), time: 'Just now' }
    ]);
    const sent = inputMsg;
    setInputMsg('');

    // Simulated provider reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { 
          sender: 'provider', 
          text: `Got it! I am carrying crisp 500 notes. Arriving in 2-3 minutes.`, 
          time: 'Just now' 
        }
      ]);
    }, 1200);
  };

  const handleStartCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
    }, 6000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col h-[520px]">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-sm">
              {providerName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">{providerName}</p>
              <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified Provider Online
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'chat' ? 'call' : 'chat')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {activeTab === 'chat' ? <Phone className="w-4 h-4 text-emerald-400" /> : <MessageSquare className="w-4 h-4 text-indigo-400" />}
              <span>{activeTab === 'chat' ? 'Call' : 'Chat'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab content */}
        {activeTab === 'chat' ? (
          <div className="flex flex-col flex-1 bg-slate-50 overflow-hidden">
            {/* Privacy security banner */}
            <div className="bg-indigo-50 border-b border-indigo-100 px-3 py-1.5 text-[11px] text-indigo-900 flex items-center justify-center gap-1.5 text-center">
              <Shield className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>Masked in-app chat. Never share your 4-digit OTP here.</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Message input */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type a message to provider..."
                className="flex-1 text-xs px-3 py-2.5 bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 p-6 flex flex-col items-center justify-center bg-slate-50 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center mb-4 shadow-xl shadow-indigo-600/20">
              <Phone className={`w-9 h-9 ${isCalling ? 'animate-bounce' : ''}`} />
            </div>

            <h4 className="text-base font-bold text-slate-900 mb-1">{providerName}</h4>
            <p className="text-xs text-slate-500 mb-2">Simulated Virtual Masked Call</p>
            <p className="text-xs font-mono font-medium text-slate-700 bg-slate-200/70 px-3 py-1 rounded-full mb-6">
              {providerPhone}
            </p>

            {isCalling ? (
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Connecting secure line...
                </span>
                <p className="text-[11px] text-slate-400">Caller ID is masked for privacy</p>
              </div>
            ) : (
              <button
                onClick={handleStartCall}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Start Masked Audio Call
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
