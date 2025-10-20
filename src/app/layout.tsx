import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import GoogleTagManager from '@/components/analytics/GoogleTagManager'
import FacebookPixel from '@/components/analytics/FacebookPixel'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Mutfak Mobilya - Kaliteli Mutfak Mobilyaları',
    template: '%s | Mutfak Mobilya',
  },
  description: 'Kaliteli mutfak mobilyaları ve tasarım çözümleri ile hayalinizdeki mutfağı oluşturun.',
  keywords: ['mutfak mobilyası', 'mutfak dolabı', 'mutfak tasarımı', 'mobilya'],
  authors: [{ name: 'Mutfak Mobilya' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://mutfakmobilya.com',
    title: 'Mutfak Mobilya',
    description: 'Kaliteli mutfak mobilyaları ve tasarım çözümleri',
    siteName: 'Mutfak Mobilya',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <GoogleTagManager />
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics />
        <FacebookPixel />
      </body>
    </html>
  )
}