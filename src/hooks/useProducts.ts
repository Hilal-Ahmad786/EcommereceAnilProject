
// ============================================
// src/hooks/useProducts.ts
// ============================================
'use client'

import { useState, useEffect } from 'react'
import type { Product } from '@/types/product'

interface UseProductsOptions {
  categoryId?: string
  search?: string
  sortBy?: string
  limit?: number
}

export function useProducts(options: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [options.categoryId, options.search, options.sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      
      // Build query string
      const params = new URLSearchParams()
      if (options.categoryId) params.append('categoryId', options.categoryId)
      if (options.search) params.append('search', options.search)
      if (options.sortBy) params.append('sortBy', options.sortBy)
      if (options.limit) params.append('limit', options.limit.toString())

      const response = await fetch(`/api/products?${params}`)
      
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data = await response.json()
      setProducts(data.data || [])
      setError(null)
    } catch (err) {
      setError('Ürünler yüklenirken bir hata oluştu')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchProducts()
  }

  return { products, loading, error, refetch }
}