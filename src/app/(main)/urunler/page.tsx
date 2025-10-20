'use client'

import { useState } from 'react'
import ProductGrid from '@/components/product/ProductGrid'
import ProductFilter from '@/components/product/ProductFilter'

export default function ProductsPage() {
  // TODO: Fetch from database
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
      id: '2',
      name: 'Ahşap Mutfak Adası',
      slug: 'ahsap-mutfak-adasi',
      price: 24999,
      image: '/images/products/2.jpg',
      category: 'Mutfak Adası',
      stock: 8,
    },
    {
      id: '3',
      name: 'Mermer Tezgah',
      slug: 'mermer-tezgah',
      price: 18999,
      comparePrice: 21999,
      image: '/images/products/3.jpg',
      category: 'Tezgah',
      stock: 3,
    },
    {
      id: '4',
      name: 'Bar Sandalyesi Seti',
      slug: 'bar-sandalyesi-seti',
      price: 4999,
      image: '/images/products/4.jpg',
      category: 'Bar Sandalyesi',
      stock: 20,
    },
    {
      id: '5',
      name: 'Klasik Mutfak Dolabı',
      slug: 'klasik-mutfak-dolabi',
      price: 14999,
      image: '/images/products/5.jpg',
      category: 'Mutfak Dolabı',
      stock: 0,
    },
    {
      id: '6',
      name: 'Modern Mutfak Masası',
      slug: 'modern-mutfak-masasi',
      price: 8999,
      comparePrice: 10999,
      image: '/images/products/6.jpg',
      category: 'Mutfak Masası',
      stock: 12,
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
          Tüm Ürünler
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
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}