import Link from 'next/link'
import { Package, MapPin, User, Heart, ShoppingBag } from 'lucide-react'

export default function AccountDashboard() {
  // TODO: Fetch user data from session/API
  const user = {
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    memberSince: '2023-05-15',
  }

  const stats = {
    totalOrders: 12,
    activeOrders: 2,
    savedAddresses: 3,
    wishlistItems: 8,
  }

  const recentOrders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-10',
      total: 24999,
      status: 'Teslim Edildi',
      statusColor: 'bg-green-100 text-green-700',
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-15',
      total: 12999,
      status: 'Kargoda',
      statusColor: 'bg-blue-100 text-blue-700',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Hoş Geldiniz, {user.name}
        </h1>
        <p className="text-muted-foreground">
          Hesap bilgilerinizi ve siparişlerinizi buradan yönetebilirsiniz
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Quick Stats */}
        <Link
          href="/hesabim/siparisler"
          className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-walnut-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-walnut-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-walnut-700">{stats.totalOrders}</p>
              <p className="text-sm text-muted-foreground">Toplam Sipariş</p>
            </div>
          </div>
        </Link>

        <Link
          href="/hesabim/siparisler"
          className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-walnut-700">{stats.activeOrders}</p>
              <p className="text-sm text-muted-foreground">Aktif Sipariş</p>
            </div>
          </div>
        </Link>

        <Link
          href="/hesabim/adresler"
          className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-clay-100 rounded-full flex items-center justify-center">
              <MapPin className="h-6 w-6 text-clay-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-walnut-700">{stats.savedAddresses}</p>
              <p className="text-sm text-muted-foreground">Kayıtlı Adres</p>
            </div>
          </div>
        </Link>

        <Link
          href="/favoriler"
          className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-natural-200 rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-sage-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-walnut-700">{stats.wishlistItems}</p>
              <p className="text-sm text-muted-foreground">Favori Ürün</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Son Siparişler</h2>
              <Link
                href="/hesabim/siparisler"
                className="text-sm text-walnut-600 hover:text-walnut-700 font-semibold"
              >
                Tümünü Gör →
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Henüz siparişiniz bulunmuyor
              </p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/hesabim/siparisler/${order.orderNumber}`}
                    className="block p-4 border rounded-lg hover:bg-natural-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{order.orderNumber}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{order.date}</span>
                      <span className="font-semibold text-walnut-600">
                        {order.total.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Hesap İşlemleri</h2>
            <div className="space-y-2">
              <Link
                href="/hesabim/profil"
                className="flex items-center gap-3 p-3 hover:bg-natural-50 rounded-lg transition-colors"
              >
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Profil Bilgilerim</span>
              </Link>
              <Link
                href="/hesabim/siparisler"
                className="flex items-center gap-3 p-3 hover:bg-natural-50 rounded-lg transition-colors"
              >
                <Package className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Siparişlerim</span>
              </Link>
              <Link
                href="/hesabim/adresler"
                className="flex items-center gap-3 p-3 hover:bg-natural-50 rounded-lg transition-colors"
              >
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Adreslerim</span>
              </Link>
              <Link
                href="/favoriler"
                className="flex items-center gap-3 p-3 hover:bg-natural-50 rounded-lg transition-colors"
              >
                <Heart className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Favorilerim</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}