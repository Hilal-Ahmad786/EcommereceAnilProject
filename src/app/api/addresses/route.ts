// src/app/api/addresses/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ success: true, data: addresses })
  } catch (error) {
    console.error('Error fetching addresses:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch addresses' },
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

    // If this is set as default, unset other defaults
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: session.user.id, isDefault: true },
        data: { isDefault: false },
      })
    }

    const address = await prisma.address.create({
      data: {
        userId: session.user.id,
        title: body.title,
        fullName: body.fullName,
        phone: body.phone,
        city: body.city,
        district: body.district,
        neighborhood: body.neighborhood,
        addressLine: body.addressLine,
        postalCode: body.postalCode,
        isDefault: body.isDefault || false,
      },
    })

    return NextResponse.json({ success: true, data: address }, { status: 201 })
  } catch (error) {
    console.error('Error creating address:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create address' },
      { status: 500 }
    )
  }
}

// src/app/api/settings/route.ts
export async function GET_SETTINGS(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const group = searchParams.get('group')

    const where: any = {}
    if (group) where.group = group

    const settings = await prisma.siteSetting.findMany({ where })

    // Convert to key-value object
    const settingsObj = settings.reduce((acc: any, setting) => {
      let value = setting.value
      
      // Parse based on type
      switch (setting.type) {
        case 'boolean':
          value = setting.value === 'true'
          break
        case 'number':
          value = parseFloat(setting.value)
          break
        case 'json':
          try {
            value = JSON.parse(setting.value)
          } catch {}
          break
      }
      
      acc[setting.key] = value
      return acc
    }, {})

    return NextResponse.json({ success: true, data: settingsObj })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function POST_SETTINGS(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { key, value, type, group, description } = body

    const stringValue = typeof value === 'object' 
      ? JSON.stringify(value) 
      : String(value)

    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value: stringValue, type, group, description },
      create: { key, value: stringValue, type: type || 'text', group: group || 'general', description },
    })

    return NextResponse.json({ success: true, data: setting })
  } catch (error) {
    console.error('Error updating setting:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update setting' },
      { status: 500 }
    )
  }
}