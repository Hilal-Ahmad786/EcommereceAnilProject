// src/components/admin/blog/BlogForm.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { Upload, X } from "lucide-react"

export type BlogFormInitial = {
  title: string
  slug: string
  excerpt?: string
  content?: string
  category?: string
  coverImage?: string | null
  published?: boolean
}

type Props = {
  initial?: Partial<BlogFormInitial>
  onSubmit: (payload: Required<BlogFormInitial>) => Promise<void> | void
  onDelete?: () => Promise<void> | void
  submitLabel?: string
  showDelete?: boolean
}

const trSlug = (text: string) => {
  const map: Record<string, string> = { ç:"c", ğ:"g", ı:"i", İ:"i", ö:"o", ş:"s", ü:"u", Ç:"c", Ğ:"g", Ö:"o", Ş:"s", Ü:"u" }
  return text
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] || ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export default function BlogForm({
  initial,
  onSubmit,
  onDelete,
  submitLabel = "Kaydet",
  showDelete = false,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState<BlogFormInitial>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    category: initial?.category ?? "",
    coverImage: initial?.coverImage ?? null,
    published: !!initial?.published,
  })

  useEffect(() => {
    if (!form.title) return
    setForm((s) => ({ ...s, slug: s.slug ? s.slug : trSlug(form.title) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.title])

  const canSubmit = useMemo(
    () => !!form.title && !!form.slug,
    [form.title, form.slug]
  )

  async function handleUpload(file: File) {
    const data = new FormData()
    data.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: data })
    const json = await res.json()
    if (json?.success && json?.data?.url) {
      setForm((s) => ({ ...s, coverImage: json.data.url }))
    } else {
      alert(json?.error || "Görsel yüklenemedi")
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    try {
      await onSubmit({
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: (form.excerpt || "").trim(),
        content: (form.content || "").trim(),
        category: (form.category || "").trim(),
        coverImage: form.coverImage || null,
        published: !!form.published,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
      {/* Left */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Başlık *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              placeholder="Yazı başlığı"
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
              placeholder="yazi-basligi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Kısa Açıklama</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              placeholder="Özet / excerpt"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">İçerik</label>
            <textarea
              rows={10}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              placeholder="Yazı içeriği..."
            />
            {/* later: replace with rich editor when ready */}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Kategori</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              placeholder="Tasarım, Organizasyon, Bakım..."
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            Yayınla
          </label>
        </div>

        {/* Cover Image */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-bold mb-4">Kapak Görseli</h3>

          {form.coverImage ? (
            <div className="relative">
              <img src={form.coverImage} alt="Kapak" className="w-full rounded-lg border" />
              <button
                type="button"
                onClick={() => setForm((s) => ({ ...s, coverImage: null }))}
                className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow"
                title="Kaldır"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">Görsel yükleyin</p>
              <label className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold cursor-pointer">
                Dosya Seç
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleUpload(file)
                  }}
                />
              </label>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {showDelete && onDelete && (
            <button
              type="button"
              onClick={() => onDelete()}
              className="flex-1 border border-red-200 text-red-600 rounded-lg py-3 hover:bg-red-50 transition"
            >
              Sil
            </button>
          )}
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="flex-1 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Kaydediliyor..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  )
}
