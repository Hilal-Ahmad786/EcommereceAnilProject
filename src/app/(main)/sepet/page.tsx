'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const totalPrice = useCartStore((state) => state.getTotalPrice())
  const clearCart = useCartStore((state) => state.clearCart)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="text-3xl font-bold text-walnut-700 mb-4">
            Sepetiniz Boş
          </h1>
          <p className="text-muted-foreground mb-8">
            Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimize göz atın.
          </p>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            Alışverişe Başla
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Sepetim
        </h1>
        <p className="text-muted-foreground">
          {items.length} ürün
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items List */}
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sepeti Temizle
          </button>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <CartSummary
              subtotal={totalPrice}
              shippingCost={0}
              discount={0}
              total={totalPrice}
            />

            {/* ✅ Checkout Button → now points to /checkout */}
            <Link
              href="/checkout"
              className="block w-full bg-walnut-500 hover:bg-walnut-600 text-white text-center py-4 rounded-lg font-semibold transition-colors"
            >
              Ödemeye Geç
              <ArrowRight className="inline-block ml-2 h-5 w-5" />
            </Link>

            {/* Continue Shopping */}
            <Link
              href="/urunler"
              className="block w-full text-center text-walnut-600 hover:text-walnut-700 py-3 font-medium"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
