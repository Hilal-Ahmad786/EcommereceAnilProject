
// ============================================
// FILE: src/app/api/orders/route.ts
// Orders API
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role, OrderStatus } from "@prisma/client"

// GET - Fetch orders
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Yetkisiz erişim" },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')

    const where: any = {}
    
    // Non-admin users can only see their own orders
    if (session.user.role !== Role.ADMIN) {
      where.userId = session.user.id
    }
    
    if (status) {
      where.status = status as OrderStatus
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        },
        address: true,
        items: {
          include: {
            product: {
              select: {
                name: true,
                slug: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders API Error:', error)
    return NextResponse.json(
      { error: "Siparişler yüklenemedi" },
      { status: 500 }
    )
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: "Sipariş vermek için giriş yapmalısınız" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { items, addressId, paymentMethod, customerNote } = body

    // Calculate totals
    let subtotal = 0
    const orderItems = []

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: {
          images: {
            orderBy: { order: 'asc' },
            take: 1
          }
        }
      })

      if (!product) {
        return NextResponse.json(
          { error: `Ürün bulunamadı: ${item.productId}` },
          { status: 404 }
        )
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Yetersiz stok: ${product.name}` },
          { status: 400 }
        )
      }

      const unitPrice = parseFloat(product.price.toString())
      const totalPrice = unitPrice * item.quantity

      subtotal += totalPrice

      orderItems.push({
        productId: product.id,
        productName: product.name,
        productImage: product.images[0]?.url,
        woodFinishName: item.woodFinishName,
        quantity: item.quantity,
        unitPrice,
        totalPrice
      })
    }

    // Calculate shipping and tax
    const shippingCost = subtotal >= 5000 ? 0 : 50 // Free shipping over 5000 TL
    const tax = subtotal * 0.18 // 18% KDV
    const total = subtotal + shippingCost + tax

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session.user.id,
        addressId,
        subtotal,
        shippingCost,
        tax,
        total,
        paymentMethod,
        customerNote,
        items: {
          create: orderItems
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        },
        address: true
      }
    })

    // Reduce stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity
          }
        }
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Create Order Error:', error)
    return NextResponse.json(
      { error: "Sipariş oluşturulamadı" },
      { status: 500 }
    )
  }
}
