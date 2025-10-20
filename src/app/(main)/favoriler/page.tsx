'use client'

import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlistStore'
import ProductCard from '@/components/product/ProductCard'

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="text-8xl mb-6">💝</div>
          <h1 className="text-3xl font-bold text-walnut-700 mb-4">
            Favori Listeniz Boş
          </h1>
          <p className="text-muted-foreground mb-8">
            Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca ulaşabilirsiniz.
          </p>
          <Link
            href="/urunler"
            className="inline-flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            <ShoppingBag className="h-5 w-5" />
            Ürünleri Keşfet
          </Link>
        </div>
      </div>
    )
  }

  // Convert wishlist items to ProductCard format
  const products = items.map((item) => ({
    id: item.productId,
    name: item.name,
    slug: item.slug,
    price: item.price,
    image: item.image,
    stock: 10, // TODO: Fetch actual stock from API
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
            Favorilerim
          </h1>
          <p className="text-muted-foreground">
            {items.length} ürün
          </p>
        </div>
        <Heart className="h-8 w-8 text-sage-500 fill-current" />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}