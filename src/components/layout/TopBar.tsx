'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true)

  // TODO: Fetch from admin settings/API
  const announcement = {
    text: '🎉 Yeni Sezon Koleksiyonu! Tüm Ürünlerde %20 İndirim',
    link: '/urunler',
    isActive: true,
  }

  if (!isVisible || !announcement.isActive) return null

  return (
    <div className="relative bg-walnut-500 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2.5 text-sm">
          <div className="flex-1" />
          
          <div className="flex-shrink-0 text-center">
            {announcement.link ? (
              <a
                href={announcement.link}
                className="hover:underline font-medium"
              >
                {announcement.text}
              </a>
            ) : (
              <span className="font-medium">{announcement.text}</span>
            )}
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-walnut-600 rounded transition-colors"
              aria-label="Duyuruyu kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}