//  /src/app/api/payments/iyzico/route.ts

import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { OrderStatus, PaymentStatus } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: "orderId gerekli" }, { status: 400 })
    }

    // update order to simulate successful payment
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.PAYMENT_RECEIVED,
        paymentStatus: PaymentStatus.COMPLETED,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Ödeme başarıyla tamamlandı",
      redirectUrl: `/odeme-basarili?order=${order.orderNumber}`,
    })
  } catch (error) {
    console.error("Fake payment error:", error)
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 })
  }
}
