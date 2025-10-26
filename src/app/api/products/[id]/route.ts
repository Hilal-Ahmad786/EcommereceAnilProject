// ============================================
// FILE: src/app/api/products/[id]/route.ts
// Single product operations (public + admin)
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { Role } from "@prisma/client"

// ====================================================
// GET - Fetch single product with all details (Public)
// ====================================================
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: { include: { parent: true } },
        images: { orderBy: { order: "asc" } },
        woodFinishes: { include: { woodFinish: true } },
        reviews: {
          where: { isApproved: true },
          include: {
            user: { select: { name: true, image: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        seo: true,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı" }, { status: 404 })
    }

    const avgRating = await prisma.review.aggregate({
      where: { productId: product.id, isApproved: true },
      _avg: { rating: true },
      _count: true,
    })

    return NextResponse.json({
      ...product,
      averageRating: avgRating._avg.rating || 0,
      reviewCount: avgRating._count,
    })
  } catch (error) {
    console.error("Get Product Error:", error)
    return NextResponse.json({ error: "Ürün yüklenemedi" }, { status: 500 })
  }
}

// ====================================================
// PUT - Update product (Admin only) + image support
// ====================================================
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user?.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const body = await request.json()
    const { images, woodFinishes, seo, ...productData } = body

    const data: any = {
      ...productData,
      price: productData.price ? parseFloat(productData.price) : undefined,
      comparePrice: productData.comparePrice
        ? parseFloat(productData.comparePrice)
        : undefined,
      weight: productData.weight ? parseFloat(productData.weight) : undefined,
    }

    // ✅ Corrected image deletion (Prisma model is ProductImage)
    if (Array.isArray(images)) {
      await prisma.productImage.deleteMany({ where: { productId: params.id } })
      data.images = {
        create: images.map((url: string, index: number) => ({
          url,
          order: index + 1,
          alt: productData.name || "Ürün görseli",
        })),
      }
    }

    // Future: woodFinishes & SEO updates can go here

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
      include: {
        category: true,
        images: { orderBy: { order: "asc" } },
        woodFinishes: { include: { woodFinish: true } },
      },
    })

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error("Update Product Error:", error)
    return NextResponse.json(
      { error: "Ürün güncellenemedi" },
      { status: 500 }
    )
  }
}

// ====================================================
// DELETE - Delete product (Admin only)
// ====================================================
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session || session.user?.role !== Role.ADMIN) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    // ✅ Also delete related ProductImage rows to prevent orphan records
    await prisma.productImage.deleteMany({ where: { productId: params.id } })
    await prisma.product.delete({ where: { id: params.id } })

    return NextResponse.json({ message: "Ürün silindi" })
  } catch (error) {
    console.error("Delete Product Error:", error)
    return NextResponse.json(
      { error: "Ürün silinemedi" },
      { status: 500 }
    )
  }
}
