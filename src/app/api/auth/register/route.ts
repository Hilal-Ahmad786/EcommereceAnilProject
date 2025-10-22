// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

/** Only create the client when we actually need it */
function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

export const dynamic = 'force-dynamic' // ensure this isn’t pre-evaluated as static

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 })
    }

    const hash = await bcrypt.hash(password, 10)

    // If your Prisma schema sets a default role (e.g. USER), omit role to avoid typing issues.
    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        name: name || null,
      },
      select: { id: true, email: true, name: true },
    })

    // Optional email (only if RESEND_API_KEY exists)
    const resend = getResend()
    if (resend) {
      try {
        // TODO: customize your email
        // await resend.emails.send({
        //   from: 'Your App <no-reply@your-domain>',
        //   to: email,
        //   subject: 'Welcome!',
        //   html: `<p>Welcome, ${name || 'there'}!</p>`,
        // })
      } catch (e) {
        console.warn('Resend send skipped/failed:', e)
      }
    } else {
      console.warn('RESEND_API_KEY not set; skipping welcome email.')
    }

    return NextResponse.json({ success: true, user }, { status: 201 })
  } catch (e) {
    console.error('Register route error:', e)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
