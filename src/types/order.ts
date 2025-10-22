// ============================================
// src/types/order.ts
// ============================================

import type { User } from "./user"
import type { Product } from "./product"

export type OrderStatus =
  | "PENDING"
  | "PAYMENT_RECEIVED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED"

export type PaymentMethod = "CREDIT_CARD" | "BANK_TRANSFER" | "INSTALLMENT"

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED"

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus

  userId: string
  user?: User | null

  addressId: string
  address: Address

  subtotal: number
  shippingCost: number
  tax: number
  discount: number
  total: number

  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentId?: string | null

  items: OrderItem[]

  trackingNumber?: string | null
  shippedAt?: Date | null
  deliveredAt?: Date | null

  customerNote?: string | null
  adminNote?: string | null

  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string

  productId: string
  productName: string
  productImage?: string | null
  woodFinishName?: string | null

  quantity: number
  unitPrice: number
  totalPrice: number

  product?: Product | null
}

export interface Address {
  id: string
  userId: string

  title: string
  fullName: string
  phone: string

  city: string
  district: string
  neighborhood?: string | null

  // Your API and Prisma routes use a single "addressLine" field
  addressLine: string

  postalCode?: string | null
  isDefault: boolean

  createdAt: Date
  updatedAt: Date
}
