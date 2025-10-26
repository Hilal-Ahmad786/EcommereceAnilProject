// src/app/(admin)/admin/siparisler/orders-client.tsx

"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type OrderRow = {
  id: string
  orderNumber: string
  customer: string
  status: string
  paymentStatus: string
  total: number
  itemCount: number
  createdAt: string
}

export default function OrdersClient() {
  const router = useRouter()
  const sp = useSearchParams()

  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<OrderRow[]>([])
  const [page, setPage] = useState<number>(parseInt(sp.get("page") || "1", 10))
  const [pages, setPages] = useState<number>(1)
  const [search, setSearch] = useState<string>(sp.get("search") || "")
  const [status, setStatus] = useState<string>(sp.get("status") || "all")
  const [paymentStatus, setPaymentStatus] = useState<string>(sp.get("paymentStatus") || "all")

  const queryString = useMemo(() => {
    const p = new URLSearchParams()
    if (search.trim()) p.set("search", search.trim())
    if (status !== "all") p.set("status", status)
    if (paymentStatus !== "all") p.set("paymentStatus", paymentStatus)
    p.set("page", String(page))
    p.set("pageSize", "10")
    p.set("sort", "createdAt")
    p.set("order", "desc")
    return p.toString()
  }, [search, status, paymentStatus, page])

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/orders?${queryString}`, { cache: "no-store" })
      if (!res.ok) throw new Error(await res.text())
      const json = await res.json()
      setRows(json.data || [])
      setPages(json.meta?.pages || 1)
      router.replace(`/admin/siparisler?${queryString}`)
    } catch (e) {
      console.error(e)
      setRows([])
      setPages(1)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString])

  function resetFilters() {
    setSearch("")
    setStatus("all")
    setPaymentStatus("all")
    setPage(1)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white border rounded-xl p-4 grid gap-3 md:grid-cols-5">
        <div className="md:col-span-2">
          <Input
            placeholder="Sipariş no, müşteri adı/e-posta..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* Sipariş Durumu */}
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="Durum (hepsi)" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="PENDING">Beklemede</SelectItem>
            <SelectItem value="PAYMENT_RECEIVED">Ödeme Alındı</SelectItem>
            <SelectItem value="PROCESSING">Hazırlanıyor</SelectItem>
            <SelectItem value="SHIPPED">Kargoda</SelectItem>
            <SelectItem value="DELIVERED">Teslim Edildi</SelectItem>
            <SelectItem value="CANCELLED">İptal</SelectItem>
            <SelectItem value="REFUNDED">İade</SelectItem>
          </SelectContent>
        </Select>

        {/* Ödeme Durumu */}
        <Select value={paymentStatus} onValueChange={(v) => { setPaymentStatus(v); setPage(1); }}>
          <SelectTrigger><SelectValue placeholder="Ödeme durumu (hepsi)" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="PENDING">Beklemede</SelectItem>
            <SelectItem value="COMPLETED">Tamamlandı</SelectItem>
            <SelectItem value="FAILED">Başarısız</SelectItem>
            <SelectItem value="REFUNDED">İade</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button onClick={() => { setPage(1); load(); }}>Filtrele</Button>
          <Button variant="outline" onClick={resetFilters}>Sıfırla</Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-semibold">Sipariş Listesi</div>
          {loading && <span className="text-sm text-muted-foreground">Yükleniyor…</span>}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sipariş</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Ürün</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Ödeme</TableHead>
              <TableHead className="text-right">Tutar</TableHead>
              <TableHead>Tarih</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-muted-foreground">
                  Kayıt bulunamadı.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((o) => (
                <TableRow
                  key={o.id}
                  className="hover:bg-natural-50 cursor-pointer"
                  onClick={() => router.push(`/admin/siparisler/${o.id}`)}
                >
                  <TableCell className="font-medium">{o.orderNumber}</TableCell>
                  <TableCell>{o.customer}</TableCell>
                  <TableCell>{o.itemCount}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{trStatus(o.status)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{trPaymentStatus(o.paymentStatus)}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{trCurrency(o.total)}</TableCell>
                  <TableCell>{new Date(o.createdAt).toLocaleString("tr-TR")}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Sayfa {page} / {pages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Önceki
            </Button>
            <Button
              variant="outline"
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Sonraki
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function trCurrency(n: number) {
  return n.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  })
}

function trStatus(s: string) {
  switch (s) {
    case "PENDING": return "Beklemede"
    case "PAYMENT_RECEIVED": return "Ödeme Alındı"
    case "PROCESSING": return "Hazırlanıyor"
    case "SHIPPED": return "Kargoda"
    case "DELIVERED": return "Teslim Edildi"
    case "CANCELLED": return "İptal"
    case "REFUNDED": return "İade"
    default: return s
  }
}

function trPaymentStatus(s: string) {
  switch (s) {
    case "PENDING": return "Beklemede"
    case "COMPLETED": return "Tamamlandı"
    case "FAILED": return "Başarısız"
    case "REFUNDED": return "İade"
    default: return s
  }
}
