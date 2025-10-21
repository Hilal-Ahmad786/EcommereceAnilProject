// ============================================
// FILE: src/app/(admin)/admin/kategoriler/yeni/page.tsx
// ============================================
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload } from 'lucide-react'

export default function NewCategoryPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    parentId: '',
    order: 0,
  })

  // Auto-generate slug from name
  const handleNameChange = (name: string) => {
    setFormData({ 
      ...formData, 
      name,
      slug: generateSlug(name)
    })
  }

  const generateSlug = (text: string): string => {
    const turkishMap: { [key: string]: string } = {
      ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u',
      Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u',
    }
    return text
      .toLowerCase()
      .split('')
      .map((char) => turkishMap[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to create category')

      alert('Kategori başarıyla eklendi')
      router.push('/admin/kategoriler')
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/kategoriler" className="p-2 hover:bg-natural-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Yeni Kategori</h1>
          <p className="text-muted-foreground">Yeni kategori oluşturun</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Kategori Bilgileri</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Kategori Adı *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Mutfak Dolabı"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">URL (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="mutfak-dolabi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Açıklama</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Kategori açıklaması..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Kategori Görseli</h3>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Görsel yükleyin</p>
                <button type="button" className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold">
                  Dosya Seç
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {isLoading ? 'Kaydediliyor...' : 'Kategoriyi Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}