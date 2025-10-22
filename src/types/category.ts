// ============================================
// src/types/category.ts
// ============================================

import type { Product } from "./product"
import type { SEO } from "./seo"

export interface Category {
  id: string
  slug: string
  name: string
  description?: string | null
  image?: string | null
  parentId?: string | null
  order: number

  // Relations (optional because they aren't always included)
  parent?: Category | null
  children?: Category[]
  products?: Product[]
  seo?: SEO | null

  createdAt: Date
  updatedAt: Date
}
