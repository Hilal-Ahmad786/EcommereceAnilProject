'use client'

import { useState } from 'react'
import { Save, Eye, EyeOff } from 'lucide-react'

export default function TopBannerSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    isActive: true,
    text: '🎉 Yeni Sezon Koleksiyonu! Tüm Ürünlerde %20 İndirim',
    link: '/urunler',
    backgroundColor: '#8B7355',
    textColor: '#FFFFFF',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Üst banner ayarları kaydedildi')
    } catch (error) {
      alert('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Üst Banner Ayarları</h1>
        <p className="text-muted-foreground">
          Ana sayfa üst kısmında görünen duyuru banner'ını düzenleyin
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Settings Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Banner Content */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Banner İçeriği</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                    />
                    <span className="text-sm font-medium">Banner'ı Aktif Et</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Banner Metni *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Duyuru metnini buraya yazın..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Emoji kullanabilirsiniz: 🎉 🔥 ⭐ 🎁 ✨
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Link (Opsiyonel)</label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="/urunler veya https://..."
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Boş bırakırsanız banner tıklanamaz
                  </p>
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Görünüm</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Arkaplan Rengi</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        setFormData({ ...formData, backgroundColor: e.target.value })
                      }
                      className="h-12 w-20 rounded-lg border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.backgroundColor}
                      onChange={(e) =>
                        setFormData({ ...formData, backgroundColor: e.target.value })
                      }
                      className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                      placeholder="#8B7355"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Metin Rengi</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.textColor}
                      onChange={(e) =>
                        setFormData({ ...formData, textColor: e.target.value })
                      }
                      className="h-12 w-20 rounded-lg border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.textColor}
                      onChange={(e) =>
                        setFormData({ ...formData, textColor: e.target.value })
                      }
                      className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              {/* Color Presets */}
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Hazır Renkler</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        backgroundColor: '#8B7355',
                        textColor: '#FFFFFF',
                      })
                    }
                    className="w-10 h-10 rounded-lg border-2"
                    style={{ backgroundColor: '#8B7355' }}
                    title="Walnut (Varsayılan)"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        backgroundColor: '#6B8E6F',
                        textColor: '#FFFFFF',
                      })
                    }
                    className="w-10 h-10 rounded-lg border-2"
                    style={{ backgroundColor: '#6B8E6F' }}
                    title="Sage"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        backgroundColor: '#CC7357',
                        textColor: '#FFFFFF',
                      })
                    }
                    className="w-10 h-10 rounded-lg border-2"
                    style={{ backgroundColor: '#CC7357' }}
                    title="Clay"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        backgroundColor: '#1F2937',
                        textColor: '#FFFFFF',
                      })
                    }
                    className="w-10 h-10 rounded-lg border-2"
                    style={{ backgroundColor: '#1F2937' }}
                    title="Siyah"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        backgroundColor: '#EF4444',
                        textColor: '#FFFFFF',
                      })
                    }
                    className="w-10 h-10 rounded-lg border-2"
                    style={{ backgroundColor: '#EF4444' }}
                    title="Kırmızı"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Önizleme</h3>
              {formData.isActive ? (
                <span className="flex items-center gap-1 text-sm text-sage-600">
                  <Eye className="h-4 w-4" />
                  Görünür
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <EyeOff className="h-4 w-4" />
                  Gizli
                </span>
              )}
            </div>

            <div className="border rounded-lg overflow-hidden">
              {/* Mini Browser UI */}
              <div className="bg-gray-100 px-3 py-2 border-b flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-white rounded px-2 py-1 text-xs text-gray-500">
                  mutfakmobilya.com
                </div>
              </div>

              {/* Banner Preview */}
              {formData.isActive && (
                <div
                  className="px-4 py-2.5 text-center text-sm font-medium relative"
                  style={{
                    backgroundColor: formData.backgroundColor,
                    color: formData.textColor,
                  }}
                >
                  {formData.text || 'Banner metni buraya gelecek...'}
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-70 hover:opacity-100">
                    ✕
                  </button>
                </div>
              )}

              {/* Page Preview */}
              <div className="bg-white p-4 space-y-2">
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                <div className="h-32 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-natural-100 rounded-lg text-xs text-muted-foreground">
              <p className="font-semibold mb-1">💡 İpucu:</p>
              <p>
                Banner çok uzun olursa mobilde satır atlar. Kısa ve öz tutmaya çalışın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}