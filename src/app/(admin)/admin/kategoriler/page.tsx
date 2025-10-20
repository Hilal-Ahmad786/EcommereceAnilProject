'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, MoveUp, MoveDown } from 'lucide-react'

export default function AdminCategoriesPage() {
  // TODO: Fetch from API
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Mutfak Dolabı',
      slug: 'mutfak-dolabi',
      productCount: 24,
      order: 1,
      isActive: true,
    },
    {
      id: '2',
      name: 'Mutfak Adası',
      slug: 'mutfak-adasi',
      productCount: 12,
      order: 2,
      isActive: true,
    },
    {
      id: '3',
      name: 'Tezgah',
      slug: 'tezgah',
      productCount: 18,
      order: 3,
      isActive: true,
    },
    {
      id: '4',
      name: 'Bar Sandalyesi',
      slug: 'bar-sandalyesi',
      productCount: 8,
      order: 4,
      isActive: true,
    },
    {
      id: '5',
      name: 'Mutfak Masası',
      slug: 'mutfak-masasi',
      productCount: 15,
      order: 5,
      isActive: false,
    },
  ])

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setCategories(categories.filter((cat) => cat.id !== id))
      alert('Kategori silindi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleMoveUp = (index: number) => {
    if (index === 0) return
    const newCategories = [...categories]
    ;[newCategories[index], newCategories[index - 1]] = [
      newCategories[index - 1],
      newCategories[index],
    ]
    setCategories(newCategories)
  }

  const handleMoveDown = (index: number) => {
    if (index === categories.length - 1) return
    const newCategories = [...categories]
    ;[newCategories[index], newCategories[index + 1]] = [
      newCategories[index + 1],
      newCategories[index],
    ]
    setCategories(newCategories)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Kategoriler</h1>
          <p className="text-muted-foreground">Ürün kategorilerini yönetin</p>
        </div>
        <Link
          href="/admin/kategoriler/yeni"
          className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Kategori
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Kategori</p>
          <p className="text-3xl font-bold text-walnut-700">{categories.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Aktif Kategoriler</p>
          <p className="text-3xl font-bold text-sage-600">
            {categories.filter((c) => c.isActive).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Ürün</p>
          <p className="text-3xl font-bold text-walnut-700">
            {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
          </p>
        </div>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Kategori Listesi</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Kategorileri sürükleyerek sıralama yapabilirsiniz
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-natural-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Sıra</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Kategori</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Slug</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Ürün Sayısı</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Durum</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {categories.map((category, index) => (
                <tr key={category.id} className="hover:bg-natural-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 hover:bg-natural-100 rounded disabled:opacity-30"
                        title="Yukarı taşı"
                      >
                        <MoveUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === categories.length - 1}
                        className="p-1 hover:bg-natural-100 rounded disabled:opacity-30"
                        title="Aşağı taşı"
                      >
                        <MoveDown className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-muted-foreground ml-2">
                        {category.order}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-natural-100 rounded-lg flex items-center justify-center text-2xl">
                        🗂️
                      </div>
                      <div>
                        <p className="font-semibold">{category.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-walnut-100 text-walnut-700 text-sm font-semibold rounded-full">
                      {category.productCount} ürün
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        category.isActive
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/urunler/kategori/${category.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="Önizle"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Link>
                      <Link
                        href={`/admin/kategoriler/duzenle/${category.id}`}
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="h-4 w-4 text-walnut-600" />
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Kategori İpuçları</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Kategorileri sürükleyerek sıralama yapabilirsiniz</li>
          <li>• Her kategorinin benzersiz bir slug'ı olmalıdır</li>
          <li>• Kategori silindiğinde içindeki ürünler "kategorisiz" olur</li>
          <li>• Ana kategoriler altında alt kategoriler oluşturabilirsiniz</li>
        </ul>
      </div>
    </div>
  )
}