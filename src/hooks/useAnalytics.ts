
// ============================================
// src/hooks/useAnalytics.ts
// ============================================
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview } from '@/config/analytics'

export function useAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()
    pageview(url)
  }, [pathname, searchParams])

  const trackEvent = (eventName: string, params?: any) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, params)
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, params)
    }
  }

  const trackPurchase = (orderData: {
    orderId: string
    value: number
    currency: string
    items: any[]
  }) => {
    trackEvent('purchase', {
      transaction_id: orderData.orderId,
      value: orderData.value,
      currency: orderData.currency,
      items: orderData.items,
    })
  }

  const trackAddToCart = (product: {
    id: string
    name: string
    price: number
    quantity: number
  }) => {
    trackEvent('add_to_cart', {
      currency: 'TRY',
      value: product.price * product.quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    })
  }

  return {
    trackEvent,
    trackPurchase,
    trackAddToCart,
  }
}