// src/app/(main)/hesabim/page.tsx

// ✅ Secure Server Component – Account Dashboard
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import {
  Package,
  MapPin,
  User,
  Heart,
  ShoppingBag,
} from "lucide-react"

export default async function AccountDashboard() {
  // --- 1. Authenticate user ---
  const session = await auth()
  if (!session?.user) redirect("/giris")

  const user = session.user

  // --- 2. Fetch summary stats (replace with Prisma later) ---
  // Example:
  // const [orderCount, activeCount, addressCount, wishlistCount] = await Promise.all([
  //   prisma.order.count({ where: { userId: user.id } }),
  //   prisma.order.count({ where: { userId: user.id, NOT: { status: "DELIVERED" } } }),
  //   prisma.address.count({ where: { userId: user.id } }),
  //   prisma.wishlist.count({ where: { userId: user.id } }),
  // ])
  const stats = {
    totalOrders: 3,
    activeOrders: 1,
    savedAddresses: 2,
    wishlistItems: 5,
  }

  // --- 3. Fetch recent orders (replace with Prisma later) ---
  const recentOrders = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      date: "2024-01-10",
      total: 24999,
      status: "Teslim Edildi",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      date: "2024-01-15",
      total: 12999,
      status: "Kargoda",
      statusColor: "bg-blue-100 text-blue-700",
    },
  ]

  // --- 4. Render UI ---
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Hoş Geldiniz, {user.name || "Değerli Müşterimiz"}
        </h1>
        <p className="text-muted-foreground">
          Hesap bilgilerinizi ve siparişlerinizi buradan yönetebilirsiniz
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid lg:grid-cols-4 gap-6">
        <DashboardCard
          href="/hesabim/siparisler"
          icon={<Package className="h-6 w-6 text-walnut-600" />}
          bg="bg-walnut-100"
          value={stats.totalOrders}
          label="Toplam Sipariş"
        />
        <DashboardCard
          href="/hesabim/siparisler"
          icon={<ShoppingBag className="h-6 w-6 text-sage-600" />}
          bg="bg-sage-100"
          value={stats.activeOrders}
          label="Aktif Sipariş"
        />
        <DashboardCard
          href="/hesabim/adresler"
          icon={<MapPin className="h-6 w-6 text-clay-600" />}
          bg="bg-clay-100"
          value={stats.savedAddresses}
          label="Kayıtlı Adres"
        />
        <DashboardCard
          href="/favoriler"
          icon={<Heart className="h-6 w-6 text-sage-600" />}
          bg="bg-natural-200"
          value={stats.wishlistItems}
          label="Favori Ürün"
        />
      </div>

      {/* Recent Orders + Quick Links */}
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
                {recentOrders.map((o) => (
                  <Link
                    key={o.id}
                    href={`/hesabim/siparisler/${o.orderNumber}`}
                    className="block p-4 border rounded-lg hover:bg-natural-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">{o.orderNumber}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${o.statusColor}`}
                      >
                        {o.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{o.date}</span>
                      <span className="font-semibold text-walnut-600">
                        {o.total.toLocaleString("tr-TR")} ₺
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
              <QuickLink href="/hesabim/profil" icon={<User />} label="Profil Bilgilerim" />
              <QuickLink href="/hesabim/siparisler" icon={<Package />} label="Siparişlerim" />
              <QuickLink href="/hesabim/adresler" icon={<MapPin />} label="Adreslerim" />
              <QuickLink href="/favoriler" icon={<Heart />} label="Favorilerim" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Helper components (server-safe) ---
function DashboardCard({
  href,
  icon,
  bg,
  value,
  label,
}: {
  href: string
  icon: React.ReactNode
  bg: string
  value: number
  label: string
}) {
  return (
    <Link
      href={href}
      className="bg-white border rounded-xl p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-walnut-700">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
    </Link>
  )
}

function QuickLink({
  href,
  icon,
  label,
}: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 hover:bg-natural-50 rounded-lg transition-colors"
    >
      <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  )
}
