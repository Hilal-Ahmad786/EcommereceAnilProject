// ============================================
// src/types/category.ts
// ============================================
export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
  parentId?: string
  order: number
  parent?: Category
  children: Category[]
  products?: Product[]
  seo?: SEO
  createdAt: Date
  updatedAt: Date
}