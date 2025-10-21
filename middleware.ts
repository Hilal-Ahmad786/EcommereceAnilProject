import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  })

  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/giris') || 
                      request.nextUrl.pathname.startsWith('/kayit')
  const isAccountRoute = request.nextUrl.pathname.startsWith('/hesabim')

  // Protect admin routes
  if (isAdminRoute && (!token || token.role !== 'ADMIN')) {
    return NextResponse.redirect(new URL('/giris', request.url))
  }

  // Protect customer account routes
  if (isAccountRoute && !token) {
    return NextResponse.redirect(new URL('/giris', request.url))
  }

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    if (token.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/giris',
    '/kayit',
    '/hesabim/:path*'
  ],
}