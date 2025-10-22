// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeProducts = searchParams.get("includeProducts") === "true"

    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        ...(includeProducts && {
          products: {
            where: { isActive: true },
            take: 8,
            include: {
              images: { take: 1, orderBy: { order: "asc" } },
            },
          },
        }),
        _count: { select: { products: true } },
      },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({ success: true, data: categories })
  } catch (error) {
    console.error("Categories API Error:", error)
    return NextResponse.json(
      { success: false, error: "Kategoriler yüklenemedi" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const role = (session?.user as any)?.role
    if (!session?.user || role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, slug, description, image, parentId, order } = body

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: "İsim ve slug zorunludur" },
        { status: 400 }
      )
    }

    const existing = await prisma.category.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Bu slug zaten kullanılıyor" },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        slug,
        name,
        description,
        image,
        parentId: parentId || null,
        order: order ?? 0,
      },
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } },
      },
    })

    // refresh relevant pages
    revalidatePath("/admin/kategoriler")
    revalidatePath("/urunler")

    return NextResponse.json({ success: true, data: category }, { status: 201 })
  } catch (error) {
    console.error("Create Category Error:", error)
    return NextResponse.json(
      { success: false, error: "Kategori oluşturulamadı" },
      { status: 500 }
    )
  }
}
