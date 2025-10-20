'use client'

import Link from 'next/link'
import { X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { mainNavigation } from '@/config/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-xl overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xl font-bold text-walnut-500">Menü</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
              aria-label="Menüyü kapat"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {mainNavigation.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 px-4 py-3 text-sm font-medium hover:bg-natural-100 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <button
                      onClick={() =>
                        setExpandedItem(
                          expandedItem === item.title ? null : item.title
                        )
                      }
                      className="p-3 hover:bg-natural-100 rounded-lg transition-colors"
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedItem === item.title ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && expandedItem === item.title && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-muted-foreground hover:bg-natural-100 rounded-lg transition-colors"
                        onClick={onClose}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Account Link */}
          <div className="mt-6 pt-6 border-t">
            <Link
              href="/hesabim"
              className="block px-4 py-3 text-sm font-medium hover:bg-natural-100 rounded-lg transition-colors"
              onClick={onClose}
            >
              Hesabım
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}