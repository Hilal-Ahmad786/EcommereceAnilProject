// src/app/(main)/checkout/page.tsx

'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Plus, Check, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import CartSummary from '@/components/cart/CartSummary'
import { useCreateOrder } from '@/components/checkout/createOrder'

type Address = {
  id: string
  title: string
  fullName: string
  phone: string
  city: string
  district: string
  neighborhood?: string | null
  addressLine: string
  postalCode?: string | null
  isDefault: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.getTotalPrice())
  const clearCart = useCartStore((s) => s.clearCart)

  const { createOrder, isLoading } = useCreateOrder()

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [loadingAddresses, setLoadingAddresses] = useState(true)
  const [addrFormOpen, setAddrFormOpen] = useState(false)
  const [addrForm, setAddrForm] = useState({
    title: '',
    fullName: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    addressLine: '',
    postalCode: '',
    isDefault: false,
  })
  const [addrError, setAddrError] = useState<string>('')

  // Redirect if cart empty
  useEffect(() => {
    if (items.length === 0) router.replace('/sepet')
  }, [items.length, router])

  // Load addresses from API
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoadingAddresses(true)
        const res = await fetch('/api/addresses', { cache: 'no-store' })
        if (!res.ok) throw new Error('Adresler alınamadı')
        const data = await res.json()
        if (!cancelled) {
          setAddresses(data?.data || [])
          const def = (data?.data || []).find((a: Address) => a.isDefault)
          setSelectedAddressId(def?.id || (data?.data?.[0]?.id ?? null))
        }
      } catch (e: any) {
        console.error(e)
      } finally {
        if (!cancelled) setLoadingAddresses(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  const selectedAddress = useMemo(
    () => addresses.find(a => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  )

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddrError('')
    try {
      const res = await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addrForm),
      })
      const data = await res.json()
      if (!res.ok) {
        setAddrError(data?.error || 'Adres kaydedilemedi')
        return
      }
      // refresh list
      const res2 = await fetch('/api/addresses', { cache: 'no-store' })
      const data2 = await res2.json()
      setAddresses(data2?.data || [])
      setSelectedAddressId(data?.id || data?.data?.id)
      setAddrFormOpen(false)
      setAddrForm({
        title: '',
        fullName: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        addressLine: '',
        postalCode: '',
        isDefault: false,
      })
    } catch (e: any) {
      setAddrError('Adres kaydedilemedi')
    }
  }

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Lütfen bir adres seçin veya ekleyin.')
      return
    }
    try {
      // Build order items from cart
      const orderItems = items.map((it) => ({
        productId: it.id,
        quantity: it.quantity,
      }))

      const order = await createOrder({
        addressId: selectedAddress.id,
        items: orderItems,
        paymentMethod: 'CREDIT_CARD',
        customerNote: undefined,
      })

      if (order?.id) {
        clearCart() // empty cart after order
        router.push('/odeme/basarili') // simple “payment success”
      }
    } catch (e: any) {
      alert(e?.message || 'Sipariş oluşturulamadı')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/sepet"
          className="text-sm text-walnut-600 hover:text-walnut-700 mb-4 inline-block"
        >
          ← Sepete Dön
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-walnut-700 mb-2">
          Ödeme
        </h1>
        <p className="text-muted-foreground">Teslimat adresinizi seçin ve siparişi onaylayın.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Address selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-walnut-600" />
                <h2 className="font-bold text-lg">Teslimat Adresi</h2>
              </div>
              <button
                onClick={() => setAddrFormOpen(v => !v)}
                className="inline-flex items-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Plus className="h-4 w-4" />
                Yeni Adres
              </button>
            </div>

            {loadingAddresses ? (
              <p className="text-sm text-muted-foreground">Adresler yükleniyor…</p>
            ) : addresses.length === 0 ? (
              <div className="p-6 bg-natural-50 rounded-lg text-sm text-muted-foreground">
                Kayıtlı adresiniz yok. Yeni bir adres ekleyin.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((a) => (
                  <label
                    key={a.id}
                    className={`relative border rounded-xl p-4 cursor-pointer transition-colors ${
                      selectedAddressId === a.id
                        ? 'border-sage-500 bg-natural-50'
                        : 'border-gray-200 hover:bg-natural-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      className="sr-only"
                      checked={selectedAddressId === a.id}
                      onChange={() => setSelectedAddressId(a.id)}
                    />
                    {selectedAddressId === a.id && (
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 text-xs bg-sage-500 text-white px-2 py-1 rounded-full">
                          <Check className="h-3 w-3" />
                          Seçili
                        </span>
                      </div>
                    )}
                    <div className="font-semibold">{a.title}</div>
                    <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                      <div className="text-foreground">{a.fullName} · {a.phone}</div>
                      <div>{a.addressLine}</div>
                      <div>{a.district} / {a.city} {a.postalCode ? `· ${a.postalCode}` : ''}</div>
                      {a.isDefault && (
                        <div className="text-xs text-sage-600 mt-1">Varsayılan adres</div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}

            {/* Add address form */}
            {addrFormOpen && (
              <div className="mt-6 border-t pt-6">
                <h3 className="font-bold mb-3">Yeni Adres</h3>
                {addrError && (
                  <div className="mb-3 text-sm bg-red-50 text-red-700 px-3 py-2 rounded-lg">
                    {addrError}
                  </div>
                )}
                <form onSubmit={handleAddAddress} className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="Adres Başlığı (Ev, İş...)"
                      value={addrForm.title}
                      onChange={(e) => setAddrForm({ ...addrForm, title: e.target.value })}
                      required
                    />
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="Ad Soyad"
                      value={addrForm.fullName}
                      onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                      required
                    />
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="Telefon"
                      value={addrForm.phone}
                      onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                      required
                    />
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="İl"
                      value={addrForm.city}
                      onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                      required
                    />
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="İlçe"
                      value={addrForm.district}
                      onChange={(e) => setAddrForm({ ...addrForm, district: e.target.value })}
                      required
                    />
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="Mahalle (opsiyonel)"
                      value={addrForm.neighborhood}
                      onChange={(e) => setAddrForm({ ...addrForm, neighborhood: e.target.value })}
                    />
                    <input
                      className="px-3 py-3 border rounded-lg"
                      placeholder="Posta Kodu (opsiyonel)"
                      value={addrForm.postalCode}
                      onChange={(e) => setAddrForm({ ...addrForm, postalCode: e.target.value })}
                    />
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={addrForm.isDefault}
                        onChange={(e) => setAddrForm({ ...addrForm, isDefault: e.target.checked })}
                      />
                      Varsayılan adres yap
                    </label>
                  </div>
                  <textarea
                    className="w-full px-3 py-3 border rounded-lg"
                    rows={3}
                    placeholder="Adres (sokak, cadde, no, daire...)"
                    value={addrForm.addressLine}
                    onChange={(e) => setAddrForm({ ...addrForm, addressLine: e.target.value })}
                    required
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      Adresi Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddrFormOpen(false)}
                      className="border-2 border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <CartSummary
              subtotal={totalPrice}
              shippingCost={0}
              discount={0}
              total={totalPrice}
            />

            <button
              onClick={handlePlaceOrder}
              disabled={isLoading || items.length === 0}
              className="w-full inline-flex items-center justify-center gap-2 bg-walnut-500 hover:bg-walnut-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors disabled:opacity-60"
            >
              {isLoading ? 'İşleniyor…' : (
                <>
                  Ödemeyi Tamamla
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>

            <Link
              href="/urunler"
              className="block w-full text-center text-walnut-600 hover:text-walnut-700 py-3 font-medium"
            >
              Alışverişe Devam Et
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
