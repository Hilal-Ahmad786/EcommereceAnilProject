// src/app/(main)/hesabim/adresler/address-client.tsx

"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, MapPin, Check } from "lucide-react"

export default function AddressClient({ userId }: { userId: string }) {
  const [addresses, setAddresses] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // --- Load addresses from API ---
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/addresses?userId=${userId}`)
        if (res.ok) setAddresses(await res.json())
      } catch {
        console.warn("Adresler yüklenemedi (dummy data kullanılıyor).")
        setAddresses([])
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [userId])

  // --- Delete address ---
  const handleDelete = async (id: string) => {
    if (!confirm("Bu adresi silmek istediğinizden emin misiniz?")) return
    setAddresses((prev) => prev.filter((a) => a.id !== id))
    try {
      await fetch(`/api/addresses/${id}`, { method: "DELETE" })
    } catch {}
  }

  if (isLoading)
    return <p className="text-center text-muted-foreground">Yükleniyor...</p>

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <p className="text-muted-foreground">{addresses.length} kayıtlı adres</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Adres Ekle
        </button>
      </div>

      {/* Add Address Form */}
      {showForm && (
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="font-bold text-lg mb-4">Yeni Adres Ekle</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const data = Object.fromEntries(new FormData(form).entries())
              setShowForm(false)
              try {
                const res = await fetch("/api/addresses", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ ...data, userId }),
                })
                if (res.ok) {
                  const newAddr = await res.json()
                  setAddresses((a) => [...a, newAddr])
                }
              } catch {}
            }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input name="title" placeholder="Adres Başlığı (Ev, İş vb.)" className="input" required />
              <input name="fullName" placeholder="Ad Soyad" className="input" required />
              <input name="phone" placeholder="Telefon" className="input" required />
              <input name="city" placeholder="İl" className="input" required />
              <input name="district" placeholder="İlçe" className="input" required />
              <input name="postalCode" placeholder="Posta Kodu" className="input" />
            </div>
            <textarea
              name="addressLine"
              rows={3}
              placeholder="Adres Detayı"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              required
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
          {addresses.map((a) => (
            <div
              key={a.id}
              className={`bg-white border-2 rounded-xl p-6 relative ${
                a.isDefault ? "border-sage-500" : "border-gray-200"
              }`}
            >
              {a.isDefault && (
                <div className="absolute top-4 right-4">
                  <span className="flex items-center gap-1 bg-sage-500 text-white text-xs px-2 py-1 rounded-full">
                    <Check className="h-3 w-3" />
                    Varsayılan
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="font-bold text-lg mb-3">{a.title}</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p className="font-semibold text-foreground">{a.fullName}</p>
                  <p>{a.phone}</p>
                  <p>{a.addressLine}</p>
                  <p>
                    {a.district} / {a.city}
                  </p>
                  {a.postalCode && <p>{a.postalCode}</p>}
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
                  <Edit className="h-4 w-4" />
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
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
