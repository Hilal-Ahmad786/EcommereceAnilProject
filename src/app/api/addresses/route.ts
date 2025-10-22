// src/app/api/addresses/route.ts
import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const addresses = await prisma.address.findMany({
      where: { userId: (session.user as any).id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json({ success: true, data: addresses })
  } catch (e) {
    console.error("Addresses GET error:", e)
    return NextResponse.json({ error: "Adresler yüklenemedi" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      fullName,
      phone,
      city,
      district,
      neighborhood,
      addressLine,   // ⬅️ use addressLine
      postalCode,
      isDefault = false,
    } = body

    if (!title || !fullName || !phone || !city || !district || !addressLine) {
      return NextResponse.json({ error: "Zorunlu alanlar eksik" }, { status: 400 })
    }

    // If making default, unset others
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: (session.user as any).id, isDefault: true },
        data: { isDefault: false },
      })
    }

    const created = await prisma.address.create({
      data: {
        userId: (session.user as any).id,
        title,
        fullName,
        phone,
        city,
        district,
        neighborhood: neighborhood ?? null,
        addressLine,                     // ⬅️
        postalCode: postalCode ?? null,
        isDefault,
      },
    })

    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (e) {
    console.error("Addresses POST error:", e)
    return NextResponse.json({ error: "Adres oluşturulamadı" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const patch = await request.json()
    if (!patch?.id) {
      return NextResponse.json({ error: "Adres ID gerekli" }, { status: 400 })
    }

    const existing = await prisma.address.findUnique({
      where: { id: patch.id },
    })
    if (!existing || existing.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Adres bulunamadı" }, { status: 404 })
    }

    if (patch.isDefault === true) {
      await prisma.address.updateMany({
        where: { userId: (session.user as any).id, isDefault: true },
        data: { isDefault: false },
      })
    }

    const updated = await prisma.address.update({
      where: { id: patch.id },
      data: {
        title: patch.title ?? existing.title,
        fullName: patch.fullName ?? existing.fullName,
        phone: patch.phone ?? existing.phone,
        city: patch.city ?? existing.city,
        district: patch.district ?? existing.district,
        neighborhood: patch.neighborhood ?? existing.neighborhood,
        addressLine: patch.addressLine ?? existing.addressLine,    // ⬅️
        postalCode: patch.postalCode ?? existing.postalCode,
        isDefault: typeof patch.isDefault === "boolean" ? patch.isDefault : existing.isDefault,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (e) {
    console.error("Addresses PATCH error:", e)
    return NextResponse.json({ error: "Adres güncellenemedi" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "Adres ID gerekli" }, { status: 400 })
    }

    const existing = await prisma.address.findUnique({ where: { id } })
    if (!existing || existing.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Adres bulunamadı" }, { status: 404 })
    }

    await prisma.address.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Addresses DELETE error:", e)
    return NextResponse.json({ error: "Adres silinemedi" }, { status: 500 })
  }
}
