'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // TODO: Implement newsletter API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      setStatus('success')
      setMessage('Başarıyla abone oldunuz! 🎉')
      setEmail('')
      
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-walnut-500 to-walnut-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Mail className="h-8 w-8" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kampanyalardan Haberdar Olun
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Yeni ürünler, özel indirimler ve mutfak tasarım ipuçlarını e-posta ile alın.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
                disabled={status === 'loading'}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-3 bg-white text-walnut-600 font-semibold rounded-lg hover:bg-natural-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Kaydediliyor...' : 'Abone Ol'}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <p
                className={`mt-4 text-sm ${
                  status === 'success' ? 'text-green-200' : 'text-red-200'
                }`}
              >
                {message}
              </p>
            )}
          </form>

          {/* Privacy Note */}
          <p className="mt-6 text-sm text-white/70">
            E-posta adresinizi kimseyle paylaşmıyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
          </p>
        </div>
      </div>
    </section>
  )
}