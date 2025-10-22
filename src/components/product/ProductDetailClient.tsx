// src/components/product/ProductDetailClient.tsx

'use client'

import { useEffect, useMemo, useState } from 'react'
import { ShoppingCart, Heart, Truck, Shield, Ruler } from 'lucide-react'
import ProductGallery from '@/components/product/ProductGallery'
import WoodFinishSelector from '@/components/product/WoodFinishSelector'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatPrice } from '@/lib/utils'

interface ProductDetailClientProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    shortDescription?: string
    price: number
    comparePrice?: number
    stock: number
    category: string
    images: string[]
    dimensions?: {
      width: number
      height: number
      depth: number
      unit: string
    }
    weight?: number
    weightUnit?: string
    woodFinishes: Array<{
      id: string
      name: string
      hexColor: string
      priceModifier: number
    }>
    reviews?: Array<{
      id: string
      userName: string
      rating: number
      title?: string
      comment: string
      createdAt: string
    }>
  }
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [quantity, setQuantity] = useState(1)
  const [selectedFinish, setSelectedFinish] = useState(
    product.woodFinishes?.[0]?.id ?? ''
  )

  const addToCart = useCartStore((s) => s.addItem)
  const addToWishlist = useWishlistStore((s) => s.addItem)
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id))

  const selectedFinishData = useMemo(
    () => product.woodFinishes.find((f) => f.id === selectedFinish),
    [product.woodFinishes, selectedFinish]
  )

  const finalPrice = product.price + (selectedFinishData?.priceModifier || 0)
  const image0 = product.images?.[0] ?? '/placeholder.jpg'

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedFinish || 'default'}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      image: image0,
      quantity,
      woodFinish: selectedFinishData
        ? {
            id: selectedFinishData.id,
            name: selectedFinishData.name,
            priceModifier: selectedFinishData.priceModifier,
          }
        : undefined,
    })
  }

  const handleWishlistToggle = () => {
    if (!isInWishlist) {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: image0,
        slug: product.slug,
      })
    }
  }

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Gallery */}
        <div>
          <ProductGallery images={product.images?.length ? product.images : [image0]} productName={product.name} />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-walnut-700">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-walnut-600">
              {formatPrice(finalPrice)}
            </span>
            {product.comparePrice ? (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="bg-sage-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                  %{discount} İndirim
                </span>
              </>
            ) : null}
          </div>

          {product.shortDescription ? (
            <p className="text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
          ) : null}

          {/* Wood Finish Selector */}
          {product.woodFinishes.length > 0 && (
            <WoodFinishSelector
              finishes={product.woodFinishes}
              selectedFinish={selectedFinish}
              onSelect={setSelectedFinish}
            />
          )}

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold mb-2">Adet</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 border rounded-lg hover:bg-natural-100 transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 h-10 text-center border rounded-lg"
                min={1}
              />
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 border rounded-lg hover:bg-natural-100 transition-colors"
              >
                +
              </button>
              <span className="text-sm text-muted-foreground ml-2">
                Stok: {product.stock} adet
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              Sepete Ekle
            </button>

            {/* Render wishlist styling only after mount to avoid hydration mismatch */}
            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`p-4 border-2 rounded-lg transition-colors ${
                mounted && isInWishlist
                  ? 'border-sage-500 bg-sage-50 text-sage-600'
                  : 'border-gray-300 hover:border-sage-500'
              }`}
              aria-pressed={mounted ? isInWishlist : false}
            >
              <Heart className={`h-6 w-6 ${mounted && isInWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-sage-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Ücretsiz Kargo</p>
                <p className="text-xs text-muted-foreground">Tüm siparişlerde</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-sage-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">2 Yıl Garanti</p>
                <p className="text-xs text-muted-foreground">Üretim hatalarına</p>
              </div>
            </div>
            {product.dimensions && (
              <div className="flex items-start gap-3">
                <Ruler className="h-5 w-5 text-sage-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm">
                    {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} {product.dimensions.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">Boyutlar</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="pt-6 border-t">
            <h3 className="font-bold text-lg mb-4">Ürün Açıklaması</h3>
            <div
              className="prose prose-sm max-w-none text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
