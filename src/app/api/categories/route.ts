// src/app/api/categories/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET all categories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeProducts = searchParams.get('includeProducts') === 'true'

    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: true,
        ...(includeProducts && {
          products: {
            where: { isActive: true },
            take: 10,
            include: {
              images: { take: 1, orderBy: { order: 'asc' } }
            }
          },
        }),
        _count: { select: { products: true } },
      },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json({ 
      success: true, 
      data: categories 
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST create category (Admin only)
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
    const { name, slug, description, image, parentId, order } = body

    // Check if slug already exists
    const existing = await prisma.category.findUnique({
      where: { slug }
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Bu slug zaten kullanılıyor' },
        { status: 400 }
      )
    }

    const category = await prisma.category.create({
      data: {
        slug,
        name,
        description,
        image,
        parentId,
        order: order || 0,
      },
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } }
      }
    })

    return NextResponse.json({ 
      success: true, 
      data: category 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating category:', error)
    return NextResponse.json(
      { success: false, error: 'Kategori oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
}