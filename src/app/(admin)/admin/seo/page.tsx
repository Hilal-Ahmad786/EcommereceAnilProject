'use client'

import { useState } from 'react'
import { Save, Search, Eye, Link as LinkIcon } from 'lucide-react'

export default function AdminSEOPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('homepage')

  const [seoData, setSeoData] = useState({
    homepage: {
      metaTitle: 'Mutfak Mobilya - Kaliteli Mutfak Mobilyaları',
      metaDescription:
        'Kaliteli mutfak mobilyaları ve tasarım çözümleri ile hayalinizdeki mutfağı oluşturun. %100 yerli üretim, ücretsiz kargo.',
      keywords: 'mutfak mobilyası, mutfak dolabı, mutfak tasarımı, mobilya',
      ogTitle: 'Mutfak Mobilya - Hayalinizdeki Mutfağı Oluşturun',
      ogDescription: 'Türkiye\'nin en kaliteli mutfak mobilyaları burada!',
      canonicalUrl: 'https://mutfakmobilya.com',
    },
    products: {
      metaTitle: 'Ürünler - Mutfak Mobilya',
      metaDescription: 'Geniş mutfak mobilyası ürün yelpazemizi inceleyin.',
      keywords: 'mutfak ürünleri, mutfak dolabı modelleri',
      ogTitle: 'Ürünlerimiz - Mutfak Mobilya',
      ogDescription: 'Modern ve klasik mutfak mobilyası modelleri',
      canonicalUrl: 'https://mutfakmobilya.com/urunler',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('SEO ayarları kaydedildi')
    } catch (error) {
      alert('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'homepage', label: 'Ana Sayfa' },
    { id: 'products', label: 'Ürünler' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'İletişim' },
  ]

  const currentData = seoData[activeTab as keyof typeof seoData] || seoData.homepage

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">SEO Ayarları</h1>
        <p className="text-muted-foreground">
          Sayfalarınızın arama motoru optimizasyonunu yönetin
        </p>
      </div>

      {/* SEO Score Card */}
      <div className="bg-gradient-to-br from-sage-500 to-sage-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90 mb-1">Genel SEO Skoru</p>
            <p className="text-4xl font-bold">85/100</p>
          </div>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <Search className="h-12 w-12" />
          </div>
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <p className="opacity-90">Meta Tags</p>
            <p className="font-bold">Excellent</p>
          </div>
          <div>
            <p className="opacity-90">Keywords</p>
            <p className="font-bold">Good</p>
          </div>
          <div>
            <p className="opacity-90">Performance</p>
            <p className="font-bold">Very Good</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border">
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-walnut-500 text-walnut-600'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* SEO Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Başlık *
                  <span className="text-xs text-muted-foreground ml-2">
                    ({currentData.metaTitle.length}/60 karakter)
                  </span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={60}
                  value={currentData.metaTitle}
                  onChange={(e) =>
                    setSeoData({
                      ...seoData,
                      [activeTab]: { ...currentData, metaTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="Sayfanızın başlığı (Arama motorlarında görünecek)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Optimal uzunluk: 50-60 karakter
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Meta Açıklama *
                  <span className="text-xs text-muted-foreground ml-2">
                    ({currentData.metaDescription.length}/160 karakter)
                  </span>
                </label>
                <textarea
                  required
                  maxLength={160}
                  rows={3}
                  value={currentData.metaDescription}
                  onChange={(e) =>
                    setSeoData({
                      ...seoData,
                      [activeTab]: { ...currentData, metaDescription: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="Sayfanızın kısa açıklaması (Arama sonuçlarında görünecek)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Optimal uzunluk: 150-160 karakter
                </p>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Anahtar Kelimeler
                </label>
                <input
                  type="text"
                  value={currentData.keywords}
                  onChange={(e) =>
                    setSeoData({
                      ...seoData,
                      [activeTab]: { ...currentData, keywords: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="mutfak, mobilya, dolap (virgülle ayırın)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  💡 5-10 anahtar kelime kullanın
                </p>
              </div>

              {/* Open Graph Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  OG Başlık (Sosyal Medya)
                </label>
                <input
                  type="text"
                  value={currentData.ogTitle}
                  onChange={(e) =>
                    setSeoData({
                      ...seoData,
                      [activeTab]: { ...currentData, ogTitle: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="Sosyal medyada paylaşıldığında görünecek başlık"
                />
              </div>

              {/* Open Graph Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  OG Açıklama (Sosyal Medya)
                </label>
                <textarea
                  rows={2}
                  value={currentData.ogDescription}
                  onChange={(e) =>
                    setSeoData({
                      ...seoData,
                      [activeTab]: { ...currentData, ogDescription: e.target.value },
                    })
                  }
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="Sosyal medyada paylaşıldığında görünecek açıklama"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Canonical URL
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="url"
                    value={currentData.canonicalUrl}
                    onChange={(e) =>
                      setSeoData({
                        ...seoData,
                        [activeTab]: { ...currentData, canonicalUrl: e.target.value },
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="https://mutfakmobilya.com/sayfa"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  💡 Tekrarlanan içerik sorunlarını önler
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {isLoading ? 'Kaydediliyor...' : 'SEO Ayarlarını Kaydet'}
              </button>
            </div>

            {/* Preview */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Google Preview */}
                <div className="bg-white border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold">Google Önizleme</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                      {currentData.canonicalUrl}
                    </p>
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {currentData.metaTitle}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {currentData.metaDescription}
                    </p>
                  </div>
                </div>

                {/* Social Media Preview */}
                <div className="bg-white border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-bold">Sosyal Medya Önizleme</h3>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="aspect-video bg-natural-100 flex items-center justify-center">
                      <span className="text-4xl">🏠</span>
                    </div>
                    <div className="p-3 bg-natural-50">
                      <p className="text-xs text-muted-foreground uppercase mb-1">
                        mutfakmobilya.com
                      </p>
                      <p className="font-semibold text-sm mb-1">
                        {currentData.ogTitle || currentData.metaTitle}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {currentData.ogDescription || currentData.metaDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SEO Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="font-bold text-blue-900 text-sm mb-2">💡 SEO İpuçları</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• Anahtar kelimeleri başlıkta kullanın</li>
                    <li>• Açıklama çekici ve aksiyon odaklı olsun</li>
                    <li>• Her sayfa için benzersiz meta veriler</li>
                    <li>• URL'leri kısa ve açıklayıcı tutun</li>
                    <li>• Sosyal medya için görsel ekleyin</li>
                  </ul>
                </div>

                {/* Character Counter */}
                <div className="bg-white border rounded-xl p-4">
                  <h4 className="font-bold text-sm mb-3">Karakter Sayıları</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Meta Başlık:</span>
                      <span
                        className={
                          currentData.metaTitle.length > 60
                            ? 'text-red-600 font-semibold'
                            : currentData.metaTitle.length > 50
                            ? 'text-green-600 font-semibold'
                            : 'text-muted-foreground'
                        }
                      >
                        {currentData.metaTitle.length}/60
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meta Açıklama:</span>
                      <span
                        className={
                          currentData.metaDescription.length > 160
                            ? 'text-red-600 font-semibold'
                            : currentData.metaDescription.length > 150
                            ? 'text-green-600 font-semibold'
                            : 'text-muted-foreground'
                        }
                      >
                        {currentData.metaDescription.length}/160
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

