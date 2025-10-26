// ========================================
// FILE: src/app/(admin)/admin/page.tsx
// ========================================
import { Package, ShoppingCart, Users, TrendingUp } from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 0

// -------- Helpers --------
function getBaseUrl() {
  if (process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

async function getStats() {
  try {
    const res = await fetch("/api/admin/stats", { cache: "no-store" })
    if (!res.ok) {
      const body = await res.text().catch(() => "")
      console.error("Admin stats non-OK:", res.status, body)
      return { totalProducts: 0, totalOrders: 0, totalCustomers: 0, totalRevenue: 0 }
    }
    const data = await res.json()
    return {
      totalProducts: Number(data?.totalProducts ?? 0),
      totalOrders: Number(data?.totalOrders ?? 0),
      totalCustomers: Number(data?.totalCustomers ?? 0),
      totalRevenue: Number(data?.totalRevenue ?? 0),
    }
  } catch (err) {
    console.error("Admin stats fetch failed:", err)
    return { totalProducts: 0, totalOrders: 0, totalCustomers: 0, totalRevenue: 0 }
  }
}

async function getRecentOrders() {
  try {
    const res = await fetch("/api/admin/recent-orders", { cache: "no-store" })
    if (!res.ok) return { data: [] }
    const json = await res.json()
    return { data: Array.isArray(json?.data) ? json.data : [] }
  } catch (e) {
    console.error("recent-orders fetch failed:", e)
    return { data: [] }
  }
}

function trCurrency(amount?: any) {
  const n = Number(amount)
  const safe = Number.isFinite(n) ? n : 0
  return safe.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  })
}

// -------- Main Component --------
export default async function AdminDashboard() {
  const [stats, recent] = await Promise.all([getStats(), getRecentOrders()])

  const totalProducts = stats?.totalProducts ?? 0
  const totalOrders = stats?.totalOrders ?? 0
  const totalCustomers = stats?.totalCustomers ?? 0
  const totalRevenue = stats?.totalRevenue ?? 0
  const recentOrders = Array.isArray(recent?.data) ? recent.data : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-walnut-700">Dashboard</h1>
        <p className="text-muted-foreground">Gerçek zamanlı mağaza özetiniz</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Toplam Ürün</p>
              <p className="text-3xl font-bold text-walnut-700 mt-2">
                {totalProducts}
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
                {totalOrders}
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
                {totalCustomers}
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
                {trCurrency(totalRevenue)}
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
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground">Henüz sipariş yok.</p>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.orderNumber} ·{" "}
                      {new Date(order.createdAt).toLocaleString("tr-TR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-walnut-600">
                      {trCurrency(order.total)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.status} · {order.itemCount} ürün
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
