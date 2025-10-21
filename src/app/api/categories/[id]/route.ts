// src/app/api/categories/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET single category
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
        products: {
          where: { isActive: true },
          include: {
            images: { take: 1, orderBy: { order: 'asc' } }
          }
        },
        _count: { select: { products: true } }
      }
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Kategori bulunamadı' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { success: false, error: 'Kategori getirilirken hata oluştu' },
      { status: 500 }
    )
  }
}

// PUT update category (Admin only)
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
    const { name, slug, description, image, parentId, order } = body

    // Check if slug is taken by another category
    if (slug) {
      const existing = await prisma.category.findFirst({
        where: { 
          slug,
          NOT: { id: params.id }
        }
      })

      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Bu slug başka bir kategori tarafından kullanılıyor' },
          { status: 400 }
        )
      }
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        image,
        parentId,
        order,
      },
      include: {
        parent: true,
        children: true,
        _count: { select: { products: true } }
      }
    })

    return NextResponse.json({ success: true, data: category })
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { success: false, error: 'Kategori güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// DELETE category (Admin only)
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

    // Check if category has products
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: { _count: { select: { products: true } } }
    })

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Kategori bulunamadı' },
        { status: 404 }
      )
    }

    if (category._count.products > 0) {
      return NextResponse.json(
        { success: false, error: 'Bu kategoride ürünler var. Önce ürünleri başka kategoriye taşıyın.' },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Kategori silindi' 
    })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { success: false, error: 'Kategori silinirken hata oluştu' },
      { status: 500 }
    )
  }
}