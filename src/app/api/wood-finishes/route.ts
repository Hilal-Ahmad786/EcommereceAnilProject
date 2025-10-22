// src/app/api/wood-finishes/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const woodFinishes = await prisma.woodFinish.findMany({
      include: {
        _count: { select: { products: true } }
      },
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json({ success: true, data: woodFinishes })
  } catch (error) {
    console.error('Wood Finishes API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Ahşap kaplamalar yüklenemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const woodFinish = await prisma.woodFinish.create({ data: body })

    return NextResponse.json({ success: true, data: woodFinish }, { status: 201 })
  } catch (error) {
    console.error('Create Wood Finish Error:', error)
    return NextResponse.json(
      { success: false, error: 'Ahşap kaplama oluşturulamadı' },
      { status: 500 }
    )
  }
}