'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'

export default function PasswordResetPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement password reset API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-natural-100 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-sage-600" />
          </div>
          <h2 className="text-2xl font-bold text-walnut-700 mb-2">
            E-posta Gönderildi
          </h2>
          <p className="text-muted-foreground mb-6">
            Şifre sıfırlama bağlantısı <strong>{email}</strong> adresine gönderildi.
            Lütfen e-postanızı kontrol edin.
          </p>
          <Link
            href="/giris"
            className="inline-flex items-center text-walnut-600 hover:text-walnut-700 font-semibold"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Giriş sayfasına dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-natural-100 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-walnut-500">Mutfak Mobilya</h1>
          </Link>
          <p className="text-muted-foreground mt-2">Şifrenizi sıfırlayın</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-sm text-muted-foreground mb-6">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Gönderiliyor...' : 'Sıfırlama Bağlantısı Gönder'}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/giris"
              className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold"
            >
              ← Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}