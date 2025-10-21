// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')
    const approved = searchParams.get('approved') !== 'false'

    const where: any = {}
    if (productId) where.productId = productId
    if (approved) where.isApproved = true

    const reviews = await prisma.review.findMany({
      where,
      include: {
        user: { select: { name: true } },
        product: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, data: reviews })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { productId, rating, title, comment } = body

    // Check if user already reviewed this product
    const existing = await prisma.review.findUnique({
      where: {
        productId_userId: {
          productId,
          userId: session.user.id,
        },
      },
    })

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Bu ürün için zaten yorum yaptınız' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: session.user.id,
        rating,
        title,
        comment,
        isApproved: false, // Requires admin approval
      },
    })

    return NextResponse.json(
      { success: true, data: review, message: 'Yorumunuz alındı. Onaylandıktan sonra yayınlanacak.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}

// src/app/api/newsletter/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    })

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: false, error: 'Bu e-posta zaten kayıtlı' },
          { status: 400 }
        )
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscriber.update({
          where: { email },
          data: { isActive: true },
        })
        return NextResponse.json({
          success: true,
          message: 'Aboneliğiniz yeniden aktif edildi',
        })
      }
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: { email, source: 'website' },
    })

    // Optional: Add to Mailchimp
    try {
      const { subscribeToNewsletter } = await import('@/lib/mailchimp')
      await subscribeToNewsletter(email, name)
    } catch (error) {
      console.error('Mailchimp subscription failed:', error)
      // Continue even if Mailchimp fails
    }

    return NextResponse.json({
      success: true,
      message: 'Bültenimize başarıyla abone oldunuz',
    })
  } catch (error) {
    console.error('Error subscribing to newsletter:', error)
    return NextResponse.json(
      { success: false, error: 'Abonelik sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
}