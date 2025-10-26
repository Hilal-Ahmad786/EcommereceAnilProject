// src/lib/auth.ts
import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { type Role } from "@prisma/client"

// =============================
// 🔐 NEXTAUTH CONFIG
// =============================
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

        // ✅ Return essential user info
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

  // =============================
  // 🧭 SESSION / JWT BEHAVIOR
  // =============================
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
  },

  // =============================
  // ⚙️ CALLBACKS
  // =============================
  callbacks: {
    // Persist user data into the JWT at sign in
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id
        token.role = (user as any).role
        token.email = (user as any).email
        token.name = (user as any).name
      }
      return token
    },

    // Expose token data inside session.user
    async session({ session, token }) {
      if (!session.user) session.user = {} as any
      ;(session.user as any).id = token.id as string
      ;(session.user as any).role = token.role as Role
      ;(session.user as any).email = token.email
      ;(session.user as any).name = token.name
      return session
    },
  },

  // =============================
  // ⚙️ GENERAL SETTINGS
  // =============================
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
}

// =============================
// 🔧 EXPORT HELPERS
// =============================
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
