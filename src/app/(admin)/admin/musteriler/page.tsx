// src/app/(admin)/admin/musteriler/page.tsx

'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import CustomerTable from '@/components/admin/CustomerTable'

type ApiCustomer = {
  id: string
  name: string | null
  email: string
  role: 'ADMIN' | 'CUSTOMER'
  createdAt: string
  ordersCount: number
  totalSpent: number
  lastOrderDate: string | null
  location: string | null
}
type ApiResp = {
  data: ApiCustomer[]
  meta: { page: number; pageSize: number; total: number; pages: number }
}

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | 'ADMIN' | 'CUSTOMER'>('all')
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<ApiCustomer[]>([])
  const [meta, setMeta] = useState<ApiResp['meta']>({ page: 1, pageSize, total: 0, pages: 0 })

  useEffect(() => {
    const controller = new AbortController()
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams()
        if (searchQuery) params.set('search', searchQuery)
        if (roleFilter !== 'all') params.set('role', roleFilter)
        params.set('page', String(page))
        params.set('pageSize', String(pageSize))

        const res = await fetch(`/api/customers?${params.toString()}`, {
          signal: controller.signal,
          cache: 'no-store',
        })
        if (!res.ok) throw new Error('Müşteriler alınamadı')
        const json: ApiResp = await res.json()
        setRows(json.data || [])
        setMeta(json.meta)
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err?.message || 'Beklenmedik bir hata oluştu')
          console.error('Customers fetch error:', err)
        }
      } finally {
        setLoading(false)
      }
    })()
    return () => controller.abort()
  }, [searchQuery, roleFilter, page, pageSize])

  const totalLabel = useMemo(
    () => `Toplam ${meta.total} müşteri (Sayfa ${meta.page}/${meta.pages})`,
    [meta]
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Müşteriler</h1>
        <div className="text-sm text-muted-foreground">{totalLabel}</div>
      </div>

      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              className="w-full border rounded-lg pl-9 pr-3 py-2"
              placeholder="İsim veya e-posta ile ara…"
              value={searchQuery}
              onChange={(e) => {
                setPage(1)
                setSearchQuery(e.target.value)
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-neutral-600" />
            <select
              className="border rounded-lg py-2 px-3"
              value={roleFilter}
              onChange={(e) => {
                setPage(1)
                setRoleFilter(e.target.value as any)
              }}
            >
              <option value="all">Tümü</option>
              <option value="CUSTOMER">Müşteri</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="border border-red-300 bg-red-50 text-red-800 rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="border rounded-lg p-6 text-sm text-muted-foreground">
          Yükleniyor…
        </div>
      ) : (
        <CustomerTable customers={rows} />
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <button
          className="px-3 py-2 border rounded-lg disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Önceki
        </button>
        <div className="text-sm text-muted-foreground">
          Sayfa {meta.page} / {meta.pages || 1}
        </div>
        <button
          className="px-3 py-2 border rounded-lg disabled:opacity-50"
          disabled={page >= (meta.pages || 1)}
          onClick={() => setPage((p) => p + 1)}
        >
          Sonraki
        </button>
      </div>
    </div>
  )
}
