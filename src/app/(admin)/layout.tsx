import AdminSidebar from '@/components/layout/AdminSidebar'
import AdminHeader from '@/components/layout/AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-natural-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <AdminHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="p-4 text-center text-sm text-muted-foreground border-t bg-white">
          © 2024 Mutfak Mobilya Admin Panel • Developed by{' '}
          <a
            href="https://www.paksoft.com.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-walnut-600 hover:text-walnut-700"
          >
            Paksoft
          </a>
        </footer>
      </div>
    </div>
  )
}