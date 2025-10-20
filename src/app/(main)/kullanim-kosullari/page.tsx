export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-4xl font-bold text-walnut-700 mb-8">Kullanım Koşulları</h1>
        
        <p className="text-muted-foreground">Son güncelleme: 15 Ocak 2024</p>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">1. Genel Hükümler</h2>
          <p>
            Bu web sitesini kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız.
            Koşulları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">2. Hesap Oluşturma</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Hesap oluştururken doğru ve güncel bilgiler vermelisiniz</li>
            <li>Hesap güvenliğinizden siz sorumlusunuz</li>
            <li>Hesabınızın yetkisiz kullanımını derhal bildirmelisiniz</li>
            <li>18 yaşından küçükler ancak veli izni ile alışveriş yapabilir</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">3. Sipariş ve Ödeme</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Tüm fiyatlar Türk Lirası (TRY) cinsindendir ve KDV dahildir</li>
            <li>Sipariş onayı e-posta ile gönderilir</li>
            <li>Ödeme işlemleri güvenli ödeme sağlayıcıları üzerinden yapılır</li>
            <li>Stok durumuna göre siparişler iptal edilebilir</li>
            <li>Fiyat hataları durumunda sipariş iptal edilebilir</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">4. Teslimat</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Teslimat süreleri tahminidir ve garanti edilmez</li>
            <li>Kargo firması kaynaklı gecikmelerden sorumlu değiliz</li>
            <li>Yanlış adres bilgisi durumunda ek ücret alınabilir</li>
            <li>Teslim alırken ürünü kontrol etmeniz önerilir</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">5. İade ve İptal</h2>
          <p>
            Cayma hakkı ve iade koşulları Kargo ve İade sayfamızda detaylı olarak açıklanmıştır.
            14 gün içinde ürünleri iade edebilirsiniz.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">6. Fikri Mülkiyet</h2>
          <p>
            Bu web sitesindeki tüm içerik, görseller, logolar ve tasarımlar Mutfak Mobilya'nın
            mülkiyetindedir ve telif hakkı yasaları ile korunmaktadır. İzinsiz kullanılamaz.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">7. Sorumluluk Sınırlaması</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Web sitesinin kesintisiz çalışacağını garanti etmeyiz</li>
            <li>Üçüncü taraf bağlantılardan sorumlu değiliz</li>
            <li>Dolaylı zararlardan sorumlu tutulamayız</li>
            <li>Force majeure durumlarında yükümlülüklerimiz askıya alınır</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">8. Yasak Faaliyetler</h2>
          <p>Aşağıdaki faaliyetler kesinlikle yasaktır:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Web sitesine zarar verici yazılım yüklemek</li>
            <li>Başkalarının hesaplarını kullanmak</li>
            <li>Sahte bilgi vermek</li>
            <li>Otomatik sistemlerle veri toplamak</li>
            <li>Hizmetimizi kötüye kullanmak</li>
            <li>Yasalara aykırı faaliyetlerde bulunmak</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">9. Değişiklikler</h2>
          <p>
            Bu kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutarız.
            Değişiklikler bu sayfada yayınlanır ve yayın tarihinden itibaren geçerlidir.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">10. Uygulanacak Hukuk</h2>
          <p>
            Bu sözleşme Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlıklarda
            İstanbul mahkemeleri ve icra daireleri yetkilidir.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-walnut-700 mb-4">11. İletişim</h2>
          <p>
            Kullanım koşulları ile ilgili sorularınız için:
          </p>
          <p className="text-muted-foreground mt-2">
            E-posta: destek@mutfakmobilya.com<br />
            Telefon: +90 555 123 45 67<br />
            Adres: Örnek Mahallesi, Mobilya Sokak No: 123, Kadıköy/İstanbul
          </p>
        </section>

        <div className="mt-12 p-6 bg-walnut-50 rounded-xl">
          <p className="text-sm text-muted-foreground">
            Bu kullanım koşullarını dikkatlice okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
            Web sitemizi kullanmaya devam ederek bu koşullara uygun hareket edeceğinizi beyan
            etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  )
}