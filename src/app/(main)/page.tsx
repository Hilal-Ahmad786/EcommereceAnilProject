import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryShowcase from '@/components/home/CategoryShowcase'
import BlogPreview from '@/components/home/BlogPreview'
import NewsletterSection from '@/components/home/NewsletterSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <BlogPreview />
      <NewsletterSection />
    </main>
  )
}