// src/app/api/admin/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

// GET (fetch one)
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "ADMIN")
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: { category: true, images: true },
    })
    if (!product) return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 })

    return NextResponse.json({ success: true, data: product })
  } catch (err) {
    console.error("Admin GET product error:", err)
    return NextResponse.json({ error: "Ürün getirilemedi" }, { status: 500 })
  }
}

// PUT (update)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "ADMIN")
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

    const body = await req.json()

    const updated = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...body,
        price: body.price ? Number(body.price) : undefined,
        stock: body.stock ? Number(body.stock) : undefined,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (err) {
    console.error("Admin update product error:", err)
    return NextResponse.json({ error: "Ürün güncellenemedi" }, { status: 500 })
  }
}

// DELETE
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user || (session.user as any).role !== "ADMIN")
      return NextResponse.json({ error: "Yetkisiz" }, { status: 401 })

    await prisma.product.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true, message: "Ürün silindi" })
  } catch (err) {
    console.error("Admin delete product error:", err)
    return NextResponse.json({ error: "Ürün silinemedi" }, { status: 500 })
  }
}
