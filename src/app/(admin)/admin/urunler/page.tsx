'use client'

import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { useState } from 'react'

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  // TODO: Fetch from API
  const products = [
    {
      id: '1',
      name: 'Modern Mutfak Dolabı',
      category: 'Mutfak Dolabı',
      price: 12999,
      stock: 15,
      status: 'active',
      image: '/images/product1.jpg',
    },
    {
      id: '2',
      name: 'Ahşap Mutfak Adası',
      category: 'Mutfak Adası',
      price: 24999,
      stock: 8,
      status: 'active',
      image: '/images/product2.jpg',
    },
    {
      id: '3',
      name: 'Mermer Tezgah',
      category: 'Tezgah',
      price: 18999,
      stock: 3,
      status: 'active',
      image: '/images/product3.jpg',
    },
    {
      id: '4',
      name: 'Bar Sandalyesi Seti',
      category: 'Bar Sandalyesi',
      price: 4999,
      stock: 0,
      status: 'inactive',
      image: '/images/product4.jpg',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Ürünler</h1>
          <p className="text-muted-foreground">Ürünlerinizi yönetin</p>
        </div>
        <Link
          href="/admin/urunler/yeni"
          className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>
          <select className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500">
            <option value="">Tüm Kategoriler</option>
            <option value="mutfak-dolabi">Mutfak Dolabı</option>
            <option value="mutfak-adasi">Mutfak Adası</option>
            <option value="tezgah">Tezgah</option>
          </select>
          <select className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500">
            <option value="">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-natural-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Ürün</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Fiyat</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Stok</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Durum</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-natural-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-natural-100 rounded-lg flex-shrink-0">
                        <div className="w-full h-full flex items-center justify-center text-2xl">
                          🛋️
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {product.price.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-700'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {product.stock} adet
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        product.status === 'active'
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-natural-100 rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <Link
                        href={`/admin/urunler/duzenle/${product.id}`}
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4 text-walnut-600" />
                      </Link>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Toplam {products.length} ürün gösteriliyor
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
              Önceki
            </button>
            <button className="px-4 py-2 bg-walnut-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}