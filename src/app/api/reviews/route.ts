
// ============================================
// FILE: src/app/api/reviews/route.ts
// Product reviews API
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET - Fetch reviews
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const productId = searchParams.get('productId')
    const approved = searchParams.get('approved')

    const where: any = {}
    
    if (productId) {
      where.productId = productId
    }
    
    if (approved === 'true') {
      where.isApproved = true
    }

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        },
        product: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Reviews API Error:', error)
    return NextResponse.json(
      { error: "Yorumlar yüklenemedi" },
      { status: 500 }
    )
  }
}

// POST - Create new review (Authenticated users)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Yorum yapmak için giriş yapmalısınız" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { productId, rating, title, comment } = body

    // Check if user already reviewed this product
    const existingReview = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId: session.user.id
        }
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: "Bu ürün için zaten yorum yaptınız" },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating: parseInt(rating),
        title,
        comment,
        isApproved: false // Admin approval required
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('Create Review Error:', error)
    return NextResponse.json(
      { error: "Yorum eklenemedi" },
      { status: 500 }
    )
  }
}