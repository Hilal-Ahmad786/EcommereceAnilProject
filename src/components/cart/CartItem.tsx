'use client'

import { Trash2, Minus, Plus } from 'lucide-react'
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const itemTotal = (item.price + (item.woodFinish?.priceModifier || 0)) * item.quantity

  return (
    <div className="flex gap-4 bg-white border rounded-lg p-3">
      {/* Image */}
      <div className="w-20 h-20 bg-natural-100 rounded-lg flex-shrink-0 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-2xl">
          🛋️
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</h3>
        
        {item.woodFinish && (
          <p className="text-xs text-muted-foreground mb-2">
            Renk: {item.woodFinish.name}
            {item.woodFinish.priceModifier && item.woodFinish.priceModifier !== 0 && (
              <span> ({item.woodFinish.priceModifier > 0 ? '+' : ''}{formatPrice(item.woodFinish.priceModifier)})</span>
            )}
          </p>
        )}

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center border rounded hover:bg-natural-100 transition-colors"
              aria-label="Azalt"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center border rounded hover:bg-natural-100 transition-colors"
              aria-label="Artır"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="font-bold text-walnut-600">{formatPrice(itemTotal)}</p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors self-start"
        aria-label="Sepetten çıkar"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}