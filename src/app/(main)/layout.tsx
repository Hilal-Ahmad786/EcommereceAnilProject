// src/app/(main)/layout.tsx

import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/floating/FloatingButtons'
import ClientBoundary from '@/components/ClientBoundary'

// Disable SSG/ISR under this tree to avoid server-only errors (e.g. location)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">
        <ClientBoundary>{children}</ClientBoundary>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
