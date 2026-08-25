export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  nameAr?: string;
  role: 'user' | 'admin';
  emailVerified: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export type ProductType = 'cv' | 'portfolio' | 'bundle';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface CreateOrderRequest {
  productType: ProductType;
  couponCode?: string;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  productType: ProductType;
  amount: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface CVTemplateInfo {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  category: string;
  previewImage?: string;
  isATS: boolean;
  supportedLanguages: string[];
  isPremium: boolean;
  isFeatured: boolean;
  isActive: boolean;
  tags?: string[];
}

export interface PortfolioTemplateInfo {
  id: string;
  slug: string;
  name: string;
  nameAr?: string;
  description?: string;
  descriptionAr?: string;
  category: string;
  previewImage?: string;
  isPremium: boolean;
  isFeatured: boolean;
  isActive: boolean;
  tags?: string[];
}

export interface PricingConfig {
  cvPrice: number;
  portfolioPrice: number;
  bundlePrice: number;
  hostingRenewalPrice: number;
  currency: string;
}
