// src/components/home/CategoryShowcase.tsx
import Link from 'next/link'

interface Category {
  id: string
  slug: string
  name: string
  image?: string | null
  _count?: {
    products: number
  }
}

interface CategoryShowcaseProps {
  categories: Category[]
}

// Hardcoded category images mapping
const categoryImages: Record<string, string> = {
  '0': '/images/Categori/1.webp',
  '1': '/images/Categori/2.webp',
  '2': '/images/Categori/3.webp',
  '3': '/images/Categori/4.webp',
}

export default function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-4">
          Kategoriler
        </h2>
        <p className="text-muted-foreground">
          Mutfak mobilyası kategorilerimize göz atın
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/urunler?kategori=${category.slug}`}
            className="group relative aspect-square rounded-xl overflow-hidden"
          >
            {/* Background Image or Color */}
            <div className="absolute inset-0 bg-gradient-to-br from-walnut-400 to-walnut-600">
              <img
                src={category.image || categoryImages[index.toString()] || '/images/Categori/1.webp'}
                alt={category.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-300"
              />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
              <h3 className="text-2xl font-bold mb-2 text-center">
                {category.name}
              </h3>
              {category._count && (
                <p className="text-sm opacity-90">
                  {category._count.products} ürün
                </p>
              )}
              <div className="mt-4 px-4 py-2 bg-white text-walnut-600 rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Kategoriye Git →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}