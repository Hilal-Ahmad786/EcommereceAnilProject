import Link from 'next/link'
import { CheckCircle, Package, Home } from 'lucide-react'

export default function OrderSuccessPage() {
  // TODO: Get order details from query params or session
  const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-sage-100 rounded-full mb-6">
          <CheckCircle className="h-12 w-12 text-sage-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-4">
          Siparişiniz Alındı! 🎉
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Siparişiniz başarıyla oluşturuldu. Sipariş detayları e-posta adresinize gönderildi.
        </p>

        {/* Order Number */}
        <div className="bg-natural-100 rounded-xl p-6 mb-8">
          <p className="text-sm text-muted-foreground mb-2">Sipariş Numaranız</p>
          <p className="text-2xl font-bold text-walnut-600">{orderNumber}</p>
        </div>

        {/* What's Next */}
        <div className="bg-white border rounded-xl p-6 mb-8 text-left">
          <h2 className="font-bold text-lg mb-4">Bundan Sonra Ne Olacak?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-sage-600">1</span>
              </div>
              <div>
                <p className="font-semibold">Sipariş Onayı</p>
                <p className="text-sm text-muted-foreground">
                  Siparişiniz hazırlanmaya başlanacak ve detaylar e-posta ile gönderilecek.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-sage-600">2</span>
              </div>
              <div>
                <p className="font-semibold">Kargoya Verilme</p>
                <p className="text-sm text-muted-foreground">
                  Ürünleriniz hazırlandıktan sonra kargoya verilecek ve takip numarası paylaşılacak.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-sage-600">3</span>
              </div>
              <div>
                <p className="font-semibold">Teslimat</p>
                <p className="text-sm text-muted-foreground">
                  Ürünleriniz 3-5 iş günü içinde adresinize teslim edilecek.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/hesabim/siparisler"
            className="inline-flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            <Package className="h-5 w-5" />
            Siparişlerimi Görüntüle
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-walnut-500 text-walnut-500 px-8 py-4 rounded-lg font-semibold hover:bg-walnut-50 transition-colors"
          >
            <Home className="h-5 w-5" />
            Ana Sayfaya Dön
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-8 p-4 bg-natural-100 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Sorularınız için{' '}
            <Link href="/iletisim" className="text-walnut-600 hover:underline font-medium">
              müşteri hizmetleri
            </Link>{' '}
            ile iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}