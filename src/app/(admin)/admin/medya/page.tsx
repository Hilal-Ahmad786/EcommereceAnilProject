'use client'

import { useState } from 'react'
import { Upload, Search, Filter, Grid3x3, List, Trash2, Download, ExternalLink, Image as ImageIcon } from 'lucide-react'

export default function AdminMediaPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])

  // TODO: Fetch from API / Vercel Blob
  const media = [
    {
      id: '1',
      name: 'modern-mutfak-dolabi.jpg',
      url: '/images/products/1.jpg',
      size: 245000,
      type: 'image/jpeg',
      dimensions: '1920x1080',
      uploadedAt: '2024-01-15',
      uploadedBy: 'Admin',
    },
    {
      id: '2',
      name: 'ahsap-mutfak-adasi.jpg',
      url: '/images/products/2.jpg',
      size: 312000,
      type: 'image/jpeg',
      dimensions: '1920x1080',
      uploadedAt: '2024-01-14',
      uploadedBy: 'Admin',
    },
    {
      id: '3',
      name: 'mermer-tezgah.jpg',
      url: '/images/products/3.jpg',
      size: 198000,
      type: 'image/jpeg',
      dimensions: '1920x1080',
      uploadedAt: '2024-01-13',
      uploadedBy: 'Admin',
    },
    {
      id: '4',
      name: 'bar-sandalyesi.jpg',
      url: '/images/products/4.jpg',
      size: 167000,
      type: 'image/jpeg',
      dimensions: '1920x1080',
      uploadedAt: '2024-01-12',
      uploadedBy: 'Admin',
    },
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // TODO: Implement Vercel Blob upload
    console.log('Uploading files:', files)
    alert(`${files.length} dosya yükleniyor...`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) return

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      alert('Dosya silindi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedFiles.length} dosyayı silmek istediğinizden emin misiniz?`))
      return

    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSelectedFiles([])
      alert('Dosyalar silindi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const toggleFileSelection = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id]
    )
  }

  const totalSize = media.reduce((sum, file) => sum + file.size, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700">Medya Kütüphanesi</h1>
          <p className="text-muted-foreground">Görselleri ve dosyaları yönetin</p>
        </div>
        <label className="flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
          <Upload className="h-5 w-5" />
          Dosya Yükle
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Dosya</p>
          <p className="text-3xl font-bold text-walnut-700">{media.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Boyut</p>
          <p className="text-3xl font-bold text-sage-600">{formatFileSize(totalSize)}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Seçili</p>
          <p className="text-3xl font-bold text-walnut-600">{selectedFiles.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Bu Ay Yüklenen</p>
          <p className="text-3xl font-bold text-walnut-700">{media.length}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Dosya ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {selectedFiles.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Seçilenleri Sil ({selectedFiles.length})
              </button>
            )}

            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid' ? 'bg-walnut-500 text-white' : 'hover:bg-natural-50'
                }`}
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list' ? 'bg-walnut-500 text-white' : 'hover:bg-natural-50'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {media.map((file) => (
            <div
              key={file.id}
              className={`group relative bg-white border-2 rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                selectedFiles.includes(file.id) ? 'border-walnut-500' : 'border-transparent'
              }`}
            >
              {/* Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedFiles.includes(file.id)}
                  onChange={() => toggleFileSelection(file.id)}
                  className="w-5 h-5 rounded border-gray-300 text-walnut-500 focus:ring-walnut-500 cursor-pointer"
                />
              </div>

              {/* Image Preview */}
              <div className="aspect-square bg-natural-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>

              {/* File Info */}
              <div className="p-3">
                <p className="text-sm font-medium truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                  <span className="text-xs text-muted-foreground">{file.dimensions}</span>
                </div>
              </div>

              {/* Actions Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white rounded-lg hover:bg-natural-50 transition-colors"
                  title="Görüntüle"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
                <button
                  className="p-2 bg-white rounded-lg hover:bg-natural-50 transition-colors"
                  title="İndir"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
                  className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Media List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-natural-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedFiles.length === media.length}
                    onChange={(e) =>
                      setSelectedFiles(e.target.checked ? media.map((f) => f.id) : [])
                    }
                    className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Dosya</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Boyut</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Boyutlar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Yüklenme</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {media.map((file) => (
                <tr key={file.id} className="hover:bg-natural-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => toggleFileSelection(file.id)}
                      className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-natural-100 rounded flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{file.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{formatFileSize(file.size)}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {file.dimensions}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {file.uploadedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button className="p-2 hover:bg-natural-100 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(file.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty State */}
      {media.length === 0 && (
        <div className="bg-white border-2 border-dashed rounded-xl p-12 text-center">
          <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            Henüz dosya yüklenmemiş
          </h3>
          <p className="text-muted-foreground mb-6">
            Görselleri yükleyerek başlayın
          </p>
          <label className="inline-flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer">
            <Upload className="h-5 w-5" />
            İlk Dosyayı Yükle
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  )
}

