'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement contact form API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert('Mesajınız iletildi. En kısa sürede size dönüş yapacağız.')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-walnut-700 mb-4">
          İletişim
        </h1>
        <p className="text-lg text-muted-foreground">
          Sorularınız için bize ulaşın. Size yardımcı olmaktan mutluluk duyarız.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-walnut-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-walnut-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Telefon</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {siteConfig.contact.phone}
                </p>
                <p className="text-xs text-muted-foreground">Pazartesi-Cumartesi 09:00-18:00</p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-sage-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">E-posta</h3>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.contact.email}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-clay-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-clay-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Adres</h3>
                <p className="text-sm text-muted-foreground">
                  Örnek Mahallesi, Mobilya Sokak No: 123<br />
                  Kadıköy / İstanbul
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-natural-200 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-walnut-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Çalışma Saatleri</h3>
                <p className="text-sm text-muted-foreground">
                  Pazartesi-Cumartesi: 09:00-18:00<br />
                  Pazar: Kapalı
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white border rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Bize Yazın</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ad Soyad *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-posta *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="05XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Konu *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="product">Ürün Bilgisi</option>
                  <option value="order">Sipariş Durumu</option>
                  <option value="complaint">Şikayet</option>
                  <option value="suggestion">Öneri</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mesajınız *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-4 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Gönderiliyor...' : 'Mesajı Gönder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}