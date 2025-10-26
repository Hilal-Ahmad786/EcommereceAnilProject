// src/app/(main)/hesabim/profil/profile-client.tsx

"use client"

import { useState } from "react"
import { User, Mail, Phone, Lock } from "lucide-react"

export default function ProfileClient({ user }: { user: any }) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)

  // --- Update profile ---
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Example API call (implement later)
      await new Promise((r) => setTimeout(r, 1000))
      alert("Profil bilgileriniz güncellendi")
    } catch {
      alert("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  // --- Change password ---
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor")
      return
    }
    setIsLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      alert("Şifreniz güncellendi")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch {
      alert("Bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Kişisel Bilgiler */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-xl mb-6">Kişisel Bilgiler</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          {/* Ad Soyad */}
          <div>
            <label className="block text-sm font-medium mb-2">Ad Soyad</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
            </div>
          </div>

          {/* E-posta */}
          <div>
            <label className="block text-sm font-medium mb-2">E-posta</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
            </div>
          </div>

          {/* Telefon */}
          <div>
            <label className="block text-sm font-medium mb-2">Telefon</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
          </button>
        </form>
      </div>

      {/* Şifre Değiştir */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-bold text-xl mb-6">Şifre Değiştir</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {[
            { label: "Mevcut Şifre", key: "currentPassword" },
            { label: "Yeni Şifre", key: "newPassword" },
            { label: "Yeni Şifre (Tekrar)", key: "confirmPassword" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium mb-2">{field.label}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  value={passwordData[field.key as keyof typeof passwordData]}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      [field.key]: e.target.value,
                    })
                  }
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
          </button>
        </form>
      </div>
    </div>
  )
}
