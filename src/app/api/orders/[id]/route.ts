// ============================================
// FILE: src/app/api/orders/[id]/route.ts
// Methods: GET (detail), PATCH (update), DELETE
// ============================================
// src/app/api/orders/[id]/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const order = await prisma.order.findFirst({
      where: {
        userId: session.user.id,
        OR: [{ id: params.id }, { orderNumber: params.id }],
      },
      include: {
        items: true,
        address: true,
      },
    })

    if (!order) {
      return NextResponse.json({ error: "Sipariş bulunamadı" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (err) {
    console.error("Order detail GET error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
