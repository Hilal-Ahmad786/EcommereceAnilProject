// src/app/api/admin/products/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Prisma } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const page = parseInt(searchParams.get("page") || "1", 10)
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10)
    const skip = (page - 1) * pageSize

    const where: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { slug: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}

    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: { take: 1, orderBy: { order: "asc" } },
        },
        orderBy: { createdAt: "desc" },
        take: pageSize,
        skip,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: items,
      meta: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error("Admin products list error:", error)
    return NextResponse.json({ error: "Ürünler getirilemedi" }, { status: 500 })
  }
}
