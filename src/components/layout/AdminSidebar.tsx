'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  FileText,
  Image,
  Star,
  Search,
  Settings,
} from 'lucide-react'

export default function AdminSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Ürünler', href: '/admin/urunler', icon: Package },
    { name: 'Kategoriler', href: '/admin/kategoriler', icon: FolderTree },
    { name: 'Siparişler', href: '/admin/siparisler', icon: ShoppingCart },
    { name: 'Müşteriler', href: '/admin/musteriler', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Medya', href: '/admin/medya', icon: Image },
    { name: 'İncelemeler', href: '/admin/incelemeler', icon: Star },
    { name: 'SEO', href: '/admin/seo', icon: Search },
    { name: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
  ]

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-white border-r">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b">
            <Link href="/admin" className="flex items-center">
              <span className="text-xl font-bold text-walnut-600">
                Mutfak Mobilya
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-walnut-50 text-walnut-700'
                      : 'text-gray-700 hover:bg-natural-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Back to Site */}
          <div className="p-4 border-t">
            <Link
              href="/"
              className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-walnut-600 border-2 border-walnut-500 rounded-lg hover:bg-walnut-50 transition-colors"
            >
              ← Siteye Dön
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}