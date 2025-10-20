export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-walnut-700 mb-8">Gizlilik Politikası</h1>
        
        <p className="text-muted-foreground">Son güncelleme: 15 Ocak 2024</p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">1. Giriş</h2>
          <p>
            Mutfak Mobilya olarak, kişisel verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz.
            Bu gizlilik politikası, web sitemizi kullanırken toplanan, işlenen ve saklanan kişisel
            verileriniz hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">2. Toplanan Bilgiler</h2>
          <p>Aşağıdaki kişisel bilgilerinizi toplayabiliriz:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
            <li>Teslimat adresleri</li>
            <li>Sipariş geçmişi ve tercihler</li>
            <li>Ödeme bilgileri (güvenli ödeme sağlayıcıları aracılığıyla)</li>
            <li>Web sitesi kullanım verileri (çerezler aracılığıyla)</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">3. Bilgilerin Kullanımı</h2>
          <p>Topladığımız bilgileri şu amaçlarla kullanırız:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Siparişlerinizi işlemek ve teslim etmek</li>
            <li>Müşteri hizmetleri sağlamak</li>
            <li>Ürün ve hizmetlerimizi geliştirmek</li>
            <li>Pazarlama iletişimleri göndermek (izniniz dahilinde)</li>
            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">4. Bilgi Paylaşımı</h2>
          <p>
            Kişisel bilgilerinizi, yasal gereklilikler dışında üçüncü şahıslarla paylaşmayız.
            Sadece sipariş teslimatı, ödeme işlemleri gibi hizmetleri sağlamak için
            güvendiğimiz iş ortaklarıyla sınırlı bilgi paylaşımı yaparız.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">5. Çerezler</h2>
          <p>
            Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanır.
            Çerezleri tarayıcı ayarlarınızdan kontrol edebilir veya engelleyebilirsiniz.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">6. Veri Güvenliği</h2>
          <p>
            Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri alıyoruz.
            Ancak, internet üzerinden veri iletiminin %100 güvenli olduğunu garanti edemeyiz.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">7. Haklarınız</h2>
          <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>İşlenmesini gerektiren sebeplerin ortadan kalkması halinde silinmesini isteme</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">8. İletişim</h2>
          <p>
            Gizlilik politikamız ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
          </p>
          <p className="text-muted-foreground mt-2">
            E-posta: destek@mutfakmobilya.com<br />
            Telefon: +90 555 123 45 67
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">9. Değişiklikler</h2>
          <p>
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler
            yapıldığında sizi bilgilendireceğiz.
          </p>
        </section>
      </div>
    </div>
  )
}