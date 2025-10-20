'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { mainNavigation } from '@/config/navigation'

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {mainNavigation.map((item) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() => item.submenu && setActiveDropdown(item.title)}
          onMouseLeave={() => setActiveDropdown(null)}
        >
          <Link
            href={item.href}
            className="flex items-center text-sm font-medium transition-colors hover:text-walnut-500"
          >
            {item.title}
            {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
          </Link>

          {/* Dropdown Menu */}
          {item.submenu && activeDropdown === item.title && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border rounded-lg shadow-lg py-2 z-50">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block px-4 py-2 text-sm hover:bg-natural-100 transition-colors"
                >
                  {subItem.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}