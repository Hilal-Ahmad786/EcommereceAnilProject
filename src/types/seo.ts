
// ============================================
// src/types/seo.ts
// ============================================
export interface SEO {
  id: string
  metaTitle: string
  metaDescription: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonicalUrl?: string
  productId?: string
  categoryId?: string
  blogPostId?: string
  createdAt: Date
  updatedAt: Date
}
