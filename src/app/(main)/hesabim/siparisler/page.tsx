import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Suspense } from "react"
import OrdersList from "./orders-list"

export default async function OrdersPage() {
  const session = await auth()
  if (!session?.user) redirect("/giris")

  const userId = session.user.id

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: true } },
    },
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
        Siparişlerim
      </h1>
      <p className="text-muted-foreground mb-8">
        Geçmiş siparişlerinizi görüntüleyin ve kargo durumunu takip edin.
      </p>

      <Suspense fallback={<p>Siparişler yükleniyor...</p>}>
        {/* ✅ Safely pass props to avoid runtime TS inference issues */}
        <OrdersList orders={orders as any} />
      </Suspense>
    </div>
  )
}
