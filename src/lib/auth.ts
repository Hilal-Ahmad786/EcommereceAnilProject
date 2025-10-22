// src/lib/auth.ts
import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { type Role } from "@prisma/client"

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim()
        const password = credentials?.password?.toString()

        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        const ok = await bcrypt.compare(password, user.password)
        if (!ok) return null

        // This object becomes `user` in JWT callback on first login
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role as Role,
        }
      },
    }),
  ],

  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/admin/login" },

  callbacks: {
    async jwt({ token, user }) {
      // Persist user props into the token at sign in
      if (user) {
        token.id = (user as any).id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      // Expose token props on the session
      if (session.user) {
        ;(session.user as any).id = token.id as string
        ;(session.user as any).role = token.role as Role
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  // Recommended on Vercel to trust the Host header
  trustHost: true,
}

// Helpers for app router:
// - `auth()` for server-side session
// - `handlers` for /api/auth/[...nextauth]/route.ts
// - `signIn` / `signOut` utilities
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
