// src/app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        woodFinishes: { include: { woodFinish: true } },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Check if slug is taken by another product
    if (body.slug) {
      const existing = await prisma.product.findFirst({
        where: { 
          slug: body.slug,
          NOT: { id: params.id }
        }
      })

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Bu slug başka bir ürün tarafından kullanılıyor' },
          { status: 400 }
        )
      }
    }
    
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        price: body.price ? parseFloat(body.price) : undefined,
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        stock: body.stock ? parseInt(body.stock) : undefined,
        lowStockThreshold: body.lowStockThreshold,
        sku: body.sku,
        dimensions: body.dimensions,
        weight: body.weight ? parseFloat(body.weight) : null,
        featured: body.featured,
        isActive: body.isActive,
        categoryId: body.categoryId,
      },
      include: {
        category: true,
        images: true,
        woodFinishes: { include: { woodFinish: true } }
      },
    })

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.product.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Ürün silindi' 
    })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün silinirken hata oluştu' },
      { status: 500 }
    )
  }
}

// src/app/api/products/slug/[slug]/route.ts
// Create this file separately for slug-based fetching
export async function GET_BY_SLUG(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
        woodFinishes: { include: { woodFinish: true } },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}