// src/app/(admin)/admin/urunler/duzenle/[id]/page.tsx

'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Upload, X, Trash2 } from 'lucide-react'

type Category = { id: string; name: string; slug: string }

const trSlug = (text: string) => {
  const map: Record<string, string> = {
    ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u',
    Ç: 'c', Ğ: 'g', Ö: 'o', Ş: 's', Ü: 'u',
  }
  return text
    .toLowerCase()
    .split('')
    .map((ch) => map[ch] || ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const id = String(params.id)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [cats, setCats] = useState<Category[]>([])
  const [selectedCat, setSelectedCat] = useState<string>('')
  const [images, setImages] = useState<string[]>([])

  const [form, setForm] = useState({
    name: '',
    slug: '',
    price: '',
    comparePrice: '',
    stock: '',
    lowStockThreshold: '5',
    description: '',
    shortDescription: '',
    width: '',
    height: '',
    depth: '',
    weight: '',
    isActive: true,
    featured: false,
  })

  // Fetch categories + product details
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch('/api/categories?includeProducts=false', { cache: 'no-store' }),
          fetch(`/api/products/${id}`, { cache: 'no-store' }),
        ])

        const catJson = await catRes.json()
        const categories: Category[] =
          catJson?.data?.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug })) ?? []
        if (mounted) setCats(categories)

        if (!prodRes.ok) throw new Error('Ürün getirilemedi')
        const product = await prodRes.json()

        if (mounted) {
          setSelectedCat(product.categoryId)
          setImages((product.images || []).map((i: any) => i.url).filter(Boolean))
          setForm({
            name: product.name ?? '',
            slug: product.slug ?? '',
            price: product.price != null ? String(Number(product.price)) : '',
            comparePrice:
              product.comparePrice != null ? String(Number(product.comparePrice)) : '',
            stock: product.stock != null ? String(product.stock) : '',
            lowStockThreshold:
              product.lowStockThreshold != null ? String(product.lowStockThreshold) : '5',
            description: product.description ?? '',
            shortDescription: product.shortDescription ?? '',
            width: product.dimensions?.width != null ? String(product.dimensions.width) : '',
            height: product.dimensions?.height != null ? String(product.dimensions.height) : '',
            depth: product.dimensions?.depth != null ? String(product.dimensions.depth) : '',
            weight: product.weight != null ? String(Number(product.weight)) : '',
            isActive: Boolean(product.isActive),
            featured: Boolean(product.featured),
          })
        }
      } catch (e) {
        console.error(e)
        alert('Ürün verileri yüklenemedi')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [id])

  // Auto-slug
  useEffect(() => {
    if (!form.name) return
    setForm((s) => ({ ...s, slug: s.slug ? s.slug : trSlug(form.name) }))
  }, [form.name])

  const hasDims = useMemo(
    () => form.width || form.height || form.depth,
    [form.width, form.height, form.depth]
  )

  // Upload new image
  const onUpload = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: data })
    const json = await res.json()
    if (json?.success && json?.data?.url) {
      setImages((arr) => [...arr, json.data.url])
    } else {
      alert('Görsel yüklenemedi')
    }
  }

  // Submit product update
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCat) return alert('Lütfen bir kategori seçin')
    if (!form.name || !form.slug || !form.price || !form.stock || !form.description) {
      return alert('Zorunlu alanları doldurun')
    }

    setSaving(true)
    try {
      const payload: any = {
        name: form.name,
        slug: form.slug,
        categoryId: selectedCat,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
        stock: Number(form.stock),
        lowStockThreshold: form.lowStockThreshold ? Number(form.lowStockThreshold) : 0,
        description: form.description,
        shortDescription: form.shortDescription || null,
        isActive: form.isActive,
        featured: form.featured,
        images, // ✅ Include images
      }

      if (hasDims || form.weight) {
        payload.dimensions = hasDims
          ? {
              width: form.width ? Number(form.width) : undefined,
              height: form.height ? Number(form.height) : undefined,
              depth: form.depth ? Number(form.depth) : undefined,
              unit: 'cm',
            }
          : undefined
        payload.weight = form.weight ? Number(form.weight) : null
        payload.weightUnit = form.weight ? 'kg' : null
      }

      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Ürün güncellenemedi')
      alert('✅ Ürün başarıyla güncellendi (görseller dahil)')
      router.push('/admin/urunler')
      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(err?.message || 'Bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  // Delete product
  const handleDelete = async () => {
    if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Ürün silinemedi')
      alert('Ürün silindi')
      router.push('/admin/urunler')
      router.refresh()
    } catch (e) {
      console.error(e)
      alert('Bir hata oluştu, ürün silinemedi')
    }
  }

  if (loading) return <div className="p-4">Yükleniyor…</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/urunler" className="p-2 hover:bg-natural-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-walnut-700">Ürün Düzenle</h1>
            <p className="text-muted-foreground">Ürün bilgilerini güncelleyin</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="h-4 w-4" />
          Ürünü Sil
        </button>
      </div>

      <form onSubmit={submit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* --- Basic Info --- */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Temel Bilgiler</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Ürün Adı *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">URL (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Kısa Açıklama</label>
                  <textarea
                    rows={2}
                    value={form.shortDescription}
                    onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Ürünün kısa açıklaması..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Detaylı Açıklama *</label>
                  <textarea
                    required
                    rows={6}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Ürünün detaylı açıklaması..."
                  />
                </div>
              </div>
            </div>

            {/* --- Price & Stock --- */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Fiyat ve Stok</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Fiyat (₺) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">İndirimli Fiyat (₺)</label>
                  <input
                    type="number"
                    value={form.comparePrice}
                    onChange={(e) => setForm({ ...form, comparePrice: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Stok Adedi *</label>
                  <input
                    type="number"
                    required
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Düşük Stok Uyarısı</label>
                  <input
                    type="number"
                    value={form.lowStockThreshold}
                    onChange={(e) => setForm({ ...form, lowStockThreshold: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  />
                </div>
              </div>
            </div>

            {/* --- Dimensions --- */}
            <div className="bg-white rounded-xl border p-6">
              <h2 className="text-lg font-bold mb-4">Boyutlar ve Ağırlık</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  ['width', 'Genişlik (cm)'],
                  ['height', 'Yükseklik (cm)'],
                  ['depth', 'Derinlik (cm)'],
                  ['weight', 'Ağırlık (kg)'],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-2">{label}</label>
                    <input
                      type="number"
                      value={(form as any)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- Sidebar --- */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Kategori</h3>
              <select
                required
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              >
                <option value="">Seçiniz</option>
                {cats.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Ürün Görselleri</h3>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Görselleri yükleyin, otomatik olarak kaydedilecektir.
                </p>
                <label className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold cursor-pointer">
                  Dosya Seç
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) onUpload(file)
                    }}
                  />
                </label>
              </div>

              {images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {images.map((url, i) => (
                    <div key={url} className="relative group">
                      <img
                        src={url}
                        alt={`img-${i}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => setImages((arr) => arr.filter((x) => x !== url))}
                        className="absolute top-1 right-1 bg-white/90 border rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        title="Kaldır"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Durum</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                  />
                  <span className="text-sm">Aktif</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                  />
                  <span className="text-sm">Öne Çıkan Ürün</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
