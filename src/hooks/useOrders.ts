
// ============================================
// src/hooks/useOrders.ts
// ============================================
'use client'

import { useState, useEffect } from 'react'
import type { Order } from '@/types/order'

export function useOrders(userId?: string) {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userId) {
      fetchOrders()
    }
  }, [userId])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/orders?userId=${userId}`)
      
      if (!response.ok) throw new Error('Failed to fetch orders')
      
      const data = await response.json()
      setOrders(data.data || [])
      setError(null)
    } catch (err) {
      setError('Siparişler yüklenirken bir hata oluştu')
      console.error('Error fetching orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchOrders()
  }

  return { orders, loading, error, refetch }
}
