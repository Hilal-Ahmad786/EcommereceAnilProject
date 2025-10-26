// src/app/(main)/hesabim/siparisler/[orderId]/page.tsx

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import Link from "next/link"
import { MapPin } from "lucide-react"

export default async function OrderDetailPage({
  params,
}: {
  params: { orderId: string }
}) {
  const session = await auth()
  if (!session?.user) redirect("/giris")

  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderId },
    include: {
      items: { include: { product: true } },
      address: true,
    },
  })

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-muted-foreground">
          Sipariş bulunamadı veya erişim yetkiniz yok.
        </p>
      </div>
    )
  }

  const statusLabel =
    order.status === "SHIPPED"
      ? "Kargoda"
      : order.status === "DELIVERED"
      ? "Teslim Edildi"
      : order.status === "PENDING"
      ? "Beklemede"
      : order.status === "CANCELLED"
      ? "İptal Edildi"
      : "İşlemde"

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/hesabim/siparisler"
        className="text-sm text-walnut-600 hover:text-walnut-700 mb-4 inline-block"
      >
        ← Siparişlerime Dön
      </Link>

      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-walnut-700 mb-2">
            Sipariş Detayı
          </h1>
          <p className="text-muted-foreground">
            Sipariş No:{" "}
            <span className="font-semibold">{order.orderNumber}</span>
          </p>
        </div>
        <span
          className={`text-sm px-4 py-2 rounded-full font-semibold ${
            order.status === "SHIPPED"
              ? "bg-blue-100 text-blue-700"
              : order.status === "DELIVERED"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Ürünler */}
      <div className="bg-white border rounded-xl p-6 mb-6">
        <h2 className="font-bold text-lg mb-4">Sipariş Ürünleri</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b last:border-none pb-2"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {item.product?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  Adet: {item.quantity}
                </p>
              </div>
              <span className="font-semibold text-walnut-600">
                {item.unitPrice?.toNumber().toLocaleString("tr-TR")} ₺
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Adres + Özet */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-walnut-600" />
            <h3 className="font-bold">Teslimat Adresi</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {order.address?.addressLine}, {order.address?.district} /{" "}
            {order.address?.city}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <h3 className="font-bold mb-4">Ödeme Özeti</h3>
          <div className="flex justify-between mb-2 text-sm">
            <span>Ara Toplam</span>
            <span>{order.subtotal?.toNumber().toLocaleString("tr-TR")} ₺</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Toplam</span>
            <span className="text-walnut-600">
              {order.total?.toNumber().toLocaleString("tr-TR")} ₺
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
