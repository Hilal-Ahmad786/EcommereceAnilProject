
// middleware.ts - TEMPORARY VERSION FOR TESTING
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // TEMPORARY: Allow all admin access for testing
  // TODO: Remove this and implement proper auth
  
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