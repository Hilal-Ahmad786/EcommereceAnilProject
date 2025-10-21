
// ============================================
// FILE: src/app/(admin)/admin/products/page.tsx
// Admin Products Page with Real Data
// ============================================

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })
}

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions)
  
  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login')
  }

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-walnut-800">Ürünler</h1>
        <a
          href="/admin/products/new"
          className="bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-walnut-700"
        >
          + Yeni Ürün Ekle
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm mb-1">Toplam Ürün</p>
          <p className="text-3xl font-bold text-walnut-800">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm mb-1">Stokta</p>
          <p className="text-3xl font-bold text-green-600">
            {products.filter(p => p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm mb-1">Stok Yok</p>
          <p className="text-3xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-gray-600 text-sm mb-1">Öne Çıkan</p>
          <p className="text-3xl font-bold text-sage-600">
            {products.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Ürün
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Fiyat
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Stok
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Durum
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {product.image && (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm">
                    {product.category.name}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">
                  {product.price.toLocaleString('tr-TR')} ₺
                </td>
                <td className="px-6 py-4">
                  <span className={`font-semibold ${
                    product.stock > 10 ? 'text-green-600' :
                    product.stock > 0 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {product.featured && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                      ⭐ Öne Çıkan
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <a
                      href={`/admin/products/edit/${product.id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                    >
                      Düzenle
                    </a>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                      onClick={() => {
                        if (confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
                          // Delete handler will be added
                        }
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Henüz ürün eklenmemiş
          </div>
        )}
      </div>
    </div>
  )
}