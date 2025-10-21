// ============================================
// FILE: src/app/api/wishlist/route.ts
// Wishlist API
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Fetch user's wishlist
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const wishlist = await prisma.wishlistItem.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        product: {
          include: {
            category: true,
            images: {
              orderBy: { order: 'asc' },
              take: 1
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(wishlist)
  } catch (error) {
    console.error('Wishlist API Error:', error)
    return NextResponse.json(
      { error: "Favoriler yüklenemedi" },
      { status: 500 }
    )
  }
}

// POST - Add to wishlist
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Favorilere eklemek için giriş yapmalısınız" },
        { status: 401 }
      )
    }

    const { productId } = await request.json()

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId
        }
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: "Ürün zaten favorilerde" },
        { status: 400 }
      )
    }

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: session.user.id,
        productId
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: { order: 'asc' },
              take: 1
            }
          }
        }
      }
    })

    return NextResponse.json(wishlistItem)
  } catch (error) {
    console.error('Add to Wishlist Error:', error)
    return NextResponse.json(
      { error: "Favorilere eklenemedi" },
      { status: 500 }
    )
  }
}

// DELETE - Remove from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    if (!productId) {
      return NextResponse.json(
        { error: "Ürün ID gerekli" },
        { status: 400 }
      )
    }

    await prisma.wishlistItem.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId
        }
      }
    })

    return NextResponse.json({ message: "Favorilerden kaldırıldı" })
  } catch (error) {
    console.error('Remove from Wishlist Error:', error)
    return NextResponse.json(
      { error: "Favorilerden kaldırılamadı" },
      { status: 500 }
    )
  }
} = {
      isActive: true
    }
    
    if (categoryId) {
      where.categoryId = categoryId
    }
    
    if (featured === 'true') {
      where.featured = true
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { order: 'asc' }
          },
          woodFinishes: {
            include: {
              woodFinish: true
            }
          },
          _count: {
            select: { reviews: true }
          }
        },
        orderBy: { [sortBy]: sortOrder },
        take: limit,
        skip: offset
      }),
      prisma.product.count({ where })
    ])

    // Calculate average ratings
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const avgRating = await prisma.review.aggregate({
          where: { productId: product.id, isApproved: true },
          _avg: { rating: true }
        })

        return {
          ...product,
          averageRating: avgRating._avg.rating || 0,
          reviewCount: product._count.reviews
        }
      })
    )

    return NextResponse.json({
      products: productsWithRatings,
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    })
  } catch (error) {
    console.error('Products API Error:', error)
    return NextResponse.json(
      { error: "Ürünler yüklenemedi" },
      { status: 500 }
    )
  }
}

// POST - Create new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      images = [],
      woodFinishes = [],
      seo,
      ...productData
    } = body

    const product = await prisma.product.create({
      data: {
        ...productData,
        price: parseFloat(productData.price),
        comparePrice: productData.comparePrice ? parseFloat(productData.comparePrice) : null,
        weight: productData.weight ? parseFloat(productData.weight) : null,
        images: {
          create: images.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt || productData.name,
            order: index + 1
          }))
        },
        woodFinishes: woodFinishes.length > 0 ? {
          create: woodFinishes.map((wf: any) => ({
            woodFinishId: wf.woodFinishId,
            priceModifier: wf.priceModifier ? parseFloat(wf.priceModifier) : null
          }))
        } : undefined,
        seo: seo ? {
          create: seo
        } : undefined
      },
      include: {
        category: true,
        images: true,
        woodFinishes: {
          include: {
            woodFinish: true
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Create Product Error:', error)
    return NextResponse.json(
      { error: "Ürün oluşturulamadı" },
      { status: 500 }
    )
  }
}