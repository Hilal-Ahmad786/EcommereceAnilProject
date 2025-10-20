This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
# 🛋️ Mutfak Mobilya E-Ticaret Platformu

Türkçe dilinde, mutfak mobilyaları satışına özel, modern ve minimalist bir e-ticaret platformu.

## 🚀 Teknoloji Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: Vercel Postgres + Prisma ORM
- **Authentication**: NextAuth.js v5
- **Payments**: İyzico
- **Storage**: Vercel Blob
- **Email**: Resend
- **Search**: Meilisearch
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Analytics**: Google Analytics 4, GTM, Meta Pixel

## 📦 Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables Ayarla

`.env.local.example` dosyasını `.env.local` olarak kopyalayın ve gerekli bilgileri doldurun:

```bash
cp .env.local.example .env.local
```

### 3. Veritabanını Hazırla

```bash
npx prisma generate
npx prisma db push
```

### 4. Development Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🎨 Tasarım Sistemi

### Renk Paleti

- **Primary (Walnut)**: `#8B7355` - Sıcak ceviz kahverengi
- **Secondary (Natural)**: `#F5F5F0` - Doğal beyaz
- **Accent (Sage)**: `#6B8E6F` - Yumuşak yeşil
- **Alternative Accent (Clay)**: `#CC7357` - Terracotta tuğla

### Tipografi

- **Font Family**: Inter (Swiss minimalist tarzı)
- **Başlıklar**: Clean, bold, sans-serif
- **Body Text**: `#333333` - Yüksek okunabilirlik için koyu gri

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth route group
│   ├── (main)/            # Main site route group
│   ├── (admin)/           # Admin panel route group
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   ├── admin/            # Admin components
│   └── floating/         # Floating action buttons
├── lib/                  # Utility libraries
├── hooks/                # Custom React hooks
├── store/                # Zustand stores
├── types/                # TypeScript types
└── config/               # Configuration files
```

## 🔑 Özellikler

### Müşteri Tarafı
- ✅ Ürün kataloğu ve filtreleme
- ✅ Detaylı ürün sayfaları (galeri, renk seçici, özellikler)
- ✅ Sepet ve ödeme sistemi
- ✅ Kullanıcı hesapları (sipariş geçmişi, adresler)
- ✅ Favoriler/Wishlist
- ✅ Ürün incelemeleri (opsiyonel)
- ✅ Blog/İlham bölümü
- ✅ WhatsApp, telefon ve chat butonları
- ✅ Newsletter kayıt

### Admin Paneli
- ✅ Ürün yönetimi (CRUD)
- ✅ Kategori yönetimi
- ✅ Sipariş yönetimi
- ✅ Müşteri yönetimi
- ✅ Blog yönetimi
- ✅ Medya kütüphanesi
- ✅ SEO kontrolleri
- ✅ Site ayarları (üst banner, iletişim, sosyal medya)
- ✅ Stok uyarıları
- ✅ Analitik ayarları

## 🛠️ Geliştirme Komutları

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint

# Prisma Studio (Database GUI)
npm run prisma:studio

# Generate Prisma Client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

## 🚀 Vercel'e Deploy

### 1. GitHub'a Push

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

### 2. Vercel'de Proje Oluştur

1. [vercel.com](https://vercel.com) üzerinde GitHub repo'nuzu import edin
2. Environment variables'ı ekleyin
3. Deploy edin!

### 3. Database Setup

Vercel Postgres'i aktif edin ve `DATABASE_URL`'i environment variables'a ekleyin.

## 📊 Analitik Kurulumu

### Google Analytics 4
`.env.local` dosyasına ekleyin:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Google Tag Manager
`.env.local` dosyasına ekleyin:
```
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Meta Pixel
`.env.local` dosyasına ekleyin:
```
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=123456789012345
```

## 🔐 Güvenlik

- NextAuth.js ile güvenli authentication
- CSRF koruması
- SQL injection koruması (Prisma ORM)
- XSS koruması
- Rate limiting (API routes)

## 📞 İletişim Butonları

### Desktop (Sağ Alt)
- WhatsApp floating button
- Telefon floating button
- Chat floating button

### Mobile (Alt Fixed Bar)
- WhatsApp | Telefon | Chat (eşit genişlikte)

## 🎯 SEO Optimizasyonu

- Dinamik meta tags
- Open Graph tags
- Structured data (JSON-LD)
- XML Sitemap
- Robots.txt
- Turkish language tags (`tr-TR`)

## 📝 Lisans

Bu proje özel bir proje olup, tüm hakları saklıdır.

## 👨‍💻 Geliştirici Notları

### Önemli Dosyalar
- `prisma/schema.prisma` - Database schema
- `middleware.ts` - Route protection
- `src/lib/auth.ts` - NextAuth configuration
- `src/config/site.ts` - Site configuration

### Component Naming Convention
- Turkish route names: `/urunler`, `/sepet`, `/hesabim`
- Component names: PascalCase (English)
- File names: PascalCase for components, kebab-case for utilities

## 🐛 Sorun Giderme

### Prisma Hatası
```bash
npx prisma generate
npx prisma db push
```

### Build Hatası
```bash
rm -rf .next
npm run build
```

### Type Hatası
```bash
npm run lint
```

## 📚 Kaynaklar

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com)
- [NextAuth.js](https://next-auth.js.org)