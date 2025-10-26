// /src/app/(main)/hesabim/profil/profile-form.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"

export default function ProfileForm({
  user,
}: {
  user: { id: string; name: string; email: string; phone?: string; city?: string }
}) {
  const router = useRouter()
  const [form, setForm] = useState(user)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch("/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed to update user")
      setSuccess(true)
      router.refresh()
    } catch (err) {
      console.error(err)
      alert("Profil güncellenemedi. Lütfen tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-xl p-6 max-w-2xl space-y-6"
    >
      {/* Ad Soyad */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          Ad Soyad
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-walnut-500"
        />
      </div>

      {/* E-posta */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          E-posta
        </label>
        <input
          type="email"
          value={form.email}
          disabled
          className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          Telefon
        </label>
        <input
          type="tel"
          value={form.phone ?? ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-walnut-500"
        />
      </div>

      {/* Şehir */}
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          Şehir
        </label>
        <input
          type="text"
          value={form.city ?? ""}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-walnut-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-5 py-2 bg-walnut-600 text-white rounded-lg hover:bg-walnut-700 transition disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Kaydet
      </button>

      {success && (
        <p className="text-sm text-green-600 font-medium">
          ✅ Profil başarıyla güncellendi.
        </p>
      )}
    </form>
  )
}
