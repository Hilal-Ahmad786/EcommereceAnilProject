// src/app/(admin)/admin/blog/page.tsx
"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Plus, Search, Edit, Trash2, Eye, Calendar } from "lucide-react"

type AdminPost = {
  id: string
  title: string
  slug: string
  excerpt?: string
  authorName?: string
  published: boolean
  publishedAt?: string | null
  createdAt: string
  views: number
  category?: string | null
  coverImage?: string | null
}

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<AdminPost[]>([])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`/api/blog-posts?${params.toString()}`, { cache: "no-store" })
      if (!res.ok) throw new Error("Yüklenemedi")
      const json = await res.json()
      setPosts(json?.data ?? [])
    } catch (e: any) {
      console.error(e)
      setError(e?.message || "Hata")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts
    const q = searchQuery.toLowerCase()
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        (post.excerpt || "").toLowerCase().includes(q)
    )
  }, [posts, searchQuery])

  const handleDelete = async (id: string) => {
    if (!confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")) return
    try {
      const res = await fetch(`/api/blog-posts/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Silinemedi")
      setPosts((arr) => arr.filter((p) => p.id !== id))
      alert("Blog yazısı silindi")
    } catch (error) {
      alert("Bir hata oluştu")
    }
  }

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/blog-posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !current }),
      })
      if (!res.ok) throw new Error("Güncellenemedi")
      setPosts((arr) =>
        arr.map((p) => (p.id === id ? { ...p, published: !current, publishedAt: !current ? new Date().toISOString() : null } : p))
      )
    } catch {
      alert("Bir hata oluştu")
    }
  }

  const totalViews = posts.reduce((sum, p) => sum + (Number(p.views) || 0), 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Blog Yazıları</h1>
          <p className="text-muted-foreground">Blog içeriklerini yönetin</p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus className="h-5 w-5" />
          Yeni Yazı
        </Link>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Yazı</p>
          <p className="text-3xl font-bold text-walnut-700">{posts.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Yayınlanan</p>
          <p className="text-3xl font-bold text-sage-600">
            {posts.filter((p) => p.published).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Taslak</p>
          <p className="text-3xl font-bold text-yellow-600">
            {posts.filter((p) => !p.published).length}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Görüntüleme</p>
          <p className="text-3xl font-bold text-walnut-700">{totalViews}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Yazı başlığı veya içerik ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") load() }}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="published">Yayınlanan</option>
            <option value="draft">Taslak</option>
          </select>
          <button
            onClick={load}
            className="px-5 py-3 border rounded-lg hover:bg-natural-50"
          >
            Filtrele
          </button>
        </div>

        {error && (
          <div className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="bg-white border rounded-xl p-12 text-center">Yükleniyor…</div>
      ) : filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div key={post.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-all">
              <div className="flex gap-6">
                {/* Thumbnail */}
                <div className="w-48 h-32 bg-natural-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">📝</div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link
                        href={`/admin/blog/duzenle/${post.id}`}
                        className="text-xl font-bold hover:text-walnut-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                      )}
                    </div>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        post.published
                          ? "bg-sage-100 text-sage-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.published ? "Yayında" : "Taslak"}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.published ? (post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("tr-TR") : "") : new Date(post.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                    <span>•</span>
                    <span className="inline-block px-2 py-0.5 bg-natural-100 rounded text-xs">
                      {post.category || "Genel"}
                    </span>
                    {typeof post.views === "number" && (
                      <>
                        <span>•</span>
                        <span>{post.views} görüntüleme</span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-natural-50 transition-colors"
                    >
                      <Eye className="h-3 w-3" />
                      Önizle
                    </Link>
                    <Link
                      href={`/admin/blog/duzenle/${post.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-natural-50 transition-colors"
                    >
                      <Edit className="h-3 w-3" />
                      Düzenle
                    </Link>
                    <button
                      onClick={() => handleTogglePublish(post.id, post.published)}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        post.published
                          ? "text-yellow-600 hover:bg-yellow-50"
                          : "text-sage-600 hover:bg-sage-50"
                      }`}
                    >
                      {post.published ? "Taslağa Al" : "Yayınla"}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                    >
                      <Trash2 className="h-3 w-3" />
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Blog yazısı bulunamadı
          </h3>
          <p className="text-muted-foreground mb-6">
            İlk blog yazınızı oluşturarak başlayın
          </p>
          <Link
            href="/admin/blog/yeni"
            className="inline-flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <Plus className="h-5 w-5" />
            Yeni Yazı Oluştur
          </Link>
        </div>
      )}
    </div>
  )
}
