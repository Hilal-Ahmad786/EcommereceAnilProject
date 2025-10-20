import ProductCard from './ProductCard'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  comparePrice?: number
  image: string
  category?: string
  stock: number
}

interface ProductGridProps {
  products: Product[]
  emptyMessage?: string
}

export default function ProductGrid({
  products,
  emptyMessage = 'Ürün bulunamadı',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-muted-foreground mb-2">
          {emptyMessage}
        </h3>
        <p className="text-muted-foreground">
          Farklı filtreler deneyebilir veya daha sonra tekrar kontrol edebilirsiniz.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}