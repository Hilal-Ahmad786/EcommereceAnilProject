// src/app/(admin)/admin/siparisler/[id]/page.tsx

"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Printer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminOrderDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const [status, setStatus] = useState("")
  const [paymentStatus, setPaymentStatus] = useState("")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [adminNote, setAdminNote] = useState("")

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders/${id}`)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setOrder(data)
      setStatus(data.status)
      setPaymentStatus(data.paymentStatus)
      setTrackingNumber(data.trackingNumber || "")
      setAdminNote(data.adminNote || "")
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function save() {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, paymentStatus, trackingNumber, adminNote }),
    })
    if (res.ok) {
      alert("Sipariş güncellendi ✅")
      load()
    } else {
      alert("Güncelleme başarısız ❌")
    }
  }

  useEffect(() => {
    load()
  }, [id])

  if (loading) return <div className="p-6">Yükleniyor…</div>
  if (!order) return <div className="p-6 text-muted-foreground">Sipariş bulunamadı</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/siparisler" className="text-sm text-muted-foreground flex items-center gap-1 hover:text-walnut-700">
            <ArrowLeft className="h-4 w-4" /> Geri
          </Link>
          <h1 className="text-2xl font-bold">Sipariş #{order.orderNumber}</h1>
        </div>
        <Button variant="outline" onClick={() => window.print()}>
          <Printer className="h-4 w-4 mr-1" /> Yazdır
        </Button>
      </div>

      {/* Müşteri & Adres Bilgileri */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Müşteri</h2>
          <div className="text-sm">
            <div>{order.user?.name || "—"}</div>
            <div className="text-muted-foreground">{order.user?.email || "—"}</div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Adres</h2>
          <div className="text-sm leading-tight">
            <div>{order.address?.fullName}</div>
            <div>{order.address?.addressLine}</div>
            <div>
              {order.address?.district}, {order.address?.city} {order.address?.postalCode}
            </div>
            <div className="text-muted-foreground mt-1">{order.address?.phone}</div>
          </div>
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h2 className="font-semibold mb-2">Durum Güncelle</h2>

          <div className="space-y-3 text-sm">
            <div>
              <label className="block mb-1">Sipariş Durumu</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue placeholder="Durum seç" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Beklemede</SelectItem>
                  <SelectItem value="PAYMENT_RECEIVED">Ödeme Alındı</SelectItem>
                  <SelectItem value="PROCESSING">Hazırlanıyor</SelectItem>
                  <SelectItem value="SHIPPED">Kargoda</SelectItem>
                  <SelectItem value="DELIVERED">Teslim Edildi</SelectItem>
                  <SelectItem value="CANCELLED">İptal</SelectItem>
                  <SelectItem value="REFUNDED">İade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1">Ödeme Durumu</label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger><SelectValue placeholder="Durum seç" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Beklemede</SelectItem>
                  <SelectItem value="COMPLETED">Tamamlandı</SelectItem>
                  <SelectItem value="FAILED">Başarısız</SelectItem>
                  <SelectItem value="REFUNDED">İade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-1">Kargo Takip Numarası</label>
              <Input value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="TRK123..." />
            </div>

            <div>
              <label className="block mb-1">Admin Notu</label>
              <Textarea rows={3} value={adminNote} onChange={(e) => setAdminNote(e.target.value)} />
            </div>

            <Button className="w-full mt-3" onClick={save}>Kaydet</Button>
          </div>
        </div>
      </div>

      {/* Ürünler */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b font-semibold">Sipariş Kalemleri</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-2">Ürün</th>
              <th className="px-4 py-2">Adet</th>
              <th className="px-4 py-2">Birim Fiyat</th>
              <th className="px-4 py-2">Toplam</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((it: any) => (
              <tr key={it.id} className="border-t">
                <td className="px-4 py-2">{it.productName}</td>
                <td className="px-4 py-2">{it.quantity}</td>
                <td className="px-4 py-2">{trCurrency(it.unitPrice)}</td>
                <td className="px-4 py-2">{trCurrency(it.totalPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Özet */}
      <div className="bg-white border rounded-xl p-4 grid md:grid-cols-4 gap-3 text-sm">
        <div><div className="text-muted-foreground">Ara Toplam</div><div>{trCurrency(order.subtotal)}</div></div>
        <div><div className="text-muted-foreground">Kargo</div><div>{trCurrency(order.shippingCost)}</div></div>
        <div><div className="text-muted-foreground">Vergi</div><div>{trCurrency(order.tax)}</div></div>
        <div><div className="text-muted-foreground">İndirim</div><div>{trCurrency(order.discount)}</div></div>
        <div className="md:col-span-4 mt-2 border-t pt-2">
          <div className="text-muted-foreground">Genel Toplam</div>
          <div className="text-xl font-bold">{trCurrency(order.total)}</div>
        </div>
      </div>
    </div>
  )
}

function trCurrency(n: number) {
  return n?.toLocaleString("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }) || "₺0"
}
