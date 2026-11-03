export type UserRole = 'seeker' | 'provider' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  rating: number;
  totalReviews: number;
  trustScore: 'Verified' | 'Pending' | 'Tier-1';
  isMobileVerified: boolean;
  isIdentityVerified: boolean;
  isProfileVerified: boolean;
  avatar: string;
  memberSince: string;
  completedTransactionsCount: number;
  location: string;
}

export type RequestStatus = 
  | 'idle' 
  | 'matching' 
  | 'matched' 
  | 'confirmed' 
  | 'otp_pending' 
  | 'settling' 
  | 'completed' 
  | 'cancelled';

export interface ProviderItem {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  rating: number;
  totalReviews: number;
  distanceKm: number;
  availableCash: number;
  minRequest: number;
  maxRequest: number;
  isAvailable: boolean;
  verified: boolean;
  avatar: string;
  hours: string;
  address: string;
  estimatedTime: string;
}

export interface CashRequest {
  id: string;
  seekerId: string;
  seekerName: string;
  seekerPhone: string;
  amount: number;
  serviceFee: number;
  providerEarning: number;
  platformFee: number;
  totalAmount: number;
  location: string;
  meetingPoint: string;
  status: RequestStatus;
  providerId?: string;
  providerName?: string;
  providerPhone?: string;
  providerDistance?: number;
  providerRating?: number;
  providerAvatar?: string;
  otp: string;
  createdAt: string;
  estimatedArrivalMinutes?: number;
  notes?: string;
  userRating?: number;
  userReview?: string;
}

export type TransactionStatus = 'Completed' | 'Pending' | 'Cancelled';

export interface Transaction {
  id: string;
  requestId: string;
  date: string;
  time: string;
  amount: number;
  fee: number;
  providerEarning: number;
  platformFee: number;
  seekerName: string;
  providerName: string;
  status: TransactionStatus;
  meetingPoint: string;
  rolePerspective?: 'seeker' | 'provider';
  type: 'Cash Withdrawal' | 'Cash Handover';
  paymentMethod: string;
}

export interface DisputeItem {
  id: string;
  transactionId: string;
  reportedBy: string;
  userRole: 'Seeker' | 'Provider';
  reason: string;
  amount: number;
  date: string;
  status: 'Under Review' | 'Resolved' | 'Dismissed';
}

export interface ProviderSettings {
  isAvailable: boolean;
  maxCashAvailable: number;
  minRequestAmount: number;
  preferredStartTime: string;
  preferredEndTime: string;
  denominations: {
    notes500: boolean;
    notes200: boolean;
    notes100: boolean;
  };
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
}
