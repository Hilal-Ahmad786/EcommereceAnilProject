// src/components/admin/CategoryForm.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { Upload, X } from "lucide-react"

export type CategoryFormInitial = {
  name: string
  slug: string
  description?: string
  image?: string | null
  parentId?: string | null
  order?: number
}

type CategoryLite = { id: string; name: string }

type Props = {
  initial?: Partial<CategoryFormInitial>
  onSubmit: (payload: Required<CategoryFormInitial>) => Promise<void> | void
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

export default function CategoryForm({ initial, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cats, setCats] = useState<CategoryLite[]>([])
  const [form, setForm] = useState<CategoryFormInitial>({
    name: initial?.name ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    image: initial?.image ?? null,
    parentId: initial?.parentId ?? null,
    order: initial?.order ?? 0,
  })

  // Load parent list (flat)
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/categories?includeProducts=false", { cache: "no-store" })
        const json = await res.json()
        const flat: CategoryLite[] = (json?.data ?? []).map((c: any) => ({ id: c.id, name: c.name }))
        setCats(flat)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  // Auto slug from name (don’t overwrite manual edits)
  useEffect(() => {
    if (!form.name) return
    setForm((s) => ({ ...s, slug: s.slug ? s.slug : trSlug(form.name) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name])

  const canSubmit = useMemo(
    () => !!form.name && !!form.slug,
    [form.name, form.slug]
  )

  async function handleUpload(file: File) {
    const data = new FormData()
    data.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: data })
    const json = await res.json()
    if (json?.success && json?.data?.url) {
      setForm((s) => ({ ...s, image: json.data.url }))
    } else {
      alert(json?.error || "Görsel yüklenemedi")
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setIsSubmitting(true)
    try {
      await onSubmit({
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description?.trim() || "",
        image: form.image || null,
        parentId: form.parentId || null,
        order: Number.isFinite(Number(form.order)) ? Number(form.order) : 0,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
      {/* Left */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-bold mb-4">Kategori Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Kategori Adı *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                placeholder="Mutfak Dolabı"
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
                placeholder="mutfak-dolabi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Açıklama</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                placeholder="Kategori açıklaması..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="space-y-6">
        {/* Parent & Order */}
        <div className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Üst Kategori</label>
            <select
              value={form.parentId ?? ""}
              onChange={(e) => setForm({ ...form, parentId: e.target.value || null })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            >
              <option value="">— Yok —</option>
              {cats.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sıra</label>
            <input
              type="number"
              value={String(form.order ?? 0)}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              placeholder="0"
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl border p-6">
          <h3 className="font-bold mb-4">Kategori Görseli</h3>

          {form.image ? (
            <div className="relative">
              <img src={form.image} alt="Kategori görseli" className="w-full rounded-lg border" />
              <button
                type="button"
                onClick={() => setForm((s) => ({ ...s, image: null }))}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>
    </form>
  )
}
