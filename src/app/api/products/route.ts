// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const categoryId = searchParams.get('categoryId')
    const sortBy = searchParams.get('sortBy') || 'newest'
    const limit = parseInt(searchParams.get('limit') || '24')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = { isActive: true }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }
    
    if (categoryId) {
      where.categoryId = categoryId
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' }
    switch (sortBy) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name-asc':
        orderBy = { name: 'asc' }
        break
      case 'name-desc':
        orderBy = { name: 'desc' }
        break
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: { orderBy: { order: 'asc' } },
          woodFinishes: { include: { woodFinish: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { success: false, error: 'Ürünler getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Check if slug exists
    const existing = await prisma.product.findUnique({
      where: { slug: body.slug }
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Bu slug zaten kullanılıyor' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        shortDescription: body.shortDescription,
        price: parseFloat(body.price),
        comparePrice: body.comparePrice ? parseFloat(body.comparePrice) : null,
        stock: parseInt(body.stock),
        lowStockThreshold: body.lowStockThreshold || 5,
        sku: body.sku,
        barcode: body.barcode,
        dimensions: body.dimensions,
        weight: body.weight ? parseFloat(body.weight) : null,
        weightUnit: body.weightUnit || 'kg',
        featured: body.featured || false,
        isActive: body.isActive ?? true,
        categoryId: body.categoryId,
        images: body.images ? {
          create: body.images.map((img: any, index: number) => ({
            url: img.url,
            alt: img.alt,
            order: index,
          })),
        } : undefined,
      },
      include: {
        category: true,
        images: true,
        woodFinishes: { include: { woodFinish: true } }
      },
    })

    return NextResponse.json({ 
      success: true, 
      data: product 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { success: false, error: 'Ürün oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}