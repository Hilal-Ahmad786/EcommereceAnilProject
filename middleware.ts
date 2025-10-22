// middleware.ts
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
  if (!isAdminRoute) return

  const role = req.auth?.user?.role as string | undefined
  if (role !== "ADMIN") {
    const url = new URL("/admin/login", req.nextUrl.origin)
    url.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: ["/admin/:path*"],
}
