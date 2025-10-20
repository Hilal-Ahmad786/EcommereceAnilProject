import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-natural-100 to-natural-200 overflow-hidden">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-walnut-700 leading-tight">
              Hayalinizdeki Mutfağı
              <span className="block text-sage-600">Birlikte Tasarlayalım</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Premium kalitede, özel tasarım mutfak mobilyaları ile evinize değer katın. 
              Uzman ekibimiz size özel çözümler sunar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/urunler"
                className="inline-flex items-center justify-center px-8 py-4 bg-walnut-500 text-white font-semibold rounded-lg hover:bg-walnut-600 transition-colors"
              >
                Ürünleri İncele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-walnut-500 text-walnut-500 font-semibold rounded-lg hover:bg-walnut-50 transition-colors"
              >
                Ücretsiz Danışmanlık
              </Link>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-walnut-600">500+</div>
                <div className="text-sm text-muted-foreground">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-walnut-600">15+</div>
                <div className="text-sm text-muted-foreground">Yıl Tecrübe</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-walnut-600">1000+</div>
                <div className="text-sm text-muted-foreground">Tamamlanan Proje</div>
              </div>
            </div>
          </div>

          {/* Right Image/Visual */}
          <div className="relative h-[400px] md:h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-br from-sage-200 to-walnut-200 rounded-2xl"></div>
            {/* Placeholder for actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center space-y-2">
                <div className="text-6xl">🏠</div>
                <p className="text-sm">Hero Image</p>
                <p className="text-xs">(Kitchen mockup)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sage-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-walnut-200 rounded-full blur-3xl opacity-20"></div>
    </section>
  )
}