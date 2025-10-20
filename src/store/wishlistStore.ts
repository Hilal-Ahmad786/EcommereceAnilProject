import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  productId: string
  name: string
  price: number
  image: string
  slug: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const exists = items.some((i) => i.productId === item.productId)

        if (!exists) {
          set({ items: [...items, item] })

          // Track wishlist event for analytics
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'add_to_wishlist', {
              currency: 'TRY',
              value: item.price,
              items: [
                {
                  item_id: item.productId,
                  item_name: item.name,
                  price: item.price,
                },
              ],
            })
          }
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.productId !== productId) })
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.productId === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)