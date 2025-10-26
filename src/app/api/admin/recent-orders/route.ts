// /src/app/api/admin/recent-orders/route.ts

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

    // ✅ FETCH LAST 8 ORDERS
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        user: { select: { name: true, email: true } },
        items: { select: { quantity: true } },
      },
    })

    // ✅ MAP CLEAN DATA
    const data = orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customer: o.user?.name ?? o.user?.email ?? "Müşteri",
      total: Number(o.total ?? 0),
      status: o.status ?? "BELİRSİZ",
      itemCount: o.items.reduce((sum, i) => sum + (i.quantity ?? 0), 0),
      createdAt: o.createdAt,
    }))

    return NextResponse.json({ data })
  } catch (err) {
    console.error("❌ Admin /api/admin/recent-orders error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
