// ============================================
// FILE: src/app/api/wishlist/route.ts
// Wishlist API (clean + build-safe)
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Fetch user's wishlist
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Yetkisiz erişim" }, { status: 401 })
    }

    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: session.user.id },
      include: {
        product: {
          include: {
            category: true,
            images: { orderBy: { order: "asc" }, take: 1 },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ success: true, data: wishlist })
  } catch (error) {
    console.error("Wishlist GET Error:", error)
    return NextResponse.json({ success: false, error: "Favoriler yüklenemedi" }, { status: 500 })
  }
}

// POST - Add to wishlist
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Favorilere eklemek için giriş yapmalısınız" },
        { status: 401 }
      )
    }

    const { productId } = await request.json()
    if (!productId) {
      return NextResponse.json({ success: false, error: "Ürün ID gerekli" }, { status: 400 })
    }

    // Avoid duplicates (composite unique: userId_productId)
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    })
    if (existing) {
      return NextResponse.json({ success: false, error: "Ürün zaten favorilerde" }, { status: 400 })
    }

    const item = await prisma.wishlistItem.create({
      data: { userId: session.user.id, productId },
      include: {
        product: {
          include: {
            images: { orderBy: { order: "asc" }, take: 1 },
            category: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, data: item }, { status: 201 })
  } catch (error) {
    console.error("Wishlist POST Error:", error)
    return NextResponse.json({ success: false, error: "Favorilere eklenemedi" }, { status: 500 })
  }
}

// DELETE - Remove from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, error: "Yetkisiz erişim" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")
    if (!productId) {
      return NextResponse.json({ success: false, error: "Ürün ID gerekli" }, { status: 400 })
    }

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId,
        },
      },
    })

    return NextResponse.json({ success: true, message: "Favorilerden kaldırıldı" })
  } catch (error) {
    console.error("Wishlist DELETE Error:", error)
    return NextResponse.json({ success: false, error: "Favorilerden kaldırılamadı" }, { status: 500 })
  }
}
