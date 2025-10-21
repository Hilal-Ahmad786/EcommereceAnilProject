// src/components/wishlist/WishlistButton.tsx
'use client'
import { Heart } from 'lucide-react'

export default function WishlistButton({ productId, isInWishlist, onClick }: any) {
  return (
    <button onClick={onClick} className="p-2 rounded-full hover:bg-natural-100">
      <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current text-sage-500' : ''}`} />
    </button>
  )
}