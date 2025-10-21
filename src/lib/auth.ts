// Minimal NextAuth v5 options so you can protect routes now.
// Later, swap Credentials with a database provider (Prisma) for real users.

import 'server-only'
import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'E-posta ile giriş',
      credentials: {
        email: { label: 'E-posta', type: 'email' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        // TEMP: single super admin via env
        if (
          credentials?.email === ADMIN_EMAIL &&
          credentials?.password === ADMIN_PASSWORD
        ) {
          return {
            id: 'admin-1',
            name: 'Yönetici',
            email: ADMIN_EMAIL!,
            role: 'ADMIN',
          } as any
        }
        // TODO: add customer login (Prisma) later
        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/giris' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role ?? 'CUSTOMER'
      return token
    },
    async session({ session, token }) {
      ;(session as any).role = (token as any).role ?? 'CUSTOMER'
      return session
    },
  },
}
