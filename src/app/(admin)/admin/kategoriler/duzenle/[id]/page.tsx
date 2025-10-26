// src/app/(admin)/admin/kategoriler/duzenle/[id]/page.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Upload, X } from "lucide-react"

type Category = { id: string; name: string; slug: string }
type CategoryDetail = {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
  parentId?: string | null
  order: number
}

const trSlug = (text: string) => {
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    ş: "s",
    ü: "u",
    Ç: "c",
    Ğ: "g",
    Ö: "o",
    Ş: "s",
    Ü: "u",
  }
  return text
    .toLowerCase()
    .split("")
    .map((ch) => map[ch] || ch)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export default function EditCategoryPage() {
  const router = useRouter()
  const params = useParams()
  const id = String(params.id)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [cats, setCats] = useState<Category[]>([])
  const [form, setForm] = useState<CategoryDetail>({
    id,
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: null,
    order: 0,
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // fetch categories (for parent select) + current category
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [listRes, catRes] = await Promise.all([
          fetch("/api/categories?includeProducts=false", { cache: "no-store" }),
          fetch(`/api/categories/${id}`, { cache: "no-store" }),
        ])

        const listJson = await listRes.json()
        const flat: Category[] =
          listJson?.data?.map((c: any) => ({ id: c.id, name: c.name, slug: c.slug })) ?? []
        if (mounted) setCats(flat)

        if (!catRes.ok) {
          const t = await catRes.text()
          throw new Error(t || "Kategori getirilemedi")
        }
        const catJson = await catRes.json()
        const c = catJson?.data as CategoryDetail

        if (c && mounted) {
          setForm({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description ?? "",
            image: c.image ?? "",
            parentId: c.parentId ?? null,
            order: c.order ?? 0,
          })
          setImagePreview(c.image ?? null)
        }
      } catch (e) {
        console.error(e)
        alert("Kategori verileri yüklenemedi")
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [id])

  // auto-slug when name changes if slug empty or derived
  useEffect(() => {
    if (!form.name) return
    setForm((prev) => ({
      ...prev,
      slug: prev.slug ? prev.slug : trSlug(form.name),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.name])

  const parentOptions = useMemo(
    () => cats.filter((c) => c.id !== form.id), // don't allow self as parent
    [cats, form.id]
  )

  const onUpload = async (file: File) => {
    const data = new FormData()
    data.append("file", file)
    const res = await fetch("/api/upload", { method: "POST", body: data })
    if (!res.ok) {
      const t = await res.text()
      console.error("Upload failed:", t)
      alert("Görsel yüklenemedi")
      return
    }
    const json = await res.json()
    if (json?.success && json?.data?.url) {
      setForm((s) => ({ ...s, image: json.data.url }))
      setImagePreview(json.data.url)
    } else {
      alert("Görsel yüklenemedi")
    }
  }

  const removeImage = async () => {
    if (!form.image) return setImagePreview(null)
    try {
      const url = form.image
      // Best-effort delete from blob (optional)
      await fetch(`/api/upload?url=${encodeURIComponent(url)}`, { method: "DELETE" }).catch(() => {})
    } finally {
      setForm((s) => ({ ...s, image: "" }))
      setImagePreview(null)
    }
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.slug) {
      return alert("İsim ve slug zorunludur")
    }
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description || "",
        image: form.image || null,
        parentId: form.parentId || null,
        order: Number.isFinite(Number(form.order)) ? Number(form.order) : 0,
      }
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || "Kategori güncellenemedi")
      }
      alert("Kategori güncellendi")
      router.push("/admin/kategoriler")
      router.refresh()
    } catch (err: any) {
      console.error(err)
      alert(err?.message || "Bir hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-4">Yükleniyor…</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/kategoriler" className="p-2 hover:bg-natural-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Kategori Düzenle</h1>
          <p className="text-muted-foreground">Kategori bilgilerini güncelleyin</p>
        </div>
      </div>

      <form onSubmit={submit}>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
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
                    value={form.description ?? ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="Kategori açıklaması..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Üst Kategori</label>
                  <select
                    value={form.parentId ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, parentId: e.target.value ? e.target.value : null })
                    }
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                  >
                    <option value="">— Yok —</option>
                    {parentOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Sıra (order)</label>
                  <input
                    type="number"
                    value={String(form.order ?? 0)}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value || 0) })}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-bold mb-4">Kategori Görseli</h3>

              {imagePreview ? (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Kategori görseli"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
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
                        if (file) onUpload(file)
                      }}
                    />
                  </label>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" />
              {saving ? "Kaydediliyor..." : "Değişiklikleri Kaydet"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
