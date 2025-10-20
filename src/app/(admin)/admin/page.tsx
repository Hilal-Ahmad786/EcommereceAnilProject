import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  // TODO: Fetch from API
  const stats = {
    totalProducts: 156,
    totalOrders: 1240,
    totalCustomers: 520,
    totalRevenue: 2450000,
  }

  const recentOrders = [
    { id: '1', customer: 'Ahmet Yılmaz', total: 24999, status: 'Beklemede' },
    { id: '2', customer: 'Ayşe Demir', total: 12999, status: 'Kargoda' },
    { id: '3', customer: 'Mehmet Kaya', total: 18999, status: 'Teslim Edildi' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Dashboard</h1>
        <p className="text-muted-foreground">Hoş geldiniz, işletmenizin özetini görün</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Ürün</p>
              <p className="text-3xl font-bold text-walnut-700 mt-2">
                {stats.totalProducts}
              </p>
            </div>
            <div className="w-12 h-12 bg-walnut-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-walnut-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
              <p className="text-3xl font-bold text-walnut-700 mt-2">
                {stats.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-sage-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Müşteri</p>
              <p className="text-3xl font-bold text-walnut-700 mt-2">
                {stats.totalCustomers}
              </p>
            </div>
            <div className="w-12 h-12 bg-clay-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-clay-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Gelir</p>
              <p className="text-3xl font-bold text-walnut-700 mt-2">
                {(stats.totalRevenue / 1000).toFixed(0)}K ₺
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">Son Siparişler</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <p className="font-semibold">{order.customer}</p>
                  <p className="text-sm text-muted-foreground">
                    Sipariş #{order.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-walnut-600">
                    {order.total.toLocaleString('tr-TR')} ₺
                  </p>
                  <p className="text-sm text-muted-foreground">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}