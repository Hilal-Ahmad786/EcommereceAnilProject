import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Package, Truck, CheckCircle, MapPin } from 'lucide-react'

export default function OrderDetailPage() {
  const params = useParams()

  // TODO: Fetch order from API using params.orderId
  const order = {
    orderNumber: params.orderId,
    date: '2024-01-15',
    status: 'Kargoda',
    statusColor: 'bg-blue-100 text-blue-700',
    trackingNumber: 'TRK1234567890',
    items: [
      {
        id: '1',
        name: 'Modern Mutfak Dolabı',
        quantity: 1,
        price: 12999,
        woodFinish: 'Ceviz',
        image: '/images/product.jpg',
      },
    ],
    address: {
      fullName: 'Ahmet Yılmaz',
      phone: '0555 123 45 67',
      addressLine: 'Örnek Mahallesi, Örnek Sokak No: 123 Daire: 4',
      district: 'Kadıköy',
      city: 'İstanbul',
      postalCode: '34000',
    },
    payment: {
      method: 'Kredi Kartı',
      subtotal: 12999,
      shipping: 0,
      total: 12999,
    },
  }

  const timeline = [
    { status: 'Sipariş Alındı', date: '15 Ocak 2024, 14:30', completed: true },
    { status: 'Hazırlanıyor', date: '15 Ocak 2024, 16:00', completed: true },
    { status: 'Kargoya Verildi', date: '16 Ocak 2024, 09:00', completed: true },
    { status: 'Dağıtımda', date: '17 Ocak 2024, 08:00', completed: false },
    { status: 'Teslim Edildi', date: '-', completed: false },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link
          href="/hesabim/siparisler"
          className="text-sm text-walnut-600 hover:text-walnut-700 mb-4 inline-block"
        >
          ← Siparişlerime Dön
        </Link>
      </div>

      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700 mb-2">
            Sipariş Detayı
          </h1>
          <p className="text-muted-foreground">
            Sipariş No: <span className="font-semibold">{order.orderNumber}</span>
          </p>
          <p className="text-sm text-muted-foreground">{order.date}</p>
        </div>
        <span className={`text-sm px-4 py-2 rounded-full font-semibold ${order.statusColor}`}>
          {order.status}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-bold text-lg mb-6">Sipariş Durumu</h2>
            <div className="space-y-4">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        item.completed
                          ? 'bg-sage-500 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-current" />
                      )}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className={`w-0.5 h-12 ${item.completed ? 'bg-sage-500' : 'bg-gray-200'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <p className={`font-semibold ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.status}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Tracking Number */}
            {order.trackingNumber && (
              <div className="mt-6 p-4 bg-natural-100 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Kargo Takip No</p>
                <p className="font-mono font-bold text-walnut-600">{order.trackingNumber}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="font-bold text-lg mb-4">Sipariş Ürünleri</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="w-20 h-20 bg-natural-100 rounded-lg flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      🛋️
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    {item.woodFinish && (
                      <p className="text-sm text-muted-foreground">Renk: {item.woodFinish}</p>
                    )}
                    <p className="text-sm text-muted-foreground">Adet: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-walnut-600">
                      {item.price.toLocaleString('tr-TR')} ₺
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-walnut-600" />
              <h3 className="font-bold">Teslimat Adresi</h3>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{order.address.fullName}</p>
              <p className="text-muted-foreground">{order.address.phone}</p>
              <p className="text-muted-foreground">
                {order.address.addressLine}
              </p>
              <p className="text-muted-foreground">
                {order.address.district} / {order.address.city}
              </p>
              {order.address.postalCode && (
                <p className="text-muted-foreground">{order.address.postalCode}</p>
              )}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="font-bold mb-4">Ödeme Özeti</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ara Toplam</span>
                <span>{order.payment.subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kargo</span>
                <span className="text-sage-600">
                  {order.payment.shipping === 0 ? 'Ücretsiz' : order.payment.shipping.toLocaleString('tr-TR') + ' ₺'}
                </span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Toplam</span>
                <span className="text-walnut-600">
                  {order.payment.total.toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                Ödeme Yöntemi: <span className="font-medium">{order.payment.method}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}