'use client'

import { Bell, User, LogOut, Menu } from 'lucide-react'

export default function AdminHeader() {
  // TODO: Get user from session
  const user = {
    name: 'Admin',
    email: 'admin@mutfakmobilya.com',
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Mobile Menu Toggle */}
      <button className="lg:hidden p-2 hover:bg-natural-100 rounded-lg">
        <Menu className="h-6 w-6" />
      </button>

      <div className="flex-1" />

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-natural-100 rounded-lg transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-right">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <button className="w-10 h-10 bg-walnut-100 rounded-full flex items-center justify-center hover:bg-walnut-200 transition-colors">
            <User className="h-5 w-5 text-walnut-600" />
          </button>
        </div>

        {/* Logout */}
        <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  )
}