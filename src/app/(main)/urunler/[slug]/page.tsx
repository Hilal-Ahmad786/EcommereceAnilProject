// src/app/(main)/urunler/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductDetailClient from '@/components/product/ProductDetailClient'

async function getProduct(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' } },
      woodFinishes: {
        include: { woodFinish: true }
      },
      reviews: {
        where: { isApproved: true },
        include: {
          user: { select: { name: true, image: true } }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

export default async function ProductDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  // Transform data for client component
  const transformedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDescription: product.shortDescription || '',
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : undefined,
    stock: product.stock,
    category: product.category.name,
    images: product.images.map(img => img.url),
    dimensions: product.dimensions as any,
    weight: product.weight ? Number(product.weight) : undefined,
    weightUnit: product.weightUnit || 'kg',
    woodFinishes: product.woodFinishes.map(wf => ({
      id: wf.woodFinish.slug,
      name: wf.woodFinish.name,
      hexColor: wf.woodFinish.hexColor,
      priceModifier: wf.priceModifier ? Number(wf.priceModifier) : 0
    })),
    reviews: product.reviews.map(review => ({
      id: review.id,
      userName: review.user.name || 'Anonim',
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      createdAt: review.createdAt.toISOString()
    }))
  }

  return <ProductDetailClient product={transformedProduct} />
}