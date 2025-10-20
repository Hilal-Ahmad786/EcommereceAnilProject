'use client'

import { useState } from 'react'
import { Search, Star, Check, X, Eye, Trash2 } from 'lucide-react'

export default function AdminReviewsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // TODO: Fetch from API
  const [reviews, setReviews] = useState([
    {
      id: '1',
      productId: '1',
      productName: 'Modern Mutfak Dolabı',
      user: 'Ahmet Yılmaz',
      rating: 5,
      title: 'Çok memnun kaldım',
      comment: 'Kaliteli bir ürün, montajı kolay ve görüntüsü harika.',
      isApproved: true,
      createdAt: '2024-01-20',
    },
    {
      id: '2',
      productId: '2',
      productName: 'Ahşap Mutfak Adası',
      user: 'Ayşe Demir',
      rating: 4,
      title: 'Güzel ama pahalı',
      comment: 'Ürün kaliteli ancak fiyatı biraz yüksek geldi.',
      isApproved: false,
      createdAt: '2024-01-19',
    },
    {
      id: '3',
      productId: '1',
      productName: 'Modern Mutfak Dolabı',
      user: 'Mehmet Kaya',
      rating: 5,
      title: 'Harika!',
      comment: 'Tam aradığım ürün, herkese tavsiye ederim.',
      isApproved: true,
      createdAt: '2024-01-18',
    },
    {
      id: '4',
      productId: '3',
      productName: 'Mermer Tezgah',
      user: 'Fatma Özkan',
      rating: 3,
      title: 'İdare eder',
      comment: 'Fena değil ama beklentilerim daha yüksekti.',
      isApproved: false,
      createdAt: '2024-01-17',
    },
  ])

  const handleApprove = async (id: string) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setReviews(
        reviews.map((review) =>
          review.id === id ? { ...review, isApproved: true } : review
        )
      )
      alert('Yorum onaylandı')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleReject = async (id: string) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setReviews(
        reviews.map((review) =>
          review.id === id ? { ...review, isApproved: false } : review
        )
      )
      alert('Yorum reddedildi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setReviews(reviews.filter((review) => review.id !== id))
      alert('Yorum silindi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'approved' && review.isApproved) ||
      (statusFilter === 'pending' && !review.isApproved)
    return matchesSearch && matchesStatus
  })

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  const stats = {
    total: reviews.length,
    approved: reviews.filter((r) => r.isApproved).length,
    pending: reviews.filter((r) => !r.isApproved).length,
    avgRating: (
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    ).toFixed(1),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Ürün İncelemeleri</h1>
        <p className="text-muted-foreground">Müşteri yorumlarını yönetin</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Yorum</p>
          <p className="text-3xl font-bold text-walnut-700">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Onaylanan</p>
          <p className="text-3xl font-bold text-sage-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Bekleyen</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Ort. Puan</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-walnut-700">{stats.avgRating}</p>
            <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ürün, kullanıcı veya yorum ara..."
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
            <option value="all">Tüm Yorumlar</option>
            <option value="approved">Onaylanan</option>
            <option value="pending">Bekleyen</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white border rounded-xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {renderStars(review.rating)}
                  <span
                    className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      review.isApproved
                        ? 'bg-sage-100 text-sage-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {review.isApproved ? 'Onaylandı' : 'Beklemede'}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{review.title}</h3>
                <p className="text-muted-foreground mb-3">{review.comment}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-medium">{review.user}</span>
                  <span>•</span>
                  <span>Ürün: {review.productName}</span>
                  <span>•</span>
                  <span>{review.createdAt}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t">
              {!review.isApproved && (
                <button
                  onClick={() => handleApprove(review.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-sage-500 hover:bg-sage-600 text-white rounded-lg transition-colors"
                >
                  <Check className="h-4 w-4" />
                  Onayla
                </button>
              )}
              {review.isApproved && (
                <button
                  onClick={() => handleReject(review.id)}
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Reddet
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
                <Eye className="h-4 w-4" />
                Ürünü Görüntüle
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors ml-auto"
              >
                <Trash2 className="h-4 w-4" />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="bg-white border rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Yorum bulunamadı
          </h3>
          <p className="text-muted-foreground">
            Henüz müşteri yorumu bulunmuyor veya arama kriterlerinize uygun yorum yok.
          </p>
        </div>
      )}
    </div>
  )
}

