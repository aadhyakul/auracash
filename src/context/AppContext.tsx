import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  UserRole, 
  CashRequest, 
  ProviderItem, 
  Transaction, 
  ProviderSettings, 
  ToastNotification 
} from '../types';
import { 
  DEMO_SEEKER, 
  DEMO_PROVIDER_USER, 
  DEMO_ADMIN_USER, 
  DEMO_PROVIDERS, 
  INITIAL_TRANSACTIONS 
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile;
  currentRole: UserRole;
  switchRole: (role: UserRole) => void;
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
  activeRequest: CashRequest | null;
  providers: ProviderItem[];
  transactions: Transaction[];
  incomingRequests: CashRequest[];
  providerSettings: ProviderSettings;
  updateProviderSettings: (settings: Partial<ProviderSettings>) => void;
  createCashRequest: (amount: number, location: string, meetingPoint?: string) => CashRequest;
  acceptMatchedProvider: (provider: ProviderItem) => void;
  verifyOtp: (enteredOtp: string) => { success: boolean; message: string };
  completeTransactionFlow: () => void;
  cancelActiveRequest: () => void;
  submitRating: (rating: number, review?: string) => void;
  providerAcceptRequest: (requestId: string) => void;
  providerDeclineRequest: (requestId: string) => void;
  toasts: ToastNotification[];
  addToast: (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
  sosModalOpen: boolean;
  setSosModalOpen: (open: boolean) => void;
  resetDemoData: () => void;
  startQuickDemoWalkthrough: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'auracash_role',
  REQUEST: 'auracash_active_request',
  TRANSACTIONS: 'auracash_transactions',
  PROVIDER_SETTINGS: 'auracash_provider_settings',
  SCREEN: 'auracash_screen',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Role & User State
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'seeker';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    if (currentRole === 'provider') return DEMO_PROVIDER_USER;
    if (currentRole === 'admin') return DEMO_ADMIN_USER;
    return DEMO_SEEKER;
  });

  // 2. Navigation State
  const [activeScreen, setActiveScreen] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCREEN);
    return saved || 'landing';
  });

  // 3. Transactions State
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TRANSACTIONS;
      }
    }
    return INITIAL_TRANSACTIONS;
  });

  // 4. Providers list
  const [providers, setProviders] = useState<ProviderItem[]>(DEMO_PROVIDERS);

  // 5. Provider Availability & Limits Settings
  const [providerSettings, setProviderSettings] = useState<ProviderSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROVIDER_SETTINGS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // default
      }
    }
    return {
      isAvailable: true,
      maxCashAvailable: 18000,
      minRequestAmount: 200,
      preferredStartTime: '09:00',
      preferredEndTime: '21:00',
      denominations: {
        notes500: true,
        notes200: true,
        notes100: true,
      },
    };
  });

  // 6. Active Request (Seeker Journey)
  const [activeRequest, setActiveRequest] = useState<CashRequest | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUEST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // 7. Incoming Requests queue for Provider
  const [incomingRequests, setIncomingRequests] = useState<CashRequest[]>([
    {
      id: 'req_live_5001',
      seekerId: 'usr_seeker_02',
      seekerName: 'Amit Saxena',
      seekerPhone: '+91 97112 00412',
      amount: 5000,
      serviceFee: 100,
      providerEarning: 70,
      platformFee: 30,
      totalAmount: 5100,
      location: 'GLA University Main Gate',
      meetingPoint: 'Gate #1 Security Booth',
      status: 'matching',
      otp: '7412',
      createdAt: 'Just now',
      notes: 'Urgent cash needed for lab manual & hostel mess payment.',
    },
    {
      id: 'req_live_5002',
      seekerId: 'usr_seeker_03',
      seekerName: 'Priya Sundaram',
      seekerPhone: '+91 98451 99281',
      amount: 2500,
      serviceFee: 50,
      providerEarning: 35,
      platformFee: 15,
      totalAmount: 2550,
      location: 'City Center Mall Entry',
      meetingPoint: 'Near Costa Coffee entrance',
      status: 'matching',
      otp: '4891',
      createdAt: '3 mins ago',
      notes: 'Cash needed for auto fare and medicine.',
    },
  ]);

  // 8. Toasts & SOS Modals
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCREEN, activeScreen);
  }, [activeScreen]);

  useEffect(() => {
    if (activeRequest) {
      localStorage.setItem(STORAGE_KEYS.REQUEST, JSON.stringify(activeRequest));
    } else {
      localStorage.removeItem(STORAGE_KEYS.REQUEST);
    }
  }, [activeRequest]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROVIDER_SETTINGS, JSON.stringify(providerSettings));
  }, [providerSettings]);

  // Toast Helper
  const addToast = (type: 'success' | 'info' | 'warning' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, title, message, timestamp: 'Now' }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Switch Role
  const switchRole = (newRole: UserRole) => {
    setCurrentRole(newRole);
    if (newRole === 'seeker') {
      setCurrentUser(DEMO_SEEKER);
      setActiveScreen('dashboard');
      addToast('info', 'Switched to Cash Seeker', 'Browsing as Aadhya Sharma');
    } else if (newRole === 'provider') {
      setCurrentUser(DEMO_PROVIDER_USER);
      setActiveScreen('provider_dashboard');
      addToast('info', 'Switched to Cash Provider', 'Operating as Rahul Verma (Rahul General Store)');
    } else if (newRole === 'admin') {
      setCurrentUser(DEMO_ADMIN_USER);
      setActiveScreen('admin');
      addToast('info', 'Switched to Admin Portal', 'Viewing operations demo metrics');
    }
  };

  // Update Provider Settings
  const updateProviderSettings = (newSettings: Partial<ProviderSettings>) => {
    setProviderSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      return updated;
    });
    // Also sync the provider item
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === 'prov_rahul') {
          return {
            ...p,
            isAvailable: newSettings.isAvailable ?? p.isAvailable,
            availableCash: newSettings.maxCashAvailable ?? p.availableCash,
          };
        }
        return p;
      })
    );
    addToast('success', 'Settings Saved', 'Provider availability and preferences updated');
  };

  // Create Cash Request (Seeker)
  const createCashRequest = (amount: number, location: string, meetingPoint?: string): CashRequest => {
    // Standard flat ~2% fee calculation (min ₹20, max ₹2000)
    const calculatedFee = Math.max(20, Math.round(amount * 0.02));
    const providerEarning = Math.round(calculatedFee * 0.7); // 70% illustrative split
    const platformFee = calculatedFee - providerEarning;     // 30% illustrative split
    const totalAmount = amount + calculatedFee;

    // Generate clean 4-digit mock OTP
    const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

    const newRequest: CashRequest = {
      id: `AC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      seekerId: currentUser.id,
      seekerName: currentUser.name,
      seekerPhone: currentUser.phone,
      amount,
      serviceFee: calculatedFee,
      providerEarning,
      platformFee,
      totalAmount,
      location,
      meetingPoint: meetingPoint || 'Designated Public Safe Spot (Main Entry Gate)',
      status: 'matching',
      otp: generatedOtp,
      createdAt: 'Just now',
    };

    setActiveRequest(newRequest);
    setActiveScreen('matching');
    return newRequest;
  };

  // Accept matched provider
  const acceptMatchedProvider = (provider: ProviderItem) => {
    if (!activeRequest) return;
    const updated: CashRequest = {
      ...activeRequest,
      status: 'confirmed',
      providerId: provider.id,
      providerName: provider.businessName,
      providerPhone: provider.phone,
      providerDistance: provider.distanceKm,
      providerRating: provider.rating,
      providerAvatar: provider.avatar,
      estimatedArrivalMinutes: 7,
    };
    setActiveRequest(updated);
    setActiveScreen('tracking');
    addToast('success', 'Provider Match Confirmed!', `${provider.businessName} has accepted your request.`);
  };

  // OTP Verification
  const verifyOtp = (enteredOtp: string): { success: boolean; message: string } => {
    if (!activeRequest) {
      return { success: false, message: 'No active cash request found.' };
    }

    if (enteredOtp.trim() === activeRequest.otp.trim()) {
      const updated: CashRequest = {
        ...activeRequest,
        status: 'settling',
      };
      setActiveRequest(updated);
      addToast('success', 'Handover Confirmed ✓', 'Physical cash verified and settlement processed.');
      
      // Auto settle to completion
      setTimeout(() => {
        completeTransactionFlow();
      }, 900);

      return { success: true, message: 'Handover Confirmed ✓' };
    } else {
      return { success: false, message: 'Incorrect OTP. Please check the 4-digit code on the seeker’s screen and try again.' };
    }
  };

  // Complete Transaction & Save to History
  const completeTransactionFlow = () => {
    if (!activeRequest) return;

    const completedTxn: Transaction = {
      id: activeRequest.id,
      requestId: activeRequest.id,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      amount: activeRequest.amount,
      fee: activeRequest.serviceFee,
      providerEarning: activeRequest.providerEarning,
      platformFee: activeRequest.platformFee,
      seekerName: activeRequest.seekerName,
      providerName: activeRequest.providerName || 'Rahul General Store',
      status: 'Completed',
      meetingPoint: activeRequest.meetingPoint,
      type: 'Cash Withdrawal',
      paymentMethod: 'UPI Escrow (Simulated)',
    };

    // Prepend new transaction to state
    setTransactions((prev) => [completedTxn, ...prev]);

    // Update active request status
    setActiveRequest((prev) => (prev ? { ...prev, status: 'completed' } : null));

    // Update Seeker profile count
    setCurrentUser((prev) => ({
      ...prev,
      completedTransactionsCount: prev.completedTransactionsCount + 1,
    }));

    setActiveScreen('success');
  };

  // Cancel Request
  const cancelActiveRequest = () => {
    if (activeRequest) {
      const cancelledTxn: Transaction = {
        id: activeRequest.id,
        requestId: activeRequest.id,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        amount: activeRequest.amount,
        fee: activeRequest.serviceFee,
        providerEarning: activeRequest.providerEarning,
        platformFee: activeRequest.platformFee,
        seekerName: activeRequest.seekerName,
        providerName: activeRequest.providerName || 'Pending Provider',
        status: 'Cancelled',
        meetingPoint: activeRequest.meetingPoint,
        type: 'Cash Withdrawal',
        paymentMethod: 'UPI Escrow (Simulated)',
      };
      setTransactions((prev) => [cancelledTxn, ...prev]);
    }
    setActiveRequest(null);
    setActiveScreen('dashboard');
    addToast('warning', 'Request Cancelled', 'The cash request has been cancelled.');
  };

  // Rating Submission
  const submitRating = (rating: number, review?: string) => {
    if (activeRequest) {
      setActiveRequest((prev) => (prev ? { ...prev, userRating: rating, userReview: review } : null));
    }
    addToast('success', 'Thanks for your feedback!', 'Your review helps keep the AuraCash network trustworthy.');
  };

  // Provider Accept Incoming Request
  const providerAcceptRequest = (requestId: string) => {
    const req = incomingRequests.find((r) => r.id === requestId);
    if (!req) return;

    setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId));
    
    // Create an active request for the provider tracking
    const updated: CashRequest = {
      ...req,
      status: 'confirmed',
      providerId: currentUser.id,
      providerName: 'Rahul General Store',
      providerPhone: currentUser.phone,
      providerRating: 4.8,
    };
    setActiveRequest(updated);
    setActiveScreen('tracking');
    addToast('success', 'Request Accepted!', `Meeting point: ${req.meetingPoint}`);
  };

  // Provider Decline Incoming Request
  const providerDeclineRequest = (requestId: string) => {
    setIncomingRequests((prev) => prev.filter((r) => r.id !== requestId));
    addToast('info', 'Request Declined', 'The request has been routed to another provider nearby.');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setTransactions(INITIAL_TRANSACTIONS);
    setActiveRequest(null);
    setCurrentRole('seeker');
    setCurrentUser(DEMO_SEEKER);
    setActiveScreen('landing');
    setProviderSettings({
      isAvailable: true,
      maxCashAvailable: 18000,
      minRequestAmount: 200,
      preferredStartTime: '09:00',
      preferredEndTime: '21:00',
      denominations: {
        notes500: true,
        notes200: true,
        notes100: true,
      },
    });
    addToast('info', 'Demo Data Reset', 'All state returned to pristine demonstration baseline.');
  };

  // Fast-track Guided Walkthrough
  const startQuickDemoWalkthrough = () => {
    setCurrentRole('seeker');
    setCurrentUser(DEMO_SEEKER);
    setActiveScreen('request_flow');
    addToast('info', 'Quick Demo Mode', 'Started ₹5,000 cash request flow.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        switchRole,
        activeScreen,
        setActiveScreen,
        activeRequest,
        providers,
        transactions,
        incomingRequests,
        providerSettings,
        updateProviderSettings,
        createCashRequest,
        acceptMatchedProvider,
        verifyOtp,
        completeTransactionFlow,
        cancelActiveRequest,
        submitRating,
        providerAcceptRequest,
        providerDeclineRequest,
        toasts,
        addToast,
        removeToast,
        sosModalOpen,
        setSosModalOpen,
        resetDemoData,
        startQuickDemoWalkthrough,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
