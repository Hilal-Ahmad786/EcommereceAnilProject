'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    comparePrice: '',
    stock: '',
    lowStockThreshold: '5',
    description: '',
    shortDescription: '',
    dimensions: {
      width: '',
      height: '',
      depth: '',
    },
    weight: '',
    isActive: true,
    featured: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Ürün başarıyla eklendi')
      router.push('/admin/urunler')
    } catch (error) {
      alert('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/urunler"
            className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-walnut-700">Yeni Ürün Ekle</h1>
            <p className="text-muted-foreground">Yeni bir ürün oluşturun</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Temel Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ürün Adı *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Modern Mutfak Dolabı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="modern-mutfak-dolabi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Kısa Açıklama</label>
                  <textarea
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, shortDescription: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Ürünün kısa açıklaması..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Detaylı Açıklama *</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Ürünün detaylı açıklaması..."
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Fiyat ve Stok</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fiyat (₺) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="12999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    İndirimli Fiyat (₺)
                  </label>
                  <input
                    type="number"
                    value={formData.comparePrice}
                    onChange={(e) => setFormData({ ...formData, comparePrice: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="15999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Stok Adedi *</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Düşük Stok Uyarısı
                  </label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) =>
                      setFormData({ ...formData, lowStockThreshold: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="5"
                  />
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Boyutlar ve Ağırlık</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Genişlik (cm)</label>
                  <input
                    type="number"
                    value={formData.dimensions.width}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, width: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Yükseklik (cm)</label>
                  <input
                    type="number"
                    value={formData.dimensions.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, height: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Derinlik (cm)</label>
                  <input
                    type="number"
                    value={formData.dimensions.depth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: { ...formData.dimensions, depth: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Ağırlık (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Kategori</h3>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              >
                <option value="">Seçiniz</option>
                <option value="mutfak-dolabi">Mutfak Dolabı</option>
                <option value="mutfak-adasi">Mutfak Adası</option>
                <option value="tezgah">Tezgah</option>
                <option value="bar-sandalyesi">Bar Sandalyesi</option>
              </select>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Ürün Görselleri</h3>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Görselleri yükleyin
                </p>
                <button
                  type="button"
                  className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold"
                >
                  Dosya Seç
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Durum</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                  />
                  <span className="text-sm">Aktif</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                  />
                  <span className="text-sm">Öne Çıkan Ürün</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {isLoading ? 'Kaydediliyor...' : 'Ürünü Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}