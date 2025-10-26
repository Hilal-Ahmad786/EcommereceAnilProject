// ============================================
// FILE: src/app/api/customers/route.ts
// Method: GET (list customers with stats)
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
// If you want to restrict to admins only, uncomment and use auth():
// import { auth } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    // const session = await auth()
    // const role = (session?.user?.role as string | undefined) ?? null
    // if (role !== "ADMIN") {
    //   return NextResponse.json({ error: "Yetkisiz" }, { status: 403 })
    // }

    const { searchParams } = new URL(req.url)

    const search = searchParams.get("search")?.trim() ?? ""
    const role = (searchParams.get("role")?.toUpperCase() ?? "ALL") as
      | "ALL"
      | "ADMIN"
      | "CUSTOMER"
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1)
    const pageSize = Math.min(
      Math.max(parseInt(searchParams.get("pageSize") || "20", 10), 1),
      100
    )
    const sort = searchParams.get("sort") || "createdAt"
    const order = (searchParams.get("order")?.toLowerCase() || "desc") as
      | "asc"
      | "desc"

    const skip = (page - 1) * pageSize

    const where: any = {}
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }
    if (role !== "ALL") {
      where.role = role
    }

    const orderBy: any = {}
    if (["createdAt", "name", "email"].includes(sort)) {
      orderBy[sort] = order
    } else {
      orderBy["createdAt"] = "desc"
    }

    const [total, users] = await prisma.$transaction([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          _count: { select: { orders: true } },
          addresses: {
            select: { city: true, district: true },
            take: 1,
          },
          // we only need lastOrderDate + totalSpent; compute below
          orders: {
            select: { total: true, createdAt: true },
            orderBy: { createdAt: "desc" },
          },
        },
      }),
    ])

    const data = users.map((u) => {
      const orders = u.orders || []
      const lastOrderDate = orders[0]?.createdAt ?? null
      const totalSpent = orders.reduce((sum, o) => sum + Number(o.total || 0), 0)
      const location = u.addresses?.[0]
        ? `${u.addresses[0].city ?? ""}${u.addresses[0].district ? ", " + u.addresses[0].district : ""}`
        : null

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        createdAt: u.createdAt,
        ordersCount: u._count.orders,
        totalSpent,
        lastOrderDate,
        location,
      }
    })

    return NextResponse.json({
      data,
      meta: {
        page,
        pageSize,
        total,
        pages: Math.ceil(total / pageSize),
        sort,
        order,
      },
    })
  } catch (err) {
    console.error("Customers GET error:", err)
    return NextResponse.json(
      { error: "Müşteri listesi alınamadı" },
      { status: 500 }
    )
  }
}
