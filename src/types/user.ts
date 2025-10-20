
// ============================================
// src/types/user.ts
// ============================================
export interface User {
  id: string
  email: string
  name: string | null
  password?: string
  role: 'CUSTOMER' | 'ADMIN'
  emailVerified: Date | null
  image: string | null
  createdAt: Date
  updatedAt: Date
}