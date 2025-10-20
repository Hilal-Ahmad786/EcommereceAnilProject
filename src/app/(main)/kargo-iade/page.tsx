import { Truck, Package, RotateCcw, Shield } from 'lucide-react'

export default function ShippingReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-walnut-700 mb-8">
          Kargo ve İade
        </h1>

        {/* Shipping Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="h-8 w-8 text-walnut-600" />
            <h2 className="text-2xl font-bold text-walnut-700">Kargo Bilgileri</h2>
          </div>
          
          <div className="space-y-4 text-muted-foreground">
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Ücretsiz Kargo</h3>
              <p>Tüm siparişlerinizde kargo ücretsizdir.</p>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Teslimat Süresi</h3>
              <p>
                Siparişiniz onaylandıktan sonra 3-5 iş günü içinde adresinize teslim edilir.
                Büyük ve özel üretim ürünlerde teslimat süresi 7-10 iş günü olabilir.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Kargo Takibi</h3>
              <p>
                Siparişiniz kargoya verildikten sonra takip numaranız e-posta ile gönderilir.
                Hesabım sayfasından da kargo durumunu takip edebilirsiniz.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">Montaj Hizmeti</h3>
              <p>
                Mobilya ürünlerimizde profesyonel montaj hizmeti sunuyoruz. 
                Sipariş sırasında montaj seçeneğini tercih edebilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Returns Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="h-8 w-8 text-walnut-600" />
            <h2 className="text-2xl font-bold text-walnut-700">İade ve Değişim</h2>
          </div>

          <div className="space-y-4 text-muted-foreground">
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">İade Süresi</h3>
              <p>
                Ürünü teslim aldıktan sonra 14 gün içinde cayma hakkınızı kullanabilirsiniz.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">İade Koşulları</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Ürün kullanılmamış ve ambalajı açılmamış olmalıdır</li>
                <li>Fatura ve iade formu eksiksiz olmalıdır</li>
                <li>Özel üretim ürünler iade kapsamı dışındadır</li>
                <li>Hasarlı veya eksik ürün teslimatı 48 saat içinde bildirilmelidir</li>
              </ul>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">İade Süreci</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Müşteri hizmetlerimizi arayarak iade talebinde bulunun</li>
                <li>İade formu tarafınıza e-posta ile gönderilir</li>
                <li>Formu doldurarak ürünle birlikte kargoya verin</li>
                <li>Ürün tarafımıza ulaştıktan sonra kontrol edilir</li>
                <li>Onay sonrası 5-7 iş günü içinde iadesi yapılır</li>
              </ol>
            </div>

            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-2">İade Kargo Ücreti</h3>
              <p>
                Üründe herhangi bir sorun yoksa iade kargo ücreti müşteriye aittir.
                Hatalı veya hasarlı ürün teslimatında kargo ücreti tarafımızca karşılanır.
              </p>
            </div>
          </div>
        </section>

        {/* Warranty Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-walnut-600" />
            <h2 className="text-2xl font-bold text-walnut-700">Garanti</h2>
          </div>

          <div className="bg-white border rounded-xl p-6">
            <p className="text-muted-foreground mb-4">
              Tüm ürünlerimiz 2 yıl üretici garantisi ile sunulmaktadır. 
              Garanti kapsamı üretim hatalarını içerir.
            </p>
            <p className="text-sm text-muted-foreground">
              Garanti kapsamı dışında kalanlar: Yanlış kullanım, dış etkenler, 
              normal aşınma ve yıpranma.
            </p>
          </div>
        </section>

        {/* Contact */}
        <div className="mt-12 bg-walnut-50 rounded-xl p-8 text-center">
          <h3 className="font-bold text-xl mb-2">Sorularınız mı var?</h3>
          <p className="text-muted-foreground mb-4">
            Kargo ve iade ile ilgili sorularınız için müşteri hizmetlerimizle iletişime geçin
          </p>
          <a
            href="/iletisim"
            className="inline-block bg-walnut-500 hover:bg-walnut-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            İletişime Geç
          </a>
        </div>
      </div>
    </div>
  )
}