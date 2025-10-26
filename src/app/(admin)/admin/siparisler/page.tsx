// src/app/(admin)/admin/siparisler/page.tsx
import OrdersClient from "./orders-client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Siparişler</h1>
        <p className="text-muted-foreground">Siparişleri arayın, filtreleyin ve yönetin</p>
      </div>

      <OrdersClient />
    </div>
  )
}
