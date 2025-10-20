import { formatPrice } from '@/lib/utils'

interface CartSummaryProps {
  subtotal: number
  shippingCost?: number
  discount?: number
  total: number
}

export default function CartSummary({
  subtotal,
  shippingCost = 0,
  discount = 0,
  total,
}: CartSummaryProps) {
  return (
    <div className="bg-natural-100 rounded-xl p-6 space-y-4">
      <h3 className="font-bold text-lg mb-4">Sipariş Özeti</h3>

      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Ara Toplam</span>
        <span className="font-medium">{formatPrice(subtotal)}</span>
      </div>

      {/* Shipping */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Kargo</span>
        <span className="font-medium text-sage-600">
          {shippingCost === 0 ? 'Ücretsiz' : formatPrice(shippingCost)}
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">İndirim</span>
          <span className="font-medium text-sage-600">
            -{formatPrice(discount)}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-lg font-bold">
          <span>Toplam</span>
          <span className="text-walnut-600">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 space-y-2 text-xs text-muted-foreground">
        <p>✓ KDV dahildir</p>
        <p>✓ Ücretsiz kargo</p>
        <p>✓ Güvenli ödeme</p>
      </div>
    </div>
  )
}