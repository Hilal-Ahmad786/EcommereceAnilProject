'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Eye, Clock, Calendar } from 'lucide-react'

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // TODO: Fetch from API
  const [posts, setPosts] = useState([
    {
      id: '1',
      title: '2024 Mutfak Tasarım Trendleri',
      slug: '2024-mutfak-tasarim-trendleri',
      excerpt: 'Bu yıl mutfak tasarımında öne çıkan renkler, malzemeler...',
      author: 'Admin',
      published: true,
      publishedAt: '2024-01-15',
      createdAt: '2024-01-14',
      views: 1245,
      category: 'Tasarım',
    },
    {
      id: '2',
      title: 'Küçük Mutfaklar İçin 10 İpucu',
      slug: 'kucuk-mutfaklar-icin-ipucu',
      excerpt: 'Sınırlı alanı maksimum verimlilikle kullanma yolları...',
      author: 'Admin',
      published: true,
      publishedAt: '2024-01-10',
      createdAt: '2024-01-09',
      views: 892,
      category: 'Organizasyon',
    },
    {
      id: '3',
      title: 'Ahşap Mutfak Bakımı Rehberi',
      slug: 'ahsap-mutfak-bakim-rehberi',
      excerpt: 'Ahşap mobilyalarınızı yıllarca yeni gibi tutun...',
      author: 'Admin',
      published: false,
      publishedAt: null,
      createdAt: '2024-01-20',
      views: 0,
      category: 'Bakım',
    },
  ])

  const handleDelete = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPosts(posts.filter((post) => post.id !== id))
      alert('Blog yazısı silindi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleTogglePublish = async (id: string) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, published: !post.published } : post
        )
      )
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && post.published) ||
      (statusFilter === 'draft' && !post.published)
    return matchesSearch && matchesStatus
  })

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
          <p className="text-3xl font-bold text-walnut-700">
            {posts.reduce((sum, p) => sum + p.views, 0)}
          </p>
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
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="published">Yayınlanan</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white border rounded-xl p-6 hover:shadow-md transition-all">
            <div className="flex gap-6">
              {/* Thumbnail */}
              <div className="w-48 h-32 bg-natural-100 rounded-lg flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  📝
                </div>
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
                    <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      post.published
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {post.published ? 'Yayında' : 'Taslak'}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {post.published ? post.publishedAt : post.createdAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {post.views} görüntüleme
                  </span>
                  <span>•</span>
                  <span className="inline-block px-2 py-0.5 bg-natural-100 rounded text-xs">
                    {post.category}
                  </span>
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
                    onClick={() => handleTogglePublish(post.id)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      post.published
                        ? 'text-yellow-600 hover:bg-yellow-50'
                        : 'text-sage-600 hover:bg-sage-50'
                    }`}
                  >
                    {post.published ? 'Taslağa Al' : 'Yayınla'}
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

      {filteredPosts.length === 0 && (
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

