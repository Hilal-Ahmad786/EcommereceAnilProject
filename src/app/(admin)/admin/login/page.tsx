// src/app/(admin)/admin/login/page.tsx
'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

export default function AdminLoginPage() {
  const router = useRouter()
  const sp = useSearchParams()
  const callbackUrl = sp.get("callbackUrl") || "/admin"
  const [email, setEmail] = useState("admin@mutfakmobilya.com")
  const [password, setPassword] = useState("admin123")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    })
    setLoading(false)
    if (!res || res.error) {
      setError("Giriş başarısız. Bilgilerinizi kontrol edin.")
      return
    }
    router.push(res.url || callbackUrl)
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <form onSubmit={onSubmit} className="w-full max-w-md bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-walnut-700">Admin Giriş</h1>
        {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">{error}</div>}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@mutfakmobilya.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Şifre</label>
          <input
            type="password"
            className="w-full px-4 py-3 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
    </div>
  )
}
