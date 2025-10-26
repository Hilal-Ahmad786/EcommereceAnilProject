import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-natural-100 px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md w-full">
        <CheckCircle className="h-16 w-16 text-sage-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-walnut-700 mb-2">Ödeme Başarılı 🎉</h1>
        <p className="text-muted-foreground mb-6">
          Siparişiniz başarıyla oluşturuldu. En kısa sürede hazırlanıp kargoya verilecektir.
        </p>
        <div className="space-y-3">
          <Link
            href="/hesabim/siparisler"
            className="block bg-walnut-500 hover:bg-walnut-600 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Siparişlerimi Görüntüle
          </Link>
          <Link
            href="/"
            className="block text-muted-foreground hover:text-walnut-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
