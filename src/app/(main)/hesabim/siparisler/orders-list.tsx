// /src/app/(main)/hesabim/siparisler/orders-list.tsx

"use client"

import Link from "next/link"
import { Eye, Package } from "lucide-react"

export default function OrdersList({
  orders,
}: {
  orders: {
    id: string
    orderNumber: string
    createdAt: string
    total: number
    status: string
    items: { product: { name: string }; quantity: number; price: number }[]
  }[]
}) {
  if (orders.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-12 text-center">
        <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-walnut-700 mb-2">
          Henüz siparişiniz yok
        </h3>
        <p className="text-muted-foreground mb-6">
          İlk siparişinizi vererek alışverişe başlayın.
        </p>
        <Link
          href="/urunler"
          className="inline-block bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Ürünleri İncele
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border rounded-xl p-6 hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b">
            <div>
              <h3 className="font-bold text-lg mb-1">{order.orderNumber}</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("tr-TR")}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  order.status === "Kargoda"
                    ? "bg-blue-100 text-blue-700"
                    : order.status === "Teslim Edildi"
                    ? "bg-green-100 text-green-700"
                    : order.status === "İptal Edildi"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
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

          {/* Items */}
          <div className="space-y-2 mb-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>
                  {item.quantity}x {item.product.name}
                </span>
                <span className="font-medium text-foreground">
                  {item.price.toLocaleString("tr-TR")} ₺
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="font-semibold">Toplam</span>
            <span className="text-xl font-bold text-walnut-600">
              {order.total.toLocaleString("tr-TR")} ₺
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
