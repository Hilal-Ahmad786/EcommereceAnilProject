'use client'

import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  image: string
  category?: string
  stock: number
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  comparePrice,
  image,
  category,
  stock,
}: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(id))
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const removeFromWishlist = useWishlistStore((state) => state.removeItem)
  const addToCart = useCartStore((state) => state.addItem)

  const calculateDiscount = () => {
    if (!comparePrice) return 0
    return Math.round(((comparePrice - price) / comparePrice) * 100)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isInWishlist) {
      removeFromWishlist(id)
    } else {
      addToWishlist({
        productId: id,
        name,
        price,
        image,
        slug,
      })
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAddingToCart(true)
    
    addToCart({
      id: `${id}-default`,
      productId: id,
      name,
      price,
      image,
      quantity: 1,
    })

    setTimeout(() => setIsAddingToCart(false), 1000)
  }

  const discount = calculateDiscount()

  return (
    <Link href={`/urunler/${slug}`} className="group block">
      <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all">
        {/* Image Container */}
        <div className="relative aspect-square bg-natural-100 overflow-hidden">
          {/* Placeholder Image */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <div className="text-5xl mb-2">🛋️</div>
              <p className="text-xs">Ürün Görseli</p>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {discount > 0 && (
              <div className="bg-sage-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                %{discount} İndirim
              </div>
            )}
            {stock <= 5 && stock > 0 && (
              <div className="bg-clay-400 text-white text-xs font-bold px-2 py-1 rounded-full ml-auto">
                Son {stock} Adet
              </div>
            )}
            {stock === 0 && (
              <div className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded-full ml-auto">
                Stokta Yok
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              isInWishlist
                ? 'bg-sage-500 text-white'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
            aria-label={isInWishlist ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          >
            <Heart
              className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`}
            />
          </button>

          {/* Quick Add to Cart */}
          {stock > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <ShoppingCart className="h-4 w-4" />
                {isAddingToCart ? 'Eklendi!' : 'Sepete Ekle'}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {category && (
            <p className="text-xs text-muted-foreground mb-1">{category}</p>
          )}
          <h3 className="font-semibold text-lg mb-2 group-hover:text-walnut-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-walnut-600">
              {formatPrice(price)}
            </span>
            {comparePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}