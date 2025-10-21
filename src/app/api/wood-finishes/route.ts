
// ============================================
// FILE: src/app/api/wood-finishes/route.ts
// Wood finishes API
// ============================================

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

// GET - Fetch all wood finishes
export async function GET() {
  try {
    const woodFinishes = await prisma.woodFinish.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(woodFinishes)
  } catch (error) {
    console.error('Wood Finishes API Error:', error)
    return NextResponse.json(
      { error: "Ahşap kaplamalar yüklenemedi" },
      { status: 500 }
    )
  }
}

// POST - Create new wood finish (Admin only)
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

    const woodFinish = await prisma.woodFinish.create({
      data: body
    })

    return NextResponse.json(woodFinish)
  } catch (error) {
    console.error('Create Wood Finish Error:', error)
    return NextResponse.json(
      { error: "Ahşap kaplama oluşturulamadı" },
      { status: 500 }
    )
  }
}
