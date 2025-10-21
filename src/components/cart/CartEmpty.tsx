// src/components/cart/CartEmpty.tsx
import Link from 'next/link'

export default function CartEmpty() {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🛒</div>
      <h3 className="text-xl font-semibold mb-2">Sepetiniz Boş</h3>
      <p className="text-muted-foreground mb-6">Alışverişe başlamak için ürünlerimize göz atın</p>
      <Link href="/urunler" className="inline-block px-6 py-3 bg-walnut-500 text-white rounded-lg">
        Alışverişe Başla
      </Link>
    </div>
  )
}