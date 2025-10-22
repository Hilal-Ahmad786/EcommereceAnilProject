// src/app/(auth)/layout.tsx
import ClientSuspense from '@/components/common/ClientSuspense'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ClientSuspense>{children}</ClientSuspense>
}
