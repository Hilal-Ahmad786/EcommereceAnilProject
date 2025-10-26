// src/app/(admin)/admin/blog/duzenle/[id]/page.tsx
"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import BlogForm, { BlogFormInitial } from "@/components/admin/BlogForm"

export default function EditBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = String(params?.id || "")
  const [loading, setLoading] = useState(true)
  const [initial, setInitial] = useState<Partial<BlogFormInitial> | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch(`/api/blog-posts/${id}`, { cache: "no-store" })
        if (!res.ok) throw new Error("Bulunamadı")
        const json = await res.json()
        const p = json?.data
        if (mounted) {
          setInitial({
            title: p?.title ?? "",
            slug: p?.slug ?? "",
            excerpt: p?.excerpt ?? "",
            content: p?.content ?? "",
            category: p?.category ?? "",
            coverImage: p?.coverImage ?? null,
            published: !!p?.published,
          })
        }
      } catch (e) {
        alert("Yazı bulunamadı")
        router.push("/admin/blog")
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [id, router])

  const handleSubmit = async (payload: Required<BlogFormInitial>) => {
    const res = await fetch(`/api/blog-posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error || "Güncellenemedi")
    }
    alert("Blog yazısı güncellendi")
    router.push("/admin/blog")
    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return
    const res = await fetch(`/api/blog-posts/${id}`, { method: "DELETE" })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      alert(err?.error || "Silinemedi")
      return
    }
    alert("Silindi")
    router.push("/admin/blog")
    router.refresh()
  }

  if (loading || !initial) {
    return <div className="p-6 bg-white border rounded-xl">Yükleniyor…</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="p-2 hover:bg-natural-100 rounded-lg">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Yazıyı Düzenle</h1>
          <p className="text-muted-foreground">{initial?.title}</p>
        </div>
      </div>

      <BlogForm
        initial={initial || undefined}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        submitLabel="Güncelle"
        showDelete
      />
    </div>
  )
}
