'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Mail, Phone, ShoppingBag, Calendar } from 'lucide-react'

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  // TODO: Fetch from API
  const customers = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '0555 123 45 67',
      role: 'CUSTOMER',
      totalOrders: 8,
      totalSpent: 89999,
      lastOrder: '2024-01-20',
      createdAt: '2023-06-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse@example.com',
      phone: '0555 234 56 78',
      role: 'CUSTOMER',
      totalOrders: 3,
      totalSpent: 34999,
      lastOrder: '2024-01-18',
      createdAt: '2023-09-20',
      status: 'active',
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      phone: '0555 345 67 89',
      role: 'CUSTOMER',
      totalOrders: 12,
      totalSpent: 145999,
      lastOrder: '2024-01-22',
      createdAt: '2023-03-10',
      status: 'active',
    },
    {
      id: '4',
      name: 'Admin User',
      email: 'admin@mutfakmobilya.com',
      phone: '0555 456 78 90',
      role: 'ADMIN',
      totalOrders: 0,
      totalSpent: 0,
      lastOrder: null,
      createdAt: '2023-01-01',
      status: 'active',
    },
  ]

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesRole = roleFilter === 'all' || customer.role === roleFilter
    return matchesSearch && matchesRole
  })

  const stats = {
    total: customers.length,
    customers: customers.filter((c) => c.role === 'CUSTOMER').length,
    admins: customers.filter((c) => c.role === 'ADMIN').length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Müşteriler</h1>
        <p className="text-muted-foreground">Tüm müşterileri görüntüleyin ve yönetin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Kullanıcı</p>
          <p className="text-3xl font-bold text-walnut-700">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Müşteriler</p>
          <p className="text-3xl font-bold text-sage-600">{stats.customers}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Adminler</p>
          <p className="text-3xl font-bold text-walnut-600">{stats.admins}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-muted-foreground mb-1">Toplam Ciro</p>
          <p className="text-3xl font-bold text-green-600">
            {(stats.totalRevenue / 1000).toFixed(0)}K ₺
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
              placeholder="Ad, e-posta veya telefon ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
          >
            <option value="all">Tüm Roller</option>
            <option value="CUSTOMER">Müşteriler</option>
            <option value="ADMIN">Adminler</option>
          </select>
          <button className="flex items-center gap-2 px-6 py-3 border rounded-lg hover:bg-natural-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-natural-100 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Müşteri</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">İletişim</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Sipariş</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Toplam Harcama</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Kayıt Tarihi</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-natural-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {customer.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        customer.role === 'ADMIN'
                          ? 'bg-walnut-100 text-walnut-700'
                          : 'bg-sage-100 text-sage-700'
                      }`}
                    >
                      {customer.role === 'ADMIN' ? 'Admin' : 'Müşteri'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{customer.totalOrders}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-walnut-600">
                      {customer.totalSpent.toLocaleString('tr-TR')} ₺
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {customer.createdAt}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/musteriler/${customer.id}`}
                        className="px-3 py-1.5 text-sm border rounded-lg hover:bg-natural-50 transition-colors"
                      >
                        Detay
                      </Link>
                      <button className="px-3 py-1.5 text-sm text-walnut-600 hover:bg-walnut-50 rounded-lg transition-colors">
                        E-posta
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
            Toplam {filteredCustomers.length} müşteri gösteriliyor
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

