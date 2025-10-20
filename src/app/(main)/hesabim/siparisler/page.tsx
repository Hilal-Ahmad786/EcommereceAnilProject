import Link from 'next/link'
import { Eye, Package } from 'lucide-react'

export default function OrderHistoryPage() {
  // TODO: Fetch orders from API
  const orders = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-10',
      total: 24999,
      status: 'Teslim Edildi',
      statusColor: 'bg-green-100 text-green-700',
      items: [
        { name: 'Ahşap Mutfak Adası', quantity: 1, price: 24999 },
      ],
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-15',
      total: 12999,
      status: 'Kargoda',
      statusColor: 'bg-blue-100 text-blue-700',
      items: [
        { name: 'Modern Mutfak Dolabı', quantity: 1, price: 12999 },
      ],
    },
    {
      id: '3',
      orderNumber: 'ORD-2023-125',
      date: '2023-12-20',
      total: 18999,
      status: 'Teslim Edildi',
      statusColor: 'bg-green-100 text-green-700',
      items: [
        { name: 'Mermer Tezgah', quantity: 1, price: 18999 },
      ],
    },
    {
      id: '4',
      orderNumber: 'ORD-2023-110',
      date: '2023-11-05',
      total: 4999,
      status: 'İptal Edildi',
      statusColor: 'bg-red-100 text-red-700',
      items: [
        { name: 'Bar Sandalyesi Seti', quantity: 1, price: 4999 },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <Link
          href="/hesabim"
          className="text-sm text-walnut-600 hover:text-walnut-700 mb-4 inline-block"
        >
          ← Hesabıma Dön
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Siparişlerim
        </h1>
        <p className="text-muted-foreground">
          {orders.length} sipariş
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-walnut-700 mb-2">
            Henüz siparişiniz yok
          </h3>
          <p className="text-muted-foreground mb-6">
            İlk siparişinizi vererek alışverişe başlayın
          </p>
          <Link
            href="/urunler"
            className="inline-block bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Ürünleri İncele
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border rounded-xl p-6">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b">
                <div>
                  <h3 className="font-bold text-lg mb-1">{order.orderNumber}</h3>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${order.statusColor}`}>
                    {order.status}
                  </span>
                  <Link
                    href={`/hesabim/siparisler/${order.orderNumber}`}
                    className="flex items-center gap-2 text-walnut-600 hover:text-walnut-700 font-semibold"
                  >
                    <Eye className="h-4 w-4" />
                    Detaylar
                  </Link>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {item.price.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Toplam</span>
                <span className="text-xl font-bold text-walnut-600">
                  {order.total.toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}