// src/components/layout/AdminHeader.tsx

'use client'

import { Bell, User, LogOut, Menu, X } from 'lucide-react'
import { useAdminUiStore } from '@/store/adminUiStore'

export default function AdminHeader() {
  const { sidebarOpen, toggleSidebar } = useAdminUiStore()

  const user = { name: 'Admin', email: 'admin@mutfakmobilya.com' }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="lg:hidden p-2 hover:bg-natural-100 rounded-lg"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <div className="font-semibold text-walnut-700">Yönetim Paneli</div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-natural-100 rounded-lg">
          <Bell className="h-5 w-5" />
        </button>
        <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg">
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button className="w-10 h-10 bg-walnut-100 rounded-full flex items-center justify-center hover:bg-walnut-200 transition-colors">
            <User className="h-5 w-5 text-walnut-600" />
          </button>
        </div>
        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}
