// src/app/(main)/odeme/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import CheckoutSteps from '@/components/checkout/CheckoutSteps'
import AddressForm from '@/components/checkout/AddressForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import CartSummary from '@/components/cart/CartSummary'

// stop static/prerender attempts on this page
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [addressData, setAddressData] = useState<any>(null)

  const items = useCartStore((state) => state.items)
  const totalPrice = useCartStore((state) => state.getTotalPrice())
  const clearCart = useCartStore((state) => state.clearCart)

  // Redirect if cart is empty (do this in an effect — not during render)
  const [redirecting, setRedirecting] = useState(false)
  useEffect(() => {
    if (items.length === 0) {
      setRedirecting(true)
      router.replace('/sepet')
    }
  }, [items.length, router])

  if (redirecting) return null

  const handleAddressSubmit = (data: any) => {
    setAddressData(data)
    setCurrentStep(2)
  }

  const handlePaymentSubmit = async (data: any) => {
    try {
      // TODO: Integrate with İyzico payment gateway (server action / API route)
      console.log('Processing payment...', {
        address: addressData,
        payment: data,
        items,
        total: totalPrice,
      })

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and redirect to success
      clearCart()
      router.push('/odeme/basarili')
    } catch (error) {
      console.error('Payment error:', error)
      alert('Ödeme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Ödeme
        </h1>
      </div>

      {/* Steps */}
      <CheckoutSteps currentStep={currentStep} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {currentStep === 1 && (
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Teslimat Adresi</h2>
              <AddressForm onSubmit={handleAddressSubmit} />
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* Address Summary */}
              <div className="bg-white border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Teslimat Adresi</h3>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-walnut-600 hover:text-walnut-700 font-medium"
                  >
                    Değiştir
                  </button>
                </div>
                {addressData && (
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="font-semibold text-foreground">
                      {addressData.fullName}
                    </p>
                    <p>{addressData.phone}</p>
                    <p>
                      {addressData.addressLine}, {addressData.district} /{' '}
                      {addressData.city}
                    </p>
                    {addressData.postalCode && <p>{addressData.postalCode}</p>}
                  </div>
                )}
              </div>

              {/* Payment Form */}
              <div className="bg-white border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6">Ödeme Bilgileri</h2>
                <PaymentForm onSubmit={handlePaymentSubmit} />
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary
              subtotal={totalPrice}
              shippingCost={0}
              discount={0}
              total={totalPrice}
            />

            {/* Cart Items Preview */}
            <div className="mt-4 bg-white border rounded-xl p-4">
              <h3 className="font-semibold mb-3 text-sm">
                Sipariş Özeti ({items.length} ürün)
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate mr-2">
                      {item.quantity}x {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
