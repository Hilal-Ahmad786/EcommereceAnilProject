// ============================================
// src/types/product.ts
// ============================================
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  shortDescription?: string
  price: number
  comparePrice?: number
  stock: number
  lowStockThreshold: number
  sku?: string
  barcode?: string
  dimensions?: {
    width: number
    height: number
    depth: number
    unit: string
  }
  weight?: number
  weightUnit?: string
  featured: boolean
  isActive: boolean
  categoryId: string
  category?: Category
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
  alt?: string
  order: number
}

export interface WoodFinish {
  id: string
  name: string
  slug: string
  hexColor: string
  textureUrl?: string
  description?: string
  createdAt: Date
}

export interface ProductWoodFinish {
  id: string
  productId: string
  woodFinishId: string
  priceModifier?: number
  woodFinish: WoodFinish
}