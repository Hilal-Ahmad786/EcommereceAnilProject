// src/app/api/health/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma' // your prisma helper

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Simple round trip to DB
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('HEALTH ERROR:', e)
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 })
  }
}
