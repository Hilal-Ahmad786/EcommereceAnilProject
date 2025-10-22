// ============================================
// src/types/review.ts
// ============================================

import type { Product } from "./product"
import type { User } from "./user"

export interface Review {
  id: string
  productId: string
  userId: string

  rating: number
  title?: string | null
  comment: string
  isApproved: boolean

  product?: Product
  user?: User

  createdAt: Date
  updatedAt: Date
}
