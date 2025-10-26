// src/components/checkout/createOrder.ts
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface OrderItemInput {
  productId: string
  quantity: number
}

interface CreateOrderPayload {
  addressId: string
  items: OrderItemInput[]
  paymentMethod?: "CREDIT_CARD" | "BANK_TRANSFER" | "INSTALLMENT"
  customerNote?: string
}

export function useCreateOrder() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createOrder = async (payload: CreateOrderPayload) => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Sipariş oluşturulamadı.")
      }

      // Redirect to order confirmation or payment step
      if (data.orderNumber) {
        router.push(`/hesabim/siparisler/${data.orderNumber}`)
      } else {
        router.push("/hesabim/siparisler")
      }

      return data
    } catch (err: any) {
      setError(err.message)
      console.error("createOrder error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return { createOrder, isLoading, error }
}
