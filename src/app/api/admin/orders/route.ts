// src/app/api/admin/orders/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { OrderStatus, PaymentStatus, Role } from "@prisma/client"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)

    // Query params
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1)
    const pageSize = Math.min(
      Math.max(parseInt(searchParams.get("pageSize") || "10", 10), 1),
      100
    )
    const skip = (page - 1) * pageSize

    const search = (searchParams.get("search") || "").trim()
    const status = (searchParams.get("status") || "").toUpperCase() as
      | keyof typeof OrderStatus
      | ""
    const pstatus = (searchParams.get("paymentStatus") || "").toUpperCase() as
      | keyof typeof PaymentStatus
      | ""

    // Date range (optional)
    const from = searchParams.get("from") ? new Date(searchParams.get("from")!) : null
    const to = searchParams.get("to") ? new Date(searchParams.get("to")!) : null

    // Sorting (createdAt default)
    const sort = searchParams.get("sort") || "createdAt"
    const order = (searchParams.get("order") || "desc").toLowerCase() as "asc" | "desc"

    // WHERE
    const where: any = {}
    if (search) {
      // Search by orderNumber, user name/email, trackingNumber
      where.OR = [
        { orderNumber: { contains: search, mode: "insensitive" } },
        { trackingNumber: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ]
    }
    if (status && OrderStatus[status]) where.status = status
    if (pstatus && PaymentStatus[pstatus]) where.paymentStatus = pstatus
    if (from || to) {
      where.createdAt = {}
      if (from) where.createdAt.gte = from
      if (to) where.createdAt.lte = to
    }

    const orderBy: any = {}
    if (["createdAt", "total", "orderNumber"].includes(sort)) {
      orderBy[sort] = order
    } else {
      orderBy.createdAt = "desc"
    }

    const [total, orders] = await prisma.$transaction([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        include: {
          user: { select: { name: true, email: true } },
          items: { select: { quantity: true } },
        },
      }),
    ])

    const data = orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      status: o.status,
      paymentStatus: o.paymentStatus,
      total: Number(o.total ?? 0),
      itemCount: o.items.reduce((n, it) => n + (it.quantity || 0), 0),
      customer: o.user?.name ?? o.user?.email ?? "Müşteri",
      createdAt: o.createdAt,
    }))

    return NextResponse.json({
      data,
      meta: {
        page,
        pageSize,
        total,
        pages: Math.max(1, Math.ceil(total / pageSize)),
        sort,
        order,
      },
    })
  } catch (err) {
    console.error("Admin Orders GET error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
