// /src/app/(main)/hesabim/adresler/address-manager.tsx

"use client"

import { useState } from "react"
import { Plus, Trash2, Save } from "lucide-react"

export default function AddressManager({
  addresses: initialAddresses,
  userId,
}: {
  addresses: { id: string; title: string; city: string; district: string; fullAddress: string }[]
  userId: string
}) {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [form, setForm] = useState({ title: "", city: "", district: "", fullAddress: "" })
  const [loading, setLoading] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title || !form.city || !form.fullAddress) return alert("Lütfen tüm alanları doldurun")

    setLoading(true)
    try {
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId }),
      })
      if (!res.ok) throw new Error("Adres kaydedilemedi")

      const newAddr = await res.json()
      setAddresses([...addresses, newAddr])
      setForm({ title: "", city: "", district: "", fullAddress: "" })
    } catch (err) {
      console.error(err)
      alert("Adres kaydedilemedi.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu adresi silmek istediğinizden emin misiniz?")) return
    try {
      const res = await fetch(`/api/addresses/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Adres silinemedi")
      setAddresses(addresses.filter((a) => a.id !== id))
    } catch (err) {
      alert("Adres silinemedi.")
      console.error(err)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Left — Address List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Kayıtlı Adresler</h2>
        {addresses.length === 0 ? (
          <p className="text-muted-foreground">Henüz kayıtlı adresiniz yok.</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 border rounded-lg flex justify-between items-start hover:bg-natural-50"
              >
                <div>
                  <h3 className="font-semibold text-walnut-700">{addr.title}</h3>
                  <p className="text-sm text-muted-foreground">{addr.fullAddress}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {addr.district}, {addr.city}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Sil"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right — Add New Address */}
      <div>
        <h2 className="text-xl font-bold mb-4">Yeni Adres Ekle</h2>
        <form onSubmit={handleSave} className="bg-white border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Başlık (Ev, Ofis, vb.)</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-walnut-500"
              placeholder="Örn: Ev Adresi"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Şehir</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-walnut-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">İlçe</label>
              <input
                type="text"
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-walnut-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Açık Adres</label>
            <textarea
              value={form.fullAddress}
              onChange={(e) => setForm({ ...form, fullAddress: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-walnut-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-walnut-600 text-white rounded-lg hover:bg-walnut-700 transition disabled:opacity-70"
          >
            {loading ? <Save className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Kaydet
          </button>
        </form>
      </div>
    </div>
  )
}
