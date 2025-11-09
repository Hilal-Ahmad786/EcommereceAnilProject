// src/app/(main)/page.tsx
import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/home/HeroSection'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import BlogPreview from '@/components/home/BlogPreview'
import NewsletterSection from '@/components/home/NewsletterSection'
import ProductCard from '@/components/product/ProductCard'
import FeaturedProducts from '@/components/home/FeaturedProducts'

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
      
      {/* Use your FeaturedProducts component with hardcoded images */}
      <FeaturedProducts />
      
      <CategoryShowcase categories={categories} />
      <BlogPreview />
      <NewsletterSection />
    </main>
  )
}