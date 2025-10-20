'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Eye, Printer, Download, Filter } from 'lucide-react'

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // TODO: Fetch from API
  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customer: 'Ahmet Yılmaz',
      date: '2024-01-15',
      total: 24999,
      status: 'DELIVERED',
      statusText: 'Teslim Edildi',
      items: 3,
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customer: 'Ayşe Demir',
      date: '2024-01-20',
      total: 12999,
      status: 'SHIPPED',
      statusText: 'Kargoda',
      items: 1,
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customer: 'Mehmet Kaya',
      date: '2024-01-22',
      total: 18999,
      status: 'PROCESSING',
      statusText: 'Hazırlanıyor',
      items: 2,
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      customer: 'Fatma Özkan',
      date: '2024-01-23',
      total: 8999,
      status: 'PENDING',
      statusText: 'Beklemede',
      items: 1,
    },
    {
      id: '5',
      orderNumber: 'ORD-2024-005',
      customer: 'Ali Çelik',
      date: '2024-01-24',
      total: 34999,
      status: 'PAYMENT_RECEIVED',
      statusText: 'Ödeme Alındı',
      items: 5,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700'
      case 'PAYMENT_RECEIVED':
        return 'bg-blue-100 text-blue-700'
      case 'PROCESSING':
        return 'bg-purple-100 text-purple-700'
      case 'SHIPPED':
        return 'bg-indigo-100 text-indigo-700'
      case 'DELIVERED':
        return 'bg-green-100 text-green-700'
      case 'CANCELLED':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Siparişler</h1>
        <p className="text-muted-foreground">Tüm siparişleri yönetin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Sipariş</p>
          <p className="text-3xl font-bold text-walnut-700">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Bekleyen</p>
          <p className="text-3xl font-bold text-yellow-600">
            {orders.filter((o) => o.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Hazırlanıyor</p>
          <p className="text-3xl font-bold text-purple-600">
            {orders.filter((o) => o.status === 'PROCESSING').length}
          </p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Kargoda</p>
          <p className="text-3xl font-bold text-indigo-600">
            {orders.filter((o) => o.status === 'SHIPPED').length}
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
              placeholder="Sipariş numarası veya müşteri ara..."
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
            <option value="PENDING">Beklemede</option>
            <option value="PAYMENT_RECEIVED">Ödeme Alındı</option>
            <option value="PROCESSING">Hazırlanıyor</option>
            <option value="SHIPPED">Kargoda</option>
            <option value="DELIVERED">Teslim Edildi</option>
            <option value="CANCELLED">İptal Edildi</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-natural-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-natural-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Sipariş No</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Müşteri</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Tarih</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Ürün</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Tutar</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Durum</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-natural-50">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/siparisler/${order.id}`}
                      className="font-medium text-walnut-600 hover:text-walnut-700"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4 text-sm">{order.items} ürün</td>
                  <td className="px-6 py-4 text-sm font-semibold">
                    {order.total.toLocaleString('tr-TR')} ₺
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/siparisler/${order.id}`}
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="Görüntüle"
                      >
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Link>
                      <button
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="Yazdır"
                      >
                        <Printer className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
                        title="İndir"
                      >
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Toplam {filteredOrders.length} sipariş gösteriliyor
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
              Önceki
            </button>
            <button className="px-4 py-2 bg-walnut-500 text-white rounded-lg">1</button>
            <button className="px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
              Sonraki
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}