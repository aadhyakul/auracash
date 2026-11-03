import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoControlBar } from './components/common/DemoControlBar';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { SOSModal } from './components/common/SOSModal';
import { AuthModal } from './components/auth/AuthModal';

// Screens
import { LandingPage } from './components/landing/LandingPage';
import { SeekerDashboard } from './components/seeker/SeekerDashboard';
import { RequestCashFlow } from './components/seeker/RequestCashFlow';
import { MatchingScreen } from './components/seeker/MatchingScreen';
import { HandoverTracking } from './components/seeker/HandoverTracking';
import { OtpVerification } from './components/seeker/OtpVerification';
import { TransactionSuccess } from './components/seeker/TransactionSuccess';
import { ProviderDashboard } from './components/provider/ProviderDashboard';
import { ProviderRequests } from './components/provider/ProviderRequests';
import { ProviderEarnings } from './components/provider/ProviderEarnings';
import { ProviderSettings } from './components/provider/ProviderSettings';
import { TransactionHistory } from './components/transactions/TransactionHistory';
import { ProfileView } from './components/profile/ProfileView';
import { SafetyCenter } from './components/safety/SafetyCenter';
import { SupportView } from './components/support/SupportView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { RiskComplianceView } from './components/compliance/RiskComplianceView';

const MainAppContent: React.FC = () => {
  const { activeScreen, currentRole } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const renderCurrentScreen = () => {
    switch (activeScreen) {
      case 'landing':
        return <LandingPage onOpenAuth={handleOpenAuth} />;
      case 'dashboard':
        return <SeekerDashboard />;
      case 'request_flow':
        return <RequestCashFlow />;
      case 'matching':
        return <MatchingScreen />;
      case 'tracking':
        return <HandoverTracking />;
      case 'otp':
        return <OtpVerification />;
      case 'success':
        return <TransactionSuccess />;
      case 'provider_dashboard':
        return <ProviderDashboard />;
      case 'provider_requests':
        return <ProviderRequests />;
      case 'provider_earnings':
        return <ProviderEarnings />;
      case 'provider_settings':
        return <ProviderSettings />;
      case 'transactions':
        return <TransactionHistory />;
      case 'profile':
        return <ProfileView />;
      case 'safety':
        return <SafetyCenter />;
      case 'support':
        return <SupportView />;
      case 'admin':
        return <AdminDashboard />;
      case 'roadmap':
        return <RoadmapView />;
      case 'compliance':
        return <RiskComplianceView />;
      default:
        return currentRole === 'provider' ? <ProviderDashboard /> : <SeekerDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 md:pb-0">
      {/* 1. Global Interactive Demo Control Bar */}
      <DemoControlBar />

      {/* 2. Top Navigation Bar */}
      <Navbar onOpenAuth={handleOpenAuth} />

      {/* 3. Main Screen Viewport */}
      <main className="flex-1">
        {renderCurrentScreen()}
      </main>

      {/* 4. Mobile Bottom Navigation */}
      <BottomNav />

      {/* 5. Modals & Notifications */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
      <SOSModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
