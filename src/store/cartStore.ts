import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  woodFinish?: {
    id: string
    name: string
    priceModifier?: number
  }
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const existingItem = items.find((i) => i.id === item.id)

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          })
        } else {
          set({ items: [...items, item] })
        }

        // Track add to cart event for analytics
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'add_to_cart', {
            currency: 'TRY',
            value: item.price * item.quantity,
            items: [
              {
                item_id: item.productId,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
              },
            ],
          })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) })
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const itemPrice = item.price + (item.woodFinish?.priceModifier || 0)
          return total + itemPrice * item.quantity
        }, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)