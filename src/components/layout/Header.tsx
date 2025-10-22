// src/components/layout/Header.tsx
'use client'

import Link from 'next/link'
import { ShoppingCart, Heart, User, Menu, Search } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Hydration guard
  useEffect(() => setMounted(true), [])

  // Select from stores
  const totalItems = useCartStore((state) => state.getTotalItems())
  const wishlistCount = useWishlistStore((state) => state.items.length)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-walnut-500">Mutfak Mobilya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-walnut-500">
              Ana Sayfa
            </Link>
            <Link href="/urunler" className="text-sm font-medium transition-colors hover:text-walnut-500">
              Ürünler
            </Link>
            <Link href="/blog" className="text-sm font-medium transition-colors hover:text-walnut-500">
              Blog
            </Link>
            <Link href="/hakkimizda" className="text-sm font-medium transition-colors hover:text-walnut-500">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="text-sm font-medium transition-colors hover:text-walnut-500">
              İletişim
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              type="button"
              className="p-2 hover:bg-natural-100 rounded-lg transition-colors"
              aria-label="Ara"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/favoriler"
              className="relative p-2 hover:bg-natural-100 rounded-lg transition-colors"
              aria-label="Favoriler"
            >
              <Heart className="h-5 w-5" />
              {mounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-sage-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/sepet"
              className="relative p-2 hover:bg-natural-100 rounded-lg transition-colors"
              aria-label="Sepet"
            >
              <ShoppingCart className="h-5 w-5" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-walnut-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link
              href="/hesabim"
              className="hidden md:flex p-2 hover:bg-natural-100 rounded-lg transition-colors"
              aria-label="Hesabım"
            >
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="md:hidden p-2 hover:bg-natural-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              aria-label="Menü"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-sm font-medium transition-colors hover:text-walnut-500" onClick={() => setIsMobileMenuOpen(false)}>
                Ana Sayfa
              </Link>
              <Link href="/urunler" className="text-sm font-medium transition-colors hover:text-walnut-500" onClick={() => setIsMobileMenuOpen(false)}>
                Ürünler
              </Link>
              <Link href="/blog" className="text-sm font-medium transition-colors hover:text-walnut-500" onClick={() => setIsMobileMenuOpen(false)}>
                Blog
              </Link>
              <Link href="/hakkimizda" className="text-sm font-medium transition-colors hover:text-walnut-500" onClick={() => setIsMobileMenuOpen(false)}>
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-sm font-medium transition-colors hover:text-walnut-500" onClick={() => setIsMobileMenuOpen(false)}>
                İletişim
              </Link>
              <Link href="/hesabim" className="text-sm font-medium transition-colors hover:text-walnut-500" onClick={() => setIsMobileMenuOpen(false)}>
                Hesabım
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
