import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-walnut-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Sayfa Bulunamadı</h2>
      <p className="text-muted-foreground mb-8">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-walnut-500 text-white rounded-lg hover:bg-walnut-600 transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  )
}