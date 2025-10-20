
// ============================================
// src/types/review.ts
// ============================================
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title?: string
  comment: string
  isApproved: boolean
  product?: Product
  user?: User
  createdAt: Date
  updatedAt: Date
}