'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import CartItem from './CartItem'
import { formatPrice } from '@/lib/utils'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const totalPrice = useCartStore((state) => state.getTotalPrice())
  const totalItems = useCartStore((state) => state.getTotalItems())

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            Sepetim ({totalItems} ürün)
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
            aria-label="Sepeti kapat"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-muted-foreground mb-4">
                Sepetiniz boş
              </p>
              <button
                onClick={onClose}
                className="text-walnut-600 hover:text-walnut-700 font-semibold"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Toplam:</span>
              <span className="text-walnut-600">{formatPrice(totalPrice)}</span>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Link
                href="/odeme"
                onClick={onClose}
                className="block w-full bg-walnut-500 hover:bg-walnut-600 text-white text-center py-3 rounded-lg font-semibold transition-colors"
              >
                Ödemeye Geç
              </Link>
              <Link
                href="/sepet"
                onClick={onClose}
                className="block w-full border-2 border-walnut-500 text-walnut-500 text-center py-3 rounded-lg font-semibold hover:bg-walnut-50 transition-colors"
              >
                Sepeti Görüntüle
              </Link>
            </div>

            {/* Free Shipping Info */}
            <p className="text-xs text-center text-muted-foreground">
              🚚 Tüm siparişlerde ücretsiz kargo
            </p>
          </div>
        )}
      </div>
    </>
  )
}