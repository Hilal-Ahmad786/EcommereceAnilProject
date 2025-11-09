// src/app/(main)/page.tsx
import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/home/HeroSection'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import BlogPreview from '@/components/home/BlogPreview'
import NewsletterSection from '@/components/home/NewsletterSection'
import ProductCard from '@/components/product/ProductCard'

async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      isActive: true,
      featured: true
    },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' }, take: 1 }
    },
    orderBy: { createdAt: 'desc' },
    take: 8
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    where: { parentId: null },
    include: {
      _count: { select: { products: true } }
    },
    orderBy: { order: 'asc' },
    take: 4
  })
}

export default async function HomePage() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ])

  return (
    <main>
      <HeroSection />
      
      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-4">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-muted-foreground">
              En beğenilen mutfak mobilyalarımız
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={Number(product.price)}
                comparePrice={product.comparePrice ? Number(product.comparePrice) : undefined}
                image={product.images[0]?.url || '/placeholder.jpg'}
                stock={product.stock}
              />
            ))}
          </div>
        </section>
      )}
      
      <CategoryShowcase categories={categories} />
      <BlogPreview />
      <NewsletterSection />
    </main>
  )
}