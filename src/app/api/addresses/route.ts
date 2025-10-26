// src/app/api/addresses/route.ts
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const addresses = await prisma.address.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(addresses)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const data = await req.json()

  // minimal validation
  const required = ["fullName", "phone", "city", "district", "addressLine"]
  for (const key of required) {
    if (!data[key]) return NextResponse.json({ error: `${key} gerekli` }, { status: 400 })
  }

  const address = await prisma.address.create({
    data: {
      userId: session.user.id,
      title: data.title ?? "Adres",
      fullName: data.fullName,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood ?? null,
      addressLine: data.addressLine,
      postalCode: data.postalCode ?? null,
      isDefault: !!data.isDefault,
    },
  })

  return NextResponse.json(address, { status: 201 })
}
