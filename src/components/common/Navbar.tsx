import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { 
  ShieldAlert, 
  Menu, 
  X, 
  ArrowLeftRight, 
  CheckCircle2, 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  LogOut,
  MapPin,
  Sparkles,
  Wallet
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth?: (initialMode?: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    currentUser, 
    currentRole, 
    switchRole, 
    activeScreen, 
    setActiveScreen, 
    setSosModalOpen,
    activeRequest
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isPublicScreen = 
    activeScreen === 'landing' || 
    activeScreen === 'safety' || 
    activeScreen === 'roadmap' || 
    activeScreen === 'compliance';

  const handleNav = (screen: string) => {
    setActiveScreen(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Logo 
              onClick={() => handleNav(!isPublicScreen ? (currentRole === 'provider' ? 'provider_dashboard' : 'dashboard') : 'landing')} 
            />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {isPublicScreen ? (
                // Landing Nav
                <>
                  <button
                    onClick={() => handleNav('landing')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'landing' ? 'text-indigo-600 bg-indigo-50/60' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      handleNav('landing');
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => handleNav('safety')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'safety' ? 'text-indigo-600 bg-indigo-50/60' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Safety & Trust
                  </button>
                  <button
                    onClick={() => handleNav('roadmap')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'roadmap' ? 'text-indigo-600 bg-indigo-50/60' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Roadmap
                  </button>
                  <button
                    onClick={() => handleNav('compliance')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'compliance' ? 'text-indigo-600 bg-indigo-50/60' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Risk & Safeguards
                  </button>
                </>
              ) : currentRole === 'seeker' ? (
                // Seeker Nav
                <>
                  <button
                    onClick={() => handleNav('dashboard')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'dashboard' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('request_flow')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      activeScreen === 'request_flow' || activeScreen === 'matching' || activeScreen === 'tracking'
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-indigo-600 hover:bg-indigo-50/50'
                    }`}
                  >
                    <Wallet className="w-4 h-4" />
                    Request Cash
                  </button>
                  <button
                    onClick={() => handleNav('transactions')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'transactions' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Transactions
                  </button>
                  <button
                    onClick={() => handleNav('safety')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'safety' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Safety Center
                  </button>
                  <button
                    onClick={() => handleNav('support')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'support' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Support
                  </button>
                </>
              ) : currentRole === 'provider' ? (
                // Provider Nav
                <>
                  <button
                    onClick={() => handleNav('provider_dashboard')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'provider_dashboard' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('provider_requests')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                      activeScreen === 'provider_requests' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cash Requests
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </button>
                  <button
                    onClick={() => handleNav('provider_earnings')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'provider_earnings' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Earnings
                  </button>
                  <button
                    onClick={() => handleNav('transactions')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'transactions' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    History
                  </button>
                  <button
                    onClick={() => handleNav('provider_settings')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeScreen === 'provider_settings' ? 'text-indigo-600 bg-indigo-50 font-semibold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Settings
                  </button>
                </>
              ) : (
                // Admin Nav
                <>
                  <button
                    onClick={() => handleNav('admin')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold text-amber-700 bg-amber-50`}
                  >
                    Admin Operations Portal
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* SOS Emergency Button (Always prominent during active transactions) */}
            <button
              onClick={() => setSosModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-xs"
              title="One-tap Emergency Assistance"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>SOS</span>
            </button>

            {/* Role Switch Pill (Instant access) */}
            <button
              onClick={() => switchRole(currentRole === 'seeker' ? 'provider' : 'seeker')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-indigo-200 bg-gradient-to-r from-indigo-50/70 to-purple-50/70 hover:from-indigo-100 hover:to-purple-100 text-indigo-900 text-xs font-semibold transition-all shadow-2xs hover:border-indigo-300"
              title="Switch between Cash Seeker and Cash Provider"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {currentRole === 'seeker' ? 'Switch to Provider' : 'Switch to Seeker'}
              </span>
            </button>

            {/* If Public Screen and Not in App Flow, show Login/Signup */}
            {isPublicScreen ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth?.('login')}
                  className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth?.('signup')}
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 transition-all hover:scale-[1.02]"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              /* User Profile Menu */
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-600/30"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                      {currentUser.name}
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 capitalize">
                      {currentUser.role} • 4.9 ★
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {currentUser.trustScore} Profile
                      </span>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          handleNav('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        Profile & Verification
                      </button>
                      <button
                        onClick={() => {
                          handleNav('transactions');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        Transaction History
                      </button>
                      <button
                        onClick={() => {
                          switchRole(currentRole === 'seeker' ? 'provider' : 'seeker');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-indigo-700 hover:bg-indigo-50 transition-colors flex items-center justify-between"
                      >
                        <span>Switch to {currentRole === 'seeker' ? 'Provider' : 'Seeker'}</span>
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          handleNav('landing');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out (Go to Landing)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2">
          {isPublicScreen ? (
            <>
              <button
                onClick={() => handleNav('landing')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('safety')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Safety & Trust
              </button>
              <button
                onClick={() => handleNav('roadmap')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Roadmap & About
              </button>
              <button
                onClick={() => handleNav('compliance')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Risk & Safeguards
              </button>
              <button
                onClick={() => handleNav('support')}
                className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Help & Support
              </button>
              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.('login');
                  }}
                  className="flex-1 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 text-center"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.('signup');
                  }}
                  className="flex-1 py-2 rounded-lg bg-indigo-600 text-sm font-semibold text-white text-center shadow-sm"
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-slate-50 rounded-xl mb-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 capitalize">Role: {currentUser.role}</p>
                </div>
                <button
                  onClick={() => switchRole(currentRole === 'seeker' ? 'provider' : 'seeker')}
                  className="px-2.5 py-1 text-xs font-semibold rounded bg-indigo-600 text-white"
                >
                  Switch Role
                </button>
              </div>

              {currentRole === 'seeker' ? (
                <>
                  <button
                    onClick={() => handleNav('dashboard')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('request_flow')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                  >
                    Request Cash
                  </button>
                  <button
                    onClick={() => handleNav('transactions')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Transactions
                  </button>
                  <button
                    onClick={() => handleNav('safety')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Safety Center
                  </button>
                  <button
                    onClick={() => handleNav('support')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Support
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNav('provider_dashboard')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Provider Dashboard
                  </button>
                  <button
                    onClick={() => handleNav('provider_requests')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cash Requests
                  </button>
                  <button
                    onClick={() => handleNav('provider_earnings')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Earnings
                  </button>
                  <button
                    onClick={() => handleNav('provider_settings')}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Availability Settings
                  </button>
                </>
              )}

              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => handleNav('landing')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50"
                >
                  Back to Landing Page
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};
