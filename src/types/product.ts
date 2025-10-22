// ============================================
// src/types/product.ts
// ============================================

import type { Category } from "./category"
import type { Review } from "./review"

export interface Dimensions {
  width?: number
  height?: number
  depth?: number
  unit: string
}

export interface Product {
  id: string
  slug: string
  name: string

  description: string
  shortDescription?: string | null

  price: number
  comparePrice?: number | null

  stock: number
  lowStockThreshold: number

  sku?: string | null
  barcode?: string | null

  // Dimensions can be partially provided; when present, unit is required
  dimensions?: Dimensions

  weight?: number | null
  weightUnit?: string | null

  featured: boolean
  isActive: boolean

  categoryId: string
  category?: Category | null

  images: ProductImage[]
  woodFinishes: ProductWoodFinish[]

  reviews?: Review[]

  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  alt?: string | null
  order: number
}

export interface WoodFinish {
  id: string
  name: string
  slug: string
  hexColor: string
  textureUrl?: string | null
  description?: string | null
  createdAt: Date
}

export interface ProductWoodFinish {
  id: string
  productId: string
  woodFinishId: string
  priceModifier?: number | null
  woodFinish: WoodFinish
}

/** A convenient helper type if you need a fully-hydrated product shape */
export type ProductWithRelations = Product & {
  category?: Category | null
  images: ProductImage[]
  woodFinishes: ProductWoodFinish[]
  reviews?: Review[]
}
