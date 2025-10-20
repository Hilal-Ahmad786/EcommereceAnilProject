'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { ShoppingCart, Heart, Truck, Shield, Ruler } from 'lucide-react'
import ProductGallery from '@/components/product/ProductGallery'
import WoodFinishSelector from '@/components/product/WoodFinishSelector'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedFinish, setSelectedFinish] = useState('ceviz')
  const addToCart = useCartStore((state) => state.addItem)
  const addToWishlist = useWishlistStore((state) => state.addItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist('1'))

  // TODO: Fetch product from database using params.slug
  const product = {
    id: '1',
    name: 'Modern Mutfak Dolabı',
    slug: params.slug as string,
    price: 12999,
    comparePrice: 15999,
    description:
      'Premium kalitede, modern tasarımlı mutfak dolabı. Dayanıklı malzeme ve özel üretim detayları ile uzun ömürlü kullanım.',
    images: ['1.jpg', '2.jpg', '3.jpg', '4.jpg'],
    category: 'Mutfak Dolabı',
    stock: 15,
    dimensions: { width: 120, height: 200, depth: 60, unit: 'cm' },
    woodFinishes: [
      { id: 'ceviz', name: 'Ceviz', hexColor: '#8B7355', priceModifier: 0 },
      { id: 'oak', name: 'Meşe', hexColor: '#C9A96E', priceModifier: 500 },
      { id: 'beyaz', name: 'Beyaz', hexColor: '#F5F5F0', priceModifier: -500 },
      { id: 'siyah', name: 'Siyah', hexColor: '#333333', priceModifier: 0 },
    ],
  }

  const selectedFinishData = product.woodFinishes.find(
    (f) => f.id === selectedFinish
  )
  const finalPrice = product.price + (selectedFinishData?.priceModifier || 0)

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedFinish}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      image: product.images[0],
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
    if (isInWishlist) {
      // Remove from wishlist
    } else {
      addToWishlist({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
      })
    }
  }

  const discount = Math.round(
    ((product.comparePrice! - product.price) / product.comparePrice!) * 100
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          {/* Category */}
          <p className="text-sm text-muted-foreground">{product.category}</p>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-walnut-700">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-walnut-600">
              {formatPrice(finalPrice)}
            </span>
            {product.comparePrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.comparePrice)}
                </span>
                <span className="bg-sage-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                  %{discount} İndirim
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Wood Finish Selector */}
          <WoodFinishSelector
            finishes={product.woodFinishes}
            selectedFinish={selectedFinish}
            onSelect={setSelectedFinish}
          />

          {/* Quantity Selector */}
          <div>
            <label className="block text-sm font-semibold mb-2">Adet</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-lg hover:bg-natural-100 transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-20 h-10 text-center border rounded-lg"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
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
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5" />
              Sepete Ekle
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`p-4 border-2 rounded-lg transition-colors ${
                isInWishlist
                  ? 'border-sage-500 bg-sage-50 text-sage-600'
                  : 'border-gray-300 hover:border-sage-500'
              }`}
              aria-label="Favorilere ekle"
            >
              <Heart
                className={`h-6 w-6 ${isInWishlist ? 'fill-current' : ''}`}
              />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
            <div className="flex items-start gap-3">
              <Truck className="h-5 w-5 text-sage-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Ücretsiz Kargo</p>
                <p className="text-xs text-muted-foreground">
                  Tüm siparişlerde
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-sage-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">2 Yıl Garanti</p>
                <p className="text-xs text-muted-foreground">
                  Üretim hatalarına karşı
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ruler className="h-5 w-5 text-sage-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">
                  {product.dimensions.width}x{product.dimensions.height}x
                  {product.dimensions.depth} {product.dimensions.unit}
                </p>
                <p className="text-xs text-muted-foreground">Boyutlar</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="pt-6 border-t space-y-4">
            <h3 className="font-bold text-lg">Ürün Özellikleri</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Premium kalite ahşap malzeme</li>
              <li>• Su ve nem dirençli yüzey kaplama</li>
              <li>• Kolay temizlenebilir yüzey</li>
              <li>• Profesyonel montaj desteği</li>
              <li>• 5 yıl renk garantisi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}