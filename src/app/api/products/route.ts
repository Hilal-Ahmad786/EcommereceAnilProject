// ============================================
// FILE: src/app/api/products/route.ts
// Updated for your advanced schema
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

// GET - Fetch all products with advanced filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categoryId = searchParams.get('categoryId')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const where: any = {}
    
    if (parentOnly) {
      where.parentId = null
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        parent: true,
        children: includeChildren,
        _count: {
          select: { products: true }
        },
        seo: true
      },
      orderBy: { order: 'asc' }
    })
    
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Categories API Error:', error)
    return NextResponse.json(
      { error: "Kategoriler yüklenemedi" },
      { status: 500 }
    )
  }
}

// POST - Create new category (Admin only)
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
    const { seo, ...categoryData } = body

    const category = await prisma.category.create({
      data: {
        ...categoryData,
        seo: seo ? {
          create: seo
        } : undefined
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true }
        }
      }
    })

    return NextResponse.json(category)
  } catch (error) {
    console.error('Create Category Error:', error)
    return NextResponse.json(
      { error: "Kategori oluşturulamadı" },
      { status: 500 }
    )
  }
}
