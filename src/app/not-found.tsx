// src/app/not-found.tsx
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
        Sayfa bulunamadı
      </h1>
      <p className="text-muted-foreground mb-6">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 rounded-lg border font-medium hover:bg-muted"
      >
        Anasayfaya dön
      </Link>
    </div>
  )
}
