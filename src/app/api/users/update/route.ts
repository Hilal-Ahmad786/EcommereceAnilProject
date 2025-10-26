import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 })
    }

    const data = await req.json()

    // ✅ Only update existing fields (name, email, etc.)
    // If you really want phone/city, add them to schema first.
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name || undefined,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("User update failed:", error)
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 })
  }
}
