'use client'

import { useState } from 'react'
import { CreditCard, Building2 } from 'lucide-react'

interface PaymentFormProps {
  onSubmit: (data: any) => void
}

export default function PaymentForm({ onSubmit }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card')
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      paymentMethod,
      ...(paymentMethod === 'card' && cardData),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setPaymentMethod('card')}
          className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
            paymentMethod === 'card'
              ? 'border-walnut-500 bg-walnut-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <CreditCard className="h-6 w-6" />
          <div className="text-left">
            <p className="font-semibold">Kredi Kartı</p>
            <p className="text-xs text-muted-foreground">Hemen öde</p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('transfer')}
          className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
            paymentMethod === 'transfer'
              ? 'border-walnut-500 bg-walnut-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <Building2 className="h-6 w-6" />
          <div className="text-left">
            <p className="font-semibold">Havale/EFT</p>
            <p className="text-xs text-muted-foreground">Banka transferi</p>
          </div>
        </button>
      </div>

      {/* Credit Card Form */}
      {paymentMethod === 'card' && (
        <div className="space-y-4 p-6 bg-natural-100 rounded-lg">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Kart Numarası <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) =>
                setCardData({ ...cardData, cardNumber: e.target.value })
              }
              required
              maxLength={19}
              placeholder="XXXX XXXX XXXX XXXX"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Kart Üzerindeki İsim <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cardData.cardName}
              onChange={(e) =>
                setCardData({ ...cardData, cardName: e.target.value })
              }
              required
              placeholder="AD SOYAD"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Son Kullanma <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cardData.expiryDate}
                onChange={(e) =>
                  setCardData({ ...cardData, expiryDate: e.target.value })
                }
                required
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
            </div>

            {/* CVV */}
            <div>
              <label className="block text-sm font-medium mb-2">
                CVV <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) =>
                  setCardData({ ...cardData, cvv: e.target.value })
                }
                required
                maxLength={3}
                placeholder="XXX"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-walnut-500"
              />
            </div>
          </div>

          {/* Security Info */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <span>🔒</span>
            <p>
              Ödeme bilgileriniz SSL şifreleme ile korunmaktadır. Kart bilgileriniz saklanmaz.
            </p>
          </div>
        </div>
      )}

      {/* Bank Transfer Info */}
      {paymentMethod === 'transfer' && (
        <div className="p-6 bg-natural-100 rounded-lg space-y-4">
          <p className="text-sm text-muted-foreground">
            Sipariş onaylandıktan sonra banka hesap bilgileri e-posta ile gönderilecektir.
            Ödemenizi yaptıktan sonra dekont/fotoğrafı ile iletişime geçmenizi rica ederiz.
          </p>
          <div className="text-xs text-muted-foreground">
            <p>• Havale işleminizde açıklama kısmına sipariş numaranızı yazınız</p>
            <p>• Ödeme onayı 1-2 iş günü içinde yapılacaktır</p>
          </div>
        </div>
      )}

      {/* Terms Checkbox */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          required
          className="mt-1 rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
        />
        <span className="text-sm text-muted-foreground">
          <a href="/kullanim-kosullari" className="text-walnut-600 hover:underline">
            Kullanım koşullarını
          </a>{' '}
          ve{' '}
          <a href="/gizlilik-politikasi" className="text-walnut-600 hover:underline">
            gizlilik politikasını
          </a>{' '}
          okudum ve kabul ediyorum.
        </span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-walnut-500 hover:bg-walnut-600 text-white py-4 rounded-lg font-semibold transition-colors"
      >
        {paymentMethod === 'card' ? 'Ödemeyi Tamamla' : 'Siparişi Onayla'}
      </button>
    </form>
  )
}