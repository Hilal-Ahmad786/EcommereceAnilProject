'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Printer, Mail, Package, Truck, Check } from 'lucide-react'

export default function AdminOrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [orderStatus, setOrderStatus] = useState('PROCESSING')

  // TODO: Fetch order from API using params.id
  const order = {
    id: params.id,
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      phone: '0555 123 45 67',
    },
    date: '2024-01-22 14:30',
    status: 'PROCESSING',
    items: [
      {
        id: '1',
        name: 'Modern Mutfak Dolabı',
        quantity: 1,
        price: 12999,
        woodFinish: 'Ceviz',
      },
      {
        id: '2',
        name: 'Mermer Tezgah',
        quantity: 1,
        price: 6000,
        woodFinish: null,
      },
    ],
    address: {
      fullName: 'Mehmet Kaya',
      phone: '0555 123 45 67',
      addressLine: 'Örnek Mahallesi, Örnek Sokak No: 123 Daire: 4',
      district: 'Kadıköy',
      city: 'İstanbul',
      postalCode: '34000',
    },
    payment: {
      method: 'Kredi Kartı',
      subtotal: 18999,
      shipping: 0,
      total: 18999,
    },
    trackingNumber: '',
    adminNote: '',
  }

  const handleStatusChange = async (newStatus: string) => {
    try {
      // TODO: Implement API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOrderStatus(newStatus)
      alert('Sipariş durumu güncellendi')
    } catch (error) {
      alert('Bir hata oluştu')
    }
  }

  const handleSendEmail = () => {
    alert('Müşteriye e-posta gönderildi')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/siparisler"
            className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-walnut-700">Sipariş Detayı</h1>
            <p className="text-muted-foreground">{order.orderNumber}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors"
          >
            <Printer className="h-4 w-4" />
            Yazdır
          </button>
          <button
            onClick={handleSendEmail}
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors"
          >
            <Mail className="h-4 w-4" />
            E-posta Gönder
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Management */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-lg mb-4">Sipariş Durumu</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Durum</label>
                <select
                  value={orderStatus}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                >
                  <option value="PENDING">Beklemede</option>
                  <option value="PAYMENT_RECEIVED">Ödeme Alındı</option>
                  <option value="PROCESSING">Hazırlanıyor</option>
                  <option value="SHIPPED">Kargoya Verildi</option>
                  <option value="DELIVERED">Teslim Edildi</option>
                  <option value="CANCELLED">İptal Edildi</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kargo Takip No</label>
                <input
                  type="text"
                  defaultValue={order.trackingNumber}
                  placeholder="Kargo takip numarası"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Admin Notu</label>
                <textarea
                  rows={3}
                  defaultValue={order.adminNote}
                  placeholder="Dahili not (müşteri görmez)"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
                />
              </div>

              <button className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl border p-6">
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

          {/* Customer Info */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-bold text-lg mb-4">Müşteri Bilgileri</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ad Soyad:</span>
                <span className="font-medium">{order.customer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">E-posta:</span>
                <span className="font-medium">{order.customer.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Telefon:</span>
                <span className="font-medium">{order.customer.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-bold mb-4">Sipariş Özeti</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tarih:</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ara Toplam:</span>
                <span>{order.payment.subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Kargo:</span>
                <span className="text-sage-600">
                  {order.payment.shipping === 0 ? 'Ücretsiz' : order.payment.shipping + ' ₺'}
                </span>
              </div>
              <div className="pt-2 border-t flex justify-between font-bold">
                <span>Toplam:</span>
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

          {/* Delivery Address */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-bold mb-4">Teslimat Adresi</h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{order.address.fullName}</p>
              <p className="text-muted-foreground">{order.address.phone}</p>
              <p className="text-muted-foreground">{order.address.addressLine}</p>
              <p className="text-muted-foreground">
                {order.address.district} / {order.address.city}
              </p>
              {order.address.postalCode && (
                <p className="text-muted-foreground">{order.address.postalCode}</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="font-bold mb-4">Hızlı İşlemler</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
                <Package className="h-4 w-4" />
                Fatura Oluştur
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
                <Truck className="h-4 w-4" />
                Kargo Etiketi
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-natural-50 transition-colors">
                <Check className="h-4 w-4" />
                Teslim Edildi İşaretle
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  }

  