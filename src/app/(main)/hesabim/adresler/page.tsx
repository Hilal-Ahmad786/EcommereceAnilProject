'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, MapPin, Check } from 'lucide-react'

export default function SavedAddressesPage() {
  // TODO: Fetch from API
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      title: 'Ev',
      fullName: 'Ahmet Yılmaz',
      phone: '0555 123 45 67',
      addressLine: 'Örnek Mahallesi, Örnek Sokak No: 123 Daire: 4',
      district: 'Kadıköy',
      city: 'İstanbul',
      postalCode: '34000',
      isDefault: true,
    },
    {
      id: '2',
      title: 'İş',
      fullName: 'Ahmet Yılmaz',
      phone: '0555 123 45 67',
      addressLine: 'İş Mahallesi, Ofis Sokak No: 45 Kat: 3',
      district: 'Şişli',
      city: 'İstanbul',
      postalCode: '34000',
      isDefault: false,
    },
  ])

  const [showForm, setShowForm] = useState(false)

  const handleDelete = (id: string) => {
    if (confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      setAddresses(addresses.filter((addr) => addr.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/hesabim"
          className="text-sm text-walnut-600 hover:text-walnut-700 mb-4 inline-block"
        >
          ← Hesabıma Dön
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
              Adreslerim
            </h1>
            <p className="text-muted-foreground">
              {addresses.length} kayıtlı adres
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="h-5 w-5" />
            Yeni Adres Ekle
          </button>
        </div>
      </div>

      {/* Add Address Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Yeni Adres Ekle</h3>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Adres Başlığı (Ev, İş vb.)"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
              <input
                type="text"
                placeholder="Ad Soyad"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
              <input
                type="tel"
                placeholder="Telefon"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
              <input
                type="text"
                placeholder="İl"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
              <input
                type="text"
                placeholder="İlçe"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
              <input
                type="text"
                placeholder="Posta Kodu"
                className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
            </div>
            <textarea
              placeholder="Adres"
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Kaydet
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                İptal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-walnut-700 mb-2">
            Kayıtlı adresiniz yok
          </h3>
          <p className="text-muted-foreground mb-6">
            Hızlı alışveriş için adreslerinizi kaydedin
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            İlk Adresi Ekle
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white border-2 rounded-xl p-6 relative ${
                address.isDefault ? 'border-sage-500' : 'border-gray-200'
              }`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 bg-sage-500 text-white text-xs px-2 py-1 rounded-full">
                    <Check className="h-3 w-3" />
                    Varsayılan
                  </span>
                </div>
              )}

              {/* Address Info */}
              <div className="mb-4">
                <h3 className="font-bold text-lg mb-3">{address.title}</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p className="font-semibold text-foreground">{address.fullName}</p>
                  <p>{address.phone}</p>
                  <p>{address.addressLine}</p>
                  <p>
                    {address.district} / {address.city}
                  </p>
                  {address.postalCode && <p>{address.postalCode}</p>}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
                  <Edit className="h-4 w-4" />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}