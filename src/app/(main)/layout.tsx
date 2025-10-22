// src/app/(main)/layout.tsx
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/floating/FloatingButtons'
import ClientSuspense from '@/components/common/ClientSuspense'

// prevent static prerender so DB/search params don't run at build time
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ClientSuspense><TopBar /></ClientSuspense>
      <ClientSuspense><Header /></ClientSuspense>

      <main className="flex-1">
        <ClientSuspense>{children}</ClientSuspense>
      </main>

      <ClientSuspense><Footer /></ClientSuspense>
      <ClientSuspense><FloatingButtons /></ClientSuspense>
    </div>
  )
}
