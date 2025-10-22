// src/app/(admin)/admin/urunler/page.tsx
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye } from "lucide-react"

export const dynamic = "force-dynamic"

async function getProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
      images: { take: 1, orderBy: { order: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  const inStock = products.filter((p) => p.stock > 0).length
  const outOfStock = products.filter((p) => p.stock === 0).length
  const featuredCount = products.filter((p) => p.featured).length

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Ürün</p>
          <p className="text-3xl font-bold text-walnut-700">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Stokta</p>
          <p className="text-3xl font-bold text-green-600">{inStock}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Stok Yok</p>
          <p className="text-3xl font-bold text-red-600">{outOfStock}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Öne Çıkan</p>
          <p className="text-3xl font-bold text-sage-600">{featuredCount}</p>
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
                      <div className="w-12 h-12 bg-natural-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {product.images[0]?.url ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🛋️
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {product.id.slice(0, 8)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{product.category?.name ?? "-"}</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {Number(product.price).toLocaleString("tr-TR")} ₺
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock} adet
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        product.isActive
                          ? "bg-sage-100 text-sage-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.isActive ? "Aktif" : "Pasif"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/urunler/${product.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="Önizle"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Link>
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

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Henüz ürün eklenmemiş. İlk ürünü eklemek için yukarıdaki butona tıklayın.
          </div>
        )}
      </div>
    </div>
  )
}
