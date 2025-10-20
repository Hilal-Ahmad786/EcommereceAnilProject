import { Award, Users, Heart, Truck } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-walnut-700 mb-6">
          Hakkımızda
        </h1>
        <p className="text-lg text-muted-foreground">
          15 yılı aşkın tecrübemiz ile hayalinizdeki mutfağı birlikte tasarlıyor, 
          kaliteli ve dayanıklı mobilyalarla yaşam alanlarınıza değer katıyoruz.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-8 mb-16">
        <div className="text-center">
          <div className="text-4xl font-bold text-walnut-600 mb-2">15+</div>
          <p className="text-muted-foreground">Yıl Tecrübe</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-walnut-600 mb-2">1000+</div>
          <p className="text-muted-foreground">Tamamlanan Proje</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-walnut-600 mb-2">500+</div>
          <p className="text-muted-foreground">Mutlu Müşteri</p>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-walnut-600 mb-2">%98</div>
          <p className="text-muted-foreground">Memnuniyet Oranı</p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-walnut-700 mb-6">Hikayemiz</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Mutfak Mobilya olarak 2009 yılında küçük bir atölyede başlayan yolculuğumuz, 
            bugün Türkiye'nin önde gelen mutfak mobilyası üreticilerinden biri haline geldi.
          </p>
          <p>
            Her projede müşteri memnuniyetini ön planda tutarak, kaliteli malzeme ve işçilik 
            ile ürettiğimiz mobilyalarla binlerce eve dokunduk.
          </p>
          <p>
            Modern tasarım anlayışımızı geleneksel ustalık ile birleştirerek, hem estetik 
            hem de fonksiyonel çözümler sunuyoruz.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-walnut-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-8 w-8 text-walnut-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Kalite</h3>
          <p className="text-sm text-muted-foreground">
            Premium malzeme ve işçilik garantisi
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-sage-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Uzman Ekip</h3>
          <p className="text-sm text-muted-foreground">
            Deneyimli tasarımcı ve ustalar
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-clay-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-clay-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Müşteri Odaklı</h3>
          <p className="text-sm text-muted-foreground">
            İhtiyacınıza özel çözümler
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-natural-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="h-8 w-8 text-walnut-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Hızlı Teslimat</h3>
          <p className="text-sm text-muted-foreground">
            Zamanında ve güvenli kargo
          </p>
        </div>
      </div>
    </div>
  )
}