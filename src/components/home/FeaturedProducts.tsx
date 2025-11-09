import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'  

export default function FeaturedProducts() {
  // TODO: Fetch from database
const featuredProducts = [
    {
      id: '1',
      name: 'Modern Mutfak Dolabı',
      price: 12999,
      comparePrice: 15999,
      image: '/images/Featured/1.webp',  // ← Changed
      slug: 'modern-mutfak-dolabi',
    },
    {
      id: '2',
      name: 'Ahşap Mutfak Adası',
      price: 24999,
      comparePrice: null,
      image: '/images/Featured/2.webp',  // ← Changed
      slug: 'ahsap-mutfak-adasi',
    },
    {
      id: '3',
      name: 'Mermer Tezgah',
      price: 18999,
      comparePrice: 21999,
      image: '/images/Featured/3.webp',  // ← Changed
      slug: 'mermer-tezgah',
    },
    {
      id: '4',
      name: 'Bar Sandalyesi Seti',
      price: 4999,
      comparePrice: null,
      image: '/images/Featured/1.webp',  // ← Changed (reusing 1.webp for 4th product)
      slug: 'bar-sandalyesi-seti',
    },
  ]
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const calculateDiscount = (price: number, comparePrice: number) => {
    return Math.round(((comparePrice - price) / comparePrice) * 100)
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-muted-foreground">
              En çok tercih edilen mutfak mobilyalarımız
            </p>
          </div>
          <Link
            href="/urunler"
            className="hidden md:flex items-center text-walnut-600 hover:text-walnut-700 font-semibold"
          >
            Tümünü Gör
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/urunler/${product.slug}`}
              className="group"
            >
              <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                {/* Image */}
                <div className="relative aspect-square bg-natural-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.comparePrice && (
                    <div className="absolute top-3 right-3 bg-sage-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      %{calculateDiscount(product.price, product.comparePrice)} İndirim
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-walnut-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-walnut-600">
                      {formatPrice(product.price)}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/urunler"
            className="inline-flex items-center text-walnut-600 hover:text-walnut-700 font-semibold"
          >
            Tümünü Gör
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}