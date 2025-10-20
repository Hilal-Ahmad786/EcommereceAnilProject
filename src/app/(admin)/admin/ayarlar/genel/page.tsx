'use client'

import { useState } from 'react'
import { Save, Upload } from 'lucide-react'

export default function GeneralSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    siteName: 'Mutfak Mobilya',
    siteDescription: 'Kaliteli mutfak mobilyaları ve tasarım çözümleri',
    siteUrl: 'https://mutfakmobilya.com',
    supportEmail: 'destek@mutfakmobilya.com',
    phone: '+90 555 123 45 67',
    whatsapp: '905551234567',
    address: 'Örnek Mahallesi, Mobilya Sokak No: 123, Kadıköy/İstanbul',
    workingHours: 'Pazartesi-Cumartesi: 09:00-18:00',
    currency: 'TRY',
    language: 'tr',
    timezone: 'Europe/Istanbul',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Ayarlar başarıyla kaydedildi')
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
        <h1 className="text-3xl font-bold text-walnut-700">Genel Ayarlar</h1>
        <p className="text-muted-foreground">Site genel ayarlarını yapılandırın</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Site Information */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Site Bilgileri</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Adı *</label>
                  <input
                    type="text"
                    required
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Site Açıklaması *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.siteDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, siteDescription: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Site URL *</label>
                  <input
                    type="url"
                    required
                    value={formData.siteUrl}
                    onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">İletişim Bilgileri</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Destek E-posta *</label>
                  <input
                    type="email"
                    required
                    value={formData.supportEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Telefon *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      WhatsApp Numarası *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                      placeholder="905551234567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Adres</label>
                  <textarea
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Çalışma Saatleri</label>
                  <input
                    type="text"
                    value={formData.workingHours}
                    onChange={(e) =>
                      setFormData({ ...formData, workingHours: e.target.value })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
              </div>
            </div>

            {/* Localization */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Yerelleştirme</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Para Birimi</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  >
                    <option value="TRY">TRY (₺)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Dil</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  >
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Saat Dilimi</label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  >
                    <option value="Europe/Istanbul">İstanbul (GMT+3)</option>
                    <option value="Europe/London">Londra (GMT+0)</option>
                    <option value="America/New_York">New York (GMT-5)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Logo Upload */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Site Logosu</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="w-24 h-24 bg-walnut-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl font-bold text-walnut-600">MM</span>
                  </div>
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Logo yükleyin</p>
                  <button
                    type="button"
                    className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold"
                  >
                    Dosya Seç
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Önerilen boyut: 200x80px, Max: 2MB
                </p>
              </div>
            </div>

            {/* Favicon Upload */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Favicon</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-walnut-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-xl">🏠</span>
                  </div>
                  <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Favicon yükleyin</p>
                  <button
                    type="button"
                    className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold"
                  >
                    Dosya Seç
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Format: .ico veya .png, Boyut: 32x32px
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {isLoading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}