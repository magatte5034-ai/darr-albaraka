// =============================================
// DARR-ALBARAKA FRONTEND TYPES
// =============================================

// User & Auth Types
export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export enum KYCStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  NOT_SUBMITTED = 'NOT_SUBMITTED',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  kycStatus: KYCStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Product Types
export enum ProductType {
  PRODUCT = 'PRODUCT',
  VEHICLE_SALE = 'VEHICLE_SALE',
  VEHICLE_RENT = 'VEHICLE_RENT',
}

export enum ProductStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum ProductCondition {
  NEW = 'NEW',
  USED = 'USED',
  EXCELLENT = 'EXCELLENT',
  GOOD = 'GOOD',
  FAIR = 'FAIR',
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  order: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  sellerId: string;
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku?: string;
  condition: ProductCondition;
  status: ProductStatus;
  type: ProductType;
  featured: boolean;
  views: number;
  tags: string[];
  specifications?: Record<string, any>;
  images: ProductImage[];
  category?: Category;
  seller?: Seller;
  vehicle?: Vehicle;
  createdAt: string;
  updatedAt: string;
}

// Vehicle Types
export enum FuelType {
  PETROL = 'PETROL',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  CNG = 'CNG',
}

export enum Transmission {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
  SEMI_AUTOMATIC = 'SEMI_AUTOMATIC',
}

export interface Vehicle {
  id: string;
  productId: string;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: FuelType;
  transmission: Transmission;
  color?: string;
  numberOfSeats?: number;
  numberOfDoors?: number;
  engineCapacity?: number;
  horsePower?: number;
  dailyRentPrice?: number;
  weeklyRentPrice?: number;
  monthlyRentPrice?: number;
  availabilityCalendar?: string[];
  insuranceIncluded: boolean;
  depositRequired?: number;
  vinNumber?: string;
  registrationNumber?: string;
  features: string[];
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  parentId?: string;
  children?: Category[];
  order: number;
  isActive: boolean;
}

// Seller Types
export interface Seller {
  id: string;
  userId: string;
  businessName: string;
  description?: string;
  logo?: string;
  banner?: string;
  whatsappNumber: string;
  isApproved: boolean;
  rating: number;
  totalReviews: number;
  totalSales: number;
  totalRevenue: number;
  address?: string;
  city?: string;
  country: string;
}

// Order Types
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  MOBILE_MONEY = 'MOBILE_MONEY',
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  sellerId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  status: OrderStatus;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  shippingAddress: Address;
  billingAddress?: Address;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  deliveredAt?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

// Address Types
export enum AddressType {
  HOME = 'HOME',
  WORK = 'WORK',
  OTHER = 'OTHER',
}

export interface Address {
  id?: string;
  userId?: string;
  type: AddressType;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  product: Product;
  createdAt: string;
}

export interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  helpful: number;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

// Notification Types
export enum NotificationType {
  ORDER_CREATED = 'ORDER_CREATED',
  ORDER_UPDATED = 'ORDER_UPDATED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PRODUCT_APPROVED = 'PRODUCT_APPROVED',
  PRODUCT_REJECTED = 'PRODUCT_REJECTED',
  NEW_REVIEW = 'NEW_REVIEW',
  LOW_STOCK = 'LOW_STOCK',
  SELLER_APPROVED = 'SELLER_APPROVED',
  SYSTEM = 'SYSTEM',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter & Search Types
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition;
  type?: ProductType;
  search?: string;
  sortBy?: 'price' | 'createdAt' | 'views' | 'rating';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface ProductForm {
  title: string;
  description: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  condition: ProductCondition;
  type: ProductType;
  tags: string[];
  specifications?: Record<string, any>;
}

export interface VehicleForm extends ProductForm {
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuel: FuelType;
  transmission: Transmission;
  color?: string;
  dailyRentPrice?: number;
}

// WhatsApp Types
export interface WhatsAppMessage {
  phone: string;
  message: string;
}

export const generateWhatsAppLink = (
  productId: string,
  productTitle: string,
  phone: string = import.meta.env.VITE_WHATSAPP_NUMBER || '+221777975034'
): string => {
  const message = `Bonjour, je suis intéressé par le produit "${productTitle}" (ID: ${productId})`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
};

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
