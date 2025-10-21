import { prisma } from "@/lib/prisma"
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'

interface SearchParams {
  kategori?: string
  arama?: string
}

async function getProducts(searchParams: SearchParams) {
  const where: any = { isActive: true }
  
  if (searchParams.kategori) {
    const category = await prisma.category.findUnique({
      where: { slug: searchParams.kategori }
    })
    if (category) where.categoryId = category.id
  }
  
  if (searchParams.arama) {
    where.OR = [
      { name: { contains: searchParams.arama, mode: 'insensitive' } },
      { description: { contains: searchParams.arama, mode: 'insensitive' } }
    ]
  }

  return await prisma.product.findMany({
    where,
    include: {
      category: true,
      images: { orderBy: { order: 'asc' }, take: 1 }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ProductsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const products = await getProducts(searchParams)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Tüm Ürünler
        </h1>
        <p className="text-muted-foreground">
          {products.length} ürün bulundu
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <ProductFilter />
        </div>
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}