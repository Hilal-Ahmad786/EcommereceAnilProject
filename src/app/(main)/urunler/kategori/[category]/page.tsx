'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.category as string

  // TODO: Fetch from database
  const categoryMap: Record<string, string> = {
    'mutfak-dolabi': 'Mutfak Dolabı',
    'mutfak-adasi': 'Mutfak Adası',
    'tezgah': 'Tezgah',
    'bar-sandalyesi': 'Bar Sandalyesi',
    'mutfak-masasi': 'Mutfak Masası',
  }

  const categoryName = categoryMap[categorySlug] || 'Kategori'

  // TODO: Filter products by category
  const [products] = useState([
    {
      id: '1',
      name: 'Modern Mutfak Dolabı',
      slug: 'modern-mutfak-dolabi',
      price: 12999,
      comparePrice: 15999,
      image: '/images/products/1.jpg',
      category: 'Mutfak Dolabı',
      stock: 15,
    },
    {
      id: '5',
      name: 'Klasik Mutfak Dolabı',
      slug: 'klasik-mutfak-dolabi',
      price: 14999,
      image: '/images/products/5.jpg',
      category: 'Mutfak Dolabı',
      stock: 8,
    },
  ])

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters)
    // TODO: Implement filtering logic
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          {categoryName}
        </h1>
        <p className="text-muted-foreground">
          {products.length} ürün bulundu
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={products}
            emptyMessage={`${categoryName} kategorisinde ürün bulunamadı`}
          />
        </div>
      </div>
    </div>
  )
}