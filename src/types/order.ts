// ============================================
// src/types/order.ts
// ============================================
export type OrderStatus =
  | 'PENDING'
  | 'PAYMENT_RECEIVED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'INSTALLMENT'

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  userId: string
  user?: User
  addressId: string
  address: Address
  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentId?: string
  items: OrderItem[]
  trackingNumber?: string
  shippedAt?: Date
  deliveredAt?: Date
  customerNote?: string
  adminNote?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productName: string
  productImage?: string
  woodFinishName?: string
  quantity: number
  unitPrice: number
  totalPrice: number
  product?: Product
}

export interface Address {
  id: string
  userId: string
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood?: string
  addressLine: string
  postalCode?: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}