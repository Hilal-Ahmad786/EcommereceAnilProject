// ============================================
// FILE: src/app/api/orders/route.ts
// Methods: GET (list), POST (create)
// ============================================
// src/app/api/orders/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma, OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
        address: true,
      },
    })

    return NextResponse.json(orders)
  } catch (err) {
    console.error("Orders GET error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      addressId,
      items, // [{ productId, quantity }]
      paymentMethod, // "CREDIT_CARD" | "BANK_TRANSFER" | "INSTALLMENT"
      customerNote,
    } = body || {}

    if (!addressId || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Eksik sipariş verisi" }, { status: 400 })
    }

    // fetch products
    const productIds: string[] = items.map((i: any) => i.productId)
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        name: true,
        price: true,                  // Decimal
        images: { select: { url: true, order: true } },
      },
    })

    if (products.length !== productIds.length) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 400 })
    }

    // build order items
    const orderItemsData = items.map((i: any) => {
      const p = products.find(pp => pp.id === i.productId)!
      const quantity = Math.max(parseInt(i.quantity, 10), 1)
      const unitPrice = new Prisma.Decimal(p.price) // ensure Decimal
      const totalPrice = unitPrice.mul(quantity)

      return {
        productId: p.id,
        productName: p.name,
        productImage: p.images?.sort((a,b) => (a.order ?? 0) - (b.order ?? 0))[0]?.url ?? null,
        woodFinishName: null, // optional: derive later if you implement finishes
        quantity,
        unitPrice,
        totalPrice,
      }
    })

    // totals
    const zero = new Prisma.Decimal(0)
    const subtotal = orderItemsData.reduce((acc, it) => acc.add(it.totalPrice), zero)
    const shippingCost = zero
    const tax = zero
    const discount = zero
    const total = subtotal.add(shippingCost).add(tax).sub(discount)

    // order number
    const today = new Date()
    const y = today.getFullYear()
    const countToday = await prisma.order.count({
      where: {
        createdAt: {
          gte: new Date(y, today.getMonth(), today.getDate(), 0, 0, 0),
          lte: new Date(y, today.getMonth(), today.getDate(), 23, 59, 59),
        },
      },
    })
    const orderNumber = `ORD-${y}-${String(countToday + 1).padStart(6, "0")}`

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: OrderStatus.PENDING,
        userId: session.user.id,
        addressId,
        subtotal,
        shippingCost,
        tax,
        discount,
        total,
        paymentMethod: (paymentMethod as PaymentMethod) ?? PaymentMethod.CREDIT_CARD,
        paymentStatus: PaymentStatus.PENDING,
        customerNote: customerNote || null,
        items: { create: orderItemsData },
      },
      include: {
        items: true,
        address: true,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (err: any) {
    console.error("Orders POST error:", err)
    return NextResponse.json({ error: err?.message || "Sipariş oluşturulamadı" }, { status: 500 })
  }
}
