// src/app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const limit = parseInt(searchParams.get("limit") || "20", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    const where: any = { isActive: true }
    if (categoryId) where.categoryId = categoryId
    if (featured === "true") where.featured = true
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: { orderBy: { order: "asc" } },
          woodFinishes: { include: { woodFinish: true } },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: products,
      total,
      hasMore: offset + limit < total,
    })
  } catch (error) {
    console.error("Products API Error:", error)
    return NextResponse.json(
      { success: false, error: "Ürünler yüklenemedi" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await auth()
    const role = (session?.user as any)?.role
    if (!session?.user || role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse payload
    const body = await request.json()
    const { images = [], woodFinishes = [], dimensions, ...raw } = body

    // Basic required fields
    const baseSlug = (raw.slug || "").trim()
    if (!raw.name || !baseSlug || !raw.categoryId) {
      return NextResponse.json(
        { success: false, error: "İsim, slug ve kategori zorunludur" },
        { status: 400 }
      )
    }

    // ✅ Block duplicates: explicit unique slug check (Option A)
    const slugExists = await prisma.product.findUnique({ where: { slug: baseSlug } })
    if (slugExists) {
      return NextResponse.json(
        { success: false, error: "Bu slug zaten kullanılıyor" },
        { status: 409 }
      )
    }

    // Coerce numerics (Prisma expects Int/Float)
    const price = Number(raw.price)
    const comparePrice = raw.comparePrice ? Number(raw.comparePrice) : null
    const stock = Number.isFinite(Number(raw.stock)) ? Number(raw.stock) : NaN
    const lowStockThreshold = Number.isFinite(Number(raw.lowStockThreshold))
      ? Number(raw.lowStockThreshold)
      : 0
    const weight = raw.weight ? Number(raw.weight) : null

    if (!Number.isFinite(price) || !Number.isFinite(stock)) {
      return NextResponse.json(
        { success: false, error: "Geçersiz fiyat veya stok değeri" },
        { status: 400 }
      )
    }

    // Coerce dimensions if present
    const dims =
      dimensions && (dimensions.width || dimensions.height || dimensions.depth)
        ? {
            width:
              dimensions.width !== undefined && dimensions.width !== ""
                ? Number(dimensions.width)
                : undefined,
            height:
              dimensions.height !== undefined && dimensions.height !== ""
                ? Number(dimensions.height)
                : undefined,
            depth:
              dimensions.depth !== undefined && dimensions.depth !== ""
                ? Number(dimensions.depth)
                : undefined,
            unit: dimensions.unit || "cm",
          }
        : undefined

    // Build data
    const data: any = {
      ...raw,
      slug: baseSlug,
      price,
      comparePrice,
      stock,
      lowStockThreshold,
      weight,
      weightUnit: weight ? raw.weightUnit || "kg" : null,
      dimensions: dims,
    }

    // Images relation if present
    if (Array.isArray(images) && images.length > 0) {
      data.images = {
        create: images.map((img: any, idx: number) => ({
          url: typeof img === "string" ? img : img.url,
          alt:
            typeof img === "object" && img.alt
              ? img.alt
              : (raw.name as string),
          order: idx + 1,
        })),
      }
    }

    // Wood finishes relation if present
    if (Array.isArray(woodFinishes) && woodFinishes.length > 0) {
      data.woodFinishes = {
        create: woodFinishes.map((wf: any) => ({
          woodFinishId: wf.woodFinishId || wf.id,
          priceModifier: wf.priceModifier ? Number(wf.priceModifier) : 0,
        })),
      }
    }

    // Create product
    const product = await prisma.product.create({
      data,
      include: {
        category: true,
        images: true,
        woodFinishes: { include: { woodFinish: true } },
      },
    })

    // Revalidate admin & public pages
    revalidatePath("/admin/urunler")
    revalidatePath("/urunler")

    return NextResponse.json({ success: true, data: product }, { status: 201 })
  } catch (error: any) {
    // In case of race conditions, map P2002 to a friendly 409
    if (error?.code === "P2002" && Array.isArray(error?.meta?.target) && error.meta.target.includes("slug")) {
      return NextResponse.json(
        { success: false, error: "Bu slug zaten kullanılıyor" },
        { status: 409 }
      )
    }

    console.error("Create Product Error:", error)
    return NextResponse.json(
      { success: false, error: "Ürün oluşturulamadı" },
      { status: 500 }
    )
  }
}
