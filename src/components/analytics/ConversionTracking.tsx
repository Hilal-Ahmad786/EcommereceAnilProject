// src/components/analytics/ConversionTracking.tsx
'use client'
import { useEffect } from 'react'

export default function ConversionTracking({ event, data }: any) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, data)
    }
  }, [event, data])

  return null
}