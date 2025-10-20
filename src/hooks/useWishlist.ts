
// ============================================
// src/hooks/useWishlist.ts
// ============================================
import { useWishlistStore } from '@/store/wishlistStore'

export function useWishlist() {
  const items = useWishlistStore((state) => state.items)
  const addItem = useWishlistStore((state) => state.addItem)
  const removeItem = useWishlistStore((state) => state.removeItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)
  const clearWishlist = useWishlistStore((state) => state.clearWishlist)

  return {
    items,
    addItem,
    removeItem,
    isInWishlist,
    clearWishlist,
    count: items.length,
  }
}
