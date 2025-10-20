import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { footerNavigation } from '@/config/navigation'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-natural-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-walnut-500 mb-4">
              Mutfak Mobilya
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kaliteli mutfak mobilyaları ve tasarım çözümleri ile hayalinizdeki mutfağı oluşturun.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-walnut-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-walnut-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-walnut-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-walnut-500 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Kurumsal */}
          <div>
            <h4 className="font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              {footerNavigation.kurumsal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-walnut-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
            <ul className="space-y-2">
              {footerNavigation.musteri.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-walnut-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bilgi */}
          <div>
            <h4 className="font-semibold mb-4">Bilgi</h4>
            <ul className="space-y-2">
              {footerNavigation.bilgi.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-walnut-500 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Mutfak Mobilya. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/gizlilik-politikasi" className="hover:text-walnut-500">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-kosullari" className="hover:text-walnut-500">
                Kullanım Koşulları
              </Link>
              <a
                href="https://www.paksoft.com.tr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-walnut-500 transition-colors"
              >
                <span>Tasarım ve Yazılım:</span>
                <span className="font-semibold">Paksoft</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}