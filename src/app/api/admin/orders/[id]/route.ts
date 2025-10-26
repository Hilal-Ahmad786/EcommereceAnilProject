// src/app/api/admin/orders/[id]/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

export const dynamic = "force-dynamic"

// 🧩 GET — fetch single order with relations
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 })
    }

    const order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        address: true,
        items: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (err) {
    console.error("GET /api/admin/orders/[id] error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// 🧩 PATCH — update order fields
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Yetkisiz" }, { status: 403 })
    }

    const body = await req.json()
    const { status, paymentStatus, trackingNumber, adminNote } = body

    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        status,
        paymentStatus,
        trackingNumber,
        adminNote,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        address: true,
        items: true,
      },
    })

    return NextResponse.json(order)
  } catch (err) {
    console.error("PATCH /api/admin/orders/[id] error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
