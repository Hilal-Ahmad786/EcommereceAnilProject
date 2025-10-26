//  /src/app/api/admin/stats/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const session = await auth()
    const role = session?.user?.role as Role | undefined

    // ✅ AUTH CHECK
    if (!session?.user || role !== Role.ADMIN) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 })
    }

    // ✅ STATS QUERIES
    const [totalProducts, totalOrders, totalCustomers, totalRevenue] =
      await Promise.all([
        prisma.product.count({ where: { isActive: true } }),
        prisma.order.count(),
        prisma.user.count({ where: { role: Role.CUSTOMER } }),
        prisma.order.aggregate({ _sum: { total: true } }),
      ])

    const revenue = Number(totalRevenue._sum.total ?? 0)

    return NextResponse.json({
      totalProducts,
      totalOrders,
      totalCustomers,
      totalRevenue: revenue,
    })
  } catch (err) {
    console.error("❌ Admin /api/admin/stats error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
