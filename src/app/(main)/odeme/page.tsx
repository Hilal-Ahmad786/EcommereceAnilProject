'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import CartSummary from '@/components/cart/CartSummary'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const clearCart = useCartStore((s) => s.clearCart)
  const getTotalPrice = useCartStore((s) => s.getTotalPrice)

  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [redirecting, setRedirecting] = useState(false)
  const [addressData, setAddressData] = useState<any>(null)

  useEffect(() => {
    if (items.length === 0) {
      setRedirecting(true)
      router.replace('/sepet')
    }
  }, [items.length, router])

  if (redirecting) return null

  const subtotal = getTotalPrice()
  const total = subtotal // 👈 modify later if you add tax/shipping

  const handleAddressSubmit = (data: any) => {
    setAddressData(data)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (payment: any) => {
    try {
      const addressRes = await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Teslimat Adresi',
          fullName: addressData.fullName,
          phone: addressData.phone,
          city: addressData.city,
          district: addressData.district,
          addressLine: addressData.addressLine,
          postalCode: addressData.postalCode || '',
          isDefault: false,
        }),
      })
      if (!addressRes.ok) {
        const e = await addressRes.json().catch(() => ({}))
        throw new Error(e.error || 'Adres oluşturulamadı')
      }
      const address = await addressRes.json()

      const orderItems = items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      }))

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addressId: address.id,
          items: orderItems,
          paymentMethod:
            payment?.method === 'transfer' ? 'BANK_TRANSFER' : 'CREDIT_CARD',
          customerNote: payment?.note || '',
        }),
      })
      if (!orderRes.ok) {
        const e = await orderRes.json().catch(() => ({}))
        throw new Error(e.error || 'Sipariş oluşturulamadı')
      }
      const order = await orderRes.json()

      const payRes = await fetch('/api/payments/iyzico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: order.id }),
      })
      if (!payRes.ok) {
        const e = await payRes.json().catch(() => ({}))
        throw new Error(e.error || 'Ödeme başlatılamadı')
      }
      const pay = await payRes.json()

      clearCart()
      router.push(pay.redirectUrl || `/odeme-basarili?order=${order.orderNumber}`)
    } catch (err: any) {
      alert(err.message || 'Ödeme sırasında bir hata oluştu')
      console.error('checkout error:', err)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CheckoutSteps currentStep={currentStep} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 ? (
            <AddressForm onSubmit={handleAddressSubmit} />
          ) : (
            <PaymentForm
              onSubmit={(data) =>
                handlePaymentSubmit({ method: data.paymentMethod, note: '' })
              }
            />
          )}
        </div>
        <div className="lg:col-span-1">
          {/* ✅ Pass subtotal and total explicitly */}
          <CartSummary subtotal={subtotal} total={total} />
        </div>
      </div>
    </div>
  )
}
